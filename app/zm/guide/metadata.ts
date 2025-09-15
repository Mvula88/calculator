import { Metadata } from 'next'

export const zambiaGuideMetadata: Metadata = {
  title: 'Import Cars to Zambia from Japan 2024 | Lusaka Guide | Complete Import Guide',
  description: 'Complete guide to importing cars from Japan to Zambia. Expert guidance with our proven system. Includes ZRA duty calculator, customs clearance, RTSA registration, and Nakonde/Chirundu border posts. Based on real import experience.',
  keywords: 'import cars Zambia, Japan car import Zambia, Lusaka customs clearance, ZRA duty calculator, RTSA vehicle registration, import duty Zambia 2024, Japanese used cars Zambia, car import costs Zambia, Zambia clearing agents, import permit Zambia, vehicle import process Zambia, Nakonde border post, Chirundu border crossing, Zambia car import guide, Japanese auction cars Zambia, import taxes Zambia vehicles',
  
  openGraph: {
    title: 'Complete Import Guide for Cars to Zambia | Complete 2024 Guide',
    description: 'The ultimate guide to import cars from Japan to Zambia. ZRA customs navigation, duty calculations, and border post procedures. Join our growing community of successful importers.',
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
    title: 'Import Cars to Zambia from Japan | Complete Import Guide',
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
      name: 'How much can I save importing a car to Zambia from Japan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zambian importers typically reduce import costs compared to local prices. Our comprehensive guides show you exactly how to import successfully while avoiding expensive mistakes.'
      }
    },
    {
      '@type': 'Question',
      name: 'Which border post is best - Nakonde or Chirundu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each border post has advantages and challenges. Our guide provides detailed comparisons and insider tips for both routes, helping you choose the most cost-effective option for your situation.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are Zambia\'s vehicle age restrictions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zambia has strict age limits that can catch importers off guard. Our guide explains exactly which vehicles qualify and how to ensure your import meets all ZRA and RTSA requirements.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I navigate ZRA customs clearance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ZRA clearance involves multiple steps and documents. Our proven system has helped our clients import successfully, with step-by-step instructions for smooth border crossing.'
      }
    },
    {
      '@type': 'Question',
      name: 'What mistakes do Zambian importers commonly make?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common mistakes can add significantly to your import costs. Our Mistake Guide identifies each pitfall and provides specific solutions that have helped our clients import successfully.'
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