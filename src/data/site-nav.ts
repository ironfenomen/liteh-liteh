/**
 * Основная навигация сайта для хедера и JSON-LD SiteNavigationElement.
 * Используется для быстрых ссылок (sitelinks) в Яндексе.
 */

const BASE = "https://liteh26.ru";

export type NavItem = {
  href: string;
  label: string;
  title: string;
};

export const SITE_NAV: NavItem[] = [
  { href: "/", label: "Главная", title: "Литех — главная страница: анализы и УЗИ в Ставрополе" },
  { href: "/analizy", label: "Анализы", title: "Лабораторные анализы в Ставрополе — каталог и цены" },
  { href: "/uzi", label: "УЗИ", title: "УЗИ-диагностика в Ставрополе — виды и цены" },
  { href: "/vraci", label: "Врачи", title: "Врачи лаборатории Литех — запись на приём" },
  { href: "/vyezd-vracha", label: "Выезд врача", title: "Выезд врача на дом в Ставрополе" },
  { href: "/medsestra", label: "Медсестра на дом", title: "Анализы на дому — выезд медсестры" },
  { href: "/stacionar", label: "Стационар", title: "Стационар — лаборатория Литех" },
  { href: "/contacts", label: "Контакты", title: "Контакты и адреса лаборатории Литех в Ставрополе" },
];

/** URL для JSON-LD (полные ссылки) */
export function getSiteNavUrls(): { name: string; url: string }[] {
  return SITE_NAV.map(({ href, label }) => ({
    name: label,
    url: href === "/" ? BASE : `${BASE}${href}`,
  }));
}
