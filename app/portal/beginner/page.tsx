'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import LastUpdated from '@/components/portal/LastUpdated'
import SupportContact from '@/components/portal/SupportContact'
import PortalPageNavigation from '@/components/portal/PortalPageNavigation'
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Star,
  Calculator,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

const essentialTerms = [
  { term: 'FOB Price', definition: "Free On Board — the car's price in Japan up to loading on ship" },
  { term: 'CIF Value', definition: 'Cost, Insurance & Freight — car price + shipping + insurance to destination' },
  { term: 'ICD', definition: 'Import Customs Duty — main import tax (25% in Namibia)' },
  { term: 'ENV Levy', definition: 'Environmental levy on vehicle imports' },
  { term: 'VAT', definition: 'Value Added Tax on imported goods (15–16%)' },
  { term: 'Clearing Agent', definition: 'Licensed professional handling customs processes' },
  { term: 'Bill of Lading (B/L)', definition: 'Key shipping document and proof of shipment/ownership' },
  { term: 'Landed Cost', definition: 'Total cost to get the car out of port, before registration' },
  { term: 'Consignee', definition: 'Person/entity receiving the imported vehicle' },
  { term: 'Demurrage', definition: 'Daily charges if cargo stays too long at port after free days' },
]

const extendedTermGroups = [
  {
    title: 'Auction & Vehicle Report (Japan)',
    terms: [
      { term: 'Auction Sheet', definition: 'One-page vehicle report used in Japanese auctions' },
      { term: 'Overall Grade (R/RA/0–6)', definition: 'Quick condition score (e.g., 3.5 = average used; R/RA = repaired/accident history)' },
      { term: 'Interior/Exterior Grade (A–D)', definition: 'Cabin/body condition letters' },
      { term: 'Panel Map', definition: 'Diagram with codes for damage (A = scratch, U = dent, W = wave, X = replace, S = rust)' },
      { term: 'Chassis/Model Code', definition: 'e.g., DBA-GK4 (Fit) — unique to each variant' },
      { term: 'Odometer (km)', definition: 'Mileage reading — note if "rewound/unknown" is flagged' },
      { term: 'Reserve Price', definition: 'Minimum the seller will accept' },
      { term: 'Hammer Price', definition: 'Winning auction price in Japan' },
    ],
  },
  {
    title: 'Purchase & Incoterms',
    terms: [
      { term: 'Invoice / Pro-forma Invoice', definition: 'Cost breakdown before/after purchase' },
      { term: 'CFR/CNF', definition: 'Cost & Freight — FOB + ocean freight to destination' },
      { term: 'TT (Telegraphic Transfer)', definition: 'Bank wire payment method' },
      { term: "Buyer's Fee / Auction Fee", definition: 'Fees charged by auction/agent on top of hammer price' },
    ],
  },
  {
    title: 'Shipping & Logistics',
    terms: [
      { term: 'Ro-Ro (Roll-on/Roll-off)', definition: 'Vehicle drives on/off ship (usually cheaper)' },
      { term: 'Container (20ft/40ft/40HC)', definition: 'Car shipped in container (safer, pricier)' },
      { term: 'Consolidation / Container Share', definition: 'Sharing container with others to split costs' },
      { term: 'ETD / ETA', definition: 'Estimated Time of Departure/Arrival' },
      { term: 'Transit Time', definition: 'Sailing days from Japan to destination port' },
      { term: 'Carrier / Shipping Line', definition: 'Company transporting the cargo (ocean)' },
    ],
  },
  {
    title: 'Port & Handling (Walvis Bay / Namibia)',
    terms: [
      { term: 'THC (Terminal Handling Charge)', definition: 'Loading/unloading & terminal services' },
      { term: 'Wharfage / Port Dues', definition: 'Fees charged by port authority' },
      { term: 'Storage / Demurrage', definition: 'Daily charges if car stays too long after free days' },
      { term: 'Release Order', definition: 'Document allowing cargo pickup after clearance' },
      { term: 'Namport', definition: "Namibia's port authority at Walvis Bay" },
      { term: 'Documentation Fee', definition: 'Port/agent paperwork charges' },
    ],
  },
  {
    title: 'Customs & Taxes (Namibia)',
    terms: [
      { term: 'NamRA', definition: 'Namibia Revenue Agency (customs & tax)' },
      { term: 'HS Code', definition: 'Tariff classification number for vehicle' },
      { term: 'Customs Value', definition: 'Usually CIF value used to calculate duties & VAT' },
      { term: 'ADV (Ad Valorem)', definition: 'Percentage-based import tax' },
      { term: 'Entry / SAD 500', definition: 'Customs declaration form submitted by clearing agent' },
      { term: 'Tariff Determination', definition: 'Official ruling on duty rate if classification unclear' },
    ],
  },
  {
    title: 'Documents (Japan → Namibia)',
    terms: [
      { term: 'Export/Deregistration Certificate', definition: 'Proof car has been deregistered for export from Japan' },
      { term: 'Translation', definition: 'Official English translation of dereg certificate' },
      { term: 'Commercial Invoice', definition: "Seller's final bill to buyer" },
      { term: 'Packing List', definition: 'Itemized list (mostly for containers/parts)' },
      { term: 'Insurance Certificate', definition: 'Marine insurance policy if buying CIF' },
      { term: 'Pre-Shipment Inspection', definition: 'JEVIC/JAAI inspection certificate (if required)' },
    ],
  },
  {
    title: 'Post-Clearance & Registration',
    terms: [
      { term: 'Temporary Permit', definition: 'Permit to move vehicle before full registration' },
      { term: 'Roadworthy Test', definition: 'Inspection required by NaTIS before registration' },
      { term: 'NaTIS', definition: 'Namibia Traffic Information System (vehicle registration)' },
      { term: 'Police Clearance', definition: 'Police verification before registration' },
    ],
  },
]

