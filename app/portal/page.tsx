'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
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
  Package,
  DollarSign,
  AlertCircle,
  Truck,
  X,
  Award,
  BarChart3,
  FileCheck,
  Zap
} from 'lucide-react'

export default function PortalPage() {
  const [user, setUser] = useState<any>(null)
  const [entitlement, setEntitlement] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAccess()
  }, [])

  async function checkAccess() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login?redirect=/portal')
        return
      }

      setUser(user)

      // Check entitlement
      const { data: entitlements } = await supabase
        .from('entitlements')
        .select('*')
        .eq('active', true)
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)

      if (entitlements && entitlements.length > 0) {
        const masteryEntitlement = entitlements.find(e => e.tier === 'mastery')
        setEntitlement(masteryEntitlement || entitlements[0])
      }
    } catch (error) {
      console.error('Error checking access:', error)
    } finally {
      setLoading(false)
    }
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

  if (!entitlement) {
    router.push('/auth/login?redirect=/portal')
    return null
  }

  const currency = entitlement.country === 'na' ? 'N$' :
                   entitlement.country === 'za' ? 'R' :
                   entitlement.country === 'bw' ? 'P' :
                   entitlement.country === 'zm' ? 'K' : 'N$'

  const countryName = entitlement.country === 'na' ? 'Namibia' :
                      entitlement.country === 'za' ? 'South Africa' :
                      entitlement.country === 'bw' ? 'Botswana' :
                      entitlement.country === 'zm' ? 'Zambia' : 'Namibia'

  const isMastery = entitlement.tier === 'mastery'

  // Statistics
  const stats = [
    {
      label: 'Average Savings',
      value: `${currency}${entitlement.country === 'zm' ? '500K' : '50K'}+`,
      change: 'Per import',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Import Time',
      value: '4-6 weeks',
      change: 'Japan to port',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Success Rate',
      value: '98%',
      change: 'First-time imports',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Members',
      value: '500+',
      change: 'Active importers',
      icon: Globe,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  // Quick access cards
  const quickAccessCards = [
    {
      title: 'Import Guide',
      description: 'Complete step-by-step import process',
      icon: BookOpen,
      href: '/portal/guide',
      color: 'from-blue-500 to-blue-600',
      available: true,
      stats: '15 chapters',
      highlight: 'Start Here'
    },
    {
      title: 'Real Documents',
      description: 'Actual import paperwork examples',
      icon: FileText,
      href: '/portal/documents',
      color: 'from-green-500 to-green-600',
      available: true,
      stats: '20+ samples',
      highlight: 'Popular'
    },
    {
      title: 'Cost Calculator',
      description: 'Calculate total import costs instantly',
      icon: Calculator,
      href: '/portal/calculator',
      color: 'from-purple-500 to-purple-600',
      available: isMastery,
      stats: 'Live rates',
      highlight: 'Mastery'
    },
    {
      title: 'Shipping Lines',
      description: 'Verified shipping companies & rates',
      icon: Ship,
      href: '/portal/book-slot',
      color: 'from-cyan-500 to-cyan-600',
      available: isMastery,
      stats: '6 partners',
      highlight: 'Mastery'
    },
    {
      title: 'Trusted Agents',
      description: 'Pre-verified clearing agents',
      icon: Users,
      href: '/portal/agents',
      color: 'from-orange-500 to-orange-600',
      available: isMastery,
      stats: '10+ agents',
      highlight: 'Mastery'
    },
    {
      title: 'Advanced Tools',
      description: 'Premium import features & tools',
      icon: Star,
      href: '/portal/mastery',
      color: 'from-yellow-500 to-yellow-600',
      available: isMastery,
      stats: 'Premium',
      highlight: 'Exclusive'
    }
  ]

  // Recent updates
  const recentUpdates = [
    {
      date: 'Dec 2024',
      title: 'New Shipping Routes Added',
      description: 'Direct routes from Yokohama to Walvis Bay now available with faster transit times',
      type: 'feature',
      icon: Ship
    },
    {
      date: 'Dec 2024',
      title: 'Updated Customs Forms',
      description: 'All 2025 customs forms and requirements now available in documents section',
      type: 'update',
      icon: FileCheck
    },
    {
      date: 'Nov 2024',
      title: 'Calculator Enhanced',
      description: 'Now includes insurance, inspection fees, and real-time exchange rates',
      type: 'improvement',
      icon: Calculator
    },
    {
      date: 'Nov 2024',
      title: 'Port Delays Warning',
      description: 'Durban port experiencing 2-3 week delays due to congestion',
      type: 'warning',
      icon: AlertCircle
    }
  ]

  // Process steps
  const processSteps = [
    { step: 1, title: 'Find Vehicle', description: 'Search Japanese auctions', icon: '🔍' },
    { step: 2, title: 'Purchase', description: 'Buy through auction', icon: '💴' },
    { step: 3, title: 'Ship', description: 'Arrange ocean freight', icon: '🚢' },
    { step: 4, title: 'Clear', description: 'Handle customs', icon: '📋' },
    { step: 5, title: 'Register', description: 'Get plates & license', icon: '🚗' }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.email?.split('@')[0]}! 👋
            </h1>
            <p className="text-blue-100 text-lg mb-4">
              Your complete import portal for {countryName}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {isMastery ? 'MASTERY MEMBER' : 'GUIDE MEMBER'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <Award className="h-4 w-4" />
                <span className="text-sm">Lifetime Access</span>
              </div>
            </div>
          </div>
          {isMastery ? (
            <div className="text-right">
              <Star className="h-16 w-16 text-yellow-300 opacity-50" />
            </div>
          ) : (
            <div className="text-right">
              <Link href={`/${entitlement.country}/upsell`}>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade to Mastery
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm ${stat.color} mt-1 font-medium`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Access Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick Access</h2>
          <span className="text-sm text-gray-500">
            {isMastery ? 'Full access to all features' : `${quickAccessCards.filter(c => c.available).length} of ${quickAccessCards.length} features available`}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickAccessCards.map((card) => (
            <div key={card.title} className="relative">
              {card.available ? (
                <Link href={card.href}>
                  <Card className="p-6 h-full hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-blue-200">
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        card.highlight === 'Start Here' ? 'bg-green-100 text-green-700' :
                        card.highlight === 'Popular' ? 'bg-blue-100 text-blue-700' :
                        card.highlight === 'Mastery' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {card.highlight}
                      </span>
                    </div>
                    <div className={`bg-gradient-to-r ${card.color} p-3 rounded-lg inline-block mb-4`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {card.stats}
                      </span>
                      <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ) : (
                <Card className="p-6 h-full opacity-60 border-2 border-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-50/50"></div>
                  <div className="relative">
                    <div className="absolute top-0 right-3">
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                        Mastery Only
                      </span>
                    </div>
                    <div className="bg-gray-300 p-3 rounded-lg inline-block mb-4">
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-500">{card.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{card.description}</p>
                    <Link 
                      href={`/${entitlement.country}/upsell`}
                      className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      Upgrade to unlock
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Import Process */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Your Import Journey
          </h3>
          <div className="space-y-3">
            {processSteps.map((step, index) => (
              <div key={step.step} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{step.icon}</span>
                    <h4 className="font-medium">{step.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <Link href="/portal/guide">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <BookOpen className="h-4 w-4 mr-2" />
                View Complete Guide
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Updates */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Latest Updates
          </h3>
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex gap-3 pb-3 border-b last:border-0">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  update.type === 'warning' ? 'bg-yellow-50' :
                  update.type === 'feature' ? 'bg-green-50' :
                  update.type === 'update' ? 'bg-blue-50' :
                  'bg-purple-50'
                }`}>
                  <update.icon className={`h-4 w-4 ${
                    update.type === 'warning' ? 'text-yellow-600' :
                    update.type === 'feature' ? 'text-green-600' :
                    update.type === 'update' ? 'text-blue-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-gray-900 text-sm">{update.title}</h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">{update.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Value Proposition */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-purple-200">
        <div className="text-center">
          <Truck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Why Members Save {currency}{entitlement.country === 'zm' ? '500,000+' : '50,000+'}</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our step-by-step guides eliminate costly mistakes, connect you with verified partners, 
            and show you exactly how to import vehicles yourself - no middleman needed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/80 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Avoid Scams</h3>
              <p className="text-xs text-gray-600">Learn red flags & verified dealers</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Skip Agent Fees</h3>
              <p className="text-xs text-gray-600">DIY with our guides</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">Best Rates</h3>
              <p className="text-xs text-gray-600">Pre-negotiated shipping</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Upgrade CTA for Guide members */}
      {!isMastery && (
        <Card className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">🚀 Unlock Full Import Mastery</h3>
              <p className="text-white/90">
                Get access to the calculator, shipping partners, verified agents, and advanced tools
              </p>
            </div>
            <Link href={`/${entitlement.country}/upsell`}>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Upgrade Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}