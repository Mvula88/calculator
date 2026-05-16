'use client'

import { useState } from 'react'
import PortalPageNavigation from '@/components/portal/PortalPageNavigation'
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  AlertTriangle,
  BadgeCheck,
  Globe,
  ArrowUpRight,
} from 'lucide-react'

interface AgentContact {
  phone?: string
  email?: string
  whatsapp?: string
  website?: string
  fax?: string
}

interface Agent {
  id: number
  name: string
  country: string
  location: string
  rating: number
  reviews: number
  specialities: string[]
  experience: string
  avgProcessingTime: string
  successRate: string
  contact: AgentContact
  offices?: string[]
  services: string[]
  certifications: string[]
  recentSuccess: string
  testimonial?: string
  verified: boolean
  tier: string
}

const agents: Agent[] = [
  // NAMIBIA
  { id: 1, name: 'Transworld Cargo Namibia', country: 'Namibia', location: 'Windhoek / Walvis Bay / Lüderitz', rating: 4.9, reviews: 1247, specialities: ['Vehicle Imports', 'Automotive Transportation', 'ISO 9001 Certified'], experience: '39+ years', avgProcessingTime: '5-8 days', successRate: '99.5%', contact: { phone: '+264 61 371 100', email: 'info@transworldcargo.net', whatsapp: '+264 61 371 100', website: 'transworldcargo.net' }, offices: ['Head Office: 5 VON BRAUN STREET, Southern Industrial, Windhoek', 'Walvis Bay: Ben Amathila Avenue, +264 64 276 000', 'Lüderitz: 55 Hafen Street'], services: ['Vehicle Clearing', 'Container Handling', 'Storage Facilities', 'Cross-Border Transport', 'Documentation'], certifications: ['ISO 9001 Certified', 'NamRA Licensed', '39 Years Experience'], recentSuccess: 'Leading automotive transportation company with extensive network across SADC', testimonial: 'The most reliable clearing agent in Namibia. Their experience shows in every transaction.', verified: true, tier: 'Platinum' },
  { id: 2, name: 'Trade Ocean Shipping', country: 'Namibia', location: 'Walvis Bay', rating: 4.7, reviews: 523, specialities: ['Private Vehicles', 'Industrial Vehicles', 'Specialized Equipment', 'Multi-Country Operations'], experience: '15 years', avgProcessingTime: '6-9 days', successRate: '97.8%', contact: { phone: '+264 64 275 480', fax: '+264 64 275 484', email: 'infonam@tradeocean.co.za', website: 'tradeocean.co.za' }, offices: ['Namibia: 165 Rikumbi Kandanga, Walvis Bay, P.O. Box 9096', 'South Africa - Durban: Suite 404 Cowey Park, 91 Problem Mkhize (Cowey) Road, Durban, 4001'], services: ['Licensed Vehicle Clearance', 'Port Operations', 'Documentation', 'Transport Arrangement', 'Cross-Border Services'], certifications: ['NamRA Licensed', 'SADC Approved', 'Multi-Country Operations'], recentSuccess: 'Specialized in clearing industrial and specialized vehicles with operations in Namibia and South Africa', testimonial: 'Excellent cross-border clearing services between Namibia and South Africa.', verified: true, tier: 'Gold' },
  { id: 4, name: 'Manica Group Namibia', country: 'Namibia', location: 'Walvis Bay', rating: 4.8, reviews: 687, specialities: ['Freight Forwarding', 'Customs Clearing', 'Logistics Solutions'], experience: '20+ years', avgProcessingTime: '5-8 days', successRate: '98.2%', contact: { phone: '+264 64 2012911', fax: '+264 64 202530', email: 'contact@manica.com.na', website: 'manica.com' }, offices: ['2 Third Str, Walvis Bay, Namibia'], services: ['Vehicle Clearing', 'Freight Forwarding', 'Customs Brokerage', 'Supply Chain Solutions', 'Documentation'], certifications: ['NamRA Licensed', 'International Freight Forwarder', 'Customs Accredited'], recentSuccess: 'Leading freight and logistics provider with global network', testimonial: 'Professional and efficient clearing services with excellent communication.', verified: true, tier: 'Gold' },
  { id: 16, name: 'Kuehne & Nagel Namibia', country: 'Namibia', location: 'Walvis Bay', rating: 4.7, reviews: 542, specialities: ['Global Logistics', 'Supply Chain Solutions', 'Freight Forwarding'], experience: '25+ years', avgProcessingTime: '6-9 days', successRate: '97.5%', contact: { phone: '+264 64 271200', fax: '+264 64 203421', email: 'jacqueline.hebbard@kuehne-nagel.com', website: 'kuehne-nagel.com' }, services: ['Vehicle Clearing', 'Sea & Air Freight', 'Contract Logistics', 'Integrated Logistics', 'Documentation'], certifications: ['NamRA Licensed', 'Global Network', 'ISO Certified'], recentSuccess: 'Leading global logistics provider with strong local presence', verified: true, tier: 'Gold' },
  { id: 17, name: 'Maersk Namibia', country: 'Namibia', location: 'Walvis Bay', rating: 4.6, reviews: 428, specialities: ['Container Shipping', 'Logistics Solutions', 'Supply Chain Management'], experience: '30+ years', avgProcessingTime: '7-10 days', successRate: '96.8%', contact: { phone: '+264 64 273 0112', email: 'johan.van.dyk@maersk.com', website: 'maersk.com' }, services: ['Vehicle Clearing', 'Container Handling', 'Ocean Transport', 'Inland Services', 'Documentation'], certifications: ['NamRA Licensed', "World's Largest Container Shipping Line", 'ISO Certified'], recentSuccess: 'Global leader in container logistics with comprehensive Namibian operations', verified: true, tier: 'Gold' },
  { id: 18, name: 'Schenker Namibia (Pty) Ltd', country: 'Namibia', location: 'Windhoek / Walvis Bay', rating: 4.5, reviews: 396, specialities: ['DB Schenker Network', 'Air & Ocean Freight', 'Land Transport'], experience: '20+ years', avgProcessingTime: '6-9 days', successRate: '96.2%', contact: { phone: '+264 61 376 550 (Windhoek) / +264 64 277 300 (Walvis Bay)', fax: '+264 61 433 9811', email: 'info.Namibia@dbschenker.com', website: 'dbschenker.com' }, offices: ['Windhoek Office: +264 61 376 550', 'Walvis Bay Office: +264 64 277 300'], services: ['Vehicle Clearing', 'Air Freight', 'Ocean Freight', 'Land Transport', 'Contract Logistics', 'Documentation'], certifications: ['NamRA Licensed', 'Part of DB Schenker Global Network', 'ISO 9001 Certified'], recentSuccess: 'Global logistics network with strong presence in both Windhoek and Walvis Bay', verified: true, tier: 'Gold' },
  // SOUTH AFRICA
  { id: 5, name: 'Transworld Cargo South Africa', country: 'South Africa', location: 'Johannesburg / Upington', rating: 4.8, reviews: 956, specialities: ['Vehicle Imports', 'Automotive Transport', 'Cross-Border'], experience: '39+ years', avgProcessingTime: '7-10 days', successRate: '98.9%', contact: { phone: '+264 61 371 100', email: 'info@transworldcargo.net', website: 'transworldcargo.net' }, services: ['Vehicle Clearing', 'NRCS Handling', 'Transport', 'Storage', 'Documentation'], certifications: ['ISO 9001', 'SARS Accredited', 'Cross-Border Licensed'], recentSuccess: 'Strategic presence in key South African locations for vehicle imports', verified: true, tier: 'Platinum' },
  { id: 6, name: 'Durban Clearing & Forwarding', country: 'South Africa', location: 'Durban', rating: 4.6, reviews: 734, specialities: ['Motor Vehicles', 'Port Operations', 'Commercial Goods'], experience: '18 years', avgProcessingTime: '8-12 days', successRate: '96.5%', contact: { phone: '072 186 3363', email: 'info@durbanclearing.co.za', whatsapp: '082 846 2673', website: 'durbanclearing.co.za' }, services: ['Port Clearing', 'Vehicle Imports', 'Documentation', 'Transport Arrangement'], certifications: ['SARS Registered', 'Port Licensed'], recentSuccess: 'Specialized in Durban port operations with excellent track record', verified: true, tier: 'Gold' },
  { id: 19, name: 'Trade Ocean South Africa', country: 'South Africa', location: 'Durban', rating: 4.6, reviews: 412, specialities: ['Port Operations', 'Vehicle Imports', 'Cross-Border to Namibia'], experience: '15 years', avgProcessingTime: '7-10 days', successRate: '96.8%', contact: { phone: '+27 (0) 31 207 6233', email: 'operationsdbn@tradeocean.co.za', website: 'tradeocean.co.za' }, offices: ['Suite 404 Cowey Park, 91 Problem Mkhize (Cowey) Road, Durban, 4001'], services: ['Vehicle Clearing', 'Port Operations', 'Documentation', 'Cross-Border Transport to Namibia'], certifications: ['SARS Accredited', 'Durban Port Licensed', 'Cross-Border Operations'], recentSuccess: 'Specializes in vehicle imports through Durban port with direct operations to Namibia', verified: true, tier: 'Gold' },
  { id: 20, name: 'Ziegler South Africa', country: 'South Africa', location: 'Durban', rating: 4.6, reviews: 523, specialities: ['Freight Forwarding', 'Customs Clearing', 'Global Network'], experience: '25+ years', avgProcessingTime: '7-10 days', successRate: '97.2%', contact: { phone: '+27 (0) 31 700 2544', email: 'info@ziegler.co.za', website: 'ziegler.co.za' }, offices: ['151 South Coast Road, Rossburgh, Durban, 4072'], services: ['Vehicle Clearing', 'Freight Forwarding', 'Customs Brokerage', 'Port Operations', 'Documentation'], certifications: ['SARS Accredited', 'Global Logistics Network', 'ISO Certified'], recentSuccess: 'International freight forwarder with strong presence in Durban port operations', verified: true, tier: 'Gold' },
  { id: 21, name: 'DSV South Africa', country: 'South Africa', location: 'Durban', rating: 4.7, reviews: 689, specialities: ['Global Logistics', 'Air & Sea Freight', 'Supply Chain Solutions'], experience: '30+ years', avgProcessingTime: '7-11 days', successRate: '97.5%', contact: { phone: '+27 31 310 6000', email: 'za.info@za.dsv.com', website: 'dsv.com' }, offices: ['10 Quarry Park Close, Riverhorse Valley, Newlands East, 4017 Durban, KwaZulu-Natal'], services: ['Vehicle Clearing', 'Air Freight', 'Ocean Freight', 'Road Transport', 'Project Logistics', 'Documentation'], certifications: ['SARS Accredited', 'Global DSV Network', 'ISO 9001 Certified'], recentSuccess: 'Leading global transport and logistics provider with comprehensive South African operations', verified: true, tier: 'Platinum' },
  { id: 22, name: 'AVECS - Africa Vehicle Clearance Specialist', country: 'South Africa', location: 'Durban / Westville', rating: 4.8, reviews: 892, specialities: ['Vehicle Import Specialist', 'Japan Imports', 'Quick Processing'], experience: '15+ years', avgProcessingTime: '5-8 days', successRate: '98.5%', contact: { phone: '+27 31 266 0859', website: 'avecs.co.za' }, offices: ['Unit 3, 9-11 University Road, Imperial Office Park, Westville, Durban, 3631'], services: ['Specialized Vehicle Clearing', 'Japan Import Experts', 'Documentation', 'NRCS Compliance', 'Transport Arrangement'], certifications: ['SARS Accredited', 'Vehicle Import Specialist', 'Japan Trade Expert'], recentSuccess: "Africa's leading vehicle clearance specialist with expertise in Japanese imports", testimonial: 'The best in the business for Japanese vehicle imports. Fast and reliable service.', verified: true, tier: 'Platinum' },
  { id: 23, name: 'Calthol Clearing & Forwarding', country: 'South Africa', location: 'Johannesburg / Cape Town / Durban', rating: 4.5, reviews: 756, specialities: ['National Coverage', 'Multi-Port Operations', 'Established Provider'], experience: '20+ years', avgProcessingTime: '8-12 days', successRate: '96.3%', contact: { phone: '+27 11 396 1700 (JHB) / +27 21 030 0050 (CPT) / +27 31 368 2173 (DBN)', website: 'calthol.co.za' }, offices: ['Johannesburg: +27 11 396 1700', 'Cape Town: +27 21 030 0050', 'Durban: +27 31 368 2173'], services: ['Vehicle Clearing', 'National Coverage', 'All Ports of Entry', 'Documentation', 'Transport Solutions'], certifications: ['SARS Accredited', 'Multi-Port Licensed', 'National Operations'], recentSuccess: 'Established clearing and forwarding company with offices in all major South African cities', verified: true, tier: 'Gold' },
  // BOTSWANA
  { id: 24, name: 'Bolloré Logistics Botswana', country: 'Botswana', location: 'Gaborone / Kazungula / Mamuno', rating: 4.7, reviews: 567, specialities: ['Multi-Border Operations', 'International Network', 'Freight Forwarding'], experience: '25+ years', avgProcessingTime: '6-9 days', successRate: '97.3%', contact: { phone: '+267 395 1961', email: 'g.lendrum@bollore.co.bw', website: 'bollore-logistics.com' }, offices: ['Head Office: Plot 5625, Lejara Rd, Broadhurst Industrial, Gaborone', 'Kazungula/Chobe Office: +267 625 2635', 'Mamuno/Trans-Kalahari: +267 723 09605 / 728 91181'], services: ['Vehicle Clearing', 'Multi-Border Operations', 'Freight Forwarding', 'Documentation', 'Customs Brokerage'], certifications: ['BURS Licensed', 'Formerly SDV/AMI', 'Global Bolloré Network'], recentSuccess: 'Strategic presence at all major Botswana border posts with international backing', verified: true, tier: 'Platinum' },
  { id: 25, name: 'Manica Freight Services Botswana', country: 'Botswana', location: 'Gaborone / Kasane / Ngoma / Mamuno', rating: 4.6, reviews: 432, specialities: ['National Coverage', 'Cross-Border', 'Established Network'], experience: '20+ years', avgProcessingTime: '7-10 days', successRate: '96.8%', contact: { phone: '+267 391 2677', fax: '+267 391 2326', email: 'manica@info.bw', website: 'manica.com' }, offices: ['Gaborone: Plot 20741, Pharathe Crescent, Broadhurst Industrial, P.O. Box 1372', 'Kasane/Chobe: P.O. Box 226, Tel: +267 625 0070', 'Ngoma: +267 620 0050', 'Mamuno: +267 659 2013'], services: ['Vehicle Clearing', 'Kasane/Ngoma Corridor', 'Documentation', 'Cross-Border Operations'], certifications: ['BURS Licensed', 'Part of Manica Group', 'Regional Network'], recentSuccess: 'Comprehensive coverage of all major Botswana border posts', verified: true, tier: 'Gold' },
  { id: 26, name: 'DHL International Botswana', country: 'Botswana', location: 'Gaborone', rating: 4.5, reviews: 389, specialities: ['Express Services', 'Global Network', 'Air Freight'], experience: '30+ years', avgProcessingTime: '5-8 days', successRate: '97.5%', contact: { phone: '+267 391 2000 / 316 6340', fax: '+267 397 4168', email: 'enquiries@dhl.co.bw', website: 'dhl.com' }, offices: ['P.O. Box 1077, Gaborone'], services: ['Express Clearing', 'Air Freight', 'Documentation', 'Global Logistics', 'Vehicle Imports'], certifications: ['BURS Licensed', 'DHL Global Network', 'Express Service Leader'], recentSuccess: "World's leading express logistics provider with strong Botswana presence", verified: true, tier: 'Gold' },
  { id: 27, name: 'Röhlig Botswana', country: 'Botswana', location: 'Gaborone', rating: 4.4, reviews: 278, specialities: ['Freight Forwarding', 'Supply Chain', 'German Quality'], experience: '15+ years', avgProcessingTime: '7-10 days', successRate: '96.2%', contact: { phone: '+267 395 3505', fax: '+267 395 3473', website: 'rohlig.com' }, offices: ['Plot 22049, P.O. Box 1973, Gaborone'], services: ['Vehicle Clearing', 'Freight Forwarding', 'Supply Chain Solutions', 'Documentation'], certifications: ['BURS Licensed', 'International Freight Forwarder', 'German Network'], recentSuccess: 'German logistics excellence with strong local expertise', verified: true, tier: 'Silver' },
  { id: 28, name: 'AGS Frasers Botswana', country: 'Botswana', location: 'Gaborone', rating: 4.3, reviews: 223, specialities: ['International Moving', 'Vehicle Imports', 'Relocation Services'], experience: '18+ years', avgProcessingTime: '8-11 days', successRate: '95.7%', contact: { phone: '+267 392 2558', website: 'ags-frasers.com' }, offices: ['Plot 14398, New Lobatse Rd, G-West, Gaborone'], services: ['Vehicle Clearing', 'International Moving', 'Relocation Services', 'Documentation'], certifications: ['BURS Licensed', 'AGS International Network', 'Relocation Specialist'], recentSuccess: 'Leading international moving and vehicle import specialist', verified: true, tier: 'Silver' },
  { id: 29, name: 'Elliott Forwarding Botswana', country: 'Botswana', location: 'Gaborone', rating: 4.5, reviews: 345, specialities: ['Regional Network', 'Cross-Border', 'Established Provider'], experience: '25+ years', avgProcessingTime: '7-10 days', successRate: '96.5%', contact: { phone: '+267 391 2531', fax: '+267 391 2726', email: 'info@elliott.co.za', website: 'elliott.co.za' }, offices: ['Unit 4/B/2, Western Industrial Estate, Plot 22098, P.O. Box 2044, Gaborone'], services: ['Vehicle Clearing', 'Freight Forwarding', 'Cross-Border Operations', 'Documentation'], certifications: ['BURS Licensed', 'Regional Elliott Network', 'SADC Operations'], recentSuccess: 'Established freight forwarder with strong regional presence', verified: true, tier: 'Gold' },
  // ZAMBIA
  { id: 30, name: 'DSV Air & Sea Zambia', country: 'Zambia', location: 'Lusaka / Livingstone', rating: 4.6, reviews: 478, specialities: ['Full License', 'Air & Sea Freight', 'International Network'], experience: '25+ years', avgProcessingTime: '7-10 days', successRate: '97.3%', contact: { phone: '+260 977 865 435', email: 'kris.vanheerden@zm.dsv.com', website: 'dsv.com' }, offices: ['Plot 9466 Off Kafue Rd, Makeni, Lusaka', 'DSV Damb Central, Livingstone'], services: ['Vehicle Clearing', 'Air Freight', 'Sea Freight', 'Cross-Border Operations', 'Documentation'], certifications: ['ZRA Full License', 'DSV Global Network', 'ISO Certified'], recentSuccess: 'Strategic presence in Lusaka and Livingstone for Katima/Sesheke corridor', verified: true, tier: 'Platinum' },
  { id: 31, name: 'Bolloré Transport & Logistics Zambia', country: 'Zambia', location: 'Lusaka', rating: 4.7, reviews: 567, specialities: ['Full License', 'Global Network', 'Heavy Industrial'], experience: '30+ years', avgProcessingTime: '7-11 days', successRate: '97.5%', contact: { phone: '+260 977 122 107', email: 'richard.chapuswike@bollore.com', website: 'bollore-logistics.com' }, offices: ['Plot 3535, corner Lumumba/Malambo Rd, Heavy Industrial Area, Lusaka'], services: ['Vehicle Clearing', 'Freight Forwarding', 'Project Cargo', 'Documentation', 'Supply Chain'], certifications: ['ZRA Full License', 'Bolloré Global Network', 'ISO 9001'], recentSuccess: 'Leading international logistics provider with strong industrial area presence', verified: true, tier: 'Platinum' },
  { id: 32, name: 'CEVA Logistics Zambia', country: 'Zambia', location: 'Lusaka', rating: 4.5, reviews: 423, specialities: ['Full License', 'Supply Chain Solutions', 'Contract Logistics'], experience: '20+ years', avgProcessingTime: '8-11 days', successRate: '96.8%', contact: { phone: '+260 979 542 332', email: 'dalisop@ami-worldwide.com', website: 'cevalogistics.com' }, services: ['Vehicle Clearing', 'Contract Logistics', 'Freight Management', 'Documentation'], certifications: ['ZRA Full License', 'CEVA Global Network', 'AMI Worldwide Partner'], recentSuccess: 'Global logistics leader with comprehensive Zambian operations', verified: true, tier: 'Gold' },
  { id: 33, name: 'C. Steinweg Bridge Zambia', country: 'Zambia', location: 'Ndola', rating: 4.4, reviews: 312, specialities: ['Full License', 'Copperbelt Operations', 'Commodity Logistics'], experience: '15+ years', avgProcessingTime: '8-12 days', successRate: '96.2%', contact: { phone: '+260 966 431 121', email: 'compliance.zambia@za.steinweg.com', website: 'steinweg.com' }, offices: ['Plot 39375/M Kabwe Hwy, Ndola'], services: ['Vehicle Clearing', 'Commodity Handling', 'Freight Forwarding', 'Documentation'], certifications: ['ZRA Full License', 'Steinweg International Group', 'Copperbelt Specialist'], recentSuccess: 'Strategic Copperbelt location serving mining and industrial sectors', verified: true, tier: 'Gold' },
  { id: 34, name: 'Continental Freight Services', country: 'Zambia', location: 'Lusaka', rating: 4.3, reviews: 289, specialities: ['Full License', 'Freight Services', 'Local Expertise'], experience: '12+ years', avgProcessingTime: '9-12 days', successRate: '95.7%', contact: { phone: '+260 968 679 439', email: 'fps@freight.co.zm', website: 'freight.co.zm' }, services: ['Vehicle Clearing', 'Freight Services', 'Documentation', 'Local Transport'], certifications: ['ZRA Full License', 'Local Freight Specialist'], recentSuccess: 'Established local freight forwarder with strong Zambian market knowledge', verified: true, tier: 'Silver' },
  { id: 35, name: 'Cargo Management & Logistics (CML)', country: 'Zambia', location: 'Lusaka', rating: 4.4, reviews: 334, specialities: ['Full License', 'Cargo Management', 'Logistics Solutions'], experience: '14+ years', avgProcessingTime: '8-11 days', successRate: '96.1%', contact: { phone: '+260 966 999 202', email: 'info@cmlzambia.co.zm', website: 'cmlzambia.co.zm' }, services: ['Vehicle Clearing', 'Cargo Management', 'Logistics Solutions', 'Documentation'], certifications: ['ZRA Full License', 'Cargo Management Specialist'], recentSuccess: 'Comprehensive cargo management and logistics solutions provider', verified: true, tier: 'Silver' },
  { id: 36, name: 'Cacitex Logistics Zambia', country: 'Zambia', location: 'Lusaka', rating: 4.2, reviews: 267, specialities: ['Full License', 'Clearing Services', 'Local Operations'], experience: '10+ years', avgProcessingTime: '9-13 days', successRate: '95.3%', contact: { phone: '+260 950 235 729', email: 'clearing@cacitex.com.zm', website: 'cacitex.com.zm' }, services: ['Vehicle Clearing', 'Customs Clearance', 'Documentation', 'Transport Arrangement'], certifications: ['ZRA Full License', 'Local Operations Expert'], recentSuccess: 'Reliable local clearing services with competitive pricing', verified: true, tier: 'Silver' },
  { id: 37, name: 'Bridge Cargo Ltd', country: 'Zambia', location: 'Lusaka', rating: 4.1, reviews: 223, specialities: ['Full License', 'Makeni Area', 'Cargo Services'], experience: '8+ years', avgProcessingTime: '10-13 days', successRate: '94.8%', contact: { phone: '+260 977 878 360', email: 'kamangahassany2016@gmail.com' }, offices: ['36346 Kafue Rd, Makeni, Lusaka'], services: ['Vehicle Clearing', 'Cargo Services', 'Documentation', 'Local Transport'], certifications: ['ZRA Full License', 'Makeni Area Specialist'], recentSuccess: 'Strategic location on Kafue Road serving Makeni industrial area', verified: true, tier: 'Silver' },
  // MULTI-COUNTRY
  { id: 15, name: "Blackie's Consultants", country: 'Multi-Country', location: 'SA / Namibia / Botswana / Zimbabwe', rating: 4.7, reviews: 1523, specialities: ['SARS Accredited', '8-Hour Clearance', 'Multi-Country'], experience: '25+ years', avgProcessingTime: '8 hours - 2 days', successRate: '99.1%', contact: { website: 'blackiessa.com' }, services: ['Express Clearing', 'SARS Specialist', 'Multi-Country Operations', 'Same-Day Service'], certifications: ['SARS Accredited', 'Fully Licensed', 'Multi-Country Coverage'], recentSuccess: 'Reduces clearance time from 48 hours to 8 hours consistently', testimonial: 'The fastest clearing service in Southern Africa. Their 8-hour service is real!', verified: true, tier: 'Platinum' },
]

