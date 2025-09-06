'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ChevronRight, Clock, DollarSign, FileText, Phone } from 'lucide-react'

interface PlaybookStep {
  action: string
  details: string
  urgency: 'immediate' | 'same-day' | 'next-day'
}

interface Playbook {
  id: string
  title: string
  trigger: string
  impact: string
  steps: PlaybookStep[]
}

const playbooks: Playbook[] = [
  {
    id: 'consignee-block',
    title: 'Consignee Block Discovered',
    trigger: 'Shipping line says consignee has unpaid bills',
    impact: 'Container held indefinitely + N$200-500/day storage',
    steps: [
      {
        action: 'Ask line/agent to confirm what\'s due and to which account',
        details: 'Get exact amount and account details in writing',
        urgency: 'immediate'
      },
      {
        action: 'If not your company, request B/L consignee amendment',
        details: 'Use the B/L amendment template. Attach authorization docs',
        urgency: 'immediate'
      },
      {
        action: 'Ask port to freeze storage counter during amendment',
        details: 'Won\'t always work but worth trying. Reference the hold reason',
        urgency: 'same-day'
      },
      {
        action: 'Negotiate storage discount post-release',
        details: 'Use storage negotiation script. Emphasize good faith',
        urgency: 'next-day'
      }
    ]
  },
  {
    id: 'vin-error',
    title: 'Invoice/VIN Error Found',
    trigger: 'Customs says VIN doesn\'t match or invoice missing engine number',
    impact: '3-10 days delay + storage fees',
    steps: [
      {
        action: 'Get revised invoice from seller with VIN+engine + stamp',
        details: 'Must show: VIN, engine number, make, model, year. Seller must sign/stamp',
        urgency: 'immediate'
      },
      {
        action: 'Take clear photos of VIN and engine number on actual vehicle',
        details: 'Multiple angles. Engine number often hard to find - check near oil filter',
        urgency: 'immediate'
      },
      {
        action: 'Ask agent to re-submit supporting docs to customs',
        details: 'Include revised invoice + photos + explanation letter',
        urgency: 'same-day'
      },
      {
        action: 'Follow up with customs officer directly if possible',
        details: 'Polite persistence. Bring printed docs to their office',
        urgency: 'next-day'
      }
    ]
  },
  {
    id: 'translator-delay',
    title: 'Translation Service Delayed',
    trigger: 'Can\'t find certified Japanese translator or service is slow',
    impact: '7-21 days searching + mounting storage',
    steps: [
      {
        action: 'Submit what you have noting translation in progress',
        details: 'Tell customs/MIT you\'re actively getting translation',
        urgency: 'immediate'
      },
      {
        action: 'Call Japanese Embassy for certified translator list',
        details: 'Ask specifically for NamRA/MIT approved translators',
        urgency: 'immediate'
      },
      {
        action: 'Try High Court for list of certified translators',
        details: 'Court translators often do commercial work too',
        urgency: 'same-day'
      },
      {
        action: 'Consider flying to Windhoek/Joburg for faster service',
        details: 'May be cheaper than 2 weeks of storage fees',
        urgency: 'next-day'
      }
    ]
  },
  {
    id: 'storage-mounting',
    title: 'Storage Fees Mounting Fast',
    trigger: 'Delay causing N$200-500/day in storage',
    impact: 'Can reach N$10,000+ quickly',
    steps: [
      {
        action: 'Document the reason for delay with evidence',
        details: 'Screenshots, emails, photos - build your case',
        urgency: 'immediate'
      },
      {
        action: 'Request meeting with port/terminal manager',
        details: 'Face-to-face often works better than email',
        urgency: 'same-day'
      },
      {
        action: 'Propose partial payment or payment plan',
        details: 'Offer 50% now, negotiate balance. Show good faith',
        urgency: 'same-day'
      },
      {
        action: 'If agent caused delay, demand they cover portion',
        details: 'Check your agreement. Many agents have insurance',
        urgency: 'next-day'
      }
    ]
  },
  {
    id: 'hs-code-dispute',
    title: 'HS Code Classification Disputed',
    trigger: 'Customs wants to use different (higher duty) HS code',
    impact: '10-40% extra duty (thousands of dollars)',
    steps: [
      {
        action: 'Get technical specs from manufacturer website',
        details: 'Official specs showing engine size, type, year, features',
        urgency: 'immediate'
      },
      {
        action: 'Request written justification for their HS code',
        details: 'Make them explain why they chose that classification',
        urgency: 'immediate'
      },
      {
        action: 'Submit appeal with evidence for correct code',
        details: 'Include: specs, similar cleared vehicles, WCO guidelines',
        urgency: 'same-day'
      },
      {
        action: 'Escalate to senior customs officer if needed',
        details: 'Bring printed evidence. Be respectful but firm',
        urgency: 'next-day'
      }
    ]
  }
]

const urgencyColors = {
  immediate: 'bg-red-100 text-red-700 border-red-300',
  'same-day': 'bg-orange-100 text-orange-700 border-orange-300',
  'next-day': 'bg-yellow-100 text-yellow-700 border-yellow-300'
}

const urgencyIcons = {
  immediate: '🚨',
  'same-day': '⚠️',
  'next-day': '📅'
}

export function EmergencyPlaybook() {
  const [expandedPlaybook, setExpandedPlaybook] = useState<string | null>(null)

  const togglePlaybook = (id: string) => {
    setExpandedPlaybook(expandedPlaybook === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">🚨 Emergency Playbooks</h2>
        <p className="text-gray-600">Step-by-step crisis management when things go wrong</p>
      </div>

      <div className="grid gap-4">
        {playbooks.map((playbook) => (
          <Card key={playbook.id} className="overflow-hidden">
            <button
              onClick={() => togglePlaybook(playbook.id)}
              className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg">{playbook.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Trigger:</strong> {playbook.trigger}
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        <strong>Impact:</strong> {playbook.impact}
                      </p>
                    </div>
                  </div>
                </div>
                <ChevronRight 
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    expandedPlaybook === playbook.id ? 'rotate-90' : ''
                  }`} 
                />
              </div>
            </button>

            {expandedPlaybook === playbook.id && (
              <div className="px-6 pb-6 border-t">
                <div className="mt-4 space-y-3">
                  {playbook.steps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium">{step.action}</p>
                          <span className={`px-2 py-1 text-xs rounded-full border ${urgencyColors[step.urgency]}`}>
                            {urgencyIcons[step.urgency]} {step.urgency}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{step.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Pro tip:</strong> Start with step 1 immediately. 
                    Most crises get worse with delay. Document everything - 
                    screenshots, emails, names, times. You'll need it for negotiations.
                  </p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}