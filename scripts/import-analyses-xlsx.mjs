/**
 * Импорт каталога анализов из Excel «Розница Ставрополь».
 * Колонки: Код, Анализ, Цена, Взятие биоматериала, Срок выполнения.
 * Строки с пустым кодом — заголовки категорий.
 *
 * Запуск: node scripts/import-analyses-xlsx.mjs [путь к .xlsx]
 * По умолчанию: ./data/Розница Ставрополь.xlsx (скопируйте файл в проект)
 *   или укажите полный путь: node scripts/import-analyses-xlsx.mjs "/Users/.../Розница Ставрополь.xlsx"
 */

import { writeFileSync, existsSync } from "fs";
import { join } from "path";
import XLSX from "xlsx";

const ROOT = process.cwd();
const defaultPath = join(ROOT, "data", "Розница Ставрополь.xlsx");
const xlsxPath = process.argv[2] || defaultPath;
const OUT_FILE = join(ROOT, "src", "data", "analyses.json");

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

function main() {
  if (!existsSync(xlsxPath)) {
    console.error("Файл не найден:", xlsxPath);
    console.error("Укажите путь: node scripts/import-analyses-xlsx.mjs /path/to/Розница Ставрополь.xlsx");
    process.exit(1);
  }

  const wb = XLSX.readFile(xlsxPath);
  const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
    header: 1,
    defval: null,
  });

  let currentCategory = "";
  const list = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!Array.isArray(row) || row.length < 2) continue;

    const codeRaw = row[0];
    const name = row[1] != null ? String(row[1]).trim() : "";
    const price = row[2] != null ? Number(row[2]) : null;
    const biomaterial = row[3] != null ? String(row[3]).trim() : "";
    const duration = row[4] != null ? String(row[4]).trim() : "";

    if (codeRaw == null || codeRaw === "" || String(codeRaw).toLowerCase() === "код") {
      if (name) currentCategory = name;
      continue;
    }

    const code = String(codeRaw).trim();
    if (!name) continue;

    const slug = slugify(name) + "-" + code.replace(".", "-");
    list.push({
      code,
      name,
      slug,
      category: currentCategory || "Без категории",
      price: Number.isFinite(price) ? price : null,
      biomaterial: biomaterial || null,
      duration: duration || null,
    });
  }

  const outDir = join(ROOT, "src", "data");
  writeFileSync(OUT_FILE, JSON.stringify(list, null, 2), "utf8");
  console.log("Импортировано записей:", list.length);
  console.log("Сохранено:", OUT_FILE);
}

main();
