/**
 * JSON-LD Schema.org разметка для SEO (Яндекс, Google).
 * MedicalClinic, Organization, LocalBusiness, BreadcrumbList, SiteNavigationElement, MedicalTest, Physician, FAQPage.
 */

import { getSiteNavUrls } from "../../data/site-nav";

const BASE_URL = "https://liteh26.ru";

const CLINIC = {
  name: "Литех",
  description: "Медицинская лаборатория. Лабораторные анализы, УЗИ диагностика, приём врачей, выезд врача на дом, медицинская сестра на дом, стационар.",
  url: BASE_URL,
  telephone: "+7 (988) 865-27-77",
  address: "Ставрополь, 45 Параллель 2",
  addressRegion: "Ставропольский край",
  addressLocality: "Ставрополь",
  streetAddress: "45 Параллель, 2",
  postalCode: "355000",
  openingHours: "Mo-Su 07:30-20:00",
  priceRange: "₽₽",
  services: [
    "лабораторные анализы",
    "УЗИ диагностика",
    "прием врачей",
    "выезд врача на дом",
    "медицинская сестра на дом",
    "стационар",
  ],
};

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Глобальная разметка: MedicalClinic + Organization + LocalBusiness (одним @graph) */
function GlobalClinicSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${BASE_URL}/#clinic`,
        name: CLINIC.name,
        description: CLINIC.description,
        url: CLINIC.url,
        telephone: CLINIC.telephone,
        address: {
          "@type": "PostalAddress",
          addressLocality: CLINIC.addressLocality,
          addressRegion: CLINIC.addressRegion,
          streetAddress: CLINIC.streetAddress,
          postalCode: CLINIC.postalCode,
          addressCountry: "RU",
        },
        openingHours: CLINIC.openingHours,
        priceRange: CLINIC.priceRange,
        medicalSpecialty: "Laboratory Medicine",
        areaServed: {
          "@type": "City",
          name: CLINIC.addressLocality,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Услуги лаборатории Литех",
          itemListElement: CLINIC.services.map((name, i) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: CLINIC.name,
        url: CLINIC.url,
        telephone: CLINIC.telephone,
        address: {
          "@type": "PostalAddress",
          addressLocality: CLINIC.addressLocality,
          addressRegion: CLINIC.addressRegion,
          streetAddress: CLINIC.streetAddress,
          postalCode: CLINIC.postalCode,
          addressCountry: "RU",
        },
        description: CLINIC.description,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#localbusiness`,
        name: CLINIC.name,
        description: CLINIC.description,
        url: CLINIC.url,
        telephone: CLINIC.telephone,
        address: {
          "@type": "PostalAddress",
          addressLocality: CLINIC.addressLocality,
          addressRegion: CLINIC.addressRegion,
          streetAddress: CLINIC.streetAddress,
          postalCode: CLINIC.postalCode,
          addressCountry: "RU",
        },
        openingHours: CLINIC.openingHours,
        priceRange: CLINIC.priceRange,
      },
    ],
  };
  return <JsonLdScript data={schema} />;
}

/** SiteNavigationElement для быстрых ссылок (sitelinks) в Яндексе */
function SiteNavigationElementSchema() {
  const navLinks = getSiteNavUrls();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Основная навигация сайта Литех",
    "description": "Главные разделы: анализы, УЗИ, врачи, выезд врача, медсестра на дом, стационар, контакты",
    "itemListElement": navLinks.map((item, i) => ({
      "@type": "SiteNavigationElement",
      "position": i + 1,
      "name": item.name,
      "url": item.url,
    })),
  };
  return <JsonLdScript data={schema} />;
}

const BREADCRUMB_MAP: Record<string, { name: string; url: string }[]> = {
  "/": [{ name: "Главная", url: BASE_URL }],
  "/analizy": [
    { name: "Главная", url: BASE_URL },
    { name: "Анализы", url: `${BASE_URL}/analizy` },
  ],
  "/uzi": [
    { name: "Главная", url: BASE_URL },
    { name: "УЗИ", url: `${BASE_URL}/uzi` },
  ],
  "/vraci": [
    { name: "Главная", url: BASE_URL },
    { name: "Врачи", url: `${BASE_URL}/vraci` },
  ],
  "/vyezd-vracha": [
    { name: "Главная", url: BASE_URL },
    { name: "Выезд врача", url: `${BASE_URL}/vyezd-vracha` },
  ],
  "/medsestra": [
    { name: "Главная", url: BASE_URL },
    { name: "Медсестра на дом", url: `${BASE_URL}/medsestra` },
  ],
  "/stacionar": [
    { name: "Главная", url: BASE_URL },
    { name: "Стационар", url: `${BASE_URL}/stacionar` },
  ],
  "/contacts": [
    { name: "Главная", url: BASE_URL },
    { name: "Контакты", url: `${BASE_URL}/contacts` },
  ],
};

