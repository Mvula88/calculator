'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ValidatedCheckoutButton from '@/components/validated-checkout-button'
import { GuidePageSkeleton } from '@/components/skeletons/GuidePageSkeleton'
import {
  Calculator,
  FileText,
  Ship,
  Globe,
  Lock,
  BookOpen,
  User,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react'
import GuideHeader from '@/components/GuideHeader'
import WhatsAppButton from '@/components/WhatsAppButton'

const faqs = [
  {
    question: 'How much does it cost to import a car from Japan to Zambia?',
    answer:
      'Import costs vary significantly based on vehicle type, shipping method, and current regulations. Our guide provides comprehensive cost breakdowns and reveals hidden fees to help you make informed decisions.',
  },
  {
    question: 'What are the benefits of importing directly from Japan?',
    answer:
      "Importing directly gives you access to a wider selection of quality vehicles, transparent pricing, and detailed vehicle history. Our guide includes a comprehensive calculator to help you understand all costs involved.",
  },
  {
    question: 'What are the biggest mistakes first-time importers make?',
    answer:
      'First-time importers often make costly mistakes. Our complete guide addresses the top 5 pitfalls with step-by-step solutions based on real import experiences.',
  },
  {
    question: 'Do I need connections or experience to import?',
    answer:
      "No prior experience needed. Our comprehensive guides provide everything from verified agent contacts to exact forms and procedures. You'll import like a pro from day one.",
  },
]

const processSteps = [
  {
    icon: Globe,
    title: 'Source premium vehicles',
    description:
      "Access Japan's auction system with 50,000+ quality vehicles daily. Learn insider strategies for finding the best deals.",
  },
  {
    icon: Calculator,
    title: 'Calculate true costs',
    description:
      'Master our comprehensive cost calculator. Know exact duties, VAT, shipping, and hidden fees before you buy.',
  },
  {
    icon: Ship,
    title: 'Secure professional shipping',
    description:
      'Connect with verified shipping lines and clearing agents. Access container sharing opportunities to split costs with other importers.',
  },
]

const marqueeItems = [
  'Via Walvis Bay',
  'Katima Mulilo corridor',
  'ZRA duties',
  'ZABS certification',
  'Auction sourcing',
  'Container sharing',
  'Lifetime access',
  'Step-by-step program',
]

export default function ZambiaGuidePage() {
  const [user, setUser] = useState<any>(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUser(user)
      setTimeout(() => setPageLoading(false), 500)
    }
    checkUser()
  }, [])

  if (pageLoading) return <GuidePageSkeleton />

  return (
    <>
      <h1 className="sr-only">
        Import Cars from Japan to Zambia 2024 — Complete Cross-Border Guide
      </h1>

      <GuideHeader
        country="zm"
        trusted="Real Import Experience, Real Guidance"
        primaryColor="emerald-600"
        secondaryColor="teal-600"
      />

      <main className="bg-white" itemScope itemType="https://schema.org/Guide">
        {/* HERO — Nº 01 */}
        <section className="relative isolate overflow-hidden bg-zinc-950 flex flex-col min-h-[92vh]">
          <div
            className="absolute inset-0 -z-20"
            style={{
              backgroundImage: 'url(/japan-cars-hero.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
            }}
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 h-40 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-950/70 to-transparent" aria-hidden />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/15 sm:via-zinc-950/60" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-72 -z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" aria-hidden />
          <div className="absolute -bottom-40 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber-500/[0.08] blur-3xl" aria-hidden />
          <div className="absolute top-1/4 right-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-blue-500/[0.05] blur-3xl" aria-hidden />

          <div className="hidden md:block absolute top-28 left-6 lg:left-8 h-px w-12 bg-amber-400/40" aria-hidden />
          <div className="hidden md:block absolute top-28 left-6 lg:left-8 h-12 w-px bg-amber-400/40" aria-hidden />
          <div className="hidden md:block absolute top-28 right-6 lg:right-8 h-px w-12 bg-amber-400/40" aria-hidden />
          <div className="hidden md:block absolute top-28 right-6 lg:right-8 h-12 w-px bg-amber-400/40" aria-hidden />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-28 sm:pt-32">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-medium">
              <div className="flex items-center gap-3">
                <span className="text-amber-300 font-semibold">Nº 01</span>
                <span className="h-px w-8 bg-zinc-600" />
                <span>Zambia · Country guide</span>
              </div>
              <span className="hidden md:inline-block text-zinc-500">Katima Mulilo · 2024 — 2025</span>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 flex-1 flex items-center pt-12 pb-20 sm:pt-16">
            <div className="w-full">
              <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-amber-300 font-semibold">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                Import education for Zambia
              </div>

              <h2 className="mt-10 sm:mt-12 font-medium tracking-tight text-white leading-[0.9] text-[clamp(2.75rem,8.5vw,7rem)]">
                <span className="block">Import cars</span>
                <span className="block pl-[12vw] sm:pl-[10vw] lg:pl-[14vw]">from Japan.</span>
              </h2>

              <div className="mt-8 sm:mt-10 flex items-start gap-3 sm:gap-4 max-w-3xl">
                <span className="text-amber-400 text-3xl sm:text-4xl leading-none mt-1" aria-hidden>↳</span>
                <p className="italic font-light text-2xl sm:text-3xl lg:text-4xl text-amber-100/95 leading-[1.1] tracking-tight">
                  A step-by-step guide for Zambia.
                </p>
              </div>

              <div className="mt-12 sm:mt-14 h-px w-20 bg-amber-400/60" />

              <div className="mt-8 sm:mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7">
                  <p className="text-base sm:text-lg text-zinc-200 leading-relaxed max-w-xl">
                    Educational resources and guides to help you understand the process of
                    importing a quality used car from Japan to Zambia — from research to
                    documentation.
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row gap-3" id="signup">
                    {user ? (
                      <Button
                        size="lg"
                        className="group h-12 px-7 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors"
                        asChild
                      >
                        <Link href="/portal">
                          <Lock className="mr-2 h-4 w-4" />
                          Access member portal
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="lg"
                          className="group h-12 px-7 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors"
                          asChild
                        >
                          <Link href="/import-guide">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Read the free guide
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </Button>
                        <Link
                          href="/auth/login"
                          className="inline-flex h-12 items-center justify-center gap-2 px-6 rounded-full border border-white/25 bg-white/[0.04] backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/40 transition-colors text-sm font-medium"
                        >
                          <User className="h-4 w-4" />
                          Member login
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <dl className="lg:col-span-5 grid grid-cols-3 gap-x-6 sm:gap-x-8 max-w-md lg:max-w-none lg:justify-self-end font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em]">
                  <div>
                    <dt className="text-zinc-500">Country</dt>
                    <dd className="mt-2 font-sans not-italic text-2xl sm:text-3xl font-medium tracking-tight text-white">Zambia</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Port</dt>
                    <dd className="mt-2 font-sans not-italic text-2xl sm:text-3xl font-medium tracking-tight text-white">Walvis Bay</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Access</dt>
                    <dd className="mt-2 font-sans not-italic text-2xl sm:text-3xl font-medium tracking-tight text-white">Lifetime</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

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

        {/* PILLARS */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">What we provide</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
                Everything you need to import successfully.
              </h2>
              <p className="mt-4 text-zinc-600 leading-relaxed">
                Professional tools and resources covering every stage of the process.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
              {[
                { icon: Calculator, title: 'Cost calculator', copy: 'Calculate every import cost — duties, VAT, shipping, clearing — before you commit.' },
                { icon: FileText, title: 'Complete guides', copy: 'Step-by-step process documentation from auction bid to driveway.' },
                { icon: Ship, title: 'Container sharing', copy: 'Connect with trusted platforms to share container space and cut shipping costs.' },
              ].map(({ icon: Icon, title, copy }, idx) => (
                <div key={title} className="bg-white p-8 sm:p-10">
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-100">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                      Nº 0{idx + 1}
                    </span>
                    <Icon className="h-4 w-4 text-zinc-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-medium tracking-tight text-zinc-900">{title}</h3>
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-gradient-to-b from-stone-50 to-stone-100/50 border-y border-stone-200" aria-labelledby="learn-section">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">The process</p>
              <h2 id="learn-section" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 text-balance leading-[1.05]">
                Master every step of the import process.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
                Professional guidance for importing vehicles from Japan to Zambia via Walvis Bay
                and the Katima Mulilo corridor. No experience required — our comprehensive system
                covers everything.
              </p>
            </div>

            <div className="mt-16 sm:mt-20 divide-y divide-zinc-200/80">
              {processSteps.map(({ icon: Icon, title, description }, i) => (
                <article key={title} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 sm:py-12">
                  <div className="md:col-span-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-600 font-semibold">
                      Step {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 ring-1 ring-zinc-200 shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 leading-tight">
                      {title}
                    </h3>
                    <p className="mt-3 text-base text-zinc-600 leading-relaxed max-w-2xl">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">Common questions</p>
              <h2 id="faq-heading" className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance leading-[1.05]">
                Questions, answered.
              </h2>
              <p className="mt-4 text-zinc-600 leading-relaxed">
                The most common questions about importing cars from Japan to Zambia.
              </p>
            </div>

            <div className="mt-14 sm:mt-16 border-t border-zinc-200" itemScope itemType="https://schema.org/FAQPage">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-zinc-200"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left py-6 sm:py-8 flex items-start gap-6 group"
                    aria-expanded={expandedFaq === index}
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-600 font-semibold flex-shrink-0 pt-1.5">
                      Q.{String(index + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="flex-1 text-lg sm:text-xl font-medium text-zinc-900 leading-snug pr-4"
                      itemProp="name"
                    >
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`flex-shrink-0 h-5 w-5 text-zinc-400 transition-transform duration-300 mt-1 ${expandedFaq === index ? 'rotate-180 text-zinc-900' : ''}`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div
                      className="pb-8 pl-[3.75rem] sm:pl-[4.5rem] pr-4"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div className="flex items-start gap-3 max-w-3xl">
                        <span className="text-amber-500 text-xl leading-none mt-1" aria-hidden>↳</span>
                        <p
                          className="italic font-light text-base sm:text-lg text-zinc-600 leading-relaxed"
                          itemProp="text"
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERMISSION */}
        {!user && (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
              <div className="max-w-5xl mx-auto">
                <div className="grid sm:grid-cols-[8rem_1fr] gap-x-10 gap-y-6 items-start border-t border-b border-zinc-200 py-10 sm:py-12">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 flex sm:flex-col gap-3 sm:gap-2">
                    <span className="text-amber-600 font-semibold">Nº 01·5</span>
                    <span className="hidden sm:block h-px w-8 bg-zinc-300" />
                    <span>Preview</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.1]">
                      Not sure yet?
                    </h3>
                    <div className="mt-4 flex items-start gap-3">
                      <span className="text-amber-500 text-xl sm:text-2xl leading-none mt-1" aria-hidden>↳</span>
                      <p className="italic font-light text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
                        See a real vehicle import — actual costs and invoice — before deciding.
                      </p>
                    </div>
                    <Link
                      href="/import-guide"
                      className="mt-6 group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-amber-700 transition-colors"
                    >
                      View free guide
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PRICING — Nº 02 */}
        {!user && (
          <section id="pricing" className="relative isolate overflow-hidden bg-zinc-950 text-white flex flex-col">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_85%,rgba(251,191,36,0.14),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(37,99,235,0.10),transparent_45%)]" aria-hidden />
            <div className="absolute -top-40 -right-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber-500/[0.06] blur-3xl" aria-hidden />
            <div className="absolute bottom-1/4 left-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-blue-500/[0.05] blur-3xl" aria-hidden />

            <div className="hidden md:block absolute top-24 left-6 lg:left-8 h-px w-12 bg-amber-400/40" aria-hidden />
            <div className="hidden md:block absolute top-24 left-6 lg:left-8 h-12 w-px bg-amber-400/40" aria-hidden />
            <div className="hidden md:block absolute top-24 right-6 lg:right-8 h-px w-12 bg-amber-400/40" aria-hidden />
            <div className="hidden md:block absolute top-24 right-6 lg:right-8 h-12 w-px bg-amber-400/40" aria-hidden />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-16 sm:pt-20">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-medium">
                <div className="flex items-center gap-3">
                  <span className="text-amber-300 font-semibold">Nº 02</span>
                  <span className="h-px w-8 bg-zinc-600" />
                  <span>Membership</span>
                </div>
                <span className="hidden md:inline-block text-zinc-500">Lifetime · One payment</span>
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-12 sm:py-16">
              <h2 className="font-medium tracking-tight text-white leading-[0.92] text-[clamp(2.25rem,6.5vw,4.75rem)]">
                <span className="block">One payment.</span>
                <span className="block pl-[10vw] sm:pl-[8vw] lg:pl-[12vw] italic font-light text-amber-300/95">Lifetime access.</span>
              </h2>

              <p className="mt-6 max-w-xl text-base sm:text-lg text-zinc-300 leading-snug">
                <span className="text-amber-400 mr-2" aria-hidden>↳</span>
                Everything you need to import — for as long as IMPOTA exists.
              </p>

              <div className="mt-10 grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-medium tracking-tight bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent text-[clamp(3.5rem,7.5vw,6rem)] leading-none">$12</span>
                    <span className="font-mono text-sm text-zinc-400 uppercase tracking-[0.2em]">USD</span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-400">≈ K280 · one-time · instant access</p>

                  <ValidatedCheckoutButton
                    tier="mastery"
                    country="zm"
                    size="lg"
                    className="mt-8 h-14 px-8 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors text-base"
                  >
                    Get lifetime access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </ValidatedCheckoutButton>
                  <p className="mt-3 text-xs text-zinc-500 max-w-xs">7-day refund if no content has been accessed.</p>
                </div>

                <div className="lg:col-span-7">
                  <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] border-b border-white/10 pb-3">
                    <span className="text-zinc-500">What's inside</span>
                    <span className="text-amber-300">5 essentials</span>
                  </div>
                  <ul className="divide-y divide-white/[0.06]">
                    {[
                      'Live duty & tax calculator',
                      'Complete import timeline',
                      'Japan auction bidding guide',
                      'Vetted agent directory',
                      'Document templates & emails',
                    ].map((item, i) => (
                      <li key={item} className="flex items-center justify-between gap-4 py-3.5">
                        <span className="flex items-baseline gap-4 sm:gap-5">
                          <span className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] flex-shrink-0 w-6">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm sm:text-base text-zinc-200 leading-snug">{item}</span>
                        </span>
                        <span className="h-1 w-1 rounded-full bg-amber-400/60 flex-shrink-0" aria-hidden />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-zinc-500">
                    <span className="font-mono uppercase tracking-[0.22em] text-amber-400/80 mr-2">+ inside</span>
                    Mistake checklist, container sharing, WhatsApp support, ongoing updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-zinc-200 bg-stone-100">
              <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-600 font-medium">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-amber-700">Payment</span>
                  <span className="h-px w-8 bg-zinc-300" />
                  <span>Visa · Mastercard · Amex</span>
                </div>
                <span className="text-zinc-500">Secure checkout · Stripe</span>
              </div>
            </div>
          </section>
        )}

        <WhatsAppButton />
      </main>
    </>
  )
}
