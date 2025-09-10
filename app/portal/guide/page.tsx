'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { TimelineSection } from '@/components/guide/timeline-section'
import { CostBreakdown } from '@/components/guide/cost-breakdown'
import { MistakeCards } from '@/components/guide/mistake-cards'
import { TemplatesSection } from '@/components/guide/templates-section'
import { EmergencyPlaybook } from '@/components/guide/emergency-playbook'
import { AlertTriangle, CheckCircle, Info, TrendingDown, Lock, Shield } from 'lucide-react'

// Timeline data for Namibia guide
const namibiaTimelineSteps = [
  {
    title: 'Pre-Import Planning',
    duration: '7–14 days',
    required: [
      'Pick a car that meets import rules (max 12 years old for Namibia)',
      'Get seller to photograph VIN and engine number on the car',
      'Confirm who will appear as Consignee on Bill of Lading',
      'Choose clearing approach: DIY + clearing firm (recommended) vs full agent'
    ],
    tips: [
      '🔍 Match everything to VIN/engine number. One wrong character = days of delay',
      '🧾 Invoice must show: VIN, engine number, make/model, year, engine capacity, color',
      '🎯 If sharing container, agree in writing who pays if someone drops out'
    ],
    checklist: [
      { label: 'VIN photo', id: 'vin-photo' },
      { label: 'Engine photo', id: 'engine-photo' },
      { label: 'Correct invoice', id: 'invoice' },
      { label: 'Consignee confirmed', id: 'consignee' },
      { label: 'Clearing plan', id: 'clearing' }
    ]
  },
  {
    title: 'Documentation Preparation',
    duration: '3–5 days',
    required: [
      'SAD 500 form (clearing firm prepares)',
      'Assessment Notice (official duty/VAT computation)',
      'Payment Receipts for all duties and levies',
      'Customs Release Order and Clearance Certificate',
      'Police Clearance for VIN/engine verification',
      'ID and Driver\'s License copies'
    ],
    tips: [
      '⚡ Complete SAD 500 immediately when Bill of Lading arrives',
      '📋 Triple-check VIN/engine numbers before submission',
      '💰 Keep all payment receipts - you need them for registration'
    ],
    checklist: [
      { label: 'SAD 500 form', id: 'sad-500' },
      { label: 'All receipts', id: 'receipts' },
      { label: 'ID documents', id: 'id-docs' },
      { label: 'Vehicle photos', id: 'photos' }
    ]
  },
  {
    title: 'Shipping & Arrival',
    duration: '35–45 days',
    required: [
      'Track container location weekly',
      'Prepare clearing agent documents',
      'Arrange port storage if needed',
      'Book transporter in advance'
    ],
    tips: [
      '🚢 Container arrives 2-3 days before scheduled date usually',
      '📅 Book clearing agent 1 week before arrival',
      '🚚 Pre-book transporter to avoid storage fees'
    ],
    checklist: [
      { label: 'Container tracked', id: 'tracking' },
      { label: 'Agent booked', id: 'agent' },
      { label: 'Transport ready', id: 'transport' }
    ]
  },
  {
    title: 'Clearance & Collection',
    duration: '5–10 days',
    required: [
      'Submit documents to clearing agent',
      'Pay all duties and fees',
      'Pass police clearance inspection',
      'Arrange collection from port'
    ],
    tips: [
      '💡 Use clearing firm for first import - DIY is risky',
      '⏰ Start clearance immediately to avoid storage fees',
      '🔐 Get temporary insurance before driving'
    ],
    checklist: [
      { label: 'Duties paid', id: 'duties' },
      { label: 'Police cleared', id: 'police' },
      { label: 'Car collected', id: 'collected' }
    ]
  },
  {
    title: 'Registration',
    duration: '7–14 days',
    required: [
      'Roadworthy certificate',
      'NaTIS registration',
      'License plates',
      'Insurance policy'
    ],
    tips: [
      '🛠️ Book roadworthy test immediately after collection',
      '📝 Submit NaTIS papers same day as roadworthy',
      '🎯 Full process can be done in 3 days if organized'
    ],
    checklist: [
      { label: 'Roadworthy', id: 'roadworthy' },
      { label: 'NaTIS done', id: 'natis' },
      { label: 'Plates fitted', id: 'plates' },
      { label: 'Insurance active', id: 'insurance' }
    ]
  }
]


