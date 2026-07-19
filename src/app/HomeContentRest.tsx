"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import analysesData from "@/data/analyses.json";
import { getCanonicalAnalysisSlug } from "@/lib/analysis-seo";

const analysesList = (analysesData as { code?: string; name: string; slug?: string; price?: number | null }[]).slice(0, 6);
const popularAnalyzes = analysesList.slice(0, 6);

const PromoCarousel = dynamic(() => import("../components/promo-carousel"), {
  ssr: false,
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
    ssr: false,
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

const FAQSection = dynamic(() => import("../components/faq-section"), {
  ssr: true,
  loading: () => (
    <section aria-label="Часто задаваемые вопросы о лаборатории Литех">
      <div className="h-6 w-48 rounded bg-slate-100" />
      <div className="mt-4 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-2xl bg-slate-50" />
        ))}
      </div>
    </section>
  ),
});

export function HomeContentRest() {
  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
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
          {popularAnalyzes.map((item) => (
            <Link
              key={item.code}
              href={`/analizy/${getCanonicalAnalysisSlug({ code: item.code ?? "", slug: item.slug ?? "" })}`}
              className="flex flex-col rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
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
          <address className="not-italic rounded-2xl border border-[#e8f0ee] bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100">
            <p className="font-semibold text-slate-900">ул. 45 Параллель, д.2</p>
            <p className="mt-1.5 text-slate-500">07:30 — 20:00</p>
            <p className="mt-1 text-slate-600">Анализы, УЗИ, прием врачей.</p>
            <a
              href="tel:+79888652777"
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-800 md:w-auto md:px-4"
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
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-800 md:w-auto md:px-4"
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
            <p className="font-semibold text-slate-900">пер. Каховский, 26а</p>
            <p className="mt-1.5 text-slate-500">08:00 — 20:00</p>
            <p className="mt-1 text-slate-600">
              Анализы, УЗИ, прием врачей, психиатрический, наркологический,
              неврологический круглосуточный стационар.
            </p>
            <a
              href="tel:+79888652777"
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-800 md:w-auto md:px-4"
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
          <h2 className="text-lg font-semibold">Как подготовиться к анализам</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[#e8f0ee] bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-emerald-100">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <p className="mt-2 font-semibold text-slate-900">Общие рекомендации</p>
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
            <p className="mt-2 font-semibold text-slate-900">Индивидуальные особенности</p>
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

      <FAQSection />

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
            className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
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
    </>
  );
}