const countryRules = [
  {
    country: 'Namibia',
    flag: '🇳🇦',
    code: 'NA',
    rules: [
      { text: 'Age Limit: 12 years maximum', tone: 'warn' as const, strong: true },
      { text: 'Only right-hand drive vehicles allowed', tone: 'warn' as const, strong: false },
      { text: 'Extended from 8 years in July 2022', tone: 'note' as const, strong: false },
    ],
  },
  {
    country: 'South Africa',
    flag: '🇿🇦',
    code: 'ZA',
    rules: [
      { text: 'NO general used vehicle imports', tone: 'warn' as const, strong: true },
      { text: 'Exceptions only for:', tone: 'note' as const, strong: false },
      { text: '— Returning residents (6+ months abroad)', tone: 'note' as const, strong: false },
      { text: '— Immigrants with permanent residence', tone: 'note' as const, strong: false },
      { text: '— Vintage vehicles (40+ years)', tone: 'note' as const, strong: false },
      { text: '— Special needs/racing vehicles', tone: 'note' as const, strong: false },
      { text: 'Requires ITAC permit + Letter of Authority', tone: 'warn' as const, strong: false },
    ],
  },
  {
    country: 'Botswana',
    flag: '🇧🇼',
    code: 'BW',
    rules: [
      { text: 'NO age restrictions', tone: 'ok' as const, strong: true },
      { text: 'No engine size restrictions', tone: 'ok' as const, strong: false },
      { text: 'Both left and right-hand drive allowed', tone: 'ok' as const, strong: false },
      { text: 'Simplest import rules in region', tone: 'note' as const, strong: false },
    ],
  },
  {
    country: 'Zambia',
    flag: '🇿🇲',
    code: 'ZM',
    rules: [
      { text: 'NO age restrictions', tone: 'ok' as const, strong: true },
      { text: 'Vehicles over 5 years = higher surtaxes', tone: 'warn' as const, strong: false },
      { text: 'Only right-hand drive (except emergency vehicles)', tone: 'warn' as const, strong: false },
      { text: 'Duty varies by engine capacity & age', tone: 'note' as const, strong: false },
    ],
  },
]

