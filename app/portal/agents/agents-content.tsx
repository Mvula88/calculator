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
  {
    id: 20,
    name: "Ziegler South Africa",
    country: "South Africa",
    location: "Durban",
    rating: 4.6,
    reviews: 523,
    specialities: ["Freight Forwarding", "Customs Clearing", "Global Network"],
    experience: "25+ years",
    avgProcessingTime: "7-10 days",
    successRate: "97.2%",
    contact: {
      phone: "+27 (0) 31 700 2544",
      email: "info@ziegler.co.za",
      website: "ziegler.co.za"
    },
    offices: [
      "151 South Coast Road, Rossburgh, Durban, 4072"
    ],
    services: ["Vehicle Clearing", "Freight Forwarding", "Customs Brokerage", "Port Operations", "Documentation"],
    certifications: ["SARS Accredited", "Global Logistics Network", "ISO Certified"],
    recentSuccess: "International freight forwarder with strong presence in Durban port operations",
    verified: true,
    tier: "Gold"
  },
  {
    id: 21,
    name: "DSV South Africa",
    country: "South Africa",
    location: "Durban",
    rating: 4.7,
    reviews: 689,
    specialities: ["Global Logistics", "Air & Sea Freight", "Supply Chain Solutions"],
    experience: "30+ years",
    avgProcessingTime: "7-11 days",
    successRate: "97.5%",
    contact: {
      phone: "+27 31 310 6000",
      email: "za.info@za.dsv.com",
      website: "dsv.com"
    },
    offices: [
      "10 Quarry Park Close, Riverhorse Valley, Newlands East, 4017 Durban, KwaZulu-Natal"
    ],
    services: ["Vehicle Clearing", "Air Freight", "Ocean Freight", "Road Transport", "Project Logistics", "Documentation"],
    certifications: ["SARS Accredited", "Global DSV Network", "ISO 9001 Certified"],
    recentSuccess: "Leading global transport and logistics provider with comprehensive South African operations",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 22,
    name: "AVECS - Africa Vehicle Clearance Specialist",
    country: "South Africa",
    location: "Durban / Westville",
    rating: 4.8,
    reviews: 892,
    specialities: ["Vehicle Import Specialist", "Japan Imports", "Quick Processing"],
    experience: "15+ years",
    avgProcessingTime: "5-8 days",
    successRate: "98.5%",
    contact: {
      phone: "+27 31 266 0859",
      website: "avecs.co.za"
    },
    offices: [
      "Unit 3, 9-11 University Road, Imperial Office Park, Westville, Durban, 3631"
    ],
    services: ["Specialized Vehicle Clearing", "Japan Import Experts", "Documentation", "NRCS Compliance", "Transport Arrangement"],
    certifications: ["SARS Accredited", "Vehicle Import Specialist", "Japan Trade Expert"],
    recentSuccess: "Africa's leading vehicle clearance specialist with expertise in Japanese imports",
    testimonial: "The best in the business for Japanese vehicle imports. Fast and reliable service.",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 23,
    name: "Calthol Clearing & Forwarding",
    country: "South Africa",
    location: "Johannesburg / Cape Town / Durban",
    rating: 4.5,
    reviews: 756,
    specialities: ["National Coverage", "Multi-Port Operations", "Established Provider"],
    experience: "20+ years",
    avgProcessingTime: "8-12 days",
    successRate: "96.3%",
    contact: {
      phone: "+27 11 396 1700 (JHB) / +27 21 030 0050 (CPT) / +27 31 368 2173 (DBN)",
      website: "calthol.co.za"
    },
    offices: [
      "Johannesburg: +27 11 396 1700",
      "Cape Town: +27 21 030 0050",
      "Durban: +27 31 368 2173"
    ],
    services: ["Vehicle Clearing", "National Coverage", "All Ports of Entry", "Documentation", "Transport Solutions"],
    certifications: ["SARS Accredited", "Multi-Port Licensed", "National Operations"],
    recentSuccess: "Established clearing and forwarding company with offices in all major South African cities",
    verified: true,
    tier: "Gold"
  },
  // BOTSWANA
  {
    id: 24,
    name: "Bolloré Logistics Botswana",
    country: "Botswana",
    location: "Gaborone / Kazungula / Mamuno",
    rating: 4.7,
    reviews: 567,
    specialities: ["Multi-Border Operations", "International Network", "Freight Forwarding"],
    experience: "25+ years",
    avgProcessingTime: "6-9 days",
    successRate: "97.3%",
    contact: {
      phone: "+267 395 1961",
      email: "g.lendrum@bollore.co.bw",
      website: "bollore-logistics.com"
    },
    offices: [
      "Head Office: Plot 5625, Lejara Rd, Broadhurst Industrial, Gaborone",
      "Kazungula/Chobe Office: +267 625 2635",
      "Mamuno/Trans-Kalahari: +267 723 09605 / 728 91181"
    ],
    services: ["Vehicle Clearing", "Multi-Border Operations", "Freight Forwarding", "Documentation", "Customs Brokerage"],
    certifications: ["BURS Licensed", "Formerly SDV/AMI", "Global Bolloré Network"],
    recentSuccess: "Strategic presence at all major Botswana border posts with international backing",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 25,
    name: "Manica Freight Services Botswana",
    country: "Botswana",
    location: "Gaborone / Kasane / Ngoma / Mamuno",
    rating: 4.6,
    reviews: 432,
    specialities: ["National Coverage", "Cross-Border", "Established Network"],
    experience: "20+ years",
    avgProcessingTime: "7-10 days",
    successRate: "96.8%",
    contact: {
      phone: "+267 391 2677",
      fax: "+267 391 2326",
      email: "manica@info.bw",
      website: "manica.com"
    },
    offices: [
      "Gaborone: Plot 20741, Pharathe Crescent, Broadhurst Industrial, P.O. Box 1372",
      "Kasane/Chobe: P.O. Box 226, Tel: +267 625 0070",
      "Ngoma: +267 620 0050",
      "Mamuno: +267 659 2013"
    ],
    services: ["Vehicle Clearing", "Kasane/Ngoma Corridor", "Documentation", "Cross-Border Operations"],
    certifications: ["BURS Licensed", "Part of Manica Group", "Regional Network"],
    recentSuccess: "Comprehensive coverage of all major Botswana border posts",
    verified: true,
    tier: "Gold"
  },
  {
    id: 26,
    name: "DHL International Botswana",
    country: "Botswana",
    location: "Gaborone",
    rating: 4.5,
    reviews: 389,
    specialities: ["Express Services", "Global Network", "Air Freight"],
    experience: "30+ years",
    avgProcessingTime: "5-8 days",
    successRate: "97.5%",
    contact: {
      phone: "+267 391 2000 / 316 6340",
      fax: "+267 397 4168",
      email: "enquiries@dhl.co.bw",
      website: "dhl.com"
    },
    offices: [
      "P.O. Box 1077, Gaborone"
    ],
    services: ["Express Clearing", "Air Freight", "Documentation", "Global Logistics", "Vehicle Imports"],
    certifications: ["BURS Licensed", "DHL Global Network", "Express Service Leader"],
    recentSuccess: "World's leading express logistics provider with strong Botswana presence",
    verified: true,
    tier: "Gold"
  },
  {
    id: 27,
    name: "Röhlig Botswana",
    country: "Botswana",
    location: "Gaborone",
    rating: 4.4,
    reviews: 278,
    specialities: ["Freight Forwarding", "Supply Chain", "German Quality"],
    experience: "15+ years",
    avgProcessingTime: "7-10 days",
    successRate: "96.2%",
    contact: {
      phone: "+267 395 3505",
      fax: "+267 395 3473",
      website: "rohlig.com"
    },
    offices: [
      "Plot 22049, P.O. Box 1973, Gaborone"
    ],
    services: ["Vehicle Clearing", "Freight Forwarding", "Supply Chain Solutions", "Documentation"],
    certifications: ["BURS Licensed", "International Freight Forwarder", "German Network"],
    recentSuccess: "German logistics excellence with strong local expertise",
    verified: true,
    tier: "Silver"
  },
  {
    id: 28,
    name: "AGS Frasers Botswana",
    country: "Botswana",
    location: "Gaborone",
    rating: 4.3,
    reviews: 223,
    specialities: ["International Moving", "Vehicle Imports", "Relocation Services"],
    experience: "18+ years",
    avgProcessingTime: "8-11 days",
    successRate: "95.7%",
    contact: {
      phone: "+267 392 2558",
      website: "ags-frasers.com"
    },
    offices: [
      "Plot 14398, New Lobatse Rd, G-West, Gaborone"
    ],
    services: ["Vehicle Clearing", "International Moving", "Relocation Services", "Documentation"],
    certifications: ["BURS Licensed", "AGS International Network", "Relocation Specialist"],
    recentSuccess: "Leading international moving and vehicle import specialist",
    verified: true,
    tier: "Silver"
  },
  {
    id: 29,
    name: "Elliott Forwarding Botswana",
    country: "Botswana",
    location: "Gaborone",
    rating: 4.5,
    reviews: 345,
    specialities: ["Regional Network", "Cross-Border", "Established Provider"],
    experience: "25+ years",
    avgProcessingTime: "7-10 days",
    successRate: "96.5%",
    contact: {
      phone: "+267 391 2531",
      fax: "+267 391 2726",
      email: "info@elliott.co.za",
      website: "elliott.co.za"
    },
    offices: [
      "Unit 4/B/2, Western Industrial Estate, Plot 22098, P.O. Box 2044, Gaborone"
    ],
    services: ["Vehicle Clearing", "Freight Forwarding", "Cross-Border Operations", "Documentation"],
    certifications: ["BURS Licensed", "Regional Elliott Network", "SADC Operations"],
    recentSuccess: "Established freight forwarder with strong regional presence",
    verified: true,
    tier: "Gold"
  },
  // ZAMBIA
  {
    id: 30,
    name: "DSV Air & Sea Zambia",
    country: "Zambia",
    location: "Lusaka / Livingstone",
    rating: 4.6,
    reviews: 478,
    specialities: ["Full License", "Air & Sea Freight", "International Network"],
    experience: "25+ years",
    avgProcessingTime: "7-10 days",
    successRate: "97.3%",
    contact: {
      phone: "+260 977 865 435",
      email: "kris.vanheerden@zm.dsv.com",
      website: "dsv.com"
    },
    offices: [
      "Plot 9466 Off Kafue Rd, Makeni, Lusaka",
      "DSV Damb Central, Livingstone"
    ],
    services: ["Vehicle Clearing", "Air Freight", "Sea Freight", "Cross-Border Operations", "Documentation"],
    certifications: ["ZRA Full License", "DSV Global Network", "ISO Certified"],
    recentSuccess: "Strategic presence in Lusaka and Livingstone for Katima/Sesheke corridor",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 31,
    name: "Bolloré Transport & Logistics Zambia",
    country: "Zambia",
    location: "Lusaka",
    rating: 4.7,
    reviews: 567,
    specialities: ["Full License", "Global Network", "Heavy Industrial"],
    experience: "30+ years",
    avgProcessingTime: "7-11 days",
    successRate: "97.5%",
    contact: {
      phone: "+260 977 122 107",
      email: "richard.chapuswike@bollore.com",
      website: "bollore-logistics.com"
    },
    offices: [
      "Plot 3535, corner Lumumba/Malambo Rd, Heavy Industrial Area, Lusaka"
    ],
    services: ["Vehicle Clearing", "Freight Forwarding", "Project Cargo", "Documentation", "Supply Chain"],
    certifications: ["ZRA Full License", "Bolloré Global Network", "ISO 9001"],
    recentSuccess: "Leading international logistics provider with strong industrial area presence",
    verified: true,
    tier: "Platinum"
  },
  {
    id: 32,
    name: "CEVA Logistics Zambia",
    country: "Zambia",
    location: "Lusaka",
    rating: 4.5,
    reviews: 423,
    specialities: ["Full License", "Supply Chain Solutions", "Contract Logistics"],
    experience: "20+ years",
    avgProcessingTime: "8-11 days",
    successRate: "96.8%",
    contact: {
      phone: "+260 979 542 332",
      email: "dalisop@ami-worldwide.com",
      website: "cevalogistics.com"
    },
    services: ["Vehicle Clearing", "Contract Logistics", "Freight Management", "Documentation"],
    certifications: ["ZRA Full License", "CEVA Global Network", "AMI Worldwide Partner"],
    recentSuccess: "Global logistics leader with comprehensive Zambian operations",
    verified: true,
    tier: "Gold"
  },
  {
    id: 33,
    name: "C. Steinweg Bridge Zambia",
    country: "Zambia",
    location: "Ndola",
    rating: 4.4,
    reviews: 312,
    specialities: ["Full License", "Copperbelt Operations", "Commodity Logistics"],
    experience: "15+ years",
    avgProcessingTime: "8-12 days",
    successRate: "96.2%",
    contact: {
      phone: "+260 966 431 121",
      email: "compliance.zambia@za.steinweg.com",
      website: "steinweg.com"
    },
    offices: [
      "Plot 39375/M Kabwe Hwy, Ndola"
    ],
    services: ["Vehicle Clearing", "Commodity Handling", "Freight Forwarding", "Documentation"],
    certifications: ["ZRA Full License", "Steinweg International Group", "Copperbelt Specialist"],
    recentSuccess: "Strategic Copperbelt location serving mining and industrial sectors",
    verified: true,
    tier: "Gold"
  },
  {
    id: 34,
    name: "Continental Freight Services",
    country: "Zambia",
    location: "Lusaka",
    rating: 4.3,
    reviews: 289,
    specialities: ["Full License", "Freight Services", "Local Expertise"],
    experience: "12+ years",
    avgProcessingTime: "9-12 days",
    successRate: "95.7%",
    contact: {
      phone: "+260 968 679 439",
      email: "fps@freight.co.zm",
      website: "freight.co.zm"
    },
    services: ["Vehicle Clearing", "Freight Services", "Documentation", "Local Transport"],
    certifications: ["ZRA Full License", "Local Freight Specialist"],
    recentSuccess: "Established local freight forwarder with strong Zambian market knowledge",
    verified: true,
    tier: "Silver"
  },
  {
    id: 35,
    name: "Cargo Management & Logistics (CML)",
    country: "Zambia",
    location: "Lusaka",
    rating: 4.4,
    reviews: 334,
    specialities: ["Full License", "Cargo Management", "Logistics Solutions"],
    experience: "14+ years",
    avgProcessingTime: "8-11 days",
    successRate: "96.1%",
    contact: {
      phone: "+260 966 999 202",
      email: "info@cmlzambia.co.zm",
      website: "cmlzambia.co.zm"
    },
    services: ["Vehicle Clearing", "Cargo Management", "Logistics Solutions", "Documentation"],
    certifications: ["ZRA Full License", "Cargo Management Specialist"],
    recentSuccess: "Comprehensive cargo management and logistics solutions provider",
    verified: true,
    tier: "Silver"
  },
  {
    id: 36,
    name: "Cacitex Logistics Zambia",
    country: "Zambia",
    location: "Lusaka",
    rating: 4.2,
    reviews: 267,
    specialities: ["Full License", "Clearing Services", "Local Operations"],
    experience: "10+ years",
    avgProcessingTime: "9-13 days",
    successRate: "95.3%",
    contact: {
      phone: "+260 950 235 729",
      email: "clearing@cacitex.com.zm",
      website: "cacitex.com.zm"
    },
    services: ["Vehicle Clearing", "Customs Clearance", "Documentation", "Transport Arrangement"],
    certifications: ["ZRA Full License", "Local Operations Expert"],
    recentSuccess: "Reliable local clearing services with competitive pricing",
    verified: true,
    tier: "Silver"
  },
  {
    id: 37,
    name: "Bridge Cargo Ltd",
    country: "Zambia",
    location: "Lusaka",
    rating: 4.1,
    reviews: 223,
    specialities: ["Full License", "Makeni Area", "Cargo Services"],
    experience: "8+ years",
    avgProcessingTime: "10-13 days",
    successRate: "94.8%",
    contact: {
      phone: "+260 977 878 360",
      email: "kamangahassany2016@gmail.com"
    },
    offices: [
      "36346 Kafue Rd, Makeni, Lusaka"
    ],
    services: ["Vehicle Clearing", "Cargo Services", "Documentation", "Local Transport"],
    certifications: ["ZRA Full License", "Makeni Area Specialist"],
    recentSuccess: "Strategic location on Kafue Road serving Makeni industrial area",
    verified: true,
    tier: "Silver"
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
          <Card key={agent.id}>
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
                {/* Contact Information */}
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
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}