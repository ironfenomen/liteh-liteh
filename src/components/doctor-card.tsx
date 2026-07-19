"use client";

import { useState } from "react";
import Link from "next/link";
import type { Doctor } from "../data/doctors";
import { CLINICS } from "../data/clinics";

type DoctorCardProps = {
  doctor: Doctor;
};

function PhotoPlaceholder() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="h-10 w-10 md:h-12 md:w-12"
      >
        <path
          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const hasBooking = !!doctor.bookingUrl;
  const [photoError, setPhotoError] = useState(false);
  const showPhoto = doctor.photo && !photoError;

  const computedPrice = (() => {
    const specs = doctor.specialties.map((s) => s.toLowerCase());
    let minPrice = 2000;

    if (specs.some((s) => s.includes("психиатр"))) {
      minPrice = 3500;
    } else if (specs.some((s) => s.includes("психолог"))) {
      minPrice = 3000;
    }

    const raw = doctor.priceFrom ?? "";
    const digits = raw.replace(/\D/g, "");
    const current = digits ? parseInt(digits, 10) : null;
    const final = current !== null && current > minPrice ? current : minPrice;

    return `Прием от ${final} ₽`;
  })();

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8f0ee] bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-200 ease-out hover:shadow-md hover:ring-emerald-100"
      data-doctor-id={doctor.id}
    >
      <div className="flex min-h-0 flex-1 flex-col p-4 md:p-5">
        <div className="flex gap-4">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl md:h-24 md:w-24">
            {showPhoto ? (
              <img
                src={`/api/doctor-photo/${doctor.id}`}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                onError={() => setPhotoError(true)}
              />
            ) : (
              <PhotoPlaceholder />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold leading-tight text-slate-900 md:text-lg">
              <Link href={`/vraci/${doctor.id}`} className="hover:text-emerald-700 hover:underline">
                {doctor.name}
              </Link>
            </h2>
            {doctor.specialties.length > 0 && (
              <p className="mt-1 text-[13px] text-slate-600 line-clamp-2">
                {doctor.specialties.slice(0, 3).join(", ")}
              </p>
            )}
            {(doctor.experience || doctor.badge) && (
              <p className="mt-1 text-[12px] text-slate-500">
                {[
                  doctor.experience
                    ? `Стаж ${doctor.experience.toLowerCase()}`
                    : null,
                  doctor.badge,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        </div>

        {doctor.clinicIds.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {doctor.clinicIds.map((cid) => {
              const clinic = CLINICS[cid];
              return (
                <span
                  key={cid}
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {clinic.shortName}
                </span>
              );
            })}
          </div>
        )}

        {doctor.priceFrom && (
          <p className="mt-2 text-[13px] font-medium text-slate-700">
            {computedPrice}
          </p>
        )}

        <div className="mt-auto grid gap-2 pt-4">
          <Link
            href={`/vraci/${doctor.id}`}
            className="inline-flex w-full items-center justify-center rounded-xl border border-emerald-200 bg-white px-4 py-2 text-[13px] font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Подробнее о враче
          </Link>
          {hasBooking ? (
            <a
              href={doctor.bookingUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2fbf8c,#1aa97a)] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
            >
              Записаться
            </a>
          ) : (
            <Link
              href="/contacts#callback"
              className="inline-flex w-full items-center justify-center rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Уточнить запись
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