const vehicleExamples = [
  {
    title: '2015 Golf 7R',
    auctionPriceJPY: 'JPY 455,000',
    auctionPriceNAD: 'N$ 53,205.88',
    japanCostsJPY: 'JPY 159,640',
    japanCostsNAD: 'N$ 18,667.66',
    oceanFreightJPY: 'JPY 137,000',
    oceanFreightNAD: 'N$ 16,020.23',
    icd: 'N$ 18,784.04',
    env: 'N$ 3,960.00',
    adv: 'N$ 2,530.89',
    vat: 'N$ 12,397.46',
    total: 'N$ 125,566.16',
  },
  {
    title: '2017 Audi A3 Sportback 1.4L',
    auctionPriceJPY: 'JPY 201,000',
    auctionPriceNAD: 'N$ 23,504.14',
    japanCostsJPY: 'JPY 134,340',
    japanCostsNAD: 'N$ 15,709.18',
    oceanFreightJPY: 'JPY 137,000',
    oceanFreightNAD: 'N$ 16,020.23',
    icd: 'N$ 9,239.83',
    env: 'N$ 2,780.00',
    adv: 'N$ 414.98',
    vat: 'N$ 6,098.28',
    total: 'N$ 73,766.64',
  },
  {
    title: '2015 Audi A5 Quattro 2.0L',
    auctionPriceJPY: 'JPY 231,000',
    auctionPriceNAD: 'N$ 27,012.22',
    japanCostsJPY: 'JPY 124,440',
    japanCostsNAD: 'N$ 14,551.52',
    oceanFreightJPY: 'JPY 137,000',
    oceanFreightNAD: 'N$ 16,020.23',
    icd: 'N$ 10,862.62',
    env: 'N$ 3,960.00',
    adv: 'N$ 653.93',
    vat: 'N$ 7,169.33',
    total: 'N$ 80,229.85',
  },
  {
    title: '2012 Audi A4 Quattro 2.0L',
    auctionPriceJPY: 'JPY 200,000',
    auctionPriceNAD: 'N$ 23,387.20',
    japanCostsJPY: 'JPY 123,560',
    japanCostsNAD: 'N$ 14,448.61',
    oceanFreightJPY: 'JPY 137,000',
    oceanFreightNAD: 'N$ 16,020.23',
    icd: 'N$ 9,888.33',
    env: 'N$ 3,960.00',
    adv: 'N$ 504.46',
    vat: 'N$ 6,526.30',
    total: 'N$ 74,735.13',
  },
]

const journeySteps = [
  {
    title: 'Find & Buy Your Vehicle',
    week: 'Week 1–2',
    budget: 'Vehicle price + ±N$18,000 Japan-side fees',
    what: [
      'Agent searches auctions based on your criteria',
      'You approve vehicles to bid on',
      'Agent bids on your behalf',
      'Payment via wire transfer within ±3 days',
    ],
  },
  {
    title: 'Japan Export Process',
    week: 'Week 2–3',
    budget: 'Included in Japan-side costs',
    what: [
      'Vehicle de-registered in Japan',
      'Export certificate issued',
      'Transport from auction to port',
      'Pre-shipment inspection',
      'Japanese documents require certified translation',
    ],
  },
  {
    title: 'Ocean Shipping',
    week: '8–13 weeks',
    budget: '40ft ±N$75,000 · 20ft ±N$65,000 · Sharing ±N$18,750 per vehicle',
    what: [
      'Loading at Japanese port (Tokyo/Kobe)',
      '60–90 days ocean freight (8–13 weeks)',
      'Arrival at African port (Walvis Bay/Durban)',
      'Port handling and unloading',
    ],
    extra: {
      label: 'Save on shipping',
      text: 'Ask your exporter if other clients are shipping to your port — they often consolidate buyers into a shared 40ft container.',
    },
  },
  {
    title: 'Customs Clearance',
    week: 'Week 7–8',
    budget: '40–65% of vehicle value in taxes',
    what: [
      'Submit import documentation',
      'Customs inspection',
      'Pay all duties and taxes',
      'Get customs release',
    ],
  },
  {
    title: 'Registration & Compliance',
    week: 'Week 9–10',
    budget: '±N$1,500 to N$3,000',
    what: [
      'Police clearance',
      'Roadworthy inspection',
      'Vehicle registration',
      'License plates issued',
    ],
  },
]

