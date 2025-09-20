'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
import SimpleContentProtection from '@/components/SimpleContentProtection'
import { createClient } from '@/lib/supabase/client'
import { 
  Calculator, 
  Users, 
  BookOpen, 
  Package, 
  Home, 
  LogOut, 
  Star, 
  FileText,
  Ship,
  Menu,
  X,
  Gavel 
} from 'lucide-react'
import Image from 'next/image'

export default function SimplePortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, userEmail, hasAccess, loading, error, signOut } = useAuthImmediate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    // Don't check auth for activation or login pages
    if (pathname === '/portal/login' || 
        pathname === '/portal/activate' || 
        pathname === '/portal/activate-simple' ||
        pathname === '/portal/debug') {
      return
    }
    
    // Don't auto-redirect - let the user click the login button
    // This prevents redirect loops
  }, [pathname])
  
  const handleSignOut = async () => {
    // Clear all auth-related storage first
    localStorage.clear()
    sessionStorage.clear()
    // Sign out from Supabase
    const supabase = createClient()
    await supabase.auth.signOut()
    // Force redirect to home page with a full page reload
    window.location.href = '/'
  }
  
  // For activation/login pages, just render the content
  if (pathname === '/portal/login' || 
      pathname === '/portal/activate' || 
      pathname === '/portal/activate-simple') {
    return <>{children}</>
  }
  
  // Show loading state briefly
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portal...</p>
        </div>
      </div>
    )
  }
  
  // If there's an error or no user, redirect to login
  if (error || !user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login?redirectTo=/portal'
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }
  
  const navigation = [
    {
      name: 'Dashboard',
      href: '/portal',
      icon: Home,
      description: 'Portal overview',
      badge: null
    },
    {
      name: 'Import Guide',
      href: '/portal/guide',
      icon: BookOpen,
      description: 'Step-by-step guide',
      badge: null
    },
    {
      name: 'Documents',
      href: '/portal/documents',
      icon: FileText,
      description: 'Real import docs',
      badge: 'NEW'
    },
    {
      name: 'Mastery Tools',
      href: '/portal/mastery',
      icon: Star,
      description: 'Advanced features',
      badge: null
    },
    {
      name: 'Calculator',
      href: '/portal/calculator',
      icon: Calculator,
      description: 'Cost calculator',
      badge: null
    },
    {
      name: 'Japan Auctions',
      href: '/portal/japan-auctions',
      icon: Gavel,
      description: 'Auction guide',
      badge: null
    },
    {
      name: 'Shipping',
      href: '/portal/book-slot',
      icon: Ship,
      description: 'Shipping companies',
      badge: null
    },
    {
      name: 'Agents',
      href: '/portal/agents',
      icon: Users,
      description: 'Verified agents',
      badge: null
    },
  ]

  // Check if current path is active
  const isActive = (href: string) => {
    if (href === '/portal') {
      return pathname === '/portal'
    }
    return pathname.startsWith(href)
  }
  
  return (
    <SimpleContentProtection userEmail={userEmail}>
        <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center ml-2 lg:ml-0">
                <Link href="/portal" className="flex items-center gap-2 sm:gap-3">
                  <Image 
                    src="/impota-logo.png" 
                    alt="IMPOTA" 
                    width={120} 
                    height={32}
                    className="h-6 sm:h-8 w-auto"
                    priority
                  />
                  <span className="hidden sm:inline-flex text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                    PORTAL
                  </span>
                </Link>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {userEmail ? userEmail.split('@')[0] : 'User'}
                  </p>
                  <p className="text-xs text-gray-500">Account</p>
                </div>
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">
                <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Exit</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Professional Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 pt-16">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="fixed left-0 top-16 bottom-0 w-full sm:w-80 bg-white shadow-2xl overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {userEmail ? userEmail.split('@')[0] : 'Portal User'}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-blue-100">Active Member</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <div className="p-4">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        group relative flex items-center px-4 py-3 text-base font-medium rounded-xl
                        transition-all duration-200
                        ${active
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
                          : 'hover:bg-gray-50 active:bg-gray-100 text-gray-700'
                        }
                      `}
                    >
                      {/* Active Indicator */}
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
                      )}

                      {/* Icon */}
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-lg mr-3
                        ${active
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                          : 'bg-gray-100'
                        }
                      `}>
                        <item.icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-600'}`} />
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`${active ? 'font-semibold' : ''}`}>
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${active ? 'text-blue-600' : 'text-gray-500'}`}>
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Mobile Menu Footer */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="space-y-4">
                  {/* Status Card */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-green-700">MEMBERSHIP STATUS</span>
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Import Mastery</p>
                    <p className="text-xs text-gray-600 mt-1">Lifetime Access</p>
                  </div>

                  {/* Help Button */}
                  <Link href="/portal/help" className="flex items-center justify-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm text-gray-700 font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Need Help?
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
      
      <div className="flex h-screen pt-16">
        {/* Professional Sidebar Navigation */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-72 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex flex-col flex-grow border-r border-gray-200 overflow-y-auto">
              {/* Sidebar Header */}
              <div className="px-6 py-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-white">
                      {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {userEmail ? userEmail.split('@')[0] : 'Portal User'}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-gray-500">Active Member</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-6 space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl
                        transition-all duration-200 ease-in-out
                        ${active
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100'
                          : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                        }
                      `}
                    >
                      {/* Active Indicator */}
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
                      )}

                      {/* Icon Container */}
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-lg mr-3
                        ${active
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-md'
                          : 'bg-gray-100 group-hover:bg-gray-200'
                        }
                      `}>
                        <item.icon className={`
                          h-5 w-5
                          ${active ? 'text-white' : 'text-gray-600 group-hover:text-gray-700'}
                        `} />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`${active ? 'font-semibold' : ''}`}>
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className={`
                          text-xs mt-0.5
                          ${active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-600'}
                        `}>
                          {item.description}
                        </p>
                      </div>

                      {/* Hover Arrow */}
                      {!active && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Professional Sidebar Footer */}
              <div className="px-6 py-6 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
                <div className="space-y-4">
                  {/* Status Card */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-green-700">MEMBERSHIP STATUS</span>
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Import Mastery</p>
                    <p className="text-xs text-gray-600 mt-1">Lifetime Access</p>
                  </div>

                  {/* Help Link */}
                  <Link href="/portal/help" className="flex items-center justify-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm text-gray-700 font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Need Help?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
    </SimpleContentProtection>
  )
}