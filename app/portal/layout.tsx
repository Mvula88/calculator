import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import Watermark from './Watermark'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calculator, Users, BookOpen, Package, Home, LogOut } from 'lucide-react'

async function checkEntitlement(email: string | undefined, userId: string | undefined) {
  console.log('=== ENTITLEMENT CHECK START ===')
  console.log('Checking for email:', email?.toLowerCase())
  console.log('Checking for userId:', userId)
  
  if (!email && !userId) {
    console.log('No email or userId provided')
    return null
  }
  
  // Use service client to bypass RLS
  const supabase = createServiceClient()
  
  // Build the query conditionally
  let query = supabase
    .from('entitlements')
    .select('*')
    .eq('active', true)
  
  // Create OR conditions array
  const conditions = []
  if (email) {
    conditions.push(`email.eq.${email.toLowerCase()}`)
  }
  if (userId) {
    conditions.push(`user_id.eq.${userId}`)
  }
  
  // Apply OR condition if we have any
  if (conditions.length > 0) {
    query = query.or(conditions.join(','))
  }
  
  const { data: entitlements, error } = await query
  
  console.log('Query result:', { entitlements, error })
  
  if (error) {
    console.error('Error checking entitlement:', error)
    return null
  }
  
  // Return the first active entitlement found
  const result = entitlements && entitlements.length > 0 ? entitlements[0] : null
  console.log('=== ENTITLEMENT CHECK END ===', result ? 'Found' : 'Not found')
  return result
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
    // Not logged in - redirect to login
    redirect('/auth/login?redirect=/portal')
  }
  
  // Check entitlement - pass both email and user ID for better matching
  const entitlement = await checkEntitlement(user.email, user.id)
  
  if (!entitlement) {
    // Debug: Log what we're looking for
    console.log('No entitlement found for:', { 
      email: user.email?.toLowerCase(), 
      userId: user.id 
    })
    
    // Let's also check what's actually in the entitlements table for debugging
    const serviceClient = createServiceClient()
    const { data: allEntitlements } = await serviceClient
      .from('entitlements')
      .select('*')
      .limit(10)
    
    console.log('All entitlements in table:', allEntitlements)
    
    // No entitlement - show purchase options with debug info
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Portal Access Required</h1>
          <p className="text-gray-600 mb-8">
            You need to purchase a guide or mastery package to access the portal.
          </p>
          
          {/* Enhanced debug info */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-left text-sm">
            <p className="font-semibold mb-2">Debug Info:</p>
            <p>Your Email: {user.email}</p>
            <p>Your User ID: {user.id}</p>
            <p className="mt-2">Checking database for entitlements...</p>
            
            {allEntitlements && allEntitlements.length > 0 && (
              <div className="mt-4 p-2 bg-white rounded">
                <p className="font-semibold">Recent Entitlements in DB:</p>
                {allEntitlements.map((ent: any, i: number) => (
                  <div key={i} className="text-xs mt-1">
                    Email: {ent.email} | UserID: {ent.user_id?.slice(0,8)}... | Active: {ent.active ? 'Yes' : 'No'}
                  </div>
                ))}
              </div>
            )}
            
            <p className="mt-4 text-xs text-red-600">
              If you see your purchase above but can't access the portal, there may be an email mismatch.
            </p>
          </div>
          
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
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            Already purchased? Check your email for the receipt and contact support.
          </p>
        </div>
      </div>
    )
  }
  
  // User has entitlement - show portal
  const navigation = [
    { name: 'Portal Home', href: '/portal', icon: Home },
    { name: 'Import Guide', href: '/portal/guide', icon: BookOpen },
    { name: 'Calculator', href: '/portal/calculator', icon: Calculator },
    { name: 'Verified Agents', href: '/portal/agents', icon: Users },
    { name: 'Book Container Slot', href: '/portal/book-slot', icon: Package },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Watermark overlay */}
      <Watermark />
      
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Import Portal</h1>
                <span className="ml-3 px-2 py-1 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded">
                  {entitlement.tier === 'mastery' ? 'MASTERY' : 'GUIDE'}
                </span>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">
                {user.email}
              </span>
              <form action="/api/auth/signout" method="POST">
                <Button type="submit" variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile navigation */}
      <div className="sm:hidden border-b bg-white">
        <div className="flex overflow-x-auto px-4 py-2 gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap"
            >
              <item.icon className="h-4 w-4 mr-1" />
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
        </div>
      </main>
    </div>
  )
}