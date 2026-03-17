"use client";

import { useEffect } from "react";

const YANDEX_METRIKA_ID = 107271236;
const TAG_SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";
const IDLE_TIMEOUT_MS = 5000;

function loadMetrika() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const existing = document.querySelector(`script[src="${TAG_SCRIPT_URL}"]`);
  if (existing) return;

  const script = document.createElement("script");
  script.src = TAG_SCRIPT_URL;
  script.async = true;
  script.onload = () => {
    const ym = (window as unknown as { ym?: (id: number, action: string, opts: object) => void }).ym;
    if (typeof ym === "function") {
      ym(YANDEX_METRIKA_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        triggerEvent: true,
        phoneHash: true,
      });
    }
  };
  document.body.appendChild(script);
}

export default function YandexMetrika() {
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(loadMetrika, { timeout: IDLE_TIMEOUT_MS });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    }
    const timer = setTimeout(loadMetrika, IDLE_TIMEOUT_MS);
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
