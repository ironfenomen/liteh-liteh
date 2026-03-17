import { HeroSection } from "@/components/HeroSection";
import { DirectionsCard } from "@/components/DirectionsCard";
import { HomeJsonLd } from "./HomeJsonLd";
import { HomeHeroClient } from "./HomeHeroClient";
import { HomeContentRest } from "./HomeContentRest";

/**
 * Главная — серверный компонент. Hero (H1 + LCP-абзац) и блок направлений
 * рендерятся на сервере для быстрого LCP; поиск и контент ниже — клиентские.
 */
export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <div className="space-y-8">
        <section className="grid max-w-full gap-8 overflow-hidden rounded-3xl bg-white px-4 py-6 shadow-sm ring-1 ring-emerald-100 sm:px-6 sm:py-8 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)] md:bg-gradient-to-br md:from-emerald-50 md:via-white md:to-orange-50 md:px-10 md:py-10">
          <div className="mx-auto w-full max-w-full space-y-4 text-center sm:space-y-5 md:max-w-[min(1100px,100%)]">
            <HeroSection />
            <HomeHeroClient />
          </div>
          <DirectionsCard />
        </section>
        <HomeContentRest />
      </div>
    </>
  );
}
