import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

// Stripe Product and Price IDs
// You'll need to create these products in your Stripe Dashboard
// and replace these with your actual price IDs
export const STRIPE_PRICE_IDS = {
  calculatorPro: process.env.STRIPE_PRICE_CALCULATOR_PRO || 'price_calculator_pro', // N$1,499
  avoidMistake: process.env.STRIPE_PRICE_AVOID_MISTAKE || 'price_avoid_mistake', // N$499
  translationProvider: process.env.STRIPE_PRICE_TRANSLATION || 'price_translation', // N$150
  hiddenPlatforms: process.env.STRIPE_PRICE_HIDDEN_PLATFORMS || 'price_hidden_platforms', // N$14,999
}

export const PRODUCTS = {
  calculatorPro: {
    id: 'calculator_pro',
    priceId: STRIPE_PRICE_IDS.calculatorPro,
    name: 'Calculator Pro + Import Guide',
    price: 149900, // Price in cents (N$1,499)
    currency: 'nad',
    description: 'Complete import calculator with all 27 hidden costs + import mastery guide',
    features: [
      'All 27 hidden costs revealed',
      'Import process master guide',
      'Document templates',
      'Verified agent list',
      'Exchange rate alerts',
      'WhatsApp community',
      'Lifetime updates'
    ]
  },
  avoidMistake: {
    id: 'avoid_mistake',
    priceId: STRIPE_PRICE_IDS.avoidMistake,
    name: 'Avoid My Mistake Guide',
    price: 49900,
    currency: 'nad',
    description: 'Complete consignee disaster story + verification guide',
    features: [
      'My complete N$45,000 mistake story',
      'How to verify agents before paying',
      'Red flags checklist',
      'Emergency contact list'
    ]
  },
  translationProvider: {
    id: 'translation_provider',
    priceId: STRIPE_PRICE_IDS.translationProvider,
    name: 'Translation Provider Access',
    price: 15000,
    currency: 'nad',
    description: 'Professional auction sheet translators + grade verification experts',
    features: [
      'Professional auction sheet translators',
      'Grade verification experts',
      'Direct contacts (not agencies)',
      'Verified translators only'
    ]
  },
  hiddenPlatforms: {
    id: 'hidden_platforms',
    priceId: STRIPE_PRICE_IDS.hiddenPlatforms,
    name: 'Hidden Platform Access',
    price: 1499900,
    currency: 'nad',
    description: 'Secret platforms with 40% cheaper cars (application required)',
    features: [
      'Access to secret platforms',
      'Where I found cars under N$30,000',
      'Personal guidance included',
      'Limited to 20 members only'
    ],
    requiresApproval: true
  }
}