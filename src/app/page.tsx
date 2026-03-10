import Link from "next/link";
import analyzes from "../data/analyzes.json";
import checkups from "../data/checkups.json";

export default function Home() {
  const popularAnalyzes = (analyzes as any[]).slice(0, 6);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-br from-emerald-50/60 via-white to-orange-50/60 px-6 py-8 shadow-sm ring-1 ring-emerald-100 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)] md:px-10 md:py-10">
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-4xl">
            Анализы и УЗИ в Ставрополе
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Лаборатория «Литех» — быстрые и точные лабораторные исследования,
            УЗИ-диагностика и прием специалистов. Онлайн-запись, прозрачные
            цены и удобные филиалы рядом с домом.
          </p>
          <div className="space-y-3">
            <div className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-100">
              <p className="text-[13px] font-medium text-slate-800">
                Найдите нужный анализ по названию или коду
              </p>
              <div className="mt-3 flex gap-3">
                <input
                  type="search"
                  placeholder="Например, общий анализ крови или 01-001"
                  className="flex-1 rounded-[14px] border border-[#e4ecea] bg-white px-[18px] text-[15px] leading-none outline-none ring-0 placeholder:text-slate-400 focus:border-[#2fbf8c] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)] h-14"
                />
                <Link
                  href="/analizy"
                  className="inline-flex items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#2fbf8c,#1aa97a)] px-[22px] py-[14px] text-[13px] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)]"
                >
                  К каталогу
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="rounded-full bg-white/70 px-3 py-1">
                Забор крови с 07:30
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1">
                Результаты онлайн
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1">
                Филиалы рядом с домом
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-100">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Направления клиники
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                href="/analizy"
                className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
              >
                Лабораторная диагностика
              </Link>
              <Link
                href="/uzi"
                className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
              >
                УЗИ диагностика
              </Link>
              <Link
                href="/vraci"
                className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
              >
                Прием врачей
              </Link>
              <Link
                href="/vyezd-vracha"
                className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
              >
                Выезд врача на дом
              </Link>
              <Link
                href="/medsestra"
                className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
              >
                Медсестринская помощь
              </Link>
              <Link
                href="/stacionar"
                className="rounded-[14px] border border-[#e8f0ee] bg-[#f7fbfa] px-[18px] py-[14px] text-[13px] font-medium text-emerald-900 shadow-sm transition-all duration-200 ease-out hover:bg-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
              >
                Стационарное лечение
              </Link>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-orange-500 px-4 py-3 text-xs text-white">
            <p className="font-semibold">Скидка до 10% на УЗИ</p>
            <p className="mt-1 opacity-90">
              Для новых пациентов при записи онлайн. Подробности уточняйте у
              администраторов.
            </p>
            <Link
              href="/uzi"
              className="mt-2 inline-flex text-[11px] font-semibold underline underline-offset-4"
            >
              К услугам УЗИ
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Популярные анализы
          </h2>
          <Link
            href="/analizy"
            className="text-xs font-medium text-emerald-700 hover:underline"
          >
            Все анализы
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {popularAnalyzes.map((item: any) => (
            <Link
              key={item.code}
              href={`/analizy/${item.slug}`}
              className="flex flex-col rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {item.code}
              </span>
              <span className="mt-1 text-slate-900">{item.name}</span>
              <span className="mt-2 text-sm font-semibold text-slate-900">
                {item.price} ₽
              </span>
            </Link>
          ))}
        </div>
      </section>

     

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Филиалы</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">
              ул. 45 Параллель, д.2
            </p>
            <p className="mt-1 text-slate-500">07:30 — 20:00</p>
            <p className="mt-1 text-slate-500">
              Анализы, УЗИ, прием врачей.
            </p>
            <Link
              href="https://yandex.ru/profile/214201864017?lang=ru"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-[11px] font-semibold text-emerald-700"
            >
              Как добраться
            </Link>
          </div>
          <div className="rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">
              ул. 45 Параллель, д.26а
            </p>
            <p className="mt-1 text-slate-500">07:30 — 19:00</p>
            <p className="mt-1 text-slate-500">
              Анализы, УЗИ, прием врачей, прием детских врачей.
            </p>
            <Link
              href="https://yandex.ru/profile/183400884271?lang=ru"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-[11px] font-semibold text-emerald-700"
            >
              Как добраться
            </Link>
          </div>
          <div className="rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">
              пер. Каховский, 26а
            </p>
            <p className="mt-1 text-slate-500">08:00 — 20:00</p>
            <p className="mt-1 text-slate-500">
              Анализы, УЗИ, прием врачей, психиатрический, наркологический,
              неврологический круглосуточный стационар.
            </p>
            <Link
              href="https://yandex.ru/profile/156076200245?lang=ru"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-[11px] font-semibold text-emerald-700"
            >
              Как добраться
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Как подготовиться к анализам
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">
              Общие рекомендации
            </p>
            <p className="mt-1 text-slate-600">
              Кровь сдаётся натощак, за 8–12 часов не есть, за 24 часа избегать
              алкоголя и интенсивных нагрузок.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">Перед УЗИ</p>
            <p className="mt-1 text-slate-600">
              Подготовка зависит от органа исследования: часть процедур
              проводится натощак, часть — с наполненным мочевым пузырём.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-3 text-xs shadow-sm ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">
              Индивидуальные особенности
            </p>
            <p className="mt-1 text-slate-600">
              Принимаете лекарства или есть хронические заболевания — сообщите
              администратору или врачу перед сдачей анализов.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Вопросы и ответы</h2>
        <div className="space-y-2 text-xs">
          <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <summary className="cursor-pointer font-semibold text-slate-900">
              Как быстро я получу результаты анализов?
            </summary>
            <p className="mt-2 text-slate-600">
              Большинство базовых исследований выполняются в течение 1 рабочего
              дня. Более сложные панели и генетические тесты могут занимать до
              3–5 дней. Актуальные сроки указаны в карточке каждого анализа и
              уточняются при записи.
            </p>
          </details>
          <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <summary className="cursor-pointer font-semibold text-slate-900">
              Где можно посмотреть результаты?
            </summary>
            <p className="mt-2 text-slate-600">
              Результаты отправляются на электронную почту, а также доступны в
              личном кабинете. При необходимости вы можете получить распечатку в
              любом филиале лаборатории.
            </p>
          </details>
          <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <summary className="cursor-pointer font-semibold text-slate-900">
              Можно ли сдать анализы без направления от врача?
            </summary>
            <p className="mt-2 text-slate-600">
              Да, вы можете сдать большинство анализов без направления. Для
              сложных исследований и стационарного лечения мы рекомендуем
              предварительную консультацию врача, чтобы подобрать оптимальный
              объём диагностики.
            </p>
          </details>
          <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <summary className="cursor-pointer font-semibold text-slate-900">
              Делаете ли вы выезд на дом?
            </summary>
            <p className="mt-2 text-slate-600">
              Да, вы можете оформить выезд медсестры на дом для забора крови и
              мазков. Оформить заявку можно по телефону, через мессенджеры или
              на странице «Выезд врача на дом».
            </p>
          </details>
          <details className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <summary className="cursor-pointer font-semibold text-slate-900">
              Можно ли получить медсестринскую помощь с моими препаратами?
            </summary>
            <p className="mt-2 text-slate-600">
              Да, возможно выполнение инъекций и других процедур с вашими
              препаратами, если у вас есть оригинальное назначение врача.
              Перед визитом покажите назначение администратору или медсестре.
            </p>
          </details>
        </div>
      </section>

      <section className="rounded-3xl bg-white px-4 py-6 text-center text-slate-900 shadow-sm ring-1 ring-emerald-100 md:px-8 md:py-8">
        <h2 className="text-lg font-semibold md:text-xl">
          Нужна помощь с выбором анализов или записи?
        </h2>
        <p className="mt-2 text-xs text-slate-500 md:text-sm">
          Оставьте заявку, и администратор лаборатории «Литех» перезвонит вам и
          поможет подобрать оптимальное обследование.
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 text-xs md:flex-row">
          <Link
            href="/contacts#callback"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            Перезвоните мне
          </Link>
          <Link
            href="/vraci"
            className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Записаться к врачу
          </Link>
        </div>
      </section>
    </div>
  );
}
