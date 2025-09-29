'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
      color: 'text-yellow-500',
      bgGradient: 'from-yellow-500 to-orange-500',
      available: true
    },
    {
      title: 'Import Guide',
      description: 'Step-by-step instructions',
      icon: BookOpen,
      href: '/portal/guide',
      color: 'text-blue-500',
      bgGradient: 'from-blue-500 to-indigo-500',
      available: true
    },
    {
      title: 'Documents',
      description: 'Real import examples',
      icon: FileText,
      href: '/portal/documents',
      color: 'text-green-500',
      bgGradient: 'from-green-500 to-emerald-500',
      available: true
    },
    {
      title: 'Calculator',
      description: 'Advanced duty calculator',
      icon: Calculator,
      href: '/portal/calculator',
      color: 'text-purple-500',
      bgGradient: 'from-purple-500 to-pink-500',
      available: isMastery
    },
    {
      title: 'Auctions',
      description: 'Japan bidding guide',
      icon: Gavel,
      href: '/portal/japan-auctions',
      color: 'text-amber-500',
      bgGradient: 'from-amber-500 to-orange-500',
      available: isMastery
    },
    {
      title: 'Shipping',
      description: 'Companies & booking',
      icon: Ship,
      href: '/portal/book-slot',
      color: 'text-indigo-500',
      bgGradient: 'from-indigo-500 to-blue-500',
      available: isMastery
    },
    {
      title: 'Agents',
      description: 'Verified clearing agents',
      icon: Users,
      href: '/portal/agents',
      color: 'text-rose-500',
      bgGradient: 'from-rose-500 to-pink-500',
      available: isMastery
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">Welcome back!</h1>
                <p className="text-lg text-white/80">
                  {isMastery ? 'Import Mastery Member' : 'Mistake Guide Member'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active Access
                  </Badge>
                  <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                    <Award className="mr-1 h-3 w-3" />
                    Lifetime
                  </Badge>
                </div>
              </div>
              {!isMastery && (
                <Button
                  className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90"
                  onClick={() => {
                    // Store the user's email before redirecting
                    if (userEmail) {
                      localStorage.setItem('checkout_email', userEmail)
                    }
                    window.location.href = '/na/upsell'
                  }}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Upgrade
                </Button>
              )}
            </div>
          </motion.div>

          {/* Quick Access Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Quick Access</h2>
              {!isMastery && (
                <span className="text-sm text-muted-foreground">
                  {quickAccessCards.filter(c => c.available).length}/{quickAccessCards.length}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {quickAccessCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={card.available ? { scale: 1.02, y: -5 } : {}}
                  whileTap={card.available ? { scale: 0.98 } : {}}
                >
                  {card.available ? (
                    <Link href={card.href}>
                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 h-full">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                              <card.icon className={`h-6 w-6 ${card.color}`} />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <CardTitle className="text-lg mb-2">{card.title}</CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <Card className="overflow-hidden rounded-3xl border-2 opacity-60 relative h-full">
                      <div className="absolute inset-0 bg-muted/50 rounded-3xl flex items-center justify-center z-10">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                            <card.icon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <CardTitle className="text-lg mb-2 text-muted-foreground">{card.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">{card.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Quick Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 flex-shrink-0">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-3 text-lg">Quick Tips</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
                        <span>Start with the Beginner Journey for complete beginners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
                        <span>Check Documents for real examples</span>
                      </li>
                      {isMastery && (
                        <>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
                            <span>Use Calculator before buying</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
                            <span>Compare shipping rates</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mobile-Only Bottom Navigation Hint */}
          <div className="text-center lg:hidden">
            <p className="text-sm text-muted-foreground">
              Tap the menu icon above to explore all features
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}