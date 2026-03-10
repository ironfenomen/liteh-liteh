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
      context: "Заявка на стационарное лечение (страница stacionar)",
    }),
  });
}

export default function StacionarPage() {
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
          Стационарное лечение
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 md:text-base">
          На базе клиники-партнёра «Амадея» доступны круглосуточные стационары
          терапевтического, неврологического, психиатрического и наркологического
          профиля. Пациенты находятся под постоянным наблюдением врачей и
          медицинского персонала, с возможностью полноценной диагностики и
          лечения.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl bg-white p-4 text-xs text-slate-700 shadow-sm ring-1 ring-slate-100 md:p-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Профили стационара
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Терапевтический стационар</span> —
              наблюдение и лечение при хронических и острых соматических
              заболеваниях, контроль терапии, коррекция схем лечения.
            </li>
            <li>
              <span className="font-medium">Неврологический профиль</span> —
              уход и реабилитация при неврологических нарушениях, болевых
              синдромах, последствиях инсульта.
            </li>
            <li>
              <span className="font-medium">Психиатрический и наркологический
              стационар</span>{" "}
              — безопасные условия для дезинтоксикации, стабилизации состояния,
              подбора терапии под наблюдением специалистов.
            </li>
          </ul>
          <p className="text-[11px] text-slate-500">
            Стационар работает в режиме 24/7. Пациентам обеспечиваются медицинский
            уход, наблюдение профильных врачей и возможность прохождения
            лабораторной и инструментальной диагностики.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-4 text-xs shadow-sm ring-1 ring-emerald-100 md:p-6"
        >
          <h2 className="text-sm font-semibold text-slate-900">
            Оставить заявку на стационар
          </h2>
          <p className="text-slate-600">
            Оставьте контакты — администратор свяжется с вами для подбора профиля
            стационара, условий размещения и даты госпитализации.
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
                placeholder="Кратко опишите ситуацию или желаемый профиль стационара"
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

