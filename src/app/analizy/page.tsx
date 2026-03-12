"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import analyzes from "../../data/analyses.json";
import { useCart } from "../../components/cart-provider";

type Analyze = {
  code: string;
  name: string;
  slug: string;
  category?: string;
  price?: number;
};

const analyzesList = analyzes as Analyze[];

function normalizeCategory(cat: string | undefined): string {
  return cat && cat.trim() ? cat : "Без категории";
}

export default function AnalizyPage() {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const searchWrapRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    analyzesList.forEach((a) => set.add(normalizeCategory(a.category)));
    return Array.from(set);
  }, []);

  const filteredAnalyzes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return analyzesList.filter((item) => {
      const byQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q);
      const cat = normalizeCategory(item.category);
      const byCategory = category === "all" || cat === category;
      return byQuery && byCategory;
    });
  }, [query, category]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return analyzesList
      .filter((item) => item.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  const groupedByCategory = useMemo(() => {
    const map = new Map<string, Analyze[]>();
    filteredAnalyzes.forEach((a) => {
      const cat = normalizeCategory(a.category);
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(a);
    });
    return map;
  }, [filteredAnalyzes]);

  const categoryOrder = useMemo(() => Array.from(groupedByCategory.keys()), [groupedByCategory]);

  useEffect(() => {
    if (expandedCategories.size === 0 && categoryOrder.length > 0) {
      setExpandedCategories(new Set([categoryOrder[0]]));
    }
  }, [categoryOrder, expandedCategories.size]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = useCallback((item: Analyze) => {
    setQuery(item.name);
    setDropdownOpen(false);
  }, []);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Лабораторные анализы в Ставрополе
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Удобный каталог лабораторных исследований: ищите анализ по названию
          или коду, добавляйте в корзину и отправляйте заявку онлайн. Забор
          биоматериала проводится во всех филиалах лаборатории «Литех».
        </p>
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div ref={searchWrapRef} className="relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <label className="text-[13px] font-medium text-slate-800">
              Поиск анализа
            </label>
            <div className="mt-3 flex gap-3">
              <div className="relative flex-1">
                <input
                  type="search"
                  placeholder="Напишите название или код анализа"
                  className="h-14 w-full rounded-[14px] border border-[#e4ecea] bg-white px-[18px] text-[15px] outline-none ring-0 placeholder:text-slate-400 focus:border-[#2fbf8c] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onFocus={() => query.trim().length >= 2 && setDropdownOpen(true)}
                />
                {dropdownOpen && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[280px] w-full min-w-0 max-w-[calc(100vw-2rem)] overflow-auto rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                    {suggestions.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="flex w-full items-center justify-between gap-2 py-3 px-4 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="font-semibold text-slate-900">{item.name}</span>
                        <span className="shrink-0 text-sm text-gray-500">{item.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <label className="text-[13px] font-medium text-slate-800">
              Категория
            </label>
            <select
              className="mt-3 h-11 w-full rounded-[14px] border border-[#e4ecea] bg-white px-[14px] text-[13px] outline-none focus:border-[#2fbf8c] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as string | "all")
              }
            >
              <option value="all">Все категории</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Каталог анализов
          </h2>
          <p className="text-xs text-slate-500">
            Найдено: {filteredAnalyzes.length}
          </p>
        </div>

        {filteredAnalyzes.length === 0 ? (
          <p className="text-xs text-slate-500">
            Анализы будут автоматически загружены после запуска скрипта
            парсинга.
          </p>
        ) : (
          <div className="space-y-2">
            {categoryOrder.map((catKey) => {
              const items = groupedByCategory.get(catKey) ?? [];
              const isExpanded = expandedCategories.has(catKey);
              const toggleCategory = () => {
                setExpandedCategories((prev) => {
                  const next = new Set(prev);
                  if (next.has(catKey)) next.delete(catKey);
                  else next.add(catKey);
                  return next;
                });
              };
              return (
                <div
                  key={catKey}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={toggleCategory}
                    className={`flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors ${
                      isExpanded
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span className="font-semibold">{catKey}</span>
                    <span className="flex items-center gap-2 text-sm font-normal text-slate-500">
                      <span>{items.length}</span>
                      <span
                        className={`inline-block transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      >
                        ▼
                      </span>
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[max-height] duration-200 ease-in-out ${
                      isExpanded ? "max-h-[5000px]" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-slate-100">
                      {/* Desktop: table header */}
                      <div className="hidden grid-cols-[minmax(0,2.2fr),minmax(0,1.4fr),minmax(0,0.7fr),minmax(0,0.8fr)] border-b border-slate-100 bg-slate-50 px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-slate-500 md:grid">
                        <span>Название</span>
                        <span>Категория</span>
                        <span>Код</span>
                        <span className="text-right">Цена</span>
                      </div>
                      <div className="divide-y divide-slate-100 text-xs">
                        {items.map((item) => (
                          <div
                            key={item.code}
                            className="flex flex-col gap-2 px-4 py-3 md:grid md:grid-cols-[minmax(0,2.2fr),minmax(0,1.4fr),minmax(0,0.7fr),minmax(0,0.8fr)] md:items-center"
                          >
                            <span className="font-medium text-slate-900 md:font-normal">
                              {item.name}
                            </span>
                            <span className="text-slate-500 md:block">
                              {normalizeCategory(item.category)}
                            </span>
                            <span className="font-mono text-[11px] text-slate-600">
                              {item.code}
                            </span>
                            <div className="flex items-center justify-between gap-2 md:justify-end">
                              <span className="font-semibold text-slate-900">
                                {item.price ? `${item.price} ₽` : "уточнить"}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  addItem({
                                    id: `analyze-${item.code}`,
                                    name: item.name,
                                    price: item.price ?? 0,
                                    type: "analyze",
                                    code: item.code,
                                  })
                                }
                                className="rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600 md:py-2"
                              >
                                Записаться
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
