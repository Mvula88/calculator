'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Country = {
  code: string
  name: string
  currency: string
  symbol: string
  phone: string
  flag: string
  port: string
  exchangeRate: number // to NAD for calculation purposes
}

export const COUNTRIES: { [key: string]: Country } = {
  'namibia': {
    code: 'NA',
    name: 'Namibia',
    currency: 'NAD',
    symbol: 'N$',
    phone: '+264',
    flag: '🇳🇦',
    port: 'Walvis Bay',
    exchangeRate: 1
  },
  'south-africa': {
    code: 'ZA',
    name: 'South Africa',
    currency: 'ZAR',
    symbol: 'R',
    phone: '+27',
    flag: '🇿🇦',
    port: 'Durban',
    exchangeRate: 1 // ZAR = NAD (pegged)
  },
  'botswana': {
    code: 'BW',
    name: 'Botswana',
    currency: 'BWP',
    symbol: 'P',
    phone: '+267',
    flag: '🇧🇼',
    port: 'Walvis Bay',
    exchangeRate: 1.37 // 1 NAD = 1.37 BWP approximately (1 BWP = 0.73 NAD)
  },
  'zambia': {
    code: 'ZM',
    name: 'Zambia',
    currency: 'ZMW',
    symbol: 'K',
    phone: '+260',
    flag: '🇿🇲',
    port: 'Multiple',
    exchangeRate: 1.06 // 1 NAD = 1.06 ZMW approximately
  }
}

const CountryContext = createContext<{
  country: Country
  setCountry: (countryKey: string) => void
}>({
  country: COUNTRIES.namibia,
  setCountry: () => {}
})

export function CountryProvider({ 
  children, 
  initialCountry = 'namibia' 
}: { 
  children: ReactNode
  initialCountry?: string 
}) {
  const [countryKey, setCountryKey] = useState(initialCountry)
  const country = COUNTRIES[countryKey] || COUNTRIES.namibia
  
  const setCountry = (newCountryKey: string) => {
    setCountryKey(newCountryKey)
    // Save to cookie for persistence
    document.cookie = `user-country=${newCountryKey}; max-age=${60 * 60 * 24 * 30}; path=/; samesite=lax`
    
    // Optionally reload the page to apply new country settings
    // window.location.reload()
  }
  
  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  )
}

export const useCountry = () => {
  const context = useContext(CountryContext)
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider')
  }
  return context
}

// Utility function to format price in local currency
export function formatLocalPrice(nadAmount: number, country: Country): string {
  // For psychological pricing, keep the same number across countries
  // This makes pricing feel consistent even though actual value differs
  if (nadAmount === 1499) {
    return `${country.symbol}1,499`
  }
  
  // For other amounts, convert properly
  const localAmount = nadAmount / country.exchangeRate
  
  return new Intl.NumberFormat(country.code, {
    style: 'currency',
    currency: country.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(localAmount)
}

// Get country-specific import costs
export function getCountryImportCosts(country: Country) {
  const costs = {
    'namibia': {
      shipping: 22000,
      portCharges: 6500,
      dutyRate: 0.20,
      vat: 0.15,
      clearingAgent: 4000,
      environmentalLevy: 1200
    },
    'south-africa': {
      shipping: 25000,
      portCharges: 10000,
      dutyRate: 0.25,
      vat: 0.15,
      clearingAgent: 8000,
      environmentalLevy: 0
    },
    'botswana': {
      shipping: 23000,
      portCharges: 8000,
      dutyRate: 0.25,
      vat: 0.14,
      clearingAgent: 5000,
      environmentalLevy: 0
    },
    'zambia': {
      shipping: 28000,
      portCharges: 9000,
      dutyRate: 0.25,
      vat: 0.16,
      clearingAgent: 6000,
      environmentalLevy: 0
    }
  }
  
  const countryKey = Object.keys(COUNTRIES).find(
    key => COUNTRIES[key].code === country.code
  )
  
  return costs[countryKey as keyof typeof costs] || costs.namibia
}