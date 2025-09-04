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
import { 
  Calculator, 
  BookOpen, 
  Users, 
  Package, 
  Download,
  CheckCircle,
  Check,
  Lock,
  TrendingUp,
  FileText,
  Phone,
  LogOut,
  Calendar,
  PartyPopper
} from 'lucide-react'

export default function DashboardClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [purchases, setPurchases] = useState<any[]>([])
  const [calculations, setCalculations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    loadUserData()
    
    // Check for payment success message
    if (searchParams.get('payment') === 'success') {
      setShowSuccessMessage(true)
      // Remove the query parameter after showing the message
      setTimeout(() => {
        router.replace('/dashboard')
      }, 5000)
    }
  }, [searchParams, router])

  const loadUserData = async () => {
    const supabase = createClient()
    
    // Get current user
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
      .order('created_at', { ascending: false })
    
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
    }
    
    setLoading(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <Alert className="bg-green-50 border-green-500 max-w-md">
            <PartyPopper className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Payment Successful!</strong><br />
              Welcome to Calculator Pro! You now have lifetime access to all premium features.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Import Calculator Pro</h1>
              <Badge className="bg-green-500">FULL ACCESS</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-green-500 text-white">LIFETIME ACCESS</Badge>
                  <p className="text-sm text-gray-600 mt-2">
                    Full access to all calculator features
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-500" />
                    Calculations Saved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{calculations.length}</p>
                  <p className="text-sm text-gray-600">
                    Total import quotes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    Potential Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">N$15,000+</p>
                  <p className="text-sm text-gray-600">
                    Per import with our tools
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with your import planning</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Link href="/calculator">
                  <Button className="w-full" size="lg">
                    <Calculator className="w-5 h-5 mr-2" />
                    Open Calculator
                  </Button>
                </Link>
                <Link href="/guides">
                  <Button className="w-full" variant="outline" size="lg">
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Import Guide
                  </Button>
                </Link>
                <Link href="/agents">
                  <Button className="w-full" variant="outline" size="lg">
                    <Users className="w-5 h-5 mr-2" />
                    Find Clearing Agent
                  </Button>
                </Link>
                <Link href="/container-sharing">
                  <Button className="w-full" variant="outline" size="lg">
                    <Package className="w-5 h-5 mr-2" />
                    Container Sharing
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* WhatsApp Support */}
            <Alert className="bg-blue-50 border-blue-300">
              <Phone className="h-4 w-4" />
              <AlertDescription>
                <strong>Need help?</strong> Join our WhatsApp support group: 
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp.number.replace('+', '')}`} 
                   className="text-blue-600 underline ml-1"
                   target="_blank"
                   rel="noopener noreferrer">
                  {CONTACT_INFO.whatsapp.displayNumber}
                </a>
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle>Import Cost Calculator</CardTitle>
                <CardDescription>Calculate all costs for your vehicle import</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/calculator">
                  <Button size="lg">
                    <Calculator className="w-5 h-5 mr-2" />
                    Open Full Calculator
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Resources</CardTitle>
                <CardDescription>Everything you need for successful importing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/guides" className="block">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Import Process Guide</p>
                        <p className="text-sm text-gray-600">Step-by-step instructions</p>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                </Link>

                <Link href="/agents" className="block">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Verified Agents</p>
                        <p className="text-sm text-gray-600">Trusted clearing agents</p>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                </Link>

                <Link href="/documents" className="block">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Document Templates</p>
                        <p className="text-sm text-gray-600">Required forms & checklists</p>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                </Link>

                <Link href="/container-sharing" className="block">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Container Sharing</p>
                        <p className="text-sm text-gray-600">Save N$60,000+ on shipping</p>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Calculations</CardTitle>
                <CardDescription>Your saved import cost calculations</CardDescription>
              </CardHeader>
              <CardContent>
                {calculations.length > 0 ? (
                  <div className="space-y-4">
                    {calculations.map((calc) => (
                      <div key={calc.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{calc.vehicle_description || 'Import Calculation'}</p>
                          <p className="text-sm text-gray-600">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {new Date(calc.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">N${calc.total_cost?.toLocaleString() || '0'}</p>
                          <Link href={`/calculator?id=${calc.id}`}>
                            <Button size="sm" variant="outline">View</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No calculations yet</p>
                    <Link href="/calculator">
                      <Button className="mt-4">Create Your First Calculation</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}