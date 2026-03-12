"use client";

import { useEffect } from "react";
import { getConsent } from "@/lib/consent";
import { initYandexMetrika } from "@/lib/yandex-metrika";

/**
 * При монтировании проверяет согласие: если оно уже дано, подключает Яндекс.Метрику.
 * До согласия скрипт mc.yandex.ru не загружается.
 */
export default function MetrikaLoader() {
  useEffect(() => {
    if (getConsent()) initYandexMetrika();
  }, []);
  return null;
}
