'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Mail, Lock, Loader2, Eye, EyeOff, ArrowRight, ArrowUpRight } from 'lucide-react'
import { AuthSkeleton } from '@/components/skeletons/AuthSkeleton'

function LoginForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const msg = searchParams.get('message')
    const redirectEmail = searchParams.get('email')
    const sessionId = searchParams.get('session_id')
    const paymentStatus = searchParams.get('payment_status')

    if (msg === 'account-exists' && redirectEmail) {
      setMessage('You already have an account. Please login to access your purchase.')
      setEmail(redirectEmail)
    }

    if (paymentStatus === 'success' && sessionId) {
      setMessage('Payment successful. Please login to access your portal.')
    }
  }, [searchParams])

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      })

      if (error) {
        setError(
          error.message.includes('Invalid login credentials')
            ? 'Invalid email or password. Please try again.'
            : error.message
        )
        setLoading(false)
        return
      }

      if (data.user && data.session) {
        if (data.user.user_metadata?.needs_password_reset) {
          window.location.href = '/auth/setup-account'
          return
        }

        const { data: { session: freshSession } } = await supabase.auth.getSession()
        if (freshSession) {
          window.location.replace('/portal')
        } else {
          setError('Authentication issue. Please try logging in again.')
          setLoading(false)
          await supabase.auth.refreshSession()
        }
      } else {
        setError('Login failed. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-br from-white via-stone-50 to-zinc-100 flex items-center justify-center px-4 py-12">
      {/* Soft amber + blue glows */}
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
                <span>Sign in</span>
              </div>
              <span className="text-zinc-400">Member</span>
            </div>

            {/* Eyebrow */}
            <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              Member access
            </div>

            {/* Stacked headline */}
            <h1 className="mt-5 font-medium tracking-tight text-zinc-900 leading-[0.92] text-[clamp(2rem,7vw,3.25rem)]">
              <span className="block">Welcome</span>
              <span className="block pl-8 sm:pl-10 italic font-light text-amber-600">back.</span>
            </h1>

            {/* Return-arrow kicker */}
            <div className="mt-5 flex items-start gap-2.5 max-w-sm">
              <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
              <p className="text-sm text-zinc-600 leading-snug italic font-light">
                Access your complete import mastery platform.
              </p>
            </div>

            {/* Hairline */}
            <div className="mt-8 h-px w-14 bg-amber-500/70" />

            {/* Status message */}
            {message && (
              <Alert className="mt-6 border-blue-200 bg-blue-50/60">
                <AlertDescription className="text-blue-900 text-sm">{message}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handlePasswordLogin} className="mt-6 space-y-5">
              {error && (
                <div className="flex items-start gap-2.5 border border-red-200 bg-red-50/60 rounded-xl px-3.5 py-3">
                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div className="flex-1">
                    <p className="text-sm text-red-700">{error}</p>
                    {error.includes('Redirect failed') && (
                      <Link href="/portal" className="text-xs text-red-700 underline mt-1 block">
                        Click here to go to the portal →
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Email */}
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
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="!h-12 !pl-12 !pr-4 !text-base border-zinc-200 bg-white focus-visible:ring-amber-500/20 focus-visible:border-amber-500 rounded-xl"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" strokeWidth={1.75} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!h-12 !pl-12 !pr-12 !text-base border-zinc-200 bg-white focus-visible:ring-amber-500/20 focus-visible:border-amber-500 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.75} /> : <Eye className="h-4 w-4" strokeWidth={1.75} />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-zinc-600 hover:text-amber-700 transition-colors inline-flex items-center gap-1"
                >
                  Forgot password?
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="group w-full h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer links */}
            <div className="mt-8 pt-6 border-t border-zinc-200 space-y-3 text-center">
              <p className="text-sm text-zinc-600">
                Just purchased a guide?{' '}
                <Link
                  href="/auth/setup-account"
                  className="font-medium text-zinc-900 hover:text-amber-700 transition-colors inline-flex items-center gap-1"
                >
                  Set up your password
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </p>
              <p className="text-xs text-zinc-500">
                Haven't purchased yet?{' '}
                <Link
                  href="/na/guide"
                  className="text-zinc-700 hover:text-amber-700 transition-colors inline-flex items-center gap-1"
                >
                  View pricing
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </p>
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

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <LoginForm />
    </Suspense>
  )
}
