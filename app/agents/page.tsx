'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Shield,
  Search,
  Filter,
  Award,
  Clock,
  DollarSign,
  AlertTriangle
} from 'lucide-react'

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')

  const agents = [
    {
      id: 1,
      name: 'ProClear Logistics',
      country: 'Namibia',
      city: 'Walvis Bay',
      rating: 4.8,
      reviews: 127,
      verified: true,
      specialties: ['Japanese Imports', 'Container Handling', 'Express Clearance'],
      contact: {
        phone: '+264 64 XXX XXX',
        email: 'info@proclear.na',
        whatsapp: '+264 81 XXX XXX'
      },
      pricing: 'Competitive',
      experience: '12+ years',
      languages: ['English', 'Afrikaans'],
      description: 'Trusted clearing agent with excellent track record. Fast turnaround times.'
    },
    {
      id: 2,
      name: 'Swift Clearing Services',
      country: 'South Africa',
      city: 'Durban',
      rating: 4.6,
      reviews: 89,
      verified: true,
      specialties: ['Luxury Vehicles', 'Documentation', 'Port Storage'],
      contact: {
        phone: '+27 31 XXX XXXX',
        email: 'contact@swiftclear.co.za',
        whatsapp: '+27 82 XXX XXXX'
      },
      pricing: 'Standard',
      experience: '8+ years',
      languages: ['English', 'Zulu'],
      description: 'Specializes in high-value vehicle imports with comprehensive insurance.'
    },
    {
      id: 3,
      name: 'Border Express Clearing',
      country: 'Botswana',
      city: 'Gaborone',
      rating: 4.5,
      reviews: 64,
      verified: true,
      specialties: ['Cross-border', 'Transit Documentation', 'Duty Optimization'],
      contact: {
        phone: '+267 3XX XXXX',
        email: 'help@borderexpress.bw',
        whatsapp: '+267 7X XXX XXX'
      },
      pricing: 'Affordable',
      experience: '10+ years',
      languages: ['English', 'Setswana'],
      description: 'Expert in multi-country clearance and transit procedures.'
    },
    {
      id: 4,
      name: 'Lusaka Import Solutions',
      country: 'Zambia',
      city: 'Lusaka',
      rating: 4.3,
      reviews: 42,
      verified: false,
      specialties: ['Agricultural Equipment', 'Commercial Vehicles', 'Bulk Imports'],
      contact: {
        phone: '+260 211 XXX XXX',
        email: 'imports@lis.zm',
        whatsapp: '+260 97X XXX XXX'
      },
      pricing: 'Negotiable',
      experience: '6+ years',
      languages: ['English'],
      description: 'Growing agency with focus on commercial and agricultural imports.'
    }
  ]

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = selectedCountry === 'all' || agent.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trusted Clearing Agents</h1>
          <p className="text-gray-600 mt-1">Work with verified agents who won't overcharge. Avoid costly mistakes.</p>
        </div>
        {/* Warning Alert */}
        <Alert className="mb-6 bg-yellow-50 border-yellow-400">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> Always verify agent credentials and get quotes in writing. 
            These agents have been vetted based on community feedback and personal experience.
          </AlertDescription>
        </Alert>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by name or city..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border rounded-lg"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="all">All Countries</option>
            <option value="Namibia">Namibia</option>
            <option value="South Africa">South Africa</option>
            <option value="Botswana">Botswana</option>
            <option value="Zambia">Zambia</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{agent.name}</CardTitle>
                      {agent.verified && (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {agent.city}, {agent.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {agent.experience}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{agent.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{agent.reviews} reviews</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span>{agent.pricing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{agent.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100">
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Tips for Working with Clearing Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <Award className="h-6 w-6 text-yellow-500 mb-2" />
                <h4 className="font-semibold mb-1">Get Multiple Quotes</h4>
                <p className="text-sm text-gray-600">
                  Always compare at least 3 agents before choosing
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <Shield className="h-6 w-6 text-green-500 mb-2" />
                <h4 className="font-semibold mb-1">Verify Credentials</h4>
                <p className="text-sm text-gray-600">
                  Check registration and ask for references
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
                <h4 className="font-semibold mb-1">Avoid Cash Payments</h4>
                <p className="text-sm text-gray-600">
                  Always get receipts and pay via traceable methods
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}