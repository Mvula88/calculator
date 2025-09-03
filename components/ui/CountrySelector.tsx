'use client'

import { useCountry, COUNTRIES } from '@/lib/country-context'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function CountrySelector() {
  const { country, setCountry } = useCountry()
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Select country"
      >
        <span className="text-xl">{country.flag}</span>
        <span className="font-medium">{country.name}</span>
        <span className="text-sm text-gray-500">({country.symbol})</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-[200px]">
            {Object.entries(COUNTRIES).map(([key, c]) => (
              <button
                key={key}
                onClick={() => {
                  setCountry(key)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 ${
                  country.code === c.code ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-xl">{c.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.currency} ({c.symbol})</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}