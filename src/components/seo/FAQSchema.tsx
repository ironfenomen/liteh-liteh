/**
 * JSON-LD Schema.org FAQPage.
 * Для Google Rich Results (FAQ) и Yandex.
 */

const faq = [
  {
    question: "Сколько стоят анализы?",
    answer:
      "Стоимость анализов зависит от типа исследования. Подробности смотрите в разделе анализы.",
  },
  {
    question: "Нужно ли записываться на УЗИ?",
    answer:
      "Да, для проведения УЗИ рекомендуется предварительная запись.",
  },
];

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
  return <JsonLdScript data={schema} />;
}
