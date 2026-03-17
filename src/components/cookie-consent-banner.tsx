"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!getConsent());
  }, []);

  const accept = () => {
    setConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookie"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(15,23,42,0.08)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
        <p className="text-center text-xs text-slate-600 sm:text-left">
          Мы используем cookie и Яндекс.Метрику, чтобы сайт работал лучше.
        </p>
        <div className="flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto">
          <Link
            href="/privacy-policy"
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Подробнее
          </Link>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
