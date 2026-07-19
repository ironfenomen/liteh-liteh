import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "УЗИ в Ставрополе — цены и запись | Литех",
  description: "УЗИ в Ставрополе для взрослых и детей: направления исследований, цены, филиалы и запись в медицинском центре Литех.",
  alternates: { canonical: "/uzi" },
};

export default function UziLayout({ children }: { children: React.ReactNode }) { return children; }
