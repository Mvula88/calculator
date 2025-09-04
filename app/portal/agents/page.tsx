'use client'

import { useState } from 'react'
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
  AlertTriangle,
  MessageSquare
} from 'lucide-react'

export default function PortalAgentsPage() {
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
        phone: '+264 64 205 3421',
        email: 'imports@proclear.na',
        whatsapp: '+264 81 245 6789'
      },
      pricing: 'N$8,000 - N$12,000',
      experience: '12+ years',
      languages: ['English', 'Afrikaans'],
      description: 'Trusted agent with direct port access. Handles 50+ imports monthly.',
      directContact: true
    },
    {
      id: 2,
      name: 'Swift Clearing Services',
      country: 'South Africa',
      city: 'Durban',
      rating: 4.6,
      reviews: 89,
      verified: true,
      specialties: ['SARS Compliance', 'Luxury Vehicles', 'ITAC Permits'],
      contact: {
        phone: '+27 31 301 2345',
        email: 'clear@swiftsa.co.za',
        whatsapp: '+27 82 444 5678'
      },
      pricing: 'R12,000 - R18,000',
      experience: '8+ years',
      languages: ['English', 'Zulu'],
      description: 'SARS registered agent. Specializes in pre-clearance to avoid delays.',
      directContact: true
    },
    {
      id: 3,
      name: 'Transworld Cargo',
      country: 'Namibia',
      city: 'Walvis Bay',
      rating: 4.9,
      reviews: 203,
      verified: true,
      specialties: ['Container Consolidation', 'Freight Forwarding', 'Documentation'],
      contact: {
        phone: '+264 64 274 5000',
        email: 'namibia@transworldcargo.com',
        whatsapp: '+264 81 127 3456'
      },
      pricing: 'Competitive',
      experience: '20+ years',
      languages: ['English', 'German', 'Afrikaans'],
      description: 'International freight forwarder. Container sharing specialist.',
      directContact: true,
      recommended: true
    },
    {
      id: 4,
      name: 'DB Schenker Namibia',
      country: 'Namibia',
      city: 'Walvis Bay',
      rating: 4.7,
      reviews: 156,
      verified: true,
      specialties: ['Global Logistics', 'Express Clearance', 'Project Cargo'],
      contact: {
        phone: '+264 64 209 2111',
        email: 'walvisbay@dbschenker.com',
        whatsapp: '+264 85 222 1111'
      },
      pricing: 'Premium',
      experience: '25+ years',
      languages: ['English', 'Afrikaans'],
      description: 'Global logistics leader. Reliable but premium pricing.',
      directContact: true,
      recommended: true
    }
  ]

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = selectedCountry === 'all' || agent.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Verified Clearing Agents
        </h1>
        <p className="text-gray-600">
          Pre-vetted agents with proven track records and honest pricing
        </p>
      </div>

      {/* Warning Alert */}
      <Alert className="mb-6 bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Always get quotes in writing. These agents have been verified 
          based on 38+ successful imports. Direct WhatsApp contacts provided for Mastery members.
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
        </select>
      </div>

      {/* Agents Grid */}
      <div className="grid gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{agent.name}</CardTitle>
                    {agent.verified && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {agent.recommended && (
                      <Badge className="bg-blue-100 text-blue-700">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {agent.city}, {agent.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
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
              <p className="text-gray-600 mb-4">{agent.description}</p>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Pricing:</span>
                    <span className="ml-2 font-medium">{agent.pricing}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Languages:</span>
                    <span className="ml-2">{agent.languages.join(', ')}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Direct Contact:</h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Button variant="outline" size="sm" className="justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      {agent.contact.phone}
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {agent.contact.whatsapp}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <Card className="mt-8 border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Working with Agents - Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Before Hiring:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Get written quotes from 3+ agents</li>
                <li>• Verify registration numbers</li>
                <li>• Ask for recent client references</li>
                <li>• Confirm included vs extra services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Red Flags:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Demands full payment upfront</li>
                <li>• No written agreements</li>
                <li>• Promises unrealistic timelines</li>
                <li>• Asks for cash only payments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}