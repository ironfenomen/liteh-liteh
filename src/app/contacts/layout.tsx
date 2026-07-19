import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты лаборатории Литех в Ставрополе",
  description: "Телефон, мессенджеры, адреса и форма обратного звонка лаборатории Литех в Ставрополе.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) { return children; }
