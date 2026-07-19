import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Медсестра на дом и забор анализов в Ставрополе | Литех",
  description: "Вызов медицинской сестры на дом в Ставрополе для забора анализов и выполнения назначенных процедур.",
  alternates: { canonical: "/medsestra" },
};

export default function MedsestraLayout({ children }: { children: React.ReactNode }) { return children; }
