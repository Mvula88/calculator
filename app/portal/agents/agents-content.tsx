'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Shield, 
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  AlertCircle,
  Verified
} from 'lucide-react'

const agents = [
  {
    id: 1,
    name: "Premium Clearing Solutions",
    location: "Cape Town",
    rating: 4.9,
    reviews: 847,
    specialities: ["Luxury Vehicles", "Classic Cars", "Quick Processing"],
    experience: "15 years",
    avgProcessingTime: "7-10 days",
    successRate: "99.2%",
    fees: {
      standard: "R8,500",
      express: "R12,000",
      luxury: "R15,000"
    },
    contact: {
      phone: "+27 21 555 0123",
      email: "info@premiumclearing.co.za",
      whatsapp: "+27 82 555 0123"
    },
    services: ["Full Clearing", "NRCS Handling", "Transport Arrangement", "Documentation", "Express Service"],
    certifications: ["SAACA Certified", "NRCS Approved", "ISO 9001"],
    recentSuccess: "Cleared 45 vehicles last month with 100% success rate",
    testimonial: "Exceptional service. They handled my BMW import flawlessly and helped me optimize my import costs.",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 2,
    name: "Port City Logistics",
    location: "Durban",
    rating: 4.7,
    reviews: 1203,
    specialities: ["Volume Imports", "Commercial Vehicles", "Cost-Effective"],
    experience: "12 years",
    avgProcessingTime: "10-14 days",
    successRate: "97.8%",
    fees: {
      standard: "R7,000",
      express: "R10,500",
      commercial: "R12,500"
    },
    contact: {
      phone: "+27 31 555 0456",
      email: "clearing@portcity.co.za",
      whatsapp: "+27 83 555 0456"
    },
    services: ["Full Clearing", "Warehousing", "Container Handling", "Bulk Processing", "Insurance Claims"],
    certifications: ["SAACA Member", "Customs Accredited", "SARS Approved"],
    recentSuccess: "Processed 127 vehicles last month, average 9-day clearance",
    testimonial: "Great value for money. Professional team that knows the Durban port inside out.",
    verified: true,
    tier: "Gold"
  },
  {
    id: 3,
    name: "Johannesburg Import Specialists",
    location: "Johannesburg",
    rating: 4.8,
    reviews: 623,
    specialities: ["Inland Clearing", "Documentation", "Legal Compliance"],
    experience: "18 years",
    avgProcessingTime: "8-12 days",
    successRate: "98.5%",
    fees: {
      standard: "R9,000",
      express: "R13,500",
      legal: "R16,000"
    },
    contact: {
      phone: "+27 11 555 0789",
      email: "imports@jburgspecialists.co.za",
      whatsapp: "+27 84 555 0789"
    },
    services: ["Inland Clearing", "Legal Consultation", "NRCS Expediting", "Appeals Handling", "Compliance Audits"],
    certifications: ["Legal Practice Council", "SAACA Certified", "Government Contracts"],
    recentSuccess: "Successfully handled 3 complex import appeals this month",
    testimonial: "Saved my import when SARS flagged it. Their legal expertise is unmatched.",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 4,
    name: "Namibian Border Experts",
    location: "Windhoek/Walvis Bay",
    rating: 4.6,
    reviews: 445,
    specialities: ["Cross-Border", "Namibian Regulations", "Transit Services"],
    experience: "10 years",
    avgProcessingTime: "6-9 days",
    successRate: "96.7%",
    fees: {
      standard: "N$8,500",
      transit: "N$12,000",
      urgent: "N$15,500"
    },
    contact: {
      phone: "+264 61 555 0234",
      email: "clearing@namibianexperts.com.na",
      whatsapp: "+264 81 555 0234"
    },
    services: ["Namibian Clearing", "Transit to SA", "Cross-Border Transport", "Multi-Country Permits", "Currency Exchange"],
    certifications: ["Namibian Revenue Agency", "SACU Approved", "Cross-Border Licensed"],
    recentSuccess: "Facilitated 67 cross-border transits with zero delays",
    testimonial: "Perfect for Namibian imports. They handle both sides of the border seamlessly.",
    verified: true,
    tier: "Gold"
  },
  {
    id: 5,
    name: "Express Auto Clearance",
    location: "Port Elizabeth",
    rating: 4.5,
    reviews: 289,
    specialities: ["Speed Processing", "Personal Imports", "First-Time Importers"],
    experience: "8 years",
    avgProcessingTime: "5-8 days",
    successRate: "95.1%",
    fees: {
      standard: "R6,500",
      express: "R9,500",
      firstTime: "R8,000"
    },
    contact: {
      phone: "+27 41 555 0567",
      email: "fast@expressauto.co.za",
      whatsapp: "+27 85 555 0567"
    },
    services: ["Express Clearing", "First-Timer Support", "Hand-Holding Service", "Documentation Prep", "Insurance Facilitation"],
    certifications: ["SAACA Member", "First Aid Certified", "Customer Service Excellence"],
    recentSuccess: "Cleared 34 first-time imports with 100% customer satisfaction",
    testimonial: "Perfect for beginners. They explained everything and made it stress-free.",
    verified: true,
    tier: "Silver"
  }
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Platinum':
      return 'text-purple-600 bg-purple-100'
    case 'Gold':
      return 'text-yellow-600 bg-yellow-100'
    case 'Silver':
      return 'text-gray-600 bg-gray-100'
    default:
      return 'text-blue-600 bg-blue-100'
  }
}

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
    />
  ))
}

