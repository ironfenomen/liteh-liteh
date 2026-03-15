import { NextResponse } from "next/server";
import getSitemapEntries from "@/lib/sitemap-urls";

const XML_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatLastMod(date: Date | string | undefined): string {
  if (date === undefined) return new Date().toISOString();
  if (typeof date === "string") return date;
  return date.toISOString();
}

export async function GET() {
  const entries = getSitemapEntries();
  const urlElements = entries
    .map(
      (entry) => `
  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${escapeXml(formatLastMod(entry.lastModified))}</lastmod>
    <changefreq>${escapeXml(entry.changeFrequency ?? "weekly")}</changefreq>
    <priority>${Number(entry.priority ?? 0.5).toFixed(1)}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${XML_NS}">
${urlElements}
</urlset>
`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
