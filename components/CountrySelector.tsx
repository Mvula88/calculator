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

  return (
    <>
      {/* Floating Country Selector Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full shadow-lg bg-white text-gray-900 border hover:bg-gray-50"
          size="lg"
        >
          <Globe className="h-5 w-5 mr-2" />
          <span className="font-semibold">{current.flag} {current.name}</span>
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
              {countries.map((country) => (
                <Button
                  key={country.code}
                  onClick={() => handleCountryChange(country.code)}
                  variant={currentCountry === country.code ? "default" : "outline"}
                  className="justify-start text-left"
                  size="lg"
                >
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <div className="flex-1">
                    <div className="font-semibold">{country.name}</div>
                    <div className="text-xs opacity-75">
                      Currency: {country.currency}
                    </div>
                  </div>
                  {currentCountry === country.code && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </Button>
              ))}
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