/**
 * Парсинг каталога анализов с analyz24.ru
 * Запуск: node scripts/parse.js
 * Требует: npm install axios cheerio
 *
 * Сохраняет результат в src/data/analyses-raw.json
 */

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const BASE = "https://analyz24.ru";
const CATALOG_URL = `${BASE}/katalog/`;
const DELAY_MS_MIN = 500;
const DELAY_MS_MAX = 1000;
const OUT_PATH = path.join(__dirname, "..", "src", "data", "analyses-raw.json");

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function randomDelay() {
  const ms =
    DELAY_MS_MIN + Math.floor(Math.random() * (DELAY_MS_MAX - DELAY_MS_MIN + 1));
  return delay(ms);
}

const axiosInstance = axios.create({
  timeout: 30000,
  responseType: "text",
  responseEncoding: "utf8",
  headers: {
    "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
  validateStatus: () => true,
});

async function fetchHtml(url) {
  const fullUrl = url.startsWith("http") ? url : BASE + url;
  const res = await axiosInstance.get(fullUrl);
  if (res.status !== 200) {
    throw new Error(`HTTP ${res.status}: ${fullUrl}`);
  }
  return res.data;
}

/**
 * Собирает все URL категорий со страницы каталога (ссылки на /katalog/... без .html)
 */
function getCategoryUrls($, baseUrl) {
  const seen = new Set();
  const list = [];
  $('a[href*="/katalog/"]').each((_, el) => {
    let href = $(el).attr("href") || "";
    href = href.split("#")[0].trim();
    if (!href || href === "/katalog/" || href.endsWith(".html")) return;
    if (href.startsWith("/")) href = BASE + href;
    if (!href.startsWith(BASE + "/katalog/")) return;
    if (seen.has(href)) return;
    seen.add(href);
    list.push(href);
  });
  return list;
}

/**
 * Ищет ссылку на следующую страницу пагинации
 */
function getNextPageUrl($, currentUrl) {
  let next = null;
  $('a[rel="next"]').each((_, el) => {
    const href = $(el).attr("href");
    if (href) next = href.startsWith("http") ? href : new URL(href, currentUrl).href;
  });
  if (next) return next;
  $("a[href]").each((_, el) => {
    const $a = $(el);
    const text = $a.text().trim();
    const href = $a.attr("href") || "";
    if (
      (text === "Следующая" || text === "Далее" || text === "»" || /^\d+$/.test(text)) &&
      (href.includes("page") || href.includes("PAGEN") || /\/page\/\d+\//.test(href))
    ) {
      next = href.startsWith("http") ? href : new URL(href, currentUrl).href;
    }
  });
  if (next) return next;
  const match = currentUrl.match(/^(.*\/)(\d+)\/?$/);
  if (match) {
    const num = parseInt(match[2], 10);
    next = match[1] + (num + 1) + "/";
  }
  return next;
}

/**
 * Парсит страницу категории: возвращает { analyses: [...], nextPageUrl: string | null }
 */
function parseCategoryPage(html, pageUrl, categoryName) {
  const $ = cheerio.load(html, { decodeEntities: true });
  const analyses = [];
  const seen = new Set();

  $('a[href*="/katalog/"][href$=".html"]').each((_, el) => {
    const $a = $(el);
    const name = $a.text().replace(/\s+/g, " ").trim();
    if (!name || name.length > 500) return;

    let code = null;
    const $block = $a.closest("tr, [class*='item'], [class*='product'], [class*='card'], [class*='row'], [class*='catalog'], div");
    if ($block.length) {
      const blockText = $block.first().text();
      const cm = blockText.match(/Код\s*№\s*([\d.]+)/i);
      if (cm) code = cm[1].trim();
    }
    if (!code) {
      let $prev = $a.parent().prev();
      for (let i = 0; i < 3 && $prev.length; i++) {
        const t = $prev.text();
        const cm = t.match(/Код\s*№\s*([\d.]+)/i);
        if (cm) {
          code = cm[1].trim();
          break;
        }
        $prev = $prev.prev();
      }
    }
    if (!code) return;

    const key = code + "|" + name.slice(0, 80);
    if (seen.has(key)) return;
    seen.add(key);

    analyses.push({
      code,
      name,
      category: categoryName || "",
    });
  });

  const nextPageUrl = getNextPageUrl($, pageUrl);
  return { analyses, nextPageUrl };
}

/**
 * Получает название категории со страницы (h1 или title)
 */
function getCategoryName($) {
  let h1 = $("h1").first().text().replace(/\s+/g, " ").trim();
  if (h1) {
    h1 = h1.replace(/:?\s*СДАТЬ АНАЛИЗЫ в Москве\.?\s*$/i, "").trim();
    return h1 || "";
  }
  const title = $("title").text().replace(/\s+/g, " ").trim();
  if (title) {
    const t = title.split("|")[0].trim();
    return t.replace(/:?\s*СДАТЬ АНАЛИЗЫ в Москве\.?\s*$/i, "").trim() || t;
  }
  return "";
}

async function main() {
  const allByCode = new Map();
  const visitedUrls = new Set();
  const queue = [CATALOG_URL];
  let totalCategories = 0;
  let doneCategories = 0;

  console.log("Загрузка главной страницы каталога:", CATALOG_URL);

  let mainHtml;
  try {
    mainHtml = await fetchHtml(CATALOG_URL);
  } catch (e) {
    console.error("Ошибка загрузки каталога:", e.message);
    process.exit(1);
  }

  await randomDelay();

  const $main = cheerio.load(mainHtml, { decodeEntities: true });
  const categoryUrls = getCategoryUrls($main, CATALOG_URL);
  const urlQueue = [...categoryUrls];
  totalCategories = urlQueue.length;
  console.log("Найдено категорий (страниц для обхода):", totalCategories);

  while (urlQueue.length > 0) {
    const url = urlQueue.shift();
    if (visitedUrls.has(url)) continue;
    visitedUrls.add(url);

    doneCategories++;
    let html;
    try {
      html = await fetchHtml(url);
    } catch (e) {
      console.warn("Пропуск (недоступна):", url, "-", e.message);
      continue;
    }

    const $ = cheerio.load(html, { decodeEntities: true });
    const categoryName = getCategoryName($);
    const { analyses, nextPageUrl } = parseCategoryPage(html, url, categoryName);

    for (const a of analyses) {
      if (!allByCode.has(a.code)) {
        allByCode.set(a.code, a);
      }
    }

    console.log(
      `Категория ${doneCategories} из ${totalCategories}: ${categoryName || url} — найдено ${analyses.length} анализов`
    );

    if (nextPageUrl && !visitedUrls.has(nextPageUrl)) {
      urlQueue.push(nextPageUrl);
      if (urlQueue.length > totalCategories) totalCategories = urlQueue.length;
    }

    await randomDelay();
  }

  const result = Array.from(allByCode.values()).sort((a, b) =>
    a.code.localeCompare(b.code, undefined, { numeric: true })
  );

  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), "utf8");

  console.log("Готово. Всего уникальных анализов (по коду):", result.length);
  console.log("Сохранено в:", OUT_PATH);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
