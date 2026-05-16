'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Mail, ArrowRight, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Check your email for the password reset link.',
      })
      setEmail('')
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to send reset email',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-br from-white via-stone-50 to-zinc-100 flex items-center justify-center px-4 py-12">
      {/* Soft glows */}
      <div className="absolute -top-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-500/[0.08] blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -right-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-500/[0.05] blur-3xl" aria-hidden />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/impota-logo.png"
              alt="IMPOTA"
              width={140}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Card */}
        <div className="relative bg-white border border-zinc-200 rounded-2xl shadow-[0_24px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* Registration marks */}
          <div className="absolute top-4 left-4 h-px w-7 bg-amber-500/50" aria-hidden />
          <div className="absolute top-4 left-4 h-7 w-px bg-amber-500/50" aria-hidden />
          <div className="absolute top-4 right-4 h-px w-7 bg-amber-500/50" aria-hidden />
          <div className="absolute top-4 right-4 h-7 w-px bg-amber-500/50" aria-hidden />

          <div className="px-6 sm:px-8 pt-8 pb-8">
            {/* Top dateline */}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-medium">
              <div className="flex items-center gap-3">
                <span className="text-amber-600 font-semibold">Nº</span>
                <span className="h-px w-8 bg-zinc-300" />
                <span>Recovery</span>
              </div>
              <span className="text-zinc-400">Reset</span>
            </div>

            {/* Eyebrow */}
            <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              Forgot password
            </div>

            {/* Stacked headline */}
            <h1 className="mt-5 font-medium tracking-tight text-zinc-900 leading-[0.92] text-[clamp(2rem,7vw,3.25rem)]">
              <span className="block">Reset your</span>
              <span className="block pl-8 sm:pl-10 italic font-light text-amber-600">password.</span>
            </h1>

            {/* Return-arrow kicker */}
            <div className="mt-5 flex items-start gap-2.5 max-w-sm">
              <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
              <p className="text-sm text-zinc-600 leading-snug italic font-light">
                Enter your email and we'll send you a secure reset link.
              </p>
            </div>

            {/* Hairline */}
            <div className="mt-8 h-px w-14 bg-amber-500/70" />

            {/* Form */}
            <form onSubmit={handleResetPassword} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" strokeWidth={1.75} />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="!h-12 !pl-12 !pr-4 !text-base border-zinc-200 bg-white focus-visible:ring-amber-500/20 focus-visible:border-amber-500 rounded-xl"
                    autoFocus
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`flex items-start gap-2.5 border rounded-xl px-3.5 py-3 ${
                    message.type === 'error'
                      ? 'border-red-200 bg-red-50/60'
                      : 'border-emerald-200 bg-emerald-50/60'
                  }`}
                >
                  {message.type === 'error' ? (
                    <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  )}
                  <p
                    className={`text-sm ${
                      message.type === 'error' ? 'text-red-700' : 'text-emerald-800'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="group w-full h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
              <Link
                href="/auth/login"
                className="text-sm text-zinc-600 hover:text-amber-700 transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to login
              </Link>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t border-zinc-200 bg-stone-50/60 px-6 sm:px-8 py-3.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            <Link href="/" className="hover:text-amber-700 transition-colors inline-flex items-center gap-2">
              <span className="h-px w-5 bg-zinc-400" />
              Back to home
            </Link>
            <span className="text-zinc-400">IMPOTA</span>
          </div>
        </div>
      </div>
    </div>
  )
}
