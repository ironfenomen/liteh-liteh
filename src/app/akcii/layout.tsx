import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Акции на анализы и УЗИ в Ставрополе | Литех",
  description: "Актуальные акции и специальные предложения лаборатории Литех на анализы, УЗИ и медицинские услуги в Ставрополе.",
  alternates: { canonical: "/akcii" },
};

export default function AkciiLayout({ children }: { children: React.ReactNode }) { return children; }
