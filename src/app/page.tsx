"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import analyzes from "../data/analyses.json";

// ─── SEO / GEO: Structured Data (JSON-LD) ────────────────────────────────────
// Добавлено: Organization + LocalBusiness + MedicalOrganization schema
// Это помогает поисковикам и AI-агрегаторам (GEO) точно понять кто, где, что
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalOrganization", "LocalBusiness"],
      "@id": "https://litech26.ru/#organization",
      name: "Лаборатория Литех",
      alternateName: "Литех — лабораторная диагностика Ставрополь",
      description:
        "Медицинская лаборатория «Литех» в Ставрополе. Лабораторные анализы, УЗИ-диагностика, приём врачей, выезд медсестры на дом. Более 800 видов исследований. Результаты онлайн.",
      url: "https://litech26.ru",
      telephone: "+7-988-865-27-77",
      priceRange: "₽₽",
      image: "https://litech26.ru/og-image.jpg",
      medicalSpecialty: "Laboratory Medicine",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "ул. 45 Параллель, д.2",
          addressLocality: "Ставрополь",
          addressRegion: "Ставропольский край",
          postalCode: "355000",
          addressCountry: "RU",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "ул. 45 Параллель, д.26",
          addressLocality: "Ставрополь",
          addressRegion: "Ставропольский край",
          postalCode: "355000",
          addressCountry: "RU",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "пер. Каховский, 26а",
          addressLocality: "Ставрополь",
          addressRegion: "Ставропольский край",
          postalCode: "355000",
          addressCountry: "RU",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: "45.0440",
        longitude: "41.9734",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:30",
          closes: "20:00",
        },
      ],
      hasMap: "https://yandex.ru/profile/214201864017?lang=ru",
      sameAs: [
        "https://yandex.ru/profile/214201864017?lang=ru",
        "https://yandex.ru/profile/183400884271?lang=ru",
        "https://yandex.ru/profile/156076200245?lang=ru",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://litech26.ru/#webpage",
      url: "https://litech26.ru",
      name: "Анализы и УЗИ в Ставрополе — Лаборатория «Литех»",
      description:
        "Сдать анализы в Ставрополе в лаборатории «Литех». 800+ видов исследований, УЗИ, прием врачей, выезд медсестры на дом. Результаты онлайн. 3 филиала, забор крови с 07:30.",
      inLanguage: "ru",
      isPartOf: { "@id": "https://litech26.ru/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://litech26.ru",
          },
        ],
      },
    },
    {
      // FAQ Schema — повышает шансы на rich snippet и попадание в AI Overviews
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Как быстро я получу результаты анализов?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Большинство базовых исследований выполняются в течение 1 рабочего дня. Более сложные панели и генетические тесты могут занимать до 3–5 дней. Актуальные сроки указаны в карточке каждого анализа и уточняются при записи.",
          },
        },
        {
          "@type": "Question",
          name: "Где можно посмотреть результаты анализов?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Результаты отправляются на электронную почту, а также доступны в личном кабинете. При необходимости вы можете получить распечатку в любом филиале лаборатории.",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли сдать анализы без направления от врача?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, вы можете сдать большинство анализов без направления. Для сложных исследований и стационарного лечения мы рекомендуем предварительную консультацию врача, чтобы подобрать оптимальный объём диагностики.",
          },
        },
        {
          "@type": "Question",
          name: "Делает ли лаборатория Литех выезд на дом?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, вы можете оформить выезд медсестры на дом для забора крови и мазков. Оформить заявку можно по телефону, через мессенджеры или на странице «Выезд врача на дом».",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли получить медсестринскую помощь со своими препаратами?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, возможно выполнение инъекций и других процедур с вашими препаратами, если у вас есть оригинальное назначение врача. Перед визитом покажите назначение администратору или медсестре.",
          },
        },
      ],
    },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

type Analyze = {
  code?: string;
  name: string;
  slug?: string;
  price?: number | null;
};

const analysesList = analyzes as Analyze[];

const PromoCarousel = dynamic(() => import("../components/promo-carousel"), {
  loading: () => (
    <section className="space-y-4">
      <div className="h-4 w-32 rounded-full bg-slate-100" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl border border-slate-100 bg-gray-50"
          />
        ))}
      </div>
    </section>
  ),
});

const ReviewsCarousel = dynamic(
  () => import("../components/reviews-carousel"),
  {
    loading: () => (
      <section className="space-y-4">
        <div className="h-4 w-40 rounded-full bg-slate-100" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl border border-slate-100 bg-gray-50"
            />
          ))}
        </div>
      </section>
    ),
  }
);

