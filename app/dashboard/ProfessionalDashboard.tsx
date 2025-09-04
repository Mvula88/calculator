'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CONTACT_INFO } from '@/lib/constants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Calculator, 
  BookOpen, 
  Users, 
  Package, 
  Download,
  CheckCircle,
  Check,
  TrendingUp,
  FileText,
  Phone,
  Calendar,
  PartyPopper,
  DollarSign,
  ArrowRight,
  Car,
  Ship,
  Globe,
  Shield,
  Zap,
  Star,
  Clock,
  Target,
  ChevronRight,
  BarChart3,
  Activity
} from 'lucide-react'
import { Price } from '@/components/ui/Price'
import { useCountry } from '@/lib/country-context'

export default function ProfessionalDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { country } = useCountry()
  const [user, setUser] = useState<any>(null)
  const [purchases, setPurchases] = useState<any[]>([])
  const [calculations, setCalculations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [stats, setStats] = useState({
    totalCalculations: 0,
    potentialSavings: 0,
    averageCost: 0,
    lastCalculation: null as Date | null
  })

  useEffect(() => {
    loadUserData()
    
    // Check for payment success message
    if (searchParams.get('payment') === 'success') {
      setShowSuccessMessage(true)
      setTimeout(() => {
        router.replace('/dashboard')
      }, 30000)
    }
  }, [searchParams, router])

  const loadUserData = async () => {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }
    
    setUser(user)
    
    // Load user purchases
    const { data: userPurchases } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .order('purchased_at', { ascending: false })
    
    if (userPurchases) {
      setPurchases(userPurchases)
    }
    
    // Load saved calculations
    const { data: userCalculations } = await supabase
      .from('calculations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (userCalculations) {
      setCalculations(userCalculations)
      
      // Calculate stats
      const totalCalcs = userCalculations.length
      const totalSavings = totalCalcs * 15000 // Estimated savings per import
      const avgCost = userCalculations.reduce((acc, calc) => acc + (calc.total_cost || 0), 0) / (totalCalcs || 1)
      const lastCalc = userCalculations[0]?.created_at ? new Date(userCalculations[0].created_at) : null
      
      setStats({
        totalCalculations: totalCalcs,
        potentialSavings: totalSavings,
        averageCost: avgCost,
        lastCalculation: lastCalc
      })
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: 'Calculate Import Costs',
      description: 'Get instant cost breakdown',
      icon: Calculator,
      href: '/calculator',
      color: 'bg-blue-500'
    },
    {
      title: 'Import Guides',
      description: 'Step-by-step instructions',
      icon: BookOpen,
      href: '/guides',
      color: 'bg-purple-500'
    },
    {
      title: 'Find Agents',
      description: 'Verified clearing agents',
      icon: Users,
      href: '/agents',
      color: 'bg-green-500'
    },
    {
      title: 'Container Sharing',
      description: 'Save up to 60% on shipping',
      icon: Package,
      href: '/container-sharing',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top max-w-md">
          <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 shadow-lg">
            <PartyPopper className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong className="text-lg">Welcome to ImportCalc Pro!</strong><br />
              You now have lifetime access to all premium features. Start saving thousands on your imports!
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-green-500 text-white px-3 py-1">PRO MEMBER</Badge>
                <Badge variant="outline" className="text-white border-white">Lifetime Access</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0]}!</h1>
              <p className="text-blue-100 text-lg">Your import cost calculator and resource center</p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5" />
                  <span className="text-sm">Your Progress</span>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalCalculations}</div>
                <div className="text-sm text-blue-100">Calculations Made</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calculator className="h-6 w-6 text-blue-600" />
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{stats.totalCalculations}</div>
              <p className="text-sm text-gray-600">Total Calculations</p>
              <Progress value={stats.totalCalculations * 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold mb-1">
                <Price nadAmount={stats.potentialSavings} />
              </div>
              <p className="text-sm text-gray-600">Potential Savings</p>
              <div className="text-xs text-green-600 mt-2">+15% this month</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <Clock className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {stats.averageCost > 0 ? <Price nadAmount={Math.round(stats.averageCost)} /> : 'N/A'}
              </div>
              <p className="text-sm text-gray-600">Average Import Cost</p>
              <div className="text-xs text-purple-600 mt-2">Per vehicle</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <CheckCircle className="h-4 w-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {stats.lastCalculation 
                  ? `${Math.floor((Date.now() - stats.lastCalculation.getTime()) / (1000 * 60 * 60 * 24))}d ago`
                  : 'Never'
                }
              </div>
              <p className="text-sm text-gray-600">Last Calculation</p>
              <div className="text-xs text-orange-600 mt-2">Stay active</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                    <div className="flex items-center text-blue-600 font-medium">
                      Open <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-white shadow-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Welcome Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Ready to import your next vehicle?</h3>
                      <p className="text-gray-600 mb-6 max-w-2xl">
                        Use our calculator to get accurate cost estimates, find verified agents, 
                        and explore container sharing options to save up to 60% on shipping costs.
                      </p>
                      <div className="flex gap-4">
                        <Link href="/calculator">
                          <Button size="lg" className="gap-2">
                            <Calculator className="h-5 w-5" />
                            Start Calculation
                          </Button>
                        </Link>
                        <Link href="/container-sharing">
                          <Button size="lg" variant="outline" className="gap-2">
                            <Package className="h-5 w-5" />
                            Find Container Share
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <Car className="h-32 w-32 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <Shield className="h-8 w-8 text-green-500 mb-2" />
                    <CardTitle>Verified Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Work with trusted clearing agents who won't overcharge you
                    </p>
                    <Link href="/agents">
                      <Button variant="link" className="p-0">
                        View Agents <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                    <CardTitle>Instant Quotes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Get accurate import cost breakdowns in seconds
                    </p>
                    <Link href="/calculator">
                      <Button variant="link" className="p-0">
                        Calculate Now <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <Globe className="h-8 w-8 text-blue-500 mb-2" />
                    <CardTitle>SADC Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Supporting imports to Namibia, SA, Botswana & Zambia
                    </p>
                    <Badge variant="secondary">4 Countries</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculations">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Calculations</CardTitle>
                <CardDescription>Your saved import cost calculations</CardDescription>
              </CardHeader>
              <CardContent>
                {calculations.length > 0 ? (
                  <div className="space-y-4">
                    {calculations.slice(0, 5).map((calc) => (
                      <div key={calc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Car className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{calc.vehicle_description || 'Import Calculation'}</p>
                            <p className="text-sm text-gray-600">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {new Date(calc.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            <Price nadAmount={calc.total_cost || 0} />
                          </p>
                          <Link href={`/calculator?id=${calc.id}`}>
                            <Button size="sm" variant="ghost">
                              View Details <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 mb-4">No calculations yet</p>
                    <Link href="/calculator">
                      <Button>Create Your First Calculation</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    Import Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/guides#japan-import" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <span>Importing from Japan</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides#documents" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <span>Required Documents</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides#clearing" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <span>Clearing Process</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    Document Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <button className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 w-full text-left">
                        <span>Import Declaration Form</span>
                        <Download className="h-4 w-4 text-gray-400" />
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 w-full text-left">
                        <span>Customs Clearance Checklist</span>
                        <Download className="h-4 w-4 text-gray-400" />
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 w-full text-left">
                        <span>Agent Agreement Template</span>
                        <Download className="h-4 w-4 text-gray-400" />
                      </button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>We're here to support your import journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-green-50 border-green-300">
                  <Phone className="h-4 w-4" />
                  <AlertDescription>
                    <strong>WhatsApp Support</strong><br />
                    Get instant help from our team and community<br />
                    <a 
                      href={`https://wa.me/${CONTACT_INFO.whatsapp.number.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline font-medium mt-2 inline-block"
                    >
                      {CONTACT_INFO.whatsapp.displayNumber} →
                    </a>
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Star className="h-6 w-6 text-yellow-500 mb-2" />
                    <h4 className="font-semibold mb-2">Premium Support</h4>
                    <p className="text-sm text-gray-600">
                      As a Pro member, you get priority support and access to our exclusive WhatsApp group
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Shield className="h-6 w-6 text-blue-500 mb-2" />
                    <h4 className="font-semibold mb-2">Lifetime Updates</h4>
                    <p className="text-sm text-gray-600">
                      All new features and updates are automatically available to you at no extra cost
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}