'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
import SimpleContentProtection from '@/components/SimpleContentProtection'
import PortalScrollToTop from '@/components/PortalScrollToTop'
import { createClient } from '@/lib/supabase/client'
import {
  Calculator,
  Users,
  BookOpen,
  Home,
  LogOut,
  FileText,
  Ship,
  Menu,
  X,
  Gavel,
  Loader2,
} from 'lucide-react'

export default function SimplePortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, userEmail, loading, error } = useAuthImmediate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    localStorage.clear()
    sessionStorage.clear()
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  // Bypass shell for activation/login pages
  if (
    pathname === '/portal/login' ||
    pathname === '/portal/activate' ||
    pathname === '/portal/activate-simple'
  ) {
    return <>{children}</>
  }

  // Loading state — editorial
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Loading portal
          </p>
        </div>
      </div>
    )
  }

  // Auth error — redirect
  if (error || !user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login?redirectTo=/portal'
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Redirecting to login
          </p>
        </div>
      </div>
    )
  }

  const navigation = [
    { name: 'Dashboard', href: '/portal', icon: Home, description: 'Portal overview' },
    { name: 'Beginner Journey', href: '/portal/beginner', icon: BookOpen, description: 'Complete import journey' },
    { name: 'Import Guide', href: '/portal/guide', icon: BookOpen, description: 'Step-by-step guide' },
    { name: 'Documents', href: '/portal/documents', icon: FileText, description: 'Real import docs' },
    { name: 'Calculator', href: '/portal/calculator', icon: Calculator, description: 'Cost calculator' },
    { name: 'Japan Auctions', href: '/portal/japan-auctions', icon: Gavel, description: 'Auction guide' },
    { name: 'Shipping', href: '/portal/book-slot', icon: Ship, description: 'Shipping companies' },
    { name: 'Agents', href: '/portal/agents', icon: Users, description: 'Verified agents' },
  ]

  const isActive = (href: string) =>
    href === '/portal' ? pathname === '/portal' : pathname?.startsWith(href)

  return (
    <SimpleContentProtection userEmail={userEmail}>
      <div className="min-h-screen bg-stone-50">
        {/* Top header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-zinc-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Logo + portal mono tag */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden h-9 w-9 rounded-full border border-zinc-200 hover:bg-zinc-50 flex items-center justify-center transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-4 w-4 text-zinc-700" strokeWidth={1.75} />
                  ) : (
                    <Menu className="h-4 w-4 text-zinc-700" strokeWidth={1.75} />
                  )}
                </button>

                <Link
                  href="/portal"
                  className="flex items-center gap-3 active:opacity-70 transition-opacity"
                >
                  <Image
                    src="/impota-logo.png"
                    alt="IMPOTA"
                    width={120}
                    height={32}
                    className="h-6 sm:h-7 w-auto"
                    priority
                  />
                </Link>

                <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  <span className="h-px w-5 bg-zinc-300" />
                  <span className="text-amber-600 font-semibold">Portal</span>
                </span>
              </div>

              {/* User + sign out */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-900 truncate max-w-[140px]">
                      {userEmail ? userEmail.split('@')[0] : 'User'}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                      Account
                    </p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-amber-50 ring-1 ring-amber-200 flex items-center justify-center">
                    <span className="text-sm font-semibold text-amber-700">
                      {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleSignOut}
                  size="sm"
                  variant="ghost"
                  className="h-9 px-3 rounded-full border border-zinc-200 hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 text-xs sm:text-sm font-medium"
                >
                  <LogOut className="h-3.5 w-3.5 sm:mr-1.5" strokeWidth={1.75} />
                  <span className="hidden sm:inline">Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 pt-14 sm:pt-16">
            <div
              className="fixed inset-0 bg-zinc-900/45 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <nav className="fixed left-0 top-14 sm:top-16 bottom-0 w-full sm:w-80 bg-white border-r border-zinc-200 overflow-y-auto">
              <div className="px-4 py-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 pb-3 mb-3 border-b border-zinc-200">
                  Sections
                </p>
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                          active
                            ? 'bg-amber-50 text-zinc-900 ring-1 ring-amber-200'
                            : 'hover:bg-zinc-50 text-zinc-700'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 flex-shrink-0 ${active ? 'text-amber-600' : 'text-zinc-400'}`}
                          strokeWidth={1.75}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-[11px] text-zinc-500">{item.description}</div>
                        </div>
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                        )}
                      </Link>
                    )
                  })}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-zinc-200 space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Access active
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Licensed to</p>
                    <p className="mt-1 text-sm text-zinc-800 truncate">{userEmail || 'Portal User'}</p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}

        <div className="flex h-screen pt-14 sm:pt-16">
          {/* Desktop sidebar */}
          <aside className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64 bg-white border-r border-zinc-200">
              <div className="flex-1 px-3 py-6 overflow-y-auto">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 px-3 pb-3 mb-3 border-b border-zinc-200">
                  Sections
                </p>
                <nav className="space-y-0.5">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          active
                            ? 'bg-amber-50 text-zinc-900 ring-1 ring-inset ring-amber-200'
                            : 'hover:bg-zinc-50 text-zinc-700'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 flex-shrink-0 ${
                            active ? 'text-amber-600' : 'text-zinc-400 group-hover:text-zinc-600'
                          }`}
                          strokeWidth={1.75}
                        />
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                            {item.name}
                          </div>
                          <div className="text-[11px] text-zinc-500 truncate">{item.description}</div>
                        </div>
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                        )}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* Sidebar footer */}
              <div className="flex-shrink-0 px-4 py-4 border-t border-zinc-200 bg-stone-50/40 space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Access active
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Licensed to</p>
                  <p className="mt-1 text-sm text-zinc-800 truncate">{userEmail || 'Portal User'}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 overflow-y-auto">
            <div className="py-4 sm:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
            </div>
          </main>
        </div>

        <PortalScrollToTop />
      </div>
    </SimpleContentProtection>
  )
}
