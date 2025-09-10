import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Clock, CheckCircle, Star, TrendingUp, Users, Award } from 'lucide-react'

export default function PurchasePage() {
  const countries = [
    { code: 'na', name: 'Namibia', flag: '🇳🇦', mistakePrice: 'N$499', masteryPrice: 'N$1,999', currency: 'N$' },
    { code: 'za', name: 'South Africa', flag: '🇿🇦', mistakePrice: 'R499', masteryPrice: 'R1,999', currency: 'R' },
    { code: 'bw', name: 'Botswana', flag: '🇧🇼', mistakePrice: 'P404', masteryPrice: 'P1,618', currency: 'P' },
    { code: 'zm', name: 'Zambia', flag: '🇿🇲', mistakePrice: 'K669', masteryPrice: 'K2,676', currency: 'K' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Mobile-Optimized Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image 
                src="/impota-logo.png" 
                alt="IMPOTA" 
                width={120} 
                height={32}
                className="h-6 sm:h-8 w-auto"
                priority
              />
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-3 sm:px-4">
                <span className="hidden sm:inline">Already have access?</span> Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Mobile-Optimized Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Package
            </span>
          </h1>
          <p className="text-sm sm:text-xl text-gray-600 mb-2 px-4">
            Get instant access to the complete import guide
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
              <CheckCircle className="h-3 w-3" />
              One-time payment
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              <Award className="h-3 w-3" />
              Lifetime access
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              <Shield className="h-3 w-3" />
              30-day guarantee
            </span>
          </div>
        </div>

        {/* Mobile-First Country Selection */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-center text-lg sm:text-xl font-bold mb-4 text-gray-700">
            Select Your Country
          </h2>
          
          {/* Mobile: Vertical Stack, Desktop: Grid */}
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
            {countries.map((country) => (
              <div key={country.code} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Country Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 border-b">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">{country.flag}</span>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold">{country.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Import Guide</p>
                    </div>
                  </div>
                </div>
                
                {/* Package Options - Mobile Optimized */}
                <div className="p-4 sm:p-6">
                  {/* Mobile: Stack vertically */}
                  <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                    {/* Mistake Guide */}
                    <div className="border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-blue-400 transition-colors">
                      <h4 className="font-bold text-base sm:text-lg mb-2">Mistake Guide</h4>
                      <p className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 text-blue-600">
                        {country.mistakePrice}
                      </p>
                      <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Complete guide</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Mistakes to avoid</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Documents</span>
                        </li>
                      </ul>
                      <Link href={`/${country.code}/guide`}>
                        <Button className="w-full text-sm sm:text-base" variant="outline">
                          Get Started
                        </Button>
                      </Link>
                    </div>

                    {/* Import Mastery - Highlighted */}
                    <div className="relative border-2 border-purple-400 rounded-lg sm:rounded-xl p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50">
                      <div className="absolute -top-2 right-2 sm:right-4">
                        <span className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full font-bold">
                          POPULAR
                        </span>
                      </div>
                      <h4 className="font-bold text-base sm:text-lg mb-2">Import Mastery</h4>
                      <p className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 text-purple-600">
                        {country.masteryPrice}
                      </p>
                      <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span>Everything in Guide</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span>Live calculators</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                      <Link href={`/${country.code}/guide`}>
                        <Button className="w-full text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          Get Full Access
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-Optimized Trust Indicators */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">12K+</div>
            <div className="text-xs sm:text-sm text-gray-600">Happy Users</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">98%</div>
            <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">4.9★</div>
            <div className="text-xs sm:text-sm text-gray-600">User Rating</div>
          </div>
        </div>

        {/* Mobile-Optimized Trust Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Why Choose IMPOTA?</h3>
          
          {/* Mobile: Stack, Tablet+: Grid */}
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
            <div className="flex sm:flex-col items-center sm:text-center">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mr-4 sm:mr-0 sm:mb-3 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">100% Safe & Legal</h4>
                <p className="text-xs sm:text-sm text-gray-600">Fully compliant with customs</p>
              </div>
            </div>
            
            <div className="flex sm:flex-col items-center sm:text-center">
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 mr-4 sm:mr-0 sm:mb-3 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Instant Access</h4>
                <p className="text-xs sm:text-sm text-gray-600">Start importing today</p>
              </div>
            </div>
            
            <div className="flex sm:flex-col items-center sm:text-center">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mr-4 sm:mr-0 sm:mb-3 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Proven Success</h4>
                <p className="text-xs sm:text-sm text-gray-600">Thousands of imports done</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            🔒 Secure payment powered by Stripe • 30-day money-back guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <span className="text-gray-400">Accepted:</span>
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 Amex</span>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:hidden shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Starting from</p>
              <p className="text-lg font-bold">N$499</p>
            </div>
            <Link href="#countries">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Choose Package
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}