'use client'

import { useState } from 'react'
import { AlertTriangle, Info } from 'lucide-react'

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
    commonDelays: ['Container sharing partner drops out', 'Shipping line capacity issues'],
  },
  {
    category: 'Port/terminal handling',
    range: 'N$4,000–N$9,000',
    notes: 'Storage/detention extra if delayed',
    stage: 'Arrival',
    priority: 'critical',
    paymentTiming: 'Before container release',
    commonDelays: ['Document errors cause storage fees', 'Port congestion'],
  },
  {
    category: 'Import duty & VAT',
    range: 'N$25,000–N$65,000',
    notes: 'Depends on vehicle value and engine size',
    stage: 'Clearance',
    priority: 'critical',
    paymentTiming: 'Before customs release',
    commonDelays: ['Valuation disputes', 'HS code classification issues'],
  },
  {
    category: 'Clearing agent fee',
    range: 'N$8,000–N$15,000',
    notes: 'Ask for written tariff & inclusions',
    stage: 'Clearance',
    priority: 'critical',
    paymentTiming: 'Upon completion of clearance',
    commonDelays: ['Agent overbooked', 'Document preparation delays'],
  },
  {
    category: 'Unpacking materials',
    range: '~N$600',
    notes: 'Cymot straps/tools (often overlooked)',
    isHidden: true,
    stage: 'Collection',
    priority: 'important',
    paymentTiming: 'Day of collection',
    commonDelays: ['Materials not available at port'],
  },
  {
    category: 'Inland transport',
    range: 'N$5,000–N$12,000',
    notes: 'Walvis → WHK/Ongwediva, per km',
    stage: 'Delivery',
    priority: 'critical',
    paymentTiming: 'Upon delivery',
    commonDelays: ['Transporter not available', 'Bad weather delays'],
  },
  {
    category: 'Potential staff travel',
    range: 'Up to N$11,000',
    notes: 'Only if unpacking moved upcountry',
    isHidden: true,
    stage: 'Collection',
    priority: 'optional',
    paymentTiming: 'If location changes',
    commonDelays: ['Last-minute location changes by agent'],
  },
  {
    category: 'Bank/PayPal/TT fees',
    range: 'N$500–N$3,000',
    notes: 'Depends on method',
    stage: 'Pre-Purchase',
    priority: 'important',
    paymentTiming: 'With each transfer',
    commonDelays: ['Bank processing delays', 'Foreign exchange delays'],
  },
  {
    category: 'Storage/detention',
    range: 'N$200–500/day',
    notes: 'Avoid by having docs perfect + consignee cleared',
    isHidden: true,
    stage: 'Emergency',
    priority: 'optional',
    paymentTiming: 'Daily until resolved',
    commonDelays: ['Document errors', 'Consignee blocks', 'Payment delays'],
  },
  {
    category: 'Registration & roadworthy',
    range: 'N$2,500–N$4,500',
    notes: 'NaTIS fees vary',
    stage: 'Registration',
    priority: 'critical',
    paymentTiming: 'After delivery',
    commonDelays: ['Roadworthy test failures', 'NaTIS system downtime'],
  },
]

interface CostBreakdownProps {
  showTimelineIntegration?: boolean
}

function priorityClass(priority: CostItem['priority']) {
  if (priority === 'critical') return 'text-red-600'
  if (priority === 'important') return 'text-amber-600'
  return 'text-zinc-500'
}

