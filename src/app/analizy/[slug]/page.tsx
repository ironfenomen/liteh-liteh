import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { resolveAnalysis } from "@/lib/analysis-seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = "https://liteh26.ru";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveAnalysis(slug);
  if (!resolved) {
    return { title: "Анализ не найден | Литех", robots: { index: false, follow: false } };
  }

  const { item, seo, canonicalSlug, indexable } = resolved;
  const title = `Сдать ${seo?.title ?? item.name} — цена в Ставрополе | Литех`;
  const description = seo
    ? `${seo.description} Стоимость: ${item.price != null ? `${item.price} ₽` : "уточняется"}. Сдать анализ в лаборатории «Литех» в Ставрополе.`
    : `Анализ «${item.name}», код ${item.code}. Актуальную стоимость и подготовку уточняйте в лаборатории «Литех» в Ставрополе.`;

  return {
    title,
    description,
    alternates: { canonical: `/analizy/${canonicalSlug}` },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ru_RU",
      url: `${BASE_URL}/analizy/${canonicalSlug}`,
    },
  };
}

export default async function AnalyzePage({ params }: Props) {
  const { slug } = await params;
  const resolved = resolveAnalysis(slug);
  if (!resolved) notFound();

  const { item, seo, canonicalSlug, indexable } = resolved;
  if (indexable && slug !== canonicalSlug) {
    permanentRedirect(`/analizy/${canonicalSlug}`);
  }

  const canonicalUrl = `${BASE_URL}/analizy/${canonicalSlug}`;
  const description = seo?.description ??
    "Страница исследования сохранена для каталога. Подробное медицинское описание готовится и пока не индексируется поисковыми системами.";
  const preparation = seo?.preparation ??
    "Требования к подготовке зависят от исследования. Уточните их у администратора лаборатории перед сдачей анализа.";

  return (
    <div className="space-y-8">
      <SchemaMarkup
        skipGlobal
        medicalTest={{
          name: seo?.title ?? item.name,
          code: item.code,
          description,
          preparation,
          price: item.price,
          url: canonicalUrl,
        }}
        breadcrumbs={[
          { name: "Главная", url: BASE_URL },
          { name: "Анализы", url: `${BASE_URL}/analizy` },
          { name: seo?.title ?? item.name, url: canonicalUrl },
        ]}
      />

      <section className="space-y-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {seo?.title ?? item.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Код анализа: <span className="font-mono text-xs text-slate-700">{item.code}</span>
              {item.category ? <> · Категория: <span className="text-slate-700">{item.category}</span></> : null}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Стоимость</p>
            <p className="text-xl font-semibold text-slate-900">
              {item.price != null ? `${item.price} ₽` : "уточнить"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">Описание исследования</h2>
          <p className="text-sm text-slate-600">{description}</p>
          {seo?.when_prescribed ? (
            <>
              <h2 className="text-sm font-semibold text-slate-900">Когда назначают</h2>
              <p className="text-sm text-slate-600">{seo.when_prescribed}</p>
            </>
          ) : null}
        </div>
        <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">Подготовка к анализу</h2>
          <p className="text-sm text-slate-600">{preparation}</p>
          {item.biomaterial || seo?.material ? (
            <p className="text-xs text-slate-500">Биоматериал: {seo?.material ?? item.biomaterial}</p>
          ) : null}
          {item.duration || seo?.result_time ? (
            <p className="text-xs text-slate-500">Срок: {seo?.result_time ?? item.duration}</p>
          ) : null}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-emerald-100 md:p-6">
        <h2 className="text-sm font-semibold">Записаться на анализ</h2>
        <p className="text-xs text-slate-600">
          Администратор подтвердит подготовку, стоимость, филиал и удобное время.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/contacts#callback"
            className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            Оставить заявку
          </Link>
          <Link
            href="/analizy"
            className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-5 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Вернуться к каталогу
          </Link>
        </div>
      </section>
    </div>
  );
}
