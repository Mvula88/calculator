'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react'

interface TimelineStep {
  title: string
  duration: string
  required: string[]
  tips: string[]
  checklist: { label: string; id: string }[]
  warnings?: string[]
  costAtStage?: string
  commonDelays?: { delay: string; cost: string; prevention: string }[]
  urgencyLevel?: 'low' | 'medium' | 'high' | 'critical'
}

interface TimelineSectionProps {
  steps: TimelineStep[]
}

function urgencyClass(level?: string) {
  if (level === 'critical') return 'text-red-600'
  if (level === 'high') return 'text-amber-600'
  if (level === 'medium') return 'text-zinc-700'
  if (level === 'low') return 'text-emerald-700'
  return 'text-zinc-500'
}

export function TimelineSection({ steps }: TimelineSectionProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0])
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleStep = (index: number) =>
    setExpandedSteps((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))

  const toggleCheck = (id: string) =>
    setCheckedItems((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 05</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Timeline</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        Step by step.
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        Each phase with its required steps, insider tips, common delays, and a checklist you can tick off as you go.
      </p>

      <ol className="mt-10 border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200">
        {steps.map((step, index) => {
          const isOpen = expandedSteps.includes(index)
          return (
            <li key={index}>
              <button
                onClick={() => toggleStep(index)}
                className="w-full px-6 sm:px-8 py-5 text-left hover:bg-stone-50/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold flex-shrink-0 pt-1">
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-zinc-900">
                        {step.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-5 flex-wrap font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3 w-3" strokeWidth={1.5} />
                          {step.duration}
                        </span>
                        {step.urgencyLevel && (
                          <span className={`font-semibold ${urgencyClass(step.urgencyLevel)}`}>
                            {step.urgencyLevel} urgency
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400 flex-shrink-0 mt-1.5" strokeWidth={1.5} />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 flex-shrink-0 mt-1.5" strokeWidth={1.5} />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 sm:px-8 pb-8 border-t border-zinc-100 bg-stone-50/30 space-y-8">
                  {/* Required steps */}
                  <div className="pt-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Required steps
                    </p>
                    <ul className="space-y-2">
                      {step.required.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 leading-relaxed">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Insider tips */}
                  {step.tips && step.tips.length > 0 && (
                    <div className="border-l-2 border-emerald-500 pl-4 py-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-700 font-semibold mb-2">
                        Critical insider tips
                      </p>
                      <ul className="space-y-2">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-zinc-700 leading-relaxed">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Common delays */}
                  {step.commonDelays && step.commonDelays.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-600 font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Common delays
                      </p>
                      <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
                        {step.commonDelays.map((d, i) => (
                          <li key={i} className="py-4">
                            <div className="flex items-start justify-between gap-4 mb-1">
                              <p className="text-sm font-medium text-zinc-900">{d.delay}</p>
                              <span className="font-mono text-xs text-red-600 whitespace-nowrap">{d.cost}</span>
                            </div>
                            <p className="text-xs text-zinc-600">
                              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-700 mr-2">Prevention</span>
                              {d.prevention}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Rejection reasons */}
                  {step.warnings && step.warnings.length > 0 && (
                    <div className="border-l-2 border-amber-500 pl-4 py-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700 font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Common rejection reasons
                      </p>
                      <ul className="space-y-2">
                        {step.warnings.map((warning, i) => (
                          <li key={i} className="text-sm text-zinc-700 leading-relaxed">{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Mini checklist */}
                  {step.checklist && step.checklist.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold mb-3">
                        Mini-checklist
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.checklist.map((item) => {
                          const checked = checkedItems.has(item.id)
                          return (
                            <button
                              key={item.id}
                              onClick={() => toggleCheck(item.id)}
                              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                                checked
                                  ? 'bg-zinc-900 border-zinc-900 text-white'
                                  : 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-500'
                              }`}
                            >
                              {checked ? (
                                <CheckCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
                              ) : (
                                <span className="h-3.5 w-3.5 rounded-full border border-current" aria-hidden />
                              )}
                              {item.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
