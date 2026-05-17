'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import Wordmark from '@/components/Wordmark'
import Footer from '@/components/Footer'

const WHATSAPP = '264836757958'
const SUPPORT_EMAIL = 'support@impota.com'

const offices = [
  {
    title: 'Namibian office',
    lines: ['Independence Avenue', 'Windhoek, Namibia'],
  },
  {
    title: 'Registered office',
    lines: ['8195, 1021 E Lincolnway', 'Cheyenne, WY 82001', 'United States'],
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`,
      )}`
      window.location.href = mailto
      setIsSubmitting(false)
      toast.success('Opening your email client…')
    }, 600)
  }

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
                Send word
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/about" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors px-2">
                About
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
              <span>Send word</span>
            </div>
            <span className="hidden md:inline-block text-zinc-500">Mon–Fri · 08:00–18:00 WAT</span>
          </div>

          <Link href="/" className="mt-10 inline-flex items-center text-zinc-400 hover:text-white text-xs uppercase tracking-[0.24em] group transition-colors">
            <ArrowLeft className="h-3.5 w-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <h1 className="mt-10 sm:mt-12 font-serif font-medium tracking-tight text-white leading-[0.92] text-[clamp(2.5rem,7vw,5.5rem)]">
            <span className="block">Questions about the import?</span>
            <span className="block pl-[8vw] sm:pl-[6vw] lg:pl-[10vw] italic font-light text-amber-300/95">
              We answer them.
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed">
            WhatsApp is fastest — usually within a few hours during working days. Email works too. Either way, the person reading your message has actually imported a car.
          </p>
        </div>
      </section>

      {/* QUICK CONTACT — Nº 02 */}
      <section className="border-t border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium mb-12">
            <span className="text-amber-600 font-semibold">Nº 02</span>
            <span className="h-px w-8 bg-zinc-300" />
            <span>Reach us</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi, I have a question about importing a car with IMPOTA.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 sm:p-10 hover:bg-stone-50 transition-colors group"
            >
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-6">
                <MessageCircle className="h-4 w-4 text-amber-500" />
                <span className="text-amber-700 font-semibold">01</span>
                <span className="h-px w-6 bg-zinc-300" />
                <span>WhatsApp</span>
              </div>
              <p className="font-serif text-2xl font-medium tracking-tight text-zinc-900">
                +264 83 675 7958
              </p>
              <p className="mt-3 text-sm text-zinc-600">
                Fastest. Replies within hours, Mon–Fri.
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.24em] text-amber-700 group-hover:text-amber-900 transition-colors">
                Open chat
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('IMPOTA support')}`}
              className="bg-white p-8 sm:p-10 hover:bg-stone-50 transition-colors group"
            >
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-6">
                <Mail className="h-4 w-4 text-amber-500" />
                <span className="text-amber-700 font-semibold">02</span>
                <span className="h-px w-6 bg-zinc-300" />
                <span>Email</span>
              </div>
              <p className="font-serif text-2xl font-medium tracking-tight text-zinc-900">
                {SUPPORT_EMAIL}
              </p>
              <p className="mt-3 text-sm text-zinc-600">
                Reply within 24 hours.
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.24em] text-amber-700 group-hover:text-amber-900 transition-colors">
                Compose
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>

            {/* Hours */}
            <div className="bg-white p-8 sm:p-10">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-6">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-amber-700 font-semibold">03</span>
                <span className="h-px w-6 bg-zinc-300" />
                <span>Hours</span>
              </div>
              <p className="font-serif text-2xl font-medium tracking-tight text-zinc-900">
                Mon–Fri
                <span className="italic font-light text-zinc-500"> · 08:00–18:00 WAT</span>
              </p>
              <p className="mt-3 text-sm text-zinc-600">
                Weekends closed. Messages still go through.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + OFFICES — Nº 03 */}
      <section className="border-t border-zinc-200 bg-stone-50">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium mb-12">
            <span className="text-amber-600 font-semibold">Nº 03</span>
            <span className="h-px w-8 bg-zinc-300" />
            <span>Or send a message</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-700 mb-6">
                <span aria-hidden className="mr-2">↳</span> Use the form
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                Tell us what you need.
              </h2>
              <p className="mt-4 text-zinc-600 max-w-md">
                Submit opens your email client with the message pre-filled — we reply within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 mb-2">
                      Name <span className="text-amber-600">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="!h-12 !px-4 !text-base bg-white border-zinc-300 focus-visible:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 mb-2">
                      Email <span className="text-amber-600">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="!h-12 !px-4 !text-base bg-white border-zinc-300 focus-visible:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 mb-2">
                    Subject <span className="text-amber-600">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    required
                    className="!h-12 !px-4 !text-base bg-white border-zinc-300 focus-visible:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 mb-2">
                    Message <span className="text-amber-600">*</span>
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    placeholder="Tell us about your import question…"
                    required
                    className="bg-white border-zinc-300 focus-visible:ring-amber-400 text-base resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full h-12 px-7"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-900 mr-2" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Offices */}
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber-700 mb-6">
                <span aria-hidden className="mr-2">↳</span> Or our addresses
              </p>
              <h3 className="font-serif text-2xl font-medium tracking-tight leading-tight">
                Where we operate from.
              </h3>

              <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
                {offices.map((office, i) => (
                  <div key={i} className="py-6">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-3">
                      <MapPin className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-amber-700 font-semibold">0{i + 1}</span>
                      <span className="h-px w-6 bg-zinc-300" />
                      <span>{office.title}</span>
                    </div>
                    <div className="space-y-1">
                      {office.lines.map((line, j) => (
                        <p key={j} className="text-base text-zinc-800">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
