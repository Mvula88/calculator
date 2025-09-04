'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Package, 
  Users, 
  Calendar,
  MapPin,
  DollarSign,
  Ship,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Shield
} from 'lucide-react'
import { Price } from '@/components/ui/Price'

export default function ContainerSharingPage() {
  const [view, setView] = useState<'available' | 'create'>('available')

  const containers = [
    {
      id: 1,
      organizer: 'John M.',
      departure: '2025-02-15',
      arrival: '2025-03-20',
      from: 'Yokohama, Japan',
      to: 'Walvis Bay, Namibia',
      size: '40ft',
      totalSlots: 4,
      availableSlots: 2,
      pricePerSlot: 22000,
      status: 'open',
      verified: true,
      description: 'Sharing container for sedan-sized vehicles. Reliable shipper with insurance.'
    },
    {
      id: 2,
      organizer: 'Sarah K.',
      departure: '2025-02-28',
      arrival: '2025-04-05',
      from: 'Nagoya, Japan',
      to: 'Durban, South Africa',
      size: '40ft HC',
      totalSlots: 3,
      availableSlots: 1,
      pricePerSlot: 25000,
      status: 'filling',
      verified: true,
      description: 'Last slot available! Suitable for SUVs and larger sedans.'
    },
    {
      id: 3,
      organizer: 'Mike T.',
      departure: '2025-03-10',
      arrival: '2025-04-15',
      from: 'Tokyo, Japan',
      to: 'Walvis Bay, Namibia',
      size: '20ft',
      totalSlots: 2,
      availableSlots: 1,
      pricePerSlot: 18000,
      status: 'open',
      verified: false,
      description: 'Perfect for compact cars. First time organizing, looking for partner.'
    }
  ]

  const benefits = [
    { 
      icon: DollarSign, 
      title: 'Save 60%+ on Shipping',
      description: 'Split container costs with other importers'
    },
    { 
      icon: Shield, 
      title: 'Reduced Risk',
      description: 'Share insurance and handling costs'
    },
    { 
      icon: Users, 
      title: 'Trusted Network',
      description: 'Connect with verified importers'
    },
    { 
      icon: Clock, 
      title: 'Faster Processing',
      description: 'Full containers get priority handling'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 text-white mb-4">SAVE UP TO 60%</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Container Sharing Platform
            </h1>
            <p className="text-xl text-orange-100">
              Connect with other importers to share container costs. 
              I saved N$60,000+ on my last import through container sharing!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Success Story Alert */}
        <Alert className="mb-6 bg-green-50 border-green-400">
          <TrendingUp className="h-4 w-4" />
          <AlertDescription>
            <strong>Real Success:</strong> "Shared a 40ft container from Japan with 3 other importers. 
            Saved N$65,000 compared to solo shipping!" - Recent member
          </AlertDescription>
        </Alert>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <benefit.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <Button 
            variant={view === 'available' ? 'default' : 'outline'}
            onClick={() => setView('available')}
            className="gap-2"
          >
            <Search className="h-4 w-4" />
            Find Containers
          </Button>
          <Button 
            variant={view === 'create' ? 'default' : 'outline'}
            onClick={() => setView('create')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Sharing
          </Button>
        </div>

        {view === 'available' ? (
          <>
            {/* Available Containers */}
            <h2 className="text-2xl font-bold mb-4">Available Container Shares</h2>
            <div className="grid gap-6 mb-8">
              {containers.map((container) => (
                <Card key={container.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>
                            {container.from} → {container.to}
                          </CardTitle>
                          {container.verified && (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <CardDescription>
                          Organized by {container.organizer} • {container.size} container
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={container.status === 'open' ? 'default' : 'secondary'}
                        className={container.status === 'filling' ? 'bg-yellow-100 text-yellow-700' : ''}
                      >
                        {container.status === 'open' ? 'Open' : 'Filling Fast'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Departs: {new Date(container.departure).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Ship className="h-4 w-4 text-gray-400" />
                          <span>Arrives: {new Date(container.arrival).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>Transit: ~35 days</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>
                            {container.availableSlots} of {container.totalSlots} slots available
                          </span>
                        </div>
                        <Progress 
                          value={((container.totalSlots - container.availableSlots) / container.totalSlots) * 100}
                          className="h-2"
                        />
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span><Price nadAmount={container.pricePerSlot} /> per vehicle</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{container.description}</p>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        Request to Join
                      </Button>
                      <Button variant="outline">
                        Contact Organizer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* How It Works */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle>How Container Sharing Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { step: 1, title: 'Find a Share', desc: 'Browse available containers matching your route' },
                    { step: 2, title: 'Join Group', desc: 'Connect with organizer and confirm your slot' },
                    { step: 3, title: 'Ship Together', desc: 'Vehicles loaded into shared container' },
                    { step: 4, title: 'Save Money', desc: 'Split costs and save 60%+ on shipping' }
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                        {item.step}
                      </div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Create Container Share Form */
          <Card className="border-0 shadow-lg max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Create a Container Share</CardTitle>
              <CardDescription>
                Organize a container share and find partners to split costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  As an organizer, you coordinate the shipment and manage communication 
                  between participants. You may qualify for additional discounts.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Shipping Route</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="From (e.g., Yokohama, Japan)"
                      className="px-4 py-2 border rounded-lg"
                    />
                    <input 
                      type="text" 
                      placeholder="To (e.g., Walvis Bay, Namibia)"
                      className="px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Container Details</label>
                  <div className="grid grid-cols-2 gap-4">
                    <select className="px-4 py-2 border rounded-lg">
                      <option>20ft Standard</option>
                      <option>40ft Standard</option>
                      <option>40ft High Cube</option>
                    </select>
                    <input 
                      type="number" 
                      placeholder="Number of vehicles"
                      className="px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Departure Date</label>
                  <input 
                    type="date" 
                    className="px-4 py-2 border rounded-lg w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Price per Slot</label>
                  <input 
                    type="number" 
                    placeholder="Amount in NAD"
                    className="px-4 py-2 border rounded-lg w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea 
                    placeholder="Provide details about the shipment, vehicle types accepted, etc."
                    className="px-4 py-2 border rounded-lg w-full h-24"
                  />
                </div>
                
                <Button className="w-full" size="lg">
                  Create Container Share
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Safety Tips */}
        <Alert className="mt-8 bg-yellow-50 border-yellow-400">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Safety Tips:</strong> Always verify organizers, use secure payment methods, 
            get agreements in writing, and ensure proper insurance coverage for your vehicle.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}