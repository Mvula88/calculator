'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react'

interface TimelineStep {
  title: string
  duration: string
  required: string[]
  tips: string[]
  checklist: { label: string; id: string }[]
  warnings?: string[]
}

interface TimelineSectionProps {
  steps: TimelineStep[]
}

export function TimelineSection({ steps }: TimelineSectionProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0])
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

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

  return (
    <div className="space-y-4">
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
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{step.duration}</span>
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

              {/* Warnings */}
              {step.warnings && step.warnings.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Common Rejection Reasons
                  </h4>
                  <ul className="space-y-2">
                    {step.warnings.map((warning, i) => (
                      <li key={i} className="text-sm text-red-800">
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