/**
 * Каталог врачей сети Литех / Амадея.
 * Данные по филиалам и специальностям сверены с ПроДокторов (март 2026).
 *
 * Как редактировать:
 * - Добавить врача: в BOOKING_URL_MAP — ФИО и ссылку (если есть запись), затем в DOCTORS — вызов doctor(…).
 * - Один врач = одна карточка; если принимает в нескольких филиалах — указать все в clinicIds.
 * - Фото: подставить photo: "https://..." в opts. URL можно получить со страницы врача на prodoctorov.ru (og:image).
 */

import type { ClinicId } from "./clinics";

export type Doctor = {
  id: string;
  name: string;
  specialties: string[];
  clinicIds: ClinicId[];
  priceFrom: string | null;
  experience: string | null;
  badge: string | null;
  photo: string | null;
  bookingUrl: string | null;
};

/** Сопоставление ФИО → ссылка записи (только точное совпадение). */
export const BOOKING_URL_MAP: Record<string, string> = {
  "Абдулкаримова Патимат Магомедовна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1284583&source=4",
  "Анташян Галина Георгиевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=14859&source=4",
  "Боброва Александра Николаевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=14987&source=4",
  "Борисова Елена Алексеевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1176945&source=4",
  "Боюнсузова Зухра Руслановна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1068600&source=4",
  "Бояхчян Армине Бахшиевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1328906&source=4",
  "Григориадис Лариса Феодосиевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=812066&source=4",
  "Денисенко Игорь Александрович":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=575464&source=4",
  "Задорожникова Дарья Сергеевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=358694&source=4",
  "Залтан Марина Алексеевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=180004&source=4",
  "Камоликова Жанна Анатольевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=577029&source=4",
  "Корниенко Наталья Николаевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1328742&source=4",
  "Крон Артём Владимирович":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1079535&source=4",
  "Крон Елена Ивановна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=151413&source=4",
  "Кумратова Наталья Александровна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=577045&source=4",
  "Лаврентьев Илья Дмитриевич":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1153657&source=4",
  "Лукашевич Лада Сергеевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=537493&source=4",
  "Малаева Муслимат Муслимовна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1302590&source=4",
  "Минин Юрий Владимирович":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1027737&source=4",
  "Можарук Дарья Сергеевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=939888&source=4",
  "Мутаева Ольга Юрьевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=579654&source=4",
  "Нартова Лариса Алексеевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=60874&source=4",
  "Проскуркина Анна Александровна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=632966&source=4",
  "Пучкова Анастасия Андреевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1092321&source=4",
  "Рахматулина Елена Николаевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=451396&source=4",
  "Сидельникова Тамара Асановна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=391471&source=4",
  "Степанян Виктория Владимировна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=809137&source=4",
  "Степурина Анна Андреевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=622100&source=4",
  "Ушакова Олеся Викторовна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=1043261&source=4",
  "Шемякина Вера Николаевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=238134&source=4",
  "Эркенова Жанна Алиевна":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=14941&source=4",
  "Яценко Сергей Викторович":
    "https://booking.medflex.ru/?user=d08403255205cfe5edb04db2691b5e68&employeeId=129375&source=4",
};

/** URL фотографий врачей. Только с сайтов клиник (amadeyakids.ru, amadeyadetox26.ru). Фото с Medflex по текущим URL не отдаются как картинки — у остальных врачей показывается плейсхолдер. */
export const DOCTOR_PHOTO_URLS: Record<string, string> = {
  "Мутаева Ольга Юрьевна":
    "https://www.amadeyadetox26.ru/images/props/mutaeva.jpg",
  "Крон Елена Ивановна":
    "https://www.amadeyadetox26.ru/images/props/kron.jpg",
  "Крон Артём Владимирович":
    "https://amadeyakids.ru/wp-content/themes/amadeya-kids-redesign/assets/img/kronartem.jpg",
  "Камоликова Жанна Анатольевна":
    "https://www.amadeyadetox26.ru/images/props/kamolikova.jpg",
  "Боброва Александра Николаевна":
    "https://www.amadeyadetox26.ru/images/props/bobrova.jpg",
  "Кумратова Наталья Александровна":
    "https://www.amadeyadetox26.ru/images/props/kumratova.jpg",
  "Можарук Дарья Сергеевна":
    "https://www.amadeyadetox26.ru/images/props/mozharuk.jpg",
  "Боюнсузова Зухра Руслановна":
    "https://www.amadeyadetox26.ru/images/props/boyunsuzova_1470.jpg",
  "Борисова Елена Алексеевна":
    "https://www.amadeyadetox26.ru/images/props/borisova.jpg",
  "Лаврентьев Илья Дмитриевич":
    "https://www.amadeyadetox26.ru/images/props/lavrentev.jpg",
  "Пучкова Анастасия Андреевна":
    "https://amadeyakids.ru/wp-content/themes/amadeya-kids-redesign/assets/img/puchkova.jpg",
  "Малаева Муслимат Муслимовна":
    "https://amadeyakids.ru/wp-content/themes/amadeya-kids-redesign/assets/img/malaeva.jpg",
};

