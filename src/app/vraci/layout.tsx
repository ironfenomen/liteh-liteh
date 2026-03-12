import type { Metadata } from "next";
import { DOCTORS } from "../../data/doctors";
import SchemaMarkup from "../../components/seo/SchemaMarkup";

export const metadata: Metadata = {
  title: "Врачи — Литех",
  description:
    "Каталог врачей сети Литех и клиник Амадея в Ставрополе: психиатры, неврологи, гинекологи, педиатры и другие специалисты. Онлайн-запись, три филиала.",
};

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
  }));
  return (
    <>
      <SchemaMarkup skipGlobal physicians={physicians} pathname="/vraci" />
      {children}
    </>
  );
}