export function CostBreakdown({ showTimelineIntegration = true }: CostBreakdownProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [selectedStage, setSelectedStage] = useState<string>('all')
  const [showBufferCalculator, setShowBufferCalculator] = useState(false)

  const toggleItem = (category: string) =>
    setSelectedItems((prev) => {
      const next = new Set(prev)
      next.has(category) ? next.delete(category) : next.add(category)
      return next
    })

  const calculateEstimate = () => {
    let min = 0
    let max = 0
    selectedItems.forEach((category) => {
      const item = costData.find((c) => c.category === category)
      if (!item) return
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
    })
    return { min, max }
  }

  const stages = ['all', ...Array.from(new Set(costData.map((item) => item.stage)))]
  const filteredCostData =
    selectedStage === 'all' ? costData : costData.filter((item) => item.stage === selectedStage)
  const estimate = calculateEstimate()
  const bufferAmount = Math.round(((estimate.min + estimate.max) / 2) * 0.15)

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 04</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Cost calculator</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        Run your numbers.
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        Tick the costs that apply to your import — the calculator returns your total range, suggested buffer, and where each amount is due.
      </p>

      <div className="mt-10 border border-zinc-200 rounded-2xl overflow-hidden">
        {/* Stage filter */}
        {showTimelineIntegration && (
          <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-3">
              <span aria-hidden className="mr-2">↳</span>
              Filter by timeline stage
            </p>
            <div className="flex flex-wrap gap-2">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(stage)}
                  className={`px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] rounded-full border transition-colors ${
                    selectedStage === stage
                      ? 'bg-zinc-900 border-zinc-900 text-white'
                      : 'bg-white border-zinc-300 text-zinc-600 hover:border-zinc-500'
                  }`}
                >
                  {stage === 'all' ? 'All stages' : stage}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cost table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-white">
                <th className="text-left py-3 px-4 sm:px-6 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold w-12">
                  Pick
                </th>
                <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
                  Cost item
                </th>
                <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold hidden sm:table-cell">
                  When due
                </th>
                <th className="text-left py-3 px-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold hidden md:table-cell">
                  Priority
                </th>
                <th className="text-left py-3 px-2 sm:px-6 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
                  Range
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCostData.map((item) => (
                <tr
                  key={item.category}
                  className={`border-b border-zinc-100 last:border-b-0 hover:bg-stone-50/60 transition-colors ${item.isHidden ? 'bg-amber-50/30' : ''}`}
                >
                  <td className="py-4 px-4 sm:px-6">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.category)}
                      onChange={() => toggleItem(item.category)}
                      className="h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-400"
                    />
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      {item.isHidden && (
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" strokeWidth={1.5} aria-label="Often overlooked" />
                      )}
                      <span className={`text-sm ${item.isHidden ? 'font-medium text-zinc-900' : 'text-zinc-800'}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                      {item.stage}
                    </div>
                    {item.commonDelays && item.commonDelays.length > 0 && (
                      <details className="mt-2">
                        <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 hover:text-red-700">
                          Common delays
                        </summary>
                        <ul className="mt-2 space-y-1">
                          {item.commonDelays.map((delay, i) => (
                            <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-red-500 flex-shrink-0" aria-hidden />
                              {delay}
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </td>
                  <td className="py-4 px-2 text-sm text-zinc-600 hidden sm:table-cell">{item.paymentTiming}</td>
                  <td className="py-4 px-2 hidden md:table-cell">
                    <span className={`font-mono text-[10px] uppercase tracking-[0.24em] font-semibold ${priorityClass(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-4 px-2 sm:px-6 font-mono text-sm text-zinc-900 whitespace-nowrap">{item.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Estimate */}
        {selectedItems.size > 0 && (
          <div className="border-t border-zinc-200 bg-stone-50/60 px-6 sm:px-8 py-6 space-y-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-2">
                Your selected total
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900">
                N${estimate.min.toLocaleString()} <span className="text-zinc-400 italic font-light">→</span> N${estimate.max.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Based on {selectedItems.size} selected items.</p>
            </div>

            <div className="pt-6 border-t border-zinc-200">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-700 font-semibold mb-2">
                    Recommended 15% buffer
                  </p>
                  <p className="font-serif text-xl font-medium tracking-tight text-zinc-900">
                    N${bufferAmount.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">For delays, storage fees, and surprises.</p>
                </div>
                <button
                  onClick={() => setShowBufferCalculator((s) => !s)}
                  className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-700 hover:text-zinc-900 underline underline-offset-4 transition-colors"
                >
                  {showBufferCalculator ? 'Hide breakdown' : 'Show breakdown'}
                </button>
              </div>

              {showBufferCalculator && (
                <dl className="mt-5 border border-zinc-200 rounded-xl divide-y divide-zinc-200 bg-white">
                  <div className="grid grid-cols-2 gap-3 px-4 py-3 text-sm">
                    <dt className="text-zinc-600">Selected costs (mid)</dt>
                    <dd className="text-right font-mono text-zinc-900">
                      N${Math.round((estimate.min + estimate.max) / 2).toLocaleString()}
                    </dd>
                  </div>
                  <div className="grid grid-cols-2 gap-3 px-4 py-3 text-sm">
                    <dt className="text-zinc-600">15% buffer</dt>
                    <dd className="text-right font-mono text-zinc-900">N${bufferAmount.toLocaleString()}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-3 px-4 py-3 text-sm bg-stone-50/60">
                    <dt className="font-medium text-zinc-900">Total budget needed</dt>
                    <dd className="text-right font-mono font-medium text-zinc-900">
                      N${(Math.round((estimate.min + estimate.max) / 2) + bufferAmount).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footnotes */}
      <div className="mt-8 space-y-4">
        <div className="flex items-start gap-3 border-l-2 border-amber-500 pl-4 py-2">
          <Info className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <p className="text-sm text-zinc-700 leading-relaxed">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700 font-semibold mr-2">Hidden costs</span>
            Items marked with ⚠ are costs most first-time importers don't budget for — they can add N$12,000+ on their own.
          </p>
        </div>
        <div className="flex items-start gap-3 border-l-2 border-red-500 pl-4 py-2">
          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <p className="text-sm text-zinc-700 leading-relaxed">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-600 font-semibold mr-2">Critical</span>
            "Critical" items are non-negotiable. Missed deadlines mean container holds and daily storage fees.
          </p>
        </div>
      </div>
    </div>
  )
}
