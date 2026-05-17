'use client'

import { AlertTriangle, XCircle, Shield, Info, Phone } from 'lucide-react'

interface Warning {
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  solution: string
  realExample?: string
}

const criticalWarnings: Warning[] = [
  {
    title: 'Inland Transport Costs Are Extreme',
    description: 'Transport from Walvis Bay to Windhoek can cost N$4,500–N$12,500 per vehicle.',
    impact: 'high',
    solution: 'Factor 20–30% of vehicle value for inland transport. Consider buying multiple cars to share truck costs.',
    realExample: 'Honda Fit inland transport: N$8,500 for single vehicle delivery.',
  },
  {
    title: 'Storage Fees Accumulate Fast',
    description: 'Port storage charges N$500–1,000 per day after free period (usually 7 days).',
    impact: 'high',
    solution: 'Have clearing agent ready BEFORE arrival. Pre-submit all documents electronically.',
    realExample: '3 extra days cost N$2,100 in unnecessary storage fees.',
  },
  {
    title: 'ENV Levy Surprises',
    description: 'Environmental levy based on engine size can add N$3,000–8,000 unexpectedly.',
    impact: 'medium',
    solution: 'Petrol engines >1200cc and diesel >1400cc incur ENV levy. Choose smaller engines to avoid.',
    realExample: '1800cc engine added N$3,600 ENV levy (1800 × 0.05 × 40).',
  },
  {
    title: 'Auction Grade Misrepresentation',
    description: 'Auction photos may not show all damage. Grade 3.5 can have significant issues.',
    impact: 'medium',
    solution: 'Only buy Grade 4 or higher. Request detailed inspection reports and underbody photos.',
    realExample: 'Grade 3.5 Demio arrived with scratches not visible in auction photos.',
  },
  {
    title: 'Container Delays at Port',
    description: 'Containers can sit at port for 1–2 weeks due to congestion.',
    impact: 'medium',
    solution: 'Track vessel arrival and notify clearing agent 2 weeks before. Use reliable shipping lines.',
    realExample: 'MOL vessel delayed 8 days due to Walvis Bay port congestion.',
  },
  {
    title: 'Hidden Japan-Side Costs',
    description: 'Radiation inspection, re-inspection fees, and special handling can add ¥50,000+.',
    impact: 'medium',
    solution: 'Budget extra N$6,500 for unexpected Japan costs. Use experienced exporters only.',
    realExample: 'Surprise radiation re-inspection fee of ¥30,000 for 2011 model.',
  },
  {
    title: 'Commercial Registration Issues',
    description: 'Vans and pickups may require commercial registration and extra permits.',
    impact: 'low',
    solution: 'Check with NATIS before importing commercial-type vehicles. Budget for commercial plates.',
    realExample: 'Toyota Voxy required commercial permit adding 2 weeks to registration.',
  },
  {
    title: 'Tire Replacement Requirements',
    description: 'Japanese tires often don\'t meet Namibian standards, requiring immediate replacement.',
    impact: 'low',
    solution: 'Budget N$4,000–8,000 for new tires. Check tread depth in auction report.',
    realExample: 'RAV4 needed 4 new tires at N$6,800 to pass roadworthy.',
  },
]

const scamWarnings = [
  {
    type: 'Fake clearing agents',
    signs: ['Requests full payment upfront', 'No physical office', 'Uses personal bank account'],
    protection: 'Only use agents registered with Namibian Customs. Visit their office first.',
  },
  {
    type: 'Auction fraud',
    signs: ['Deals "too good to be true"', 'Pressure to pay immediately', 'No auction sheet provided'],
    protection: 'Only buy through registered Japanese exporters. Verify auction sheets.',
  },
  {
    type: 'Shipping scams',
    signs: ['Unusually cheap freight quotes', 'Unknown shipping companies', 'No Bill of Lading'],
    protection: 'Use established shipping lines only. Never pay before receiving Bill of Lading.',
  },
  {
    type: 'Documentation fraud',
    signs: ['Altered invoices', 'Missing export certificate', 'Suspicious document quality'],
    protection: 'Verify all documents with Japanese exporter directly. Use document authentication.',
  },
]

const costSavingTips = [
  'Ask your exporter about other buyers shipping to your port — splitting a 40ft container can save ~R55,500 on ocean freight',
  'Import 4 cars at once to maximize container usage and split clearing costs',
  'Choose vehicles with engines under 1200cc (petrol) or 1400cc (diesel) to avoid the ENV levy',
  'Buy Grade 4 or higher vehicles to avoid surprise repair costs',
  'Clear vehicles within 7 days to avoid storage fees',
  'Book inland transport for multiple vehicles to negotiate better rates',
  'Use auctions during Japanese Golden Week for better prices',
  'Avoid 2011 models which require radiation certificates',
]

const emergencyContacts = [
  { name: 'Namibian Customs', sub: 'Walvis Bay Port', phone: '+264 64 208 2111' },
  { name: 'NaTIS — Vehicle Registration', sub: 'Windhoek Main', phone: '+264 61 292 2110' },
  { name: 'Container Tracking', sub: 'Namport', phone: '+264 64 208 2222' },
]

function impactStyle(impact: Warning['impact']) {
  if (impact === 'high') return { border: 'border-red-500', dot: 'bg-red-500', tag: 'text-red-600', icon: XCircle }
  if (impact === 'medium') return { border: 'border-amber-500', dot: 'bg-amber-500', tag: 'text-amber-600', icon: AlertTriangle }
  return { border: 'border-blue-500', dot: 'bg-blue-500', tag: 'text-blue-600', icon: Info }
}

