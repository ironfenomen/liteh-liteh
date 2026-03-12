import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | Литех",
  description:
    "Согласие на обработку персональных данных при использовании сайта лаборатории «Литех».",
};

export default function PrivacyAcceptPage() {
  return (
    <div className="max-w-none space-y-6 text-slate-700">
      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
        Согласие на обработку персональных данных
      </h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          1. Оператор персональных данных
        </h2>
        <p>
          Оператором персональных данных является ООО «АМАДЕЯ» (ИНН 2635248939,
          ОГРН 1212600004165), в рамках партнёрства с которым представлен сайт
          лаборатории «Литех». Контакты: litehstavlab@gmail.com.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          2. На что даётся согласие
        </h2>
        <p>
          Настоящим я даю согласие оператору на обработку моих персональных
          данных, указанных в формах на сайте (имя, телефон, email, комментарий),
          а также данных, автоматически собираемых при использовании сайта (в том
          числе с помощью cookie и сервиса Яндекс.Метрика после принятия
          соответствующей плашки), в объёме и на условиях, изложенных в{" "}
          <a href="/privacy-policy" className="text-emerald-700 hover:underline">
            Политике обработки персональных данных
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          3. Какие данные могут обрабатываться
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>ФИО, номер телефона, адрес электронной почты, текст заявки.</li>
          <li>
            При использовании сайта после принятия cookie/Метрики: IP-адрес,
            cookie, сведения о браузере и устройстве, источник перехода, URL
            страниц, действия на сайте, время посещения.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          4. Цели обработки
        </h2>
        <p>
          Обработка осуществляется в целях обработки заявок (обратный звонок,
          запись, корзина, выезд врача, медсестринская помощь, стационар),
          связи с пользователем, а также (при согласии на cookie/Метрику) для
          анализа посещаемости и улучшения работы сайта.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          5. Способы обработки
        </h2>
        <p>
          Данные обрабатываются с использованием средств автоматизации и (при
          необходимости) вручную: сбор, запись, хранение, уточнение, передача
          уполномоченным лицам в объёме, необходимом для указанных целей.
          Заявки отправляются на электронную почту оператора; передача в
          рекламные или иные третьи стороны без отдельного согласия не
          осуществляется.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          6. Срок действия согласия
        </h2>
        <p>
          Согласие действует до его отзыва мной либо до истечения сроков
          хранения данных, установленных законодательством и внутренними
          документами оператора.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          7. Право отзыва согласия
        </h2>
        <p>
          Я проинформирован(а), что вправе в любой момент отозвать настоящее
          согласие, не затрагивая законности обработки, произведённой до отзыва.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          8. Как отозвать согласие
        </h2>
        <p>
          Для отзыва согласия на обработку данных, указанных в формах,
          необходимо направить запрос по электронной почте оператора (
          <a href="mailto:litehstavlab@gmail.com" className="text-emerald-700 hover:underline">
            litehstavlab@gmail.com
          </a>
          ). Согласие на использование cookie и Яндекс.Метрики можно отозвать,
          очистив данные сайта в настройках браузера (localStorage) и
          перезагрузив страницу.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">
          9. Контактные данные для отзыва и вопросов
        </h2>
        <p>
          По вопросам обработки персональных данных и отзыва согласия:
          <a href="mailto:litehstavlab@gmail.com" className="text-emerald-700 hover:underline ml-1">
            litehstavlab@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
