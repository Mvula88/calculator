import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import ContentProtection from '@/components/ContentProtection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calculator, Users, BookOpen, Package, Home, LogOut } from 'lucide-react'

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
    { name: 'Portal Home', href: '/portal', icon: Home },
    { name: 'Import Guide', href: '/portal/guide', icon: BookOpen },
    ...(entitlement.tier === 'mastery' ? [
      { name: 'Calculator', href: '/portal/calculator', icon: Calculator },
      { name: 'Verified Agents', href: '/portal/agents', icon: Users },
      { name: 'Book Container Slot', href: '/portal/book-slot', icon: Package },
    ] : []),
  ]
  
  return (
    <ContentProtection tier={entitlement.tier}>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {/* Logo and Brand */}
                <div className="flex-shrink-0 flex items-center space-x-3 mr-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <Calculator className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Import Portal</h1>
                    <span className={`text-xs font-medium ${
                      entitlement.tier === 'mastery' 
                        ? 'text-purple-600' 
                        : 'text-blue-600'
                    }`}>
                      {entitlement.tier === 'mastery' ? 'MASTERY EDITION' : 'GUIDE ACCESS'}
                    </span>
                  </div>
                </div>
                
                {/* Navigation Links */}
                <div className="hidden sm:flex sm:space-x-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{user.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-500">Account</p>
                    </div>
                    <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <form action="/api/auth/signout" method="POST">
                  <Button type="submit" variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Mobile navigation */}
        <div className="sm:hidden bg-white shadow-sm">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.email?.split('@')[0]}</p>
                  <p className="text-xs text-gray-500 uppercase">
                    {entitlement.tier === 'mastery' ? 'Mastery' : 'Guide'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex overflow-x-auto px-2 py-2 gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg whitespace-nowrap"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <main className="relative">
          {children}
          
          {/* Footer notice */}
          <div className="mt-16 py-4 text-center text-xs text-gray-500">
            <p>This content is licensed to {user.email} • Do not share or redistribute</p>
            <p className="text-red-500 mt-2">⚠️ Screenshots and copying are disabled for content protection</p>
          </div>
        </main>
      </div>
    </ContentProtection>
  )
}