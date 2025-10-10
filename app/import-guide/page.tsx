'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import PDFViewer from '@/components/PDFViewer'
import ValidatedCheckoutButton from '@/components/validated-checkout-button'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Clock,
  Ship,
  ArrowRight,
  FileText,
  Sparkles,
  Shield
} from 'lucide-react'

export default function PublicImportGuide() {
  const [showPDF, setShowPDF] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                Impota
              </div>
            </Link>

            {/* Right side navigation */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                Contact
              </Link>
              <Link
                href="/portal/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg text-sm"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean & Professional */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 border-b">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700 mb-6">
              <BookOpen className="h-4 w-4" />
              Free Import Guide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Import Your Dream Car<br />
              <span className="text-blue-600">Without the Costly Mistakes</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Learn how importing from Japan can save you thousands—or cost you everything if done wrong.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300 cursor-pointer group">
              <div className="text-3xl font-bold text-blue-600 mb-1 group-hover:scale-110 transition-transform duration-300">Real Data</div>
              <div className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Actual import costs</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300 cursor-pointer group">
              <div className="text-3xl font-bold text-blue-600 mb-1 group-hover:scale-110 transition-transform duration-300">4 Countries</div>
              <div className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">NA • ZA • BW • ZM</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300 cursor-pointer group">
              <div className="text-3xl font-bold text-blue-600 mb-1 group-hover:scale-110 transition-transform duration-300">Save N$40K</div>
              <div className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Container sharing</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Real Vehicle Example - THE HOOK! */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Real Import Example
            </h2>
            <p className="text-lg text-slate-600">
              Actual vehicle import with complete cost breakdown and invoice
            </p>
          </div>

          <Card className="border-2 border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    2015 Audi A5 Sportback 2.0L Quattro
                  </h3>
                  <p className="text-slate-600">Complete import to Namibia via Walvis Bay</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">N$80,229</div>
                  <div className="text-sm text-slate-600">Total Landed Cost</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Complete Cost Breakdown:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-700">Japan Auction Price</span>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">N$27,012</div>
                      <div className="text-xs text-slate-500">¥231,000</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-700">Japan-side Costs</span>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">N$14,551</div>
                      <div className="text-xs text-slate-500">¥124,440</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-700">Ocean Freight (Shared container)</span>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">N$16,020</div>
                      <div className="text-xs text-slate-500">¥137,000</div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <p className="font-bold text-slate-900 mb-3">Namibian Customs Duties & Taxes:</p>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-slate-600">ICD (Import Customs Duty)</span>
                        <span className="font-semibold text-slate-900">N$10,862</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">ENV Levy</span>
                        <span className="font-semibold text-slate-900">N$3,960</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">ADV (Ad Valorem)</span>
                        <span className="font-semibold text-slate-900">N$653</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">VAT (15%)</span>
                        <span className="font-semibold text-slate-900">N$7,169</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t-2 border-blue-200">
                    <span className="text-lg font-bold text-slate-900">Total Landed Cost</span>
                    <span className="text-3xl font-bold text-blue-600">N$80,229</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Card className="bg-white border border-blue-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">View the Actual Invoice</h4>
                        <p className="text-sm text-slate-600">Real invoice from Japanese auction</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => setShowPDF(true)}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    View Invoice Document
                  </Button>
                  <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-1">
                    <Shield className="h-3 w-3" />
                    Protected viewing • No downloads
                  </p>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">
                  <strong className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4" />
                    This is 1 of 4 real vehicle examples
                  </strong>
                  Get full access to all imports (Golf 7R, Audi A3, Audi A4) + advanced calculator + 20+ documents for N$850 lifetime.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Import Terms Dictionary - Preview */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Essential Import Terms
            </h2>
            <p className="text-lg text-slate-600">
              Understanding these terms is your first defense against costly mistakes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { term: 'FOB Price', definition: "Free On Board - the car's price in Japan up to loading on ship" },
              { term: 'CIF Value', definition: 'Cost, Insurance & Freight - car price + shipping + insurance to destination' },
              { term: 'ICD', definition: 'Import Customs Duty - main import tax (25% in Namibia)' },
              { term: 'Landed Cost', definition: 'Total cost to get the car out of port, before registration' },
              { term: 'Bill of Lading (B/L)', definition: 'Key shipping document and proof of shipment/ownership' },
              { term: 'Clearing Agent', definition: 'Licensed professional handling customs processes' },
            ].map((item, idx) => (
              <Card key={idx} className="p-4 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
                <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{item.term}</h4>
                <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">{item.definition}</p>
              </Card>
            ))}
          </div>

          {/* CTA to see full dictionary */}
          <Card className="border-2 border-purple-200 overflow-hidden">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-200 rounded-full text-sm font-semibold text-purple-700 mb-4">
                <BookOpen className="h-4 w-4" />
                Complete Import Terms Dictionary
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                60+ Additional Import Terms Inside
              </h3>
              <p className="text-slate-700 max-w-2xl mx-auto mb-6">
                Get full access to our comprehensive dictionary covering <strong>Auction Reports, Shipping Logistics, Customs Documentation, Port Handling,</strong> and more—organized by category for easy learning.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="text-xl font-bold text-purple-600 mb-1">Auction Terms</div>
                  <div className="text-sm text-slate-600">Grade systems, panel maps, chassis codes</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="text-xl font-bold text-purple-600 mb-1">Shipping & Logistics</div>
                  <div className="text-sm text-slate-600">Ro-Ro, containers, ETD/ETA, carriers</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="text-xl font-bold text-purple-600 mb-1">Customs & Docs</div>
                  <div className="text-sm text-slate-600">NamRA, HS codes, SAD 500, certificates</div>
                </div>
              </div>

              <ValidatedCheckoutButton
                tier="mastery"
                country="na"
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold px-8 py-6"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Get Full Access to All 70+ Terms - N$850
              </ValidatedCheckoutButton>

              <p className="mt-4 text-sm text-slate-600">
                Includes: Complete terms dictionary + 4 vehicle examples + advanced calculator + 20+ documents
              </p>
            </div>
          </Card>
        </section>

        {/* Country Restrictions */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Country Import Rules
            </h2>
            <Card className="p-6 bg-red-50 border-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-red-900 mb-1">Critical: Wrong vehicle age = Total Loss</p>
                  <p className="text-sm text-red-800">
                    Each country has strict rules. Import the wrong age vehicle and lose everything.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Namibia */}
            <Card className="border-l-4 border-l-blue-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🇳🇦</span>
                <h3 className="font-bold text-xl group-hover:text-blue-600 transition-colors">Namibia</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Age Limit:</strong> 12 years maximum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Only right-hand drive allowed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">Extended from 8 years in July 2022</span>
                </li>
              </ul>
            </Card>

            {/* South Africa */}
            <Card className="border-l-4 border-l-amber-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🇿🇦</span>
                <h3 className="font-bold text-xl group-hover:text-amber-600 transition-colors">South Africa</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">⚠️</span>
                  <span className="font-semibold text-red-700">NO general used vehicle imports</span>
                </li>
                <li className="ml-6 text-slate-600">Exceptions for:</li>
                <li className="ml-8 text-slate-600">• Returning residents (6+ months abroad)</li>
                <li className="ml-8 text-slate-600">• Immigrants with permanent residence</li>
                <li className="ml-8 text-slate-600">• Vintage vehicles (40+ years)</li>
              </ul>
            </Card>

            {/* Botswana */}
            <Card className="border-l-4 border-l-green-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🇧🇼</span>
                <h3 className="font-bold text-xl group-hover:text-green-600 transition-colors">Botswana</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-green-700 font-semibold">NO age restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>No engine size restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Both left and right-hand drive allowed</span>
                </li>
              </ul>
            </Card>

            {/* Zambia */}
            <Card className="border-l-4 border-l-orange-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🇿🇲</span>
                <h3 className="font-bold text-xl group-hover:text-orange-600 transition-colors">Zambia</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-green-700 font-semibold">NO age restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠️</span>
                  <span>Vehicles over 5 years = higher surtaxes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Only right-hand drive (except emergency vehicles)</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Timeline Expectations */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Realistic Timeline
            </h2>
            <p className="text-lg text-slate-600">
              Know what to expect for imports via Walvis Bay
            </p>
          </div>

          <div className="space-y-4">
            <Card className="border-l-4 border-l-green-500 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 group-hover:text-green-600 transition-colors">
                <Clock className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                Best Case: 7-8 weeks (51-57 days)
              </h4>
              <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                Direct shipping, no delays, documents ready, quick customs clearance.
              </p>
            </Card>

            <Card className="border-l-4 border-l-blue-500 p-6 bg-blue-50 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                <Clock className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                Realistic: 9-10 weeks (60-70 days)
              </h4>
              <p className="text-sm text-slate-600 mb-2 group-hover:text-slate-700 transition-colors">
                Standard processing, minor port delays, average customs time.
              </p>
              <p className="text-sm font-semibold text-blue-700">
                Most imports fall in this range
              </p>
            </Card>

            <Card className="border-l-4 border-l-orange-500 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 group-hover:text-orange-600 transition-colors">
                <Clock className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
                Extended: 11-13 weeks (75-90 days)
              </h4>
              <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                Vessel delays, port congestion, documentation issues, inspection delays.
              </p>
            </Card>
          </div>
        </section>

        {/* Container Sharing */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Save N$40,000+ on Shipping
            </h2>
            <p className="text-lg text-slate-600">
              Container sharing cuts your ocean freight cost by more than half
            </p>
          </div>

          <Card className="border-2 border-green-100 p-8 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border-2 border-red-200 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <Ship className="h-5 w-5 text-red-600 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-semibold text-red-600">Solo Shipping</div>
                </div>
                <div className="text-4xl font-bold text-red-600 mb-2 group-hover:scale-105 transition-transform">N$75,000</div>
                <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">40ft container • 1 vehicle</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-green-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <Ship className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-semibold text-green-600">Container Sharing</div>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-105 transition-transform">N$18,750</div>
                <p className="text-sm text-slate-600 mb-2 group-hover:text-slate-700 transition-colors">40ft container ÷ 4 cars</p>
                <p className="text-sm font-bold text-green-700">Save N$56,250!</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-4">How It Works:</h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>A 40ft container fits 4-5 cars comfortably</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Total container cost: N$75,000</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Split 4 ways = N$18,750 each</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Find container partners via ContShare.com</span>
                </li>
              </ul>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <Card className="border-2 border-blue-200 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 sm:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-semibold mb-6">
                <Sparkles className="h-4 w-4" />
                Lifetime Access
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Get the Complete Import System
              </h2>
              <div className="mb-6">
                <div className="text-5xl sm:text-6xl font-bold mb-2">N$850</div>
                <div className="text-blue-100">One-time payment • No subscription</div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 sm:p-8 mb-8 text-left max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-4 text-center">Everything You Get:</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {[
                    '3 More Vehicle Examples (Golf 7R, A3, A4)',
                    'All 20+ Import Documents (PDFs)',
                    'Advanced Multi-Country Calculator',
                    'Complete Step-by-Step Guide',
                    'Verified Clearing Agents Directory',
                    'Japan Auction Bidding Guide',
                    'Shipping Companies Comparison',
                    '15+ Common Mistakes Guide'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ValidatedCheckoutButton
                  tier="mastery"
                  country="na"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg font-bold px-8 py-6 transition-all duration-300 hover:shadow-xl"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Instant Access - $49 USD
                </ValidatedCheckoutButton>
              </div>

              <p className="mt-6 text-sm text-blue-100">
                Join hundreds of successful importers • 7-day refund if you haven't accessed content
              </p>
            </div>
          </Card>
        </section>

      </div>

      {/* PDF Viewer Modal */}
      {showPDF && (
        <PDFViewer
          isOpen={showPDF}
          onClose={() => setShowPDF(false)}
          documentName="2015 Audi A5 Sportback Invoice"
          documentUrl="https://oehiirawkmwvxworhizb.supabase.co/storage/v1/object/sign/documents/2015%20AUDI%20A5%20SPORTBACK%20INVOICE.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNTFhMDQ5OS0yNTBmLTQwNDQtYmJiZS01YTA1MGE3MGMzNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvMjAxNSBBVURJIEE1IFNQT1JUQkFDSyBJTlZPSUNFLnBkZiIsImlhdCI6MTc2MDAzNzY0MSwiZXhwIjoyMzkwNzU3NjQxfQ.7Olz4T093bK6OZy8RNZpYvjmVzptfwPffu0XCb8yrOA"
        />
      )}
    </main>
  )
}
