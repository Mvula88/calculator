'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Target,
  Shield,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Heart,
  Globe,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Wordmark from '@/components/Wordmark'

const values = [
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Every duty, every fee, every margin — on the page, in the math, no fine print.',
  },
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Knowledge is power. We teach the process instead of gatekeeping it.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Importers helping importers — across Namibia, South Africa, Botswana, Zambia.',
  },
]

const features = [
  {
    icon: Globe,
    title: 'Experience',
    description: 'Built by an importer who shipped through Walvis Bay first-hand, before writing a line of the guide.',
  },
  {
    icon: TrendingUp,
    title: 'Savings',
    description: 'Members typically save tens of thousands of Rand on their first import versus local dealer prices.',
  },
  {
    icon: Heart,
    title: 'Support',
    description: 'WhatsApp + email support from someone who has actually imported a car — not a script reader.',
  },
  {
    icon: Award,
    title: 'Outcomes',
    description: 'Country playbooks, agent lists, duty calculators — everything a first-timer needs to finish the job.',
  },
]

const services = [
  'Step-by-step country guides for NA, ZA, BW, ZM',
  'Real-time landed-cost calculator with live duty rates',
  'Vetted exporters and clearing agents',
  'Japan auction-house playbook and grade decoder',
  'Document templates and per-country checklists',
]