export default function AgentsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Verified Clearing Agents Directory
          </h1>
          <div className="flex items-center gap-1 ml-4">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">MASTERY EXCLUSIVE</span>
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          Hand-picked, vetted clearing agents with proven track records. Each agent has been personally tested 
          by our team and maintains high performance standards.
        </p>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-900">QUALITY FOCUSED</span>
          </div>
          <p className="text-green-800 text-sm mt-1">
            All agents are performance-monitored monthly. We work to ensure service meets our quality standards.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">{agents.length}</div>
          <div className="text-sm text-gray-600">Verified Agents</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">97.8%</div>
          <div className="text-sm text-gray-600">Average Success Rate</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">9.2 days</div>
          <div className="text-sm text-gray-600">Average Processing</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">3,407</div>
          <div className="text-sm text-gray-600">Successful Imports</div>
        </Card>
      </div>

      {/* Agent Listings */}
      <div className="space-y-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Agent Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{agent.name}</h3>
                      {agent.verified && (
                        <div className="flex items-center gap-1">
                          <Verified className="h-5 w-5 text-blue-600" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(agent.tier)}`}>
                            {agent.tier.toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {agent.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {agent.experience} experience
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">{getRatingStars(agent.rating)}</div>
                      <span className="font-semibold">{agent.rating}</span>
                      <span className="text-gray-500">({agent.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">From</div>
                    <div className="text-xl font-bold text-green-600">{agent.fees.standard}</div>
                  </div>
                </div>

                {/* Specialities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {agent.specialities.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Success Rate: <strong>{agent.successRate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Processing: <strong>{agent.avgProcessingTime}</strong></span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Services Offered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Success */}
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-900 text-sm">Recent Performance</span>
                  </div>
                  <p className="text-green-800 text-sm">{agent.recentSuccess}</p>
                </div>

                {/* Testimonial */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-900 text-sm">Client Testimonial</span>
                  </div>
                  <p className="text-blue-800 text-sm italic">"{agent.testimonial}"</p>
                </div>
              </div>

              {/* Contact & Pricing */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <a href={`tel:${agent.contact.phone}`} className="text-sm hover:text-blue-600">
                        {agent.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <a href={`mailto:${agent.contact.email}`} className="text-sm hover:text-blue-600">
                        {agent.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <a href={`https://wa.me/${agent.contact.whatsapp.replace(/[^0-9]/g, '')}`} className="text-sm hover:text-green-600">
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h4 className="font-semibold mb-3">Service Pricing</h4>
                  <div className="space-y-2">
                    {Object.entries(agent.fees).map(([service, price]) => (
                      <div key={service} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{service.replace('_', ' ')}</span>
                        <span className="font-semibold text-green-600">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="font-semibold mb-3">Certifications</h4>
                  <div className="space-y-1">
                    {agent.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Profile
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Notice */}
      <Card className="mt-12 p-6 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Important Notes</h3>
            <ul className="text-amber-800 text-sm space-y-1">
              <li>• All agents are independently verified and monitored monthly</li>
              <li>• Prices may vary based on vehicle complexity and current workload</li>
              <li>• Always get written quotes before proceeding with any services</li>
              <li>• Report any issues directly to our support team for immediate resolution</li>
              <li>• This directory is updated weekly with performance metrics</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}