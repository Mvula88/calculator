'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Ship,
  MapPin,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  ExternalLink,
  ArrowRight,
  Package,
  Anchor,
  Globe,
  Info
} from 'lucide-react'
import { Price } from '@/components/ui/Price'

export default function ContainerSharingPage() {
  const shippingRoutes = [
    {
      id: 1,
      from: 'Yokohama, Japan',
      to: 'Walvis Bay, Namibia',
      carrier: 'Maersk Line',
      duration: '35-40 days',
      frequency: 'Weekly',
      containerTypes: ['20ft', '40ft', '40ft HC'],
      estimatedCost: {
        '20ft': 15000,
        '40ft': 18000,
        '40ft HC': 20000
      },
      transitPorts: ['Singapore', 'Durban'],
      popular: true
    },
    {
      id: 2,
      from: 'Nagoya, Japan',
      to: 'Durban, South Africa',
      carrier: 'MSC',
      duration: '30-35 days',
      frequency: 'Bi-weekly',
      containerTypes: ['20ft', '40ft'],
      estimatedCost: {
        '20ft': 14000,
        '40ft': 16500
      },
      transitPorts: ['Hong Kong', 'Singapore'],
      popular: true
    },
    {
      id: 3,
      from: 'Tokyo, Japan',
      to: 'Cape Town, South Africa',
      carrier: 'CMA CGM',
      duration: '32-37 days',
      frequency: 'Weekly',
      containerTypes: ['20ft', '40ft', '40ft HC'],
      estimatedCost: {
        '20ft': 14500,
        '40ft': 17000,
        '40ft HC': 19000
      },
      transitPorts: ['Shanghai', 'Singapore'],
      popular: false
    },
    {
      id: 4,
      from: 'Osaka, Japan',
      to: 'Dar es Salaam, Tanzania',
      carrier: 'Hapag-Lloyd',
      duration: '28-32 days',
      frequency: 'Weekly',
      containerTypes: ['20ft', '40ft'],
      estimatedCost: {
        '20ft': 13500,
        '40ft': 15500
      },
      transitPorts: ['Singapore', 'Colombo'],
      popular: false
    },
    {
      id: 5,
      from: 'Kobe, Japan',
      to: 'Maputo, Mozambique',
      carrier: 'ONE Line',
      duration: '33-38 days',
      frequency: 'Bi-weekly',
      containerTypes: ['20ft', '40ft'],
      estimatedCost: {
        '20ft': 14000,
        '40ft': 16000
      },
      transitPorts: ['Singapore', 'Port Elizabeth'],
      popular: false
    }
  ]

  const shippingCompanies = [
    { name: 'Maersk Line', website: 'maersk.com', specialty: 'Global coverage' },
    { name: 'MSC', website: 'msc.com', specialty: 'Competitive rates' },
    { name: 'CMA CGM', website: 'cma-cgm.com', specialty: 'Fast transit' },
    { name: 'Hapag-Lloyd', website: 'hapag-lloyd.com', specialty: 'Reliable service' },
    { name: 'ONE Line', website: 'one-line.com', specialty: 'Japan expertise' }
  ]

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shipping Routes & Container Information</h1>
          <p className="text-gray-600 mt-1">Japan to Southern Africa shipping routes and container sharing options</p>
        </div>

        {/* Container Sharing Platform Alert */}
        <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <strong>Save 60% with Container Sharing!</strong> Join our dedicated container sharing platform 
              to split shipping costs with other importers.
            </div>
            <Button className="ml-4" variant="default">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Platform
            </Button>
          </AlertDescription>
        </Alert>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">60%</p>
                  <p className="text-sm text-gray-600">Avg. Savings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">250+</p>
                  <p className="text-sm text-gray-600">Active Sharers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Ship className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-gray-600">Main Routes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">30-40</p>
                  <p className="text-sm text-gray-600">Days Transit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping Routes Table */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Major Shipping Routes from Japan</CardTitle>
            <CardDescription>Regular container shipping services to Southern Africa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">Route</th>
                    <th className="text-left p-4 font-medium text-gray-700">Carrier</th>
                    <th className="text-left p-4 font-medium text-gray-700">Transit Time</th>
                    <th className="text-left p-4 font-medium text-gray-700">Frequency</th>
                    <th className="text-left p-4 font-medium text-gray-700">Container Types</th>
                    <th className="text-left p-4 font-medium text-gray-700">Est. Cost (40ft)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {shippingRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {route.popular && (
                            <Badge variant="default" className="mr-2">Popular</Badge>
                          )}
                          <div>
                            <p className="font-medium">{route.from}</p>
                            <p className="text-sm text-gray-600">→ {route.to}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{route.carrier}</span>
                      </td>
                      <td className="p-4 text-gray-600">{route.duration}</td>
                      <td className="p-4">
                        <Badge variant="outline">{route.frequency}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {route.containerTypes.map((type) => (
                            <Badge key={type} variant="secondary" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <Price nadAmount={route.estimatedCost['40ft'] || route.estimatedCost['20ft']} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* How Container Sharing Works */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>How Container Sharing Works</CardTitle>
            <CardDescription>Save money by sharing container space with other importers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: 'Find Partners',
                  description: 'Connect with other importers on the same route',
                  icon: Users
                },
                {
                  step: 2,
                  title: 'Book Together',
                  description: 'Coordinate and book a shared container',
                  icon: Package
                },
                {
                  step: 3,
                  title: 'Split Costs',
                  description: 'Share shipping and handling fees equally',
                  icon: DollarSign
                },
                {
                  step: 4,
                  title: 'Save 60%+',
                  description: 'Reduce your shipping costs significantly',
                  icon: TrendingUp
                }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <Badge className="mb-2">Step {item.step}</Badge>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Ready to Save on Shipping?</h3>
              <p className="text-gray-600 mb-4">
                Join our dedicated container sharing platform to find partners and split costs
              </p>
              <Button size="lg" className="gap-2">
                <ExternalLink className="h-5 w-5" />
                Visit Container Sharing Platform
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Companies */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Major Shipping Lines</CardTitle>
            <CardDescription>Carriers operating Japan to Southern Africa routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shippingCompanies.map((company) => (
                <div key={company.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{company.name}</h4>
                      <p className="text-sm text-gray-600">{company.specialty}</p>
                    </div>
                    <Anchor className="h-5 w-5 text-gray-400" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Globe className="h-4 w-4" />
                    {company.website}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}