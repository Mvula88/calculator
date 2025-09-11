'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Globe, X } from 'lucide-react'

const countries = [
  { code: 'na', name: 'Namibia', flag: '🇳🇦', currency: 'N$' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦', currency: 'R' },
  { code: 'bw', name: 'Botswana', flag: '🇧🇼', currency: 'P' },
  { code: 'zm', name: 'Zambia', flag: '🇿🇲', currency: 'K' },
]

export default function CountrySelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCountry, setCurrentCountry] = useState<string>('na')

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

  const handleCountryChange = (countryCode: string) => {
    // Set cookie for persistence
    document.cookie = `user-country=${countryCode}; max-age=${60 * 60 * 24 * 30}; path=/; SameSite=Lax`
    
    // Redirect to the country-specific guide page
    window.location.href = `/${countryCode}/guide`
  }

  const current = countries.find(c => c.code === currentCountry) || countries[0]

  // Country-specific color classes
  const getCountryColorClass = (code: string) => {
    switch(code) {
      case 'na':
        return 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/30 text-blue-900'
      case 'za':
        return 'bg-green-600/20 hover:bg-green-600/30 border-green-600/30 text-green-900'
      case 'bw':
        return 'bg-sky-600/20 hover:bg-sky-600/30 border-sky-600/30 text-sky-900'
      case 'zm':
        return 'bg-emerald-600/20 hover:bg-emerald-600/30 border-emerald-600/30 text-emerald-900'
      default:
        return 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/30 text-blue-900'
    }
  }

  return (
    <>
      {/* Country-Themed Selector - Top Right Corner */}
      <div className="fixed top-4 right-4 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full shadow-md backdrop-blur-sm border transition-all duration-200 ${getCountryColorClass(currentCountry)}`}
          size="sm"
        >
          <span className="text-lg mr-1">{current.flag}</span>
          <span className="font-semibold text-sm">{current.code.toUpperCase()}</span>
          <Globe className="h-3 w-3 ml-1.5 opacity-60" />
        </Button>
      </div>

      {/* Country Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-md p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Select Your Country</h2>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Choose your country to see local pricing and port information
            </p>

            <div className="grid gap-3">
              {countries.map((country) => {
                const isSelected = currentCountry === country.code
                const colorClass = getCountryColorClass(country.code)
                return (
                  <Button
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    variant="outline"
                    className={`justify-start text-left transition-all ${
                      isSelected 
                        ? colorClass + ' ring-2 ring-offset-2' 
                        : 'hover:' + colorClass.split(' ')[0]
                    }`}
                    size="lg"
                  >
                    <span className="text-2xl mr-3">{country.flag}</span>
                    <div className="flex-1">
                      <div className="font-semibold">{country.name}</div>
                      <div className="text-xs opacity-75">
                        Currency: {country.currency}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-bold">
                        ✓ Current
                      </span>
                    )}
                  </Button>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t text-center text-xs text-gray-500">
              Your selection will be saved for future visits
            </div>
          </Card>
        </div>
      )}
    </>
  )
}