const countries = ['All', 'Namibia', 'South Africa', 'Botswana', 'Zambia', 'Multi-Country']

const getTierAccent = (tier: string) => {
  switch (tier) {
    case 'Platinum':
      return 'text-amber-700 bg-amber-50 ring-amber-200'
    case 'Gold':
      return 'text-blue-700 bg-blue-50 ring-blue-200'
    case 'Silver':
      return 'text-zinc-700 bg-zinc-100 ring-zinc-200'
    default:
      return 'text-zinc-700 bg-zinc-100 ring-zinc-200'
  }
}

const authorities = [
  {
    flag: '🇳🇦',
    name: 'Namibia Revenue Agency (NamRA)',
    code: 'NA',
    left: [
      ['Head Office', 'Town Square, Werner List Street, Windhoek'],
      ['Phone', '+264 (81) 959 4000'],
      ['Website', 'www.namra.org.na'],
      ['Customs Commissioner', '+264-61-2092259'],
      ['Email', 'Sam.SHIVUTE@namra.org.na'],
      ['Walvis Bay hours', '06:00–22:00 daily'],
      ['Namport', '+264 64 208 2111'],
      ['Walvis Bay address', 'Nr 17, Rikumbi Kandanga Rd, Walvis Bay'],
    ],
    right: [
      ['Noordoewer/Vioolsdrif', '24 hours'],
      ['Ariamsvlei/Nakop', '24 hours'],
      ['Trans Kalahari', '07:00–24:00'],
      ['Oshikango', '08:00–18:00'],
      ['Ngoma Bridge', '07:00–18:00'],
      ['Facebook', '@NamRA.org.na'],
      ['Twitter', '@NamRA_org_na'],
      ['Instagram', '@namra_org_na'],
    ],
    leftTitle: 'Head office · Walvis Bay',
    rightTitle: 'Border posts · Social',
  },
  {
    flag: '🇿🇦',
    name: 'South African Revenue Service (SARS)',
    code: 'ZA',
    left: [
      ['Head Office', 'Lehae La Sars, 299 Bronkhorst Street, Nieuw Muckleneuk, Pretoria'],
      ['Phone', '(012) 422 4000'],
      ['Website', 'www.sars.gov.za'],
      ['Toll-Free', '0800 00 7277'],
      ['International', '+27 11 602 2093'],
      ['Email', 'contactus@sars.gov.za'],
      ['Complaints', 'customscomplaints@sars.gov.za'],
    ],
    right: [
      ['Mon, Tue, Thu, Fri', '08:00–16:00'],
      ['Wednesdays', '09:00–16:00'],
      ['Weekends', 'Closed'],
      ['Note', 'All border posts use centralized contact: 0800 00 7277'],
      ['Note', 'Many major borders operate 24 hours'],
      ['Note', 'All customs queries routed through central system'],
    ],
    leftTitle: 'Head office · Customs centre',
    rightTitle: 'Working hours · Notes',
  },
  {
    flag: '🇧🇼',
    name: 'Botswana Unified Revenue Service (BURS)',
    code: 'BW',
    left: [
      ['Head Office', 'Plot 53976, Kudumatse Drive, Gaborone'],
      ['Postal', 'Private Bag 0013, Gaborone'],
      ['Phone', '+267 3638000 / 3639000'],
      ['Call Centre', '17649'],
      ['Email', 'info@burs.org.bw'],
      ['Website', 'www.burs.org.bw'],
      ['Customs Management', '+267 3639666'],
      ['Customs Email', 'callcenter@burs.org.bw'],
    ],
    right: [
      ['Francistown', '+267 2413635'],
      ['Mahalapye', '+267 4710486'],
      ['Palapye', '+267 4920388'],
      ['Ramatlabama', '06:00–22:00'],
      ['Kazungula Ferry', '06:00–18:30, +267 625 0420'],
      ['Kasane', '+267 6250420'],
      ['Matsiloje', '+267 248 3275'],
    ],
    leftTitle: 'Head office · Customs',
    rightTitle: 'Regional · Border posts',
  },
  {
    flag: '🇿🇲',
    name: 'Zambia Revenue Authority (ZRA)',
    code: 'ZM',
    left: [
      ['Head Office', 'Revenue House, Plot 1704, Kalambo Road, Lusaka'],
      ['P.O. Box', '35710'],
      ['Phone', '+260 211 382831 / 382819'],
      ['Email', 'zraic@zra.org.zm'],
      ['Website', 'www.zra.org.zm'],
      ['WhatsApp', '096 0081111'],
      ['Portal', 'portal.zra.org.zm'],
    ],
    right: [
      ['Chirundu', 'Major crossing with Zimbabwe'],
      ['Kasumbalesa', '24-hour crossing with DRC'],
      ['Nakonde', 'Tanzania border (06:00–18:00)'],
      ['Kazungula', 'Botswana crossing'],
      ['Mwami', 'Malawi border'],
      ['Kitwe', 'ECL Mall, Copperbelt'],
      ['Lusaka', 'Multiple locations'],
    ],
    leftTitle: 'Head office · Digital',
    rightTitle: 'Border posts · Service centers',
  },
]

