'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Flag, ChevronDown } from 'lucide-react'

export type Country = 'namibia' | 'south-africa' | 'botswana' | 'zambia'

interface CountrySelectorProps {
  selectedCountry: Country
  onCountryChange: (country: Country) => void
}

const countries = [
  {
    id: 'namibia' as Country,
    name: 'Namibia',
    port: 'Walvis Bay',
    flag: '🇳🇦'
  },
  {
    id: 'south-africa' as Country,
    name: 'South Africa',
    port: 'Walvis Bay or Durban',
    flag: '🇿🇦'
  },
  {
    id: 'botswana' as Country,
    name: 'Botswana',
    port: 'Walvis Bay',
    flag: '🇧🇼'
  },
  {
    id: 'zambia' as Country,
    name: 'Zambia',
    port: 'Walvis Bay',
    flag: '🇿🇲'
  }
]

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = countries.find(c => c.id === selectedCountry) || countries[0]

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 relative z-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Select Your Country</h3>
        </div>
      </div>

      <div className="relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selected.flag}</span>
            <div className="text-left">
              <div className="font-semibold text-gray-900">{selected.name}</div>
              <div className="text-xs text-gray-600">Via {selected.port} port</div>
            </div>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-[9999]">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => {
                  onCountryChange(country.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  country.id === selectedCountry ? 'bg-blue-100' : ''
                }`}
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{country.name}</div>
                  <div className="text-xs text-gray-600">Via {country.port} port</div>
                </div>
                {country.id === selectedCountry && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-3">
        Select your destination country to see specific import requirements, timelines, and procedures.
      </p>
    </Card>
  )
}
