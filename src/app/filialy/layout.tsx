import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Филиалы Литех в Ставрополе — адреса и часы работы",
  description: "Адреса филиалов лаборатории Литех в Ставрополе, часы работы, доступные анализы, УЗИ и приём врачей.",
  alternates: { canonical: "/filialy" },
};

export default function FilialyLayout({ children }: { children: React.ReactNode }) { return children; }
