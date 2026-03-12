/**
 * Инициализация Яндекс.Метрики только после согласия пользователя.
 * До согласия скрипт mc.yandex.ru не загружается.
 */

export const YANDEX_METRIKA_ID = 107271236;

declare global {
  interface Window {
    ym?: (id: number, action: string, opts?: Record<string, unknown>) => void;
    __ymInitialized?: boolean;
  }
}

export function initYandexMetrika(): void {
  if (typeof window === "undefined") return;
  if (window.__ymInitialized) return;

  const existing = Array.from(document.scripts).find(
    (s) => s.src && s.src.includes("mc.yandex.ru/metrika/tag.js")
  );

  const start = (): void => {
    if (typeof window.ym !== "function" || window.__ymInitialized) return;
    window.ym(YANDEX_METRIKA_ID, "init", {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });
    window.__ymInitialized = true;
  };

  if (existing) {
    start();
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`;
  script.onload = start;
  document.head.appendChild(script);
}
