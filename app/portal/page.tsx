import { createClient, createServiceClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { 
  BookOpen, 
  Calculator, 
  Users, 
  Package, 
  TrendingUp, 
  Clock, 
  Shield, 
  Award,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Truck
} from 'lucide-react'

async function getUserEntitlement(userId: string) {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('entitlements')
    .select('*')
    .eq('user_id', userId)
    .eq('active', true)
    .single()
  
  return data
}

async function getSessionEntitlement() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('portal_session')
  
  if (!sessionCookie) return null
  
  try {
    const session = JSON.parse(sessionCookie.value)
    
    // Verify the session is still valid
    const supabase = createServiceClient()
    const { data } = await supabase
      .from('entitlements')
      .select('*')
      .eq('stripe_session_id', session.sessionId)
      .eq('email', session.email)
      .eq('active', true)
      .single()
    
    return data
  } catch (error) {
    console.error('Session parse error:', error)
    return null
  }
}

export default async function PortalHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Check both authenticated user and session-based access
  let entitlement = null
  let userEmail = null
  
  if (user) {
    entitlement = await getUserEntitlement(user.id)
    userEmail = user.email
  } else {
    // Try session-based access
    entitlement = await getSessionEntitlement()
    userEmail = entitlement?.email
  }
  
  // If no access at all, redirect to login
  if (!entitlement) {
    // This will be handled by middleware
    return null
  }
  
  const isMastery = entitlement?.tier === 'mastery'

  const stats = [
    {
      label: 'Cars Successfully Imported',
      value: '12,847',
      change: '+23%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Average Duty Saved',
      value: 'R8,450',
      change: 'per vehicle',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      label: 'Processing Time',
      value: '14 days',
      change: 'average',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      label: 'Success Rate',
      value: '98.7%',
      change: 'clearance',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ]

  const quickActions = [
    {
      title: 'Import Guide',
      description: 'Step-by-step process for importing your vehicle',
      icon: BookOpen,
      href: '/portal/guide',
      available: true,
      premium: false
    },
    {
      title: 'Duty Calculator',
      description: 'Calculate exact duties and fees for your vehicle',
      icon: Calculator,
      href: '/portal/calculator',
      available: isMastery,
      premium: true
    },
    {
      title: 'Verified Agents',
      description: 'Connect with trusted clearing agents',
      icon: Users,
      href: '/portal/agents',
      available: isMastery,
      premium: true
    },
    {
      title: 'Book Container Slot',
      description: 'Reserve your container shipping slot',
      icon: Package,
      href: '/portal/book-slot',
      available: isMastery,
      premium: true
    }
  ]

  const recentUpdates = [
    {
      title: 'New SARS Duty Rates Effective March 2024',
      description: 'Updated duty calculation tables for all vehicle categories',
      time: '2 days ago',
      type: 'important'
    },
    {
      title: 'Port Delays Expected at Durban',
      description: 'Container congestion expected to last 2-3 weeks',
      time: '1 week ago',
      type: 'warning'
    },
    {
      title: 'New Agent Partnership: Cape Town',
      description: 'Premium clearing agent now available in Western Cape',
      time: '2 weeks ago',
      type: 'info'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your Import Portal
        </h1>
        <p className="text-gray-600">
          Your complete resource for importing vehicles into South Africa, Namibia, Botswana, and Zambia.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="text-sm text-gray-600">
            Licensed to: {userEmail}
          </span>
          {isMastery && (
            <div className="flex items-center gap-1 ml-4">
              <Award className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">MASTERY ACCESS</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm ${stat.color} mt-1`}>
                  {stat.change}
                </p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="text-center">
                <action.icon className={`h-12 w-12 mx-auto mb-4 ${
                  action.available ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <h3 className="text-lg font-semibold mb-2">
                  {action.title}
                  {action.premium && (
                    <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded">
                      MASTERY
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {action.description}
                </p>
                {action.available ? (
                  <Button asChild className="w-full">
                    <Link href={action.href}>
                      Access Now
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Requires Mastery
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Updates</h2>
        <div className="space-y-4">
          {recentUpdates.map((update, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  update.type === 'important' ? 'bg-red-100' :
                  update.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <AlertCircle className={`h-5 w-5 ${
                    update.type === 'important' ? 'text-red-600' :
                    update.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{update.title}</h3>
                  <p className="text-gray-600 mt-1">{update.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{update.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Benefits Section */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use Our Portal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Proven Process</h3>
            <p className="text-sm text-gray-600">
              Battle-tested methods used by professional importers for over 10 years
            </p>
          </div>
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Compliance Guaranteed</h3>
            <p className="text-sm text-gray-600">
              Stay compliant with all SARS, NRCS, and DOT regulations
            </p>
          </div>
          <div className="text-center">
            <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Save Thousands</h3>
            <p className="text-sm text-gray-600">
              Avoid costly mistakes and hidden fees that trap amateur importers
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}