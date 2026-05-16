'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
import { Button } from '@/components/ui/button'
import WelcomeOnboarding from '@/components/portal/WelcomeOnboarding'
import SupportContact from '@/components/portal/SupportContact'
import TestimonialRequest from '@/components/TestimonialRequest'
import {
  BookOpen,
  FileText,
  Calculator,
  Ship,
  Users,
  Gavel,
  Lock,
  Rocket,
  Zap,
  ArrowUpRight,
  ArrowRight,
  Loader2,
} from 'lucide-react'

export default function PortalPage() {
  const router = useRouter()
  const { user, userEmail, loading, userTier } = useAuthImmediate()
  const [showWelcome, setShowWelcome] = useState(false)
  const [showTestimonial, setShowTestimonial] = useState(false)

  const displayEmail = userEmail || 'user@example.com'
  const cleanEmail = displayEmail.startsWith('user_cs_test_') ? 'Portal User' : displayEmail
  const isMastery = true

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirectTo=/portal')
    }
  }, [loading, user, router])

  useEffect(() => {
    if (user && userEmail) {
      const hasSeenWelcome = localStorage.getItem(`welcome_seen_${userEmail}`)
      if (!hasSeenWelcome) setShowWelcome(true)

      const hasSubmittedTestimonial = localStorage.getItem('impota_testimonial_submitted')
      const firstLoginDate = localStorage.getItem(`first_login_${userEmail}`)

      if (!firstLoginDate) {
        localStorage.setItem(`first_login_${userEmail}`, new Date().toISOString())
      } else if (!hasSubmittedTestimonial) {
        const daysSinceFirstLogin =
          (new Date().getTime() - new Date(firstLoginDate).getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceFirstLogin >= 3) setShowTestimonial(true)
      }
    }
  }, [user, userEmail])

  const handleCloseWelcome = () => {
    if (userEmail) localStorage.setItem(`welcome_seen_${userEmail}`, 'true')
    setShowWelcome(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Loading your dashboard
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Redirecting to login
          </p>
        </div>
      </div>
    )
  }

  const quickAccessCards = [
    { title: 'Start here', description: 'New? Start your learning journey', icon: Rocket, href: '/portal/start-here', available: true, featured: true },
    { title: 'Beginner journey', description: 'Complete import process & simple calculator', icon: Zap, href: '/portal/beginner', available: true, featured: false },
    { title: 'Import guide', description: 'Step-by-step instructions', icon: BookOpen, href: '/portal/guide', available: true, featured: false },
    { title: 'Documents', description: 'Real import examples', icon: FileText, href: '/portal/documents', available: true, featured: false },
    { title: 'Calculator', description: 'Advanced duty calculator', icon: Calculator, href: '/portal/calculator', available: isMastery, featured: false },
    { title: 'Auctions', description: 'Japan bidding guide', icon: Gavel, href: '/portal/japan-auctions', available: isMastery, featured: false },
    { title: 'Shipping', description: 'Companies & booking', icon: Ship, href: '/portal/book-slot', available: isMastery, featured: false },
    { title: 'Agents', description: 'Verified clearing agents', icon: Users, href: '/portal/agents', available: isMastery, featured: false },
  ]

  return (
    <main className="bg-white">
      {/* Welcome Modal */}
      {showWelcome && <WelcomeOnboarding userEmail={cleanEmail} onClose={handleCloseWelcome} />}

      {/* PAGE HEADER */}
      <div className="mb-12 pb-8 border-b border-zinc-200">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-600 font-semibold">
            Dashboard
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {isMastery ? 'Import Mastery' : 'Mistake Guide'} · Lifetime
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-[1.05]">
          Welcome
          <span className="block italic font-light text-amber-600 pl-6 sm:pl-10">back.</span>
        </h1>
        <div className="mt-4 flex items-start gap-2.5 max-w-xl">
          <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
          <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
            Pick up where you left off, or start a new chapter.
          </p>
        </div>

        {!isMastery && (
          <div className="mt-6">
            <Button
              size="sm"
              onClick={() => {
                if (userEmail) localStorage.setItem('checkout_email', userEmail)
                window.location.href = '/na/upsell'
              }}
              className="group h-10 px-5 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-colors text-sm"
            >
              <Zap className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.75} />
              Upgrade to Mastery
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        )}
      </div>

      {/* QUICK ACCESS */}
      <section className="mb-12">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-6">
          <span className="text-blue-600 font-semibold">Quick access</span>
          <span className="text-zinc-500">
            {String(quickAccessCards.filter((c) => c.available).length).padStart(2, '0')} /{' '}
            {String(quickAccessCards.length).padStart(2, '0')} available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
          {quickAccessCards.map((card, idx) => {
            const Icon = card.icon
            return card.available ? (
              <Link
                key={card.title}
                href={card.href}
                className={`group bg-white p-5 sm:p-6 transition-colors flex flex-col min-h-[140px] ${
                  card.featured ? 'hover:bg-amber-50/40' : 'hover:bg-stone-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-inset ${
                      card.featured
                        ? 'bg-amber-50 text-amber-700 ring-amber-200'
                        : 'bg-blue-50 text-blue-600 ring-blue-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className={`text-sm font-medium leading-snug transition-colors ${
                    card.featured
                      ? 'text-zinc-900 group-hover:text-amber-700'
                      : 'text-zinc-900 group-hover:text-amber-700'
                  }`}
                >
                  {card.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-600 leading-snug">{card.description}</p>
                <div className="mt-auto pt-3 flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                  Open
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ) : (
              <div
                key={card.title}
                className="bg-stone-50/60 p-5 sm:p-6 flex flex-col min-h-[140px] relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 ring-1 ring-inset ring-zinc-200">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <Lock className="h-3 w-3 text-zinc-400" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-medium text-zinc-500 leading-snug">{card.title}</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-snug">{card.description}</p>
                <div className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                  Locked
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="mb-12 border border-zinc-200 rounded-2xl bg-stone-50/60 p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-5">
          <span className="text-amber-600 font-semibold">Suggested learning path</span>
          <span className="text-zinc-500">1–2h total</span>
        </div>

        <div className="grid sm:grid-cols-[1fr_auto] gap-6 sm:gap-8 items-start">
          <ol className="space-y-2.5 max-w-2xl">
            {[
              { step: 'Start with Beginner Journey', duration: '15–20 min' },
              { step: 'Study the Complete Guide', duration: '30–45 min' },
              { step: 'Review Real Documents', duration: '20–30 min' },
              { step: 'Use the Calculator before buying', duration: 'As needed' },
            ].map((item, i) => (
              <li key={item.step} className="flex items-start gap-4 text-sm">
                <span className="font-mono text-[10px] text-amber-600 tracking-[0.2em] w-6 flex-shrink-0 pt-1 font-semibold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 flex items-baseline justify-between gap-3 border-b border-zinc-200/80 pb-2">
                  <span className="text-zinc-800">{item.step}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 whitespace-nowrap">
                    {item.duration}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <Link href="/portal/start-here" className="sm:self-end">
            <Button
              size="sm"
              className="group h-11 px-5 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(251,191,36,0.5)] transition-colors text-sm whitespace-nowrap"
            >
              <Rocket className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.75} />
              View full path
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* QUICK TIPS */}
      <section className="mb-12">
        <div className="flex items-start gap-3 border-t border-b border-zinc-200 py-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mt-0.5 whitespace-nowrap">
            [ Quick tips ]
          </span>
          <ul className="space-y-2 text-sm text-zinc-700 max-w-2xl">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
              <span>Start with Beginner Journey</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
              <span>Check Documents for real examples</span>
            </li>
            {isMastery && (
              <>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                  <span>Use Calculator before buying</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                  <span>Compare shipping rates</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>

      {/* TESTIMONIAL REQUEST */}
      {showTestimonial && (
        <div className="mb-12">
          <TestimonialRequest onClose={() => setShowTestimonial(false)} />
        </div>
      )}

      {/* SUPPORT */}
      <div className="mb-8">
        <SupportContact />
      </div>

      {/* Mobile nav hint */}
      <div className="lg:hidden text-center pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
          Tap the menu icon to explore all features
        </p>
      </div>
    </main>
  )
}