const disclaimerNotes = [
  'All agents listed are licensed and registered with respective authorities',
  'Prices may vary based on vehicle type, complexity, and current regulations',
  'Always verify current licensing status before engaging services',
  'Exchange rates and fees are subject to change',
  'Contact details current as of 2024 — verify before use',
]

export default function AgentsContent() {
  const [selectedCountry, setSelectedCountry] = useState('All')
  const filteredAgents =
    selectedCountry === 'All' ? agents : agents.filter((a) => a.country === selectedCountry)

  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-zinc-200">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-600 font-semibold">
              Verified agents
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Comprehensive listing
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-[1.05]">
            Clearing agents
            <span className="block italic font-light text-amber-600 pl-6 sm:pl-10">directory.</span>
          </h1>
          <div className="mt-4 flex items-start gap-2.5 max-w-2xl">
            <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
            <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
              Reputable, licensed clearing agents across Namibia, South Africa, Botswana, and Zambia.
              All registered with their respective customs authorities.
            </p>
          </div>
        </div>

        {/* COUNTRY FILTER */}
        <section className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
            Filter by country
          </p>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => {
              const isActive = selectedCountry === country
              const count =
                country === 'All' ? agents.length : agents.filter((a) => a.country === country).length
              return (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`group inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-zinc-900 font-semibold shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(251,191,36,0.5)]'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 font-medium'
                  }`}
                >
                  {country}
                  <span
                    className={`font-mono text-[10px] tracking-[0.18em] ${
                      isActive ? 'text-zinc-700' : 'text-zinc-400'
                    }`}
                  >
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>
          {selectedCountry !== 'All' && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Showing {String(filteredAgents.length).padStart(2, '0')} agent
              {filteredAgents.length !== 1 ? 's' : ''} · {selectedCountry}
            </p>
          )}
        </section>

        {/* AGENT LISTINGS */}
        <section className="mb-12 space-y-6">
          {filteredAgents.length === 0 ? (
            <div className="border border-zinc-200 rounded-2xl bg-stone-50/60 p-12 text-center">
              <AlertTriangle className="h-7 w-7 text-amber-600 mx-auto mb-3" strokeWidth={1.75} />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mb-2">
                [ No agents ]
              </p>
              <p className="text-sm text-zinc-600">
                No clearing agents found for {selectedCountry}. Try selecting a different country.
              </p>
            </div>
          ) : (
            filteredAgents.map((agent, idx) => (
              <article
                key={agent.id}
                className="border border-zinc-200 rounded-2xl bg-white overflow-hidden"
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 sm:px-8 pt-5 pb-3 border-b border-zinc-200">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ${getTierAccent(agent.tier)}`}
                    >
                      {agent.verified && <BadgeCheck className="h-3 w-3" strokeWidth={2} />}
                      {agent.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(agent.rating)
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-zinc-200'
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      {agent.rating} · {agent.reviews} reviews
                    </span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_18rem] gap-x-8 gap-y-6 px-6 sm:px-8 py-6">
                  {/* Main column */}
                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-zinc-900">{agent.name}</h3>

                    <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-start gap-2 text-zinc-600">
                        <Globe className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                        <span>{agent.country}</span>
                      </div>
                      <div className="flex items-start gap-2 text-zinc-600">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                        <span>{agent.location}</span>
                      </div>
                      <div className="flex items-start gap-2 text-zinc-600">
                        <Clock className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                        <span>{agent.experience}</span>
                      </div>
                    </div>

                    {/* Specialities pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {agent.specialities.map((s) => (
                        <span
                          key={s}
                          className="text-xs text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-5 grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-lg overflow-hidden max-w-md">
                      <div className="bg-white px-4 py-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                          Success rate
                        </p>
                        <p className="mt-1 text-sm font-medium text-emerald-700">{agent.successRate}</p>
                      </div>
                      <div className="bg-white px-4 py-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                          Processing
                        </p>
                        <p className="mt-1 text-sm font-medium text-zinc-900">{agent.avgProcessingTime}</p>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                        Services
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {agent.services.map((s) => (
                          <span
                            key={s}
                            className="text-xs text-zinc-700 bg-stone-50 border border-zinc-200 px-2 py-1 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Offices */}
                    {agent.offices && (
                      <div className="mt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                          Office locations
                        </p>
                        <ul className="space-y-1">
                          {agent.offices.map((o, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-700">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                              <span className="leading-relaxed">{o}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Track record */}
                    <div className="mt-5 border-t border-b border-zinc-200 py-4 flex items-start gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 font-semibold mt-0.5 whitespace-nowrap">
                        [ Track record ]
                      </span>
                      <p className="text-sm text-zinc-700 leading-relaxed">{agent.recentSuccess}</p>
                    </div>

                    {/* Testimonial */}
                    {agent.testimonial && (
                      <div className="mt-4 flex items-start gap-3">
                        <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
                        <p className="text-sm text-zinc-600 leading-snug italic font-light max-w-xl">
                          "{agent.testimonial}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right column — contact & actions */}
                  <aside className="bg-stone-50/60 border border-zinc-200 rounded-xl p-5 self-start space-y-5">
                    {/* Contact */}
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 pb-2 mb-3 border-b border-zinc-200">
                        Contact
                      </p>
                      <div className="space-y-2 text-xs">
                        {agent.contact.phone && (
                          <a
                            href={`tel:${agent.contact.phone}`}
                            className="flex items-start gap-2 text-zinc-700 hover:text-amber-700 transition-colors break-all"
                          >
                            <Phone className="h-3 w-3 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                            <span>{agent.contact.phone}</span>
                          </a>
                        )}
                        {agent.contact.email && (
                          <a
                            href={`mailto:${agent.contact.email}`}
                            className="flex items-start gap-2 text-zinc-700 hover:text-amber-700 transition-colors break-all"
                          >
                            <Mail className="h-3 w-3 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                            <span>{agent.contact.email}</span>
                          </a>
                        )}
                        {agent.contact.whatsapp && (
                          <a
                            href={`https://wa.me/${agent.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-zinc-700 hover:text-amber-700 transition-colors"
                          >
                            <MessageCircle
                              className="h-3 w-3 mt-0.5 flex-shrink-0 text-emerald-600"
                              strokeWidth={1.75}
                            />
                            <span>WhatsApp · {agent.contact.whatsapp}</span>
                          </a>
                        )}
                        {agent.contact.website && (
                          <a
                            href={`https://${agent.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-zinc-700 hover:text-amber-700 transition-colors break-all"
                          >
                            <Globe className="h-3 w-3 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                            <span>{agent.contact.website}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 pb-2 mb-3 border-b border-zinc-200">
                        Certifications
                      </p>
                      <ul className="space-y-1.5">
                        {agent.certifications.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-xs text-zinc-700">
                            <CheckCircle2
                              className="h-3 w-3 mt-0.5 flex-shrink-0 text-emerald-600"
                              strokeWidth={1.75}
                            />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2 pt-2">
                      {agent.contact.phone && (
                        <a
                          href={`tel:${agent.contact.phone}`}
                          className="group w-full inline-flex h-11 items-center justify-center gap-2 px-4 rounded-full bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Call agent
                        </a>
                      )}
                      {agent.contact.website && (
                        <a
                          href={`https://${agent.contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group w-full inline-flex h-11 items-center justify-center gap-2 px-4 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-sm font-medium text-zinc-900 transition-colors"
                        >
                          Visit website
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                    </div>
                  </aside>
                </div>
              </article>
            ))
          )}
        </section>

        {/* CUSTOMS AUTHORITIES */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
              Regulatory
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
              Customs &amp; revenue authorities.
            </h2>
          </div>

          <div className="space-y-6">
            {authorities.map((a) => (
              <div key={a.code} className="border border-zinc-200 rounded-2xl bg-white overflow-hidden">
                <div className="flex items-center justify-between px-6 sm:px-8 pt-5 pb-3 border-b border-zinc-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{a.flag}</span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                        {a.code}
                      </p>
                      <h3 className="text-base font-medium text-zinc-900">{a.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-px bg-zinc-200">
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                      {a.leftTitle}
                    </p>
                    <dl className="space-y-2 text-sm">
                      {a.left.map(([k, v], i) => (
                        <div key={i} className="grid grid-cols-[6rem_1fr] gap-3">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 pt-0.5">
                            {k}
                          </dt>
                          <dd className="text-zinc-800 break-all">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                      {a.rightTitle}
                    </p>
                    <dl className="space-y-2 text-sm">
                      {a.right.map(([k, v], i) => (
                        <div key={i} className="grid grid-cols-[8rem_1fr] gap-3">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 pt-0.5">
                            {k}
                          </dt>
                          <dd className="text-zinc-800 break-all">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="mb-12 border-t border-b border-zinc-200 py-6">
          <div className="flex items-start gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-1 whitespace-nowrap">
              [ Disclaimer ]
            </span>
            <ul className="space-y-2 flex-1 max-w-3xl">
              {disclaimerNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <span className="mt-2 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
            <span>All external links open in new tabs</span>
          </div>
        </section>
      </div>

      <PortalPageNavigation currentPath="/portal/agents" />
    </main>
  )
}
