'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  CheckCircle,
  FileText,
  TrendingUp,
  Ship,
  Clock,
  Star,
  Zap,
  DollarSign,
  Globe,
  ArrowRight
} from 'lucide-react'

export default function PublicImportGuide() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Hero / Compelling Intro */}
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Free Import Guide
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Importing a Vehicle from Japan Can Save You{' '}
            <span className="text-blue-600">N$50,000+</span>
            <br />
            <span className="text-red-600">Or Cost You Everything</span>
          </h1>
          <div className="max-w-3xl mx-auto space-y-4 text-base sm:text-lg text-gray-700">
            <p>
              <strong>Most first-time importers lose thousands</strong> to hidden costs,
              wrong calculations, and avoidable mistakes.
            </p>
            <p>
              <strong>We learned the hard way</strong>—and documented everything—so you don't have to.
            </p>
            <p className="text-xl font-semibold text-blue-600">
              Below you'll see a real 2015 Audi A5 Sportback import with actual costs
              and the invoice itself.
            </p>
          </div>

          {/* Quick Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">Real Data</div>
              <div className="text-sm text-gray-600">Actual import costs</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">4 Countries</div>
              <div className="text-sm text-gray-600">NA, ZA, BW, ZM</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">Save N$40K+</div>
              <div className="text-sm text-gray-600">Container sharing</div>
            </div>
          </div>
        </div>

        {/* Import Terms Dictionary */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Import Terms Dictionary
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Know exactly what these terms mean before spending a cent. Understanding the language
            is your first line of defense against costly mistakes.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-1">FOB Price</h4>
              <p className="text-sm text-gray-600">The car's price in Japan (before shipping)</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-1">CIF Value</h4>
              <p className="text-sm text-gray-600">Car price + shipping + insurance costs</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-1">ICD</h4>
              <p className="text-sm text-gray-600">Import Customs Duty - main import tax (25% in Namibia)</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-1">ENV</h4>
              <p className="text-sm text-gray-600">Environmental levy on vehicle imports</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-1">ADV</h4>
              <p className="text-sm text-gray-600">Ad Valorem tax - percentage-based import tax</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-1">VAT</h4>
              <p className="text-sm text-gray-600">Value Added Tax on imported goods (15-16%)</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-1">Clearing Agent</h4>
              <p className="text-sm text-gray-600">Company that handles customs paperwork for you</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-1">Bill of Lading</h4>
              <p className="text-sm text-gray-600">Shipping document proving ownership</p>
            </Card>
          </div>
        </section>

        {/* Country Import Restrictions */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-8 w-8 text-red-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Country Import Restrictions
            </h2>
          </div>

          <Card className="p-6 bg-red-50 border-red-200 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-red-900 font-bold mb-2">⚠️ Getting this wrong = Total Loss</p>
                <p className="text-red-800 text-sm">
                  Each country has strict rules. Import a vehicle that doesn't meet requirements
                  and you could lose everything you've invested.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Namibia */}
            <Card className="p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🇳🇦</span>
                <h3 className="font-bold text-xl">Namibia</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Age Limit:</strong> 12 years maximum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Only right-hand drive vehicles allowed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="text-gray-600">Extended from 8 years in July 2022</span>
                </li>
              </ul>
            </Card>

            {/* South Africa */}
            <Card className="p-6 border-l-4 border-yellow-500">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🇿🇦</span>
                <h3 className="font-bold text-xl">South Africa</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">⚠️</span>
                  <span className="font-semibold text-red-700">NO general used vehicle imports</span>
                </li>
                <li className="text-gray-700 ml-6">Exceptions only for:</li>
                <li className="ml-8 text-gray-600">• Returning residents (6+ months abroad)</li>
                <li className="ml-8 text-gray-600">• Immigrants with permanent residence</li>
                <li className="ml-8 text-gray-600">• Vintage vehicles (40+ years)</li>
              </ul>
            </Card>

            {/* Botswana */}
            <Card className="p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🇧🇼</span>
                <h3 className="font-bold text-xl">Botswana</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-green-700 font-semibold">NO age restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>No engine size restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Both left and right-hand drive allowed</span>
                </li>
              </ul>
            </Card>

            {/* Zambia */}
            <Card className="p-6 border-l-4 border-orange-500">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🇿🇲</span>
                <h3 className="font-bold text-xl">Zambia</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-green-700 font-semibold">NO age restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">⚠️</span>
                  <span>Vehicles over 5 years = higher surtaxes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Only right-hand drive (except emergency vehicles)</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Real Vehicle Example - THE HOOK */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Star className="h-8 w-8 text-yellow-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Real Import Example: See the Actual Numbers
            </h2>
          </div>

          <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  2015 AUDI A5 SPORTBACK 2.0L QUATTRO
                </h3>
                <p className="text-gray-600">Complete cost breakdown from actual import</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600">N$80,229</div>
                <div className="text-sm text-gray-600">Total Landed Cost</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Cost Breakdown:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-700">Japan Auction Price</span>
                  <div className="text-right">
                    <div className="font-semibold">N$27,012</div>
                    <div className="text-xs text-gray-500">¥231,000</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-700">Japan-side Costs</span>
                  <div className="text-right">
                    <div className="font-semibold">N$14,551</div>
                    <div className="text-xs text-gray-500">¥124,440</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-700">Ocean Freight (Container sharing)</span>
                  <div className="text-right">
                    <div className="font-semibold">N$16,020</div>
                    <div className="text-xs text-gray-500">¥137,000</div>
                  </div>
                </div>
                <div className="pt-3">
                  <p className="font-bold text-gray-900 mb-2">Customs Duties & Taxes:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ICD (Import Customs Duty)</span>
                      <span className="font-semibold">N$10,862</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ENV Levy</span>
                      <span className="font-semibold">N$3,960</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ADV (Ad Valorem)</span>
                      <span className="font-semibold">N$653</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT (15%)</span>
                      <span className="font-semibold">N$7,169</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-purple-200">
                  <span className="text-lg font-bold">TOTAL LANDED COST</span>
                  <span className="text-2xl font-bold text-purple-600">N$80,229</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  View the Actual Invoice
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This is the real invoice from the Japanese auction. No theory—actual paperwork.
              </p>
              <Link href="/api/documents/2015 AUDI A5 SPORTBACK INVOICE.pdf" target="_blank">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  View Actual Invoice PDF
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-sm text-yellow-900">
                <strong>💡 This is ONE of 4 real vehicle imports in the full guide.</strong>
                <br />
                Get access to all breakdowns (Golf 7R, Audi A3, Audi A4) + calculator + 20+ documents below.
              </p>
            </div>
          </Card>
        </section>

        {/* Timeline Expectations */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-8 w-8 text-amber-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Realistic Timeline Expectations
            </h2>
          </div>

          <Card className="p-6">
            <p className="text-gray-600 mb-6">
              Understanding the timeline helps you plan financially and avoid unnecessary stress.
              Here's what to really expect for Walvis Bay port imports:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Best Case: 7-8 weeks (51-57 days)</h4>
                <p className="text-sm text-gray-600">Direct shipping route, no port delays, documents ready, quick customs clearance.</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Realistic: 9-10 weeks (60-70 days)</h4>
                <p className="text-sm text-gray-600">Standard processing, minor port delays, average customs time.</p>
                <p className="text-sm text-green-600 font-semibold mt-1">Most imports fall in this range.</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">⚠️ Extended: 11-13 weeks (75-90 days)</h4>
                <p className="text-sm text-gray-600">Vessel delays, port congestion, documentation issues, inspection delays.</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Timeline Breakdown:</p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Japan documentation & export: 7-14 days</li>
                <li>• Ocean shipping (Japan to Walvis Bay): 54-70 days</li>
                <li>• Port processing: 2-10 days</li>
                <li>• Customs clearance: 5-10 days</li>
                <li>• Registration: 5-7 days</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Container Sharing Info */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Ship className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Save N$40,000+ on Ocean Freight
            </h2>
          </div>

          <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Container Sharing Strategy</h3>
              <p className="text-gray-700">
                One of the biggest costs in vehicle importing is ocean freight. But there's a simple
                way to cut this cost by more than half.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6 border-2 border-red-200">
                <div className="text-red-600 font-semibold mb-2">Solo Shipping:</div>
                <div className="text-3xl font-bold text-red-600 mb-2">N$75,000</div>
                <p className="text-sm text-gray-600">40ft container • 1 vehicle</p>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-green-500">
                <div className="text-green-600 font-semibold mb-2">Container Sharing:</div>
                <div className="text-3xl font-bold text-green-600 mb-2">N$18,750</div>
                <p className="text-sm text-gray-600">40ft container ÷ 4 cars</p>
                <p className="text-xs font-bold text-green-700 mt-2">Save N$56,250!</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3">How It Works:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>A 40ft container fits 4-5 cars comfortably</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Total container cost: N$75,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Split 4 ways = N$18,750 each</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Find container partners via ContShare.com</span>
                </li>
              </ul>

              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <p className="text-sm text-green-900">
                  <strong>💡 Pro Tip:</strong> Our complete guide includes verified shipping companies,
                  container sharing best practices, and how to avoid common pitfalls.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Risk Warning - Brief */}
        <section className="mb-12 sm:mb-16">
          <Card className="p-6 sm:p-8 bg-red-50 border-2 border-red-300">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-10 w-10 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-red-900 mb-4">
                  ⚠️ Import Risks: We Learned These the Hard Way
                </h3>

                <p className="text-gray-700 mb-4">Things that can (and do) go wrong:</p>

                <div className="bg-white rounded-lg p-4 border-2 border-red-200 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-600 text-xl">❌</span>
                    <span className="font-bold text-red-900">Wrong vehicle age calculation = Total Loss</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-7">
                    Import a 13-year-old car to Namibia thinking it's 12? You lose everything.
                  </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-900 font-semibold mb-2">
                    Our complete guide covers <span className="text-blue-600">15+ common mistakes</span> and
                    exactly how to avoid each one.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Consignee account issues that cost N$500+/day in storage</li>
                    <li>• Missing documents that cause weeks of delays</li>
                    <li>• HS code disputes that add N$15,000+ in unexpected duty</li>
                    <li>• Payment processing mistakes that block clearance</li>
                    <li>• ...and 11 more costly mistakes</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Strong CTA */}
        <section className="mb-12">
          <Card className="p-8 sm:p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block mb-4 px-4 py-1 bg-white/20 rounded-full text-sm font-semibold">
                🚀 Lifetime Access
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Get the Complete Import Mastery System
              </h2>
              <div className="text-5xl sm:text-6xl font-bold mb-6">
                N$850
                <span className="text-xl font-normal"> one-time</span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8 text-left">
                <h3 className="text-xl font-bold mb-4">Unlock Everything:</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>3 More Real Vehicle Examples (Golf 7R, Audi A3, Audi A4)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>All 20+ Actual Import Documents (PDFs)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Advanced Multi-Country Calculator</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Complete Step-by-Step Import Guide</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Verified Clearing Agents Directory</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Japan Auction Bidding Guide</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Shipping Companies Comparison</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>15+ Common Mistakes Guide</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/na">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-bold px-8 py-6 w-full sm:w-auto">
                    <Zap className="h-5 w-5 mr-2" />
                    Get Instant Access
                  </Button>
                </Link>
                <Link href="/portal/start-here">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-6 w-full sm:w-auto">
                    See What's Inside
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-white/80">
                ✨ Join hundreds of importers who are importing smarter
              </p>
            </div>
          </Card>
        </section>

        {/* Social Proof / Trust Builders */}
        <div className="text-center text-sm text-gray-500 pb-8">
          <p className="mb-2">💡 Save N$5,000-N$50,000 by avoiding common mistakes</p>
          <p>🚀 One-time payment • Lifetime access • No subscription</p>
        </div>
      </div>
    </main>
  )
}
