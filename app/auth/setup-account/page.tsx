'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Lock,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff,
  Check,
  X,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  KeyRound,
} from 'lucide-react'

export default function SetupAccountPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState<'verify' | 'password'>('verify')

  const passwordRequirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: 'One lowercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
    { met: /[!@#$%^&*]/.test(password), text: 'One special character (!@#$%^&*)' },
  ]

  const isPasswordValid = passwordRequirements.every((req) => req.met)
  const passwordsMatch = password === confirmPassword && password !== ''

  useEffect(() => {
    checkExistingSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function checkExistingSession() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setEmail(user.email || '')
      if (!user.user_metadata?.needs_password_reset) {
        router.push('/portal')
      } else {
        setStep('password')
      }
    }
  }

  async function handleVerifyEmail(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: { shouldCreateUser: false },
    })

    if (error) {
      setError('Email not found. Please use the email you used when purchasing.')
      setLoading(false)
      return
    }

    setStep('password')
    setLoading(false)
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault()

    if (!isPasswordValid) {
      setError('Please meet all password requirements')
      return
    }
    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    const supabase = createClient()

    if (verificationCode && step === 'password') {
      const { error: otpError } = await supabase.auth.verifyOtp({
        email: email.toLowerCase(),
        token: verificationCode,
        type: 'email',
      })
      if (otpError) {
        setError('Invalid verification code. Please check your email.')
        setLoading(false)
        return
      }
    }

    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    await supabase.auth.updateUser({
      data: {
        needs_password_reset: false,
        setup_completed: true,
        setup_completed_at: new Date().toISOString(),
      },
    })

    setSuccess(true)
    setTimeout(() => router.push('/portal'), 2000)
  }

  // ─────────────────────────────────────────── SUCCESS STATE
  if (success) {
    return (
      <div className="relative isolate min-h-screen bg-gradient-to-br from-white via-stone-50 to-zinc-100 flex items-center justify-center px-4 py-12">
        <div className="absolute -top-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-500/[0.08] blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 -right-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-emerald-500/[0.06] blur-3xl" aria-hidden />

        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Image src="/impota-logo.png" alt="IMPOTA" width={140} height={40} className="h-9 w-auto" priority />
          </div>

          <div className="relative bg-white border border-zinc-200 rounded-2xl shadow-[0_24px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="absolute top-4 left-4 h-px w-7 bg-amber-500/50" aria-hidden />
            <div className="absolute top-4 left-4 h-7 w-px bg-amber-500/50" aria-hidden />
            <div className="absolute top-4 right-4 h-px w-7 bg-amber-500/50" aria-hidden />
            <div className="absolute top-4 right-4 h-7 w-px bg-amber-500/50" aria-hidden />

            <div className="px-6 sm:px-8 pt-8 pb-10 text-center">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-medium">
                <div className="flex items-center gap-3">
                  <span className="text-amber-600 font-semibold">Nº</span>
                  <span className="h-px w-8 bg-zinc-300" />
                  <span>Setup</span>
                </div>
                <span className="text-emerald-600 font-semibold">Complete</span>
              </div>

              <div className="mt-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" strokeWidth={1.75} />
              </div>

              <h1 className="mt-8 font-medium tracking-tight text-zinc-900 leading-[0.92] text-[clamp(2rem,7vw,3rem)]">
                <span className="block">Account</span>
                <span className="block pl-6 sm:pl-8 italic font-light text-amber-600">ready.</span>
              </h1>

              <div className="mt-5 flex items-start gap-2.5 max-w-sm mx-auto justify-center">
                <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
                <p className="text-sm text-zinc-600 leading-snug italic font-light text-left">
                  Your password is set. Redirecting you to the portal…
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Taking you to your portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────── MAIN
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-br from-white via-stone-50 to-zinc-100 flex items-center justify-center px-4 py-12">
      <div className="absolute -top-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-500/[0.08] blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -right-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-500/[0.05] blur-3xl" aria-hidden />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/impota-logo.png" alt="IMPOTA" width={140} height={40} className="h-9 w-auto" priority />
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
            {/* Dateline + step indicator */}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-medium">
              <div className="flex items-center gap-3">
                <span className="text-amber-600 font-semibold">Nº</span>
                <span className="h-px w-8 bg-zinc-300" />
                <span>Setup</span>
              </div>
              <span className="font-mono text-zinc-400">
                Step{' '}
                <span className="text-amber-600 font-semibold">
                  {step === 'verify' ? '01' : '02'}
                </span>
                {' '}/ 02
              </span>
            </div>

            {step === 'verify' ? (
              <>
                <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Thank you for your purchase
                </div>

                <h1 className="mt-5 font-medium tracking-tight text-zinc-900 leading-[0.92] text-[clamp(2rem,6.5vw,3rem)]">
                  <span className="block">Verify your</span>
                  <span className="block pl-7 sm:pl-9 italic font-light text-amber-600">email.</span>
                </h1>

                <div className="mt-5 flex items-start gap-2.5 max-w-sm">
                  <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
                  <p className="text-sm text-zinc-600 leading-snug italic font-light">
                    Enter the email you used at checkout to set up your password.
                  </p>
                </div>

                <div className="mt-8 h-px w-14 bg-amber-500/70" />

                <form onSubmit={handleVerifyEmail} className="mt-6 space-y-5">
                  {error && (
                    <div className="flex items-start gap-2.5 border border-red-200 bg-red-50/60 rounded-xl px-3.5 py-3">
                      <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
                    >
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      className="!h-12 !px-4 !text-base border-zinc-200 bg-white focus-visible:ring-amber-500/20 focus-visible:border-amber-500 rounded-xl"
                    />
                    <p className="text-xs text-zinc-500">
                      Use the email address you used when purchasing
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="group w-full h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending verification code...
                      </>
                    ) : (
                      <>
                        Send verification code
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Almost there
                </div>

                <h1 className="mt-5 font-medium tracking-tight text-zinc-900 leading-[0.92] text-[clamp(2rem,6.5vw,3rem)]">
                  <span className="block">Set your</span>
                  <span className="block pl-7 sm:pl-9 italic font-light text-amber-600">password.</span>
                </h1>

                <div className="mt-5 flex items-start gap-2.5 max-w-sm">
                  <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
                  <p className="text-sm text-zinc-600 leading-snug italic font-light">
                    Check your email for the 6-digit verification code, then create a secure password.
                  </p>
                </div>

                <div className="mt-8 h-px w-14 bg-amber-500/70" />

                <form onSubmit={handleSetPassword} className="mt-6 space-y-5">
                  {error && (
                    <div className="flex items-start gap-2.5 border border-red-200 bg-red-50/60 rounded-xl px-3.5 py-3">
                      <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Verification Code */}
                  <div className="space-y-2">
                    <label
                      htmlFor="code"
                      className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
                    >
                      Verification code
                    </label>
                    <div className="relative">
                      <KeyRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" strokeWidth={1.75} />
                      <Input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        placeholder="123456"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                        required
                        autoFocus
                        className="!h-12 !pl-12 !pr-4 !text-base tracking-[0.4em] font-mono border-zinc-200 bg-white focus-visible:ring-amber-500/20 focus-visible:border-amber-500 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="new-password"
                      className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
                    >
                      New password
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" strokeWidth={1.75} />
                      <Input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="!h-12 !pl-12 !pr-12 !text-base border-zinc-200 bg-white focus-visible:ring-amber-500/20 focus-visible:border-amber-500 rounded-xl"
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

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirm-password"
                      className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" strokeWidth={1.75} />
                      <Input
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="!h-12 !pl-12 !pr-4 !text-base border-zinc-200 bg-white focus-visible:ring-amber-500/20 focus-visible:border-amber-500 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Password requirements — editorial manifest */}
                  <div className="border border-zinc-200 rounded-xl bg-stone-50/60 p-4">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2 mb-3">
                      <span className="text-zinc-500">Requirements</span>
                      <span className="text-amber-600">
                        {passwordRequirements.filter((r) => r.met).length}/{passwordRequirements.length}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {passwordRequirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-zinc-400 tracking-[0.18em] w-5 flex-shrink-0">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {req.met ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" strokeWidth={2} />
                          ) : (
                            <X className="h-3.5 w-3.5 text-zinc-300 flex-shrink-0" strokeWidth={2} />
                          )}
                          <span className={`text-xs ${req.met ? 'text-zinc-700' : 'text-zinc-500'}`}>
                            {req.text}
                          </span>
                        </li>
                      ))}
                      {password && confirmPassword && (
                        <li className="flex items-center gap-3 pt-2 border-t border-zinc-200 mt-2">
                          <span className="font-mono text-[10px] text-zinc-400 tracking-[0.18em] w-5 flex-shrink-0">=</span>
                          {passwordsMatch ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" strokeWidth={2} />
                          ) : (
                            <X className="h-3.5 w-3.5 text-red-500 flex-shrink-0" strokeWidth={2} />
                          )}
                          <span
                            className={`text-xs ${
                              passwordsMatch ? 'text-zinc-700' : 'text-red-600'
                            }`}
                          >
                            Passwords match
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !isPasswordValid || !passwordsMatch}
                    className="group w-full h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Setting password...
                      </>
                    ) : (
                      <>
                        Set password &amp; continue
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* Footer link */}
            <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
              <p className="text-xs text-zinc-500">
                Having trouble?{' '}
                <a
                  href="mailto:support@impota.com"
                  className="text-zinc-700 hover:text-amber-700 transition-colors inline-flex items-center gap-1"
                >
                  Contact support
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t border-zinc-200 bg-stone-50/60 px-6 sm:px-8 py-3.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            <Link href="/auth/login" className="hover:text-amber-700 transition-colors inline-flex items-center gap-2">
              <span className="h-px w-5 bg-zinc-400" />
              Back to login
            </Link>
            <span className="text-zinc-400">IMPOTA</span>
          </div>
        </div>
      </div>
    </div>
  )
}
