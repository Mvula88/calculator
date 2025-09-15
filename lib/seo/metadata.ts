import { Metadata } from 'next'

// SEO Keywords for each country
export const countryKeywords = {
  na: {
    primary: [
      'import cars to Namibia',
      'Japanese cars Namibia',
      'car import duty Namibia',
      'import vehicles from Japan to Namibia',
      'Namibia car import calculator',
      'how to import cars to Namibia',
      'Windhoek car imports',
      'Walvis Bay port clearance'
    ],
    secondary: [
      'NRCS certification Namibia',
      'Namibia customs duties',
      'second hand cars Namibia',
      'used cars from Japan',
      'vehicle clearance Namibia',
      'car shipping to Namibia',
      'import taxes Namibia'
    ],
    long_tail: [
      'cheapest way to import cars to Namibia from Japan',
      'step by step guide import car Namibia',
      'how much does it cost to import a car to Namibia',
      'Toyota import to Namibia from Japan auction',
      'avoid mistakes importing cars to Namibia'
    ]
  },
  za: {
    primary: [
      'import cars to South Africa',
      'Japanese cars South Africa',
      'car import duty South Africa',
      'import vehicles from Japan to South Africa',
      'South Africa car import calculator',
      'how to import cars to South Africa',
      'Durban port car clearance',
      'SARS import duties'
    ],
    secondary: [
      'homologation South Africa',
      'South Africa customs duties',
      'second hand cars South Africa',
      'used cars from Japan',
      'vehicle clearance South Africa',
      'car shipping to South Africa',
      'import taxes South Africa'
    ],
    long_tail: [
      'cheapest way to import cars to South Africa from Japan',
      'step by step guide import car South Africa',
      'how much to import a car to South Africa 2024',
      'Toyota Hilux import South Africa from Japan',
      'import car South Africa requirements documents'
    ]
  },
  bw: {
    primary: [
      'import cars to Botswana',
      'Japanese cars Botswana',
      'car import duty Botswana',
      'import vehicles from Japan to Botswana',
      'Botswana car import calculator',
      'how to import cars to Botswana',
      'Gaborone car imports',
      'BURS import duties'
    ],
    secondary: [
      'BOS certification Botswana',
      'Botswana customs duties',
      'second hand cars Botswana',
      'used cars from Japan',
      'vehicle clearance Botswana',
      'car shipping to Botswana',
      'import taxes Botswana'
    ],
    long_tail: [
      'import cars to Botswana from Japan guide',
      'Botswana vehicle import regulations 2024',
      'cost breakdown import car Botswana',
      'Japanese auction cars to Botswana',
      'Botswana car import duty calculator online'
    ]
  },
  zm: {
    primary: [
      'import cars to Zambia',
      'Japanese cars Zambia',
      'car import duty Zambia',
      'import vehicles from Japan to Zambia',
      'Zambia car import calculator',
      'how to import cars to Zambia',
      'Lusaka car imports',
      'ZRA import duties'
    ],
    secondary: [
      'ZABS certification Zambia',
      'Zambia customs duties',
      'second hand cars Zambia',
      'used cars from Japan',
      'vehicle clearance Zambia',
      'car shipping to Zambia',
      'import taxes Zambia'
    ],
    long_tail: [
      'import cars to Zambia from Japan 2024',
      'Zambia vehicle import process step by step',
      'how much to import Toyota to Zambia',
      'Nakonde border car clearance process',
      'Zambia car import mistakes to avoid'
    ]
  }
}

