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

  // Country-specific colors
  const getCountryColors = (code: string) => {
    switch(code) {
      case 'na':
        return {
          bg: 'rgba(37, 99, 235, 0.2)', // blue-600
          hover: 'rgba(37, 99, 235, 0.3)',
          border: 'rgba(37, 99, 235, 0.3)',
          text: 'rgb(30, 58, 138)' // blue-900
        }
      case 'za':
        return {
          bg: 'rgba(22, 163, 74, 0.2)', // green-600
          hover: 'rgba(22, 163, 74, 0.3)',
          border: 'rgba(22, 163, 74, 0.3)',
          text: 'rgb(20, 83, 45)' // green-900
        }
      case 'bw':
        return {
          bg: 'rgba(2, 132, 199, 0.2)', // sky-600
          hover: 'rgba(2, 132, 199, 0.3)',
          border: 'rgba(2, 132, 199, 0.3)',
          text: 'rgb(12, 74, 110)' // sky-900
        }
      case 'zm':
        return {
          bg: 'rgba(5, 150, 105, 0.2)', // emerald-600
          hover: 'rgba(5, 150, 105, 0.3)',
          border: 'rgba(5, 150, 105, 0.3)',
          text: 'rgb(6, 78, 59)' // emerald-900
        }
      default:
        return {
          bg: 'rgba(37, 99, 235, 0.2)',
          hover: 'rgba(37, 99, 235, 0.3)',
          border: 'rgba(37, 99, 235, 0.3)',
          text: 'rgb(30, 58, 138)'
        }
    }
  }

  const [isHovered, setIsHovered] = useState(false)
  const colors = getCountryColors(currentCountry)

  return (
    <>
      {/* Desktop: Top Right Corner */}
      <div className="hidden sm:block fixed top-4 right-4 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-full shadow-md backdrop-blur-sm transition-all duration-200"
          style={{
            backgroundColor: isHovered ? colors.hover : colors.bg,
            borderColor: colors.border,
            color: colors.text
          }}
          size="sm"
        >
          <span className="text-lg mr-1">{current.flag}</span>
          <span className="font-semibold text-sm">{current.code.toUpperCase()}</span>
          <Globe className="h-3 w-3 ml-1.5 opacity-60" />
        </Button>
      </div>

      {/* Mobile: Floating Circle Bottom Right */}
      <div className="sm:hidden fixed bottom-20 right-4 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-full shadow-lg backdrop-blur-md transition-all duration-200 h-14 w-14 p-0 flex items-center justify-center border-2"
          style={{
            backgroundColor: isHovered ? colors.hover : colors.bg,
            borderColor: colors.border,
            color: colors.text,
            opacity: 0.9
          }}
        >
          <span className="text-2xl">{current.flag}</span>
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
                const countryColors = getCountryColors(country.code)
                return (
                  <Button
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    variant="outline"
                    className="justify-start text-left transition-all"
                    style={isSelected ? {
                      backgroundColor: countryColors.bg,
                      borderColor: countryColors.border,
                      color: countryColors.text
                    } : {}}
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