/**
 * JSON-LD Schema.org: MedicalOrganization, LocalBusiness, Organization.
 * Для Google Rich Results и Yandex Schema Validator.
 */

const BASE_URL = "https://liteh26.ru";

const data = {
  name: "Литех Ставрополь",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  streetAddress: "45 Параллель 2",
  addressLocality: "Ставрополь",
  addressCountry: "RU",
  telephone: "+7 (988) 865-27-77",
  medicalSpecialty: ["DiagnosticLaboratory", "MedicalClinic"],
  priceRange: "$$",
  sameAs: [] as string[],
};

function JsonLdScript({ data: schema }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function MedicalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": `${BASE_URL}/#medical-organization`,
        name: data.name,
        url: data.url,
        logo: data.logo,
        telephone: data.telephone,
        priceRange: data.priceRange,
        medicalSpecialty: data.medicalSpecialty,
        address: {
          "@type": "PostalAddress",
          streetAddress: data.streetAddress,
          addressLocality: data.addressLocality,
          addressCountry: data.addressCountry,
        },
        sameAs: data.sameAs,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#local-business`,
        name: data.name,
        url: data.url,
        logo: data.logo,
        telephone: data.telephone,
        priceRange: data.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: data.streetAddress,
          addressLocality: data.addressLocality,
          addressCountry: data.addressCountry,
        },
        sameAs: data.sameAs,
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: data.name,
        url: data.url,
        logo: data.logo,
        telephone: data.telephone,
        address: {
          "@type": "PostalAddress",
          streetAddress: data.streetAddress,
          addressLocality: data.addressLocality,
          addressCountry: data.addressCountry,
        },
        sameAs: data.sameAs,
      },
    ],
  };
  return <JsonLdScript data={schema} />;
}
