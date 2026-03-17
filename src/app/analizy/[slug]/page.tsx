import type { Metadata } from "next";
import Link from "next/link";
import analyzes from "../../../data/analyses.json";
import SchemaMarkup from "../../../components/seo/SchemaMarkup";

// Не пререндерить все slug — часть путей слишком длинные для файловой системы
export const dynamic = "force-dynamic";

type Analyze = {
  code: string;
  name: string;
  slug: string;
  category?: string;
  price?: number;
  description?: string;
  preparation?: string;
};

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const item = (analyzes as Analyze[]).find(
    (a) => a.slug === params.slug,
  ) as Analyze | undefined;

  const title = item
    ? `${item.name} — анализ в лаборатории «Литех»`
    : "Анализ — лаборатория «Литех»";

  const description = item
    ? `Лабораторный анализ «${item.name}» (код ${item.code}) в лаборатории «Литех» в Ставрополе. Подготовка, сроки и стоимость исследования.`
    : "Подробная информация об анализе в лаборатории «Литех» в Ставрополе.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ru_RU",
    },
  };
}

export default function AnalyzePage({ params }: Props) {
  const item = (analyzes as Analyze[]).find(
    (a) => a.slug === params.slug,
  ) as Analyze | undefined;

  if (!item) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">
          Анализ не найден
        </h1>
        <p className="text-sm text-slate-600">
          Возможно, анализ был удалён или его код изменился. Попробуйте найти
          нужное исследование в общем каталоге.
        </p>
        <Link
          href="/analizy"
          className="inline-flex text-sm font-semibold text-sky-700 hover:underline"
        >
          Вернуться к каталогу анализов
        </Link>
      </div>
    );
  }

  const baseUrl = "https://liteh26.ru";
  return (
    <div className="space-y-8">
      <SchemaMarkup
        skipGlobal
        medicalTest={{
          name: item.name,
          code: item.code,
          description: item.description,
          preparation: item.preparation,
          price: item.price,
          url: `${baseUrl}/analizy/${item.slug}`,
        }}
        breadcrumbs={[
          { name: "Главная", url: baseUrl },
          { name: "Анализы", url: `${baseUrl}/analizy` },
          { name: item.name, url: `${baseUrl}/analizy/${item.slug}` },
        ]}
      />
      <section className="space-y-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {item.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Код анализа:{" "}
              <span className="font-mono text-xs text-slate-700">
                {item.code}
              </span>
              {item.category && (
                <>
                  {" "}
                  · Категория:{" "}
                  <span className="text-slate-700">{item.category}</span>
                </>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Стоимость</p>
            <p className="text-xl font-semibold text-slate-900">
              {item.price ? `${item.price} ₽` : "уточнить"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Описание исследования
          </h2>
          <p className="text-sm text-slate-600">
            {item.description ||
              "Подробное описание анализа будет добавлено после уточнения методик и нормативов лаборатории. Сейчас вы можете уточнить показания и интерпретацию результатов у врача клиники-партнера «Амадея»."}
          </p>
        </div>
        <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Подготовка к анализу
          </h2>
          <p className="text-sm text-slate-600">
            {item.preparation ||
              "Общие рекомендации: сдавать кровь натощак (8–12 часов не есть), избегать алкоголя и интенсивных нагрузок за сутки до исследования. Принимаете лекарства — обсудите подготовку с врачом."}
          </p>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-emerald-100 md:p-6">
        <h2 className="text-sm font-semibold">Оформить заявку на анализ</h2>
        <p className="text-xs text-slate-600">
          Добавьте анализ в корзину и отправьте контактные данные — администратор
          лаборатории свяжется с вами для согласования даты и времени.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            Добавить в корзину
          </button>
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

