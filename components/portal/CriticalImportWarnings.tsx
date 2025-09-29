'use client'

import { AlertTriangle, XCircle, Shield, Info, DollarSign, Clock, FileWarning, Users } from 'lucide-react'

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
    description: 'Transport from Walvis Bay to Windhoek can cost N$4,500-N$12,500 per vehicle',
    impact: 'high',
    solution: 'Factor 20-30% of vehicle value for inland transport. Consider buying multiple cars to share truck costs.',
    realExample: 'Honda Fit inland transport: N$8,500 for single vehicle delivery'
  },
  {
    title: 'Storage Fees Accumulate Fast',
    description: 'Port storage charges N$500-1000 per day after free period (usually 7 days)',
    impact: 'high',
    solution: 'Have clearing agent ready BEFORE arrival. Pre-submit all documents electronically.',
    realExample: '3 extra days cost N$2,100 in unnecessary storage fees'
  },
  {
    title: 'ENV Levy Surprises',
    description: 'Environmental levy based on engine size can add N$3,000-8,000 unexpectedly',
    impact: 'medium',
    solution: 'Petrol engines >1200cc and diesel >1400cc incur ENV levy. Choose smaller engines to avoid.',
    realExample: '1800cc engine added N$3,600 ENV levy (1800 × 0.05 × 40)'
  },
  {
    title: 'Auction Grade Misrepresentation',
    description: 'Auction photos may not show all damage. Grade 3.5 can have significant issues.',
    impact: 'medium',
    solution: 'Only buy Grade 4 or higher. Request detailed inspection reports and underbody photos.',
    realExample: 'Grade 3.5 Demio arrived with scratches not visible in auction photos'
  },
  {
    title: 'Container Delays at Port',
    description: 'Containers can sit at port for 1-2 weeks due to congestion',
    impact: 'medium',
    solution: 'Track vessel arrival and notify clearing agent 2 weeks before. Use reliable shipping lines.',
    realExample: 'MOL vessel delayed 8 days due to Walvis Bay port congestion'
  },
  {
    title: 'Hidden Japan-Side Costs',
    description: 'Radiation inspection, re-inspection fees, and special handling can add ¥50,000+',
    impact: 'medium',
    solution: 'Budget extra N$6,500 for unexpected Japan costs. Use experienced exporters only.',
    realExample: 'Surprise radiation re-inspection fee of ¥30,000 for 2011 model'
  },
  {
    title: 'Commercial Registration Issues',
    description: 'Vans and pickups may require commercial registration and extra permits',
    impact: 'low',
    solution: 'Check with NATIS before importing commercial-type vehicles. Budget for commercial plates.',
    realExample: 'Toyota Voxy required commercial permit adding 2 weeks to registration'
  },
  {
    title: 'Tire Replacement Requirements',
    description: 'Japanese tires often don\'t meet Namibian standards, requiring immediate replacement',
    impact: 'low',
    solution: 'Budget N$4,000-8,000 for new tires. Check tread depth in auction report.',
    realExample: 'RAV4 needed 4 new tires at N$6,800 to pass roadworthy'
  }
]

const scamWarnings = [
  {
    type: 'Fake Clearing Agents',
    signs: ['Requests full payment upfront', 'No physical office', 'Uses personal bank account'],
    protection: 'Only use agents registered with Namibian Customs. Visit their office first.'
  },
  {
    type: 'Auction Fraud',
    signs: ['Deals "too good to be true"', 'Pressure to pay immediately', 'No auction sheet provided'],
    protection: 'Only buy through registered Japanese exporters. Verify auction sheets.'
  },
  {
    type: 'Shipping Scams',
    signs: ['Unusually cheap freight quotes', 'Unknown shipping companies', 'No Bill of Lading'],
    protection: 'Use established shipping lines only. Never pay before receiving Bill of Lading.'
  },
  {
    type: 'Documentation Fraud',
    signs: ['Altered invoices', 'Missing export certificate', 'Suspicious document quality'],
    protection: 'Verify all documents with Japanese exporter directly. Use document authentication.'
  }
]

