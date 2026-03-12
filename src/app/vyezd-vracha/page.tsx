"use client";

import { FormEvent, useState } from "react";
import FormConsentCheckbox from "../../components/form-consent-checkbox";
import { submitLead } from "../../lib/submit-lead";

export default function VyezdVrachaPage() {
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
    const comment = String(formData.get("comment") || "").trim() || undefined;
    const honeypot = String(formData.get("website") || "");
    if (!phone) return;
    setSubmitting(true);
    try {
      const res = await submitLead({
        formName: "Выезд врача на дом",
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
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Выезд врача на дом
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Врач приедет к вам домой для осмотра, назначения лечения и оформления
          необходимых документов. Услуга оказывается совместно с
          клиникой-партнером «Амадея».
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Как проходит выезд
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-xs md:text-sm">
            <li>Вы оставляете заявку на сайте или по телефону.</li>
            <li>
              Администратор уточняет адрес, возраст пациента и жалобы, подбирает
              врача.
            </li>
            <li>Врач приезжает в согласованное время с необходимыми бланками.</li>
            <li>
              При необходимости возможно назначение лабораторных анализов и УЗИ.
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-200"
        >
          <h2 className="text-sm font-semibold text-slate-900">
            Оставить заявку на выезд
          </h2>
          <p className="text-xs text-slate-500">
            Заполните контактные данные — администратор свяжется с вами для
            подтверждения времени и стоимости выезда.
          </p>
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Не заполняйте
              <input tabIndex={-1} autoComplete="off" type="text" name="website" />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">
              ФИО
              <input
                type="text"
                name="name"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-sky-400 focus:bg-white"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">
              Телефон*
              <input
                type="tel"
                name="phone"
                required
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-sky-400 focus:bg-white"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">
              Комментарий
              <textarea
                name="comment"
                rows={3}
                className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-sky-400 focus:bg-white"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Отправляем..." : "Отправить заявку"}
          </button>
          <FormConsentCheckbox
            checked={consent}
            onChange={(v) => { setConsent(v); setConsentError(false); }}
            error={consentError}
          />
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
    </div>
  );
}

