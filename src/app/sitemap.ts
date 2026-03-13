import type { MetadataRoute } from "next";
import analysesData from "@/data/analyses.json";

const baseUrl = "https://liteh26.ru";

const staticPages: MetadataRoute.Sitemap = [
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

function getAnalysisPages(): MetadataRoute.Sitemap {
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

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    const analysisPages = getAnalysisPages();
    return [...staticPages, ...analysisPages];
  } catch {
    return staticPages;
  }
}

