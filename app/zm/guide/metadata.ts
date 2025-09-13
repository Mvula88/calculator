import { Metadata } from 'next'

export const zambiaGuideMetadata: Metadata = {
  title: 'Import Cars to Zambia from Japan 2024 | Lusaka Guide | Save K40,000+',
  description: 'Complete guide to importing cars from Japan to Zambia. Save up to K40,000 with our proven system. Includes ZRA duty calculator, customs clearance, RTSA registration, and Nakonde/Chirundu border posts. Trusted by 5,000+ Zambian importers.',
  keywords: 'import cars Zambia, Japan car import Zambia, Lusaka customs clearance, ZRA duty calculator, RTSA vehicle registration, import duty Zambia 2024, Japanese used cars Zambia, car import costs Zambia, Zambia clearing agents, import permit Zambia, vehicle import process Zambia, Nakonde border post, Chirundu border crossing, Zambia car import guide, Japanese auction cars Zambia, import taxes Zambia vehicles',
  
  openGraph: {
    title: 'Save K40,000+ Importing Cars to Zambia | Complete 2024 Guide',
    description: 'The ultimate guide to import cars from Japan to Zambia. ZRA customs navigation, duty calculations, and border post procedures. Join 5,000+ successful Zambian importers.',
    url: 'https://www.impota.com/zm/guide',
    siteName: 'IMPOTA - Zambia Car Import Guide',
    images: [
      {
        url: 'https://www.impota.com/og-zambia-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Import Cars to Zambia - Complete Guide'
      }
    ],
    locale: 'en_ZM',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Import Cars to Zambia from Japan | Save K40,000+',
    description: 'Complete guide to importing vehicles to Zambia. ZRA duty calculator, customs clearance, and proven strategies.',
    images: ['https://www.impota.com/twitter-zambia-guide.jpg'],
  },
  
  alternates: {
    canonical: 'https://www.impota.com/zm/guide',
    languages: {
      'en-ZM': 'https://www.impota.com/zm/guide',
      'en-NA': 'https://www.impota.com/na/guide',
      'en-ZA': 'https://www.impota.com/za/guide',
      'en-BW': 'https://www.impota.com/bw/guide',
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
}

// JSON-LD Structured Data
export const zambiaGuideJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Import Cars from Japan to Zambia',
  description: 'Complete guide to importing vehicles from Japan to Zambia through Dar es Salaam or Durban ports, including ZRA customs clearance and RTSA registration.',
  image: 'https://www.impota.com/guide-hero-zambia.jpg',
  totalTime: 'P45D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'ZMW',
    minValue: '30000',
    maxValue: '100000'
  },
  supply: [
    {
      '@type': 'HowToSupply',
      name: 'Import Declaration Form (IDF)'
    },
    {
      '@type': 'HowToSupply',
      name: 'Bill of Lading'
    },
    {
      '@type': 'HowToSupply',
      name: 'Export Certificate from Japan'
    },
    {
      '@type': 'HowToSupply',
      name: 'ZRA customs clearance forms'
    },
    {
      '@type': 'HowToSupply',
      name: 'COMESA Certificate of Origin (if applicable)'
    }
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Apply for Import Declaration',
      text: 'Get Import Declaration Form (IDF) from Ministry of Commerce',
      url: 'https://www.impota.com/zm/guide#step1'
    },
    {
      '@type': 'HowToStep',
      name: 'Purchase Vehicle from Japan',
      text: 'Find and buy your vehicle from Japanese auctions',
      url: 'https://www.impota.com/zm/guide#step2'
    },
    {
      '@type': 'HowToStep',
      name: 'Ship to Port',
      text: 'Ship via Dar es Salaam (Tanzania) or Durban (South Africa)',
      url: 'https://www.impota.com/zm/guide#step3'
    },
    {
      '@type': 'HowToStep',
      name: 'Transport to Border',
      text: 'Transport from port to Nakonde or Chirundu border post',
      url: 'https://www.impota.com/zm/guide#step4'
    },
    {
      '@type': 'HowToStep',
      name: 'Clear ZRA Customs',
      text: 'Complete customs clearance with Zambia Revenue Authority',
      url: 'https://www.impota.com/zm/guide#step5'
    },
    {
      '@type': 'HowToStep',
      name: 'Register with RTSA',
      text: 'Register vehicle with Road Transport and Safety Agency',
      url: 'https://www.impota.com/zm/guide#step6'
    }
  ]
}

// FAQ Schema
export const zambiaFAQJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does it cost to import a car from Japan to Zambia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Total costs range from K30,000 to K100,000 including vehicle price, shipping to Dar es Salaam or Durban (K15,000-25,000), road transport to Zambia, customs duty (5-30% based on engine size), 16% VAT, and clearing fees. Our ZRA calculator provides exact costs.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the best route to import cars to Zambia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Two main routes: 1) Via Dar es Salaam port (Tanzania) through Nakonde border - takes 40-45 days, often cheaper. 2) Via Durban port (South Africa) through Chirundu border - takes 35-40 days, more reliable. Choice depends on final destination in Zambia.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the age limit for importing cars to Zambia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zambia restricts importation of vehicles older than 5 years from date of manufacture. This applies to all personal and commercial vehicle imports. Vehicles must also meet emission standards and pass RTSA roadworthiness tests.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need an import permit for cars in Zambia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you need an Import Declaration Form (IDF) from the Ministry of Commerce before importing. The IDF is valid for 3 months and costs around K500. Our guide includes the complete IDF application process and requirements.'
      }
    },
    {
      '@type': 'Question',
      name: 'What documents are needed at Nakonde or Chirundu border?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Required at border: Import Declaration Form, Bill of Lading, Export Certificate, Commercial Invoice, Insurance Certificate, Pre-shipment Inspection Certificate, and ZRA customs declaration. Having complete documentation speeds up clearance significantly.'
      }
    }
  ]
}

// Breadcrumb Schema
export const zambiaBreadcrumbJsonLd = {
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
      name: 'Zambia',
      item: 'https://www.impota.com/zm'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Import Guide',
      item: 'https://www.impota.com/zm/guide'
    }
  ]
}

// Product Schema
export const zambiaProductJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Zambia Car Import Complete Guide Package',
  description: 'Comprehensive guides for importing cars from Japan to Zambia via Tanzania or South Africa. Choose between Mistake Guide or Import Mastery packages.',
  brand: {
    '@type': 'Brand',
    name: 'IMPOTA'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Mistake Guide',
      price: '500',
      priceCurrency: 'ZMW',
      availability: 'https://schema.org/InStock',
      url: 'https://www.impota.com/zm/guide'
    },
    {
      '@type': 'Offer',
      name: 'Import Mastery',
      price: '2000',
      priceCurrency: 'ZMW',
      availability: 'https://schema.org/InStock',
      url: 'https://www.impota.com/zm/guide',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '489'
      }
    }
  ]
}