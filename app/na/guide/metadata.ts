import { Metadata } from 'next'

export const namibiaGuideMetadata: Metadata = {
  title: 'Import Cars to Namibia from Japan 2024 | Complete Walvis Bay Guide | Save N$65,000+',
  description: 'Step-by-step guide to importing cars from Japan to Namibia through Walvis Bay port. Save up to N$65,000 with our proven system. Includes duty calculator, customs clearance, NaTIS registration, and scam prevention. Trusted by 12,847+ Namibian importers.',
  keywords: 'import cars Namibia, Japan car import Namibia, Walvis Bay port clearance, Namibia customs duty calculator, NaTIS vehicle registration, import duty Namibia 2024, Japanese used cars Namibia, car import costs Namibia, Namibia clearing agents, import permit Namibia, vehicle import process Namibia, Walvis Bay port fees, Namibia car import guide, Japanese auction cars Namibia, import taxes Namibia vehicles',
  
  openGraph: {
    title: 'Save N$65,000+ Importing Cars to Namibia | Complete 2024 Guide',
    description: 'The only guide you need to import cars from Japan to Namibia. Walvis Bay port navigation, duty calculations, and step-by-step process. Join 12,847+ successful importers.',
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
    description: 'Complete guide to importing vehicles through Walvis Bay. Duty calculator, customs clearance, and proven strategies.',
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
        text: 'The total cost ranges from N$55,000 to N$120,000 depending on the vehicle value. This includes the car price, shipping (N$15,000-25,000), customs duty (varies by engine size), VAT (15%), and clearing fees. Our calculator helps you get exact costs before purchasing.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does it take to import a car from Japan to Walvis Bay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The entire process takes 25-35 days: 3-5 days for auction and payment, 7-10 days for export processing in Japan, 14-18 days shipping to Walvis Bay, and 3-5 days for customs clearance and registration in Namibia.'
      }
    },
    {
      '@type': 'Question',
      name: 'What documents do I need to import a car to Namibia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Required documents include: Export Certificate from Japan, Bill of Lading, Commercial Invoice, Import Permit from Ministry of Trade, Insurance Certificate, Roadworthiness Certificate, and Police Clearance Certificate. Our guide includes all forms and samples.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I import cars older than 5 years to Namibia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Namibia allows importation of used vehicles regardless of age, but vehicles older than 5 years require additional inspections. Import duties may be higher for older vehicles. We recommend cars between 3-5 years old for best value.'
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
        reviewCount: '847'
      }
    }
  ]
}