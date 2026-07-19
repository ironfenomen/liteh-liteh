import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Медицинский стационар в Ставрополе | Литех и Амадея",
  description: "Информация о круглосуточном медицинском стационаре в Ставрополе, направлениях помощи и порядке госпитализации.",
  alternates: { canonical: "/stacionar" },
};

export default function StacionarLayout({ children }: { children: React.ReactNode }) { return children; }
