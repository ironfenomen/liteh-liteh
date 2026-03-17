"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { promotions, type Promotion } from "../data/promotions";

function PromoIcon({ icon }: { icon: Promotion["icon"] }) {
  const className = "h-10 w-10 flex-shrink-0";
  if (icon === "uzi") {
    return (
      <div className={`${className} flex items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
          <path d="M4 12h16M4 8h8M4 16h12" strokeLinecap="round" />
          <rect x="2" y="4" width="20" height="16" rx="2" strokeDasharray="2 2" />
        </svg>
      </div>
    );
  }
  if (icon === "svo") {
    return (
      <div className={`${className} flex items-center justify-center rounded-2xl bg-orange-100 text-orange-600`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`${className} flex items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function PromoCard({ item }: { item: Promotion }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col rounded-2xl border border-[#e8f0ee] bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-all duration-[0.25s] ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:ring-emerald-100 md:p-5"
    >
      <div className="flex items-start gap-3">
        <PromoIcon icon={item.icon} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-semibold leading-snug text-slate-900 md:text-sm">
            {item.title}
          </h3>
          <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600 md:text-[13px]">
            {item.description}
          </p>
        </div>
      </div>
      <span className="mt-3 inline-flex w-fit items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition-all duration-200 ease-out group-hover:scale-105 group-hover:bg-emerald-800">
        {item.cta}
      </span>
    </Link>
  );
}

export default function PromoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Акции</h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-3 will-change-transform">
            {promotions.map((item) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-6px)] lg:flex-[0_0_calc(33.333%-8px)]"
              >
                <PromoCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Предыдущие акции"
          className="absolute left-0 top-1/2 z-10 flex h-11 w-11 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:border-emerald-200 hover:bg-white hover:text-emerald-700 disabled:opacity-40 md:-translate-x-2"
          disabled={!canPrev}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Следующие акции"
          className="absolute right-0 top-1/2 z-10 flex h-11 w-11 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:border-emerald-200 hover:bg-white hover:text-emerald-700 disabled:opacity-40 md:translate-x-2"
          disabled={!canNext}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center pt-1">
        <Link
          href="/akcii"
          className="text-[13px] font-medium text-emerald-700 transition hover:text-emerald-800 hover:underline"
        >
          Смотреть все акции
        </Link>
      </div>
    </section>
  );
}
