/**
 * Серверный компонент Hero — только H1 и LCP-абзац.
 * Стили для .hero-title / .hero-desc — в layout (inline critical CSS) для быстрого FCP.
 */
export function HeroSection() {
  return (
    <>
      <h1 className="hero-title">
        Анализы и УЗИ в Ставрополе
      </h1>
      <p className="hero-desc">
        Лаборатория «Литех» — быстрые и точные лабораторные исследования,
        УЗИ-диагностика и прием специалистов. Онлайн-запись, прозрачные цены и
        удобные филиалы рядом с домом.
      </p>
    </>
  );
}