/** Стоимость приёма «от» по ПроДокторов (клиника Амадея / Литех, март 2026). Для остальных — «от 1 500 ₽». */
export const DOCTOR_PRICE_FROM: Record<string, string> = {
  "Мутаева Ольга Юрьевна": "от 1 750 ₽",
  "Эркенова Жанна Алиевна": "от 1 750 ₽",
  "Камоликова Жанна Анатольевна": "от 1 750 ₽",
  "Борисова Елена Алексеевна": "от 2 100 ₽",
  "Анташян Галина Георгиевна": "от 1 400 ₽",
  "Боброва Александра Николаевна": "от 2 100 ₽",
  "Шемякина Вера Николаевна": "от 1 750 ₽",
  "Боюнсузова Зухра Руслановна": "от 1 750 ₽",
  "Крон Елена Ивановна": "от 2 500 ₽",
  "Залтан Марина Алексеевна": "от 1 000 ₽",
  "Денисенко Игорь Александрович": "от 2 500 ₽",
  "Сидельникова Тамара Асановна": "от 2 500 ₽",
  "Лукашевич Лада Сергеевна": "от 3 000 ₽",
  "Задорожникова Дарья Сергеевна": "от 2 000 ₽",
  "Крон Артём Владимирович": "от 1 400 ₽",
};

const CYR: Record<string, string> = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ы: "y", э: "e", ю: "yu", я: "ya" };

function slug(name: string): string {
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[ьъ]/g, "");
  let out = "";
  for (const c of normalized) {
    if (c === "-") out += "-";
    else if (CYR[c as keyof typeof CYR]) out += CYR[c as keyof typeof CYR];
    else if (/[a-z0-9]/.test(c)) out += c;
  }
  return out.replace(/-+/g, "-").replace(/^-|-$/g, "") || "doctor";
}

function doctor(
  name: string,
  specialties: string[],
  clinicIds: ClinicId[],
  opts: {
    priceFrom?: string | null;
    experience?: string | null;
    badge?: string | null;
    photo?: string | null;
  } = {}
): Doctor {
  return {
    id: slug(name),
    name,
    specialties,
    clinicIds,
    priceFrom: opts.priceFrom ?? DOCTOR_PRICE_FROM[name] ?? "от 1 500 ₽",
    experience: opts.experience ?? null,
    badge: opts.badge ?? null,
    photo: opts.photo ?? DOCTOR_PHOTO_URLS[name] ?? null,
    bookingUrl: BOOKING_URL_MAP[name] ?? null,
  };
}

