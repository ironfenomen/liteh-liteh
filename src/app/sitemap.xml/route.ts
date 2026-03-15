/**
 * Единственный канонический Sitemap: https://liteh26.ru/sitemap.xml
 * Отдаётся с HTTP 200 и Content-Type: application/xml; charset=utf-8.
 * www.liteh26.ru/sitemap.xml редиректится на этот URL через next.config redirects.
 */
import getSitemapEntries from "@/lib/sitemap-urls";

export const dynamic = "force-dynamic";

const XML_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET() {
  const entries = getSitemapEntries();

  const urlBlocks = entries.map((entry) => {
    const loc = escapeXml(entry.url);
    const cf = entry.changeFrequency ?? "weekly";
    const pri = Number(entry.priority ?? 0.5).toFixed(1);
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${cf}</changefreq>
    <priority>${pri}</priority>
  </url>`;
  });

  const xml =
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    `<urlset xmlns="${XML_NS}">\n` +
    urlBlocks.join("\n") +
    "\n</urlset>";

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
