"use client";

import type { ClinicId } from "../data/clinics";
import { CLINICS, CLINIC_IDS } from "../data/clinics";
import { getAllSpecialties } from "../data/doctors";

export type DoctorFiltersState = {
  clinicId: ClinicId | "";
  specialty: string;
  search: string;
  onlyWithBooking: boolean;
};

type DoctorFiltersProps = {
  filters: DoctorFiltersState;
  onFiltersChange: (f: DoctorFiltersState) => void;
  resultCount: number;
};

const specialties = getAllSpecialties();

export default function DoctorFilters({
  filters,
  onFiltersChange,
  resultCount,
}: DoctorFiltersProps) {
  const set = (patch: Partial<DoctorFiltersState>) => {
    onFiltersChange({ ...filters, ...patch });
  };

  const word =
        resultCount % 10 === 1 && resultCount % 100 !== 11
          ? "врач"
          : resultCount % 10 >= 2 && resultCount % 10 <= 4 && (resultCount % 100 < 10 || resultCount % 100 >= 20)
            ? "врача"
            : "врачей";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="doctor-search">
          Поиск по ФИО врача
        </label>
        <input
          id="doctor-search"
          type="search"
          placeholder="Поиск по ФИО..."
          value={filters.search}
          onChange={(e) => set({ search: e.target.value.trim() })}
          className="h-10 flex-1 min-w-[180px] max-w-sm rounded-xl border border-[#e4ecea] bg-white px-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-[#2fbf8c] focus:shadow-[0_0_0_4px_rgba(47,191,140,0.12)]"
        />
        <select
          aria-label="Филиал"
          value={filters.clinicId}
          onChange={(e) => set({ clinicId: e.target.value as ClinicId | "" })}
          className="h-10 rounded-xl border border-[#e4ecea] bg-white px-3 text-[13px] text-slate-700 outline-none focus:border-[#2fbf8c]"
        >
          <option value="">Все филиалы</option>
          {CLINIC_IDS.map((id) => (
            <option key={id} value={id}>
              {CLINICS[id].name}
            </option>
          ))}
        </select>
        <select
          aria-label="Специальность"
          value={filters.specialty}
          onChange={(e) => set({ specialty: e.target.value })}
          className="h-10 rounded-xl border border-[#e4ecea] bg-white px-3 text-[13px] text-slate-700 outline-none focus:border-[#2fbf8c]"
        >
          <option value="">Все специальности</option>
          {specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-slate-600">
          <input
            type="checkbox"
            checked={filters.onlyWithBooking}
            onChange={(e) => set({ onlyWithBooking: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          Только с онлайн-записью
        </label>
      </div>
      <p className="text-[13px] text-slate-500">
        Найдено: <span className="font-semibold text-slate-700">{resultCount}</span> {word}
      </p>
    </div>
  );
}
