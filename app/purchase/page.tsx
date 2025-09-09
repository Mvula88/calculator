import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Clock, CheckCircle } from 'lucide-react'

export default function PurchasePage() {
  const countries = [
    { code: 'na', name: 'Namibia', flag: '🇳🇦', mistakePrice: 'N$499', masteryPrice: 'N$1,999' },
    { code: 'za', name: 'South Africa', flag: '🇿🇦', mistakePrice: 'R499', masteryPrice: 'R1,999' },
    { code: 'bw', name: 'Botswana', flag: '🇧🇼', mistakePrice: 'P404', masteryPrice: 'P1,618' },
    { code: 'zm', name: 'Zambia', flag: '🇿🇲', mistakePrice: 'K669', masteryPrice: 'K2,676' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image 
                src="/impota-logo.png" 
                alt="IMPOTA" 
                width={120} 
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Already have access? Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Country & Package
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Get instant access to the complete import guide for your country
          </p>
          <p className="text-lg text-gray-500">
            One-time payment • Lifetime access • 30-day money-back guarantee
          </p>
        </div>

        {/* Country Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {countries.map((country) => (
            <div key={country.code} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{country.flag}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{country.name}</h2>
                      <p className="text-gray-600">Import Guide</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Mistake Guide */}
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                    <h3 className="font-bold text-lg mb-2">Mistake Guide</h3>
                    <p className="text-3xl font-black mb-3">{country.mistakePrice}</p>
                    <ul className="space-y-2 mb-4 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Complete import guide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Common mistakes list</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Document templates</span>
                      </li>
                    </ul>
                    <Link href={`/${country.code}/guide`}>
                      <Button className="w-full" variant="outline">
                        Get Started
                      </Button>
                    </Link>
                  </div>

                  {/* Import Mastery */}
                  <div className="border-2 border-purple-400 rounded-xl p-4 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">Import Mastery</h3>
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">POPULAR</span>
                    </div>
                    <p className="text-3xl font-black mb-3">{country.masteryPrice}</p>
                    <ul className="space-y-2 mb-4 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Everything in Mistake Guide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Live calculators & tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                    <Link href={`/${country.code}/guide`}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Get Full Access
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-6">Why Choose IMPOTA?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-blue-600 mb-3" />
              <h4 className="font-bold mb-2">100% Safe & Legal</h4>
              <p className="text-sm text-gray-600">Fully compliant with all customs regulations</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 text-purple-600 mb-3" />
              <h4 className="font-bold mb-2">Instant Access</h4>
              <p className="text-sm text-gray-600">Start importing in minutes, not months</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-600 mb-3" />
              <h4 className="font-bold mb-2">Proven Success</h4>
              <p className="text-sm text-gray-600">Join 12,000+ successful importers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}