// Common mistakes
const commonMistakes = [
  {
    mistake: 'Wrong documentation timing',
    severity: 'high' as const,
    impact: 'N$800-2,500/day storage fees',
    solution: 'Start paperwork 1 week before ship arrives. Have clearing agent ready.'
  },
  {
    mistake: 'VIN/Engine mismatch',
    severity: 'critical' as const,
    impact: 'Complete rejection, may need to re-export',
    solution: 'Photograph actual VIN plate and engine number. Match every document exactly.'
  },
  {
    mistake: 'Undervaluing for duties',
    severity: 'high' as const,
    impact: 'Penalties, delays, possible seizure',
    solution: 'Declare actual purchase price. Customs has access to auction prices.'
  },
  {
    mistake: 'No clearing agent for first import',
    severity: 'medium' as const,
    impact: '2-4 weeks extra delay',
    solution: 'Use a clearing firm for your first 2-3 imports. Learn the process, then consider DIY.'
  },
  {
    mistake: 'Buying incompatible vehicle',
    severity: 'critical' as const,
    impact: 'Cannot register, must re-export',
    solution: 'Check: Max 12 years old, right-hand drive, meets emissions standards.'
  }
]

export default function GuidePage() {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  
  useEffect(() => {
    // Check for session in cookie or localStorage
    let session = null
    
    // Check cookie
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'impota_session') {
        try {
          session = JSON.parse(decodeURIComponent(value))
          break
        } catch (e) {
          console.error('Invalid cookie session')
        }
      }
    }
    
    // Fallback to localStorage
    if (!session) {
      const stored = localStorage.getItem('impota_session')
      if (stored) {
        try {
          session = JSON.parse(stored)
        } catch (e) {
          console.error('Invalid localStorage session')
        }
      }
    }
    
    if (session && session.email) {
      setHasAccess(true)
      setUserEmail(session.email)
    } else {
      setHasAccess(false)
    }
  }, [])
  
  // Loading state
  if (hasAccess === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading guide...</p>
        </div>
      </div>
    )
  }
  
  // No access - redirect to login
  if (!hasAccess) {
    router.replace('/portal/login')
    return null
  }
  
  // Has access - show the guide
  const countryName = 'Namibia' // Default for now
  const port = 'Walvis Bay'
  const currency = 'N$'

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header with protection notice */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Your Import Guide</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Licensed to: {userEmail}</span>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Lock className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800 font-medium">Content Protection Active</p>
                <p className="text-xs text-red-700 mt-1">
                  This guide is licensed to {userEmail}. Sharing or redistributing this content violates the terms of service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Timeline</p>
                <p className="font-semibold">55-88 days</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Typical Total Cost</p>
                <p className="font-semibold">{currency}172,000</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="font-semibold">95% first time</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline Section */}
        <TimelineSection 
          steps={namibiaTimelineSteps}
        />

        {/* Cost Breakdown */}
        <CostBreakdown />

        {/* Common Mistakes */}
        <MistakeCards mistakes={commonMistakes} />

        {/* Templates Section */}
        <TemplatesSection />

        {/* Emergency Playbook */}
        <EmergencyPlaybook />

        {/* Success Tips */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Your Success Checklist
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Before Buying:</h3>
              <ul className="space-y-1 text-sm">
                <li>✓ Verify car is max 12 years old</li>
                <li>✓ Confirm right-hand drive</li>
                <li>✓ Get VIN & engine photos</li>
                <li>✓ Check {countryName} import rules</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">After Purchase:</h3>
              <ul className="space-y-1 text-sm">
                <li>✓ Start documentation immediately</li>
                <li>✓ Book clearing agent early</li>
                <li>✓ Track container weekly</li>
                <li>✓ Prepare all payments in advance</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Support Notice */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need help? Contact your clearing agent or visit the {countryName} Customs website.</p>
          <p className="mt-2">This guide is for {port} port. Other ports may have different procedures.</p>
        </div>
      </div>
    </main>
  )
}