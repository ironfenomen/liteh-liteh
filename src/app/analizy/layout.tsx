import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сдать анализы в Ставрополе — цены и каталог | Литех",
  description: "Каталог лабораторных анализов в Ставрополе: поиск по названию и коду, актуальные цены, сроки и запись в филиалы Литех.",
  alternates: { canonical: "/analizy" },
};

export default function AnalizyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
