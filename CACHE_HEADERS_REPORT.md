# Текущие настройки кеширования — liteh26.ru

## 1. next.config.ts — headers()

| Порядок | source | Cache-Control |
|--------|--------|----------------|
| 1 | `/(.*)` | `public, max-age=0, must-revalidate` |
| 2 | `/_next/static/:path*` | `public, max-age=31536000, immutable` |

**Поведение:**
- Для пути совпадают оба правила — применяется **последний** (в Next.js последнее совпадение перекрывает предыдущее).
- Страницы (`/`, `/analizy`, …) → только правило 1 → **must-revalidate**.
- Запросы к `/_next/static/...` (JS, CSS, чанки с хешем) → правило 2 → **immutable**.

**Итог по статике Next.js:**
- **JS/CSS** под `/_next/static/` — уже кешируются с `immutable`.
- **Шрифты** из `next/font` отдаются из `/_next/static/` — тоже попадают под правило 2.
- **Картинки** из `public/` (например `/liteh-logo.svg`) идут по правилу 1 → **must-revalidate**, долгого кеша нет.

## 2. vercel.json

- Заданы только заголовки безопасности для `(.*)`:
  - `Strict-Transport-Security`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
- **Cache-Control в vercel.json не задаётся** — кеширование только из next.config.

## 3. middleware.ts

- Ставит только `x-pathname` в request headers.
- С кешем и Cache-Control **не связан** — не трогаем.

## 4. Что не охвачено

- Файлы из **public/** (корень сайта): `.svg`, `.png`, `.txt`, `.html` и т.д. попадают под `(.*)` и получают `max-age=0, must-revalidate`. Для статических изображений и шрифтов в public логично дать долгий кеш: `public, max-age=31536000, immutable`.

---

## Предлагаемые изменения

1. **Оставить как есть:**  
   - правило для `(.*)` → must-revalidate;  
   - правило для `/_next/static/:path*` → immutable.  
   Так уже корректно кешируются JS, CSS и шрифты из `_next/static`.

2. **Добавить правило для статики из public:**  
   Пути, заканчивающиеся на статические расширения (изображения, шрифты и т.п.), отдавать с `public, max-age=31536000, immutable`, чтобы картинки и шрифты из `public/` кешировались так же, как запрошенные вами статические ресурсы.  
   Правило задать **после** общего `(.*)` и **до** или **после** `/_next/static/:path*` так, чтобы для `/_next/static/` по-прежнему выигрывало правило с `/_next/static/:path*` (оно должно идти последним для путей под `_next/static`).

Итоговый порядок в `headers()`:
1. `(.*)` → `public, max-age=0, must-revalidate`
2. Пути с расширениями статики (из public) → `public, max-age=31536000, immutable`
3. `/_next/static/:path*` → `public, max-age=31536000, immutable`

API, layout, SEO и middleware не меняются.
