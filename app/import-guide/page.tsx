'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PDFViewer from '@/components/PDFViewer'
import ValidatedCheckoutButton from '@/components/validated-checkout-button'
import { Button } from '@/components/ui/button'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  Ship,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Globe,
  Package,
  MessageCircle,
  Calculator,
  Star,
} from 'lucide-react'

export default function PublicImportGuide() {
  const [showPDF, setShowPDF] = useState(false)
  const [carPrice, setCarPrice] = useState('')
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null)

  const whatsappNumber = '264816683276'
  const whatsappMessage = "Hi! I'm interested in learning more about importing cars from Japan."

  const calculateQuickEstimate = () => {
    const price = parseFloat(carPrice)
    if (isNaN(price) || price <= 0) {
      setEstimatedCost(null)
      return
    }
    setEstimatedCost(Math.round(price * 1.95))
  }

  const sectionNav = [
    { title: 'Real Import Example', desc: 'Actual costs & invoice', icon: FileText, href: '#real-example' },
    { title: 'Import Terms', desc: 'Essential vocabulary', icon: BookOpen, href: '#import-terms' },
    { title: 'Country Rules', desc: 'Import regulations', icon: Globe, href: '#country-rules' },
    { title: 'Critical Warnings', desc: 'Avoid costly mistakes', icon: AlertTriangle, href: '#warning' },
    { title: 'Timeline', desc: 'Realistic expectations', icon: Clock, href: '#timeline' },
    { title: 'Container Sharing', desc: 'Save N$40,000+', icon: Package, href: '#container-sharing' },
  ]

  const costBreakdown = [
    { label: 'Japan auction price', amount: 'N$27,012', sub: '¥231,000' },
    { label: 'Japan-side costs', amount: 'N$14,551', sub: '¥124,440' },
    { label: 'Ocean freight (shared container)', amount: 'N$16,020', sub: '¥137,000' },
  ]

  const namibianTaxes = [
    { label: 'ICD (Import Customs Duty)', amount: 'N$10,862' },
    { label: 'ENV Levy', amount: 'N$3,960' },
    { label: 'ADV (Ad Valorem)', amount: 'N$653' },
    { label: 'VAT (15%)', amount: 'N$7,169' },
  ]

  const importTerms = [
    { term: 'FOB Price', definition: "Free On Board — the car's price in Japan up to loading on ship" },
    { term: 'CIF Value', definition: 'Cost, Insurance & Freight — car price + shipping + insurance to destination' },
    { term: 'ICD', definition: 'Import Customs Duty — main import tax (25% in Namibia)' },
    { term: 'Landed Cost', definition: 'Total cost to get the car out of port, before registration' },
    { term: 'Bill of Lading (B/L)', definition: 'Key shipping document and proof of shipment/ownership' },
    { term: 'Clearing Agent', definition: 'Licensed professional handling customs processes' },
  ]

  const countries = [
    {
      country: 'Namibia',
      flag: '🇳🇦',
      rules: [
        { text: 'Age Limit: 12 years maximum', tone: 'warn' as const },
        { text: 'Only right-hand drive allowed', tone: 'warn' as const },
        { text: 'Extended from 8 years in July 2022', tone: 'note' as const },
      ],
    },
    {
      country: 'South Africa',
      flag: '🇿🇦',
      rules: [
        { text: 'NO general used vehicle imports', tone: 'warn' as const },
        { text: 'Exceptions for:', tone: 'note' as const },
        { text: '— Returning residents (6+ months abroad)', tone: 'note' as const },
        { text: '— Immigrants with permanent residence', tone: 'note' as const },
        { text: '— Vintage vehicles (40+ years)', tone: 'note' as const },
      ],
    },
    {
      country: 'Botswana',
      flag: '🇧🇼',
      rules: [
        { text: 'NO age restrictions', tone: 'ok' as const },
        { text: 'No engine size restrictions', tone: 'ok' as const },
        { text: 'Both left and right-hand drive allowed', tone: 'ok' as const },
      ],
    },
    {
      country: 'Zambia',
      flag: '🇿🇲',
      rules: [
        { text: 'NO age restrictions', tone: 'ok' as const },
        { text: 'Vehicles over 5 years = higher surtaxes', tone: 'warn' as const },
        { text: 'Only right-hand drive (except emergency vehicles)', tone: 'warn' as const },
      ],
    },
  ]

  const timeline = [
    {
      label: 'Best case',
      range: '7–8 weeks · 51–57 days',
      desc: 'Direct shipping, no delays, documents ready, quick customs clearance.',
      tone: 'ok' as const,
    },
    {
      label: 'Realistic',
      range: '9–10 weeks · 60–70 days',
      desc: 'Standard processing, minor port delays, average customs time.',
      note: 'Most imports fall in this range',
      tone: 'standard' as const,
    },
    {
      label: 'Extended',
      range: '11–13 weeks · 75–90 days',
      desc: 'Vessel delays, port congestion, documentation issues, inspection delays.',
      tone: 'warn' as const,
    },
  ]

  const memberFeatures = [
    '3 more vehicle examples (Golf 7R, A3, A4)',
    'All 20+ import documents (PDFs)',
    'Advanced multi-country calculator',
    'Complete step-by-step guide',
    'Verified clearing agents directory',
    'Japan auction bidding guide',
    'Shipping companies comparison',
    '15+ common mistakes guide',
  ]

  const marqueeItems = [
    'Walvis Bay',
    'Trans-Kalahari',
    'NRCS certification',
    'ICD · VAT · ADV',
    'Auction sourcing',
    'Container sharing',
    'Bill of Lading',
    'Free guide · No signup',
  ]

  return (
    <main className="bg-white">
      {/* TOP NAV */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-4 min-w-0">
              <Link href="/" className="flex-shrink-0 active:opacity-70 transition-opacity">
                <Image src="/impota-logo.png" alt="IMPOTA" width={120} height={32} className="h-6 sm:h-7 w-auto" priority />
              </Link>
              <span className="hidden md:inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                <span className="h-px w-6 bg-zinc-300" />
                Free import guide
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors px-2"
              >
                Contact
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="h-9 px-4 sm:h-10 sm:px-5 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-colors text-xs sm:text-sm"
                >
                  Login
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO — Nº 01 */}
      <section className="relative isolate overflow-hidden bg-zinc-950 text-white flex flex-col min-h-[80vh]">
        <div
          className="absolute inset-0 -z-20"
          style={{ backgroundImage: 'url(/japan-cars-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
          aria-hidden
        />
        <div className="absolute inset-x-0 top-0 h-40 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-950/70 to-transparent" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/15 sm:via-zinc-950/60" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-72 -z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" aria-hidden />
        <div className="absolute -bottom-40 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber-500/[0.08] blur-3xl" aria-hidden />
        <div className="absolute top-1/4 right-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-blue-500/[0.05] blur-3xl" aria-hidden />

        <div className="hidden md:block absolute top-20 left-6 lg:left-8 h-px w-12 bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-20 left-6 lg:left-8 h-12 w-px bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-20 right-6 lg:right-8 h-px w-12 bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-20 right-6 lg:right-8 h-12 w-px bg-amber-400/40" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-20 sm:pt-24">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-medium">
            <div className="flex items-center gap-3">
              <span className="text-amber-300 font-semibold">Nº 01</span>
              <span className="h-px w-8 bg-zinc-600" />
              <span>Free import guide</span>
            </div>
            <span className="hidden md:inline-block text-zinc-500">No signup · Instant access</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 flex-1 flex items-center pt-10 pb-16 sm:pt-14">
          <div className="w-full max-w-4xl">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-amber-300 font-semibold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              Free guide for first-time importers
            </div>

            <h1 className="mt-8 sm:mt-10 font-medium tracking-tight text-white leading-[0.92] text-[clamp(2.5rem,7.5vw,6rem)]">
              <span className="block">Import your dream car</span>
              <span className="block pl-[10vw] sm:pl-[8vw] lg:pl-[12vw] italic font-light text-amber-300/95">
                without the costly mistakes.
              </span>
            </h1>

            <div className="mt-8 flex items-start gap-3 sm:gap-4 max-w-2xl">
              <span className="text-amber-400 text-2xl sm:text-3xl leading-none mt-1" aria-hidden>↳</span>
              <p className="text-base sm:text-lg lg:text-xl text-zinc-200 leading-snug">
                Learn how importing from Japan can save you thousands — or cost you everything if done wrong.
              </p>
            </div>

            <div className="mt-12 h-px w-20 bg-amber-400/60" />

            <dl className="mt-10 grid grid-cols-3 gap-6 sm:gap-10 max-w-2xl font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em]">
              <div>
                <dt className="text-zinc-500">Countries</dt>
                <dd className="mt-2 font-sans not-italic text-xl sm:text-2xl font-medium tracking-tight text-white">4</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Port</dt>
                <dd className="mt-2 font-sans not-italic text-xl sm:text-2xl font-medium tracking-tight text-white">Walvis Bay</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Read time</dt>
                <dd className="mt-2 font-sans not-italic text-xl sm:text-2xl font-medium tracking-tight text-white">15 min</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative z-10 border-t border-white/10 bg-zinc-950/60 backdrop-blur-md overflow-hidden">
          <div className="flex animate-[heroMarquee_60s_linear_infinite] whitespace-nowrap py-5 text-[11px] uppercase tracking-[0.3em] font-medium select-none">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-8">
                <span className="h-1 w-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-zinc-300">{item}</span>
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes heroMarquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* QUICK ESTIMATE — floating over hero */}
        <section className="-mt-12 sm:-mt-16 relative z-20 mb-24 sm:mb-32">
          <div className="max-w-2xl mx-auto bg-white border border-zinc-200 rounded-2xl shadow-[0_24px_64px_-16px_rgba(0,0,0,0.18)] overflow-hidden">
            <div className="px-6 sm:px-8 pt-7 pb-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5">
                <span className="text-amber-600 font-semibold">Quick estimate</span>
                <span className="text-zinc-500">Namibia</span>
              </div>

              <h3 className="mt-6 text-xl sm:text-2xl font-medium tracking-tight text-zinc-900">
                How much will your import cost?
              </h3>
              <div className="mt-3 flex items-start gap-2.5 max-w-md">
                <span className="text-amber-500 text-base leading-none mt-0.5" aria-hidden>↳</span>
                <p className="text-sm text-zinc-600 leading-snug italic font-light">
                  Instant ballpark estimate based on auction price.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="auction-price"
                    className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
                  >
                    Japan auction price (N$)
                  </label>
                  <input
                    id="auction-price"
                    type="number"
                    value={carPrice}
                    onChange={(e) => {
                      setCarPrice(e.target.value)
                      setEstimatedCost(null)
                    }}
                    placeholder="e.g., 50000"
                    className="w-full h-12 px-4 text-base border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>

                <Button
                  onClick={calculateQuickEstimate}
                  className="group w-full h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors"
                >
                  <Calculator className="mr-2 h-4 w-4" strokeWidth={1.75} />
                  Calculate estimate
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>

                {estimatedCost !== null && (
                  <div className="border-t border-zinc-200 pt-5 animate-in fade-in duration-300">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      Estimated landed cost
                    </p>
                    <p className="mt-2 font-medium tracking-tight bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent text-[clamp(2.5rem,6vw,4rem)] leading-none">
                      N${estimatedCost.toLocaleString()}
                    </p>
                    <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                      Rough estimate. Get the exact breakdown with the advanced calculator
                      (all fees, taxes, options).
                    </p>
                  </div>
                )}

                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  <span className="font-mono uppercase tracking-[0.18em] text-zinc-600">Note —</span>{' '}
                  Simplified estimate. Specific vehicle details, duties, and port charges require
                  the full calculator.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION NAVIGATION */}
        <section id="navigation" className="mb-24 sm:mb-32 scroll-mt-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">Contents</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              Jump to section.
            </h2>
            <p className="mt-4 text-zinc-600 leading-relaxed">
              Six chapters covering the full import journey.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            {sectionNav.map((item, idx) => {
              const Icon = item.icon
              return (
                <a key={idx} href={item.href} className="group bg-white p-6 sm:p-7 hover:bg-stone-50/60 transition-colors">
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-zinc-900 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600 leading-snug">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                    Read
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* REAL EXAMPLE */}
        <section id="real-example" className="mb-24 sm:mb-32 scroll-mt-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">Case study</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              Real import example.
            </h2>
            <div className="mt-4 flex items-start gap-2.5">
              <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
              <p className="italic font-light text-base sm:text-lg text-zinc-600 leading-snug">
                Actual vehicle import with complete cost breakdown and invoice.
              </p>
            </div>
          </div>

          <div className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden bg-white">
            {/* Header strip */}
            <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-zinc-200">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Vehicle · Route</p>
                  <h3 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-zinc-900">
                    2015 Audi A5 Sportback 2.0L Quattro
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-500">Japan → Walvis Bay → Namibia</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Total landed</p>
                  <p className="mt-2 font-medium tracking-tight bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent text-[clamp(2rem,5vw,3rem)] leading-none">
                    N$80,229
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="px-6 sm:px-10 py-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 pb-3 mb-2 border-b border-zinc-200">
                Cost breakdown
              </p>
              <ul className="divide-y divide-zinc-200/80">
                {costBreakdown.map((item, i) => (
                  <li key={item.label} className="flex items-center justify-between gap-4 py-4">
                    <span className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm sm:text-base text-zinc-800">{item.label}</span>
                    </span>
                    <span className="text-right">
                      <span className="block text-sm sm:text-base font-medium text-zinc-900">{item.amount}</span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{item.sub}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border border-zinc-200 rounded-xl bg-stone-50/60 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 pb-2.5 mb-3 border-b border-zinc-200">
                  Namibian customs duties & taxes
                </p>
                <ul className="space-y-2.5">
                  {namibianTaxes.map((tax) => (
                    <li key={tax.label} className="flex justify-between text-sm">
                      <span className="text-zinc-600">{tax.label}</span>
                      <span className="font-medium text-zinc-900">{tax.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex items-center justify-between pt-6 border-t border-amber-500/40">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
                  Total landed cost
                </span>
                <span className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900">N$80,229</span>
              </div>
            </div>

            {/* Invoice CTA */}
            <div className="px-6 sm:px-10 pb-8">
              <div className="border border-zinc-200 rounded-xl p-5 sm:p-6 bg-white">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100 flex-shrink-0">
                    <FileText className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">View the actual invoice</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Real invoice from Japanese auction</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowPDF(true)}
                  className="group w-full h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors"
                >
                  <FileText className="mr-2 h-4 w-4" strokeWidth={1.75} />
                  View invoice document
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  Protected viewing · No downloads
                </p>
              </div>

              {/* Upsell strip */}
              <div className="mt-6 border-t border-b border-zinc-200 py-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold mb-1">
                    1 of 4 vehicle examples
                  </p>
                  <p className="text-sm text-zinc-700">
                    Get full access to all imports (Golf 7R, Audi A3, Audi A4) + calculator + 20+ documents.
                  </p>
                </div>
                <a
                  href="#get-access"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-amber-700 transition-colors whitespace-nowrap"
                >
                  $6.06 USD
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* IMPORT TERMS */}
        <section id="import-terms" className="mb-24 sm:mb-32 scroll-mt-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">Glossary</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              Essential import terms.
            </h2>
            <div className="mt-4 flex items-start gap-2.5">
              <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
              <p className="italic font-light text-base sm:text-lg text-zinc-600 leading-snug">
                Your first defense against costly mistakes.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-b border-zinc-200">
            {importTerms.map((item, i) => (
              <div key={item.term} className="grid sm:grid-cols-[10rem_1fr] gap-x-8 gap-y-2 py-5 border-b border-zinc-200 last:border-b-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] flex-shrink-0 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-medium text-zinc-900">{item.term}</h4>
                </div>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed sm:pl-0 pl-10">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>

          {/* Glossary CTA */}
          <div className="mt-12 border border-zinc-200 rounded-2xl bg-stone-50/60 p-8 sm:p-10">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                Complete dictionary
              </p>
              <h3 className="mt-4 text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
                60+ additional import terms inside.
              </h3>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                Full access to auction reports, shipping logistics, customs documentation, and port
                handling — organized by category for easy learning.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
              {[
                { title: 'Auction terms', desc: 'Japanese auction terminology and vehicle grading' },
                { title: 'Shipping & logistics', desc: 'Ocean freight and transportation methods' },
                { title: 'Customs & docs', desc: 'Import documentation and clearance requirements' },
              ].map((cat) => (
                <div key={cat.title} className="bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                    {cat.title}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <ValidatedCheckoutButton
                tier="mastery"
                country="na"
                className="group inline-flex h-12 px-7 items-center bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors"
              >
                Get full access — $6.06 USD
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ValidatedCheckoutButton>
              <p className="mt-4 text-xs text-zinc-500">
                Includes: complete terms dictionary + 4 vehicle examples + advanced calculator + 20+ documents.
              </p>
            </div>
          </div>
        </section>

        {/* COUNTRY RULES */}
        <section id="country-rules" className="mb-24 sm:mb-32 scroll-mt-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">Regulations</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              Country import rules.
            </h2>
            <div className="mt-4 flex items-start gap-2.5">
              <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
              <p className="italic font-light text-base sm:text-lg text-zinc-600 leading-snug">
                Wrong vehicle age = total loss. Each country has strict rules.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            {countries.map((c) => (
              <div key={c.country} className="bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{c.flag}</span>
                    <h3 className="text-lg font-medium tracking-tight text-zinc-900">{c.country}</h3>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">Rules</span>
                </div>
                <ul className="space-y-2.5">
                  {c.rules.map((rule, rIdx) => {
                    const Icon =
                      rule.tone === 'ok' ? CheckCircle2 : rule.tone === 'warn' ? AlertTriangle : null
                    const iconColor =
                      rule.tone === 'ok'
                        ? 'text-emerald-600'
                        : rule.tone === 'warn'
                          ? 'text-red-500'
                          : 'text-zinc-400'
                    const textColor =
                      rule.tone === 'ok' ? 'text-zinc-800' : rule.tone === 'warn' ? 'text-zinc-800' : 'text-zinc-600'
                    return (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        {Icon ? (
                          <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${iconColor}`} strokeWidth={1.75} />
                        ) : (
                          <span className="mt-2 h-1 w-1 rounded-full bg-zinc-300 flex-shrink-0" aria-hidden />
                        )}
                        <span className={`text-sm leading-snug ${textColor}`}>{rule.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* WARNING — editorial */}
        <section id="warning" className="mb-24 sm:mb-32 scroll-mt-20">
          <div className="border border-zinc-200 rounded-2xl bg-stone-50/60 p-8 sm:p-12">
            <div className="flex items-start gap-3 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold">
                [ Warning ]
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                Real case
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 leading-tight max-w-3xl">
              Container held 7 months.
              <span className="block italic font-light text-red-600 sm:pl-12 mt-1">
                Massive fees accumulated.
              </span>
            </h3>

            <div className="mt-8 h-px w-16 bg-red-500/60" />

            <div className="mt-8 grid sm:grid-cols-2 gap-8 sm:gap-12 max-w-4xl">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-2">
                  The problem
                </p>
                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                  A single wrong choice made before shipping.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 font-semibold mb-2">
                  The solution
                </p>
                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                  Proper vetting process (included in the full guide).
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200">
              <p className="text-sm text-zinc-700 leading-relaxed max-w-2xl">
                Learn the{' '}
                <span className="font-semibold text-zinc-900">9 deal-breaker mistakes</span> that
                can cost you everything.
              </p>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="mb-24 sm:mb-32 scroll-mt-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">Timeline</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              Realistic expectations.
            </h2>
            <div className="mt-4 flex items-start gap-2.5">
              <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
              <p className="italic font-light text-base sm:text-lg text-zinc-600 leading-snug">
                Imports via Walvis Bay — what to expect.
              </p>
            </div>
          </div>

          <div className="mt-12 divide-y divide-zinc-200/80 border-y border-zinc-200/80">
            {timeline.map((item, i) => {
              const accent =
                item.tone === 'ok'
                  ? 'text-emerald-600'
                  : item.tone === 'warn'
                    ? 'text-amber-700'
                    : 'text-amber-600'
              return (
                <article
                  key={item.range}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-8 sm:py-10"
                >
                  <div className="sm:col-span-2">
                    <p className={`font-mono text-xs uppercase tracking-[0.22em] font-semibold ${accent}`}>
                      Phase {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <div className="sm:col-span-3">
                    <p className="text-base font-medium text-zinc-900">{item.label}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      {item.range}
                    </p>
                  </div>
                  <div className="sm:col-span-7">
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">{item.desc}</p>
                    {item.note && (
                      <p className={`mt-3 text-sm font-medium ${accent}`}>↳ {item.note}</p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* CONTAINER SHARING */}
        <section id="container-sharing" className="mb-24 sm:mb-32 scroll-mt-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">Shipping</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              Save N$40,000+ on shipping.
            </h2>
            <div className="mt-4 flex items-start gap-2.5">
              <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
              <p className="italic font-light text-base sm:text-lg text-zinc-600 leading-snug">
                Container sharing cuts your ocean freight cost by more than half.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            <div className="bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
                  Solo shipping
                </p>
                <Ship className="h-4 w-4 text-zinc-400" strokeWidth={1.75} />
              </div>
              <p className="font-medium tracking-tight text-zinc-900 text-[clamp(2.5rem,6vw,4rem)] leading-none">
                N$75,000
              </p>
              <p className="mt-3 text-sm text-zinc-500">40ft container · 1 vehicle</p>
            </div>

            <div className="bg-white p-6 sm:p-8 relative">
              <div className="flex items-center justify-between mb-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                  Container sharing
                </p>
                <Ship className="h-4 w-4 text-amber-600" strokeWidth={1.75} />
              </div>
              <p className="font-medium tracking-tight bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent text-[clamp(2.5rem,6vw,4rem)] leading-none">
                N$18,750
              </p>
              <p className="mt-3 text-sm text-zinc-500">40ft container ÷ 4 cars</p>
              <p className="mt-2 text-sm font-semibold text-emerald-700">Save N$56,250</p>
            </div>
          </div>

          <div className="mt-8 border-t border-b border-zinc-200 py-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-5">
              How it works
            </p>
            <ul className="space-y-3 max-w-2xl">
              {[
                'A 40ft container fits 4–5 cars comfortably',
                'Total container cost: N$75,000',
                'Split 4 ways = N$18,750 each',
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700">
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-6 flex-shrink-0 pt-1.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-sm sm:text-base text-zinc-700">
                <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-6 flex-shrink-0 pt-1.5">04</span>
                <span className="leading-relaxed">
                  Find container partners via{' '}
                  <a
                    href="https://contshare.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline transition-colors"
                  >
                    ContShare.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">Testimony</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              From members.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            {[
              {
                initial: 'D',
                name: 'D. Coetzee',
                role: 'Namibia · Recent member',
                quote:
                  "Thank you so much for the site and helpful information, I really appreciate it. I am cautious of using any agent because it looks like there are many scams. The education we really appreciate it.",
                date: null,
              },
              {
                initial: 'O',
                name: 'Olivia S.L.',
                role: 'Namibia · First online customer',
                quote:
                  'Checking in to let you know guide is well written and structured. I still need to go through when I have more uninterrupted time. Will forward any questions after.',
                date: 'Verified · Oct 2025',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-full bg-amber-50 ring-1 ring-amber-200 flex items-center justify-center font-medium text-amber-700">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{t.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-0.5">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed italic font-light">
                  "{t.quote}"
                </p>
                {t.date && (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                    {t.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA — Nº 02 Membership */}
      <section id="get-access" className="relative isolate overflow-hidden bg-zinc-950 text-white flex flex-col">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_85%,rgba(251,191,36,0.14),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(37,99,235,0.10),transparent_45%)]" aria-hidden />
        <div className="absolute -top-40 -right-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber-500/[0.06] blur-3xl" aria-hidden />
        <div className="absolute bottom-1/4 left-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-blue-500/[0.05] blur-3xl" aria-hidden />

        <div className="hidden md:block absolute top-24 left-6 lg:left-8 h-px w-12 bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-24 left-6 lg:left-8 h-12 w-px bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-24 right-6 lg:right-8 h-px w-12 bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-24 right-6 lg:right-8 h-12 w-px bg-amber-400/40" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-24 sm:pt-28">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-medium">
            <div className="flex items-center gap-3">
              <span className="text-amber-300 font-semibold">Nº 02</span>
              <span className="h-px w-8 bg-zinc-600" />
              <span>Membership</span>
            </div>
            <span className="hidden md:inline-block text-zinc-500">Lifetime · One payment</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-amber-300 font-semibold">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
            Get the complete import system
          </div>

          <h2 className="mt-10 sm:mt-12 font-medium tracking-tight text-white leading-[0.9] text-[clamp(2.5rem,7.5vw,5.5rem)]">
            <span className="block">One payment.</span>
            <span className="block pl-[10vw] sm:pl-[8vw] lg:pl-[12vw] italic font-light text-amber-300/95">
              Lifetime access.
            </span>
          </h2>

          <div className="mt-8 flex items-start gap-3 sm:gap-4 max-w-3xl">
            <span className="text-amber-400 text-2xl sm:text-3xl leading-none mt-1" aria-hidden>↳</span>
            <p className="text-lg sm:text-xl lg:text-2xl text-amber-100/90 leading-snug tracking-tight">
              Everything you need to import cars successfully — for as long as the platform exists.
            </p>
          </div>

          <div className="mt-14 sm:mt-16 h-px w-20 bg-amber-400/60" />

          <div className="mt-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-zinc-500">Investment</p>
              <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                <span className="font-medium tracking-tight bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent text-[clamp(4rem,9vw,7rem)] leading-none">
                  $6.06
                </span>
                <span className="font-mono text-sm sm:text-base text-zinc-400 uppercase tracking-[0.2em]">USD</span>
              </div>
              <p className="mt-5 text-sm text-zinc-400 leading-relaxed max-w-xs">
                Approximately N$100 / R100 — one-time payment, instant access.
              </p>

              <div className="mt-10 flex flex-col items-start gap-4">
                <ValidatedCheckoutButton
                  tier="mastery"
                  country="na"
                  size="lg"
                  className="group h-14 px-8 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors text-base"
                >
                  Get instant access
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ValidatedCheckoutButton>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  <span className="text-white font-medium">5 Namibians joined this week</span> · 7-day refund if no content accessed.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] border-b border-white/10 pb-3">
                <span className="text-zinc-500">Everything you get</span>
                <span className="text-amber-300">08 items</span>
              </div>
              <ul className="divide-y divide-white/[0.06]">
                {memberFeatures.map((item, i) => (
                  <li key={item} className="flex items-center justify-between gap-4 py-4">
                    <span className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm sm:text-base text-zinc-200 leading-snug">{item}</span>
                    </span>
                    <span className="h-1 w-1 rounded-full bg-amber-400/60 flex-shrink-0" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 bg-zinc-950/40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-medium">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-amber-300">Payment</span>
              <span className="h-px w-8 bg-zinc-600" />
              <span>Visa · Mastercard · Amex</span>
            </div>
            <span className="text-zinc-500">Secure checkout · Stripe</span>
          </div>
        </div>
      </section>

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
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full px-4 py-3 shadow-lg shadow-green-600/30 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
        <span className="hidden sm:inline text-sm font-medium">Questions? Chat with us</span>
      </a>
    </main>
  )
}
