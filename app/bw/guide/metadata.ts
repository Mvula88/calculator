import { Metadata } from 'next'

export const botswanaGuideMetadata: Metadata = {
  title: 'Import Cars to Botswana from Japan 2024 | Complete Guide | Complete Import Guide',
  description: 'Step-by-step guide to importing cars from Japan to Botswana. Professional import guidance system. Includes BURS duty calculator, customs clearance at Gaborone, vehicle registration, and container sharing. Based on 8 successful imports and counting.',
  keywords: 'import cars Botswana, Japan car import Botswana, Gaborone customs clearance, BURS duty calculator, Botswana vehicle registration, import duty Botswana 2024, Japanese used cars Botswana, car import costs Botswana, Botswana clearing agents, import permit Botswana, vehicle import process Botswana, Botswana car import guide, Japanese auction cars Botswana, import taxes Botswana vehicles, Trans Kalahari Corridor, Kazungula border post',
  
  openGraph: {
    title: 'Complete Import Guide for Cars to Botswana | Complete 2024 Guide',
    description: 'The complete guide to import cars from Japan to Botswana. BURS customs navigation, duty calculations, and proven import strategies. Expert import guidance system.',
    url: 'https://www.impota.com/bw/guide',
    siteName: 'IMPOTA - Botswana Car Import Guide',
    images: [
      {
        url: 'https://www.impota.com/og-botswana-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Import Cars to Botswana - Complete Guide'
      }
    ],
    locale: 'en_BW',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Import Cars to Botswana from Japan | Complete Import Guide',
    description: 'Complete guide to importing vehicles to Botswana. BURS duty calculator, customs clearance, and proven strategies.',
    images: ['https://www.impota.com/twitter-botswana-guide.jpg'],
  },
  
  alternates: {
    canonical: 'https://www.impota.com/bw/guide',
    languages: {
      'en-BW': 'https://www.impota.com/bw/guide',
      'en-NA': 'https://www.impota.com/na/guide',
      'en-ZA': 'https://www.impota.com/za/guide',
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
export const botswanaGuideJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Import Cars from Japan to Botswana',
  description: 'Complete guide to importing vehicles from Japan to Botswana, including BURS customs clearance and vehicle registration.',
  image: 'https://www.impota.com/guide-hero-botswana.jpg',
  totalTime: 'P40D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'BWP',
    minValue: '35000',
    maxValue: '100000'
  },
  supply: [
    {
      '@type': 'HowToSupply',
      name: 'Import Permit from Ministry of Trade'
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
      name: 'BURS customs forms'
    }
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Get Import Permit',
      text: 'Apply for import permit from Ministry of Trade and Industry',
      url: 'https://www.impota.com/bw/guide#step1'
    },
    {
      '@type': 'HowToStep',
      name: 'Purchase Vehicle',
      text: 'Buy your vehicle from Japanese auctions',
      url: 'https://www.impota.com/bw/guide#step2'
    },
    {
      '@type': 'HowToStep',
      name: 'Arrange Shipping',
      text: 'Ship via Durban or Walvis Bay to Botswana',
      url: 'https://www.impota.com/bw/guide#step3'
    },
    {
      '@type': 'HowToStep',
      name: 'Clear BURS Customs',
      text: 'Complete customs clearance with BURS',
      url: 'https://www.impota.com/bw/guide#step4'
    },
    {
      '@type': 'HowToStep',
      name: 'Register Vehicle',
      text: 'Register your vehicle with Transport Department',
      url: 'https://www.impota.com/bw/guide#step5'
    }
  ]
}

// FAQ Schema
export const botswanaFAQJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much can I save importing a car to Botswana from Japan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Botswana importers typically reduce import costs compared to local dealership prices. Our guides reveal the exact strategies to optimize costs and avoid costly mistakes.'
      }
    },
    {
      '@type': 'Question',
      name: 'Which route is best for importing to Botswana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There are multiple routes with different costs and timeframes. Our comprehensive guide compares all options and reveals the most cost-effective route based on your specific situation.'
      }
    },
    {
      '@type': 'Question',
      name: 'How complex is BURS customs clearance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BURS clearance can be overwhelming without proper guidance. Our step-by-step system provides expert guidance to navigate customs smoothly, saving time and avoiding penalties.'
      }
    },
    {
      '@type': 'Question',
      name: 'What age restrictions apply to vehicle imports in Botswana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Botswana has specific age restrictions that vary by vehicle type and use. Our guide explains exactly which vehicles qualify and how to ensure your import meets all requirements.'
      }
    }
  ]
}

// Breadcrumb Schema
export const botswanaBreadcrumbJsonLd = {
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
      name: 'Botswana',
      item: 'https://www.impota.com/bw'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Import Guide',
      item: 'https://www.impota.com/bw/guide'
    }
  ]
}

// Product Schema
export const botswanaProductJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Botswana Car Import Complete Guide Package',
  description: 'Comprehensive guides for importing cars from Japan to Botswana. Choose between Mistake Guide or Import Mastery packages.',
  brand: {
    '@type': 'Brand',
    name: 'IMPOTA'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Mistake Guide',
      price: '404',
      priceCurrency: 'BWP',
      availability: 'https://schema.org/InStock',
      url: 'https://www.impota.com/bw/guide'
    },
    {
      '@type': 'Offer',
      name: 'Import Mastery',
      price: '1618',
      priceCurrency: 'BWP',
      availability: 'https://schema.org/InStock',
      url: 'https://www.impota.com/bw/guide',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '8'
      }
    }
  ]
}