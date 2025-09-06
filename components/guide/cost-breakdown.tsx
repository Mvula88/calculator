'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { DollarSign, AlertTriangle, Info } from 'lucide-react'

interface CostItem {
  category: string
  range: string
  notes: string
  isHidden?: boolean
}

const costData: CostItem[] = [
  {
    category: 'Ocean freight (share)',
    range: 'N$18,000–N$35,000',
    notes: 'Varies by date/line; container vs RoRo'
  },
  {
    category: 'Port/terminal handling',
    range: 'N$4,000–N$9,000',
    notes: 'Storage/detention extra if delayed'
  },
  {
    category: 'Clearing agent fee',
    range: 'N$8,000–N$15,000',
    notes: 'Ask for written tariff & inclusions'
  },
  {
    category: 'Unpacking materials',
    range: '~N$600',
    notes: 'Cymot straps/tools (often overlooked)',
    isHidden: true
  },
  {
    category: 'Inland transport',
    range: 'N$5,000–N$12,000',
    notes: 'Walvis → WHK/Ongwediva, per km'
  },
  {
    category: 'Potential staff travel',
    range: 'Up to N$11,000',
    notes: 'Only if unpacking moved upcountry',
    isHidden: true
  },
  {
    category: 'Bank/PayPal/TT fees',
    range: 'N$500–N$3,000',
    notes: 'Depends on method'
  },
  {
    category: 'Storage/detention',
    range: 'N$200-500/day',
    notes: 'Avoid by having docs perfect + consignee cleared',
    isHidden: true
  },
  {
    category: 'Registration & roadworthy',
    range: 'N$2,500–N$4,500',
    notes: 'NATIS fees vary'
  }
]

export function CostBreakdown() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  
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

  const estimate = calculateEstimate()

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <h3 className="text-xl font-bold mb-2">💰 Detailed Cost Breakdown</h3>
          <p className="text-sm text-gray-600">
            Click items to calculate your estimated total. Bold items are often overlooked.
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Select</th>
                  <th className="text-left py-3 px-2">Cost Item</th>
                  <th className="text-left py-3 px-2">Typical Range (NAD)</th>
                  <th className="text-left py-3 px-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {costData.map((item, index) => (
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
                      {item.category}
                      {item.isHidden && (
                        <span className="ml-2 text-yellow-600">
                          <AlertTriangle className="inline h-4 w-4" />
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 font-mono text-sm">{item.range}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedItems.size > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Your Estimated Total:</p>
                  <p className="text-2xl font-bold text-blue-900">
                    N${estimate.min.toLocaleString()} - N${estimate.max.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (Excludes duty/VAT which depend on vehicle value)
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-blue-200" />
              </div>
            </div>
          )}

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <strong>Hidden costs warning:</strong> The highlighted items (in yellow) are costs that most first-time importers don't budget for. These alone can add N$12,000+ to your total.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}