"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import uzi from "../../data/uzi.json";
import { submitLead } from "../../lib/submit-lead";
import FormConsentCheckbox from "../../components/form-consent-checkbox";

type UziItem = {
  id: string;
  name: string;
  price?: number;
};

// Максимум 5 категорий УЗИ — определяем по ключевым словам в названии
const UZI_CATEGORIES: { key: string; label: string; keywords: string[] }[] = [
  { key: "abdomen", label: "УЗИ брюшной полости", keywords: ["брюшной полости", "печени", "желчного", "поджелудочной", "селезёнки"] },
  { key: "heart", label: "УЗИ сердца и сосудов", keywords: ["брахиоцефальных", "УЗДГ", "артерий", "вен конечностей", "сердца", "ЭХО-КГ", "ЭКГ"] },
  { key: "gynec", label: "УЗИ малого таза и гинекология", keywords: ["малого таза", "матки", "придатков", "фолликул", "плода", "беременности", "Кольпоскопия"] },
  { key: "uro", label: "УЗИ почек и урология", keywords: ["мочевого", "мочевыводящ", "почек", "предстательной", "мошонки", "ТРУЗИ", "надпочечников"] },
  { key: "other", label: "УЗИ прочее", keywords: ["щитовидной", "паращитовид", "молочных желез", "лимфатических", "мягких тканей", "слюнных", "вилочковой", "плевральной", "тазобедрен", "Эластография"] },
];

function getCategory(name: string): string {
  const n = name.toLowerCase();
  for (const cat of UZI_CATEGORIES) {
    if (cat.key === "other") continue;
    for (const kw of cat.keywords) {
      if (n.includes(kw.toLowerCase())) return cat.label;
    }
  }
  return UZI_CATEGORIES[UZI_CATEGORIES.length - 1].label; // прочее
}

const uziList = (uzi as UziItem[]).map((item) => ({
  ...item,
  category: getCategory(item.name),
}));

type UziWithCategory = UziItem & { category: string };

const SUGGESTIONS_MAX = 10;