export default function AboutPage() {
  return (
    <main className="bg-white text-zinc-900">
      {/* TOP NAV */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-4 min-w-0">
              <Link href="/" className="flex-shrink-0 active:opacity-70 transition-opacity">
                <Wordmark className="text-2xl sm:text-3xl" />
              </Link>
              <span className="hidden md:inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                <span className="h-px w-6 bg-zinc-300" />
                About the brief
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/contact" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors px-2">
                Contact
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/auth/login">
                <Button size="sm" className="h-9 px-4 sm:h-10 sm:px-5 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-colors text-xs sm:text-sm">
                  Login
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO — Nº 01 */}
      <section className="relative isolate overflow-hidden bg-zinc-950 text-white">
        <div className="absolute -bottom-40 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber-500/[0.08] blur-3xl" aria-hidden />
        <div className="absolute top-1/4 right-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-blue-500/[0.05] blur-3xl" aria-hidden />

        <div className="hidden md:block absolute top-20 left-6 lg:left-8 h-px w-12 bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-20 left-6 lg:left-8 h-12 w-px bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-20 right-6 lg:right-8 h-px w-12 bg-amber-400/40" aria-hidden />
        <div className="hidden md:block absolute top-20 right-6 lg:right-8 h-12 w-px bg-amber-400/40" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-20 sm:pt-24 pb-16 sm:pb-24">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-medium">
            <div className="flex items-center gap-3">
              <span className="text-amber-300 font-semibold">Nº 01</span>
              <span className="h-px w-8 bg-zinc-600" />
              <span>The brief</span>
            </div>
            <span className="hidden md:inline-block text-zinc-500">Built by an importer</span>
          </div>

          <Link href="/" className="mt-10 inline-flex items-center text-zinc-400 hover:text-white text-xs uppercase tracking-[0.24em] group transition-colors">
            <ArrowLeft className="h-3.5 w-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <h1 className="mt-10 sm:mt-12 font-serif font-medium tracking-tight text-white leading-[0.92] text-[clamp(2.5rem,7vw,5.5rem)]">
            <span className="block">A car import platform,</span>
            <span className="block pl-[8vw] sm:pl-[6vw] lg:pl-[10vw] italic font-light text-amber-300/95">
              for the people doing it themselves.
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed">
            IMPOTA is independent education for first-time importers across Southern Africa. No dealer markups, no commissions, no upsells — just the math, the documents, and the people you need to finish the job.
          </p>
        </div>
      </section>

      {/* MISSION — Nº 02 */}
      <section className="border-t border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium mb-10">
            <span className="text-amber-600 font-semibold">Nº 02</span>
            <span className="h-px w-8 bg-zinc-300" />
            <span>Mission</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700">
                <Target className="h-3.5 w-3.5" />
                Why we exist
              </div>
              <h2 className="mt-6 font-serif text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                Cheaper imports,
                <br />
                <span className="italic font-light text-amber-600">for everyone.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="font-serif text-xl sm:text-2xl leading-relaxed text-zinc-700">
                We empower importers with the knowledge, tools, and contacts to bring vehicles from Japan to Southern Africa <span className="italic text-zinc-900 font-medium">safely, legally, and at half the dealer price.</span>
              </p>
              <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                <span className="h-px w-8 bg-zinc-300" />
                NA · ZA · BW · ZM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY — Nº 03 */}
      <section className="border-t border-zinc-200 bg-stone-50">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium mb-10">
            <span className="text-amber-600 font-semibold">Nº 03</span>
            <span className="h-px w-8 bg-zinc-300" />
            <span>Our story</span>
          </div>

          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-700 mb-6">
              <span aria-hidden className="mr-2">↳</span> Where this came from
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
              IMPOTA was built by an importer,
              <br />
              <span className="italic font-light text-zinc-500">not a salesperson.</span>
            </h2>
            <p className="mt-8 font-serif text-lg sm:text-xl leading-relaxed text-zinc-700">
              The founder personally imported cars from Japan through Walvis Bay — paid the wrong duties the first time, missed a NaTIS deadline, found the right exporter only after the wrong one had already taken a deposit.
            </p>
            <p className="mt-6 font-serif text-lg sm:text-xl leading-relaxed text-zinc-700">
              IMPOTA is the playbook he wished existed before that first import. <span className="italic text-zinc-900 font-medium">Now it does.</span>
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO — Nº 04 */}
      <section className="border-t border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium">
              <span className="text-amber-600 font-semibold">Nº 04</span>
              <span className="h-px w-8 bg-zinc-300" />
              <span>What's inside</span>
            </div>
            <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              5 modules · 4 countries
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight leading-tight max-w-3xl">
            Step-by-step guides, real calculators,
            <span className="italic font-light text-amber-600"> and the contacts that matter.</span>
          </h2>

          <div className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200">
            {services.map((service, i) => (
              <div key={i} className="grid grid-cols-12 items-center gap-4 py-5 sm:py-6">
                <div className="col-span-2 sm:col-span-1 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="col-span-1 hidden sm:block">
                  <CheckCircle className="h-4 w-4 text-amber-500" />
                </div>
                <p className="col-span-10 sm:col-span-10 text-base sm:text-lg text-zinc-800">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE — Nº 05 */}
      <section className="border-t border-zinc-200 bg-stone-50">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium mb-12">
            <span className="text-amber-600 font-semibold">Nº 05</span>
            <span className="h-px w-8 bg-zinc-300" />
            <span>Why IMPOTA</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight leading-tight max-w-3xl">
            Four reasons importers stay.
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-8 sm:p-10">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-6">
                  <feature.icon className="h-4 w-4 text-amber-500" />
                  <span className="text-amber-700 font-semibold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px w-6 bg-zinc-300" />
                  <span>{feature.title}</span>
                </div>
                <p className="font-serif text-xl sm:text-2xl leading-snug text-zinc-800">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — Nº 06 */}
      <section className="border-t border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium mb-12">
            <span className="text-amber-600 font-semibold">Nº 06</span>
            <span className="h-px w-8 bg-zinc-300" />
            <span>Values</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {values.map((value, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-2 -left-2 text-[10px] font-mono uppercase tracking-[0.24em] text-amber-600">
                  0{i + 1}
                </div>
                <div className="pt-6 border-t border-zinc-200">
                  <value.icon className="h-5 w-5 text-amber-500 mb-4" />
                  <h3 className="font-serif text-2xl font-medium tracking-tight">{value.title}</h3>
                  <p className="mt-4 text-base text-zinc-700 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-medium mb-8">
                <span className="text-amber-300 font-semibold">Coda</span>
                <span className="h-px w-8 bg-zinc-600" />
                <span>Your move</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight leading-tight">
                Ready to import your
                <br />
                <span className="italic font-light text-amber-300">first car?</span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-xl">
                N$200 one-time. Lifetime access. 7-day refund if it's not worth it.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link href="/na/guide" className="w-full sm:w-auto">
                <Button className="w-full bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full h-12 px-7">
                  Start with the free guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full bg-transparent border-zinc-700 text-white hover:bg-zinc-900 hover:text-white font-medium rounded-full h-12 px-7">
                  Talk to us first
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
