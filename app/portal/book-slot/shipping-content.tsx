'use client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Ship, 
  Phone,
  Mail,
  Globe,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Star,
  ExternalLink,
  Info,
  TrendingUp,
  Shield,
  Package
} from 'lucide-react'
interface ShippingCompany {
  name: string
  logo: string
  description: string
  routes: string[]
  avgTransitTime: string
  priceRange: string
  rating: number
  contact: {
    namibia?: {
      phone: string
      email: string
      address?: string
    }
    southAfrica?: {
      phone: string
      email: string
      address?: string
    }
    website: string
  }
  features: string[]
  color: string
}
const shippingCompanies: ShippingCompany[] = [
  {
    name: 'Maersk Line',
    logo: '🚢',
    description: 'World\'s largest container shipping company with extensive African coverage',
    routes: ['Europe → Southern Africa', 'Asia → Southern Africa', 'Americas → Africa'],
    avgTransitTime: '75-90 days',
    priceRange: 'R70,000 - R165,000',
    rating: 4.5,
    contact: {
      namibia: {
        phone: '+264 61 256 835',
        email: 'nam.import@maersk.com',
        address: 'Walvis Bay, Namibia'
      },
      southAfrica: {
        phone: '+27 21 408 6800',
        email: 'southafrica@maersk.com',
        address: 'Cape Town, South Africa'
      },
      website: 'https://www.maersk.com'
    },
    features: ['Largest fleet', 'Best tracking system', 'Premium insurance options'],
    color: 'bg-blue-600'
  },
  {
    name: 'MSC (Mediterranean Shipping)',
    logo: '⚓',
    description: 'Second largest global carrier with competitive rates to Africa',
    routes: ['Europe → West Africa', 'Mediterranean → Southern Africa', 'Asia → Africa'],
    avgTransitTime: '75-90 days',
    priceRange: 'R70,000 - R165,000',
    rating: 4.3,
    contact: {
      namibia: {
        phone: '+264 64 206 695',
        email: 'wvb.import@msc.com',
        address: 'Port of Walvis Bay, Namibia'
      },
      southAfrica: {
        phone: '+27 21 508 2200',
        email: 'msc.southafrica@msc.com',
        address: 'Cape Town & Durban, South Africa'
      },
      website: 'https://www.msc.com'
    },
    features: ['Competitive pricing', 'Frequent sailings', 'Good Africa network'],
    color: 'bg-yellow-600'
  },
  {
    name: 'CMA CGM',
    logo: '🌊',
    description: 'French carrier with strong Europe-Africa connections',
    routes: ['France → West Africa', 'Europe → Southern Africa', 'Asia → Africa via Europe'],
    avgTransitTime: '75-90 days',
    priceRange: 'R70,000 - R165,000',
    rating: 4.2,
    contact: {
      namibia: {
        phone: '+264 64 202 082',
        email: 'walvisbay@cma-cgm.com',
        address: 'Walvis Bay, Namibia'
      },
      southAfrica: {
        phone: '+27 21 405 0500',
        email: 'capetown.genmbox@cma-cgm.com',
        address: 'Cape Town, South Africa'
      },
      website: 'https://www.cma-cgm.com'
    },
    features: ['Eco-friendly vessels', 'French ports expertise', 'Flexible booking'],
    color: 'bg-red-600'
  },
  {
    name: 'Hapag-Lloyd',
    logo: '🛳️',
    description: 'German precision shipping with reliable Africa services',
    routes: ['Germany → Southern Africa', 'Europe → East Africa', 'Middle East → Africa'],
    avgTransitTime: '75-90 days',
    priceRange: 'R70,000 - R165,000',
    rating: 4.4,
    contact: {
      namibia: {
        phone: '+264 64 274 800',
        email: 'nam.sales@hlag.com',
        address: 'Walvis Bay, Namibia'
      },
      southAfrica: {
        phone: '+27 21 421 6063',
        email: 'sales.southafrica@hlag.com',
        address: 'Cape Town, South Africa'
      },
      website: 'https://www.hapag-lloyd.com'
    },
    features: ['German reliability', 'Excellent customer service', 'Quality containers'],
    color: 'bg-orange-600'
  },
  {
    name: 'MOL (Mitsui O.S.K. Lines)',
    logo: '🇯🇵',
    description: 'Japanese carrier ideal for Japan to Africa vehicle shipments',
    routes: ['Japan → Southern Africa', 'Asia → Africa', 'Japan → East Africa'],
    avgTransitTime: '75-90 days',
    priceRange: 'R70,000 - R165,000',
    rating: 4.6,
    contact: {
      namibia: {
        phone: '+264 64 201 288',
        email: 'namibia@molgroup.com',
        address: 'Walvis Bay, Namibia'
      },
      southAfrica: {
        phone: '+27 11 880 0570',
        email: 'mol.southafrica@molgroup.com',
        address: 'Johannesburg & Durban, South Africa'
      },
      website: 'https://www.mol.co.jp'
    },
    features: ['Japan route specialist', 'Vehicle shipping expert', 'Careful handling'],
    color: 'bg-purple-600'
  },
  {
    name: 'COSCO Shipping',
    logo: '🏴',
    description: 'Chinese state-owned carrier with competitive Asia-Africa rates',
    routes: ['China → Africa', 'Asia → Southern Africa', 'Far East → West Africa'],
    avgTransitTime: '75-90 days',
    priceRange: 'R70,000 - R165,000',
    rating: 4.0,
    contact: {
      namibia: {
        phone: '+264 64 209 266',
        email: 'walvisbay@cosco.com',
        address: 'Walvis Bay, Namibia'
      },
      southAfrica: {
        phone: '+27 21 419 8672',
        email: 'capetown@cosco.com',
        address: 'Cape Town, South Africa'
      },
      website: 'https://www.cosco-shipping.com'
    },
    features: ['Budget-friendly', 'China direct routes', 'Large capacity'],
    color: 'bg-green-600'
  }
]
export default function ShippingContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Ship className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Shipping Companies & Container Booking
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Connect with trusted shipping lines for your vehicle import. Compare rates, routes, and transit times.
        </p>
      </div>
      {/* Container Sharing Platform */}
      <Card className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Save Money with Container Sharing!</h2>
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">RECOMMENDED</span>
            </div>
            <p className="text-gray-700 mb-4">
              Share container space with other importers and reduce shipping costs significantly. Perfect for single vehicle imports.
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Optimize shipping costs</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Secure & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Same transit times</span>
              </div>
            </div>
            <a 
              href="https://www.contshare.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Visit ContShare.com
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="hidden md:block">
            <Package className="h-24 w-24 text-green-600 opacity-20" />
          </div>
        </div>
      </Card>
      {/* Important Tips */}
      <Card className="mb-8 p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Booking Tips</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Always get quotes from at least 3 shipping companies</li>
              <li>• Book 4-6 weeks in advance for better rates</li>
              <li>• Ask about consolidation options if shipping a single vehicle</li>
              <li>• Confirm insurance coverage and claim procedures</li>
              <li>• Request references from other vehicle importers</li>
            </ul>
          </div>
        </div>
      </Card>
      {/* Shipping Companies Grid */}
      <h2 className="text-2xl font-bold mb-6">Major Shipping Lines Serving Africa</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {shippingCompanies.map((company) => (
          <Card key={company.name} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${company.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
                  {company.logo}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{company.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(company.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({company.rating})</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{company.description}</p>
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-sm font-semibold text-gray-700">Main Routes:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {company.routes.map((route, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {route}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Transit Time:</span>
                  <p className="font-semibold">{company.avgTransitTime}</p>
                </div>
                <div>
                  <span className="text-gray-500">Price Range:</span>
                  <p className="font-semibold text-green-600">{company.priceRange}</p>
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-700">Key Features:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {company.features.map((feature, index) => (
                    <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t pt-4 space-y-3">
              <h4 className="font-semibold text-sm mb-2">Contact Information:</h4>
              {company.contact.namibia && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-700">🇳🇦 Namibia Office:</p>
                  <div className="pl-3 space-y-1 text-sm">
                    <a href={`tel:${company.contact.namibia.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                      <Phone className="h-3 w-3" />
                      {company.contact.namibia.phone}
                    </a>
                    <a href={`mailto:${company.contact.namibia.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                      <Mail className="h-3 w-3" />
                      {company.contact.namibia.email}
                    </a>
                    {company.contact.namibia.address && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">{company.contact.namibia.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {company.contact.southAfrica && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-700">🇿🇦 South Africa Office:</p>
                  <div className="pl-3 space-y-1 text-sm">
                    <a href={`tel:${company.contact.southAfrica.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                      <Phone className="h-3 w-3" />
                      {company.contact.southAfrica.phone}
                    </a>
                    <a href={`mailto:${company.contact.southAfrica.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                      <Mail className="h-3 w-3" />
                      {company.contact.southAfrica.email}
                    </a>
                    {company.contact.southAfrica.address && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">{company.contact.southAfrica.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="pt-2">
                <a 
                  href={company.contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm"
                >
                  <Globe className="h-4 w-4" />
                  {company.contact.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="mt-4">
              <a 
                href={company.contact.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Quote
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Card>
        ))}
      </div>
      {/* How to Choose Section */}
      <Card className="p-6 bg-gray-50">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          How to Choose the Right Shipping Company
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">For Japan Imports</h4>
            <p className="text-sm text-gray-600">
              Maersk and MOL are your best choices for vehicles from Japan. Maersk offers the most reliable service
              with extensive coverage, while MOL specializes in RoRo (Roll-on/Roll-off) with direct routes from Japanese ports.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">For European Imports</h4>
            <p className="text-sm text-gray-600">
              Maersk, MSC, or Hapag-Lloyd offer the best coverage from European ports. 
              Compare their schedules as they vary by departure port.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">For Budget Imports</h4>
            <p className="text-sm text-gray-600">
              Consider COSCO for the lowest rates, or better yet, use{' '}
              <a href="https://www.contshare.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                ContShare.com
              </a>{' '}to share container space and save significantly.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}