'use client'

import { useState } from 'react'
import { FileText, DollarSign, Calendar, AlertCircle, CheckCircle, TrendingUp, Package, Clock } from 'lucide-react'

interface ImportExample {
  id: string
  vehicle: string
  year: number
  purchasePrice: number
  totalCost: number
  timeline: string
  breakdown: {
    vehiclePrice: number
    japanCosts: number
    oceanFreight: number
    clearingCosts: number
    duties: number
    vat: number
    inland: number
  }
  lessons: string[]
  warnings: string[]
  date: string
}

const realImportExamples: ImportExample[] = [
  {
    id: 'golf-7r-2015',
    vehicle: '2015 Golf 7R',
    year: 2015,
    purchasePrice: 53206,
    totalCost: 125566,
    timeline: '6-12 weeks',
    breakdown: {
      vehiclePrice: 53206,
      japanCosts: 18668,
      oceanFreight: 16020,
      clearingCosts: 0,
      duties: 25275, // ICD + ENV + ADV
      vat: 12397,
      inland: 0
    },
    lessons: [
      'Popular performance vehicle with strong resale value',
      'Grade 4 auction rating ensured excellent condition',
      'Container sharing made shipping affordable'
    ],
    warnings: [
      'Higher ENV levy due to 2.0L turbo engine',
      'Performance parts may need import permits'
    ],
    date: 'Actual Import Example'
  },
  {
    id: 'audi-a3-2017',
    vehicle: '2017 AUDI A3 SPORTBACK 1.4L',
    year: 2017,
    purchasePrice: 23504,
    totalCost: 73767,
    timeline: '6-12 weeks',
    breakdown: {
      vehiclePrice: 23504,
      japanCosts: 15709,
      oceanFreight: 16020,
      clearingCosts: 0,
      duties: 12435, // ICD + ENV + ADV
      vat: 6098,
      inland: 0
    },
    lessons: [
      'Smaller engine (1.4L) resulted in lower ENV levy',
      'Newer model year helped with registration',
      'Compact luxury car with good fuel economy'
    ],
    warnings: [
      'Audi parts can be expensive in Namibia',
      'Service history important for warranty claims'
    ],
    date: 'Actual Import Example'
  },
  {
    id: 'audi-a5-2015',
    vehicle: '2015 AUDI A5 QUATTRO 2.0L',
    year: 2015,
    purchasePrice: 27012,
    totalCost: 80230,
    timeline: '6-12 weeks',
    breakdown: {
      vehiclePrice: 27012,
      japanCosts: 14552,
      oceanFreight: 16020,
      clearingCosts: 0,
      duties: 15477, // ICD + ENV + ADV
      vat: 7169,
      inland: 0
    },
    lessons: [
      'Quattro AWD system ideal for Namibian roads',
      'Luxury coupe with strong market demand',
      'Well-maintained examples hold value'
    ],
    warnings: [
      'Higher ENV levy for 2.0L engine',
      'AWD system requires specialized maintenance'
    ],
    date: 'Actual Import Example'
  },
  {
    id: 'audi-a4-2012',
    vehicle: '2012 AUDI A4 QUATTRO 2.0L',
    year: 2012,
    purchasePrice: 23387,
    totalCost: 74735,
    timeline: '6-12 weeks',
    breakdown: {
      vehiclePrice: 23387,
      japanCosts: 14449,
      oceanFreight: 16020,
      clearingCosts: 0,
      duties: 14353, // ICD + ENV + ADV
      vat: 6526,
      inland: 0
    },
    lessons: [
      'Older model but still within import age limit',
      'Quattro system adds value in resale market',
      'Lower purchase price offset by same shipping costs'
    ],
    warnings: [
      'Closer to age limit - import while still eligible',
      'May need suspension refresh for local roads'
    ],
    date: 'Actual Import Example'
  }
]

const documentTemplates = [
  {
    name: 'Bill of Lading',
    description: 'Proof of shipment from Japan',
    importance: 'Critical - needed for clearing',
    tip: 'Keep original, make 3 copies'
  },
  {
    name: 'Export Certificate',
    description: 'Japanese deregistration document',
    importance: 'Required for Namibian registration',
    tip: 'Must be translated if in Japanese'
  },
  {
    name: 'Invoice',
    description: 'Purchase price documentation',
    importance: 'Determines duty calculation',
    tip: 'Ensure all costs are itemized'
  },
  {
    name: 'Insurance Certificate',
    description: 'Marine insurance coverage',
    importance: 'Recommended but not mandatory',
    tip: 'Get comprehensive coverage'
  }
]

