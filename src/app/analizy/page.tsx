"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import analyzes from "../../data/analyzes.json";
import { useCart } from "../../components/cart-provider";

type Analyze = {
  code: string;
  name: string;
  slug: string;
  category?: string;
  price?: number;
};

export default function AnalizyPage() {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    (analyzes as Analyze[]).forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set);
  }, []);

  const filteredAnalyzes = useMemo(() => {
    const list = analyzes as Analyze[];
    return list.filter((item) => {
      const q = query.trim().toLowerCase();
      const byQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q);
      const byCategory = category === "all" || item.category === category;
      return byQuery && byCategory;
    });
  }, [query, category]);

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
          <div className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-100">
            <label className="text-[13px] font-medium text-slate-800">
              Поиск анализа
            </label>
            <div className="mt-3 flex gap-3">
              <input
                type="search"
                placeholder="Напишите название или код анализа"
                className="h-14 flex-1 rounded-[14px] border border-[#e4ecea] bg-white px-[18px] text-[15px] outline-none ring-0 placeholder:text-slate-400 focus:border-[#2fbf8c] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-100">
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
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="grid grid-cols-[minmax(0,2.2fr),minmax(0,1.4fr),minmax(0,0.7fr),minmax(0,0.8fr)] border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              <span>Название</span>
              <span>Категория</span>
              <span>Код</span>
              <span className="text-right">Цена</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {filteredAnalyzes.map((item) => (
                <button
                  type="button"
                  key={item.code}
                  onClick={() =>
                    addItem({
                      id: `analyze-${item.code}`,
                      name: item.name,
                      price: item.price ?? 0,
                      type: "analyze",
                      code: item.code,
                    })
                  }
                  className="grid w-full grid-cols-[minmax(0,2.2fr),minmax(0,1.4fr),minmax(0,0.7fr),minmax(0,0.8fr)] items-center px-4 py-3 text-left transition-colors duration-150 hover:bg-slate-50"
                >
                  <span className="pr-2 text-slate-900">{item.name}</span>
                  <span className="pr-2 text-slate-500">
                    {item.category || "Без категории"}
                  </span>
                  <span className="font-mono text-[11px] text-slate-600">
                    {item.code}
                  </span>
                  <span className="text-right font-semibold text-slate-900">
                    {item.price ? `${item.price} ₽` : "уточнить"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
