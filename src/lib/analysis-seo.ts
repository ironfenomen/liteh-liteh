import analyses from "@/data/analyses.json";
import seoEntries from "@/data/analyses-seo.json";

export type AnalysisRecord = {
  code: string;
  name: string;
  slug: string;
  category?: string;
  price?: number;
  biomaterial?: string;
  duration?: string;
};

export type AnalysisSeoRecord = {
  slug: string;
  title: string;
  description: string;
  when_prescribed?: string;
  preparation: string;
  material?: string;
  method?: string;
  result_time?: string;
  related_slugs?: string[];
};

const SEO_CODE_BY_SLUG: Record<string, string> = {
  alt: "09.01",
  ast: "09.02",
  glukoza: "09.18",
  "obshchiy-analiz-krovi": "19.01",
  "biohimicheskiy-analiz-krovi": "52.41",
  hcg: "06.01",
  feritin: "09.48",
  "vitamin-d": "09.67",
};

const analysisList = analyses as AnalysisRecord[];
const seoList = seoEntries as AnalysisSeoRecord[];

export type ResolvedAnalysis = {
  item: AnalysisRecord;
  seo: AnalysisSeoRecord | null;
  canonicalSlug: string;
  indexable: boolean;
};

export function getIndexableAnalyses(): ResolvedAnalysis[] {
  return Object.entries(SEO_CODE_BY_SLUG).flatMap(([canonicalSlug, code]) => {
    const item = analysisList.find((entry) => entry.code === code);
    const seo = seoList.find((entry) => entry.slug === canonicalSlug);
    return item && seo ? [{ item, seo, canonicalSlug, indexable: true }] : [];
  });
}

export function resolveAnalysis(slug: string): ResolvedAnalysis | null {
  const curated = getIndexableAnalyses().find(
    (entry) => entry.canonicalSlug === slug || entry.item.slug === slug,
  );
  if (curated) return curated;

  const item = analysisList.find((entry) => entry.slug === slug);
  if (!item) return null;
  return { item, seo: null, canonicalSlug: item.slug, indexable: false };
}

export function getCanonicalAnalysisSlug(item: Pick<AnalysisRecord, "code" | "slug">): string {
  const curated = getIndexableAnalyses().find((entry) => entry.item.code === item.code);
  return curated?.canonicalSlug ?? item.slug;
}
