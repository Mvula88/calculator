import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export const PRODUCTS = {
  calculatorPro: {
    id: 'calculator_pro',
    name: 'Calculator Pro + Import Guide',
    price: 49900, // Price in cents (N$499)
    currency: 'nad',
    description: 'Complete import calculator with all 27 hidden costs + import mastery guide'
  },
  avoidMistake: {
    id: 'avoid_mistake',
    name: 'Avoid My Mistake Guide',
    price: 49900,
    currency: 'nad',
    description: 'Complete consignee disaster story + verification guide'
  },
  translationProvider: {
    id: 'translation_provider',
    name: 'Translation Provider Access',
    price: 15000,
    currency: 'nad',
    description: 'Professional auction sheet translators + grade verification experts'
  },
  hiddenPlatforms: {
    id: 'hidden_platforms',
    name: 'Hidden Platform Access',
    price: 1499900,
    currency: 'nad',
    description: 'Secret platforms with 40% cheaper cars (application required)',
    requiresApproval: true
  }
}