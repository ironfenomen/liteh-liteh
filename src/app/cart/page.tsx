"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "../../components/cart-provider";
import FormConsentCheckbox from "../../components/form-consent-checkbox";
import { submitLead } from "../../lib/submit-lead";

export default function CartPage() {
  const { items, total, removeItem, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const honeypot = String(formData.get("website") || "");
    if (!phone) return;
    const comment = items.length
      ? `Заявка на: ${items.map((i) => i.name).join("; ")}. Итого: ${total} ₽`
      : undefined;
    setSubmitting(true);
    try {
      const res = await submitLead({
        formName: "Корзина анализов/УЗИ",
        name,
        phone,
        comment,
        honeypot: honeypot || undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data.error === "PHONE_REQUIRED"
            ? "Укажите номер телефона."
            : "Не удалось отправить заявку. Попробуйте позже или позвоните нам."
        );
        return;
      }
      setSent(true);
      form.reset();
      setConsent(false);
      clear();
    } finally {
      setSubmitting(false);
    }
  }

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
            <div className="hidden border-b border-slate-100 bg-slate-50 px-4 py-3 text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:grid sm:grid-cols-[minmax(0,2.2fr),minmax(0,1fr),minmax(0,0.7fr),minmax(0,0.5fr)]">
              <span>Наименование</span>
              <span>Тип</span>
              <span className="text-right">Стоимость</span>
              <span className="text-right">Кол-во</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 px-4 py-3 sm:grid sm:grid-cols-[minmax(0,2.2fr),minmax(0,1fr),minmax(0,0.7fr),minmax(0,0.5fr)] sm:items-center"
                >
                  <div className="space-y-0.5 pr-3 min-w-0">
                    <p className="text-slate-900 break-words">{item.name}</p>
                    {item.code && (
                      <p className="font-mono text-[11px] text-slate-500">
                        Код: {item.code}
                      </p>
                    )}
                  </div>
                  <span className="text-slate-500 sm:block">
                    {item.type === "analyze" ? "Анализ" : "УЗИ"}
                  </span>
                  <span className="font-semibold text-slate-900 sm:text-right">
                    {item.price} ₽
                  </span>
                  <div className="flex items-center justify-between gap-2 sm:justify-end">
                    <span className="text-slate-700">× {item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="min-h-[44px] min-w-[44px] shrink-0 rounded-lg text-[11px] font-medium text-slate-500 hover:bg-slate-50 hover:text-rose-500 sm:min-h-0 sm:min-w-0"
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
                className="text-[11px] font-medium text-slate-500 hover:text-rose-500"
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
            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label>
                  Не заполняйте
                  <input tabIndex={-1} autoComplete="off" type="text" name="website" />
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-slate-700">
                    ФИО
                  </span>
                  <input
                    name="name"
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
                    name="phone"
                    type="tel"
                    required
                    className="h-10 w-full rounded-[14px] border border-[#e4ecea] bg-white px-3 text-[13px] outline-none focus:border-[#2fbf8c] focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                    placeholder="+7"
                  />
                </label>
              </div>
              <FormConsentCheckbox
                checked={consent}
                onChange={(v) => { setConsent(v); setConsentError(false); }}
                error={consentError}
              />
              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="inline-flex w-full items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#2fbf8c,#1aa97a)] px-6 py-3 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                {submitting ? "Отправляем..." : "Отправить заявку"}
              </button>
              {sent && (
                <p className="text-[11px] text-emerald-600">
                  Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                </p>
              )}
              {error && (
                <p className="text-[11px] text-rose-600">
                  {error}
                </p>
              )}
            </form>
          </section>
        </>
      )}
    </div>
  );
}

