import { homeJsonLd } from "@/data/home-json-ld";

/**
 * Серверный компонент: JSON-LD для главной в начальном HTML (без блокировки LCP).
 */
export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
    />
  );
}
