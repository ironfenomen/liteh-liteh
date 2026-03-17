"use client";

import { useEffect } from "react";

const YANDEX_METRIKA_ID = 107271236;
const TAG_SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";
const LAZY_DELAY_MS = 3000;

export default function YandexMetrika() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof document === "undefined" || typeof window === "undefined") return;
      const existing = document.querySelector(`script[src="${TAG_SCRIPT_URL}"]`);
      if (existing) return;

      const script = document.createElement("script");
      script.src = TAG_SCRIPT_URL;
      script.async = true;
      script.onload = () => {
        if (typeof (window as unknown as { ym?: (id: number, action: string, opts: object) => void }).ym === "function") {
          (window as unknown as { ym: (id: number, action: string, opts: object) => void }).ym(YANDEX_METRIKA_ID, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            triggerEvent: true,
            phoneHash: true,
          });
        }
      };
      document.head.appendChild(script);
    }, LAZY_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}
