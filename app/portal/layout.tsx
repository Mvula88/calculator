'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  
  useEffect(() => {
    // Don't check auth for activation or login pages
    if (pathname === '/portal/login' || 
        pathname === '/portal/activate' || 
        pathname === '/portal/activate-simple') {
      setHasAccess(true)
      return
    }
    
    // Check for session in cookie or localStorage
    let session = null
    
    // Check cookie
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'impota_session') {
        try {
          session = JSON.parse(decodeURIComponent(value))
          break
        } catch (e) {
          console.error('Invalid cookie session')
        }
      }
    }
    
    // Fallback to localStorage
    if (!session) {
      const stored = localStorage.getItem('impota_session')
      if (stored) {
        try {
          session = JSON.parse(stored)
        } catch (e) {
          console.error('Invalid localStorage session')
        }
      }
    }
    
    if (session && session.email) {
      setHasAccess(true)
      // Clean up email display if it's a session-based email
      const email = session.email
      const cleanEmail = email.startsWith('user_cs_test_') ? 'Portal User' : email
      setUserEmail(cleanEmail)
    } else {
      setHasAccess(false)
      router.replace('/portal/login')
    }
  }, [pathname, router])
  
  const handleSignOut = () => {
    // Clear session
    document.cookie = 'impota_session=; path=/; max-age=0'
    localStorage.removeItem('impota_session')
    router.replace('/portal/login')
  }
  
  // Don't render anything while checking access
  if (hasAccess === null) {
    return null
  }
  
  // For activation/login pages, just render the content
  if (pathname === '/portal/login' || 
      pathname === '/portal/activate' || 
      pathname === '/portal/activate-simple') {
    return <>{children}</>
  }
  
  // No access - this shouldn't happen as we redirect above
  if (!hasAccess) {
    return null
  }
  
  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/portal', 
      icon: Home,
      description: 'Portal overview'
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
      name: 'Mastery Tools', 
      href: '/portal/mastery', 
      icon: Star,
      description: 'Advanced features'
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
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <button className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <Link href="/portal" className="flex items-center gap-3">
                  <Image 
                    src="/impota-logo.png" 
                    alt="IMPOTA" 
                    width={120} 
                    height={32}
                    className="h-8 w-auto"
                    priority
                  />
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                    PORTAL ACCESS
                  </span>
                </Link>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
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
              <Button onClick={handleSignOut} variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
      
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
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}