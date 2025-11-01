'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
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
  Shield,
  DollarSign,
  Globe,
  Package,
  ChevronDown,
  MessageCircle
} from 'lucide-react'

export default function PublicImportGuide() {
  const [showPDF, setShowPDF] = useState(false)
  const [carPrice, setCarPrice] = useState('')
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null)

  // Replace with your actual WhatsApp number
  const whatsappNumber = "264814756919" // Namibia format
  const whatsappMessage = "Hi! I'm interested in learning more about importing cars from Japan."

  const calculateQuickEstimate = () => {
    const price = parseFloat(carPrice)
    if (isNaN(price) || price <= 0) {
      setEstimatedCost(null)
      return
    }

    // Quick estimation formula for Namibia
    // Auction price + ~50% Japan costs + ~45% shipping/duties/VAT
    const estimate = price * 1.95
    setEstimatedCost(Math.round(estimate))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* Sticky Navigation - Enhanced */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/impota-logo.png"
                alt="IMPOTA"
                width={150}
                height={40}
                className="h-8 sm:h-10 w-auto"
                priority
              />
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="hidden sm:inline-flex text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                Contact
              </Link>
              <Link
                href="/auth/login"
                className="px-3 sm:px-5 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 text-sm"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('/japan-cars-hero.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28 z-20">
          <div className="text-center mb-10 sm:mb-14">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-white mb-6 sm:mb-8 shadow-lg">
              <BookOpen className="h-4 w-4" />
              Free Import Guide
            </div>

            {/* Social Proof Badge - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/90 backdrop-blur-md border border-green-400/50 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg animate-pulse">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">5 Namibians already saving thousands - join them</span>
                <span className="sm:hidden">5 Namibians joined this week!</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 sm:mb-7 leading-tight tracking-tight drop-shadow-2xl">
              Import Your Dream Car<br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl"> Without the Costly Mistakes</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Learn how importing from Japan can save you thousands—or cost you everything if done wrong.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-12 sm:mt-16">
            <a href="#navigation" className="animate-bounce">
              <ChevronDown className="h-6 w-6 text-white/60" />
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

        {/* Quick Calculator - NEW */}
        <section className="mb-16 sm:mb-24 -mt-20 sm:-mt-24 relative z-10">
          <Card className="border-2 border-orange-200/60 overflow-hidden shadow-2xl bg-gradient-to-br from-orange-50/80 to-amber-50/50">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border-2 border-orange-200 rounded-full text-xs sm:text-sm font-bold text-orange-700 mb-4 shadow-sm">
                  <Calculator className="h-4 w-4" />
                  Free Quick Estimate
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                  How Much Will Your Import Cost?
                </h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Get an instant ballpark estimate for Namibia imports
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Japan Auction Price (in N$)
                    </label>
                    <input
                      type="number"
                      value={carPrice}
                      onChange={(e) => {
                        setCarPrice(e.target.value)
                        setEstimatedCost(null)
                      }}
                      placeholder="e.g., 50000"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-base"
                    />
                  </div>

                  <Button
                    onClick={calculateQuickEstimate}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Estimate
                  </Button>

                  {estimatedCost !== null && (
                    <div className="bg-white rounded-xl p-5 border-2 border-green-200 shadow-lg animate-in fade-in duration-300">
                      <div className="text-center">
                        <p className="text-sm text-slate-600 mb-2">Estimated Total Landed Cost:</p>
                        <p className="text-4xl sm:text-5xl font-extrabold text-green-600 mb-3">
                          N${estimatedCost.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          This is a rough estimate. Get the <strong>exact breakdown</strong> with our advanced calculator (includes all fees, taxes, and options).
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-center text-slate-500 mt-4">
                  <strong>Note:</strong> This is a simplified estimate. For accurate calculations including specific vehicle details, duties, and port charges, upgrade to the full calculator.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Navigation Cards - Enhanced */}
        <section id="navigation" className="mb-16 sm:mb-24 scroll-mt-20">
          <div className="mb-10 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Jump to Section
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Quick shortcuts to different parts of the guide
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: 'Real Import Example', desc: 'Actual costs & invoice', icon: FileText, color: 'blue', href: '#real-example' },
              { title: 'Import Terms', desc: 'Essential vocabulary', icon: BookOpen, color: 'purple', href: '#import-terms' },
              { title: 'Country Rules', desc: 'Import regulations', icon: Globe, color: 'green', href: '#country-rules' },
              { title: 'Critical Warnings', desc: 'Avoid costly mistakes', icon: AlertTriangle, color: 'red', href: '#warning' },
              { title: 'Timeline', desc: 'Realistic expectations', icon: Clock, color: 'orange', href: '#timeline' },
              { title: 'Container Sharing', desc: 'Save N$40,000+', icon: Package, color: 'teal', href: '#container-sharing' }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <a key={idx} href={item.href} className="group">
                  <Card className="p-4 sm:p-6 border-2 border-slate-200/60 hover:border-${item.color}-500 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full bg-white/50 backdrop-blur-sm hover:bg-white">
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-2.5 sm:p-3 bg-${item.color}-50 rounded-xl mb-3 group-hover:scale-110 group-hover:bg-${item.color}-100 transition-all duration-300 shadow-sm`}>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${item.color}-600`} />
                      </div>
                      <h3 className={`font-bold text-sm sm:text-base text-slate-900 mb-1.5 sm:mb-2 group-hover:text-${item.color}-600 transition-colors leading-tight`}>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-snug">{item.desc}</p>
                    </div>
                  </Card>
                </a>
              )
            })}
          </div>
        </section>

        {/* Real Vehicle Example - Enhanced */}
        <section id="real-example" className="mb-16 sm:mb-24 scroll-mt-20">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Real Import Example
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Actual vehicle import with complete cost breakdown and invoice
            </p>
          </div>

          <Card className="border-2 border-blue-100/80 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-br from-blue-50/80 to-slate-50/50 p-6 sm:p-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                    2015 Audi A5 Sportback 2.0L Quattro
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600">Complete import to Namibia via Walvis Bay</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-3xl sm:text-5xl font-extrabold text-blue-600">N$80,229</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Total Landed Cost</div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg">
                <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-5 sm:mb-6">Complete Cost Breakdown:</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Japan Auction Price', amount: 'N$27,012', sub: '¥231,000' },
                    { label: 'Japan-side Costs', amount: 'N$14,551', sub: '¥124,440' },
                    { label: 'Ocean Freight (Shared container)', amount: 'N$16,020', sub: '¥137,000' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-slate-100 last:border-0">
                      <span className="text-sm sm:text-base text-slate-700 font-medium">{item.label}</span>
                      <div className="text-right">
                        <div className="font-bold text-sm sm:text-base text-slate-900">{item.amount}</div>
                        <div className="text-xs text-slate-500">{item.sub}</div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <p className="font-bold text-sm sm:text-base text-slate-900 mb-4">Namibian Customs Duties & Taxes:</p>
                    <div className="space-y-2.5 pl-4 sm:pl-6">
                      {[
                        { label: 'ICD (Import Customs Duty)', amount: 'N$10,862' },
                        { label: 'ENV Levy', amount: 'N$3,960' },
                        { label: 'ADV (Ad Valorem)', amount: 'N$653' },
                        { label: 'VAT (15%)', amount: 'N$7,169' }
                      ].map((tax, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-slate-600">{tax.label}</span>
                          <span className="font-semibold text-slate-900">{tax.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t-2 border-blue-200 mt-4">
                    <span className="text-base sm:text-lg font-bold text-slate-900">Total Landed Cost</span>
                    <span className="text-2xl sm:text-4xl font-extrabold text-blue-600">N$80,229</span>
                  </div>
                </div>
              </div>

              {/* Invoice CTA */}
              <div className="mt-6 sm:mt-8">
                <Card className="bg-white border-2 border-blue-200/60 p-5 sm:p-6 shadow-lg">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="p-2.5 sm:p-3 bg-blue-100 rounded-xl flex-shrink-0">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">View the Actual Invoice</h4>
                      <p className="text-xs sm:text-sm text-slate-600">Real invoice from Japanese auction</p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 sm:py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base"
                    onClick={() => setShowPDF(true)}
                  >
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    View Invoice Document
                  </Button>
                  <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-1">
                    <Shield className="h-3 w-3" />
                    Protected viewing • No downloads
                  </p>
                </Card>
              </div>

              {/* Upsell */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/60 rounded-xl shadow-md">
                <p className="text-xs sm:text-sm text-amber-900">
                  <strong className="flex items-center gap-2 mb-2 text-sm sm:text-base">
                    <Sparkles className="h-4 w-4" />
                    This is 1 of 4 real vehicle examples
                  </strong>
                  Get full access to all imports (Golf 7R, Audi A3, Audi A4) + advanced calculator + 20+ documents for N$1,500 lifetime.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Import Terms - Enhanced */}
        <section id="import-terms" className="mb-16 sm:mb-24 scroll-mt-20">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Essential Import Terms
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Understanding these terms is your first defense against costly mistakes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              { term: 'FOB Price', definition: "Free On Board - the car's price in Japan up to loading on ship" },
              { term: 'CIF Value', definition: 'Cost, Insurance & Freight - car price + shipping + insurance to destination' },
              { term: 'ICD', definition: 'Import Customs Duty - main import tax (25% in Namibia)' },
              { term: 'Landed Cost', definition: 'Total cost to get the car out of port, before registration' },
              { term: 'Bill of Lading (B/L)', definition: 'Key shipping document and proof of shipment/ownership' },
              { term: 'Clearing Agent', definition: 'Licensed professional handling customs processes' }
            ].map((item, idx) => (
              <Card
                key={idx}
                className="p-4 sm:p-5 border-2 border-slate-200/60 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02] bg-white/50 backdrop-blur-sm hover:bg-white"
              >
                <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors">
                  {item.term}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700 transition-colors leading-relaxed">
                  {item.definition}
                </p>
              </Card>
            ))}
          </div>

          {/* CTA - Enhanced */}
          <Card className="border-2 border-purple-200/60 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/50 p-6 sm:p-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border-2 border-purple-200 rounded-full text-xs sm:text-sm font-bold text-purple-700 mb-5 sm:mb-6 shadow-sm">
                <BookOpen className="h-4 w-4" />
                Complete Import Terms Dictionary
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
                60+ Additional Import Terms Inside
              </h3>
              <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                Get full access to our comprehensive dictionary covering <strong>Auction Reports, Shipping Logistics, Customs Documentation, Port Handling,</strong> and more—organized by category for easy learning.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10 max-w-3xl mx-auto">
                {[
                  { title: 'Auction Terms', desc: 'Japanese auction terminology and vehicle grading' },
                  { title: 'Shipping & Logistics', desc: 'Ocean freight and transportation methods' },
                  { title: 'Customs & Docs', desc: 'Import documentation and clearance requirements' }
                ].map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 sm:p-5 border-2 border-purple-100 shadow-md hover:shadow-lg transition-shadow">
                    <div className="text-lg sm:text-xl font-bold text-purple-600 mb-1.5">{cat.title}</div>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cat.desc}</div>
                  </div>
                ))}
              </div>

              <ValidatedCheckoutButton
                tier="mastery"
                country="na"
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white text-base sm:text-lg font-bold px-6 sm:px-10 py-4 sm:py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Get Full Access to All 70+ Terms - N$1,500
              </ValidatedCheckoutButton>

              <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-slate-600">
                Includes: Complete terms dictionary + 4 vehicle examples + advanced calculator + 20+ documents
              </p>
            </div>
          </Card>
        </section>

        {/* Country Rules - Enhanced */}
        <section id="country-rules" className="mb-16 sm:mb-24 scroll-mt-20">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4 sm:mb-5 tracking-tight">
              Country Import Rules
            </h2>
            <Card className="p-5 sm:p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200/60 shadow-lg">
              <div className="flex items-start gap-3 sm:gap-4">
                <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm sm:text-base text-red-900 mb-1">Critical: Wrong vehicle age = Total Loss</p>
                  <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
                    Each country has strict rules. Import the wrong age vehicle and lose everything.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                country: 'Namibia',
                flag: '🇳🇦',
                color: 'blue',
                rules: [
                  { text: 'Age Limit: 12 years maximum', critical: true },
                  { text: 'Only right-hand drive allowed', critical: true },
                  { text: 'Extended from 8 years in July 2022', critical: false }
                ]
              },
              {
                country: 'South Africa',
                flag: '🇿🇦',
                color: 'amber',
                rules: [
                  { text: 'NO general used vehicle imports', critical: true },
                  { text: 'Exceptions for:', critical: false },
                  { text: '• Returning residents (6+ months abroad)', critical: false },
                  { text: '• Immigrants with permanent residence', critical: false },
                  { text: '• Vintage vehicles (40+ years)', critical: false }
                ]
              },
              {
                country: 'Botswana',
                flag: '🇧🇼',
                color: 'green',
                rules: [
                  { text: 'NO age restrictions', positive: true },
                  { text: 'No engine size restrictions', positive: true },
                  { text: 'Both left and right-hand drive allowed', positive: true }
                ]
              },
              {
                country: 'Zambia',
                flag: '🇿🇲',
                color: 'orange',
                rules: [
                  { text: 'NO age restrictions', positive: true },
                  { text: 'Vehicles over 5 years = higher surtaxes', warning: true },
                  { text: 'Only right-hand drive (except emergency vehicles)', critical: true }
                ]
              }
            ].map((item, idx) => (
              <Card
                key={idx}
                className={`border-l-4 border-l-${item.color}-600 p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group bg-white/50 backdrop-blur-sm hover:bg-white`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                    {item.flag}
                  </span>
                  <h3 className={`font-bold text-lg sm:text-xl group-hover:text-${item.color}-600 transition-colors`}>
                    {item.country}
                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {item.rules.map((rule, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      {rule.positive && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />}
                      {rule.critical && <span className="text-red-500 font-bold flex-shrink-0">•</span>}
                      {rule.warning && <span className="text-orange-500 font-bold flex-shrink-0">⚠️</span>}
                      {!rule.positive && !rule.critical && !rule.warning && <span className="text-slate-400 flex-shrink-0">•</span>}
                      <span className={`${rule.critical ? 'font-semibold' : ''} ${rule.positive ? 'text-green-700 font-semibold' : ''}`}>
                        {rule.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Warning Banner - Enhanced */}
        <section id="warning" className="mb-16 sm:mb-24 scroll-mt-20">
          <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-600 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-red-400/50 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative flex items-start gap-4 sm:gap-6">
              <AlertTriangle className="hidden sm:block h-8 w-8 sm:h-10 sm:w-10 text-white flex-shrink-0 animate-pulse drop-shadow-lg" />
              <div className="text-white">
                <h3 className="text-lg sm:text-2xl font-extrabold mb-3 sm:mb-4 drop-shadow">
                  Real Case: Container Held 7 Months - Massive Fees Accumulated
                </h3>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                  <p className="text-sm sm:text-base">
                    <strong className="font-bold">The Problem:</strong> A single wrong choice made before shipping
                  </p>
                  <p className="text-sm sm:text-base">
                    <strong className="font-bold">The Solution:</strong> Proper vetting process (included in guide)
                  </p>
                </div>
                <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 sm:px-5 py-3 sm:py-4 font-bold text-sm sm:text-base shadow-xl">
                  Learn the 9 deal-breaker mistakes that can cost you everything
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline - Enhanced */}
        <section id="timeline" className="mb-16 sm:mb-24 scroll-mt-20">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Realistic Timeline
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Know what to expect for imports via Walvis Bay
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Best Case: 7-8 weeks (51-57 days)',
                desc: 'Direct shipping, no delays, documents ready, quick customs clearance.',
                color: 'green',
                highlight: false
              },
              {
                title: 'Realistic: 9-10 weeks (60-70 days)',
                desc: 'Standard processing, minor port delays, average customs time.',
                note: 'Most imports fall in this range',
                color: 'blue',
                highlight: true
              },
              {
                title: 'Extended: 11-13 weeks (75-90 days)',
                desc: 'Vessel delays, port congestion, documentation issues, inspection delays.',
                color: 'orange',
                highlight: false
              }
            ].map((item, idx) => (
              <Card
                key={idx}
                className={`border-l-4 border-l-${item.color}-500 p-5 sm:p-6 ${item.highlight ? `bg-${item.color}-50/50` : 'bg-white/50'} backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer group hover:bg-white`}
              >
                <h4 className={`font-bold text-sm sm:text-base text-slate-900 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 group-hover:text-${item.color}-600 transition-colors`}>
                  <Clock className={`h-5 w-5 sm:h-6 sm:w-6 text-${item.color}-600 group-hover:scale-110 transition-transform flex-shrink-0`} />
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700 transition-colors leading-relaxed">
                  {item.desc}
                </p>
                {item.note && (
                  <p className={`text-xs sm:text-sm font-bold text-${item.color}-700 mt-2 sm:mt-3`}>
                    {item.note}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Container Sharing - Enhanced */}
        <section id="container-sharing" className="mb-16 sm:mb-24 scroll-mt-20">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Save N$40,000+ on Shipping
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Container sharing cuts your ocean freight cost by more than half
            </p>
          </div>

          <Card className="border-2 border-green-100/60 p-6 sm:p-10 bg-gradient-to-br from-green-50/60 to-emerald-50/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-red-200/60 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <Ship className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm font-bold text-red-600">Solo Shipping</div>
                </div>
                <div className="text-3xl sm:text-5xl font-extrabold text-red-600 mb-2 group-hover:scale-105 transition-transform">
                  N$75,000
                </div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                  40ft container • 1 vehicle
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-green-500 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <Ship className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm font-bold text-green-600">Container Sharing</div>
                </div>
                <div className="text-3xl sm:text-5xl font-extrabold text-green-600 mb-2 group-hover:scale-105 transition-transform">
                  N$18,750
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-2 group-hover:text-slate-700 transition-colors">
                  40ft container ÷ 4 cars
                </p>
                <p className="text-xs sm:text-sm font-bold text-green-700">Save N$56,250!</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md">
              <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-4 sm:mb-5">How It Works:</h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-700">
                {[
                  'A 40ft container fits 4-5 cars comfortably',
                  'Total container cost: N$75,000',
                  'Split 4 ways = N$18,750 each',
                  <>Find container partners via <a href="https://contshare.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline font-bold hover:no-underline transition-all">ContShare.com</a></>
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </section>

        {/* Testimonials Section - NEW */}
        <section className="mb-16 sm:mb-24">
          <div className="mb-8 sm:mb-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              What Our Members Are Saying
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Real feedback from Namibians using IMPOTA
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Dalton's Testimonial */}
            <Card className="p-5 sm:p-6 border-2 border-blue-100/60 hover:border-blue-300 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-blue-50/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                    D
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Dalton Coetzee</h4>
                  <p className="text-sm text-slate-600">Namibia • Recent Member</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                "Thank you so much for the site and helpful information, I really appreciate it. I am cautious of using any agent because it looks like there are many scams. The education we really appreciate it."
              </p>
              <p className="text-xs text-slate-500 mt-3">
                Looking to import: Mazda CX-5
              </p>
            </Card>

            {/* Olivia's Testimonial */}
            <Card className="p-5 sm:p-6 border-2 border-purple-100/60 hover:border-purple-300 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-purple-50/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600 text-lg">
                    O
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Olivia S Louw</h4>
                  <p className="text-sm text-slate-600">Namibia • First Online Customer</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                "Checking in to let you know guide is well written and structured. I still need to go through when I have more uninterrupted time. Will forward any questions after."
              </p>
              <p className="text-xs text-slate-500 mt-3">
                Verified Purchase • Oct 2025
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section id="get-access" className="mb-12 sm:mb-16 scroll-mt-20">
          <Card className="border-2 border-blue-200/60 overflow-hidden shadow-2xl">
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white p-6 sm:p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  Lifetime Access
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg tracking-tight">
                  Get the Complete Import System
                </h2>

                <div className="mb-6 sm:mb-8">
                  <div className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-2 sm:mb-3 drop-shadow-lg">N$1,500</div>
                  <div className="text-sm sm:text-base text-blue-100">One-time payment • No subscription</div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 sm:p-8 lg:p-10 mb-8 sm:mb-10 text-left max-w-2xl mx-auto shadow-2xl">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center">Everything You Get:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
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
                      <div key={idx} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <ValidatedCheckoutButton
                  tier="mastery"
                  country="na"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-base sm:text-lg lg:text-xl font-extrabold px-8 sm:px-12 py-4 sm:py-6 lg:py-7 transition-all duration-300 hover:shadow-2xl hover:scale-105 shadow-xl"
                >
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  Get Instant Access - $87 USD
                </ValidatedCheckoutButton>

                <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-blue-100 leading-relaxed">
                  <strong className="text-white">5 Namibians already joined this week</strong> • 7-day refund if you haven't accessed content
                </p>
              </div>
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

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline-block group-hover:inline-block text-sm font-bold pr-2">
          Questions? Chat with us
        </span>
      </a>
    </main>
  )
}
