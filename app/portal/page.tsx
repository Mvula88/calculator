import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Calculator, Users, BookOpen, Package, ArrowRight, Star, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function PortalHomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Get user's entitlement details
  const { data: entitlement } = await supabase
    .from('entitlements')
    .select('tier, country')
    .eq('email', user?.email?.toLowerCase())
    .eq('active', true)
    .single()
  
  const isMastery = entitlement?.tier === 'mastery'
  const country = entitlement?.country || 'na'
  
  const quickLinks = [
    {
      title: 'Import Calculator',
      description: isMastery ? 'Full calculator with all features' : 'Basic calculator access',
      href: '/portal/calculator',
      icon: Calculator,
      color: 'bg-blue-100 text-blue-600',
      available: true
    },
    {
      title: 'Import Guide',
      description: 'Step-by-step import documentation',
      href: '/portal/guide',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
      available: true
    },
    {
      title: 'Verified Agents',
      description: isMastery ? 'Full directory with direct contacts' : 'Limited agent list',
      href: '/portal/agents',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      available: true
    },
    {
      title: 'Book Container Slot',
      description: isMastery ? 'Priority booking available' : 'Upgrade for priority access',
      href: '/portal/book-slot',
      icon: Package,
      color: 'bg-orange-100 text-orange-600',
      available: isMastery
    }
  ]
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your Import Portal
        </h1>
        <p className="text-gray-600">
          Access all your import resources and tools in one place
        </p>
        <div className="flex items-center gap-3 mt-4">
          <Badge variant={isMastery ? 'default' : 'secondary'}>
            {isMastery ? 'MASTERY' : 'GUIDE'} MEMBER
          </Badge>
          <Badge variant="outline">
            {country.toUpperCase()} Region
          </Badge>
        </div>
      </div>
      
      {/* Quick Links Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {quickLinks.map((link) => (
          <Card 
            key={link.href}
            className={`border-0 shadow-md hover:shadow-lg transition-shadow ${!link.available ? 'opacity-60' : ''}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${link.color}`}>
                  <link.icon className="h-6 w-6" />
                </div>
                {!link.available && (
                  <Badge variant="secondary">Upgrade Required</Badge>
                )}
              </div>
              <CardTitle className="mt-4">{link.title}</CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant={link.available ? 'default' : 'outline'} className="w-full">
                <Link href={link.href}>
                  {link.available ? 'Access Now' : 'Upgrade to Access'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Stats Section */}
      {isMastery && (
        <Card className="border-0 shadow-md mb-8">
          <CardHeader>
            <CardTitle>Your Import Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-600">Calculations</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-600">Saved Templates</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-600">Slot Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Upgrade CTA for Guide members */}
      {!isMastery && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Unlock Full Access</h3>
              <p className="text-gray-600 mb-4">
                Upgrade to Mastery for calculator, priority container slots, and more
              </p>
              <Button asChild>
                <Link href={`/${country}/upsell`}>
                  Upgrade to Mastery
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}