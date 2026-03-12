import Link from "next/link";
import { promotions } from "../../data/promotions";

function PromoIcon({ icon }: { icon: "uzi" | "svo" | "pension" }) {
  const base = "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl";
  if (icon === "uzi") {
    return (
      <div className={`${base} bg-emerald-100 text-emerald-600`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
          <path d="M4 12h16M4 8h8M4 16h12" strokeLinecap="round" />
          <rect x="2" y="4" width="20" height="16" rx="2" strokeDasharray="2 2" />
        </svg>
      </div>
    );
  }
  if (icon === "svo") {
    return (
      <div className={`${base} bg-orange-100 text-orange-600`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`${base} bg-emerald-100 text-emerald-600`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AkciiPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Акции лаборатории «Литех»
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Специальные условия для новых пациентов, участников СВО и пенсионеров.
          Подробности уточняйте у администратора при записи.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {promotions.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            id={item.id === "svo" ? "svo" : undefined}
            className="group flex flex-col rounded-2xl border border-[#e8f0ee] bg-white p-5 shadow-sm ring-1 ring-slate-100/80 transition-all duration-[0.25s] ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:ring-emerald-100"
          >
            <div className="flex items-start gap-4">
              <PromoIcon icon={item.icon} />
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold leading-snug text-slate-900 md:text-base">
                  {item.title}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
            <span className="mt-4 inline-flex w-fit items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 ease-out group-hover:scale-105 group-hover:bg-emerald-600">
              {item.cta}
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-[#e8f0ee] bg-white p-4 text-center text-sm text-slate-600 ring-1 ring-slate-100/80 md:p-6">
        <p>
          Условия акций не суммируются. Точный перечень услуг и размер скидки
          уточняйте по телефону{" "}
          <a href="tel:+79888652777" className="font-semibold text-emerald-700 hover:underline">
            +7 988 865-27-77
          </a>{" "}
          или при записи в любом филиале.
        </p>
      </section>
    </div>
  );
}
