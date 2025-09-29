'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  BookOpen, 
  FileText, 
  Calculator, 
  Ship, 
  Users, 
  Star,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Globe,
  DollarSign,
  Award,
  Zap,
  Gavel,
  Lock
} from 'lucide-react'

export default function PortalPage() {
  const router = useRouter()
  const { user, userEmail, hasAccess, loading, userTier } = useAuthImmediate()

  const displayEmail = userEmail || 'user@example.com'
  const cleanEmail = displayEmail.startsWith('user_cs_test_') ? 'Portal User' : displayEmail

  // SIMPLIFIED: If user is authenticated, they have access (they paid to create account)
  const entitlement = user ? {
    country: 'na',
    tier: userTier || 'mastery', // Default to mastery if tier not found
    email: cleanEmail
  } : null
  const isMastery = true // Since we only have one tier now

  // Handle redirect in useEffect to avoid hydration issues
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirectTo=/portal')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // If no user, show redirecting message
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // USER IS AUTHENTICATED - SHOW PORTAL
  // No need to check entitlements - if they're logged in, they paid

  const currency = 'N$'
  const countryName = 'Namibia'

  // Quick access cards
  const quickAccessCards = [
    {
      title: '🆕 Beginner Journey',
      description: 'Complete import process & simple calculator',
      icon: Zap,
      href: '/portal/beginner',
      color: 'bg-yellow-100 text-yellow-600',
      available: true
    },
    {
      title: 'Import Guide',
      description: 'Step-by-step instructions',
      icon: BookOpen,
      href: '/portal/guide',
      color: 'bg-blue-100 text-blue-600',
      available: true
    },
    {
      title: 'Documents',
      description: 'Real import examples',
      icon: FileText,
      href: '/portal/documents',
      color: 'bg-green-100 text-green-600',
      available: true
    },
    {
      title: 'Calculator',
      description: 'Advanced duty calculator',
      icon: Calculator,
      href: '/portal/calculator',
      color: 'bg-purple-100 text-purple-600',
      available: isMastery
    },
    {
      title: 'Auctions',
      description: 'Japan bidding guide',
      icon: Gavel,
      href: '/portal/japan-auctions',
      color: 'bg-yellow-100 text-yellow-600',
      available: isMastery
    },
    {
      title: 'Shipping',
      description: 'Companies & booking',
      icon: Ship,
      href: '/portal/book-slot',
      color: 'bg-indigo-100 text-indigo-600',
      available: isMastery
    },
    {
      title: 'Agents',
      description: 'Verified clearing agents',
      icon: Users,
      href: '/portal/agents',
      color: 'bg-rose-100 text-rose-600',
      available: isMastery
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="w-full">
        {/* Welcome Header - Mobile Optimized */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 sm:p-6 mb-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                Welcome back!
              </h1>
              <p className="text-sm sm:text-base text-blue-100 mb-3">
                {isMastery ? 'Import Mastery Member' : 'Mistake Guide Member'}
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                  <CheckCircle className="h-3 w-3" />
                  <span>Active Access</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                  <Award className="h-3 w-3" />
                  <span>Lifetime</span>
                </div>
              </div>
            </div>
            {!isMastery && (
              <Button 
                size="sm" 
                className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => {
                  // Store the user's email before redirecting
                  if (userEmail) {
                    localStorage.setItem('checkout_email', userEmail)
                  }
                  window.location.href = '/na/upsell'
                }}
              >
                <Zap className="h-4 w-4 mr-1" />
                Upgrade
              </Button>
            )}
          </div>
        </div>

        {/* Quick Access - Mobile Optimized */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Quick Access</h2>
            {!isMastery && (
              <span className="text-xs text-gray-500">
                {quickAccessCards.filter(c => c.available).length}/{quickAccessCards.length}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickAccessCards.map((card) => (
              <div key={card.title} className="relative">
                {card.available ? (
                  <Link href={card.href}>
                    <Card className="p-4 hover:shadow-lg transition-all active:scale-95 touch-manipulation h-full">
                      <div className="flex flex-col items-center text-center">
                        <div className={`${card.color} rounded-lg p-3 mb-2`}>
                          <card.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{card.description}</p>
                      </div>
                    </Card>
                  </Link>
                ) : (
                  <Card className="p-4 opacity-60 relative h-full">
                    <div className="absolute inset-0 bg-gray-100/50 rounded-lg flex items-center justify-center">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className={`bg-gray-100 rounded-lg p-3 mb-2`}>
                        <card.icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1 text-gray-400">{card.title}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{card.description}</p>
                    </div>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips - Mobile Optimized */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">Quick Tips</h3>
              <ul className="space-y-1 text-xs text-blue-800">
                <li>• Start with the Beginner Journey for complete beginners</li>
                <li>• Check Documents for real examples</li>
                {isMastery && <li>• Use Calculator before buying</li>}
                {isMastery && <li>• Compare shipping rates</li>}
              </ul>
            </div>
          </div>
        </Card>

        {/* Mobile-Only Bottom Navigation Hint */}
        <div className="mt-8 text-center lg:hidden">
          <p className="text-xs text-gray-500">
            Tap the menu icon above to explore all features
          </p>
        </div>
      </div>
    </main>
  )
}