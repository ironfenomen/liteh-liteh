"use client";

import Link from "next/link";

type FormConsentCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
};

export default function FormConsentCheckbox({
  checked,
  onChange,
  error,
}: FormConsentCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-[11px] text-slate-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/40"
        aria-describedby="consent-desc"
      />
      <span id="consent-desc" className={error ? "text-rose-600" : ""}>
        Отправляя форму, я{" "}
        <Link
          href="/privacy-accept"
          className="text-emerald-700 underline decoration-emerald-700/40 hover:decoration-emerald-700"
        >
          соглашаюсь на обработку персональных данных
        </Link>{" "}
        и принимаю{" "}
        <Link
          href="/privacy-policy"
          className="text-emerald-700 underline decoration-emerald-700/40 hover:decoration-emerald-700"
        >
          политику обработки персональных данных
        </Link>
        .
      </span>
    </label>
  );
}
