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
  
  // If specific NAD amount provided, convert it
  if (nadAmount !== undefined) {
    const localPrice = Math.round(nadAmount * country.exchangeRate)
    return (
      <span className={className}>
        {country.symbol}{localPrice.toLocaleString()}
        {showCurrencyCode && <span className="text-sm ml-1">{country.currency}</span>}
      </span>
    )
  }
  
  // Otherwise use product pricing
  const price = getLocalPrice(productType, country.code)
  
  return (
    <span className={className}>
      {price.display}
      {showCurrencyCode && <span className="text-sm ml-1">{country.currency}</span>}
    </span>
  )
}