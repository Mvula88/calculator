'use client'

import { useCountry } from '@/lib/country-context'
import { getLocalPrice } from '@/lib/stripe/pricing'

interface PriceProps {
  productType?: 'calculator_pro' | 'avoid_mistake' | 'translation' | 'hidden_platforms'
  nadAmount?: number
  className?: string
  showCurrencyCode?: boolean
}

export function Price({ 
  productType = 'calculator_pro',
  nadAmount,
  className = '',
  showCurrencyCode = false 
}: PriceProps) {
  const { country } = useCountry()
  
  // Fallback to Namibia if country is not properly loaded
  const safeCountry = country || {
    code: 'namibia',
    name: 'Namibia',
    currency: 'NAD',
    symbol: 'N$',
    exchangeRate: 1
  }
  
  // If specific NAD amount provided, convert it
  if (nadAmount !== undefined) {
    const exchangeRate = safeCountry.exchangeRate || 1
    const localPrice = Math.round(nadAmount * exchangeRate)
    return (
      <span className={className}>
        {safeCountry.symbol}{localPrice.toLocaleString()}
        {showCurrencyCode && <span className="text-sm ml-1">{safeCountry.currency}</span>}
      </span>
    )
  }
  
  // Otherwise use product pricing
  const price = getLocalPrice(productType, safeCountry.code)
  
  return (
    <span className={className}>
      {price.display}
      {showCurrencyCode && <span className="text-sm ml-1">{safeCountry.currency}</span>}
    </span>
  )
}