const risks = [
  { label: 'Delays (Common)', desc: 'Shipping delays, port congestion, paperwork issues can add 2–4 weeks' },
  { label: 'Hidden Costs (Occasional)', desc: 'Storage fees, additional inspections, exchange rate fluctuations' },
  { label: 'Vehicle Condition Issues (Rare with good agents)', desc: 'Car not matching description, hidden damage, odometer tampering' },
  { label: 'Regulatory Changes (Very Rare)', desc: 'Import rules or duty rates change while car is in transit' },
  { label: 'Documentation Problems', desc: 'Missing or incorrect paperwork can delay clearance significantly' },
]

const howWeHelp = [
  'Verified agents reduce condition and documentation issues',
  'Accurate calculators prevent budget surprises',
  'Step-by-step guides avoid common mistakes',
  'Real examples show realistic timelines',
  'Document checklists ensure nothing is missed',
]

const avoidanceTips = [
  'Always budget 15% extra for unexpected costs',
  'Tell people to expect 10–12 weeks minimum',
  'Use Grade 4+ vehicles for fewer surprises',
  'Work with established agents only',
]

const timelineStages = [
  { label: 'Japan Documentation & Export', range: '7–14 days', note: 'It could take longer in some cases' },
  { label: 'Ocean Shipping (Japan to Walvis Bay)', range: '54–70 days', note: null },
  { label: 'Walvis Bay Port Processing', range: '2–10 days', note: 'Depending on congestion' },
  { label: 'Customs Clearance', range: '5–10 days', note: 'If everything is in order, but delays can extend that' },
  { label: 'Registration & Compliance', range: '5–7 days', note: 'It could take longer in some cases' },
]

const timelineScenarios = [
  {
    label: 'Best case scenario',
    range: '7–8 weeks · 51–57 days',
    desc: 'Direct shipping route, no port delays, documents ready, quick customs clearance.',
    tone: 'ok' as const,
  },
  {
    label: 'Realistic timeline',
    range: '9–10 weeks · 60–70 days',
    desc: 'Standard processing, minor port delays, average customs time.',
    note: 'Most imports fall in this range.',
    tone: 'standard' as const,
  },
  {
    label: 'Extended timeline',
    range: '11–13 weeks · 75–90 days',
    desc: 'Delays from documentation issues, port congestion, or extended customs inspections.',
    tone: 'warn' as const,
  },
  {
    label: 'Extended timeline (worst)',
    range: '11–13 weeks · 75–90 days',
    desc: 'Vessel delays, port congestion, documentation issues, inspection delays.',
    tone: 'critical' as const,
  },
]

const walvisBayPerformance = [
  'Port efficiency: Container turnaround 24–48 hours',
  'Average vessel queue: 3 ships (max recorded: 7 ships)',
  'Annual capacity: 350,000 containers',
  'Free vehicle storage: 5 days (increased from 3 days)',
  'Port handles 3,000 vessels annually',
]

const timelineFactors = [
  'Missing vessel (adds 2–4 weeks for next departure)',
  'Document translation requirements (adds 2–3 days)',
  'Payment delays (each day delays clearance)',
  'Holiday periods in Japan or Namibia (adds 3–7 days)',
  'Weather delays during cyclone season (adds 3–5 days)',
]

