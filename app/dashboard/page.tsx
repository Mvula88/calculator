'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
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
  Calendar
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [purchases, setPurchases] = useState<any[]>([])
  const [calculations, setCalculations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const supabase = createClient()
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }
    
    setUser(user)
    
    // Get user's purchases
    const { data: purchasesData } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
    
    setPurchases(purchasesData || [])
    
    // Get user's calculations
    const { data: calculationsData } = await supabase
      .from('calculations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)
    
    setCalculations(calculationsData || [])
    setLoading(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const hasPurchase = (productType: string) => {
    return purchases.some(p => p.product_type === productType)
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
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Your Dashboard</CardTitle>
            <CardDescription>
              You have full access to all calculator features and guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold">Account Status</p>
                  <p className="text-sm text-gray-600">Premium Member</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="font-semibold">Member Since</p>
                  <p className="text-sm text-gray-600">
                    {new Date(user?.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="font-semibold">Calculations</p>
                  <p className="text-sm text-gray-600">{calculations.length} saved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tools">Tools & Calculator</TabsTrigger>
            <TabsTrigger value="guides">Guides & Resources</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
            <TabsTrigger value="history">Calculation History</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-6 h-6" />
                    Import Calculator Pro
                  </CardTitle>
                  <CardDescription>
                    Calculate all 27 hidden costs instantly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      All hidden fees revealed
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Real-time calculations
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      PDF export ready
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/calculator">Open Calculator</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    Container Sharing Platform
                  </CardTitle>
                  <CardDescription>
                    Save N$600-1,200 per shipment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Connect with other importers to share container costs
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://container-sharing.example.com" target="_blank">
                      Visit Platform
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Import Process Guide
                  </CardTitle>
                  <Badge className="w-fit">INCLUDED</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete step-by-step import process
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/guides/import-process">Read Guide</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Document Templates
                  </CardTitle>
                  <Badge className="w-fit">INCLUDED</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    All required forms and checklists
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/resources">Download Templates</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Verified Agents
                  </CardTitle>
                  <Badge className="w-fit">INCLUDED</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Trusted clearing agents list
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/resources#agents">View List</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-blue-50 border-blue-300">
              <Phone className="h-4 w-4" />
              <AlertDescription>
                <strong>WhatsApp Support:</strong> Join our exclusive group for direct support. 
                Message +264 81 XXX XXXX with your email to be added.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="addons" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className={hasPurchase('avoid_mistake') ? 'border-green-500' : ''}>
                <CardHeader>
                  <CardTitle>"Avoid My Mistake" Guide</CardTitle>
                  <CardDescription>
                    Complete consignee disaster story + verification guide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hasPurchase('avoid_mistake') ? (
                    <>
                      <Badge className="mb-4 bg-green-500">PURCHASED</Badge>
                      <Button asChild className="w-full">
                        <Link href="/guides/avoid-mistakes">Read Guide</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold mb-4">N$499</p>
                      <ul className="space-y-1 mb-4 text-sm">
                        <li>• My N$45,000 mistake story</li>
                        <li>• Agent verification checklist</li>
                        <li>• Red flags to avoid</li>
                      </ul>
                      <Button className="w-full">Purchase Add-on</Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className={hasPurchase('translation_provider') ? 'border-green-500' : ''}>
                <CardHeader>
                  <CardTitle>Translation Provider Access</CardTitle>
                  <CardDescription>
                    Professional auction sheet translators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hasPurchase('translation_provider') ? (
                    <>
                      <Badge className="mb-4 bg-green-500">PURCHASED</Badge>
                      <Button asChild className="w-full">
                        <Link href="/resources#translators">View Contacts</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold mb-4">N$150</p>
                      <ul className="space-y-1 mb-4 text-sm">
                        <li>• Professional translators</li>
                        <li>• Grade verification experts</li>
                        <li>• Direct contacts</li>
                      </ul>
                      <Button className="w-full">Purchase Add-on</Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-purple-900 to-purple-700 text-white">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-red-500 text-white">
                  APPLICATION REQUIRED - 20 SPOTS ONLY
                </Badge>
                <CardTitle className="text-2xl">Hidden Platform Access</CardTitle>
                <CardDescription className="text-white/80">
                  Secret platforms with 40% cheaper cars
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasPurchase('hidden_platforms') ? (
                  <>
                    <Badge className="mb-4 bg-green-500">APPROVED & PURCHASED</Badge>
                    <Alert className="bg-white/10 border-white/20 text-white mb-4">
                      <Lock className="h-4 w-4" />
                      <AlertDescription>
                        Platform details have been sent to your registered email. 
                        Remember: NDA applies - do not share access.
                      </AlertDescription>
                    </Alert>
                    <Button asChild variant="secondary" className="w-full">
                      <Link href="/guides/hidden-sources">Access Platforms</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold mb-4">N$14,999</p>
                    <ul className="space-y-2 mb-6 text-white/90">
                      <li>• Where I found cars under N$30,000</li>
                      <li>• Personal guidance included</li>
                      <li>• NDA required</li>
                      <li>• Limited to 20 members only</li>
                    </ul>
                    <Button variant="secondary" className="w-full">
                      Apply for Access
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Calculations</CardTitle>
                <CardDescription>
                  Your saved import cost calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {calculations.length > 0 ? (
                  <div className="space-y-3">
                    {calculations.map((calc, index) => (
                      <div key={calc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">
                            {calc.vehicle_details?.make} {calc.vehicle_details?.model}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(calc.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            N${calc.total_cost?.toLocaleString()}
                          </p>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No calculations saved yet</p>
                    <Button asChild className="mt-4">
                      <Link href="/calculator">Start First Calculation</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}