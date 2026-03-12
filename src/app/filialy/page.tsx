import Link from "next/link";

const branches = [
  {
    title: "Филиал на 45 Параллели, д.2",
    address: "Ставрополь, ул. 45 Параллель, д.2",
    hours: "07:30 — 20:00",
    services: "Анализы, УЗИ, прием врачей",
    mapUrl: "https://yandex.ru/profile/214201864017?lang=ru",
  },
  {
    title: "Филиал на 45 Параллели, д.26",
    address: "Ставрополь, ул. 45 Параллель, д.26",
    hours: "07:30 — 19:00",
    services: "Анализы, УЗИ, прием врачей, детские врачи",
    mapUrl: "https://yandex.ru/profile/183400884271?lang=ru",
  },
  {
    title: "Филиал на пер. Каховский, 26а",
    address: "Ставрополь, пер. Каховский, 26а",
    hours: "08:00 — 20:00",
    services:
      "Анализы, УЗИ, прием врачей, психиатрический, наркологический и неврологический круглосуточный стационар",
    mapUrl: "https://yandex.ru/profile/156076200245?lang=ru",
  },
];

export default function FilialyPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Филиалы лаборатории «Литех» в Ставрополе
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 md:text-base">
          Выберите ближайший к вам медицинский офис. Во всех филиалах доступны
          лабораторные анализы, УЗИ-диагностика и прием врачей, а на
          Каховском, 26а дополнительно работает круглосуточный стационар.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {branches.map((b) => (
          <article
            key={b.title}
            className="flex flex-col justify-between rounded-2xl bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100"
          >
            <div className="space-y-1.5">
              <p className="text-[13px] font-semibold text-slate-900">
                {b.title}
              </p>
              <p className="text-slate-600">{b.address}</p>
              <p className="text-emerald-700">{b.hours}</p>
              <p className="text-slate-600">{b.services}</p>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <Link
                href={b.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                Как добраться
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

