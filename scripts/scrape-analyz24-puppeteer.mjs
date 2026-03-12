/**
 * Парсер каталога analyz24.ru через Puppeteer (для JS-каталога).
 * Запуск: node scripts/scrape-analyz24-puppeteer.mjs
 * Требует: npm install puppeteer
 */

import { writeFileSync } from "fs";
import { join } from "path";

const BASE_URL = "https://analyz24.ru";
const CATALOG_URL = "https://analyz24.ru/stavropol";

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

async function main() {
  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch (e) {
    console.error("Установите puppeteer: npm install puppeteer");
    process.exit(1);
  }

  console.log("Запуск браузера...");
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    console.log("Переход:", CATALOG_URL);
    await page.goto(CATALOG_URL, { waitUntil: "networkidle2", timeout: 30000 });

    await page.waitForTimeout(3000);

    const items = await page.evaluate(() => {
      const result = [];
      const seen = new Set();

      const textOf = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "");

      document.querySelectorAll("a[href*='analiz'], a[href*='uslugi'], [class*='catalog'] a, [class*='service'] a, [class*='price'] a, table tbody tr, [data-code]").forEach((el) => {
        const text = textOf(el);
        if (text.length < 10 || text.length > 500) return;

        const codeMatch = text.match(/код\s*[№#]?\s*([\d.]+)/i) || text.match(/(\d{2}\.\d{2})/);
        const priceMatch = text.match(/(\d+)\s*₽/);
        const dataCode = el.getAttribute && el.getAttribute("data-code");
        const code = dataCode || (codeMatch ? codeMatch[1].trim() : "");
        if (!priceMatch && !code) return;

        const price = priceMatch ? parseInt(priceMatch[1], 10) : 0;
        let name = text
          .replace(/\d+\s*₽.*$/i, "")
          .replace(/код\s*[№#]?\s*[\d.]+/gi, "")
          .replace(/\d+\s*р\.?\s*д\.?/gi, "")
          .replace(/можно сдать дома/gi, "")
          .replace(/в корзину/gi, "")
          .trim();
        if (name.length > 250) name = name.slice(0, 250);
        if (!name) name = "Анализ " + code;

        const id = code + "|" + price + "|" + name.slice(0, 50);
        if (seen.has(id)) return;
        seen.add(id);

        result.push({ code: code || "—", name, price });
      });

      return result;
    });

    const unique = [];
    const byKey = new Map();
    for (const it of items) {
      const slug = it.code !== "—"
        ? `${slugify(it.name)}-${String(it.code).replace(".", "-")}`
        : slugify(it.name);
      const rec = { ...it, slug, category: "" };
      const key = (rec.code + rec.name).toLowerCase();
      if (!byKey.has(key)) {
        byKey.set(key, rec);
        unique.push(rec);
      }
    }

    const outPath = join(process.cwd(), "src", "data", "analyzes.json");
    writeFileSync(outPath, JSON.stringify(unique, null, 2), "utf8");
    console.log("Сохранено записей:", unique.length, "→", outPath);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
