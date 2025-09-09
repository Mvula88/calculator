import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import ContentProtection from '@/components/ContentProtection'
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
  X 
} from 'lucide-react'

async function checkEntitlement(email: string | undefined, userId: string | undefined) {
  if (!email && !userId) {
    return null
  }
  
  // USE SERVICE CLIENT TO BYPASS RLS - CRITICAL!
  const supabase = createServiceClient()
  
  let query = supabase
    .from('entitlements')
    .select('*')
    .eq('active', true)
  
  // Check by email or user_id
  const conditions = []
  if (email) {
    conditions.push(`email.eq.${email.toLowerCase()}`)
  }
  if (userId) {
    conditions.push(`user_id.eq.${userId}`)
  }
  
  if (conditions.length > 0) {
    query = query.or(conditions.join(','))
  }
  
  const { data: entitlements, error } = await query
  
  if (error) {
    console.error('Error checking entitlement:', error)
    return null
  }
  
  // If multiple entitlements, return the highest tier (mastery > mistake)
  if (entitlements && entitlements.length > 0) {
    const masteryEntitlement = entitlements.find(e => e.tier === 'mastery')
    return masteryEntitlement || entitlements[0]
  }
  
  return null
}

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login?redirect=/portal')
  }
  
  // Check entitlement using service client
  const entitlement = await checkEntitlement(user.email, user.id)
  
  if (!entitlement) {
    // No entitlement - show purchase options
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Portal Access Required</h1>
          <p className="text-gray-600 mb-8">
            You need to purchase a guide or mastery package to access the portal.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Button asChild size="lg">
              <Link href="/na/guide">
                Namibia Guide (N$499)
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/za/guide">
                South Africa Guide (R499)
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/bw/guide">
                Botswana Guide (P499)
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/zm/guide">
                Zambia Guide (K499)
              </Link>
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            Already purchased? Your entitlement might be processing. Please try again in a moment.
          </p>
        </div>
      </div>
    )
  }
  
  // User has entitlement - show portal with content protection
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
    ...(entitlement.tier === 'mastery' ? [
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
    ] : []),
  ]
  
  return (
    <ContentProtection tier={entitlement.tier}>
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
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-gray-900">IMPOTA</h1>
                    <span className={`text-xs font-medium ${
                      entitlement.tier === 'mastery' 
                        ? 'text-purple-600' 
                        : 'text-blue-600'
                    }`}>
                      {entitlement.tier === 'mastery' ? 'MASTERY EDITION' : 'GUIDE ACCESS'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.email?.split('@')[0]}</p>
                    <p className="text-xs text-gray-500">Account</p>
                  </div>
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <form action="/api/auth/signout" method="POST">
                  <Button type="submit" variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                    <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                    Sign Out
                  </Button>
                </form>
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
                    {/* Tier Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      entitlement.tier === 'mastery' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {entitlement.tier === 'mastery' ? '✨ Mastery Member' : '📚 Guide Member'}
                    </div>
                    
                    {/* User Info */}
                    <div className="text-xs text-gray-500">
                      <p>Licensed to:</p>
                      <p className="font-medium text-gray-700 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Mobile Sidebar - Sliding Panel */}
          <div className="lg:hidden">
            <div className="fixed inset-0 z-40 hidden" id="mobile-sidebar-backdrop">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>
              <div className="fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white">
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                      <Calculator className="h-5 w-5 text-white" />
                    </div>
                    <span className="ml-2 text-lg font-semibold">IMPOTA</span>
                  </div>
                  <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="mt-5 px-2 space-y-1 overflow-y-auto">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-gray-900"
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      <div className="flex-1">
                        <div className="text-gray-700 group-hover:text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
              
              {/* Footer notice */}
              <div className="mt-16 py-4 text-center text-xs text-gray-500">
                <p>This content is licensed to {user.email} • Do not share or redistribute</p>
                <p className="text-red-500 mt-2">⚠️ Screenshots and copying are disabled for content protection</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ContentProtection>
  )
}