"use client";

import Link from "next/link";
import { useCart } from "../../components/cart-provider";

export default function CartPage() {
  const { items, total, removeItem, clear } = useCart();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Корзина анализов и исследований
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Здесь собираются выбранные лабораторные анализы и УЗИ-исследования.
          После отправки заявки администратор уточнит дату и время посещения,
          а также подготовку к исследованиям.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 px-4 py-6 text-sm text-slate-600">
          Корзина пуста. Перейдите в{" "}
          <Link href="/analizy" className="font-semibold text-emerald-700">
            каталог анализов
          </Link>{" "}
          или{" "}
          <Link href="/uzi" className="font-semibold text-emerald-700">
            услуги УЗИ
          </Link>
          , чтобы добавить исследования.
        </div>
      ) : (
        <>
          <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
            <div className="grid grid-cols-[minmax(0,2.2fr),minmax(0,1fr),minmax(0,0.7fr),minmax(0,0.5fr)] border-b border-slate-100 bg-slate-50 px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              <span>Наименование</span>
              <span>Тип</span>
              <span className="text-right">Стоимость</span>
              <span className="text-right">Кол-во</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[minmax(0,2.2fr),minmax(0,1fr),minmax(0,0.7fr),minmax(0,0.5fr)] items-center px-4 py-3"
                >
                  <div className="space-y-0.5 pr-3">
                    <p className="text-slate-900">{item.name}</p>
                    {item.code && (
                      <p className="font-mono text-[11px] text-slate-500">
                        Код: {item.code}
                      </p>
                    )}
                  </div>
                  <span className="text-slate-500">
                    {item.type === "analyze" ? "Анализ" : "УЗИ"}
                  </span>
                  <span className="text-right font-semibold text-slate-900">
                    {item.price} ₽
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-slate-700">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[11px] font-medium text-slate-400 hover:text-rose-500"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs md:px-5 md:py-4">
              <button
                type="button"
                onClick={clear}
                className="text-[11px] font-medium text-slate-400 hover:text-rose-500"
              >
                Очистить корзину
              </button>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">
                  Итого
                </p>
                <p className="text-base font-semibold text-slate-900">
                  {total} ₽
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 rounded-2xl bg-white p-4 text-xs shadow-sm ring-1 ring-emerald-100 md:p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Оформить заявку
            </h2>
            <p className="text-slate-600">
              Оставьте контактные данные, и администратор лаборатории «Литех»
              перезвонит вам для подтверждения записи и уточнения подготовки к
              анализам.
            </p>
            <form className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-[11px] font-medium text-slate-700">
                  ФИО
                </span>
                <input
                  type="text"
                  className="h-10 w-full rounded-[14px] border border-[#e4ecea] bg-white px-3 text-[13px] outline-none focus:border-[#2fbf8c] focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[11px] font-medium text-slate-700">
                  Телефон
                </span>
                <input
                  type="tel"
                  className="h-10 w-full rounded-[14px] border border-[#e4ecea] bg-white px-3 text-[13px] outline-none focus:border-[#2fbf8c] focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                  placeholder="+7"
                />
              </label>
            </form>
            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#2fbf8c,#1aa97a)] px-6 py-3 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)] md:w-auto"
            >
              Отправить заявку
            </button>
            <p className="text-[11px] text-slate-400">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
            </p>
          </section>
        </>
      )}
    </div>
  );
}