const costSavingTips = [
  'Use ContShare.com to save R55,500 on ocean freight by sharing container space',
  'Import 4 cars at once to maximize container usage and split clearing costs',
  'Choose vehicles with engines under 1200cc (petrol) or 1400cc (diesel) to avoid ENV levy',
  'Buy Grade 4 or higher vehicles to avoid surprise repair costs',
  'Clear vehicles within 7 days to avoid storage fees',
  'Book inland transport for multiple vehicles to negotiate better rates',
  'Use auctions during Japanese Golden Week for better prices',
  'Avoid 2011 models which require radiation certificates'
]

export default function CriticalImportWarnings() {
  return (
    <div className="space-y-6">
      {/* Main Warnings Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            Critical Import Warnings
          </h2>
          <p className="text-gray-600">
            Real issues that cost importers thousands - learn from others\' mistakes
          </p>
        </div>

        <div className="space-y-4">
          {criticalWarnings.map((warning, idx) => (
            <div
              key={idx}
              className={`border-l-4 rounded-lg p-4 ${
                warning.impact === 'high'
                  ? 'border-red-500 bg-red-50'
                  : warning.impact === 'medium'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {warning.impact === 'high' && <XCircle className="h-5 w-5 text-red-600" />}
                  {warning.impact === 'medium' && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                  {warning.impact === 'low' && <Info className="h-5 w-5 text-blue-600" />}
                  {warning.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    warning.impact === 'high'
                      ? 'bg-red-100 text-red-700'
                      : warning.impact === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {warning.impact.toUpperCase()} IMPACT
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-3">{warning.description}</p>

              <div className="bg-white/70 rounded p-3 space-y-2">
                <div>
                  <p className="text-xs font-semibold text-green-700">Solution:</p>
                  <p className="text-xs text-gray-600">{warning.solution}</p>
                </div>

                {warning.realExample && (
                  <div>
                    <p className="text-xs font-semibold text-purple-700">Real Example:</p>
                    <p className="text-xs text-gray-600 italic">{warning.realExample}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scam Alert Section */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Scam Alert - Protect Yourself
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scamWarnings.map((scam, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">{scam.type}</h4>

              <div className="mb-3">
                <p className="text-xs font-medium text-gray-700 mb-1">Warning Signs:</p>
                <ul className="space-y-0.5">
                  {scam.signs.map((sign, sIdx) => (
                    <li key={sIdx} className="text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-red-500 mt-0.5">•</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-2">
                <p className="text-xs font-medium text-green-700 mb-1">How to Protect Yourself:</p>
                <p className="text-xs text-gray-600">{scam.protection}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-red-100 rounded-lg">
          <p className="text-sm font-semibold text-red-900">
            🚨 If something seems too good to be true, it probably is!
          </p>
          <p className="text-xs text-red-800 mt-1">
            Never send money to unverified parties. Always verify credentials and use escrow services when possible.
          </p>
        </div>
      </div>

      {/* Cost Saving Tips */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Proven Cost-Saving Strategies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {costSavingTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white/80 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Biggest Money Saver:</h4>
          <p className="text-sm text-gray-700">
            Combining ContShare.com container sharing with group imports (4 cars) can save each
            importer over <span className="font-bold text-green-600">R75,000</span> compared to
            importing a single vehicle alone. This represents a 32% reduction in total import costs!
          </p>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Emergency Contacts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Namibian Customs</h4>
            <p className="text-gray-600">Walvis Bay Port</p>
            <p className="text-gray-700 font-medium">+264 64 208 2111</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">NATIS (Vehicle Registration)</h4>
            <p className="text-gray-600">Windhoek Main</p>
            <p className="text-gray-700 font-medium">+264 61 292 2110</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Container Tracking</h4>
            <p className="text-gray-600">Namport</p>
            <p className="text-gray-700 font-medium">+264 64 208 2222</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-xs text-blue-900">
            <strong>Pro Tip:</strong> Save these numbers in your phone before starting the import process.
            Quick response to port issues can save thousands in storage fees.
          </p>
        </div>
      </div>
    </div>
  )
}