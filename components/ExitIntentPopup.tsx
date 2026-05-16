'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight, Lock } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ValidatedCheckoutButton from '@/components/validated-checkout-button'

interface ExitIntentPopupProps {
  country?: 'na' | 'za' | 'bw' | 'zm'
}

const currencies = {
  na: { symbol: '$', price: '6.06', local: 'N$100' },
  za: { symbol: '$', price: '6.06', local: 'R100' },
  bw: { symbol: '$', price: '6.06', local: 'P85' },
  zm: { symbol: '$', price: '6.06', local: 'K140' },
}

export default function ExitIntentPopup({ country: propCountry }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()

  const getCountryFromPath = (): 'na' | 'za' | 'bw' | 'zm' | null => {
    if (pathname.startsWith('/za')) return 'za'
    if (pathname.startsWith('/bw')) return 'bw'
    if (pathname.startsWith('/zm')) return 'zm'
    if (pathname.startsWith('/na')) return 'na'
    return propCountry || null
  }

  const country = getCountryFromPath()
  const isLandingPage = pathname === '/' || (!country && !pathname.includes('/guide'))
  const currency = country ? currencies[country] : currencies.na

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setIsAuthenticated(true)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated || isLandingPage) return

    const shown = sessionStorage.getItem('exitIntentShown')
    if (shown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    let mobileTimer: NodeJS.Timeout | undefined
    if (!hasShown && !isVisible && window.innerWidth < 768) {
      mobileTimer = setTimeout(() => {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }, 30000)
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (mobileTimer) clearTimeout(mobileTimer)
    }
  }, [hasShown, isVisible, isAuthenticated, isLandingPage])

  if (isAuthenticated || !isVisible || isLandingPage) return null

  const handleClose = () => setIsVisible(false)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/45 backdrop-blur-md z-[9998] animate-fadeIn"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-[9999] p-3 sm:p-6 overflow-y-auto safe-padding-top safe-padding-bottom"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative isolate bg-gradient-to-br from-white via-stone-50 to-zinc-100 text-zinc-900 rounded-2xl border border-zinc-200 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.18)] w-full max-w-xl mx-auto my-auto animate-scaleUp overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
          {/* Soft radial glows */}
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(251,191,36,0.16),transparent_55%),radial-gradient(circle_at_90%_85%,rgba(37,99,235,0.06),transparent_55%)]"
            aria-hidden
          />

          {/* Registration marks — top corners */}
          <div className="absolute top-5 left-5 h-px w-8 bg-amber-500/50" aria-hidden />
          <div className="absolute top-5 left-5 h-8 w-px bg-amber-500/50" aria-hidden />
          <div className="absolute top-5 right-5 h-px w-8 bg-amber-500/50" aria-hidden />
          <div className="absolute top-5 right-5 h-8 w-px bg-amber-500/50" aria-hidden />

          {/* Top dateline + close */}
          <div className="relative flex items-center justify-between px-6 sm:px-8 pt-7 pb-4">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-medium">
              <span className="text-amber-600 font-semibold">Nº 02</span>
              <span className="h-px w-8 bg-zinc-300" />
              <span>Membership</span>
            </div>
            <button
              onClick={handleClose}
              className="h-9 w-9 rounded-full border border-zinc-200 hover:bg-zinc-100 active:bg-zinc-200 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-zinc-600" strokeWidth={1.75} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="relative px-6 sm:px-8 pb-7 overflow-y-auto flex-1">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              Before you go
            </div>

            {/* Stacked headline */}
            <h2 className="mt-6 font-medium tracking-tight text-zinc-900 leading-[0.92] text-[clamp(2rem,7vw,3.5rem)]">
              <span className="block">Lifetime</span>
              <span className="block pl-[10vw] sm:pl-12 italic font-light text-amber-600">access.</span>
            </h2>

            {/* Return-arrow kicker */}
            <div className="mt-5 flex items-start gap-2.5 max-w-md">
              <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
              <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
                Every tool, guide, and update — for as long as the platform exists.
              </p>
            </div>

            {/* Hairline */}
            <div className="mt-8 h-px w-16 bg-amber-500/70" />

            {/* Price */}
            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Investment</p>
              <div className="mt-2 flex items-baseline gap-3 flex-wrap">
                <span className="font-medium tracking-tight bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent text-5xl sm:text-6xl leading-none">
                  {currency.symbol}{currency.price}
                </span>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em]">USD</span>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                ≈ {currency.local} · One-time payment · Instant access
              </p>
            </div>

            {/* Manifest */}
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5">
                <span className="text-zinc-500">Included</span>
                <span className="text-amber-600">03 items</span>
              </div>
              <ul className="divide-y divide-zinc-200/70">
                {[
                  'Accurate duty calculator',
                  'Verified agents directory',
                  'Complete import guide',
                ].map((item, i) => (
                  <li key={item} className="flex items-center justify-between gap-3 py-3">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-5 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-zinc-800">{item}</span>
                    </span>
                    <span className="h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonus footnote */}
            <div className="mt-5 flex items-start gap-3">
              <span className="font-mono text-[10px] text-amber-600 mt-0.5 flex-shrink-0 tracking-[0.18em] uppercase">
                [ Bonus ]
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Japan auction access guide, shipping contacts, and all documents & templates.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <ValidatedCheckoutButton
                tier="mastery"
                country={country || 'na'}
                className="group w-full h-12 sm:h-14 px-6 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors text-base"
              >
                Get lifetime access
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ValidatedCheckoutButton>

              <button
                onClick={handleClose}
                className="mt-3 w-full text-sm text-zinc-500 hover:text-zinc-800 transition-colors py-2"
              >
                Continue to website
              </button>
            </div>
          </div>

          {/* Bottom payment strip — mirrors page pricing dateline */}
          <div className="relative border-t border-zinc-200 bg-white/60 backdrop-blur-md px-6 sm:px-8 py-3.5 flex items-center justify-between gap-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            <div className="flex items-center gap-2">
              <Lock className="h-3 w-3" strokeWidth={1.75} />
              <span>Secure · Stripe</span>
            </div>
            <span className="text-zinc-400">Visa · Mastercard · Amex</span>
          </div>
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
    </>
  )
}
