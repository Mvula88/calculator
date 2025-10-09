'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import WelcomeOnboarding from '@/components/portal/WelcomeOnboarding'
import SupportContact from '@/components/portal/SupportContact'
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
  Lock,
  Rocket
} from 'lucide-react'

export default function PortalPage() {
  const router = useRouter()
  const { user, userEmail, hasAccess, loading, userTier } = useAuthImmediate()
  const [showWelcome, setShowWelcome] = useState(false)

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

  // Check if this is the user's first login
  useEffect(() => {
    if (user && userEmail) {
      const hasSeenWelcome = localStorage.getItem(`welcome_seen_${userEmail}`)
      if (!hasSeenWelcome) {
        setShowWelcome(true)
      }
    }
  }, [user, userEmail])

  const handleCloseWelcome = () => {
    if (userEmail) {
      localStorage.setItem(`welcome_seen_${userEmail}`, 'true')
    }
    setShowWelcome(false)
  }

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
      title: '🚀 Start Here',
      description: 'New? Start your learning journey',
      icon: Rocket,
      href: '/portal/start-here',
      color: 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600',
      available: true,
      featured: true
    },
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
      {/* Welcome Modal for First-Time Users */}
      {showWelcome && (
        <WelcomeOnboarding
          userEmail={cleanEmail}
          onClose={handleCloseWelcome}
        />
      )}

      <div className="w-full">
        {/* Welcome Header - Mobile Optimized */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                Welcome back!
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-blue-100 mb-2 sm:mb-3">
                {isMastery ? 'Import Mastery Member' : 'Mistake Guide Member'}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
                className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 min-h-[44px] px-4 py-2.5 font-semibold"
                onClick={() => {
                  // Store the user's email before redirecting
                  if (userEmail) {
                    localStorage.setItem('checkout_email', userEmail)
                  }
                  window.location.href = '/na/upsell'
                }}
              >
                <Zap className="h-4 w-4 mr-1.5" />
                Upgrade
              </Button>
            )}
          </div>
        </div>

        {/* Quick Access - Mobile Optimized */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Quick Access</h2>
            {!isMastery && (
              <span className="text-xs text-gray-500">
                {quickAccessCards.filter(c => c.available).length}/{quickAccessCards.length}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
            {quickAccessCards.map((card) => (
              <div key={card.title} className="relative">
                {card.available ? (
                  <Link href={card.href}>
                    <Card className="p-3 sm:p-4 hover:shadow-lg transition-all active:scale-95 touch-manipulation h-full min-h-[120px] sm:min-h-[140px]">
                      <div className="flex flex-col items-center text-center h-full justify-center">
                        <div className={`${card.color} rounded-lg p-2.5 sm:p-3 mb-2`}>
                          <card.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <h3 className="font-semibold text-xs sm:text-sm mb-1 leading-tight">{card.title}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">{card.description}</p>
                      </div>
                    </Card>
                  </Link>
                ) : (
                  <Card className="p-3 sm:p-4 opacity-60 relative h-full min-h-[120px] sm:min-h-[140px]">
                    <div className="absolute inset-0 bg-gray-100/50 rounded-lg flex items-center justify-center">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <div className="flex flex-col items-center text-center h-full justify-center">
                      <div className={`bg-gray-100 rounded-lg p-2.5 sm:p-3 mb-2`}>
                        <card.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-xs sm:text-sm mb-1 text-gray-400 leading-tight">{card.title}</h3>
                      <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-2">{card.description}</p>
                    </div>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path Highlight - Mobile Optimized */}
        <Card className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 mb-4 sm:mb-6">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-purple-900 mb-1.5 sm:mb-2 text-xs sm:text-sm">Suggested Learning Path</h3>
              <ol className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-xs text-purple-800 mb-2">
                <li>1. Start with Beginner Journey (15-20 min)</li>
                <li>2. Study the Complete Guide (30-45 min)</li>
                <li>3. Review Real Documents (20-30 min)</li>
                <li>4. Use the Calculator before buying</li>
              </ol>
              <Link href="/portal/start-here">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                  <Rocket className="h-3 w-3 mr-1" />
                  View Full Learning Path
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Quick Tips - Mobile Optimized */}
        <Card className="p-3 sm:p-4 bg-blue-50 border-blue-200 mb-4 sm:mb-6">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-blue-900 mb-1.5 sm:mb-2 text-xs sm:text-sm">Quick Tips</h3>
              <ul className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-xs text-blue-800">
                <li>• Start with Beginner Journey</li>
                <li>• Check Documents for examples</li>
                {isMastery && <li>• Use Calculator before buying</li>}
                {isMastery && <li>• Compare shipping rates</li>}
              </ul>
            </div>
          </div>
        </Card>

        {/* Support Section */}
        <div className="mb-4 sm:mb-6">
          <SupportContact />
        </div>

        {/* Mobile-Only Bottom Navigation Hint */}
        <div className="mt-6 sm:mt-8 text-center lg:hidden">
          <p className="text-[11px] sm:text-xs text-gray-500">
            Tap the menu icon to explore all features
          </p>
        </div>
      </div>
    </main>
  )
}