function getBreadcrumbsForPath(pathname: string): { name: string; url: string }[] | null {
  const normalized = pathname.replace(/\/$/, "") || "/";
  if (BREADCRUMB_MAP[normalized]) return BREADCRUMB_MAP[normalized];
  // Детальные страницы анализов выводят свои breadcrumbs через пропсы (с названием анализа)
  if (normalized.startsWith("/analizy/") && normalized !== "/analizy") return null;
  return null;
}

function BreadcrumbListSchema({ items }: { items: { name: string; url: string }[] }) {
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

export type MedicalTestData = {
  name: string;
  code?: string;
  description?: string;
  preparation?: string;
  price?: number;
  url: string;
};

function MedicalTestSchema({ test }: { test: MedicalTestData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: test.name,
    ...(test.code && { code: test.code }),
    ...(test.description && { description: test.description }),
    ...(test.preparation && { preparation: test.preparation }),
    ...(test.price != null && {
      offers: {
        "@type": "Offer",
        price: test.price,
        priceCurrency: "RUB",
      },
    }),
    url: test.url,
  };
  return <JsonLdScript data={schema} />;
}

export type PhysicianData = {
  id: string;
  name: string;
  specialties: string[];
  experience?: string | null;
  url?: string;
  image?: string | null;
};

function PhysicianSchema({ physician }: { physician: PhysicianData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: physician.name,
    jobTitle: physician.specialties.length > 0 ? physician.specialties.join(", ") : "Врач",
    medicalSpecialty: physician.specialties.length > 0 ? physician.specialties[0] : "Медицина",
    ...(physician.experience && { description: `Стаж: ${physician.experience}` }),
    worksFor: {
      "@id": `${BASE_URL}/#clinic`,
      "@type": "MedicalClinic",
      name: "Литех",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ставрополь",
      addressRegion: "Ставропольский край",
      addressCountry: "RU",
    },
    areaServed: {
      "@type": "City",
      name: "Ставрополь",
    },
    ...(physician.image && { image: physician.image }),
    ...(physician.url && { url: physician.url }),
  };
  return <JsonLdScript data={schema} />;
}

export type FAQItem = { question: string; answer: string };

function FAQPageSchema({ faq }: { faq: FAQItem[] }) {
  if (!faq.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
  return <JsonLdScript data={schema} />;
}

export type SchemaMarkupProps = {
  /** Путь страницы для BreadcrumbList (например из headers x-pathname) */
  pathname?: string;
  /** Явная цепочка хлебных крошек (переопределяет pathname) */
  breadcrumbs?: { name: string; url: string }[];
  /** Данные анализа — выводится MedicalTest */
  medicalTest?: MedicalTestData;
  /** Список врачей — выводится массив Physician */
  physicians?: PhysicianData[];
  /** Вопросы/ответы — выводится FAQPage */
  faq?: FAQItem[];
  /** Не выводить глобальную разметку клиники (если только страничная) */
  skipGlobal?: boolean;
};

export default async function SchemaMarkup({
  pathname = "",
  breadcrumbs,
  medicalTest,
  physicians,
  faq,
  skipGlobal = false,
}: SchemaMarkupProps) {
  const pathNormalized = pathname.replace(/\/$/, "") || "/";
  const breadcrumbItems =
    breadcrumbs ?? (pathNormalized ? getBreadcrumbsForPath(pathNormalized) : null);

  return (
    <>
      {!skipGlobal && (
        <>
          <GlobalClinicSchema />
          <SiteNavigationElementSchema />
        </>
      )}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <BreadcrumbListSchema items={breadcrumbItems} />
      )}
      {medicalTest && <MedicalTestSchema test={medicalTest} />}
      {physicians?.map((p) => <PhysicianSchema key={p.id} physician={p} />)}
      {faq && faq.length > 0 && <FAQPageSchema faq={faq} />}
    </>
  );
}