export default function Home() {
  const router = useRouter();
  const popularAnalyzes = analysesList.slice(0, 6);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return analysesList
      .filter((item) => {
        const name = item.name.toLowerCase();
        const code = (item.code ?? "").toLowerCase();
        return name.includes(q) || code.includes(q);
      })
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectSuggestion = (item: Analyze) => {
    setQuery("");
    setDropdownOpen(false);
    if (item.slug) {
      router.push(`/analizy/${item.slug}`);
    } else {
      router.push("/analizy");
    }
  };

  return (
    <>
      {/* ── SEO / GEO: JSON-LD Structured Data ──────────────────────────────
          Внедряется через dangerouslySetInnerHTML в <script type="application/ld+json">.
          Это стандартный и безопасный способ добавить schema.org разметку в Next.js.
          Повышает видимость в Google, Яндекс и AI-агрегаторах (ChatGPT, Perplexity, GEO).
      ─────────────────────────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-8">
        <section className="grid max-w-full gap-8 overflow-hidden rounded-3xl bg-white px-4 py-6 shadow-sm ring-1 ring-emerald-100 sm:px-6 sm:py-8 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)] md:bg-gradient-to-br md:from-emerald-50 md:via-white md:to-orange-50 md:px-10 md:py-10">
          <div className="space-y-4 sm:space-y-5 max-w-full md:max-w-xl">
            {/* SEO: H1 с геозависимым ключевым словом — без изменения текста */}
            <h1 className="max-w-full text-2xl font-semibold leading-tight tracking-tight text-slate-900 break-words sm:text-3xl md:text-4xl">
              Анализы и УЗИ в Ставрополе
            </h1>
            <p className="max-w-full text-sm leading-relaxed text-slate-600 break-words md:max-w-xl md:text-base">
              Лаборатория «Литех» — быстрые и точные лабораторные исследования,
              УЗИ-диагностика и прием специалистов. Онлайн-запись, прозрачные
              цены и удобные филиалы рядом с домом.
            </p>
            <div className="space-y-4">
              <div
                ref={searchWrapRef}
                className="relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <p className="text-[13px] font-medium text-slate-800">
                  Найдите нужный анализ по названию или коду
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="search"
                    placeholder="Например, общий анализ крови или 01-001"
                    className="w-full rounded-[14px] border border-[#e4ecea] bg-white px-[18px] text-[15px] leading-none outline-none ring-0 placeholder:text-slate-400 focus:border-[#2fbf8c] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)] h-14 sm:flex-1"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setDropdownOpen(true);
                    }}
                    onFocus={() => query.trim().length >= 1 && setDropdownOpen(true)}
                    // SEO/Accessibility: добавлен aria-label для скринридеров и поисковиков
                    aria-label="Поиск анализов по названию или коду"
                  />
                  <Link
                    href="/analizy"
                    className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-[14px] bg-[linear-gradient(135deg,#2fbf8c,#1aa97a)] px-4 py-[14px] text-[13px] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)] sm:w-auto md:px-[22px]"
                  >
                    К каталогу
                  </Link>
                </div>
                {dropdownOpen && suggestions.length > 0 && (
                  <div className="absolute left-4 right-4 top-full z-40 mt-2 max-h-80 overflow-auto rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
                    {suggestions.map((item) => (
                      <button
                        key={item.slug ?? item.code ?? item.name}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs transition-colors hover:bg-slate-50"
                      >
                        <span className="line-clamp-2 font-medium text-slate-900">
                          {item.name}
                        </span>
                        <span className="shrink-0 text-[11px] font-semibold text-slate-500">
                          {item.price != null ? `${item.price} ₽` : item.code ?? ""}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-white px-3 py-1">
                  Забор крови с 07:30
                </span>
                <span className="rounded-full bg-white px-3 py-1">
                  Результаты онлайн
                </span>
                <span className="rounded-full bg-white px-3 py-1">
                  Филиалы рядом с домом
                </span>
                <Link
                  href="/medsestra"
                  className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 transition hover:bg-emerald-200"
                >
                  Забор анализов на дому
                </Link>
              </div>
              <div className="flex flex-col gap-2 text-xs sm:flex-row sm:text-sm">
                <Link
                  href="/contacts#callback"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                >
                  Записаться онлайн
                </Link>
                <a
                  href="tel:+79888652777"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  // GEO: tel: ссылка с полным номером помогает агрегаторам извлечь контакт
                >
                  Позвонить администратору
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Направления клиники
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <Link
                  href="/analizy"
                  className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                >
                  Лабораторная диагностика
                </Link>
                <Link
                  href="/uzi"
                  className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                >
                  УЗИ диагностика
                </Link>
                <Link
                  href="/vraci"
                  className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                >
                  Прием врачей
                </Link>
                <Link
                  href="/vyezd-vracha"
                  className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                >
                  Выезд врача на дом
                </Link>
                <Link
                  href="/medsestra"
                  className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                >
                  Медсестринская помощь
                </Link>
                <Link
                  href="/stacionar"
                  className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                >
                  Стационарное лечение
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            {/* SEO: H2 с ключевым словом "популярные анализы" */}
            <h2 className="text-lg font-semibold text-slate-900">
              Популярные анализы
            </h2>
            <Link
              href="/analizy"
              className="text-xs font-medium text-emerald-700 hover:underline"
            >
              Все анализы
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {popularAnalyzes.map((item: any) => (
              <Link
                key={item.code}
                href={`/analizy/${item.slug}`}
                className="flex flex-col rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {item.code}
                </span>
                <span className="mt-1 text-slate-900">{item.name}</span>
                <span className="mt-2 text-sm font-semibold text-slate-900">
                  {item.price} ₽
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#e8f0ee] bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100 md:px-7 md:py-6">
          <h2 className="text-base font-semibold text-slate-900 md:text-lg">
            Почему пациенты выбирают «Литех»
          </h2>
          <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2 md:mt-4 md:gap-3 md:text-sm">
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 md:px-4 md:py-3">
              <p className="text-lg font-semibold text-emerald-700 md:text-2xl">
                15+ лет
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600 md:mt-1 md:text-xs">
                опыта лабораторной диагностики и УЗИ в Ставрополе.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 md:px-4 md:py-3">
              <p className="text-lg font-semibold text-emerald-700 md:text-2xl">
                150 000+
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600 md:mt-1 md:text-xs">
                выполненных исследований и доверяющих нам пациентов.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 md:px-4 md:py-3">
              <p className="text-lg font-semibold text-emerald-700 md:text-2xl">
                800+
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600 md:mt-1 md:text-xs">
                видов анализов и УЗИ‑исследований в одном месте.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 md:px-4 md:py-3">
              <p className="text-lg font-semibold text-emerald-700 md:text-2xl">
                3 филиала
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600 md:mt-1 md:text-xs">
                удобные адреса, ранний забор крови и онлайн‑результаты.
              </p>
            </div>
          </div>
        </section>

        <Link
          href="/medsestra"
          className="block rounded-2xl border border-[#e8f0ee] bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100 md:p-5"
        >
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-2 ring-white shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinejoin="round" />
                <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-slate-900 md:text-sm">
                Забор анализов на дому
              </p>
              <p className="mt-0.5 text-[12px] text-slate-600">
                Не можете приехать в клинику? Медсестра приедет в удобное время для забора крови и мазков.
              </p>
            </div>
            <span className="inline-flex items-center text-[12px] font-semibold text-emerald-700">
              Подробнее
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>

        <section>
          <PromoCarousel />
        </section>

        {/* GEO: Секция филиалов — адреса в семантическом HTML помогают
            поисковикам и AI-агрегаторам извлекать геоданные */}
        <section
          className="rounded-3xl border border-[#e8f0ee] bg-gradient-to-br from-gray-50 to-white px-5 py-6 shadow-sm ring-1 ring-slate-100 md:px-7 md:py-7"
          aria-label="Адреса филиалов лаборатории Литех в Ставрополе"
        >
          <div className="flex items-center gap-2 text-slate-900">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinejoin="round" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold">Филиалы</h2>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">

            {/* GEO: каждый адрес обёрнут в <address> — семантический тег для контактных данных */}
            <address className="not-italic rounded-2xl border border-[#e8f0ee] bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100">
              <p className="font-semibold text-slate-900">
                ул. 45 Параллель, д.2
              </p>
              <p className="mt-1.5 text-slate-500">07:30 — 20:00</p>
              <p className="mt-1 text-slate-600">
                Анализы, УЗИ, прием врачей.
              </p>
              <a
                href="tel:+79888652777"
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-600 md:w-auto md:px-4"
              >
                Позвонить
              </a>
              <Link
                href="https://yandex.ru/profile/214201864017?lang=ru"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Как добраться
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </Link>
            </address>

            <address className="not-italic rounded-2xl border border-[#e8f0ee] bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100">
              <p className="font-semibold text-slate-900">
                Ставрополь, ул. 45 Параллель, д.26
              </p>
              <p className="mt-1.5 text-slate-500">07:30 — 19:00</p>
              <p className="mt-1 text-slate-600">
                Анализы, УЗИ, прием врачей, прием детских врачей.
              </p>
              <a
                href="tel:+79888652777"
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-600 md:w-auto md:px-4"
              >
                Позвонить
              </a>
              <Link
                href="https://yandex.ru/profile/183400884271?lang=ru"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Как добраться
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </Link>
            </address>

            <address className="not-italic rounded-2xl border border-[#e8f0ee] bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100">
              <p className="font-semibold text-slate-900">
                пер. Каховский, 26а
              </p>
              <p className="mt-1.5 text-slate-500">08:00 — 20:00</p>
              <p className="mt-1 text-slate-600">
                Анализы, УЗИ, прием врачей, психиатрический, наркологический,
                неврологический круглосуточный стационар.
              </p>
              <a
                href="tel:+79888652777"
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-600 md:w-auto md:px-4"
              >
                Позвонить
              </a>
              <Link
                href="https://yandex.ru/profile/156076200245?lang=ru"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Как добраться
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </Link>
            </address>

          </div>
        </section>

        <section className="rounded-3xl border border-[#e8f0ee] bg-gradient-to-br from-emerald-50 to-white px-5 py-6 shadow-sm ring-1 ring-emerald-100 md:px-7 md:py-7">
          <div className="flex items-center gap-2 text-slate-900">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold">
              Как подготовиться к анализам
            </h2>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-[#e8f0ee] bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <p className="mt-2 font-semibold text-slate-900">
                Общие рекомендации
              </p>
              <p className="mt-1 text-slate-600">
                Кровь сдаётся натощак, за 8–12 часов не есть, за 24 часа избегать
                алкоголя и интенсивных нагрузок.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8f0ee] bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true"><path d="M4 12h16M4 8h8M4 16h12" strokeLinecap="round" /><rect x="2" y="4" width="20" height="16" rx="2" strokeDasharray="2 2" /></svg>
              </span>
              <p className="mt-2 font-semibold text-slate-900">Перед УЗИ</p>
              <p className="mt-1 text-slate-600">
                Подготовка зависит от органа исследования: часть процедур
                проводится натощак, часть — с наполненным мочевым пузырём.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8f0ee] bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <p className="mt-2 font-semibold text-slate-900">
                Индивидуальные особенности
              </p>
              <p className="mt-1 text-slate-600">
                Принимаете лекарства или есть хронические заболевания — сообщите
                администратору или врачу перед сдачей анализов.
              </p>
            </div>
          </div>
        </section>

        <section>
          <ReviewsCarousel />
        </section>

        {/* SEO: FAQ-секция — текстовое содержимое совпадает с FAQ Schema выше,
            что усиливает rich snippet в поиске и цитируемость в AI Overviews (GEO) */}
        <section aria-label="Часто задаваемые вопросы о лаборатории Литех">
          <h2 className="text-lg font-semibold text-slate-900">Вопросы и ответы</h2>
          <div className="mt-4 space-y-2 text-xs">
            <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Как быстро я получу результаты анализов?
              </summary>
              <p className="mt-2 text-slate-600">
                Большинство базовых исследований выполняются в течение 1 рабочего
                дня. Более сложные панели и генетические тесты могут занимать до
                3–5 дней. Актуальные сроки указаны в карточке каждого анализа и
                уточняются при записи.
              </p>
            </details>
            <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Где можно посмотреть результаты?
              </summary>
              <p className="mt-2 text-slate-600">
                Результаты отправляются на электронную почту, а также доступны в
                личном кабинете. При необходимости вы можете получить распечатку в
                любом филиале лаборатории.
              </p>
            </details>
            <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Можно ли сдать анализы без направления от врача?
              </summary>
              <p className="mt-2 text-slate-600">
                Да, вы можете сдать большинство анализов без направления. Для
                сложных исследований и стационарного лечения мы рекомендуем
                предварительную консультацию врача, чтобы подобрать оптимальный
                объём диагностики.
              </p>
            </details>
            <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Делаете ли вы выезд на дом?
              </summary>
              <p className="mt-2 text-slate-600">
                Да, вы можете оформить выезд медсестры на дом для забора крови и
                мазков. Оформить заявку можно по телефону, через мессенджеры или
                на странице «Выезд врача на дом».
              </p>
            </details>
            <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Можно ли получить медсестринскую помощь с моими препаратами?
              </summary>
              <p className="mt-2 text-slate-600">
                Да, возможно выполнение инъекций и других процедур с вашими
                препаратами, если у вас есть оригинальное назначение врача.
                Перед визитом покажите назначение администратору или медсестре.
              </p>
            </details>
          </div>
        </section>

        <section className="rounded-3xl bg-white px-4 py-6 text-center text-slate-900 shadow-sm ring-1 ring-emerald-100 md:px-8 md:py-8">
          <h2 className="text-lg font-semibold md:text-xl">
            Нужна помощь с выбором анализов или записи?
          </h2>
          <p className="mt-2 text-xs text-slate-500 md:text-sm">
            Оставьте заявку, и администратор лаборатории «Литех» перезвонит вам и
            поможет подобрать оптимальное обследование.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 text-xs md:flex-row">
            <Link
              href="/contacts#callback"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            >
              Перезвоните мне
            </Link>
            <Link
              href="/vraci"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Записаться к врачу
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
