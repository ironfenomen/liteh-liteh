import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вызов врача на дом в Ставрополе | Литех",
  description: "Вызов врача на дом в Ставрополе: оставьте заявку, администратор уточнит специалиста, время и стоимость выезда.",
  alternates: { canonical: "/vyezd-vracha" },
};

export default function VyezdVrachaLayout({ children }: { children: React.ReactNode }) { return children; }
