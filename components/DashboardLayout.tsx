'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calculator,
  LayoutDashboard,
  Users,
  BookOpen,
  Package,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText,
  DollarSign,
  Ship,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Stats'
    },
    {
      name: 'Calculator',
      href: '/calculator',
      icon: Calculator,
      description: 'Import Cost Calculator',
      badge: 'PRO'
    },
    {
      name: 'Shipping Routes',
      href: '/container-sharing',
      icon: Ship,
      description: 'Japan to SADC Routes'
    },
    {
      name: 'Clearing Agents',
      href: '/agents',
      icon: Users,
      description: 'Verified Partners'
    },
    {
      name: 'Import Guides',
      href: '/guides',
      icon: BookOpen,
      description: 'Step-by-Step Guides'
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: FileText,
      description: 'Templates & Checklists'
    }
  ]

  const bottomNavigation = [
    {
      name: 'Support',
      href: '/support',
      icon: HelpCircle,
      description: 'Get Help'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account Settings'
    }
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white shadow-lg"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
        sidebarCollapsed ? "w-20" : "w-72",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">ImportCalc Pro</h1>
                <p className="text-xs text-gray-500">Vehicle Import Platform</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <Badge className="mt-1" variant="default">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    PRO Member
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-blue-700" : "text-gray-400"
                  )} />
                  {!sidebarCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge className="h-5" variant="secondary">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t px-3 py-4 space-y-1">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-blue-700" : "text-gray-400"
                  )} />
                  {!sidebarCollapsed && (
                    <div className="flex-1">
                      <span>{item.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  )}
                </Link>
              )
            })}
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              {!sidebarCollapsed && <span>Sign Out</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
      )}>
        <div className="min-h-screen">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}