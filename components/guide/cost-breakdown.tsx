'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { DollarSign, AlertTriangle, Info } from 'lucide-react'

interface CostItem {
  category: string
  range: string
  notes: string
  isHidden?: boolean
  stage: string
  priority: 'critical' | 'important' | 'optional'
  paymentTiming: string
  commonDelays?: string[]
}

const costData: CostItem[] = [
  {
    category: 'Ocean freight (share)',
    range: 'N$18,000–N$35,000',
    notes: 'Varies by date/line; container vs RoRo',
    stage: 'Shipping',
    priority: 'critical',
    paymentTiming: 'At booking or before sailing',
    commonDelays: ['Container sharing partner drops out', 'Shipping line capacity issues']
  },
  {
    category: 'Port/terminal handling',
    range: 'N$4,000–N$9,000',
    notes: 'Storage/detention extra if delayed',
    stage: 'Arrival',
    priority: 'critical',
    paymentTiming: 'Before container release',
    commonDelays: ['Document errors cause storage fees', 'Port congestion']
  },
  {
    category: 'Import duty & VAT',
    range: 'N$25,000–N$65,000',
    notes: 'Depends on vehicle value and engine size',
    stage: 'Clearance',
    priority: 'critical',
    paymentTiming: 'Before customs release',
    commonDelays: ['Valuation disputes', 'HS code classification issues']
  },
  {
    category: 'Clearing agent fee',
    range: 'N$8,000–N$15,000',
    notes: 'Ask for written tariff & inclusions',
    stage: 'Clearance',
    priority: 'critical',
    paymentTiming: 'Upon completion of clearance',
    commonDelays: ['Agent overbooked', 'Document preparation delays']
  },
  {
    category: 'Unpacking materials',
    range: '~N$600',
    notes: 'Cymot straps/tools (often overlooked)',
    isHidden: true,
    stage: 'Collection',
    priority: 'important',
    paymentTiming: 'Day of collection',
    commonDelays: ['Materials not available at port']
  },
  {
    category: 'Inland transport',
    range: 'N$5,000–N$12,000',
    notes: 'Walvis → WHK/Ongwediva, per km',
    stage: 'Delivery',
    priority: 'critical',
    paymentTiming: 'Upon delivery',
    commonDelays: ['Transporter not available', 'Bad weather delays']
  },
  {
    category: 'Potential staff travel',
    range: 'Up to N$11,000',
    notes: 'Only if unpacking moved upcountry',
    isHidden: true,
    stage: 'Collection',
    priority: 'optional',
    paymentTiming: 'If location changes',
    commonDelays: ['Last-minute location changes by agent']
  },
  {
    category: 'Bank/PayPal/TT fees',
    range: 'N$500–N$3,000',
    notes: 'Depends on method',
    stage: 'Pre-Purchase',
    priority: 'important',
    paymentTiming: 'With each transfer',
    commonDelays: ['Bank processing delays', 'Foreign exchange delays']
  },
  {
    category: 'Storage/detention',
    range: 'N$200-500/day',
    notes: 'Avoid by having docs perfect + consignee cleared',
    isHidden: true,
    stage: 'Emergency',
    priority: 'optional',
    paymentTiming: 'Daily until resolved',
    commonDelays: ['Document errors', 'Consignee blocks', 'Payment delays']
  },
  {
    category: 'Registration & roadworthy',
    range: 'N$2,500–N$4,500',
    notes: 'NATIS fees vary',
    stage: 'Registration',
    priority: 'critical',
    paymentTiming: 'After delivery',
    commonDelays: ['Roadworthy test failures', 'NATIS system downtime']
  }
]

interface CostBreakdownProps {
  showTimelineIntegration?: boolean
}

