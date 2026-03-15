/**
 * Данные для sitemap.xml. Используется в app/sitemap.xml/route.ts.
 * Раньше использовался app/sitemap.ts (MetadataRoute), но ответ мог отдаваться как plain text;
 * явный route handler гарантирует валидный XML и Content-Type.
 */
import analysesData from "@/data/analyses.json";

const baseUrl = "https://liteh26.ru";

export type SitemapEntry = {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

const staticPages: SitemapEntry[] = [
  { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${baseUrl}/analizy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/uzi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${baseUrl}/vraci`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/vyezd-vracha`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${baseUrl}/medsestra`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/filialy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/akcii`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  { url: `${baseUrl}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${baseUrl}/stacionar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
];

function getAnalysisPages(): SitemapEntry[] {
  try {
    const list = Array.isArray(analysesData) ? analysesData : [];
    return list
      .filter((item: { slug?: string }) => item != null && typeof item?.slug === "string" && item.slug.length > 0)
      .map((item: { slug: string }) => ({
        url: `${baseUrl}/analizy/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    return [];
  }
}

export default function getSitemapEntries(): SitemapEntry[] {
  try {
    const analysisPages = getAnalysisPages();
    return [...staticPages, ...analysisPages];
  } catch {
    return staticPages;
  }
}
