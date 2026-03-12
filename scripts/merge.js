/**
 * Объединяет спарсенные анализы (analyses-raw.json) с прайсом (prices.json)
 * и сохраняет итог в src/data/analyses.json
 *
 * Запуск: node scripts/merge.js
 */

const fs = require("fs");
const path = require("path");

const RAW_PATH = path.join(__dirname, "..", "src", "data", "analyses-raw.json");
const PRICES_PATH = path.join(__dirname, "..", "src", "data", "prices.json");
const OUT_PATH = path.join(__dirname, "..", "src", "data", "analyses.json");

function main() {
  let raw = [];
  let prices = [];

  if (!fs.existsSync(RAW_PATH)) {
    console.error("Файл не найден:", RAW_PATH);
    console.error("Сначала выполните: node scripts/parse.js");
    process.exit(1);
  }
  if (!fs.existsSync(PRICES_PATH)) {
    console.error("Файл не найден:", PRICES_PATH);
    process.exit(1);
  }

  try {
    raw = JSON.parse(fs.readFileSync(RAW_PATH, "utf8"));
  } catch (e) {
    console.error("Ошибка чтения analyses-raw.json:", e.message);
    process.exit(1);
  }

  try {
    prices = JSON.parse(fs.readFileSync(PRICES_PATH, "utf8"));
  } catch (e) {
    console.error("Ошибка чтения prices.json:", e.message);
    process.exit(1);
  }

  const priceByCode = new Map();
  for (const p of prices) {
    if (p && p.code != null) {
      priceByCode.set(String(p.code).trim(), p.price);
    }
  }

  function slugify(text) {
    const tr = {
      а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
      и: "i", й: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
      с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sh",
      ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
    };
    return (text || "")
      .toLowerCase()
      .replace(/[а-яё]/g, (c) => tr[c] || c)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "item";
  }

  const result = raw.map((item) => {
    const code = (item.code || "").toString().trim();
    const price = priceByCode.has(code) ? priceByCode.get(code) : null;
    const name = (item.name || "").trim();
    const slug = slugify(name) + "-" + (code || "").replace(".", "-");
    return {
      code: item.code,
      name,
      slug,
      category: item.category || "",
      price: price !== undefined && price !== null ? price : null,
    };
  });

  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), "utf8");

  const withPrice = result.filter((r) => r.price != null).length;
  const withoutPrice = result.length - withPrice;

  console.log("Готово.");
  console.log("Всего анализов:", result.length);
  console.log("С ценой из прайса:", withPrice);
  console.log("Без цены (price: null):", withoutPrice);
  console.log("Сохранено в:", OUT_PATH);
}

main();
