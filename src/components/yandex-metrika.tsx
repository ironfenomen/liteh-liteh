"use client";

import { useEffect } from "react";
import { getConsent, METRIKA_CONSENT_EVENT } from "@/lib/consent";
import { initYandexMetrika } from "@/lib/yandex-metrika";

export default function YandexMetrika() {
  useEffect(() => {
    const start = () => initYandexMetrika();
    if (getConsent()) start();
    window.addEventListener(METRIKA_CONSENT_EVENT, start);
    return () => window.removeEventListener(METRIKA_CONSENT_EVENT, start);
  }, []);

  return null;
}