export default function BeginnerGuidePage() {
  const [showAllTerms, setShowAllTerms] = useState(false)

  const handleCalculate = () => {
    const price = parseInt(
      (document.getElementById('simple-vehicle-price') as HTMLInputElement)?.value || '0'
    )
    const country = (document.getElementById('simple-country') as HTMLSelectElement)?.value

    if (!(price > 0)) {
      toast.error('Please enter a vehicle price')
      return
    }

    const exchangeRates = { na: 0.13, za: 0.13, bw: 0.096, zm: 0.191 }
    const japanCostsJPY = {
      biddingCharge: 11000,
      recyclingFee: 440,
      deliveryFee: 57200,
      thc: 18000,
      operationFee: 33000,
      loadingCharges: 40000,
    }
    const totalJapanCostsJPY = Object.values(japanCostsJPY).reduce((s, c) => s + c, 0)
    const oceanShippingJPY = 137000
    const clearingCosts = { na: 26255.65, za: 35000.0, bw: 18000.0, zm: 45000.0 }
    const exchangeRate = exchangeRates[country as keyof typeof exchangeRates] || 0.13
    const localPrice = price * exchangeRate
    const cif = country === 'na' ? localPrice * 1.1 : localPrice
    const dutiesRate =
      ({ na: 0.45, za: 0.5, bw: 0.45, zm: 0.55 } as Record<string, number>)[country] || 0.45
    const duties = cif * dutiesRate
    const japanFeesLocal = totalJapanCostsJPY * exchangeRate
    const shippingLocal = oceanShippingJPY * exchangeRate
    const clearingLocal = clearingCosts[country as keyof typeof clearingCosts] || 26255.65
    const registrationLocal = 3500
    const total = localPrice + japanFeesLocal + shippingLocal + duties + clearingLocal + registrationLocal
    const currency =
      ({ na: 'N$', za: 'R', bw: 'P', zm: 'K' } as Record<string, string>)[country] || 'N$'

    toast.success(
      <div className="space-y-3 w-full">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-1">Total cost estimate</p>
          <p className="text-2xl font-medium tracking-tight text-zinc-900">
            {currency}
            {Math.round(total).toLocaleString()}
          </p>
        </div>
        <div className="border-t border-zinc-200 pt-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">Cost breakdown</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600">Vehicle price</span>
              <span className="font-medium text-zinc-900">{currency}{Math.round(localPrice).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Japan-side fees</span>
              <span className="font-medium text-zinc-900">{currency}{Math.round(japanFeesLocal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Ocean shipping</span>
              <span className="font-medium text-zinc-900">{currency}{Math.round(shippingLocal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Duties & taxes</span>
              <span className="font-medium text-zinc-900">{currency}{Math.round(duties).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Clearing agent</span>
              <span className="font-medium text-zinc-900">{currency}{Math.round(clearingLocal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Registration</span>
              <span className="font-medium text-zinc-900">{currency}{Math.round(registrationLocal).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="border border-amber-200 bg-amber-50/60 rounded-lg p-2.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mb-1">
            Save {currency}{Math.round(shippingLocal * 2.5).toLocaleString()} on shipping
          </p>
          <p className="text-xs text-amber-900">
            Ask your exporter to consolidate your car with other buyers shipping to the same port —
            a shared 40ft container splits the cost. Solo shipping costs {currency}
            {Math.round(shippingLocal * 3.5).toLocaleString()}+.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          ¥1 = {currency}{exchangeRate.toFixed(3)} · Japan ¥{totalJapanCostsJPY.toLocaleString()} · Sharing ¥{oceanShippingJPY.toLocaleString()}
        </p>
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            onClick={() => {
              toast.dismiss()
              window.location.href = '/portal/calculator'
            }}
            className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full"
          >
            Advanced calculator
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast.dismiss()} className="rounded-full">
            Close
          </Button>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold">
          Pro tip — Budget 10–15% extra for unexpected costs
        </p>
      </div>,
      { duration: 30000, closeButton: true }
    )
  }

  return (
    <div className="bg-white">
      {/* PAGE HEADER */}
      <div className="mb-12 pb-8 border-b border-zinc-200">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-600 font-semibold">
            Beginner journey
          </p>
          <LastUpdated date="October 2025" note="All current" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-[1.05]">
          Complete import journey
          <span className="block italic font-light text-amber-600 pl-6 sm:pl-10">&amp; tools.</span>
        </h1>
        <div className="mt-4 flex items-start gap-2.5 max-w-xl">
          <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
          <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
            Everything you need to know about importing, from start to finish.
          </p>
        </div>
      </div>

      {/* SUPPORT */}
      <div className="mb-12">
        <SupportContact />
      </div>

      {/* IMPORT TERMS GLOSSARY */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
            Glossary
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
            Import terms dictionary.
          </h2>
          <p className="mt-2 text-sm text-zinc-600">Essential terminology, organised by category.</p>
        </div>

        {/* Essential Terms */}
        <div>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5">
            <span className="text-zinc-500">Essential terms</span>
            <span className="text-amber-600">{String(essentialTerms.length).padStart(2, '0')}</span>
          </div>
          <div className="divide-y divide-zinc-200/80">
            {essentialTerms.map((item, i) => (
              <div
                key={item.term}
                className="grid sm:grid-cols-[3rem_12rem_1fr] gap-x-6 gap-y-1 py-4 items-baseline"
              >
                <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-medium text-zinc-900 text-sm">{item.term}</h4>
                <p className="text-sm text-zinc-600 leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extended Terms */}
        {showAllTerms && (
          <div className="mt-10 space-y-10 pt-10 border-t border-zinc-200">
            {extendedTermGroups.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                  {group.title}
                </p>
                <div className="divide-y divide-zinc-200/80">
                  {group.terms.map((item, i) => (
                    <div
                      key={item.term}
                      className="grid sm:grid-cols-[3rem_14rem_1fr] gap-x-6 gap-y-1 py-3 items-baseline"
                    >
                      <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h4 className="font-medium text-zinc-900 text-sm">{item.term}</h4>
                      <p className="text-sm text-zinc-600 leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toggle */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowAllTerms(!showAllTerms)}
            className="h-11 px-6 rounded-full border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-sm font-medium text-zinc-900"
          >
            {showAllTerms ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" strokeWidth={1.75} />
                Show less terms
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" strokeWidth={1.75} />
                See more terms (60+ additional)
              </>
            )}
          </Button>
        </div>
      </section>

      {/* COUNTRY RESTRICTIONS */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="flex items-start gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold mt-1">
              [ Restrictions ]
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
                Country import restrictions.
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                Each country has strict rules — wrong vehicle age can mean total loss.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
          {countryRules.map((c) => (
            <div key={c.country} className="bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      {c.code}
                    </p>
                    <h3 className="text-lg font-medium tracking-tight text-zinc-900">{c.country}</h3>
                  </div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {c.rules.map((rule, idx) => {
                  const Icon =
                    rule.tone === 'ok' ? CheckCircle2 : rule.tone === 'warn' ? AlertTriangle : null
                  const iconColor =
                    rule.tone === 'ok'
                      ? 'text-emerald-600'
                      : rule.tone === 'warn'
                        ? 'text-red-500'
                        : 'text-zinc-300'
                  const textClass = rule.strong
                    ? rule.tone === 'ok'
                      ? 'text-emerald-700 font-semibold'
                      : rule.tone === 'warn'
                        ? 'text-zinc-900 font-semibold'
                        : 'text-zinc-700 font-medium'
                    : 'text-zinc-700'
                  return (
                    <li key={idx} className="flex items-start gap-2.5">
                      {Icon ? (
                        <Icon
                          className={`h-4 w-4 mt-0.5 flex-shrink-0 ${iconColor}`}
                          strokeWidth={1.75}
                        />
                      ) : (
                        <span className="mt-2 h-1 w-1 rounded-full bg-zinc-300 flex-shrink-0" aria-hidden />
                      )}
                      <span className={`text-sm leading-snug ${textClass}`}>{rule.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-b border-zinc-200 py-5 flex items-start gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold mt-0.5">
            [ Insight ]
          </span>
          <p className="text-sm text-zinc-700 leading-relaxed max-w-3xl">
            Botswana offers the most flexibility, while South Africa has the strictest rules.
            Namibia's 12-year limit makes newer vehicles more viable for long-term value.
          </p>
        </div>
      </section>

      {/* REAL EXAMPLES */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
            Case studies
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
            Real vehicle imports.
          </h2>
          <p className="mt-2 text-sm text-zinc-600">Actual costs and full breakdown from delivered imports.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
          {vehicleExamples.map((v, i) => (
            <div key={v.title} className="bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  Example {String(i + 1).padStart(2, '0')}
                </p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-medium tracking-tight text-zinc-900 mb-4">{v.title}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-zinc-600">Japan auction price</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">{v.auctionPriceJPY}</p>
                  </div>
                  <p className="font-medium text-zinc-900 whitespace-nowrap">{v.auctionPriceNAD}</p>
                </div>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-zinc-600">Japan-side costs</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">{v.japanCostsJPY}</p>
                  </div>
                  <p className="font-medium text-zinc-900 whitespace-nowrap">{v.japanCostsNAD}</p>
                </div>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-zinc-600">Ocean freight</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">{v.oceanFreightJPY}</p>
                  </div>
                  <p className="font-medium text-zinc-900 whitespace-nowrap">{v.oceanFreightNAD}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-200 pt-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                  Customs duties & taxes
                </p>
                <ul className="space-y-1 text-sm pl-4">
                  <li className="flex justify-between"><span className="text-zinc-600">ICD</span><span className="font-medium text-zinc-900">{v.icd}</span></li>
                  <li className="flex justify-between"><span className="text-zinc-600">ENV</span><span className="font-medium text-zinc-900">{v.env}</span></li>
                  <li className="flex justify-between"><span className="text-zinc-600">ADV</span><span className="font-medium text-zinc-900">{v.adv}</span></li>
                  <li className="flex justify-between"><span className="text-zinc-600">VAT</span><span className="font-medium text-zinc-900">{v.vat}</span></li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-500/40 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
                  Total landed
                </span>
                <span className="text-lg font-medium tracking-tight bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                  {v.total}
                </span>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                Timeline · 6–12 weeks total
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPORT JOURNEY */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
            Process
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
            The complete import journey.
          </h2>
        </div>

        <div className="divide-y divide-zinc-200/80 border-y border-zinc-200/80">
          {journeySteps.map((step, i) => (
            <article
              key={step.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 sm:py-10"
            >
              <div className="md:col-span-2">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-600 font-semibold">
                  Step {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  {step.week}
                </p>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-zinc-900 leading-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-amber-700">↳ Budget — {step.budget}</p>

                <div className="mt-4 border border-zinc-200 rounded-xl bg-stone-50/60 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-3">
                    What happens
                  </p>
                  <ul className="space-y-2">
                    {step.what.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                        <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-5 flex-shrink-0 pt-1">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ul>
                  {step.extra && (
                    <p className="mt-4 pt-3 border-t border-zinc-200 text-sm text-emerald-700">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold mr-1.5">
                        [ {step.extra.label} ]
                      </span>
                      {step.extra.text}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Container sharing deep dive */}
        <div className="mt-8 border border-zinc-200 rounded-2xl bg-stone-50/60 p-6 sm:p-8">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-4">
            <span className="text-amber-600 font-semibold">Container sharing</span>
            <span className="text-zinc-500">How it works</span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {[
              '40ft container fits 4–5 cars',
              'Total cost: N$75,000',
              'Split 4 ways = N$18,750 each',
              'Save N$40,000 vs solo shipping',
            ].map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-5 flex-shrink-0 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* QUICK CALCULATOR */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
            Quick estimate
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
            Total cost estimator.
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Rough total cost including all fees. For precise calculations, use the advanced calculator.
          </p>
        </div>

        <div className="border border-zinc-200 rounded-2xl bg-white p-6 sm:p-8 max-w-2xl">
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="simple-vehicle-price"
                className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
              >
                Vehicle purchase price (¥ JPY)
              </label>
              <input
                type="number"
                id="simple-vehicle-price"
                className="w-full h-12 px-4 text-base border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                placeholder="e.g., 800000 for ¥800,000"
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                Typical range · ¥500,000 — ¥2,000,000
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="simple-country"
                className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold"
              >
                Your country
              </label>
              <select
                id="simple-country"
                className="w-full h-12 px-4 text-base border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
              >
                <option value="na">Namibia</option>
                <option value="za">South Africa</option>
                <option value="bw">Botswana</option>
                <option value="zm">Zambia</option>
              </select>
            </div>

            <Button
              onClick={handleCalculate}
              className="group w-full h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors"
            >
              <Calculator className="mr-2 h-4 w-4" strokeWidth={1.75} />
              Calculate total landed cost
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>

            <div className="flex items-start gap-3 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-0.5">
                [ Pro tip ]
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Always budget 10–15% extra for unexpected costs like storage fees, exchange rate
                changes, or delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RISKS & REALITY */}
      <section className="mb-16">
        <div className="mb-8 flex items-start gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-1">
            [ Reality check ]
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
              Risks &amp; reality.
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Importing isn't risk-free. Here's what can happen.
            </p>
          </div>
        </div>

        <div className="border-y border-zinc-200 divide-y divide-zinc-200/80">
          {risks.map((r, i) => (
            <div key={r.label} className="grid sm:grid-cols-[4rem_1fr] gap-x-6 py-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pt-0.5">
                R.{String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-900">{r.label}</p>
                <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="bg-white p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 font-semibold border-b border-zinc-200 pb-2.5 mb-3">
              How we help
            </p>
            <ul className="space-y-2.5">
              {howWeHelp.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600 flex-shrink-0" strokeWidth={1.75} />
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold border-b border-zinc-200 pb-2.5 mb-3">
              Avoidance tips
            </p>
            <ul className="space-y-2.5">
              {avoidanceTips.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] pt-1.5 w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
            Timeline
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
            Realistic timeline for Walvis Bay.
          </h2>
        </div>

        {/* Breakdown by stage */}
        <div className="border border-zinc-200 rounded-2xl bg-stone-50/60 p-6 sm:p-8 mb-10">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-4">
            <span className="text-zinc-500">Breakdown by stage</span>
            <span className="text-amber-600">05 stages</span>
          </div>
          <ul className="divide-y divide-zinc-200/80">
            {timelineStages.map((s, i) => (
              <li key={s.label} className="grid grid-cols-[3rem_1fr_auto] gap-x-4 py-3 items-start">
                <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] pt-1.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm text-zinc-900">{s.label}</p>
                  {s.note && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">{s.note}</p>}
                </div>
                <span className="text-sm font-medium text-zinc-900 whitespace-nowrap">{s.range}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scenarios */}
        <div className="divide-y divide-zinc-200/80 border-y border-zinc-200/80">
          {timelineScenarios.map((s, i) => {
            const accent =
              s.tone === 'ok'
                ? 'text-emerald-700'
                : s.tone === 'warn'
                  ? 'text-amber-700'
                  : s.tone === 'critical'
                    ? 'text-red-600'
                    : 'text-amber-600'
            return (
              <article key={i} className="grid sm:grid-cols-12 gap-4 sm:gap-8 py-6">
                <div className="sm:col-span-2">
                  <p className={`font-mono text-xs uppercase tracking-[0.22em] font-semibold ${accent}`}>
                    Phase {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
                <div className="sm:col-span-3">
                  <p className="text-base font-medium text-zinc-900">{s.label}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{s.range}</p>
                </div>
                <div className="sm:col-span-7">
                  <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">{s.desc}</p>
                  {s.note && (
                    <p className="mt-2 text-sm font-medium text-emerald-700">↳ {s.note}</p>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {/* Walvis Bay performance + factors */}
        <div className="mt-10 grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="bg-white p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold border-b border-zinc-200 pb-2.5 mb-3">
              Walvis Bay performance
            </p>
            <ul className="space-y-2.5">
              {walvisBayPerformance.map((line, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] pt-1.5 w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold border-b border-zinc-200 pb-2.5 mb-3">
              Factors that add time
            </p>
            <ul className="space-y-2.5">
              {timelineFactors.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-amber-600 flex-shrink-0" strokeWidth={1.75} />
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pro tip footnote */}
        <div className="mt-6 border-t border-b border-zinc-200 py-5 flex items-start gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 font-semibold mt-0.5">
            [ Pro tip ]
          </span>
          <p className="text-sm text-zinc-700 leading-relaxed max-w-3xl">
            Tell clients to expect <span className="font-semibold text-zinc-900">9–10 weeks</span>{' '}
            as standard. This matches actual data and allows buffer for minor delays. Walvis Bay is
            relatively efficient with minimal congestion compared to major global ports.
          </p>
        </div>
      </section>

      {/* PAGE NAVIGATION */}
      <PortalPageNavigation currentPath="/portal/beginner" />
    </div>
  )
}
