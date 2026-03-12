import type { Metadata } from "next";

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
  return <>{children}</>;
}
