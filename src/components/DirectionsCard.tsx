import Link from "next/link";

/**
 * Серверный блок «Направления клиники» — только ссылки, без клиентского состояния.
 */
export function DirectionsCard() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="w-full space-y-3">
        <h2 className="text-center text-sm font-semibold text-slate-900">
          Направления клиники
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <Link
            href="/analizy"
            className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)] text-center break-words"
          >
            Лабораторная диагностика
          </Link>
          <Link
            href="/uzi"
            className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)] text-center break-words"
          >
            УЗИ диагностика
          </Link>
          <Link
            href="/vraci"
            className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)] text-center break-words"
          >
            Прием врачей
          </Link>
          <Link
            href="/vyezd-vracha"
            className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)] text-center break-words"
          >
            Выезд врача на дом
          </Link>
          <Link
            href="/medsestra"
            className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)] text-center break-words"
          >
            Медсестринская помощь
          </Link>
          <Link
            href="/stacionar"
            className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)] text-center break-words"
          >
            Стационарное лечение
          </Link>
        </div>
      </div>
    </div>
  );
}
