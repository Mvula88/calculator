'use client'

import PortalPageNavigation from '@/components/portal/PortalPageNavigation'
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react'

interface ShippingCompany {
  name: string
  logo: string
  description: string
  routes: string[]
  avgTransitTime: string
  priceRange: string
  rating: number
  contact: {
    namibia?: { phone: string; email: string; address?: string }
    southAfrica?: { phone: string; email: string; address?: string }
    website: string
  }
  features: string[]
}

const shippingCompanies: ShippingCompany[] = [
  {
    name: 'Maersk Line',
    logo: '🚢',
    description: "World's largest container shipping company with extensive African coverage",
    routes: ['Europe → Southern Africa', 'Asia → Southern Africa', 'Americas → Africa'],
    avgTransitTime: '75–90 days',
    priceRange: 'R70,000 – R165,000',
    rating: 4.5,
    contact: {
      namibia: { phone: '+264 61 256 835', email: 'nam.import@maersk.com', address: 'Walvis Bay, Namibia' },
      southAfrica: { phone: '+27 21 408 6800', email: 'southafrica@maersk.com', address: 'Cape Town, South Africa' },
      website: 'https://www.maersk.com',
    },
    features: ['Largest fleet', 'Best tracking system', 'Premium insurance options'],
  },
  {
    name: 'MSC (Mediterranean Shipping)',
    logo: '⚓',
    description: 'Second largest global carrier with competitive rates to Africa',
    routes: ['Europe → West Africa', 'Mediterranean → Southern Africa', 'Asia → Africa'],
    avgTransitTime: '75–90 days',
    priceRange: 'R70,000 – R165,000',
    rating: 4.3,
    contact: {
      namibia: { phone: '+264 64 206 695', email: 'wvb.import@msc.com', address: 'Port of Walvis Bay, Namibia' },
      southAfrica: { phone: '+27 21 508 2200', email: 'msc.southafrica@msc.com', address: 'Cape Town & Durban, South Africa' },
      website: 'https://www.msc.com',
    },
    features: ['Competitive pricing', 'Frequent sailings', 'Good Africa network'],
  },
  {
    name: 'CMA CGM',
    logo: '🌊',
    description: 'French carrier with strong Europe–Africa connections',
    routes: ['France → West Africa', 'Europe → Southern Africa', 'Asia → Africa via Europe'],
    avgTransitTime: '75–90 days',
    priceRange: 'R70,000 – R165,000',
    rating: 4.2,
    contact: {
      namibia: { phone: '+264 64 202 082', email: 'walvisbay@cma-cgm.com', address: 'Walvis Bay, Namibia' },
      southAfrica: { phone: '+27 21 405 0500', email: 'capetown.genmbox@cma-cgm.com', address: 'Cape Town, South Africa' },
      website: 'https://www.cma-cgm.com',
    },
    features: ['Eco-friendly vessels', 'French ports expertise', 'Flexible booking'],
  },
  {
    name: 'Hapag-Lloyd',
    logo: '🛳️',
    description: 'German precision shipping with reliable Africa services',
    routes: ['Germany → Southern Africa', 'Europe → East Africa', 'Middle East → Africa'],
    avgTransitTime: '75–90 days',
    priceRange: 'R70,000 – R165,000',
    rating: 4.4,
    contact: {
      namibia: { phone: '+264 64 274 800', email: 'nam.sales@hlag.com', address: 'Walvis Bay, Namibia' },
      southAfrica: { phone: '+27 21 421 6063', email: 'sales.southafrica@hlag.com', address: 'Cape Town, South Africa' },
      website: 'https://www.hapag-lloyd.com',
    },
    features: ['German reliability', 'Excellent customer service', 'Quality containers'],
  },
  {
    name: 'MOL (Mitsui O.S.K. Lines)',
    logo: '🇯🇵',
    description: 'Japanese carrier ideal for Japan to Africa vehicle shipments',
    routes: ['Japan → Southern Africa', 'Asia → Africa', 'Japan → East Africa'],
    avgTransitTime: '75–90 days',
    priceRange: 'R70,000 – R165,000',
    rating: 4.6,
    contact: {
      namibia: { phone: '+264 64 201 288', email: 'namibia@molgroup.com', address: 'Walvis Bay, Namibia' },
      southAfrica: { phone: '+27 11 880 0570', email: 'mol.southafrica@molgroup.com', address: 'Johannesburg & Durban, South Africa' },
      website: 'https://www.mol.co.jp',
    },
    features: ['Japan route specialist', 'Vehicle shipping expert', 'Careful handling'],
  },
  {
    name: 'COSCO Shipping',
    logo: '🏴',
    description: 'Chinese state-owned carrier with competitive Asia–Africa rates',
    routes: ['China → Africa', 'Asia → Southern Africa', 'Far East → West Africa'],
    avgTransitTime: '75–90 days',
    priceRange: 'R70,000 – R165,000',
    rating: 4.0,
    contact: {
      namibia: { phone: '+264 64 209 266', email: 'walvisbay@cosco.com', address: 'Walvis Bay, Namibia' },
      southAfrica: { phone: '+27 21 419 8672', email: 'capetown@cosco.com', address: 'Cape Town, South Africa' },
      website: 'https://www.cosco-shipping.com',
    },
    features: ['Budget-friendly', 'China direct routes', 'Large capacity'],
  },
]