export function CostBreakdown({ showTimelineIntegration = true }: CostBreakdownProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [selectedStage, setSelectedStage] = useState<string>('all')
  const [showBufferCalculator, setShowBufferCalculator] = useState(false)
  
  const toggleItem = (category: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  const calculateEstimate = () => {
    let min = 0
    let max = 0
    
    selectedItems.forEach(category => {
      const item = costData.find(c => c.category === category)
      if (item) {
        const range = item.range.replace(/[N$,]/g, '')
        const parts = range.split('–')
        if (parts.length === 2) {
          min += parseInt(parts[0]) || 0
          max += parseInt(parts[1]) || 0
        } else {
          const value = parseInt(range.replace('~', '').replace('Up to ', '')) || 0
          min += value
          max += value
        }
      }
    })
    
    return { min, max }
  }

  const stages = ['all', ...Array.from(new Set(costData.map(item => item.stage)))]
  
  const filteredCostData = selectedStage === 'all' 
    ? costData 
    : costData.filter(item => item.stage === selectedStage)

  const estimate = calculateEstimate()
  const bufferAmount = Math.round((estimate.min + estimate.max) / 2 * 0.15)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300'
      case 'important': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'optional': return 'bg-gray-100 text-gray-700 border-gray-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <h3 className="text-xl font-bold mb-2">💰 Smart Cost Calculator</h3>
          <p className="text-sm text-gray-600">
            Interactive calculator with timeline integration and budget planning tools
          </p>
        </div>

        <div className="p-6">
          {/* Stage Filter */}
          {showTimelineIntegration && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Filter by Timeline Stage:</h4>
              <div className="flex flex-wrap gap-2">
                {stages.map(stage => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      selectedStage === stage
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {stage === 'all' ? 'All Stages' : stage}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Select</th>
                  <th className="text-left py-3 px-2">Cost Item</th>
                  <th className="text-left py-3 px-2">Amount (NAD)</th>
                  <th className="text-left py-3 px-2">When Due</th>
                  <th className="text-left py-3 px-2">Priority</th>
                  <th className="text-left py-3 px-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredCostData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b hover:bg-gray-50 ${item.isHidden ? 'bg-yellow-50' : ''}`}
                  >
                    <td className="py-3 px-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.category)}
                        onChange={() => toggleItem(item.category)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </td>
                    <td className={`py-3 px-2 ${item.isHidden ? 'font-bold' : ''}`}>
                      <div className="flex items-center gap-2">
                        {item.category}
                        {item.isHidden && (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{item.stage}</div>
                    </td>
                    <td className="py-3 px-2 font-mono text-sm font-medium">{item.range}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{item.paymentTiming}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600">
                      {item.notes}
                      {item.commonDelays && item.commonDelays.length > 0 && (
                        <div className="mt-1">
                          <details className="text-xs">
                            <summary className="cursor-pointer text-red-600 hover:text-red-800">
                              Common delays ⚠️
                            </summary>
                            <ul className="mt-1 pl-3 space-y-1">
                              {item.commonDelays.map((delay, i) => (
                                <li key={i} className="list-disc text-red-600">
                                  {delay}
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedItems.size > 0 && (
            <div className="mt-6 space-y-4">
              {/* Main Estimate */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Your Selected Items Total:</p>
                    <p className="text-2xl font-bold text-blue-900">
                      N${estimate.min.toLocaleString()} - N${estimate.max.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-12 w-12 text-blue-200" />
                </div>
              </div>

              {/* Buffer Recommendation */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">💡 Recommended Budget Buffer</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">
                      Add 15% buffer for delays, storage fees, and unexpected costs
                    </p>
                    <p className="text-lg font-bold text-green-900 mt-1">
                      Buffer: N${bufferAmount.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBufferCalculator(!showBufferCalculator)}
                    className="text-green-600 hover:text-green-800 text-sm underline"
                  >
                    {showBufferCalculator ? 'Hide' : 'Show'} Calculator
                  </button>
                </div>

                {showBufferCalculator && (
                  <div className="mt-4 p-3 bg-white rounded border">
                    <h5 className="font-medium mb-2">Total Budget Breakdown:</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Selected costs:</span>
                        <span>N${Math.round((estimate.min + estimate.max) / 2).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>15% Buffer:</span>
                        <span>N${bufferAmount.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total Budget Needed:</span>
                        <span>N${(Math.round((estimate.min + estimate.max) / 2) + bufferAmount).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Warnings */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>Hidden costs warning:</strong> The highlighted items (with ⚠️) are costs that most first-time importers don't budget for. These alone can add N$12,000+ to your total.
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <strong>Critical payments:</strong> Items marked as "critical" are non-negotiable and must be paid on time to avoid container holds and storage fees.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}