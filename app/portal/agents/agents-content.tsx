'use client'
import { useState } from 'react'
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
  BadgeCheck,
  Globe,
  Building,
  Filter
} from 'lucide-react'
const agents = [
  // NAMIBIA
  {
    id: 1,
    name: "Transworld Cargo Namibia",
    country: "Namibia",
    location: "Windhoek / Walvis Bay / Lüderitz",
    rating: 4.9,
    reviews: 1247,
    specialities: ["Vehicle Imports", "Automotive Transportation", "ISO 9001 Certified"],
    experience: "39+ years",
    avgProcessingTime: "5-8 days",
    successRate: "99.5%",
    fees: {
      standard: "N$12,000",
      express: "N$18,000",
      luxury: "N$22,000"
    },
    contact: {
      phone: "+264 61 371 100",
      email: "info@transworldcargo.net",
      whatsapp: "+264 61 371 100",
      website: "transworldcargo.net"
    },
    offices: [
      "Head Office: 5 VON BRAUN STREET, Southern Industrial, Windhoek",
      "Walvis Bay: Ben Amathila Avenue, +264 64 276 000",
      "Lüderitz: 55 Hafen Street"
    ],
    services: ["Vehicle Clearing", "Container Handling", "Storage Facilities", "Cross-Border Transport", "Documentation"],
    certifications: ["ISO 9001 Certified", "NamRA Licensed", "39 Years Experience"],
    recentSuccess: "Leading automotive transportation company with extensive network across SADC",
    testimonial: "The most reliable clearing agent in Namibia. Their experience shows in every transaction.",
    verified: true,
    tier: "Platinum",
    featured: true
  },
  {
    id: 2,
    name: "Trade Ocean Shipping",
    country: "Namibia",
    location: "Walvis Bay",
    rating: 4.7,
    reviews: 523,
    specialities: ["Private Vehicles", "Industrial Vehicles", "Specialized Equipment", "Multi-Country Operations"],
    experience: "15 years",
    avgProcessingTime: "6-9 days",
    successRate: "97.8%",
    fees: {
      standard: "N$10,500",
      express: "N$15,000",
      specialized: "N$20,000"
    },
    contact: {
      phone: "+264 64 275 480",
      fax: "+264 64 275 484",
      email: "infonam@tradeocean.co.za",
      website: "tradeocean.co.za"
    },
    offices: [
      "Namibia: 165 Rikumbi Kandanga, Walvis Bay, P.O. Box 9096",
      "South Africa - Durban: Suite 404 Cowey Park, 91 Problem Mkhize (Cowey) Road, Durban, 4001"
    ],
    services: ["Licensed Vehicle Clearance", "Port Operations", "Documentation", "Transport Arrangement", "Cross-Border Services"],
    certifications: ["NamRA Licensed", "SADC Approved", "Multi-Country Operations"],
    recentSuccess: "Specialized in clearing industrial and specialized vehicles with operations in Namibia and South Africa",
    testimonial: "Excellent cross-border clearing services between Namibia and South Africa.",
    verified: true,
    tier: "Gold"
  },
  {
    id: 4,
    name: "Manica Group Namibia",
    country: "Namibia",
    location: "Walvis Bay",
    rating: 4.8,
    reviews: 687,
    specialities: ["Freight Forwarding", "Customs Clearing", "Logistics Solutions"],
    experience: "20+ years",
    avgProcessingTime: "5-8 days",
    successRate: "98.2%",
    fees: {
      standard: "N$11,000",
      express: "N$16,500",
      specialized: "N$21,000"
    },
    contact: {
      phone: "+264 64 2012911",
      fax: "+264 64 202530",
      email: "contact@manica.com.na",
      website: "manica.com"
    },
    offices: [
      "2 Third Str, Walvis Bay, Namibia"
    ],
    services: ["Vehicle Clearing", "Freight Forwarding", "Customs Brokerage", "Supply Chain Solutions", "Documentation"],
    certifications: ["NamRA Licensed", "International Freight Forwarder", "Customs Accredited"],
    recentSuccess: "Leading freight and logistics provider with global network",
    testimonial: "Professional and efficient clearing services with excellent communication.",
    verified: true,
    tier: "Gold"
  },
  {
    id: 16,
    name: "Kuehne & Nagel Namibia",
    country: "Namibia",
    location: "Walvis Bay",
    rating: 4.7,
    reviews: 542,
    specialities: ["Global Logistics", "Supply Chain Solutions", "Freight Forwarding"],
    experience: "25+ years",
    avgProcessingTime: "6-9 days",
    successRate: "97.5%",
    fees: {
      standard: "N$12,000",
      express: "N$17,500",
      specialized: "N$22,500"
    },
    contact: {
      phone: "+264 64 271200",
      fax: "+264 64 203421",
      email: "jacqueline.hebbard@kuehne-nagel.com",
      website: "kuehne-nagel.com"
    },
    services: ["Vehicle Clearing", "Sea & Air Freight", "Contract Logistics", "Integrated Logistics", "Documentation"],
    certifications: ["NamRA Licensed", "Global Network", "ISO Certified"],
    recentSuccess: "Leading global logistics provider with strong local presence",
    verified: true,
    tier: "Gold"
  },
  {
    id: 17,
    name: "Maersk Namibia",
    country: "Namibia",
    location: "Walvis Bay",
    rating: 4.6,
    reviews: 428,
    specialities: ["Container Shipping", "Logistics Solutions", "Supply Chain Management"],
    experience: "30+ years",
    avgProcessingTime: "7-10 days",
    successRate: "96.8%",
    fees: {
      standard: "N$11,500",
      express: "N$16,500",
      container: "N$19,500"
    },
    contact: {
      phone: "+264 64 273 0112",
      email: "johan.van.dyk@maersk.com",
      website: "maersk.com"
    },
    services: ["Vehicle Clearing", "Container Handling", "Ocean Transport", "Inland Services", "Documentation"],
    certifications: ["NamRA Licensed", "World's Largest Container Shipping Line", "ISO Certified"],
    recentSuccess: "Global leader in container logistics with comprehensive Namibian operations",
    verified: true,
    tier: "Gold"
  },
  {
    id: 18,
    name: "Schenker Namibia (Pty) Ltd",
    country: "Namibia",
    location: "Windhoek / Walvis Bay",
    rating: 4.5,
    reviews: 396,
    specialities: ["DB Schenker Network", "Air & Ocean Freight", "Land Transport"],
    experience: "20+ years",
    avgProcessingTime: "6-9 days",
    successRate: "96.2%",
    fees: {
      standard: "N$10,500",
      express: "N$15,500",
      specialized: "N$20,000"
    },
    contact: {
      phone: "+264 61 376 550 (Windhoek) / +264 64 277 300 (Walvis Bay)",
      fax: "+264 61 433 9811",
      email: "info.Namibia@dbschenker.com",
      website: "dbschenker.com"
    },
    offices: [
      "Windhoek Office: +264 61 376 550",
      "Walvis Bay Office: +264 64 277 300"
    ],
    services: ["Vehicle Clearing", "Air Freight", "Ocean Freight", "Land Transport", "Contract Logistics", "Documentation"],
    certifications: ["NamRA Licensed", "Part of DB Schenker Global Network", "ISO 9001 Certified"],
    recentSuccess: "Global logistics network with strong presence in both Windhoek and Walvis Bay",
    verified: true,
    tier: "Gold"
  },
  // SOUTH AFRICA
  {
    id: 5,
    name: "Transworld Cargo South Africa",
    country: "South Africa",
    location: "Johannesburg / Upington",
    rating: 4.8,
    reviews: 956,
    specialities: ["Vehicle Imports", "Automotive Transport", "Cross-Border"],
    experience: "39+ years",
    avgProcessingTime: "7-10 days",
    successRate: "98.9%",
    fees: {
      standard: "R15,000",
      express: "R22,000",
      luxury: "R28,000"
    },
    contact: {
      phone: "+264 61 371 100",
      email: "info@transworldcargo.net",
      website: "transworldcargo.net"
    },
    services: ["Vehicle Clearing", "NRCS Handling", "Transport", "Storage", "Documentation"],
    certifications: ["ISO 9001", "SARS Accredited", "Cross-Border Licensed"],
    recentSuccess: "Strategic presence in key South African locations for vehicle imports",
    verified: true,
    tier: "Platinum",
    featured: true
  },
  {
    id: 6,
    name: "Durban Clearing & Forwarding",
    country: "South Africa",
    location: "Durban",
    rating: 4.6,
    reviews: 734,
    specialities: ["Motor Vehicles", "Port Operations", "Commercial Goods"],
    experience: "18 years",
    avgProcessingTime: "8-12 days",
    successRate: "96.5%",
    fees: {
      standard: "R12,500",
      express: "R18,000",
      commercial: "R22,000"
    },
    contact: {
      phone: "072 186 3363",
      email: "info@durbanclearing.co.za",
      whatsapp: "082 846 2673",
      website: "durbanclearing.co.za"
    },
    services: ["Port Clearing", "Vehicle Imports", "Documentation", "Transport Arrangement"],
    certifications: ["SARS Registered", "Port Licensed"],
    recentSuccess: "Specialized in Durban port operations with excellent track record",
    verified: true,
    tier: "Gold"
  },
  {
    id: 7,
    name: "Cargo Compass SA",
    country: "South Africa",
    location: "All Major Ports",
    rating: 4.7,
    reviews: 1102,
    specialities: ["Market Leader", "All Transport Modes", "Customs Brokerage"],
    experience: "20+ years",
    avgProcessingTime: "7-11 days",
    successRate: "97.8%",
    fees: {
      standard: "R14,000",
      express: "R20,000",
      premium: "R25,000"
    },
    contact: {
      website: "cargocompasssa.co.za"
    },
    services: ["Full Clearing", "All Ports of Entry", "Customs Brokerage", "Logistics"],
    certifications: ["SARS Accredited", "Licensed at All Ports", "Market Leader"],
    recentSuccess: "Market leader in clearing and forwarding across South Africa",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 8,
    name: "Sediba Clearing",
    country: "South Africa",
    location: "Beitbridge / JHB / DBN / Komatipoort",
    rating: 4.5,
    reviews: 623,
    specialities: ["Cross-Border", "Vehicle Tracking", "Multiple Borders"],
    experience: "15 years",
    avgProcessingTime: "9-13 days",
    successRate: "95.7%",
    fees: {
      standard: "R11,500",
      crossBorder: "R16,500",
      tracking: "R19,000"
    },
    contact: {
      website: "sedibaclearing.co.za"
    },
    services: ["Border Clearing", "Vehicle Movement Tracking", "Multi-Point Operations"],
    certifications: ["SARS Accredited", "SA Association of Freight Forwarders Member"],
    recentSuccess: "Excellence in vehicle movement tracking across borders",
    verified: true,
    tier: "Gold"
  },
  {
    id: 19,
    name: "Trade Ocean South Africa",
    country: "South Africa",
    location: "Durban",
    rating: 4.6,
    reviews: 412,
    specialities: ["Port Operations", "Vehicle Imports", "Cross-Border to Namibia"],
    experience: "15 years",
    avgProcessingTime: "7-10 days",
    successRate: "96.8%",
    fees: {
      standard: "R13,000",
      express: "R18,000",
      crossBorder: "R21,000"
    },
    contact: {
      phone: "+27 (0) 31 207 6233",
      email: "operationsdbn@tradeocean.co.za",
      website: "tradeocean.co.za"
    },
    offices: [
      "Suite 404 Cowey Park, 91 Problem Mkhize (Cowey) Road, Durban, 4001"
    ],
    services: ["Vehicle Clearing", "Port Operations", "Documentation", "Cross-Border Transport to Namibia"],
    certifications: ["SARS Accredited", "Durban Port Licensed", "Cross-Border Operations"],
    recentSuccess: "Specializes in vehicle imports through Durban port with direct operations to Namibia",
    verified: true,
    tier: "Gold"
  },
  // BOTSWANA
  {
    id: 9,
    name: "Transworld Cargo Botswana (TriOptimum)",
    country: "Botswana",
    location: "Gaborone",
    rating: 4.7,
    reviews: 412,
    specialities: ["Vehicle Storage", "Bonded Warehousing", "Automotive Transport"],
    experience: "15+ years",
    avgProcessingTime: "6-9 days",
    successRate: "97.2%",
    fees: {
      standard: "P12,000",
      express: "P17,000",
      storage: "P20,000"
    },
    contact: {
      phone: "+267 310 5743",
      website: "trioptimumlogistics.co.za"
    },
    offices: [
      "Plot 22072 Unit 20 & 21 Technology Park, Gaborone West"
    ],
    services: ["Vehicle Clearing", "Bonded Storage", "Transport", "Documentation"],
    certifications: ["BURS Licensed", "Bonded Warehouse", "Part of Transworld Network"],
    recentSuccess: "Leading automotive logistics provider in Botswana",
    verified: true,
    tier: "Platinum",
    featured: true
  },
  {
    id: 10,
    name: "Swift Logistics Botswana",
    country: "Botswana",
    location: "Gaborone",
    rating: 4.4,
    reviews: 287,
    specialities: ["Quick Processing", "Technology Park Based", "Efficient Service"],
    experience: "10 years",
    avgProcessingTime: "7-10 days",
    successRate: "94.8%",
    fees: {
      standard: "P10,500",
      express: "P15,000",
      premium: "P18,500"
    },
    contact: {
      phone: "+267 396 9911",
      email: "info@swift-bw.com"
    },
    offices: [
      "Plot 22072/2 Unit 28, Gaborone Technology Park"
    ],
    services: ["Vehicle Clearing", "Documentation", "Transport", "Express Service"],
    certifications: ["BURS Registered", "Technology Park Licensed"],
    verified: true,
    tier: "Silver"
  },
  {
    id: 11,
    name: "Trans-Tech Botswana",
    country: "Botswana",
    location: "Gaborone",
    rating: 4.5,
    reviews: 198,
    specialities: ["Japanese Vehicles", "Singapore Imports", "100% Citizen Owned"],
    experience: "8 years",
    avgProcessingTime: "8-11 days",
    successRate: "95.3%",
    fees: {
      standard: "P9,500",
      japanese: "P14,000",
      singapore: "P15,500"
    },
    contact: {
      phone: "+267 75 124 326",
      email: "transtechbw18@gmail.com"
    },
    services: ["Japanese Vehicle Specialists", "Singapore Imports", "Documentation", "Local Support"],
    certifications: ["100% Citizen Owned", "BURS Licensed", "Japanese Specialist"],
    recentSuccess: "Specialized in Japanese and Singapore vehicle imports",
    verified: true,
    tier: "Silver"
  },
  // ZAMBIA
  {
    id: 12,
    name: "Transworld Cargo Zambia",
    country: "Zambia",
    location: "Via Katima Mulilo / Walvis Bay",
    rating: 4.6,
    reviews: 334,
    specialities: ["Walvis Bay Route", "Cross-Border", "Vehicle Imports"],
    experience: "39+ years",
    avgProcessingTime: "10-14 days",
    successRate: "96.5%",
    fees: {
      standard: "K8,000",
      express: "K12,000",
      crossBorder: "K15,000"
    },
    contact: {
      phone: "+264 61 371 100",
      email: "info@transworldcargo.net",
      website: "transworldcargo.net"
    },
    services: ["Zambia Vehicle Imports", "Walvis Bay Port", "Cross-Border Transport", "Documentation"],
    certifications: ["ISO 9001", "Cross-Border Licensed", "Katima Mulilo Corridor"],
    recentSuccess: "Facilitating Zambian imports via Walvis Bay port efficiently",
    verified: true,
    tier: "Gold",
    featured: true
  },
  {
    id: 13,
    name: "ESSE Clearing Ltd",
    country: "Zambia",
    location: "Livingstone / Lusaka / All Borders",
    rating: 4.8,
    reviews: 867,
    specialities: ["Leading Customs Agent", "All Border Posts", "Since 2003"],
    experience: "21 years",
    avgProcessingTime: "7-11 days",
    successRate: "98.2%",
    fees: {
      standard: "K7,500",
      express: "K11,000",
      allBorders: "K14,000"
    },
    contact: {
      phone: "+260 213 322553",
      email: "info@esseclearing.com",
      whatsapp: "+260 977 849697"
    },
    offices: [
      "Livingstone HQ: Plot 2652 Linda Road",
      "Lusaka Airport: +260 211 271276",
      "Kazungula: +260 977 740450",
      "Chirundu: +260 974 771555",
      "Nakonde: +260 971 259936"
    ],
    services: ["All Border Posts", "Airport Clearing", "Vehicle Imports", "Documentation", "Express Service"],
    certifications: ["ZRA Licensed", "Leading Agent Since 2003", "All Borders Coverage"],
    recentSuccess: "Zambia's leading customs clearance agent with presence at all major borders",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 14,
    name: "DSV Zambia",
    country: "Zambia",
    location: "Lusaka",
    rating: 4.5,
    reviews: 445,
    specialities: ["30+ Years Experience", "International Network", "All Transport Modes"],
    experience: "30+ years",
    avgProcessingTime: "8-12 days",
    successRate: "96.8%",
    fees: {
      standard: "K8,500",
      air: "K12,500",
      project: "K18,000"
    },
    contact: {
      phone: "+260 211 846 340",
      email: "zambia@zm.dsv.com"
    },
    services: ["Air/Sea/Road Freight", "Project Transport", "Logistics Solutions", "Vehicle Imports"],
    certifications: ["ZRA Licensed", "International Network", "30+ Years Experience"],
    recentSuccess: "International freight forwarder with strong local presence",
    verified: true,
    tier: "Gold"
  },
  // MULTI-COUNTRY AGENTS
  {
    id: 15,
    name: "Blackie's Consultants",
    country: "Multi-Country",
    location: "SA / Namibia / Botswana / Zimbabwe",
    rating: 4.7,
    reviews: 1523,
    specialities: ["SARS Accredited", "8-Hour Clearance", "Multi-Country"],
    experience: "25+ years",
    avgProcessingTime: "8 hours - 2 days",
    successRate: "99.1%",
    fees: {
      standard: "Varies by country",
      express: "Premium rates",
      sameDay: "Available"
    },
    contact: {
      website: "blackiessa.com"
    },
    services: ["Express Clearing", "SARS Specialist", "Multi-Country Operations", "Same-Day Service"],
    certifications: ["SARS Accredited", "Fully Licensed", "Multi-Country Coverage"],
    recentSuccess: "Reduces clearance time from 48 hours to 8 hours consistently",
    testimonial: "The fastest clearing service in Southern Africa. Their 8-hour service is real!",
    verified: true,
    tier: "Platinum"
  }
]
// Add country filter options
const countries = ["All", "Namibia", "South Africa", "Botswana", "Zambia", "Multi-Country"]
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
  const [selectedCountry, setSelectedCountry] = useState("All")
  // Filter agents based on selected country
  const filteredAgents = selectedCountry === "All"
    ? agents
    : agents.filter(agent => agent.country === selectedCountry)
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
            <span className="text-sm font-medium text-purple-600">COMPREHENSIVE LISTING</span>
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          Reputable, licensed clearing agents across Namibia, South Africa, Botswana, and Zambia.
          All agents are properly registered with their respective customs authorities.
        </p>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-900">TRANSWORLD CARGO FEATURED</span>
          </div>
          <p className="text-green-800 text-sm mt-1">
            Transworld Cargo operates across all listed countries with 39+ years of experience in vehicle imports.
          </p>
        </div>
      </div>
      {/* Country Filter */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-gray-900">Filter by Country</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCountry === country
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {country}
              {country !== "All" && (
                <span className="ml-1 text-xs opacity-75">
                  ({agents.filter(a => a.country === country).length})
                </span>
              )}
            </button>
          ))}
        </div>
        {selectedCountry !== "All" && (
          <p className="mt-3 text-sm text-gray-600">
            Showing {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} in {selectedCountry}
          </p>
        )}
      </div>
      {/* Featured Agent - Transworld Cargo */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Building className="h-8 w-8 text-purple-600" />
            <div>
              <h2 className="text-2xl font-bold text-purple-900">Transworld Cargo</h2>
              <p className="text-purple-700">Operating in All 4 Countries • ISO 9001 Certified</p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-bold">
              FEATURED PARTNER
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Regional Presence:</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Namibia:</strong> Windhoek, Walvis Bay, Lüderitz</li>
              <li>• <strong>South Africa:</strong> Johannesburg, Upington</li>
              <li>• <strong>Botswana:</strong> Gaborone (TriOptimum)</li>
              <li>• <strong>Zambia:</strong> Via Katima Mulilo corridor</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Information:</h4>
            <div className="text-sm space-y-1">
              <p><Phone className="inline h-3 w-3" /> +264 61 371 100</p>
              <p><Mail className="inline h-3 w-3" /> info@transworldcargo.net</p>
              <p><Globe className="inline h-3 w-3" /> transworldcargo.net</p>
              <p className="font-semibold text-purple-700 mt-2">39+ Years of Excellence</p>
            </div>
          </div>
        </div>
      </Card>
      {/* Agent Listings */}
      <div className="space-y-6">
        {filteredAgents.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Agents Found</h3>
            <p className="text-gray-600">No clearing agents found for {selectedCountry}. Try selecting a different country.</p>
          </Card>
        ) : (
          filteredAgents.map((agent) => (
          <Card key={agent.id} className={agent.featured ? 'ring-2 ring-purple-400' : ''}>
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Agent Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{agent.name}</h3>
                        {agent.verified && (
                          <div className="flex items-center gap-1">
                            <BadgeCheck className="h-5 w-5 text-blue-600" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(agent.tier)}`}>
                              {agent.tier.toUpperCase()}
                            </span>
                          </div>
                        )}
                        {agent.featured && (
                          <span className="px-2 py-1 bg-purple-600 text-white rounded-full text-xs font-medium">
                            TRANSWORLD
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {agent.country}
                        </div>
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
                  {/* Offices (if available) */}
                  {agent.offices && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 text-sm mb-2">Office Locations:</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        {agent.offices.map((office, index) => (
                          <li key={index}>• {office}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Recent Success */}
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-900 text-sm">Track Record</span>
                    </div>
                    <p className="text-green-800 text-sm">{agent.recentSuccess}</p>
                  </div>
                  {/* Testimonial (if available) */}
                  {agent.testimonial && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageCircle className="h-4 w-4 text-purple-600" />
                        <span className="font-semibold text-purple-900 text-sm">Client Feedback</span>
                      </div>
                      <p className="text-purple-800 text-sm italic">"{agent.testimonial}"</p>
                    </div>
                  )}
                </div>
                {/* Contact & Pricing */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      {agent.contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-600" />
                          <a href={`tel:${agent.contact.phone}`} className="text-sm hover:text-blue-600">
                            {agent.contact.phone}
                          </a>
                        </div>
                      )}
                      {agent.contact.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-600" />
                          <a href={`mailto:${agent.contact.email}`} className="text-sm hover:text-blue-600 break-all">
                            {agent.contact.email}
                          </a>
                        </div>
                      )}
                      {agent.contact.whatsapp && (
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-green-600" />
                          <a href={`https://wa.me/${agent.contact.whatsapp.replace(/[^0-9]/g, '')}`} className="text-sm hover:text-green-600">
                            WhatsApp: {agent.contact.whatsapp}
                          </a>
                        </div>
                      )}
                      {agent.contact.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-600" />
                          <a href={`https://${agent.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-600">
                            {agent.contact.website}
                          </a>
                        </div>
                      )}
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
                    {agent.contact.phone && (
                      <Button className="w-full" asChild>
                        <a href={`tel:${agent.contact.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Agent
                        </a>
                      </Button>
                    )}
                    {agent.contact.website && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`https://${agent.contact.website}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )))}
      </div>
      {/* Regulatory Bodies - Comprehensive Information */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building className="h-6 w-6 text-blue-600" />
          Customs & Revenue Authorities
        </h2>
        {/* Namibia - NamRA */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200">
          <div className="mb-4">
            <h3 className="font-bold text-blue-900 text-lg mb-2">🇳🇦 Namibia Revenue Agency (NamRA)</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Head Office:</h4>
              <ul className="text-blue-700 space-y-1">
                <li><strong>Address:</strong> Town Square, Werner List Street, Windhoek</li>
                <li><strong>Phone:</strong> +264 (81) 959 4000</li>
                <li><strong>Website:</strong> <a href="https://www.namra.org.na" target="_blank" className="underline hover:text-blue-900">www.namra.org.na</a></li>
                <li><strong>Customs Commissioner:</strong> +264-61-2092259</li>
                <li><strong>Email:</strong> Sam.SHIVUTE@namra.org.na</li>
              </ul>
              <h4 className="font-semibold text-blue-800 mt-3 mb-2">Walvis Bay Port:</h4>
              <ul className="text-blue-700 space-y-1">
                <li><strong>Hours:</strong> 06:00 - 22:00 daily</li>
                <li><strong>Namport:</strong> +264 64 208 2111</li>
                <li><strong>Address:</strong> Nr 17, Rikumbi Kandanga Rd, Walvis Bay</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Major Border Posts:</h4>
              <ul className="text-blue-700 space-y-1">
                <li><strong>Noordoewer/Vioolsdrif:</strong> 24 hours</li>
                <li><strong>Ariamsvlei/Nakop:</strong> 24 hours</li>
                <li><strong>Trans Kalahari:</strong> 07:00-24:00</li>
                <li><strong>Oshikango:</strong> 08:00-18:00</li>
                <li><strong>Ngoma Bridge:</strong> 07:00-18:00</li>
              </ul>
              <h4 className="font-semibold text-blue-800 mt-3 mb-2">Social Media:</h4>
              <ul className="text-blue-700 space-y-1">
                <li>Facebook: @NamRA.org.na</li>
                <li>Twitter: @NamRA_org_na</li>
                <li>Instagram: @namra_org_na</li>
              </ul>
            </div>
          </div>
        </Card>
        {/* South Africa - SARS */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="mb-4">
            <h3 className="font-bold text-green-900 text-lg mb-2">🇿🇦 South African Revenue Service (SARS)</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Head Office:</h4>
              <ul className="text-green-700 space-y-1">
                <li><strong>Address:</strong> Lehae La Sars, 299 Bronkhorst Street, Nieuw Muckleneuk, Pretoria</li>
                <li><strong>Phone:</strong> (012) 422 4000</li>
                <li><strong>Website:</strong> <a href="https://www.sars.gov.za" target="_blank" className="underline hover:text-green-900">www.sars.gov.za</a></li>
              </ul>
              <h4 className="font-semibold text-green-800 mt-3 mb-2">Customs Contact Centre:</h4>
              <ul className="text-green-700 space-y-1">
                <li><strong>Toll-Free:</strong> 0800 00 7277</li>
                <li><strong>International:</strong> +27 11 602 2093</li>
                <li><strong>Email:</strong> contactus@sars.gov.za</li>
                <li><strong>Complaints:</strong> customscomplaints@sars.gov.za</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Working Hours:</h4>
              <ul className="text-green-700 space-y-1">
                <li><strong>Mon, Tue, Thu, Fri:</strong> 08:00-16:00</li>
                <li><strong>Wednesdays:</strong> 09:00-16:00</li>
                <li><strong>Weekends:</strong> Closed</li>
              </ul>
              <h4 className="font-semibold text-green-800 mt-3 mb-2">Important Notes:</h4>
              <ul className="text-green-700 space-y-1">
                <li>• All border posts use centralized contact: 0800 00 7277</li>
                <li>• Many major borders operate 24 hours</li>
                <li>• All customs queries routed through central system</li>
              </ul>
            </div>
          </div>
        </Card>
        {/* Botswana - BURS */}
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
          <div className="mb-4">
            <h3 className="font-bold text-yellow-900 text-lg mb-2">🇧🇼 Botswana Unified Revenue Service (BURS)</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Head Office:</h4>
              <ul className="text-yellow-700 space-y-1">
                <li><strong>Address:</strong> Plot 53976, Kudumatse Drive, Gaborone</li>
                <li><strong>Postal:</strong> Private Bag 0013, Gaborone</li>
                <li><strong>Phone:</strong> +267 3638000 / 3639000</li>
                <li><strong>Call Centre:</strong> 17649</li>
                <li><strong>Email:</strong> info@burs.org.bw</li>
                <li><strong>Website:</strong> <a href="https://www.burs.org.bw" target="_blank" className="underline hover:text-yellow-900">www.burs.org.bw</a></li>
              </ul>
              <h4 className="font-semibold text-yellow-800 mt-3 mb-2">Customs Management:</h4>
              <ul className="text-yellow-700 space-y-1">
                <li><strong>Phone:</strong> +267 3639666</li>
                <li><strong>Email:</strong> callcenter@burs.org.bw</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Regional Offices:</h4>
              <ul className="text-yellow-700 space-y-1">
                <li><strong>Francistown:</strong> +267 2413635</li>
                <li><strong>Mahalapye:</strong> +267 4710486</li>
                <li><strong>Palapye:</strong> +267 4920388</li>
              </ul>
              <h4 className="font-semibold text-yellow-800 mt-3 mb-2">Border Posts:</h4>
              <ul className="text-yellow-700 space-y-1">
                <li><strong>Ramatlabama:</strong> 06:00-22:00</li>
                <li><strong>Kazungula Ferry:</strong> 06:00-18:30, +267 625 0420</li>
                <li><strong>Kasane:</strong> +267 6250420</li>
                <li><strong>Matsiloje:</strong> +267 248 3275</li>
              </ul>
            </div>
          </div>
        </Card>
        {/* Zambia - ZRA */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="mb-4">
            <h3 className="font-bold text-purple-900 text-lg mb-2">🇿🇲 Zambia Revenue Authority (ZRA)</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Head Office:</h4>
              <ul className="text-purple-700 space-y-1">
                <li><strong>Address:</strong> Revenue House, Plot 1704, Kalambo Road, Lusaka</li>
                <li><strong>P.O. Box:</strong> 35710</li>
                <li><strong>Phone:</strong> +260 211 382831 / 382819</li>
                <li><strong>Email:</strong> zraic@zra.org.zm</li>
                <li><strong>Website:</strong> <a href="https://www.zra.org.zm" target="_blank" className="underline hover:text-purple-900">www.zra.org.zm</a></li>
              </ul>
              <h4 className="font-semibold text-purple-800 mt-3 mb-2">Digital Services:</h4>
              <ul className="text-purple-700 space-y-1">
                <li><strong>WhatsApp:</strong> 096 0081111</li>
                <li><strong>Portal:</strong> <a href="https://portal.zra.org.zm" target="_blank" className="underline hover:text-purple-900">portal.zra.org.zm</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Major Border Posts:</h4>
              <ul className="text-purple-700 space-y-1">
                <li><strong>Chirundu:</strong> Major crossing with Zimbabwe</li>
                <li><strong>Kasumbalesa:</strong> 24-hour crossing with DRC</li>
                <li><strong>Nakonde:</strong> Tanzania border (06:00-18:00)</li>
                <li><strong>Kazungula:</strong> Botswana crossing</li>
                <li><strong>Mwami:</strong> Malawi border</li>
              </ul>
              <h4 className="font-semibold text-purple-800 mt-3 mb-2">Service Centers:</h4>
              <ul className="text-purple-700 space-y-1">
                <li><strong>Kitwe:</strong> ECL Mall, Copperbelt</li>
                <li><strong>Lusaka:</strong> Multiple locations</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
      {/* Bottom Notice */}
      <Card className="mt-6 p-6 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Important Disclaimer</h3>
            <ul className="text-amber-800 text-sm space-y-1">
              <li>• All agents listed are licensed and registered with respective authorities</li>
              <li>• Prices may vary based on vehicle type, complexity, and current regulations</li>
              <li>• Always verify current licensing status before engaging services</li>
              <li>• Exchange rates and fees are subject to change</li>
              <li>• Contact details current as of 2024 - verify before use</li>
              <li>• Transworld Cargo is our featured partner across all four countries</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}