'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Globe } from 'lucide-react'

const countries = [
  { code: 'na', name: 'Namibia', flag: '🇳🇦', currency: 'N$499' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦', currency: 'R499' },
  { code: 'bw', name: 'Botswana', flag: '🇧🇼', currency: 'P404' },
  { code: 'zm', name: 'Zambia', flag: '🇿🇲', currency: 'K669' },
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
      {/* Dropdown Button - Professional design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r ${currentGradient} text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold text-xs sm:text-sm border border-white/20`}
      >
        <span className="text-base sm:text-lg">{current.flag}</span>
        <span className="hidden sm:inline font-bold">{current.name}</span>
        <span className="sm:hidden font-bold">{current.code.toUpperCase()}</span>
        <ChevronDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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