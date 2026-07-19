/**
 * Инициализация Яндекс.Метрики только после согласия пользователя.
 * До согласия скрипт mc.yandex.ru не загружается.
 */

export const YANDEX_METRIKA_ID = 107271236;
const TAG_SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";

type YandexMetrikaQueue = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexMetrikaQueue;
    __ymInitialized?: boolean;
  }
}

function ensureQueue(): YandexMetrikaQueue {
  if (typeof window.ym === "function") return window.ym;

  const queue = ((...args: unknown[]) => {
    queue.a?.push(args);
  }) as YandexMetrikaQueue;
  queue.a = [];
  queue.l = Date.now();
  window.ym = queue;
  return queue;
}

export function initYandexMetrika(): void {
  if (typeof window === "undefined") return;
  if (window.__ymInitialized) return;

  const ym = ensureQueue();
  ym(YANDEX_METRIKA_ID, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
    triggerEvent: true,
    phoneHash: true,
  });
  window.__ymInitialized = true;

  const existing = Array.from(document.scripts).find(
    (s) => s.src && s.src.includes(TAG_SCRIPT_URL)
  );
  if (existing) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = TAG_SCRIPT_URL;
  document.head.appendChild(script);
}
