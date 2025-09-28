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
      description: 'Portal overview'
    },
    {
      name: 'Beginner Journey',
      href: '/portal/beginner',
      icon: BookOpen,
      description: 'Complete import journey'
    },
    {
      name: 'Import Guide',
      href: '/portal/guide',
      icon: BookOpen,
      description: 'Step-by-step guide'
    },
    {
      name: 'Documents',
      href: '/portal/documents',
      icon: FileText,
      description: 'Real import docs'
    },
    {
      name: 'Calculator',
      href: '/portal/calculator',
      icon: Calculator,
      description: 'Cost calculator'
    },
    {
      name: 'Japan Auctions',
      href: '/portal/japan-auctions',
      icon: Gavel,
      description: 'Auction guide'
    },
    {
      name: 'Shipping',
      href: '/portal/book-slot',
      icon: Ship,
      description: 'Shipping companies'
    },
    {
      name: 'Agents',
      href: '/portal/agents',
      icon: Users,
      description: 'Verified agents'
    },
  ]
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
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 pt-16">
          <div className="fixed inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
          <nav className="fixed left-0 top-16 bottom-0 w-full sm:w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-base font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-gray-700">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Mobile Menu Footer */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✅ Portal Access Active
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Licensed to:</p>
                    <p className="font-medium text-gray-700 truncate">{userEmail || 'Portal User'}</p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
      <div className="flex h-screen pt-16">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    <div className="flex-1">
                      <div className="text-gray-700 group-hover:text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </nav>
              {/* Sidebar Footer */}
              <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
                <div className="space-y-3">
                  {/* Access Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✅ Portal Access Active
                  </div>
                  {/* User Info */}
                  <div className="text-xs text-gray-500">
                    <p>Licensed to:</p>
                    <p className="font-medium text-gray-700 truncate">{userEmail || 'Portal User'}</p>
                  </div>
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