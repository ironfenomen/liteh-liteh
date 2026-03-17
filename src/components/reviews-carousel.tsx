"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { reviews, type Review } from "../data/reviews";

function StarsFive() {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className="h-4 w-4 text-amber-400 md:h-5 md:w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewTypeBadge({ type }: { type: Review["type"] }) {
  const label = type === "analyses" ? "Анализы" : "УЗИ";
  const className =
    type === "analyses"
      ? "rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700"
      : "rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700";
  return <span className={className}>{label}</span>;
}

function ReviewCard({ item }: { item: Review }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e8f0ee] bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-all duration-[0.25s] ease-out hover:shadow-lg hover:ring-emerald-100 md:p-5">
      <div className="flex items-start justify-between gap-2">
        <ReviewTypeBadge type={item.type} />
        <span className="text-[11px] font-medium text-slate-500">{item.date}</span>
      </div>
      <div className="mt-2">
        <StarsFive />
      </div>
      <blockquote className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
        «{item.text}»
      </blockquote>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <p className="text-[12px] font-medium text-slate-800">{item.authorName}</p>
        <Link
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-slate-500 underline decoration-slate-300 transition hover:text-emerald-600 hover:decoration-emerald-400"
        >
          Отзыв на ПроДокторов
        </Link>
      </div>
    </div>
  );
}

export default function ReviewsCarousel() {
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
      <h2 className="text-lg font-semibold text-slate-900">
        Отзывы об анализах и УЗИ
      </h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-3 will-change-transform">
            {reviews.map((item) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-6px)] lg:flex-[0_0_calc(33.333%-8px)]"
              >
                <ReviewCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Предыдущие отзывы"
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
          aria-label="Следующие отзывы"
          className="absolute right-0 top-1/2 z-10 flex h-11 w-11 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:border-emerald-200 hover:bg-white hover:text-emerald-700 disabled:opacity-40 md:translate-x-2"
          disabled={!canNext}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
