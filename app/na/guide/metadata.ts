import { Metadata } from 'next'
export const namibiaGuideMetadata: Metadata = {
  title: 'Import Cars to Namibia from Japan 2024 | Complete Walvis Bay Guide | Save N$65,000+',
  description: 'Step-by-step guide to importing cars from Japan to Namibia through Walvis Bay port. Professional import guidance system. Includes duty calculator, customs clearance, NaTIS registration, and scam prevention. Get real import guidance.',
  keywords: 'import cars Namibia, Japan car import Namibia, Walvis Bay port clearance, Namibia customs duty calculator, NaTIS vehicle registration, import duty Namibia 2024, Japanese used cars Namibia, car import costs Namibia, Namibia clearing agents, import permit Namibia, vehicle import process Namibia, Walvis Bay port fees, Namibia car import guide, Japanese auction cars Namibia, import taxes Namibia vehicles',
  openGraph: {
    title: 'Save N$65,000+ Importing Cars to Namibia | Complete 2024 Guide',
    description: 'The only guide you need to import cars from Japan to Namibia. Walvis Bay port navigation, duty calculations, and step-by-step process. Expert import guidance system.',
    url: 'https://www.impota.com/na/guide',
    siteName: 'IMPOTA - Namibia Car Import Guide',
    images: [
      {
        url: 'https://www.impota.com/og-namibia-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Import Cars to Namibia - Complete Guide'
      }
    ],
    locale: 'en_NA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Import Cars to Namibia from Japan | Save N$65,000+',
    description: 'Complete guide to importing vehicles through Walvis Bay. Duty calculator, customs clearance, and expert strategies.',
    images: ['https://www.impota.com/twitter-namibia-guide.jpg'],
  },
  alternates: {
    canonical: 'https://www.impota.com/na/guide',
    languages: {
      'en-NA': 'https://www.impota.com/na/guide',
      'en-ZA': 'https://www.impota.com/za/guide',
      'en-BW': 'https://www.impota.com/bw/guide',
      'en-ZM': 'https://www.impota.com/zm/guide',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
}
// JSON-LD Structured Data
export const namibiaGuideJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Import Cars from Japan to Namibia',
  description: 'Complete guide to importing vehicles from Japan to Namibia through Walvis Bay port, including customs clearance and registration.',
  image: 'https://www.impota.com/guide-hero-namibia.jpg',
  totalTime: 'P30D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'NAD',
    minValue: '55000',
    maxValue: '120000'
  },
  supply: [
    {
      '@type': 'HowToSupply',
      name: 'Import Permit from Ministry of Trade'
    },
    {
      '@type': 'HowToSupply',
      name: 'Bill of Lading from shipping company'
    },
    {
      '@type': 'HowToSupply',
      name: 'Export Certificate from Japan'
    }
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Find and Purchase Vehicle',
      text: 'Search Japanese auction sites and purchase your vehicle',
      url: 'https://www.impota.com/na/guide#step1',
      image: 'https://www.impota.com/step1-namibia.jpg'
    },
    {
      '@type': 'HowToStep',
      name: 'Arrange Shipping',
      text: 'Book shipping from Japan to Walvis Bay port',
      url: 'https://www.impota.com/na/guide#step2',
      image: 'https://www.impota.com/step2-namibia.jpg'
    },
    {
      '@type': 'HowToStep',
      name: 'Clear Customs',
      text: 'Complete customs clearance at Walvis Bay',
      url: 'https://www.impota.com/na/guide#step3',
      image: 'https://www.impota.com/step3-namibia.jpg'
    },
    {
      '@type': 'HowToStep',
      name: 'Register Vehicle',
      text: 'Register your vehicle with NaTIS',
      url: 'https://www.impota.com/na/guide#step4',
      image: 'https://www.impota.com/step4-namibia.jpg'
    }
  ]
}
// FAQ Schema
export const namibiaFAQJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does it cost to import a car from Japan to Namibia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Import costs vary based on multiple factors including vehicle type, shipping method, and current regulations. Our comprehensive guide provides exact cost breakdowns and reveals hidden fees that help you with comprehensive guidance for your import.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is importing from Japan really cheaper than buying locally in Namibia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most importers save 30-50% compared to local dealership prices. Our Import Mastery package includes exclusive tools and calculators to show your exact savings before making any commitment.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need experience or connections to import cars to Namibia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No prior experience needed. Our step-by-step guides provide everything you need including verified contacts, exact procedures, and proven strategies from real import experience.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are the biggest mistakes when importing cars to Namibia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common mistakes cost first-time importers an average of N$45,000 extra. Our Mistake Guide specifically addresses each pitfall with proven solutions to ensure your import goes smoothly and affordably.'
      }
    }
  ]
}
// Breadcrumb Schema
export const namibiaBreadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.impota.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Namibia',
      item: 'https://www.impota.com/na'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Import Guide',
      item: 'https://www.impota.com/na/guide'
    }
  ]
}
// Product Schema for the guides
export const namibiaProductJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Namibia Car Import Complete Guide Package',
  description: 'Comprehensive guides for importing cars from Japan to Namibia. Choose between Mistake Guide or Import Mastery packages.',
  brand: {
    '@type': 'Brand',
    name: 'IMPOTA'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Mistake Guide',
      price: '499',
      priceCurrency: 'NAD',
      availability: 'https://schema.org/InStock',
      url: 'https://www.impota.com/na/guide',
      priceValidUntil: '2024-12-31'
    },
    {
      '@type': 'Offer',
      name: 'Import Mastery',
      price: '1999',
      priceCurrency: 'NAD',
      availability: 'https://schema.org/InStock',
      url: 'https://www.impota.com/na/guide',
      priceValidUntil: '2024-12-31',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '8'
      }
    }
  ]
}