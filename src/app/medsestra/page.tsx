"use client";

import { FormEvent, useState } from "react";

async function sendRequest(data: {
  name: string;
  phone: string;
  comment?: string;
}) {
  await fetch("/api/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      context: "Заявка на медсестринскую помощь (страница medsestra)",
    }),
  });
}

export default function MedsestraPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const comment = String(formData.get("comment") || "");

    if (!phone) return;

    setSubmitting(true);
    try {
      await sendRequest({ name, phone, comment });
      setSent(true);
      form.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Медсестринская помощь
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 md:text-base">
          В филиалах лаборатории «Литех» вы можете получить квалифицированную
          медсестринскую помощь: внутривенные и внутримышечные инъекции,
          заборы мазков и другие манипуляции{" "}
          <span className="font-medium">
            как в клинике, так и на дому
          </span>
          . Возможно выполнение процедур с вашими препаратами при наличии
          оригинального назначения врача.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl bg-white p-4 text-xs text-slate-700 shadow-sm ring-1 ring-slate-100 md:p-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Услуги медсестринской помощи
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">
                Внутривенные и внутримышечные инъекции по назначению врача
              </span>{" "}
              — проведение уколов с препаратами клиники или с вашими
              лекарствами при наличии назначения.
            </li>
            <li>
              <span className="font-medium">Забор мазков и биоматериала</span>{" "}
              — аккуратный и безболезненный забор мазков для лабораторных
              исследований.
            </li>
            <li>
              <span className="font-medium">
                Выезд медсестры на дом в пределах города
              </span>{" "}
              — для пациентов, которым сложно самостоятельно добраться до
              филиала.
            </li>
          </ul>
          <p className="text-[11px] text-slate-500">
            Точный перечень услуг и стоимость уточняйте у администратора при
            записи — часть процедур требует предварительной консультации врача.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-4 text-xs shadow-sm ring-1 ring-emerald-100 md:p-6"
        >
          <h2 className="text-sm font-semibold text-slate-900">
            Оставить заявку на медсестринскую помощь
          </h2>
          <p className="text-slate-600">
            Укажите контакты — администратор перезвонит, чтобы подобрать удобный
            филиал или организовать выезд на дом.
          </p>
          <div className="space-y-2">
            <label className="text-[11px] font-medium text-slate-700">
              ФИО
              <input
                name="name"
                type="text"
                className="mt-1 h-10 w-full rounded-[14px] border border-[#e4ecea] bg-white px-3 text-[13px] outline-none focus:border-[#2fbf8c] focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                placeholder="Как к вам обращаться"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-medium text-slate-700">
              Телефон*
              <input
                name="phone"
                type="tel"
                required
                className="mt-1 h-10 w-full rounded-[14px] border border-[#e4ecea] bg-white px-3 text-[13px] outline-none focus:border-[#2fbf8c] focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                placeholder="+7"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-medium text-slate-700">
              Комментарий
              <textarea
                name="comment"
                rows={3}
                className="mt-1 w-full resize-none rounded-[14px] border border-[#e4ecea] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#2fbf8c] focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
                placeholder="Кратко опишите, какая помощь требуется"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#2fbf8c,#1aa97a)] px-6 py-3 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
          >
            {submitting ? "Отправляем..." : "Отправить заявку"}
          </button>
          {sent && (
            <p className="text-[11px] text-emerald-600">
              Заявка отправлена. Мы свяжемся с вами в ближайшее время.
            </p>
          )}
          <p className="text-[11px] text-slate-400">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
          </p>
        </form>
      </section>
    </div>
  );
}

