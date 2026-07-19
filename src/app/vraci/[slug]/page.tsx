import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLINICS } from "@/data/clinics";
import { DOCTORS } from "@/data/doctors";

type Props = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = "https://liteh26.ru";

export function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ slug: doctor.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = DOCTORS.find((entry) => entry.id === slug);
  if (!doctor) return { title: "Врач не найден | Литех", robots: { index: false, follow: false } };

  const specialty = doctor.specialties.slice(0, 2).join(", ") || "врач";
  const title = `${doctor.name} — ${specialty} в Ставрополе | Литех`;
  const description = `${doctor.name}: ${doctor.specialties.join(", ")}. Приём в Ставрополе${doctor.experience ? `, стаж ${doctor.experience}` : ""}. Адреса филиалов и онлайн-запись.`;
  const canonical = `/vraci/${doctor.id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${canonical}`,
      type: "profile",
      locale: "ru_RU",
      images: doctor.photo ? [{ url: doctor.photo }] : undefined,
    },
  };
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const doctor = DOCTORS.find((entry) => entry.id === slug);
  if (!doctor) notFound();

  const url = `${BASE_URL}/vraci/${doctor.id}`;
  const clinics = doctor.clinicIds.map((clinicId) => CLINICS[clinicId]);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${url}#physician`,
        name: doctor.name,
        url,
        image: doctor.photo ?? undefined,
        jobTitle: doctor.specialties.join(", "),
        medicalSpecialty: doctor.specialties,
        description: [
          doctor.specialties.join(", "),
          doctor.experience ? `Стаж ${doctor.experience}` : null,
          doctor.badge,
        ].filter(Boolean).join(". "),
        worksFor: clinics.map((clinic) => ({
          "@type": "MedicalClinic",
          name: clinic.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ставрополь",
            streetAddress: clinic.address.replace(/^Ставрополь,\s*/i, ""),
            addressCountry: "RU",
          },
        })),
        areaServed: { "@type": "City", name: "Ставрополь" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Врачи", item: `${BASE_URL}/vraci` },
          { "@type": "ListItem", position: 3, name: doctor.name, item: url },
        ],
      },
    ],
  };

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="grid gap-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-[180px,minmax(0,1fr)] md:p-7">
        <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100">
          {doctor.photo ? (
            <Image src={doctor.photo} alt={doctor.name} width={360} height={360} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl text-slate-300" aria-hidden>+</div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-700">Врач в Ставрополе</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">{doctor.name}</h1>
          <p className="mt-3 text-base text-slate-700">{doctor.specialties.join(", ")}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
            {doctor.experience ? <span className="rounded-full bg-slate-100 px-3 py-1">Стаж {doctor.experience}</span> : null}
            {doctor.badge ? <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">{doctor.badge}</span> : null}
            {doctor.priceFrom ? <span className="rounded-full bg-slate-100 px-3 py-1">Приём {doctor.priceFrom}</span> : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {doctor.bookingUrl ? (
              <a href={doctor.bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                Записаться онлайн
              </a>
            ) : (
              <Link href="/contacts#callback" className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                Уточнить запись
              </Link>
            )}
            <Link href="/vraci" className="rounded-xl border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
              Все врачи
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Где принимает</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {clinics.map((clinic) => (
            <li key={clinic.id} className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{clinic.name}</p>
              <p className="mt-1 text-sm text-slate-600">{clinic.address}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
