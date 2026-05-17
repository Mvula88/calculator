'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Calculator,
  FileText,
  Star,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  X,
} from 'lucide-react'

interface WelcomeOnboardingProps {
  userEmail?: string
  onClose?: () => void
}

export default function WelcomeOnboarding({ userEmail, onClose }: WelcomeOnboardingProps) {
  const learningPath = [
    {
      step: 1,
      title: 'Start with Beginner Journey',
      icon: Zap,
      href: '/portal/beginner',
      duration: '15-20 min read',
      description: 'Learn import basics, terminology, and see real cost examples',
      keyTakeaways: [
        'Understand FOB, CIF, ICD, ENV, VAT and all import terms',
        'See 4 real vehicle imports with full cost breakdowns',
        'Learn the 5-step import process',
        'Use the quick cost estimator',
      ],
    },
    {
      step: 2,
      title: 'Study the Complete Guide',
      icon: BookOpen,
      href: '/portal/guide',
      duration: '30-45 min read',
      description: 'Deep dive into the step-by-step import process for your country',
      keyTakeaways: [
        'Pre-import checklists to avoid costly mistakes',
        'Timeline expectations (60-90 days realistic)',
        'Common mistakes that cost thousands',
        'Emergency contacts and templates',
      ],
    },
    {
      step: 3,
      title: 'Review Real Documents',
      icon: FileText,
      href: '/portal/documents',
      duration: '20-30 min review',
      description: 'Study actual import documents so you know exactly what to expect',
      keyTakeaways: [
        'See real Japanese auction invoices',
        'Customs forms (SAD 500, Assessment Notice)',
        'Bill of Lading and Export Certificates',
        'Learn what customs officers check for',
      ],
    },
    {
      step: 4,
      title: 'Use the Advanced Calculator',
      icon: Calculator,
      href: '/portal/calculator',
      duration: '10 min per calculation',
      description: 'Calculate exact duties, taxes, and total landed costs',
      keyTakeaways: [
        'Multi-country duty calculations (NA, ZA, BW, ZM)',
        'Japan-side costs breakdown',
        'Container sharing cost calculator',
        'Save calculations for comparison',
      ],
    },
    {
      step: 5,
      title: 'Explore Additional Resources',
      icon: Star,
      href: '/portal',
      duration: 'As needed',
      description: 'Access verified agents, shipping companies, and Japan auction guides',
      keyTakeaways: [
        'Verified clearing agents directory',
        'Shipping companies comparison',
        'Japan auction bidding guide',
        'Container sharing platform info',
      ],
    },
  ]

  const stats = [
    { value: '5', label: 'Learning steps' },
    { value: '20+', label: 'Real documents' },
    { value: '4', label: 'Countries' },
    { value: '1–2h', label: 'Total learning' },
  ]

  const valueItems = [
    'Save N$5,000–N$50,000 by avoiding common mistakes',
    'Save N$40,000+ using container sharing strategies',
    'Save 20+ hours of scattered research',
    'Know exact costs before buying any vehicle',
  ]

  const proTips = [
    'Start with Step 1 (Beginner Journey) even if you think you know the basics',
    'Bookmark pages you\'ll reference often (calculator, documents)',
    'Use the calculator BEFORE making any vehicle purchase',
    'Save/screenshot calculations for your records',
    'Budget 10–15% extra for unexpected costs',
    'Expect 9–10 weeks total timeline (60–70 days)',
  ]

  return (
    <div
      className="fixed inset-0 bg-zinc-900/55 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative isolate bg-gradient-to-br from-white via-stone-50 to-zinc-100 text-zinc-900 rounded-2xl border border-zinc-200 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.18)] w-full max-w-4xl my-8 animate-scaleUp overflow-hidden max-h-[92vh] flex flex-col">
        {/* Soft glows */}
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_5%,rgba(251,191,36,0.14),transparent_55%),radial-gradient(circle_at_90%_95%,rgba(37,99,235,0.06),transparent_55%)]"
          aria-hidden
        />

        {/* Registration marks */}
        <div className="absolute top-5 left-5 h-px w-8 bg-amber-500/50" aria-hidden />
        <div className="absolute top-5 left-5 h-8 w-px bg-amber-500/50" aria-hidden />
        <div className="absolute top-5 right-5 h-px w-8 bg-amber-500/50" aria-hidden />
        <div className="absolute top-5 right-5 h-8 w-px bg-amber-500/50" aria-hidden />

        {/* Top dateline + close */}
        <div className="relative flex items-center justify-between px-6 sm:px-10 pt-7 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-medium">
            <span className="text-amber-600 font-semibold">Nº 01</span>
            <span className="h-px w-8 bg-zinc-300" />
            <span>Welcome</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-full border border-zinc-200 hover:bg-zinc-100 active:bg-zinc-200 flex items-center justify-center transition-colors"
              aria-label="Close welcome modal"
            >
              <X className="h-4 w-4 text-zinc-600" strokeWidth={1.75} />
            </button>
          )}
        </div>

        {/* Scrollable body */}
        <div className="relative px-6 sm:px-10 pb-6 overflow-y-auto flex-1">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
            Member onboarding
          </div>

          {/* Stacked headline */}
          <h1 className="mt-6 font-medium tracking-tight text-zinc-900 leading-[0.92] text-[clamp(2rem,6.5vw,3.75rem)]">
            <span className="block">Welcome to</span>
            <span className="block pl-[10vw] sm:pl-16 italic font-light text-amber-600">Import Mastery.</span>
          </h1>

          {/* Return-arrow kicker — licensed-to */}
          <div className="mt-5 flex items-start gap-2.5 max-w-2xl">
            <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
            <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
              Your complete vehicle import system. Licensed to{' '}
              <span className="not-italic font-medium text-zinc-800">{userEmail || 'Portal User'}</span>.
            </p>
          </div>

          {/* Hairline */}
          <div className="mt-8 h-px w-16 bg-amber-500/70" />

          {/* Stats grid — editorial bordered chip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-white px-5 py-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{s.label}</p>
                <p className="mt-2 text-3xl font-medium tracking-tight text-zinc-900">{s.value}</p>
              </div>
            ))}
          </div>

          {/* What You'll Gain — manifest */}
          <div className="mt-10">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5">
              <span className="text-zinc-500">What you'll gain</span>
              <span className="text-amber-600">{String(valueItems.length).padStart(2, '0')} items</span>
            </div>
            <ul className="divide-y divide-zinc-200/70">
              {valueItems.map((item, i) => (
                <li key={item} className="flex items-center gap-4 py-3">
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" strokeWidth={1.75} />
                  <span className="text-sm text-zinc-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Learning Path */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                Suggested learning path
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                1–2h total
              </span>
            </div>
            <h2 className="mt-3 text-xl sm:text-2xl font-medium tracking-tight text-zinc-900">
              Master the vehicle import process.
            </h2>
            <div className="mt-4 h-px w-12 bg-amber-500/70" />

            <div className="mt-6 divide-y divide-zinc-200/80 border-y border-zinc-200/80">
              {learningPath.map((item) => {
                const Icon = item.icon
                return (
                  <article
                    key={item.step}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-6"
                  >
                    {/* Step label */}
                    <div className="sm:col-span-2 flex items-start gap-3">
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-600 font-semibold">
                        Step {String(item.step).padStart(2, '0')}
                      </p>
                    </div>

                    {/* Icon chip */}
                    <div className="sm:col-span-1">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-zinc-200 shadow-sm">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="sm:col-span-9">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-base sm:text-lg font-medium text-zinc-900 leading-tight">
                          {item.title}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          · {item.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{item.description}</p>

                      <ul className="mt-3 space-y-1.5">
                        {item.keyTakeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={item.href}
                        className="mt-4 group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-amber-700 transition-colors"
                      >
                        {item.step === 1 ? 'Start here' : `Go to step ${item.step}`}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Pro Tips — editorial footnote panel */}
          <div className="mt-10 border border-zinc-200 rounded-xl bg-stone-50/60 p-5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-3">
              <span className="text-zinc-500">Pro tips</span>
              <span className="text-amber-600">{String(proTips.length).padStart(2, '0')}</span>
            </div>
            <ul className="space-y-2">
              {proTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-5 flex-shrink-0 pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="mt-8 grid sm:grid-cols-[1fr_auto] gap-4 items-center border-t border-b border-zinc-200 py-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-2">
                Need help?
              </p>
              <p className="text-sm text-zinc-700 leading-snug">
                WhatsApp support and{' '}
                <a
                  href="mailto:support@impota.com"
                  className="text-zinc-900 hover:text-amber-700 transition-colors underline-offset-2 hover:underline"
                >
                  support@impota.com
                </a>
                {' '}— typically respond within 24 hours.
              </p>
            </div>
            <a
              href="https://wa.me/264836757958?text=Hi,%20I%20need%20help%20with%20the%20Import%20Mastery%20portal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 px-5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-sm font-medium text-zinc-900 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
              WhatsApp support
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="relative flex-shrink-0 border-t border-zinc-200 bg-white/70 backdrop-blur-md px-6 sm:px-10 py-4 flex flex-col sm:flex-row gap-3">
          <Link href="/portal/beginner" className="flex-1">
            <Button className="group w-full h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors">
              Start your journey
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          {onClose && (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-full border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 font-medium text-zinc-900"
            >
              I'll explore on my own
            </Button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleUp { animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  )
}
