'use client'

import { useCountry, formatLocalPrice } from '@/lib/country-context'

interface PriceProps {
  nadAmount?: number
  className?: string
  showCurrencyCode?: boolean
}

export function Price({ 
  nadAmount = 1499, 
  className = '',
  showCurrencyCode = false 
}: PriceProps) {
  const { country } = useCountry()
  
  // For the main price of 1499, keep consistent across countries
  if (nadAmount === 1499) {
    return (
      <span className={className}>
        {country.symbol}1,499
        {showCurrencyCode && <span className="text-sm ml-1">{country.currency}</span>}
      </span>
    )
  }
  
  // For other amounts, show converted price
  const formattedPrice = formatLocalPrice(nadAmount, country)
  
  return (
    <span className={className}>
      {formattedPrice}
      {showCurrencyCode && <span className="text-sm ml-1">{country.currency}</span>}
    </span>
  )
}