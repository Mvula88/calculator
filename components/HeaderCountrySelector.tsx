'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Globe } from 'lucide-react'

const countries = [
  { code: 'na', name: 'Namibia', flag: '🇳🇦', currency: 'N$499' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦', currency: 'R499' },
  { code: 'bw', name: 'Botswana', flag: '🇧🇼', currency: 'P499' },
  { code: 'zm', name: 'Zambia', flag: '🇿🇲', currency: 'K499' },
]

export default function HeaderCountrySelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCountry, setCurrentCountry] = useState<string>('na')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get current country from URL or cookie
    const pathSegments = window.location.pathname.split('/')
    const countryCode = pathSegments[1]
    if (['na', 'za', 'bw', 'zm'].includes(countryCode)) {
      setCurrentCountry(countryCode)
    } else {
      // Try to get from cookie
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('user-country='))
      if (cookie) {
        const country = cookie.split('=')[1]
        const validCountry = countries.find(c => 
          country.includes(c.name.toLowerCase()) || country.includes(c.code)
        )
        if (validCountry) {
          setCurrentCountry(validCountry.code)
        }
      }
    }
  }, [])

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCountryChange = (countryCode: string) => {
    // Set cookie for persistence
    document.cookie = `user-country=${countryCode}; max-age=${60 * 60 * 24 * 30}; path=/; SameSite=Lax`
    
    // Redirect to the country-specific guide page
    window.location.href = `/${countryCode}/guide`
  }

  const current = countries.find(c => c.code === currentCountry) || countries[0]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xl">{current.flag}</span>
        <span>{current.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
          <div className="p-2 border-b bg-gray-50">
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
              Select Your Country
            </p>
          </div>
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountryChange(country.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors ${
                currentCountry === country.code ? 'bg-gradient-to-r from-blue-100 to-purple-100' : ''
              }`}
            >
              <span className="text-2xl">{country.flag}</span>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">{country.name}</div>
                <div className="text-xs text-gray-600">Guide Price: {country.currency}</div>
              </div>
              {currentCountry === country.code && (
                <div className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full">
                  Current
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}