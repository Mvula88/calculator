'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Clock, FileText, DollarSign, TrendingUp } from 'lucide-react'

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

export function TimelineSection({ steps }: TimelineSectionProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0])
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [showCostBreakdown, setShowCostBreakdown] = useState(false)

  const toggleStep = (index: number) => {
    setExpandedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const getUrgencyColor = (level?: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300'
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-700 border-green-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header with cost overview toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">📅 Complete Import Timeline</h2>
          <p className="text-gray-600 text-sm mt-1">Step-by-step process with costs and delays at each stage</p>
        </div>
        <button
          onClick={() => setShowCostBreakdown(!showCostBreakdown)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
        >
          <DollarSign className="h-4 w-4" />
          {showCostBreakdown ? 'Hide' : 'Show'} Cost Overview
        </button>
      </div>

      {/* Cost Overview */}
      {showCostBreakdown && (
        <Card className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Cost Timeline Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {steps.map((step, idx) => (
              step.costAtStage && (
                <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm font-medium">{step.title}</span>
                  <span className="text-sm font-bold text-green-700">{step.costAtStage}</span>
                </div>
              )
            ))}
          </div>
        </Card>
      )}

      {steps.map((step, index) => (
        <Card key={index} className="overflow-hidden">
          <button
            onClick={() => toggleStep(index)}
            className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{step.duration}</span>
                      </div>
                      {step.costAtStage && (
                        <div className="flex items-center gap-1 text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span>{step.costAtStage}</span>
                        </div>
                      )}
                      {step.urgencyLevel && (
                        <span className={`px-2 py-1 text-xs rounded-full border ${getUrgencyColor(step.urgencyLevel)}`}>
                          {step.urgencyLevel} urgency
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {expandedSteps.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </button>

          {expandedSteps.includes(index) && (
            <div className="px-6 pb-6 space-y-6 border-t">
              {/* Required Steps */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Required Steps
                </h4>
                <ul className="space-y-2">
                  {step.required.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Insider Tips */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3">🎯 Critical Insider Tips</h4>
                <ul className="space-y-2">
                  {step.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-green-800">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Delays */}
              {step.commonDelays && step.commonDelays.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Common Delays at This Stage
                  </h4>
                  <div className="space-y-3">
                    {step.commonDelays.map((delayItem, i) => (
                      <div key={i} className="border-l-4 border-red-300 pl-3">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-sm font-medium text-red-900">{delayItem.delay}</p>
                          <span className="text-sm font-bold text-red-700">{delayItem.cost}</span>
                        </div>
                        <p className="text-xs text-red-700">
                          <strong>Prevention:</strong> {delayItem.prevention}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Warnings */}
              {step.warnings && step.warnings.length > 0 && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Common Rejection Reasons
                  </h4>
                  <ul className="space-y-2">
                    {step.warnings.map((warning, i) => (
                      <li key={i} className="text-sm text-orange-800">
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mini Checklist */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">✓ Mini-Checklist</h4>
                <div className="flex flex-wrap gap-3">
                  {step.checklist.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        checkedItems.has(item.id)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-white text-gray-600 border'
                      }`}
                    >
                      {checkedItems.has(item.id) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2" />
                      )}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}