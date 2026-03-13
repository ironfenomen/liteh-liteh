"use client";

import { useState, type FormEvent } from "react";
import { submitLead } from "../../../lib/submit-lead";

type Props = {
  analysisName: string;
};

export default function AnalysisBookingForm({ analysisName }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!phone.trim()) {
      setError("Укажите телефон.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitLead({
        formName: `Запись на анализ: ${analysisName}`,
        name: name.trim(),
        phone: phone.trim(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data.error === "PHONE_REQUIRED"
            ? "Укажите телефон."
            : "Не удалось отправить. Попробуйте позже."
        );
        return;
      }
      setSent(true);
      setName("");
      setPhone("");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent && !error) {
    return (
      <p className="text-sm font-medium text-emerald-700">
        Заявка отправлена. Мы перезвоним вам для записи на анализ.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
      />
      <input
        type="tel"
        placeholder="Телефон *"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
      />
      <button
        type="submit"
        disabled={submitting}
        className="h-10 rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-70"
      >
        {submitting ? "Отправка…" : "Записаться"}
      </button>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </form>
  );
}
