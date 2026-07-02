import type { Metadata } from "next";
import { DOCTORS } from "../../data/doctors";
import SchemaMarkup from "../../components/seo/SchemaMarkup";

const BASE_URL = "https://liteh26.ru";

export const metadata: Metadata = {
  title: "Врачи — Литех",
  description:
    "Каталог врачей сети Литех и клиник Амадея в Ставрополе: психиатры, неврологи, гинекологи, педиатры и другие специалисты. Онлайн-запись, три филиала.",
};

/** ItemList + BreadcrumbList для страницы /vraci — даёт Яндексу карту ФИО→URL каждого врача */
function VraciListSchema() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/vraci#collection`,
    name: "Врачи — Лаборатория Литех",
    url: `${BASE_URL}/vraci`,
    description: "Каталог врачей сети Литех и клиник Амадея в Ставрополе",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: DOCTORS.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Physician",
          "@id": `${BASE_URL}/vraci/${d.id}`,
          name: d.name,
          url: `${BASE_URL}/vraci/${d.id}`,
          medicalSpecialty: d.specialties.length > 0 ? d.specialties[0] : "Медицина",
          worksFor: { "@id": `${BASE_URL}/#clinic` },
        },
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Врачи", item: `${BASE_URL}/vraci` },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}

export default function VraciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const physicians = DOCTORS.map((d) => ({
    id: d.id,
    name: d.name,
    specialties: d.specialties,
    experience: d.experience,
    url: d.bookingUrl ?? undefined,
    image: d.photo ?? undefined,
  }));
  return (
    <>
      <VraciListSchema />
      <SchemaMarkup skipGlobal physicians={physicians} pathname="/vraci" />
      {children}
    </>
  );
}
