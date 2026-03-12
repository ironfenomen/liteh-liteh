export type Promotion = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: "uzi" | "svo" | "pension";
};

export const promotions: Promotion[] = [
  {
    id: "uzi",
    title: "Скидка 10% на УЗИ для новых пациентов",
    description:
      "Новые пациенты получают скидку 10% на услуги УЗИ. Подробности уточняйте у администратора при записи.",
    cta: "Записаться",
    href: "/uzi",
    icon: "uzi",
  },
  {
    id: "svo",
    title: "Скидка 10% участникам СВО",
    description:
      "Для участников СВО действует скидка 10% на услуги клиники. При обращении может потребоваться подтверждающий документ.",
    cta: "Подробнее",
    href: "/akcii#svo",
    icon: "svo",
  },
  {
    id: "pension",
    title: "Скидка 10% пенсионерам",
    description:
      "Пенсионерам предоставляется скидка 10% на услуги клиники. Подробности уточняйте у администратора.",
    cta: "Записаться",
    href: "/contacts#callback",
    icon: "pension",
  },
];
