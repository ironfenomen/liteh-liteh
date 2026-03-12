/**
 * Импорт цен из Excel-файла прайса в data/price-codes-raw.txt.
 * Файл Excel берётся из data/price-latest.xlsx.
 * Формат выходного файла: "цена\tкод" на строку.
 */

import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import XLSX from "xlsx";

const ROOT = process.cwd();
const XLSX_FILE = join(ROOT, "data", "price-latest.xlsx");
const OUT_FILE = join(ROOT, "data", "price-codes-raw.txt");

function detectColumns(rows) {
  for (const row of rows) {
    if (!Array.isArray(row)) continue;
    const lower = row.map((cell) =>
      typeof cell === "string" ? cell.toLowerCase() : ""
    );
    let codeCol = -1;
    let priceCol = -1;
    lower.forEach((cell, idx) => {
      if (cell && codeCol === -1 && cell.includes("код")) codeCol = idx;
      if (
        cell &&
        priceCol === -1 &&
        (cell.includes("цен") ||
          cell.includes("стоим") ||
          cell.includes("руб"))
      ) {
        priceCol = idx;
      }
    });
    if (codeCol !== -1 && priceCol !== -1) {
      return { codeCol, priceCol };
    }
  }
  return { codeCol: -1, priceCol: -1 };
}

function toNumber(value) {
  if (value == null) return NaN;
  if (typeof value === "number") return value;
  const str = String(value).replace(/\s+/g, "").replace(",", ".");
  return Number.parseFloat(str);
}

function main() {
  if (!existsSync(XLSX_FILE)) {
    console.error("Файл Excel не найден:", XLSX_FILE);
    process.exit(1);
  }

  const wb = XLSX.readFile(XLSX_FILE);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  if (!rows || rows.length === 0) {
    console.error("Пустой лист в Excel");
    process.exit(1);
  }

  const { codeCol, priceCol } = detectColumns(rows.slice(0, 10));
  if (codeCol === -1 || priceCol === -1) {
    console.error(
      "Не удалось определить колонки с кодом и ценой. Проверьте заголовки в Excel."
    );
    process.exit(1);
  }

  const lines = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!Array.isArray(row)) continue;
    const codeRaw = row[codeCol];
    const priceRaw = row[priceCol];
    if (!codeRaw || !priceRaw) continue;

    const code = String(codeRaw).trim();
    if (!code) continue;

    const price = toNumber(priceRaw);
    if (!Number.isFinite(price) || price <= 0) continue;

    const priceFixed = price.toFixed(2);
    lines.push(`${priceFixed}\t${code}`);
  }

  if (lines.length === 0) {
    console.error("Не удалось извлечь ни одной строки с ценой и кодом.");
    process.exit(1);
  }

  writeFileSync(OUT_FILE, lines.join("\n"), "utf8");
  console.log(
    `Обновлён файл ${OUT_FILE}. Строк:`,
    lines.length,
    "Кодовая колонка:",
    codeCol,
    "Ценовая колонка:",
    priceCol
  );
}

main();

