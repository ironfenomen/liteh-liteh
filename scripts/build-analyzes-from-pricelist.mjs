/**
 * Сборка src/data/analyzes.json из прайса (цена + код).
 * Прайс: data/price-codes-raw.txt — строки "цена\tкод".
 * Существующие названия из src/data/analyzes.json сохраняются по коду.
 * Запуск: node scripts/build-analyzes-from-pricelist.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const PRICE_FILE = join(ROOT, "data", "price-codes-raw.txt");
const OUT_FILE = join(ROOT, "src", "data", "analyzes.json");

function slugify(text) {
  const tr = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
    и: "i", й: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sh",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  let s = (text || "")
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => tr[c] || c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "item";
}

function buildSlug(code, name) {
  const safeCode = String(code).replace(".", "-").replace(/[^a-z0-9-]/gi, "-");
  const nameSlug = slugify(name);
  return nameSlug ? `${nameSlug}-${safeCode}` : `issledovanie-${safeCode}`;
}

const knownNames = {
  "09.01": "АЛТ (аланинаминотрансфераза)",
  "09.67": "Витамин D (25‑гидроксивитамин D)",
  "07.03": "Пролактин",
  "07.06": "Тестостерон общий",
  "07.09": "Т4 (тироксин) свободный",
  "07.12": "ТТГ (тиреотропный гормон)",
  "22.01": "Общий анализ мочи",
  "24.29": "Глюкоза в крови",
  "18.08": "D‑димер",
  "19.01": "Общий анализ крови + формула + СОЭ",
};

function main() {
  if (!existsSync(PRICE_FILE)) {
    console.error("Файл не найден:", PRICE_FILE);
    process.exit(1);
  }

  let existingByName = {};
  if (existsSync(OUT_FILE)) {
    try {
      const current = JSON.parse(readFileSync(OUT_FILE, "utf8"));
      current.forEach((item) => {
        existingByName[String(item.code).trim()] = item.name;
      });
    } catch (e) {}
  }

  const lines = readFileSync(PRICE_FILE, "utf8")
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const byCode = new Map();

  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;
    const priceStr = parts[0].replace(",", ".");
    const price = Math.round(parseFloat(priceStr));
    if (Number.isNaN(price)) continue;
    const code = parts.slice(1).join(" ").trim();
    if (!code) continue;
    byCode.set(code, price);
  }

  const out = [];
  for (const [code, price] of byCode.entries()) {
    const name = existingByName[code] || knownNames[code] || `Исследование ${code}`;
    const slug = buildSlug(code, name);
    out.push({ code, name, slug, category: "", price });
  }

  out.sort((a, b) => {
    const c = String(a.code).localeCompare(String(b.code), undefined, { numeric: true });
    return c !== 0 ? c : a.name.localeCompare(b.name);
  });

  writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), "utf8");
  console.log("Записано записей:", out.length, "→", OUT_FILE);
}

main();