export default function CriticalImportWarnings() {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 03</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Critical warnings</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        What goes wrong, named.
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        Real issues that have cost importers thousands. Each one, with the solution and a real example.
      </p>

      {/* Warnings list */}
      <div className="mt-10 border border-zinc-200 rounded-2xl overflow-hidden">
        <ul className="divide-y divide-zinc-200">
          {criticalWarnings.map((warning, idx) => {
            const style = impactStyle(warning.impact)
            const Icon = style.icon
            return (
              <li key={warning.title} className={`px-6 sm:px-8 py-6 border-l-2 ${style.border}`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <Icon className={`h-4 w-4 mt-1 flex-shrink-0 ${style.tag}`} strokeWidth={1.5} />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-1">
                        Warning {String(idx + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-serif text-lg font-medium tracking-tight text-zinc-900">{warning.title}</h3>
                    </div>
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.24em] font-semibold whitespace-nowrap ${style.tag}`}>
                    {warning.impact} impact
                  </span>
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed mb-3 sm:pl-7">{warning.description}</p>
                <div className="sm:pl-7 space-y-2">
                  <div className="grid grid-cols-[100px_1fr] gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-700 font-semibold pt-0.5">Solution</p>
                    <p className="text-sm text-zinc-700">{warning.solution}</p>
                  </div>
                  {warning.realExample && (
                    <div className="grid grid-cols-[100px_1fr] gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 pt-0.5">Real case</p>
                      <p className="text-sm text-zinc-600 italic">{warning.realExample}</p>
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Scam alert */}
      <div className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
            <Shield className="h-3.5 w-3.5 text-red-600" strokeWidth={1.5} />
            <span className="text-red-600">Scam alert</span>
            <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
            <span>Protect yourself</span>
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
            Four common scams to know.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
          {scamWarnings.map((scam, idx) => (
            <div key={scam.type} className="bg-white p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-600 font-semibold mb-1">
                Scam 0{idx + 1}
              </p>
              <h4 className="font-serif text-base font-medium tracking-tight text-zinc-900">{scam.type}</h4>

              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold mt-4 mb-2">
                Warning signs
              </p>
              <ul className="space-y-1">
                {scam.signs.map((sign, sIdx) => (
                  <li key={sIdx} className="text-sm text-zinc-700 flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-red-500 flex-shrink-0" aria-hidden />
                    {sign}
                  </li>
                ))}
              </ul>

              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-700 font-semibold mt-4 mb-1">
                How to protect yourself
              </p>
              <p className="text-sm text-zinc-700 leading-relaxed">{scam.protection}</p>
            </div>
          ))}
        </div>

        <div className="px-6 sm:px-8 py-5 border-t border-zinc-200 bg-stone-50/60">
          <p className="font-serif text-base font-medium tracking-tight text-zinc-900">
            If something seems too good to be true, <span className="italic text-amber-600">it probably is.</span>
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Never send money to unverified parties. Always verify credentials and use escrow services when possible.
          </p>
        </div>
      </div>

      {/* Cost-saving strategies */}
      <div className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
            <span className="text-amber-600">Savings</span>
            <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
            <span>Proven strategies</span>
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
            Where the money actually goes.
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
          {costSavingTips.map((tip, idx) => (
            <li key={idx} className="bg-white px-6 sm:px-8 py-5 flex items-start gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold flex-shrink-0 mt-1">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-sm text-zinc-700 leading-relaxed">{tip}</p>
            </li>
          ))}
        </ul>

        <div className="px-6 sm:px-8 py-6 border-t border-zinc-200 bg-stone-50/60">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-2">
            Biggest money saver
          </p>
          <p className="font-serif text-base sm:text-lg leading-relaxed text-zinc-800">
            Asking your exporter to consolidate your shipment with other buyers heading to the same port (e.g., Walvis Bay) — splitting a 40ft container four ways — can save each importer over{' '}
            <span className="italic font-medium text-amber-600">R75,000</span> compared to shipping a single vehicle alone. <span className="italic text-zinc-600">A 32% reduction in total import costs.</span>
          </p>
        </div>
      </div>

      {/* Emergency contacts */}
      <div className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
            <Phone className="h-3.5 w-3.5 text-amber-500" strokeWidth={1.5} />
            <span className="text-amber-600">Emergency</span>
            <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
            <span>Save these now</span>
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
            Numbers to save before you start.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200">
          {emergencyContacts.map((contact, idx) => (
            <div key={contact.name} className="bg-white p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-2">
                Nº 0{idx + 1}
              </p>
              <h4 className="font-serif text-base font-medium tracking-tight text-zinc-900">{contact.name}</h4>
              <p className="text-xs text-zinc-500 mt-1">{contact.sub}</p>
              <p className="mt-3 font-mono text-sm text-zinc-900">{contact.phone}</p>
            </div>
          ))}
        </div>

        <div className="px-6 sm:px-8 py-4 border-t border-zinc-200 bg-stone-50/60">
          <p className="text-sm text-zinc-700">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mr-2">↳ Pro tip</span>
            Save these in your phone before starting. Quick response to port issues can save thousands in storage fees.
          </p>
        </div>
      </div>
    </div>
  )
}
