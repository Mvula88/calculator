import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const WHATSAPP_NUMBER = '264814756919'
const WHATSAPP_MESSAGE = "Hi! I'm interested in learning more about importing cars from Japan."

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative isolate overflow-hidden bg-zinc-950 text-white flex flex-col">
      {/* Layered glows */}
      <div className="absolute -top-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-500/[0.06] blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -right-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-500/[0.05] blur-3xl" aria-hidden />

      {/* Printer's registration marks */}
      <div className="hidden md:block absolute top-16 left-6 lg:left-8 h-px w-12 bg-amber-400/40" aria-hidden />
      <div className="hidden md:block absolute top-16 left-6 lg:left-8 h-12 w-px bg-amber-400/40" aria-hidden />
      <div className="hidden md:block absolute top-16 right-6 lg:right-8 h-px w-12 bg-amber-400/40" aria-hidden />
      <div className="hidden md:block absolute top-16 right-6 lg:right-8 h-12 w-px bg-amber-400/40" aria-hidden />

      {/* Top dateline */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-20 sm:pt-24">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-400 font-medium">
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-semibold">Nº 03</span>
            <span className="h-px w-8 bg-zinc-600" />
            <span>Colophon</span>
          </div>
          <span className="hidden md:inline-block text-zinc-500">Index · Credits</span>
        </div>
      </div>

      {/* Main composition */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand block — 5 cols */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-amber-300 font-semibold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              Built for Southern Africa
            </div>

            <h2 className="mt-8 sm:mt-10 font-medium tracking-tighter text-white leading-[0.85] text-[clamp(3.5rem,11vw,8rem)]">
              IMPOTA
            </h2>

            <div className="mt-6 flex items-start gap-3 sm:gap-4 max-w-xl">
              <span className="text-amber-400 text-xl sm:text-2xl leading-none mt-1" aria-hidden>↳</span>
              <p className="italic font-light text-base sm:text-lg text-amber-100/90 leading-snug tracking-tight">
                Educational resources for African car importers.
              </p>
            </div>

            <div className="mt-10 h-px w-20 bg-amber-400/60" />

            <p className="mt-8 max-w-md text-sm text-zinc-400 leading-relaxed">
              Independent guides, calculators, and contacts for first-time importers
              across Namibia, South Africa, Botswana, and Zambia — from auction research
              to driveway delivery.
            </p>

            <p className="mt-6 text-sm text-zinc-500">
              Support —{' '}
              <a
                href="mailto:support@impota.com"
                className="text-zinc-300 hover:text-amber-300 transition-colors"
              >
                support@impota.com
              </a>
            </p>
          </div>

          {/* Directory — 7 cols, 3 sub-columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12 self-start lg:pt-20">
            {/* Countries */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 pb-3 mb-5 border-b border-white/10">
                Countries
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  { href: '/na/guide', label: 'Namibia' },
                  { href: '/za/guide', label: 'South Africa' },
                  { href: '/bw/guide', label: 'Botswana' },
                  { href: '/zm/guide', label: 'Zambia' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition-colors"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Index */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 pb-3 mb-5 border-b border-white/10">
                Index
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/import-guide" className="group inline-flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition-colors">
                    Free guide
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/#countries" className="text-zinc-300 hover:text-amber-300 transition-colors">
                    Choose country
                  </Link>
                </li>
                <li>
                  <Link href="/#get-access" className="text-zinc-300 hover:text-amber-300 transition-colors">
                    What's included
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-zinc-300 hover:text-amber-300 transition-colors">
                    Member login
                  </Link>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition-colors"
                  >
                    WhatsApp
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 pb-3 mb-5 border-b border-white/10">
                Legal
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/terms" className="text-zinc-300 hover:text-amber-300 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-zinc-300 hover:text-amber-300 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="text-zinc-300 hover:text-amber-300 transition-colors">
                    Refund policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-zinc-300 hover:text-amber-300 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-zinc-300 hover:text-amber-300 transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer as a thin editorial note (not a chunky panel) */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-start gap-3 max-w-3xl">
          <span className="text-amber-400/70 text-xs mt-0.5 font-mono">[ note ]</span>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Educational content only. IMPOTA provides guides and information — we do not
            import vehicles, provide clearing services, or act as agents.
          </p>
        </div>
      </div>

      {/* Bottom colophon strip */}
      <div className="relative z-10 border-t border-white/10 bg-zinc-950/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-semibold">© {currentYear}</span>
            <span className="h-px w-8 bg-zinc-700" />
            <span>IMPOTA — All rights reserved</span>
          </div>
          <span className="text-zinc-600">Not affiliated with government agencies</span>
        </div>
      </div>
    </footer>
  )
}
