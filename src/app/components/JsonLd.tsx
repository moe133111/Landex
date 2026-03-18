export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Landex Digital',
    url: 'https://www.landex.digital',
    logo: 'https://www.landex.digital/LandexDigital.svg',
    description: 'Webdesigner für Landing Pages – Strategie, Copy, Design & Code für lokale Unternehmen.',
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    serviceType: ['Webdesign', 'Landing Page Erstellung', 'Conversion Optimierung'],
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Start',
        item: 'https://www.landex.digital',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FaqJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Für wen ist dieser Service gedacht?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Für kleine Unternehmen, Selbstständige und lokale Betriebe, die ein klares Angebot haben und mehr Anfragen oder Buchungen über das Internet erhalten möchten – ohne sich selbst mit Technik und Marketing beschäftigen zu müssen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Brauche ich schon eine Website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein. Eine Landing Page kann Ihre erste Online-Präsenz sein oder eine Ergänzung zu einer bestehenden Website, um ein bestimmtes Angebot gezielt zu bewerben.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet eine Landing Page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das hängt vom Umfang ab – z. B. Anzahl der Sektionen, Mehrsprachigkeit oder Einbindung von Buchungssystemen. Im Erstgespräch klären wir Ihr Ziel und machen Ihnen ein klares, transparentes Angebot.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie lange dauert es, bis die Landing Page online ist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In vielen Fällen kann eine erste Version innerhalb weniger Tage stehen – vorausgesetzt, die nötigen Inhalte (Texte, Bilder, Logo) sind vorhanden.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