export default function RealImportExamples() {
  const [selectedExample, setSelectedExample] = useState<ImportExample>(realImportExamples[0])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          Real Import Transaction Examples
        </h2>
        <p className="text-gray-600">
          Actual vehicle imports from Japan to Namibia with complete cost breakdowns
        </p>
      </div>

      {/* Example Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Select an Import Example</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {realImportExamples.map((example) => (
            <div
              key={example.id}
              onClick={() => setSelectedExample(example)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedExample.id === example.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-semibold text-gray-900">{example.vehicle}</h4>
              <p className="text-sm text-gray-600 mt-1">Year: {example.year}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">
                N$ {example.totalCost.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Total landed cost</p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Example Details */}
      {selectedExample && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Complete Cost Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Japan Auction Price</span>
                <span className="font-bold">N$ {selectedExample.breakdown.vehiclePrice.toLocaleString()}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Japan-side Costs</span>
                  <span>N$ {selectedExample.breakdown.japanCosts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ocean Freight</span>
                  <span>N$ {selectedExample.breakdown.oceanFreight.toLocaleString()}</span>
                </div>
                {selectedExample.breakdown.clearingCosts > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Clearing Agent Fees</span>
                    <span>N$ {selectedExample.breakdown.clearingCosts.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t">
                  <p className="font-medium text-gray-700 mb-2">Custom Duties and Taxes:</p>
                  <div className="flex justify-between text-sm pl-4">
                    <span className="text-gray-600">• Total Duties (ICD + ENV + ADV)</span>
                    <span>N$ {selectedExample.breakdown.duties.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span className="text-gray-600">• Import VAT</span>
                    <span>N$ {selectedExample.breakdown.vat.toLocaleString()}</span>
                  </div>
                </div>
                {selectedExample.breakdown.inland > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Inland Transport</span>
                    <span>N$ {selectedExample.breakdown.inland.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-lg font-bold">Total Landed Cost</span>
                <span className="text-xl font-bold text-green-600">
                  N$ {selectedExample.totalCost.toLocaleString()}
                </span>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Timeline:</strong> {selectedExample.timeline} total
                </p>
                <p className="text-sm text-blue-900 mt-1">
                  <strong>Source:</strong> {selectedExample.date}
                </p>
              </div>
            </div>
          </div>

          {/* Lessons & Warnings */}
          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                What Went Well
              </h3>
              <ul className="space-y-2">
                {selectedExample.lessons.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-green-800">
                    <span className="text-green-600 mt-0.5">✓</span>
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Challenges & Warnings
              </h3>
              <ul className="space-y-2">
                {selectedExample.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="text-amber-600 mt-0.5">!</span>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Important Documents Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-600" />
          Critical Import Documents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentTemplates.map((doc, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-1">{doc.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-red-600">{doc.importance}</p>
                <p className="text-xs text-blue-600">💡 {doc.tip}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm font-semibold text-yellow-900 mb-1">Document Checklist:</p>
          <ul className="text-xs text-yellow-800 space-y-1">
            <li>✓ Keep all original documents in a safe place</li>
            <li>✓ Make multiple copies of each document</li>
            <li>✓ Translate Japanese documents before arrival</li>
            <li>✓ Email scans to your clearing agent in advance</li>
            <li>✓ Keep digital copies in cloud storage</li>
          </ul>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Typical Import Timeline
        </h3>

        <div className="relative">
          <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-blue-300"></div>

          <div className="space-y-6">
            {[
              { day: 'Day 1-3', task: 'Find & bid on vehicle at auction', status: 'bidding' },
              { day: 'Day 4-7', task: 'Payment & documentation', status: 'payment' },
              { day: 'Day 8-14', task: 'Transport to port in Japan', status: 'transport' },
              { day: 'Day 15-20', task: 'Container loading & fumigation', status: 'loading' },
              { day: 'Day 21-85', task: 'Ocean freight to Walvis Bay', status: 'shipping' },
              { day: 'Day 86-90', task: 'Clearing & final delivery', status: 'clearing' }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 relative">
                <div className="w-8 h-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-blue-600">{idx + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{step.day}</p>
                  <p className="text-sm text-gray-600">{step.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}