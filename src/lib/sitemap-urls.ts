/**
 * Источник URL для единственного канонического Sitemap: https://liteh26.ru/sitemap.xml
 * Соответствие: протокол Sitemap, требования Яндекса (Вебмастер, индексация, гео).
 *
 * В Sitemap попадают только индексируемые канонические страницы (200 OK, без noindex).
 * Исключены: cart, privacy-policy, privacy-accept, api, служебные и нецелевые страницы.
 */
import analysesData from "@/data/analyses.json";

/** Канонический домен без www. Все <loc> только с этим хостом. */
const BASE = "https://liteh26.ru";

const MAX_URLS = 50000;

export type SitemapEntry = {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

/** Статические посадочные страницы: главная, услуги, гео, контакты. Порядок и приоритет — под обход и SEO. */
const staticEntries: SitemapEntry[] = [
  { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/analizy`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE}/uzi`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE}/vraci`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE}/vyezd-vracha`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/medsestra`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/filialy`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/akcii`, changeFrequency: "weekly", priority: 0.6 },
  { url: `${BASE}/contacts`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/stacionar`, changeFrequency: "monthly", priority: 0.5 },
];

function getAnalysisEntries(): SitemapEntry[] {
  try {
    const list = Array.isArray(analysesData) ? analysesData : [];
    return list
      .filter((item: { slug?: string }) => item != null && typeof item?.slug === "string" && item.slug.trim().length > 0)
      .slice(0, MAX_URLS - staticEntries.length)
      .map((item: { slug: string }) => ({
        url: `${BASE}/analizy/${item.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    return [];
  }
}

/** Возвращает список URL для Sitemap: только канонические, без www, без дублей, не более 50 000. */
export default function getSitemapEntries(): SitemapEntry[] {
  const analysis = getAnalysisEntries();
  const combined = [...staticEntries, ...analysis];
  const seen = new Set<string>();
  const out: SitemapEntry[] = [];
  for (const e of combined) {
    const u = e.url.trim();
    if (!u.startsWith(BASE) || u.includes("www.")) continue;
    if (seen.has(u)) continue;
    seen.add(u);
    out.push(e);
  }
  return out;
}
