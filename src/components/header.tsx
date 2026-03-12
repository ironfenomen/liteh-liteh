"use client";

import type { MouseEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { submitLead } from "../lib/submit-lead";

const MAIN_PHONE = "+7 988 865-27-77";
const TEL_HREF = "tel:+79888652777";
const TELEGRAM = "@amadeyastav";
const WHATSAPP = "+7 988 865-27-77";

const navItems = [
  { href: "/analizy", label: "Анализы" },
  { href: "/uzi", label: "УЗИ" },
  { href: "/vraci", label: "Врачи" },
  { href: "/filialy", label: "Филиалы" },
  { href: "/akcii", label: "Акции" },
  { href: "/contacts", label: "Контакты" },
] as const;

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbSubmitting, setCbSubmitting] = useState(false);
  const [cbSent, setCbSent] = useState(false);
  const [cbError, setCbError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    event.preventDefault();
    router.push("/");
  };

  const handleCallbackSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCbError(null);
    const name = cbName.trim();
    const phone = cbPhone.trim();
    if (!phone) {
      setCbError("Укажите телефон.");
      return;
    }
    setCbSubmitting(true);
    try {
      const res = await submitLead({
        formName: "Заказ обратного звонка (мобильное меню)",
        name,
        phone,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCbError(
          data.error === "PHONE_REQUIRED"
            ? "Укажите телефон."
            : "Не удалось отправить заявку. Попробуйте позже."
        );
        return;
      }
      setCbSent(true);
      setCbName("");
      setCbPhone("");
    } finally {
      setCbSubmitting(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[100] border-b border-emerald-100 bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-md shadow-slate-200/50" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4">
          <Link href="/" onClick={handleLogoClick} className="flex shrink-0 items-center gap-4">
            <Image
              src="/liteh-logo.svg"
              alt="Литех — лабораторная диагностика"
              width={140}
              height={44}
              priority
              className="h-11 w-auto shrink-0"
            />
            <span className="hidden text-xs font-medium text-slate-600 sm:inline">
              Анализы и УЗИ в Ставрополе
            </span>
          </Link>

          <a
            href={TEL_HREF}
            className="text-[13px] font-medium text-slate-800 md:hidden whitespace-nowrap"
          >
            +7 988 865-27-77
          </a>

          <nav className="hidden items-center gap-4 text-sm font-medium text-slate-700 md:flex">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-sky-700">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden flex-col text-right text-xs md:flex">
              <a href={TEL_HREF} className="font-semibold">
                {MAIN_PHONE}
              </a>
              <span className="text-slate-500">Ежедневно с 7:30</span>
            </div>
            <a
              href={TEL_HREF}
              className="hidden items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 md:inline-flex md:text-sm"
            >
              Позвонить
            </a>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
              aria-label="Открыть меню"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-[110] md:hidden"
        aria-hidden={!drawerOpen}
        style={{ pointerEvents: drawerOpen ? "auto" : "none" }}
      >
        {drawerOpen && (
          <div
            className="absolute inset-0 bg-slate-900 opacity-40 transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
          />
        )}
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <Image
                src="/liteh-logo.svg"
                alt="Литех"
                width={110}
                height={32}
                className="h-7 w-auto"
              />
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Закрыть меню"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col overflow-auto px-2 py-3">
            {navItems.map(({ href, label }, index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setDrawerOpen(false)}
                className={`group flex items-center justify-between border-b border-slate-100 px-3 py-3 text-[18px] font-medium tracking-[0.01em] text-slate-800 transition-transform duration-200 ease-out ${
                  drawerOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${50 * (index + 1)}ms` }}
              >
                <span>{label}</span>
                <span className="ml-3 text-slate-300 transition-colors group-hover:text-emerald-500">
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-100 px-4 pt-2 pb-1">
            <div className="flex justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition hover:bg-emerald-600"
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
              <a
                href={`https://t.me/${TELEGRAM.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm transition hover:bg-sky-600"
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
            </div>
          </div>

          <div className="border-t border-slate-100 px-4 pb-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setCallbackOpen((v) => !v);
                setCbError(null);
              }}
              className="mx-auto mb-1 flex h-[48px] w-full max-w-sm items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-4 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-100"
            >
              Заказать обратный звонок
            </button>
            {callbackOpen && (
              <form
                onSubmit={handleCallbackSubmit}
                className="mx-auto mb-3 w-full max-w-sm space-y-2 text-xs"
              >
                <input
                  type="text"
                  placeholder="Как к вам обращаться"
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
                  value={cbName}
                  onChange={(e) => setCbName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
                  value={cbPhone}
                  onChange={(e) => setCbPhone(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={cbSubmitting}
                  className="flex h-9 w-full items-center justify-center rounded-lg bg-emerald-500 text-[12px] font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-70"
                >
                  {cbSubmitting ? "Отправляем..." : "Отправить заявку"}
                </button>
                {cbError && (
                  <p className="text-[11px] text-rose-500">{cbError}</p>
                )}
                {cbSent && !cbError && (
                  <p className="text-[11px] text-emerald-600">
                    Заявка отправлена. Мы перезвоним в ближайшее время.
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="border-t border-slate-100 px-4 pb-4 pt-1">
            <a
              href={TEL_HREF}
              onClick={() => setDrawerOpen(false)}
              className="mx-auto flex h-[52px] max-w-sm items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 text-white shadow-lg shadow-emerald-500/40 transition hover:brightness-105"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l1.98-1.98a1 1 0 011.01-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.25a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.01l-1.98 1.98z" />
              </svg>
              <div className="flex flex-col items-center leading-tight">
                <span className="text-sm font-semibold">{MAIN_PHONE}</span>
                <span className="text-[11px] text-emerald-700">
                  Ежедневно с 7:30
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
