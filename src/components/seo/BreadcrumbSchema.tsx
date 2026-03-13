/**
 * JSON-LD Schema.org BreadcrumbList.
 * Формируется автоматически по pathname (URL).
 */

const BASE_URL = "https://liteh26.ru";

const PATH_LABELS: Record<string, string> = {
  "": "Главная",
  "/": "Главная",
  analizy: "Анализы",
  uzi: "УЗИ",
  vraci: "Врачи",
  "vyezd-vracha": "Выезд врача",
  medsestra: "Медсестра на дом",
  stacionar: "Стационар",
  contacts: "Контакты",
  filialy: "Филиалы",
  akcii: "Акции",
};

function buildBreadcrumb(pathname: string): { name: string; url: string }[] {
  const normalized = pathname.replace(/^\//, "").replace(/\/$/, "") || "";
  if (!normalized) {
    return [{ name: "Главная", url: BASE_URL }];
  }
  const segments = normalized.split("/").filter(Boolean);
  const items: { name: string; url: string }[] = [
    { name: "Главная", url: BASE_URL },
  ];
  let path = "";
  for (let i = 0; i < segments.length; i++) {
    path += `/${segments[i]}`;
    const label = PATH_LABELS[segments[i]] ?? segments[i];
    items.push({
      name: label,
      url: `${BASE_URL}${path}`,
    });
  }
  return items;
}

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type Props = {
  pathname: string;
};

export default function BreadcrumbSchema({ pathname }: Props) {
  const items = buildBreadcrumb(pathname);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLdScript data={schema} />;
}