const bookingTips = [
  'Always get quotes from at least 3 shipping companies',
  'Book 4–6 weeks in advance for better rates',
  'Ask about consolidation options if shipping a single vehicle',
  'Confirm insurance coverage and claim procedures',
  'Request references from other vehicle importers',
]

const choiceGuide = [
  {
    title: 'For Japan imports',
    text: 'Maersk and MOL are your best choices. Maersk offers the most reliable service with extensive coverage, while MOL specialises in RoRo (Roll-on/Roll-off) with direct routes from Japanese ports.',
  },
  {
    title: 'For European imports',
    text: 'Maersk, MSC, or Hapag-Lloyd offer the best coverage from European ports. Compare their schedules as they vary by departure port.',
  },
  {
    title: 'For budget imports',
    text: 'Consider COSCO for the lowest rates, or use ContShare to share container space and save significantly.',
  },
]

export default function ShippingContent() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-zinc-200">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-600 font-semibold mb-3">
            Shipping
          </p>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-[1.05]">
            Shipping companies
            <span className="block italic font-light text-amber-600 pl-6 sm:pl-10">
              &amp; container booking.
            </span>
          </h1>
          <div className="mt-4 flex items-start gap-2.5 max-w-2xl">
            <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
            <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
              Connect with trusted shipping lines. Compare rates, routes, and transit times.
            </p>
          </div>
        </div>

        {/* CONTAINER SHARING — editorial highlight */}
        <section className="mb-12 border border-zinc-200 rounded-2xl bg-stone-50/60 p-6 sm:p-8">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-5">
            <span className="text-amber-600 font-semibold">Container sharing</span>
            <span className="text-emerald-700 font-semibold">Recommended</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900">
            Save on shipping with container sharing.
          </h2>
          <p className="mt-3 text-sm text-zinc-600 leading-relaxed max-w-2xl">
            Share container space with other importers and reduce shipping costs significantly.
            Perfect for single vehicle imports.
          </p>

          <ul className="mt-5 grid sm:grid-cols-3 gap-x-6 gap-y-2 max-w-2xl">
            {[
              'Optimised shipping costs',
              'Secure & insured',
              'Same transit times',
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
                <span className="font-mono text-[10px] text-amber-600 tracking-[0.2em] flex-shrink-0 pt-1 font-semibold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <a
              href="https://www.contshare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 px-5 rounded-full bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(251,191,36,0.5)] transition-colors"
            >
              Visit ContShare
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </section>

        {/* BOOKING TIPS */}
        <section className="mb-12 border-t border-b border-zinc-200 py-6">
          <div className="flex items-start gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-1 whitespace-nowrap">
              [ Booking tips ]
            </span>
            <ol className="space-y-2.5 flex-1 max-w-3xl">
              {bookingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-5 flex-shrink-0 pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SHIPPING COMPANIES */}
        <section className="mb-12">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-6">
            <span className="text-blue-600 font-semibold">Major shipping lines</span>
            <span className="text-zinc-500">
              {String(shippingCompanies.length).padStart(2, '0')} carriers · Africa
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            {shippingCompanies.map((c, i) => (
              <article key={c.name} className="bg-white p-6 sm:p-7 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-stone-50 ring-1 ring-zinc-200 text-2xl">
                      {c.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-zinc-900">{c.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-3 w-3 ${
                              j < Math.floor(c.rating)
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-zinc-200'
                            }`}
                          />
                        ))}
                        <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          {c.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed mb-5">{c.description}</p>

                {/* Routes */}
                <div className="mb-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    Main routes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.routes.map((route) => (
                      <span
                        key={route}
                        className="text-xs text-zinc-700 bg-stone-50 border border-zinc-200 px-2 py-1 rounded"
                      >
                        {route}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-zinc-200">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Transit time</p>
                    <p className="mt-1 text-sm font-medium text-zinc-900">{c.avgTransitTime}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Price range</p>
                    <p className="mt-1 text-sm font-medium text-amber-700">{c.priceRange}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    Features
                  </p>
                  <ul className="space-y-1">
                    {c.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs text-zinc-700">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="space-y-3 mb-5 flex-1">
                  {c.contact.namibia && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-1.5">
                        🇳🇦 Namibia
                      </p>
                      <div className="space-y-1 text-xs">
                        <a href={`tel:${c.contact.namibia.phone}`} className="flex items-center gap-2 text-zinc-700 hover:text-amber-700 transition-colors">
                          <Phone className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} />
                          {c.contact.namibia.phone}
                        </a>
                        <a href={`mailto:${c.contact.namibia.email}`} className="flex items-center gap-2 text-zinc-700 hover:text-amber-700 transition-colors break-all">
                          <Mail className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} />
                          {c.contact.namibia.email}
                        </a>
                        {c.contact.namibia.address && (
                          <p className="flex items-start gap-2 text-zinc-500">
                            <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                            <span>{c.contact.namibia.address}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {c.contact.southAfrica && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-1.5">
                        🇿🇦 South Africa
                      </p>
                      <div className="space-y-1 text-xs">
                        <a href={`tel:${c.contact.southAfrica.phone}`} className="flex items-center gap-2 text-zinc-700 hover:text-amber-700 transition-colors">
                          <Phone className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} />
                          {c.contact.southAfrica.phone}
                        </a>
                        <a href={`mailto:${c.contact.southAfrica.email}`} className="flex items-center gap-2 text-zinc-700 hover:text-amber-700 transition-colors break-all">
                          <Mail className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} />
                          {c.contact.southAfrica.email}
                        </a>
                        {c.contact.southAfrica.address && (
                          <p className="flex items-start gap-2 text-zinc-500">
                            <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                            <span>{c.contact.southAfrica.address}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <a
                    href={c.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-zinc-700 hover:text-amber-700 transition-colors break-all"
                  >
                    <Globe className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} />
                    {c.contact.website.replace('https://', '')}
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                </div>

                {/* CTA */}
                <a
                  href={c.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-11 items-center justify-center gap-2 px-5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-sm font-medium text-zinc-900 transition-colors"
                >
                  Get quote
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* HOW TO CHOOSE */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
              Guidance
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
              How to choose.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            {choiceGuide.map((g, i) => (
              <div key={g.title} className="bg-white p-6 sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                  {String(i + 1).padStart(2, '0')} · {g.title}
                </p>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {i === 2 ? (
                    <>
                      Consider COSCO for the lowest rates, or use{' '}
                      <a
                        href="https://www.contshare.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline"
                      >
                        ContShare
                      </a>{' '}
                      to share container space and save significantly.
                    </>
                  ) : (
                    g.text
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <PortalPageNavigation currentPath="/portal/book-slot" />
    </main>
  )
}
