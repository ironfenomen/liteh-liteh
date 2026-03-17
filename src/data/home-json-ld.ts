/**
 * JSON-LD для главной страницы (Organization, WebPage, FAQ).
 * Используется серверным компонентом HomeJsonLd.
 */
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalOrganization", "LocalBusiness"],
      "@id": "https://liteh26.ru/#organization",
      name: "Лаборатория Литех",
      alternateName: "Литех — лабораторная диагностика Ставрополь",
      description:
        "Медицинская лаборатория «Литех» в Ставрополе. Лабораторные анализы, УЗИ-диагностика, приём врачей, выезд медсестры на дом. Более 800 видов исследований. Результаты онлайн.",
      url: "https://liteh26.ru",
      telephone: "+7-988-865-27-77",
      priceRange: "₽₽",
      image: "https://liteh26.ru/og-image.jpg",
      medicalSpecialty: "Laboratory Medicine",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "ул. 45 Параллель, д.2",
          addressLocality: "Ставрополь",
          addressRegion: "Ставропольский край",
          postalCode: "355000",
          addressCountry: "RU",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "ул. 45 Параллель, д.26",
          addressLocality: "Ставрополь",
          addressRegion: "Ставропольский край",
          postalCode: "355000",
          addressCountry: "RU",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "пер. Каховский, 26а",
          addressLocality: "Ставрополь",
          addressRegion: "Ставропольский край",
          postalCode: "355000",
          addressCountry: "RU",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: "45.0440",
        longitude: "41.9734",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:30",
          closes: "20:00",
        },
      ],
      hasMap: "https://yandex.ru/profile/214201864017?lang=ru",
      sameAs: [
        "https://yandex.ru/profile/214201864017?lang=ru",
        "https://yandex.ru/profile/183400884271?lang=ru",
        "https://yandex.ru/profile/156076200245?lang=ru",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://liteh26.ru/#webpage",
      url: "https://liteh26.ru",
      name: "Анализы и УЗИ в Ставрополе — Лаборатория «Литех»",
      description:
        "Сдать анализы в Ставрополе в лаборатории «Литех». 800+ видов исследований, УЗИ, прием врачей, выезд медсестры на дом. Результаты онлайн. 3 филиала, забор крови с 07:30.",
      inLanguage: "ru",
      isPartOf: { "@id": "https://liteh26.ru/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://liteh26.ru",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Как быстро я получу результаты анализов?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Большинство базовых исследований выполняются в течение 1 рабочего дня. Более сложные панели и генетические тесты могут занимать до 3–5 дней. Актуальные сроки указаны в карточке каждого анализа и уточняются при записи.",
          },
        },
        {
          "@type": "Question",
          name: "Где можно посмотреть результаты анализов?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Результаты отправляются на электронную почту, а также доступны в личном кабинете. При необходимости вы можете получить распечатку в любом филиале лаборатории.",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли сдать анализы без направления от врача?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, вы можете сдать большинство анализов без направления. Для сложных исследований и стационарного лечения мы рекомендуем предварительную консультацию врача, чтобы подобрать оптимальный объём диагностики.",
          },
        },
        {
          "@type": "Question",
          name: "Делает ли лаборатория Литех выезд на дом?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, вы можете оформить выезд медсестры на дом для забора крови и мазков. Оформить заявку можно по телефону, через мессенджеры или на странице «Выезд врача на дом».",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли получить медсестринскую помощь со своими препаратами?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, возможно выполнение инъекций и других процедур с вашими препаратами, если у вас есть оригинальное назначение врача. Перед визитом покажите назначение администратору или медсестре.",
          },
        },
      ],
    },
  ],
};
