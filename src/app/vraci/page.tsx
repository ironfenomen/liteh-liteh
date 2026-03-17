"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DOCTORS } from "../../data/doctors";
import type { DoctorFiltersState } from "../../components/doctor-filters";
import DoctorFilters from "../../components/doctor-filters";
import DoctorCard from "../../components/doctor-card";

function filterDoctors(
  doctors: typeof DOCTORS,
  filters: DoctorFiltersState
): typeof DOCTORS {
  let list = doctors;

  if (filters.clinicId) {
    list = list.filter((d) => d.clinicIds.includes(filters.clinicId as any));
  }
  if (filters.specialty) {
    list = list.filter((d) => d.specialties.includes(filters.specialty));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter((d) => d.name.toLowerCase().includes(q));
  }
  if (filters.onlyWithBooking) {
    list = list.filter((d) => !!d.bookingUrl);
  }

  return list;
}

export default function VraciPage() {
  const [filters, setFilters] = useState<DoctorFiltersState>({
    clinicId: "",
    specialty: "",
    search: "",
    onlyWithBooking: false,
  });
  const [showFullList, setShowFullList] = useState(false);

  const filtered = useMemo(
    () => filterDoctors(DOCTORS, filters),
    [filters]
  );

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) =>
      a.photo ? (b.photo ? 0 : -1) : b.photo ? 1 : 0
    );
  }, [filtered]);

  const doctorsWithPhoto = useMemo(
    () => sorted.filter((doctor) => !!doctor.photo),
    [sorted]
  );

  const doctorsWithoutPhoto = useMemo(
    () => sorted.filter((doctor) => !doctor.photo),
    [sorted]
  );

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Врачи
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Специалисты сети «Литех» и клиник «Амадея» в Ставрополе. Выберите
          филиал и специальность, найдите врача по имени или запишитесь онлайн.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">
          Филиалы
        </h2>
        <ul className="flex flex-wrap gap-2 text-[13px] text-slate-600">
          <li className="rounded-xl border border-[#e8f0ee] bg-white px-3 py-2 shadow-sm">
            <span className="font-medium text-slate-800">Литех / Амадея</span> — ул. 45-я Параллель, д. 2
          </li>
          <li className="rounded-xl border border-[#e8f0ee] bg-white px-3 py-2 shadow-sm">
            <span className="font-medium text-slate-800">Амадея Kids</span> — Ставрополь, ул. 45 Параллель, д. 26
          </li>
          <li className="rounded-xl border border-[#e8f0ee] bg-white px-3 py-2 shadow-sm">
            <span className="font-medium text-slate-800">Амадея Детокс</span> — пер. Каховский, д. 26а
          </li>
        </ul>
      </section>

      <section>
        <DoctorFilters
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={sorted.length}
        />
      </section>

      <section>
        {sorted.length === 0 ? (
          <p className="rounded-2xl border border-[#e8f0ee] bg-slate-50 px-4 py-8 text-center text-[14px] text-slate-600">
            По выбранным фильтрам врачи не найдены. Измените филиал, специальность или поиск по имени.
          </p>
        ) : (
          <>
            {doctorsWithPhoto.length > 0 && (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {doctorsWithPhoto.map((doctor) => (
                  <li key={doctor.id} className="flex min-h-0">
                    <DoctorCard doctor={doctor} />
                  </li>
                ))}
              </ul>
            )}

            {doctorsWithoutPhoto.length > 0 && (
              <div className="mt-6 rounded-2xl border border-[#e8f0ee] bg-white px-4 py-3 text-sm shadow-sm">
                <button
                  type="button"
                  onClick={() => setShowFullList((v) => !v)}
                  className="flex w-full items-center justify-between gap-2 text-left text-slate-800"
                >
                  <span className="text-[13px] font-semibold">
                    Полный перечень специалистов
                  </span>
                  <span className="text-xs text-slate-500">
                    {showFullList ? "Свернуть" : "Показать"}
                  </span>
                </button>
                {showFullList && (
                  <ul className="mt-3 divide-y divide-slate-100 text-[13px] text-slate-700">
                    {doctorsWithoutPhoto.map((doctor) => (
                      <li
                        key={doctor.id}
                        className="flex items-center justify-between gap-3 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900">
                            {doctor.name}
                          </p>
                          <p className="text-[12px] text-slate-600">
                            {doctor.specialties.join(", ")}
                            {doctor.experience
                              ? ` · Стаж ${doctor.experience.toLowerCase()}`
                              : ""}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          {doctor.bookingUrl ? (
                            <a
                              href={doctor.bookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2fbf8c,#1aa97a)] px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
                            >
                              Записаться
                            </a>
                          ) : (
                            <Link
                              href="/contacts#callback"
                              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-emerald-700 transition hover:bg-emerald-50"
                            >
                              Записаться
                            </Link>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
