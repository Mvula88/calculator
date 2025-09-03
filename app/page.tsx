'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Check, X, Calculator, FileText, Users, DollarSign, AlertTriangle, Clock, Shield, BookOpen, Phone, Package } from 'lucide-react'
import { useCountry } from '@/lib/country-context'
import { Price } from '@/components/ui/Price'

export default function LandingPage() {
  const { country } = useCountry()
  
  // Country-specific content
  const content = {
    'namibia': {
      headline: "I've Imported 38 Cars Through Walvis Bay",
      subheadline: "Save N$60,000+ with Container Sharing",
      testimonial: "Saved N$65,000 on my Hilux - John, Windhoek",
      popularCars: ['Toyota Hilux', 'VW Polo', 'Toyota Fortuner'],
      port: 'Walvis Bay',
      savings: 60000
    },
    'south-africa': {
      headline: "Skip Durban Delays - Import Smarter",
      subheadline: "Save R60,000+ vs Dealer Prices",
      testimonial: "Avoided R85,000 dealer markup - Sarah, Joburg",
      popularCars: ['Toyota Corolla', 'Nissan NP200', 'Honda Fit'],
      port: 'Durban',
      savings: 60000
    },
    'botswana': {
      headline: "Import via Walvis Bay - Save P50,000",
      subheadline: "Faster & Cheaper than Durban Route",
      testimonial: "Got my Fortuner P70,000 cheaper - Thabo, Gabs",
      popularCars: ['Toyota Hilux', 'Toyota Fortuner', 'VW Polo'],
      port: 'Walvis Bay',
      savings: 50000
    },
    'zambia': {
      headline: "Compare All 3 Import Routes",
      subheadline: "Save K50,000+ on Your Next Import",
      testimonial: "Saved K65,000 using Walvis route - James, Lusaka",
      popularCars: ['Toyota Vitz', 'Toyota Spacio', 'Honda Fit'],
      port: 'Multiple',
      savings: 50000
    }
  }
  
  const countryKey = Object.keys(content).find(key => key.includes(country.code.toLowerCase())) || 'namibia'
  const local = content[countryKey as keyof typeof content]
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {local.headline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {local.subheadline} + Complete Import Calculator
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 text-lg">
                <Link href="/auth/register">Get Calculator Pro - <Price /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white text-blue-800 hover:bg-gray-100 font-bold px-8 py-6 text-lg">
                <Link href="#features">See What's Included ↓</Link>
              </Button>
            </div>
            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Badge variant="secondary" className="px-3 py-1 bg-white/20 text-white border-white/30">
                <Check className="w-4 h-4 mr-1" /> 38 Cars Imported
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 bg-white/20 text-white border-white/30">
                <Check className="w-4 h-4 mr-1" /> {country.symbol}1.6M Invested
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 bg-white/20 text-white border-white/30">
                <Check className="w-4 h-4 mr-1" /> Real Documentation
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 bg-white/20 text-white border-white/30">
                <Check className="w-4 h-4 mr-1" /> Serving {country.name}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-red-900">
              Most Importers Don't Know They're Being Overcharged
            </h2>
            <p className="text-center text-lg mb-8 text-red-700">
              These are the costs dealers and agents never mention:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Auction fees you don't see coming</p>
                  <p className="text-gray-600"><Price nadAmount={5800} /></p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Port storage charges after 3 days</p>
                  <p className="text-gray-600"><Price nadAmount={200} />/day</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Radiation inspection fees</p>
                  <p className="text-gray-600"><Price nadAmount={750} /></p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Container cleaning charges</p>
                  <p className="text-gray-600">N$450</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Consignee debt traps</p>
                  <p className="text-gray-600">My car stuck since April!</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Break-bulk charges nobody mentions</p>
                  <p className="text-gray-600">N$2,500</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Documentation fees at every step</p>
                  <p className="text-gray-600">N$800+</p>
                </div>
              </div>
            </div>
            <Alert className="bg-red-100 border-red-300">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-lg font-bold text-red-900">
                Total Hidden Costs: N$12,000-18,000 that nobody tells you about!
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Complete Solution Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything You Need to Import Cars Successfully
            </h2>
            <p className="text-center text-lg mb-12 text-gray-600">
              Complete toolkit for serious importers - no shortcuts, no surprises
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-8 h-8 text-blue-600" />
                    <CardTitle>CALCULATOR PRO (Core Feature)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>ALL 27 hidden costs included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Japan side costs (6 fees)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Shipping costs (4 fees)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Namibia side costs (17 fees)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Real-time exchange rates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>PDF reports for banks</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Timeline calculator</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Compare up to 5 vehicles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-8 h-8 text-green-600" />
                    <CardTitle>IMPORT MASTERY GUIDE</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Complete step-by-step process</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Required documents checklist</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Customs requirements</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>NRCS compliance guide</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Timeline expectations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Common mistakes to avoid</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-purple-600" />
                    <CardTitle>VERIFIED RESOURCES</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Trusted clearing agents (avoid my mistake!)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Reliable shipping lines</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Document templates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Contact information</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>WhatsApp support group</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Package className="w-8 h-8 text-orange-600" />
                    <CardTitle>CONTAINER SHARING</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Link to platform for sharing containers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Save N$600-1,200 per shipment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Connect with other importers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Why I Built This Platform
            </h2>
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg">April 2024: My car arrives at Walvis Bay</p>
                      <p className="text-gray-600">Everything seemed perfect... until it wasn't.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg">Today: STILL STUCK</p>
                      <p className="text-gray-600">Consignee has debt with shipping line - my car is held hostage!</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <DollarSign className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg">Cost so far: N$45,000 in storage and fees</p>
                      <p className="text-gray-600">Money I'll never get back because I trusted the wrong agent.</p>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-lg font-semibold mb-2">I learned the hard way so you don't have to.</p>
                    <p className="text-gray-700">
                      After importing 7 cars and investing N$300,000, I discovered secrets that save N$15,000+ per import.
                      This platform shares everything I wish I knew before starting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 bg-red-500 text-white px-4 py-2 text-lg">
                NO FREE TRIALS - SERIOUS IMPORTERS ONLY
              </Badge>
            </div>
            
            <Card className="bg-white text-gray-900 shadow-2xl mb-8">
              <CardHeader className="bg-yellow-400 text-black text-center py-8">
                <CardTitle className="text-3xl font-bold">CALCULATOR PRO + IMPORT GUIDE</CardTitle>
                <CardDescription className="text-black text-4xl font-bold mt-4">
                  N$499 One-Time Payment
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-medium">Lifetime Calculator Access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-medium">ALL 27 Hidden Costs Revealed</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-medium">Import Process Master Guide</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-medium">Document Templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-medium">Verified Agent List</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-medium">Exchange Rate Alerts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-medium">WhatsApp Community</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-3" />
                    <span className="font-medium">Lifetime Updates</span>
                  </li>
                </ul>
                <Button asChild className="w-full py-6 text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Link href="/auth/register">Get Instant Access - N$499</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">POWER-UP YOUR SUCCESS</h3>
              <p className="text-xl text-blue-100">Additional Resources</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur text-white border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl">"AVOID MY MISTAKE" GUIDE</CardTitle>
                  <CardDescription className="text-white/80 text-2xl font-bold">N$499</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white/90">
                    <li>• My complete consignee disaster story</li>
                    <li>• How to verify agents before paying</li>
                    <li>• Red flags that cost me N$45,000</li>
                    <li>• Emergency contact list</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur text-white border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl">TRANSLATION PROVIDER ACCESS</CardTitle>
                  <CardDescription className="text-white/80 text-2xl font-bold">N$150</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white/90">
                    <li>• Professional auction sheet translators</li>
                    <li>• Grade verification experts</li>
                    <li>• Direct contacts (not agencies)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 bg-gradient-to-r from-purple-900 to-purple-700 text-white border-purple-500">
              <CardHeader>
                <Badge className="mb-2 bg-red-500 text-white">Application Required - Only 20 Spots</Badge>
                <CardTitle className="text-2xl">HIDDEN PLATFORM ACCESS</CardTitle>
                <CardDescription className="text-white text-3xl font-bold">N$14,999</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li>• Secret platforms with 40% cheaper cars</li>
                  <li>• Where I found cars under N$30,000</li>
                  <li>• Includes personal guidance</li>
                  <li>• NDA required</li>
                </ul>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/auth/register">Apply Now - Screening Required</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Guarantees</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Shield className="w-12 h-12 mx-auto text-green-500 mb-4" />
                  <CardTitle>30-Day Money Back</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">If you don't find value, get a full refund</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Phone className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <CardTitle>WhatsApp Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Direct support from me personally</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                  <CardTitle>Lifetime Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Stay updated as rules and costs change</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stop Losing Money on Every Import</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join serious importers who save N$15,000+ per vehicle
            </p>
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-12 py-6 text-xl">
              <Link href="/auth/register">Get Started Now - N$499</Link>
            </Button>
            <p className="mt-4 text-gray-400">
              No free tier • No trial • Serious importers only
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
