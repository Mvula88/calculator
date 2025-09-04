// Dynamic pricing based on country
import { COUNTRIES } from '@/lib/country-context'

// Base prices in NAD
export const BASE_PRICES = {
  calculator_pro: 1499,
  avoid_mistake: 499,
  translation: 150,
  hidden_platforms: 14999,
}

// Get price in local currency
export function getLocalPrice(productType: keyof typeof BASE_PRICES, countryCode: string) {
  const basePrice = BASE_PRICES[productType]
  const country = COUNTRIES[countryCode] || COUNTRIES['namibia']
  
  // Convert from NAD to local currency
  const localPrice = Math.round(basePrice * country.exchangeRate)
  
  return {
    amount: localPrice,
    currency: country.currency,
    symbol: country.symbol,
    display: `${country.symbol}${localPrice.toLocaleString()}`
  }
}

// Format price for Stripe (converts to smallest unit - cents)
export function getStripeAmount(amount: number, currency: string) {
  // Most currencies use cents (multiply by 100)
  // Some currencies like JPY don't have decimal places
  const zeroDecimalCurrencies = ['JPY', 'KRW', 'VND', 'IDR']
  
  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return amount
  }
  
  return amount * 100
}

// Get Stripe-formatted price
export function getStripePrice(productType: keyof typeof BASE_PRICES, countryCode: string) {
  const localPrice = getLocalPrice(productType, countryCode)
  
  return {
    amount: getStripeAmount(localPrice.amount, localPrice.currency),
    currency: localPrice.currency.toLowerCase(),
    display: localPrice.display
  }
}