// Generate metadata for country pages
export function generateCountryMetadata(country: 'na' | 'za' | 'bw' | 'zm'): Metadata {
  const countryNames = {
    na: 'Namibia',
    za: 'South Africa',
    bw: 'Botswana',
    zm: 'Zambia'
  }
  
  const countryName = countryNames[country]
  const keywords = countryKeywords[country]
  
  return {
    title: `Import Cars to ${countryName} from Japan - Complete Guide | IMPOTA 2024`,
    description: `Complete guide to importing cars to ${countryName} from Japan. Our proven import guidance system with duty calculator, documentation templates, and step-by-step import process. Expert guidance based on 8 successful imports and counting.`,
    keywords: [...keywords.primary, ...keywords.secondary].join(', '),
    openGraph: {
      title: `Import Cars to ${countryName} - Japanese Vehicle Import Guide`,
      description: `Learn how to import cars directly from Japan to ${countryName}. Professional import guides, duty calculators, and expert support. Members typically report significant savings compared to local dealerships.`,
      type: 'website',
      locale: 'en_US',
      url: `https://impota.com/${country}`,
      siteName: 'IMPOTA - Africa\'s #1 Car Import Platform',
      images: [
        {
          url: '/og-image-car-import.jpg',
          width: 1200,
          height: 630,
          alt: `Import Cars to ${countryName} from Japan`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Import Cars to ${countryName} from Japan - Import Guide`,
      description: `Complete import guide with duty calculator. Members typically report savings of N$20,000-N$50,000 per vehicle.`,
      images: ['/twitter-card-import.jpg'],
      creator: '@impota_africa'
    },
    alternates: {
      canonical: `https://impota.com/${country}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}

// Homepage metadata
export const homepageMetadata: Metadata = {
  title: 'Import Cars from Japan to Africa - Complete Platform | IMPOTA',
  description: 'The complete platform for importing cars from Japan to Namibia, South Africa, Botswana & Zambia. Duty calculators, import guides, documentation templates. Members typically report savings of N$20,000-N$50,000 per vehicle.',
  keywords: 'import cars Africa, Japanese cars Africa, car import duty calculator, import vehicles Japan, Namibia car import, South Africa car import, Botswana car import, Zambia car import, Japan car auction, import guide Africa',
  metadataBase: new URL('https://impota.com'),
  openGraph: {
    title: 'IMPOTA - Africa\'s #1 Car Import Education Platform',
    description: 'Learn to import cars from Japan. Professional guides, calculators, and support for NA, ZA, BW, ZM. Members report significant savings compared to local dealerships.',
    type: 'website',
    locale: 'en_US',
    url: 'https://impota.com',
    siteName: 'IMPOTA',
    images: [
      {
        url: '/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Import Cars from Japan to Africa'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Import Cars from Japan - Import Platform | IMPOTA',
    description: 'Professional car import guides for Africa. Duty calculators, documentation, expert support.',
    images: ['/twitter-main.jpg'],
    site: '@impota_africa',
    creator: '@impota_africa'
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification'
  },
  alternates: {
    canonical: 'https://impota.com'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

// Calculator page metadata
export const calculatorMetadata: Metadata = {
  title: 'Car Import Duty Calculator 2024 - Namibia, South Africa, Botswana, Zambia',
  description: 'Free online car import duty calculator for African countries. Calculate customs duties, VAT, and total costs instantly. Accurate rates for NA, ZA, BW, ZM.',
  keywords: 'car import duty calculator, import tax calculator, customs duty calculator, vehicle import calculator, car import costs Africa'
}

// Guide page metadata
export function generateGuideMetadata(country: string, tier: 'mistake' | 'mastery'): Metadata {
  const title = tier === 'mistake' 
    ? `Common Car Import Mistakes - ${country.toUpperCase()} Guide`
    : `Complete Car Import Mastery Course - ${country.toUpperCase()}`
    
  return {
    title,
    description: tier === 'mistake'
      ? `Avoid costly mistakes when importing cars. Essential guide covering documentation, customs, and shipping.`
      : `Professional car import training. Advanced strategies, calculators, agent network, and lifetime support.`,
    keywords: tier === 'mistake'
      ? 'car import mistakes, import guide, customs documentation, shipping guide'
      : 'car import course, professional import training, import mastery, advanced import strategies'
  }
}