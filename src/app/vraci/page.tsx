"use client";

export default function VraciPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Врачи клиники-партнера «Амадея»
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Консультации терапевтов, неврологов, психиатров, наркологов и других
          специалистов. Онлайн-запись проводится через защищенный сервис
          Medflex.
        </p>
      </section>

      <section className="space-y-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Онлайн-запись к врачу
            </h2>
            <p className="text-xs text-slate-600">
              Нажмите «Записаться онлайн», чтобы открыть форму записи в новом
              окне, или воспользуйтесь встроенной формой ниже (если ваш браузер
              разрешает загрузку).
            </p>
          </div>
          <a
            href="https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&source=3"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-600"
          >
            Записаться онлайн
          </a>
        </div>
        <div className="mt-4">
          <iframe
            src="https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&source=3"
            className="h-[600px] w-full rounded-2xl border border-slate-200"
          />
        </div>
      </section>
    </div>
  );
}

