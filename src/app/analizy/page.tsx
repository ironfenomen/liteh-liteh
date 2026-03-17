"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import analyzes from "../../data/analyses.json";
import { submitLead } from "../../lib/submit-lead";
import FormConsentCheckbox from "../../components/form-consent-checkbox";

type Analyze = {
  code: string;
  name: string;
  slug: string;
  category?: string;
  price?: number | null;
  biomaterial?: string | null;
  duration?: string | null;
};

const analyzesList = analyzes as Analyze[];

const biomaterialServices: Analyze[] = [
  { code: "BM01", name: "Выезд на дом: забор крови", slug: "zabor-biomateriala-vyezd-krov-bm01", category: "Забор биоматериала", price: 400, biomaterial: null, duration: null },
  { code: "BM02", name: "Выезд на дом: забор мазка", slug: "zabor-biomateriala-vyezd-mazok-bm02", category: "Забор биоматериала", price: 640, biomaterial: null, duration: null },
  { code: "BM03", name: "Выезд на дом: забор ПЦР Covid-19", slug: "zabor-biomateriala-vyezd-pcr-covid-bm03", category: "Забор биоматериала", price: 600, biomaterial: null, duration: null },
  { code: "BM04", name: "Забор крови", slug: "zabor-biomateriala-krov-bm04", category: "Забор биоматериала", price: 200, biomaterial: null, duration: null },
  { code: "BM05", name: "Забор мазка/соскоба", slug: "zabor-biomateriala-mazok-soskob-bm05", category: "Забор биоматериала", price: 320, biomaterial: null, duration: null },
  { code: "BM06", name: "Забор ПЦР Covid-19", slug: "zabor-biomateriala-pcr-covid-bm06", category: "Забор биоматериала", price: 290, biomaterial: null, duration: null },
];

function normalizeCategory(cat: string | undefined): string {
  return cat && cat.trim() ? cat : "Без категории";
}

const SUGGESTIONS_MAX = 10;

export default function AnalizyPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [categoriesInitialized, setCategoriesInitialized] = useState(false);
  const [bookingFor, setBookingFor] = useState<Analyze | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookConsent, setBookConsent] = useState(false);
  const [bookSubmitting, setBookSubmitting] = useState(false);
  const [bookSent, setBookSent] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  const fullList = useMemo(() => [...analyzesList, ...biomaterialServices], []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    fullList.forEach((a) => set.add(normalizeCategory(a.category)));
    return Array.from(set);
  }, []);

  const filteredAnalyzes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fullList.filter((item) => {
      const byQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.code && item.code.toLowerCase().includes(q));
      const cat = normalizeCategory(item.category);
      const byCategory = category === "all" || cat === category;
      return byQuery && byCategory;
    });
  }, [query, category]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return fullList
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.code && item.code.toLowerCase().includes(q))
      )
      .slice(0, SUGGESTIONS_MAX);
  }, [query]);

  const groupedByCategory = useMemo(() => {
    const map = new Map<string, Analyze[]>();
    filteredAnalyzes.forEach((a) => {
      const cat = normalizeCategory(a.category);
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(a);
    });
    return map;
  }, [filteredAnalyzes]);

  const categoryOrder = useMemo(() => Array.from(groupedByCategory.keys()), [groupedByCategory]);

  useEffect(() => {
    if (!categoriesInitialized && categoryOrder.length > 0) {
      setExpandedCategories(new Set([categoryOrder[0]]));
      setCategoriesInitialized(true);
    }
  }, [categoryOrder, categoriesInitialized]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = useCallback((item: Analyze) => {
    setQuery(item.name);
    setDropdownOpen(false);
  }, []);

  const openBooking = useCallback((item: Analyze) => {
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
        formName: "Запись на анализ (каталог)",
        name: bookName.trim(),
        phone,
        comment: `Анализ: ${bookingFor.name}, код ${bookingFor.code}`,
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
          Лабораторные анализы в Ставрополе
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Удобный каталог лабораторных исследований: ищите анализ по названию
          или коду, выбирайте категорию. Запись на исследование — заявка уходит в Telegram.
        </p>
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div ref={searchWrapRef} className="relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <label className="text-[13px] font-medium text-slate-800">
              Поиск анализа
            </label>
            <div className="mt-3 flex gap-3">
              <div className="relative flex-1">
                <input
                  type="search"
                  placeholder="Начните вводить название или код — появятся подсказки"
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
                        key={item.slug}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="flex w-full items-center justify-between gap-2 py-3 px-4 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="font-semibold text-slate-900">{item.name}</span>
                        <span className="shrink-0 text-sm text-gray-500">{item.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <label className="text-[13px] font-medium text-slate-800">
              Категория
            </label>
            <select
              className="mt-3 h-11 w-full rounded-[14px] border border-[#e4ecea] bg-white px-[14px] text-[13px] outline-none focus:border-[#2fbf8c] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as string | "all")
              }
            >
              <option value="all">Все категории</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Каталог анализов
          </h2>
          <p className="text-xs text-slate-500">
            Найдено: {filteredAnalyzes.length}
          </p>
        </div>

        {filteredAnalyzes.length === 0 ? (
          <p className="text-xs text-slate-500">
            Нет анализов по вашему запросу. Измените поиск или категорию.
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
                            key={item.slug}
                            className="flex flex-col gap-2 px-4 py-3 md:grid md:grid-cols-[minmax(0,1.8fr),minmax(0,1fr),minmax(0,0.55fr),minmax(0,0.6fr),minmax(0,0.5fr),minmax(0,0.5fr),minmax(0,0.75fr)] md:items-center"
                          >
                            <span className="font-medium text-slate-900 md:font-normal">
                              {item.name}
                            </span>
                            <span className="text-slate-500 md:block">
                              {normalizeCategory(item.category)}
                            </span>
                            <span className="font-mono text-[11px] text-slate-600">
                              {item.code}
                            </span>
                            <span className="font-semibold text-slate-900">
                              {item.price != null ? `${item.price} ₽` : "уточнить"}
                            </span>
                            <span className="text-slate-600 md:block">
                              {item.biomaterial ?? "—"}
                            </span>
                            <span className="text-slate-600 md:block">
                              {item.duration ?? "—"}
                            </span>
                            <div className="flex justify-end pt-1 md:pt-0">
                              <button
                                type="button"
                                onClick={() => openBooking(item)}
                                className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600 md:py-2 md:px-4"
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
          aria-labelledby="booking-title"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="booking-title" className="text-lg font-semibold text-slate-900">
              Запись на анализ
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {bookingFor.name} (код {bookingFor.code})
            </p>
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
                    className="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
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
