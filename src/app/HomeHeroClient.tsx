"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import analysesData from "@/data/analyses.json";
import { getCanonicalAnalysisSlug } from "@/lib/analysis-seo";

type Analyze = {
  code?: string;
  name: string;
  slug?: string;
  price?: number | null;
};

const analysesList = (analysesData as Analyze[]).slice(0, 6);

export function HomeHeroClient() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return analysesList
      .filter((item) => {
        const name = item.name.toLowerCase();
        const code = (item.code ?? "").toLowerCase();
        return name.includes(q) || code.includes(q);
      })
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectSuggestion = (item: Analyze) => {
    setQuery("");
    setDropdownOpen(false);
    if (item.slug) {
      router.push(`/analizy/${getCanonicalAnalysisSlug({ code: item.code ?? "", slug: item.slug })}`);
    } else {
      router.push("/analizy");
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={searchWrapRef}
        className="relative mx-auto max-w-2xl rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
      >
        <p className="text-[13px] font-medium text-slate-800">
          Найдите нужный анализ по названию или коду
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="Например, общий анализ крови или 01-001"
            className="h-14 w-full rounded-[14px] border border-[#e4ecea] bg-white px-[18px] text-[15px] leading-none outline-none ring-0 placeholder:text-slate-400 focus:border-[#2fbf8c] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)] sm:flex-1"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => query.trim().length >= 1 && setDropdownOpen(true)}
            aria-label="Поиск анализов по названию или коду"
          />
          <Link
            href="/analizy"
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-[14px] bg-[linear-gradient(135deg,#2fbf8c,#1aa97a)] px-4 py-[14px] text-[13px] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)] sm:w-auto md:px-[22px]"
          >
            К каталогу
          </Link>
        </div>
        {dropdownOpen && suggestions.length > 0 && (
          <div className="absolute left-4 right-4 top-full z-40 mt-2 max-h-80 overflow-auto rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
            {suggestions.map((item) => (
              <button
                key={item.slug ?? item.code ?? item.name}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs transition-colors hover:bg-slate-50"
              >
                <span className="line-clamp-2 font-medium text-slate-900">
                  {item.name}
                </span>
                <span className="shrink-0 text-[11px] font-semibold text-slate-500">
                  {item.price != null ? `${item.price} ₽` : item.code ?? ""}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5 text-xs text-slate-600">
        <span className="rounded-full bg-white px-3 py-1">Забор крови с 07:30</span>
        <span className="rounded-full bg-white px-3 py-1">Результаты онлайн</span>
        <span className="rounded-full bg-white px-3 py-1">Филиалы рядом с домом</span>
        <Link
          href="/medsestra"
          className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 transition hover:bg-emerald-200"
        >
          Забор анализов на дому
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
        <Link
          href="/contacts#callback"
          className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          Записаться онлайн
        </Link>
        <a
          href="tel:+79888652777"
          className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          Позвонить администратору
        </a>
      </div>
    </div>
  );
}
