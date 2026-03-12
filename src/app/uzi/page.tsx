"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import uzi from "../../data/uzi.json";

type UziItem = {
  id: string;
  name: string;
  price?: number;
};

export default function UziPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = uzi as UziItem[];
    const q = query.trim().toLowerCase();
    return list.filter((item) =>
      !q ? true : item.name.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          УЗИ диагностика
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Современные УЗИ-аппараты экспертного класса и опытные специалисты
          клиники-партнера «Амадея». Список исследований и цены основаны на
          официальных данных проектиоров, с возможной уточняющей корректировкой.
        </p>
        <div className="grid gap-3 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
            <label className="text-xs font-medium text-slate-700">
              Поиск исследования УЗИ
            </label>
            <input
              type="search"
              placeholder="Напишите область исследования, например «брюшная полость»"
              className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="rounded-2xl bg-sky-50 p-3 text-xs text-sky-900 ring-1 ring-sky-100">
            <p className="font-semibold">Скидка до 10% на УЗИ</p>
            <p className="mt-1">
              Для новых пациентов при записи онлайн через форму на сайте или по
              телефону, с отметкой про акцию.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Список исследований
          </h2>
          <p className="text-xs text-slate-500">Найдено: {filtered.length}</p>
        </div>

        {filtered.length === 0 ? (
          <p className="text-xs text-slate-500">
            Перечень УЗИ-услуг будет автоматически подгружен после запуска
            скрипта парсинга с сайта ProDoctorov.
          </p>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2 md:hidden">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-100"
                >
                  <p className="text-sm font-medium text-slate-900">{item.name}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {item.price ? `${item.price} ₽` : "уточнить"}
                  </p>
                  <Link
                    href="https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&source=3"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600"
                  >
                    Записаться
                  </Link>
                </div>
              ))}
            </div>
            <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 md:block">
              <div className="grid grid-cols-[minmax(0,2.5fr),minmax(0,0.7fr),minmax(0,0.8fr)] border-b border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                <span>Исследование</span>
                <span className="text-right">Цена</span>
                <span className="text-right">Записаться</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[minmax(0,2.5fr),minmax(0,0.7fr),minmax(0,0.8fr)] items-center px-3 py-2"
                  >
                    <span className="pr-2 text-slate-900">{item.name}</span>
                    <span className="text-right font-semibold text-slate-900">
                      {item.price ? `${item.price} ₽` : "уточнить"}
                    </span>
                    <span className="flex justify-end">
                      <Link
                        href="https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&source=3"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-sky-600"
                      >
                        Записаться
                      </Link>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

