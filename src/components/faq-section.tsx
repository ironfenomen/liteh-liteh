/**
 * Секция FAQ главной страницы.
 * Вынесена в отдельный компонент для lazy loading (code splitting) — контент ниже первого экрана.
 * SEO: текст совпадает с FAQ Schema в page.tsx, разметка остаётся в HTML при ssr: true.
 */
export default function FAQSection() {
  return (
    <section aria-label="Часто задаваемые вопросы о лаборатории Литех">
      <h2 className="text-lg font-semibold text-slate-900">Вопросы и ответы</h2>
      <div className="mt-4 space-y-2 text-xs">
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
  );
}