/** Единый массив врачей: один врач — одна карточка, филиалы в clinicIds. Сверено с ПроДокторов (март 2026). */
export const DOCTORS: Doctor[] = [
  doctor(
    "Мутаева Ольга Юрьевна",
    ["Психиатр", "Психотерапевт", "Нарколог", "Клинический психолог", "Рефлексотерапевт"],
    ["liteh", "kids", "detox"],
    { experience: "21 год" }
  ),
  doctor(
    "Эркенова Жанна Алиевна",
    ["Гинеколог", "Гинеколог-эндокринолог", "Акушер"],
    ["liteh"],
    { experience: "25 лет", badge: "Высшая категория" }
  ),
  doctor(
    "Камоликова Жанна Анатольевна",
    ["Психиатр", "Нарколог", "Психотерапевт"],
    ["liteh", "detox"],
    { experience: "21 год", badge: "Первая категория" }
  ),
  doctor(
    "Борисова Елена Алексеевна",
    ["Клинический психолог", "Психолог"],
    ["liteh", "detox"],
    { experience: "15 лет" }
  ),
  doctor(
    "Анташян Галина Георгиевна",
    ["Гинеколог", "Акушер"],
    ["liteh"],
    { experience: "41 год", badge: "Кандидат наук" }
  ),
  doctor("Абдулкаримова Патимат Магомедовна", ["Детский невролог"], ["kids"], { experience: "5 лет" }),
  doctor(
    "Боброва Александра Николаевна",
    ["Психотерапевт", "Психиатр", "Психолог"],
    ["liteh", "detox"],
    { experience: "22 года" }
  ),
  doctor("Боюнсузова Зухра Руслановна", ["Невролог"], ["liteh", "detox"], { experience: "7 лет" }),
  doctor("Бояхчян Армине Бахшиевна", ["Эндокринолог"], ["liteh", "detox"], { experience: "6 лет" }),
  doctor(
    "Григориадис Лариса Феодосиевна",
    ["Детский эндокринолог"],
    ["liteh", "kids"],
    { experience: "11 лет" }
  ),
  doctor(
    "Денисенко Игорь Александрович",
    ["Психиатр", "Нарколог", "Психотерапевт"],
    ["liteh", "detox"],
    { experience: "17 лет", badge: "Первая категория" }
  ),
  doctor(
    "Задорожникова Дарья Сергеевна",
    ["ЛОР", "Детский ЛОР", "Фониатр"],
    ["liteh", "kids"],
    { experience: "13 лет", badge: "Первая категория" }
  ),
  doctor(
    "Залтан Марина Алексеевна",
    ["Гинеколог", "Акушер", "Врач УЗИ", "Гинеколог-эндокринолог"],
    ["liteh"],
    { experience: "22 года" }
  ),
  doctor(
    "Корниенко Наталья Николаевна",
    ["Детский психолог", "Психолог"],
    ["liteh", "kids"],
    { experience: "22 года" }
  ),
  doctor("Крон Артём Владимирович", ["Травматолог"], ["liteh", "kids"], { experience: "5 лет" }),
  doctor(
    "Крон Елена Ивановна",
    ["Психиатр", "Нарколог", "Психотерапевт"],
    ["liteh", "kids", "detox"],
    { experience: "32 года" }
  ),
  doctor(
    "Кумратова Наталья Александровна",
    ["Психиатр", "Психотерапевт"],
    ["liteh", "detox"],
    { experience: "23 года", badge: "Высшая категория" }
  ),
  doctor(
    "Лаврентьев Илья Дмитриевич",
    ["Клинический психолог", "Психотерапевт", "Гипнолог"],
    ["liteh", "detox"],
    { experience: "10 лет" }
  ),
  doctor(
    "Лукашевич Лада Сергеевна",
    ["Эндокринолог", "Диетолог", "Нутрициолог"],
    ["liteh"],
    { experience: "10 лет", badge: "Первая категория" }
  ),
  doctor("Малаева Муслимат Муслимовна", ["Медсестра"], ["liteh", "kids"], { experience: "7 лет" }),
  doctor(
    "Минин Юрий Владимирович",
    ["Мануальный терапевт", "Реабилитолог", "Физиотерапевт"],
    ["liteh", "kids"],
    { experience: "41 год" }
  ),
  doctor(
    "Можарук Дарья Сергеевна",
    ["Кардиолог", "Ревматолог", "Терапевт"],
    ["liteh", "kids", "detox"],
    { experience: "6 лет" }
  ),
  doctor(
    "Нартова Лариса Алексеевна",
    ["Педиатр", "Детский инфекционист", "Инфекционист"],
    ["liteh", "kids"],
    { experience: "34 года", badge: "Высшая категория" }
  ),
  doctor("Проскуркина Анна Александровна", ["Инфекционист"], ["liteh"], { experience: "9 лет" }),
  doctor(
    "Пучкова Анастасия Андреевна",
    ["Клинический психолог", "Психолог"],
    ["liteh", "kids"],
    { experience: "6 лет" }
  ),
  doctor("Рахматулина Елена Николаевна", ["Врач УЗИ"], ["liteh", "kids"], { experience: "30 лет" }),
  doctor(
    "Сидельникова Тамара Асановна",
    ["Гастроэнтеролог"],
    ["liteh"],
    { experience: "16 лет", badge: "Высшая категория" }
  ),
  doctor(
    "Степанян Виктория Владимировна",
    ["Врач УЗИ", "Детский врач УЗИ"],
    ["liteh", "kids"],
    { experience: "27 лет" }
  ),
  doctor(
    "Степурина Анна Андреевна",
    ["ЛОР", "Детский ЛОР"],
    ["liteh", "kids"],
    { experience: "18 лет" }
  ),
  doctor("Ушакова Олеся Викторовна", ["Психолог"], ["liteh", "kids"], { experience: "9 лет" }),
  doctor(
    "Шемякина Вера Николаевна",
    ["Дерматолог", "Дерматовенеролог", "Гастроэнтеролог"],
    ["liteh", "kids"],
    { experience: "29 лет" }
  ),
  doctor("Яценко Сергей Викторович", ["Нейрохирург", "Детский нейрохирург"], ["liteh", "detox"], { experience: "29 лет" }),
];

/** Все уникальные специальности для фильтра. */
export function getAllSpecialties(): string[] {
  const set = new Set<string>();
  DOCTORS.forEach((d) => d.specialties.forEach((s) => set.add(s)));
  return Array.from(set).sort();
}
