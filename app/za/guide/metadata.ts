import { Metadata } from 'next'

export const southAfricaGuideMetadata: Metadata = {
  title: 'Import Cars to South Africa from Japan 2024 | Durban Port Guide | Save R75,000+',
  description: 'Complete guide to importing cars from Japan to South Africa through Durban port. Save up to R75,000 with our proven system. Includes SARS duty calculator, customs clearance, eNaTIS registration, and verified clearing agents. Trusted by 8,500+ SA importers.',
  keywords: 'import cars South Africa, Japan car import SA, Durban port clearance, SARS duty calculator, eNaTIS vehicle registration, import duty South Africa 2024, Japanese used cars SA, car import costs South Africa, SA clearing agents, import permit South Africa, vehicle import process SA, Durban port fees, South Africa car import guide, Japanese auction cars SA, import taxes South Africa vehicles, ITAC import permit, roadworthy certificate SA',
  
  openGraph: {
    title: 'Save R75,000+ Importing Cars to South Africa | Complete 2024 Guide',
    description: 'The definitive guide to import cars from Japan to South Africa. Durban port navigation, SARS duty calculations, and step-by-step process. Join 8,500+ successful SA importers.',
    url: 'https://www.impota.com/za/guide',
    siteName: 'IMPOTA - South Africa Car Import Guide',
    images: [
      {
        url: 'https://www.impota.com/og-south-africa-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Import Cars to South Africa - Complete Guide'
      }
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Import Cars to South Africa from Japan | Save R75,000+',
    description: 'Complete guide to importing vehicles through Durban port. SARS duty calculator, customs clearance, and proven strategies.',
    images: ['https://www.impota.com/twitter-sa-guide.jpg'],
  },
  
  alternates: {
    canonical: 'https://www.impota.com/za/guide',
    languages: {
      'en-ZA': 'https://www.impota.com/za/guide',
      'en-NA': 'https://www.impota.com/na/guide',
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
}

// JSON-LD Structured Data
export const southAfricaGuideJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Import Cars from Japan to South Africa',
  description: 'Complete guide to importing vehicles from Japan to South Africa through Durban port, including SARS customs clearance and eNaTIS registration.',
  image: 'https://www.impota.com/guide-hero-sa.jpg',
  totalTime: 'P35D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'ZAR',
    minValue: '45000',
    maxValue: '120000'
  },
  supply: [
    {
      '@type': 'HowToSupply',
      name: 'ITAC Import Permit'
    },
    {
      '@type': 'HowToSupply',
      name: 'Bill of Lading from shipping line'
    },
    {
      '@type': 'HowToSupply',
      name: 'Export Certificate from Japan'
    },
    {
      '@type': 'HowToSupply',
      name: 'Letter of Authority for clearing agent'
    }
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Apply for ITAC Permit',
      text: 'Apply for import permit from ITAC (International Trade Administration Commission)',
      url: 'https://www.impota.com/za/guide#step1'
    },
    {
      '@type': 'HowToStep',
      name: 'Purchase Vehicle from Japan',
      text: 'Find and buy your vehicle from Japanese auctions',
      url: 'https://www.impota.com/za/guide#step2'
    },
    {
      '@type': 'HowToStep',
      name: 'Ship to Durban Port',
      text: 'Arrange shipping from Japan to Durban port',
      url: 'https://www.impota.com/za/guide#step3'
    },
    {
      '@type': 'HowToStep',
      name: 'Clear SARS Customs',
      text: 'Complete customs clearance with SARS at Durban',
      url: 'https://www.impota.com/za/guide#step4'
    },
    {
      '@type': 'HowToStep',
      name: 'Register with eNaTIS',
      text: 'Register your imported vehicle with eNaTIS system',
      url: 'https://www.impota.com/za/guide#step5'
    }
  ]
}

// FAQ Schema
export const southAfricaFAQJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much can I save importing a car from Japan to South Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most South African importers save R45,000 to R75,000 compared to local prices. Our comprehensive guides reveal the exact strategies and calculations to maximize your savings on every import.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is the ITAC permit process complicated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ITAC permit process can be challenging without proper guidance. Our guide provides the exact steps, forms, and insider tips that have helped 8,500+ South Africans get approved quickly.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are SARS import duties and how can I minimize them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Import duties vary significantly based on multiple factors. Our Import Mastery package includes an exclusive SARS duty calculator and legal strategies to minimize your total import costs.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need a clearing agent or can I clear customs myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While clearing agents are common, you can save thousands by doing it yourself. Our guide shows you exactly how, plus provides verified agent contacts if you prefer professional help.'
      }
    },
    {
      '@type': 'Question',
      name: 'What mistakes cost SA importers the most money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The top 5 mistakes cost importers an average of R45,000 extra. Our Mistake Guide reveals each one with specific solutions that have saved thousands for our 8,500+ successful members.'
      }
    }
  ]
}

// Breadcrumb Schema
export const southAfricaBreadcrumbJsonLd = {
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
      name: 'South Africa',
      item: 'https://www.impota.com/za'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Import Guide',
      item: 'https://www.impota.com/za/guide'
    }
  ]
}

// Product Schema
export const southAfricaProductJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'South Africa Car Import Complete Guide Package',
  description: 'Comprehensive guides for importing cars from Japan to South Africa through Durban port. Choose between Mistake Guide or Import Mastery packages.',
  brand: {
    '@type': 'Brand',
    name: 'IMPOTA'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Mistake Guide',
      price: '499',
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      url: 'https://www.impota.com/za/guide'
    },
    {
      '@type': 'Offer',
      name: 'Import Mastery',
      price: '1999',
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      url: 'https://www.impota.com/za/guide',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '523'
      }
    }
  ]
}