import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Hamilton Trading & Contracting W.L.L',
    alternateName: 'HTC Fire Qatar',
    url: 'https://htc-fire.com',
    logo: 'https://htc-fire.com/h-logo.jpg',
    image: 'https://htc-fire.com/about-us.jpg',
    telephone: '+97444882355',
    email: 'mail@htcqatar.net',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Birkat Al Awamer / Industrial Area',
      addressLocality: 'Doha',
      addressCountry: 'QA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.1764',
      longitude: '51.5234',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Saturday',
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
        ],
        opens: '07:30',
        closes: '17:30',
      },
    ],
    priceRange: '$$',
    sameAs: [
      'https://www.facebook.com/www.htcqatar.net',
      'https://www.instagram.com/hamiltonfirefighting',
      'https://www.linkedin.com/company/hamilton-trading-contracting-wll',
      'https://x.com/hamiltonqatar',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '440',
    },
  };
}