export default function UziPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [categoriesInitialized, setCategoriesInitialized] = useState(false);
  const [bookingFor, setBookingFor] = useState<UziWithCategory | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookConsent, setBookConsent] = useState(false);
  const [bookSubmitting, setBookSubmitting] = useState(false);
  const [bookSent, setBookSent] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => UZI_CATEGORIES.map((c) => c.label), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return uziList.filter((item) => {
      const byQuery = !q || item.name.toLowerCase().includes(q);
      const byCategory = category === "all" || item.category === category;
      return byQuery && byCategory;
    });
  }, [query, category]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return uziList
      .filter((item) => item.name.toLowerCase().includes(q))
      .slice(0, SUGGESTIONS_MAX);
  }, [query]);

  const groupedByCategory = useMemo(() => {
    const map = new Map<string, UziWithCategory[]>();
    filtered.forEach((item) => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    });
    // Порядок как в UZI_CATEGORIES
    const order = new Map(UZI_CATEGORIES.map((c, i) => [c.label, i]));
    const sorted = Array.from(map.entries()).sort(
      (a, b) => (order.get(a[0]) ?? 99) - (order.get(b[0]) ?? 99)
    );
    return new Map(sorted);
  }, [filtered]);

  const categoryOrder = useMemo(() => Array.from(groupedByCategory.keys()), [groupedByCategory]);

  useEffect(() => {
    if (!categoriesInitialized && categoryOrder.length > 0) {
      setExpandedCategories(new Set([categoryOrder[0]]));
      setCategoriesInitialized(true);
    }
  }, [categoryOrder, categoriesInitialized]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectSuggestion = useCallback((item: UziWithCategory) => {
    setQuery(item.name);
    setDropdownOpen(false);
  }, []);

  const openBooking = useCallback((item: UziWithCategory) => {
    setBookingFor(item);
    setBookName("");
    setBookPhone("");
    setBookConsent(false);
    setBookSent(false);
    setBookError(null);
  }, []);

  const handleBookingSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingFor) return;
    setBookError(null);
    const phone = bookPhone.trim();
    if (!phone) {
      setBookError("Укажите телефон.");
      return;
    }
    if (!bookConsent) {
      setBookError("Необходимо согласие на обработку персональных данных.");
      return;
    }
    setBookSubmitting(true);
    try {
      const res = await submitLead({
        formName: "Запись на УЗИ (каталог)",
        name: bookName.trim(),
        phone,
        comment: `УЗИ: ${bookingFor.name}`,
        honeypot: "",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBookError(
          data.error === "PHONE_REQUIRED"
            ? "Укажите телефон."
            : "Не удалось отправить заявку. Попробуйте позже."
        );
        return;
      }
      setBookSent(true);
      setBookName("");
      setBookPhone("");
      setTimeout(() => {
        setBookingFor(null);
        setBookSent(false);
      }, 2000);
    } finally {
      setBookSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          УЗИ диагностика
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Современные УЗИ-аппараты экспертного класса и опытные специалисты
          клиники-партнёра «Амадея». Выберите исследование и запишитесь — заявка уйдёт в Telegram.
        </p>
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div ref={searchWrapRef} className="relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <label className="text-[13px] font-medium text-slate-800">
              Поиск по УЗИ
            </label>
            <div className="mt-3 flex gap-3">
              <div className="relative flex-1">
                <input
                  type="search"
                  placeholder="Введите название исследования, например «брюшная полость»"
                  className="h-14 w-full rounded-[14px] border border-[#e4ecea] bg-white px-[18px] text-[15px] outline-none ring-0 placeholder:text-slate-400 focus:border-[#2fbf8c] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onFocus={() => query.trim().length >= 1 && setDropdownOpen(true)}
                />
                {dropdownOpen && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[320px] w-full min-w-0 max-w-[calc(100vw-2rem)] overflow-auto rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="flex w-full items-center justify-between gap-2 py-3 px-4 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="font-semibold text-slate-900">{item.name}</span>
                        <span className="shrink-0 text-sm text-slate-500">
                          {item.price != null ? `${item.price} ₽` : "уточнить"}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <p className="text-[13px] font-semibold text-emerald-800">Скидка до 10% на УЗИ</p>
            <p className="mt-1.5 text-xs text-emerald-700">
              Для новых пациентов при записи онлайн через форму на сайте или по
              телефону, с отметкой про акцию.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Список исследований
          </h2>
          <p className="text-xs text-slate-500">Найдено: {filtered.length}</p>
        </div>
        {filtered.length === 0 ? (
          <p className="text-xs text-slate-500">
            Нет исследований по вашему запросу. Измените поиск или категорию.
          </p>
        ) : (
          <div className="space-y-2">
            {categoryOrder.map((catKey) => {
              const items = groupedByCategory.get(catKey) ?? [];
              const isExpanded = expandedCategories.has(catKey);
              const toggleCategory = () => {
                setExpandedCategories((prev) => {
                  const next = new Set(prev);
                  if (next.has(catKey)) next.delete(catKey);
                  else next.add(catKey);
                  return next;
                });
              };
              return (
                <div
                  key={catKey}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={toggleCategory}
                    className={`flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors ${
                      isExpanded
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span className="font-semibold">{catKey}</span>
                    <span className="flex items-center gap-2 text-sm font-normal text-slate-500">
                      <span>{items.length}</span>
                      <span
                        className={`inline-block transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[max-height] duration-200 ease-in-out ${
                      isExpanded ? "max-h-[5000px]" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-slate-100">
                      <div className="divide-y divide-slate-100 text-xs">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col gap-2 px-4 py-3 md:grid md:grid-cols-[minmax(0,2.5fr),minmax(0,0.8fr),minmax(0,0.75fr)] md:items-center"
                          >
                            <span className="font-medium text-slate-900 md:font-normal">
                              {item.name}
                            </span>
                            <span className="font-semibold text-slate-900">
                              {item.price != null ? `${item.price} ₽` : "уточнить"}
                            </span>
                            <div className="flex justify-end pt-1 md:pt-0">
                              <button
                                type="button"
                                onClick={() => openBooking(item)}
                                className="rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-800 md:py-2 md:px-4"
                              >
                                Записаться
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {bookingFor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => !bookSubmitting && setBookingFor(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="uzi-booking-title"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="uzi-booking-title" className="text-lg font-semibold text-slate-900">
              Запись на УЗИ
            </h2>
            <p className="mt-1 text-sm text-slate-600">{bookingFor.name}</p>
            {bookSent ? (
              <p className="mt-4 text-sm font-medium text-emerald-700">
                Заявка отправлена. Мы свяжемся с вами в ближайшее время.
              </p>
            ) : (
              <form onSubmit={handleBookingSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700">Имя</label>
                  <input
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-500"
                    placeholder="Необязательно"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">Телефон *</label>
                  <input
                    type="tel"
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-500"
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>
                <FormConsentCheckbox
                  checked={bookConsent}
                  onChange={setBookConsent}
                  error={!!bookError && !bookPhone.trim()}
                />
                {bookError && (
                  <p className="text-xs text-rose-600">{bookError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingFor(null)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={bookSubmitting}
                    className="flex-1 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
                  >
                    {bookSubmitting ? "Отправка…" : "Отправить заявку"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
