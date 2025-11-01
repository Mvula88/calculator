'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Globe } from 'lucide-react'

const countries = [
  { code: 'na', name: 'Namibia', flag: '🇳🇦', currency: '$87 USD' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦', currency: '$87 USD' },
  { code: 'bw', name: 'Botswana', flag: '🇧🇼', currency: '$87 USD' },
  { code: 'zm', name: 'Zambia', flag: '🇿🇲', currency: '$87 USD' },
]

interface HeaderCountrySelectorProps {
  country?: string
}

export default function HeaderCountrySelector({ country }: HeaderCountrySelectorProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCountry, setCurrentCountry] = useState<string>(country || 'na')
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

  // Dynamic gradient based on country
  const gradients = {
    na: 'from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600',
    za: 'from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600',
    bw: 'from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600',
    zm: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
  }

  const currentGradient = gradients[currentCountry as keyof typeof gradients] || gradients.na

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Circular Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${currentGradient} text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-200 border-2 border-white ring-2 ring-white/30 hover:ring-4 hover:ring-white/40`}
      >
        {/* Pulsing indicator for attention */}
        <div className="absolute -top-1 -right-1 h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500 border-2 border-white"></span>
        </div>

        {/* Flag in center */}
        <span className="text-xl sm:text-2xl">{current.flag}</span>

        {/* Small chevron indicator at bottom */}
        <ChevronDown className={`absolute bottom-1 h-3 w-3 text-white/80 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - Professional design */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
          <div className="px-4 py-3 border-b bg-gradient-to-r from-gray-50 to-gray-100">
            <p className="text-xs text-gray-700 font-bold uppercase tracking-wider">
              Select Your Country
            </p>
          </div>
          {countries.map((country) => {
            const isActive = currentCountry === country.code
            const countryGradient = gradients[country.code as keyof typeof gradients] || gradients.na

            return (
              <button
                key={country.code}
                onClick={() => handleCountryChange(country.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-blue-600' 
                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                }`}
              >
                <span className="text-xl sm:text-2xl">{country.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-900 text-sm sm:text-base">{country.name}</div>
                  <div className="text-xs text-gray-600 font-medium">Guide Price: {country.currency}</div>
                </div>
                {isActive && (
                  <div className={`text-xs bg-gradient-to-r ${countryGradient} text-white px-3 py-1 rounded-full font-semibold shadow-sm`}>
                    Active
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}