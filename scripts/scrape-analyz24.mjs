/**
 * Парсер каталога анализов с analyz24.ru (Ставрополь).
 * Запуск: node scripts/scrape-analyz24.mjs
 * Требует: npm install cheerio
 *
 * Если каталог подгружается через JS, используйте scrape-analyz24-puppeteer.mjs
 */

import { writeFileSync } from "fs";
import { join } from "path";

const BASE_URL = "https://analyz24.ru";
const CATALOG_PATH = "/stavropol";

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

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

async function main() {
  let cheerio;
  try {
    const mod = await import("cheerio");
    cheerio = mod.default;
  } catch (e) {
    console.error("Установите cheerio: npm install cheerio");
    process.exit(1);
  }

  const url = BASE_URL + CATALOG_PATH;
  console.log("Загрузка:", url);

  let html;
  try {
    html = await fetchHtml(url);
  } catch (e) {
    console.error("Ошибка загрузки:", e.message);
    process.exit(1);
  }

  const $ = cheerio.load(html);
  const items = [];
  const seen = new Set();

  $("a[href*='analiz'], a[href*='uslugi'], [class*='catalog'] a, [class*='service'] a, table tbody tr").each((_, el) => {
    const $el = $(el);
    const text = $el.text().replace(/\s+/g, " ").trim();
    if (text.length < 15 || text.length > 400) return;

    const codeMatch = text.match(/код\s*[№#]?\s*([\d.]+)/i) || text.match(/(\d{2}\.\d{2})/);
    const priceMatch = text.match(/(\d+)\s*₽/);
    if (!priceMatch) return;

    const code = codeMatch ? codeMatch[1].trim() : "";
    const price = parseInt(priceMatch[1], 10);
    let name = text
      .replace(/\d+\s*₽.*$/i, "")
      .replace(/код\s*[№#]?\s*[\d.]+/gi, "")
      .replace(/\d+\s*р\.?\s*д\.?/gi, "")
      .replace(/можно сдать дома/gi, "")
      .replace(/в корзину/gi, "")
      .trim();
    if (name.length > 250) name = name.slice(0, 250);
    if (!name) name = "Анализ " + code;

    const id = code + "|" + price + "|" + name.slice(0, 40);
    if (seen.has(id)) return;
    seen.add(id);

    const slug = code ? `${slugify(name)}-${String(code).replace(".", "-")}` : slugify(name);
    items.push({
      code: code || "—",
      name,
      slug,
      category: "",
      price,
    });
  });

  const byKey = new Map();
  const unique = [];
  for (const it of items) {
    const key = (it.code + it.name).toLowerCase();
    if (!byKey.has(key)) {
      byKey.set(key, it);
      unique.push(it);
    }
  }

  const outPath = join(process.cwd(), "src", "data", "analyzes.json");
  writeFileSync(outPath, JSON.stringify(unique, null, 2), "utf8");
  console.log("Сохранено записей:", unique.length, "→", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
