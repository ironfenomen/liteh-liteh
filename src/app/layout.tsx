import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { CartProvider } from "../components/cart-provider";
import CookieConsentBanner from "../components/cookie-consent-banner";
import MetrikaLoader from "../components/metrika-loader";

export const metadata: Metadata = {
  title: "Литех — лабораторная диагностика и УЗИ в Ставрополе",
  description:
    "Лаборатория «Литех» в Ставрополе — анализы, УЗИ, прием врачей. Онлайн-запись, удобный поиск анализов, чек-апы и филиалы рядом с вами.",
  openGraph: {
    title: "Литех — лабораторная диагностика и УЗИ в Ставрополе",
    description:
      "Современная лаборатория и УЗИ центр «Литех» в Ставрополе. Анализы, чек-апы, УЗИ и прием врачей.",
    type: "website",
    locale: "ru_RU",
  },
};

const MAIN_PHONE = "+7 988 865-27-77";
const TELEGRAM = "@amadeyastav";
const WHATSAPP = "+7 988 865-27-77";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} min-h-screen text-slate-900 antialiased`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/85 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4">
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/liteh-logo.svg"
                  alt="Литех — лабораторная диагностика"
                  width={140}
                  height={44}
                  priority
                  className="h-11 w-auto"
                />
                <span className="hidden text-xs font-medium text-slate-600 sm:inline">
                  Анализы и УЗИ в Ставрополе
                </span>
              </Link>

              <nav className="hidden items-center gap-4 text-sm font-medium text-slate-700 md:flex">
                <Link href="/analizy" className="hover:text-sky-700">
                  Анализы
                </Link>
                <Link href="/uzi" className="hover:text-sky-700">
                  УЗИ
                </Link>
                <Link href="/vraci" className="hover:text-sky-700">
                  Врачи
                </Link>
                <Link href="/filialy" className="hover:text-sky-700">
                  Филиалы
                </Link>
                <Link href="/akcii" className="hover:text-sky-700">
                  Акции
                </Link>
                <Link href="/contacts" className="hover:text-sky-700">
                  Контакты
                </Link>
              </nav>

              <div className="flex items-center gap-2">
                <div className="hidden flex-col text-right text-xs md:flex">
                  <a href={`tel:${MAIN_PHONE}`} className="font-semibold">
                    {MAIN_PHONE}
                  </a>
                  <span className="text-slate-500">Ежедневно с 7:30</span>
                </div>
                <a
                  href={`tel:${MAIN_PHONE}`}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 md:text-sm"
                >
                  Позвонить
                </a>
              </div>
            </div>
          </header>

          <main className="mx-auto flex w-full flex-1 flex-col px-4 py-8 pb-24 md:py-12 md:pb-12">
            <div className="mx-auto mb-10 w-full max-w-5xl rounded-[24px] border border-slate-100 bg-white px-5 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:max-w-6xl md:px-10 md:py-10">
              {children}
            </div>
          </main>

          <footer className="mt-8 border-t border-emerald-100 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
              <div className="text-xs text-slate-500">
                <p>
                  Сайт — продукт клиники «Амадея». Амадея является основным
                  партнером франшизы.
                </p>
                <p className="mt-1">
                  ООО «АМАДЕЯ», ИНН 2635248939, ОГРН 1212600004165. Лицензия
                  Л041-01197-26/00327766 от 10.08.2021, Министерство
                  здравоохранения Ставропольского края.
                </p>
                <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  <Link href="/privacy-policy" className="text-emerald-700 hover:underline">
                    Политика обработки персональных данных
                  </Link>
                  <Link href="/privacy-accept" className="text-emerald-700 hover:underline">
                    Согласие на обработку персональных данных
                  </Link>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-medium text-slate-700">
                  Проекты клиники «Амадея»:
                </span>
                <a
                  href="https://amadeya26.ru"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  Амадея
                </a>
                <a
                  href="https://www.amadeyadetox26.ru"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  Амадея Детокс
                </a>
                <a
                  href="https://amadeyakids.ru"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  Амадея Kids
                </a>
              </div>
            </div>
          </footer>

          <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 md:bottom-6">
            <a
              href={`tel:${MAIN_PHONE}`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-emerald-600 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
              aria-label="Позвонить"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M6.62 10.79a15.053 15.053 0 006.59 6.59l1.98-1.98a1 1 0 011.01-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.25a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.01l-1.98 1.98z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href={`https://t.me/${TELEGRAM.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/30 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-sky-600 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
              aria-label="Написать в Telegram"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M9.04 15.38l-.13 3.62c.19 0 .27-.08.37-.18l1.77-1.7 3.67 2.69c.67.37 1.15.18 1.33-.62l2.41-11.3v-.01c.21-.98-.35-1.36-1.02-1.12L3.8 10.12c-.96.37-.95.9-.17 1.15l3.57 1.11 8.29-5.2c.39-.27.74-.12.45.15l-7.9 7.05z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-emerald-600 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
              aria-label="Написать в WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M20.52 3.48A11.77 11.77 0 0012 0C5.37 0 0 5.37 0 12a11.9 11.9 0 001.72 6.13L0 24l6-1.58A11.9 11.9 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 21.5a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.55.94.95-3.46-.22-.36A9.39 9.39 0 012.5 12 9.5 9.5 0 1121.5 12 9.52 9.52 0 0112 21.5zm5.06-7.11c-.27-.14-1.58-.78-1.83-.87-.24-.09-.42-.14-.59.14-.17.27-.68.87-.83 1.04-.15.17-.31.19-.58.05-.27-.14-1.14-.42-2.17-1.35-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.13-.13.27-.31.41-.46.14-.15.19-.27.29-.46.1-.19.05-.35-.02-.49-.07-.14-.59-1.42-.81-1.95-.21-.5-.42-.43-.59-.44l-.5-.01c-.17 0-.45.07-.69.34-.24.27-.9.88-.9 2.15s.92 2.49 1.05 2.66c.13.17 1.82 2.78 4.41 3.9.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.58-.65 1.8-1.27.22-.62.22-1.15.15-1.27-.07-.12-.24-.19-.5-.32z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-emerald-100 bg-white/95 px-3 py-2.5 shadow-[0_-4px_12px_rgba(15,23,42,0.05)] md:hidden">
            <div className="mx-auto flex max-w-6xl items-stretch justify-between gap-1.5 text-[11px] font-medium text-slate-700">
              <Link
                href="/analizy"
                className="flex flex-1 flex-col items-center rounded-2xl px-2 py-1.5 active:bg-emerald-50"
              >
                <span className="text-[17px] leading-none">🧪</span>
                <span className="mt-0.5">Анализы</span>
              </Link>
              <Link
                href="/uzi"
                className="flex flex-1 flex-col items-center rounded-2xl px-2 py-1.5 active:bg-emerald-50"
              >
                <span className="text-[17px] leading-none">🔍</span>
                <span className="mt-0.5">УЗИ</span>
              </Link>
              <Link
                href="/medsestra"
                className="flex flex-1 flex-col items-center rounded-2xl px-2 py-1.5 active:bg-emerald-50"
              >
                <span className="text-[17px] leading-none">🏠</span>
                <span className="mt-0.5 text-center">Анализы на дому</span>
              </Link>
              <Link
                href="/vyezd-vracha"
                className="flex flex-1 flex-col items-center rounded-2xl px-2 py-1.5 active:bg-emerald-50"
              >
                <span className="text-[17px] leading-none">🚑</span>
                <span className="mt-0.5 text-center">Вызвать врача</span>
              </Link>
              <a
                href={`tel:${MAIN_PHONE}`}
                className="flex flex-1 flex-col items-center rounded-2xl bg-emerald-500 px-2 py-1.5 text-[11px] font-semibold text-white shadow-sm active:bg-emerald-600"
              >
                <span className="text-[17px] leading-none">📞</span>
                <span className="mt-0.5">Позвонить</span>
              </a>
            </div>
          </div>
          <CookieConsentBanner />
          <MetrikaLoader />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
