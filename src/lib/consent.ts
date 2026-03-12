/**
 * Хранение согласия на cookie/Метрику.
 * Один источник правды для баннера и для условной загрузки Яндекс.Метрики.
 */

const CONSENT_KEY = "liteh_cookie_consent";

export function getConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CONSENT_KEY) === "1";
  } catch {
    return false;
  }
}

export function setConsent(): void {
  try {
    localStorage.setItem(CONSENT_KEY, "1");
  } catch {
    // ignore
  }
}
