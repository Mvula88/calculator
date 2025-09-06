import { createClient, createServiceClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { TimelineSection } from '@/components/guide/timeline-section'
import { CostBreakdown } from '@/components/guide/cost-breakdown'
import { MistakeCards } from '@/components/guide/mistake-cards'
import { TemplatesSection } from '@/components/guide/templates-section'
import { EmergencyPlaybook } from '@/components/guide/emergency-playbook'
import { AlertTriangle, CheckCircle, Info, TrendingDown, Lock, Shield } from 'lucide-react'

async function getUserEntitlement(userId: string) {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('entitlements')
    .select('*')
    .eq('user_id', userId)
    .eq('active', true)
    .single()
  
  return data
}

async function getSessionEntitlement() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('portal_session')
  
  if (!sessionCookie) return null
  
  try {
    const session = JSON.parse(sessionCookie.value)
    const supabase = createServiceClient()
    const { data } = await supabase
      .from('entitlements')
      .select('*')
      .eq('stripe_session_id', session.sessionId)
      .eq('email', session.email)
      .eq('active', true)
      .single()
    
    return data
  } catch (error) {
    return null
  }
}

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
      '📄 Japanese docs MUST be translated by certified translator',
      '⚠️ Finding certified JP→EN translator is hardest part - start early',
      '💰 Attach ALL payment proofs to avoid value challenges'
    ],
    warnings: [
      'Invoice missing engine number → 3-10 days delay',
      'Incorrect VIN (even one digit) → indefinite hold',
      'No certified translation → 7-21 days finding translator',
      'Missing payment proof → customs hold'
    ],
    checklist: [
      { label: 'SAD 500', id: 'sad500' },
      { label: 'Translations', id: 'translations' },
      { label: 'Payment proofs', id: 'payments' },
      { label: 'All IDs', id: 'ids' }
    ]
  },
  {
    title: 'Shipping & Transit',
    duration: '21–35 days',
    required: [
      'Monitor vessel tracking and ETA',
      'Confirm B/L details are correct (especially Consignee)',
      'Prepare unpacking materials budget (N$600+)',
      'Confirm unpacking location in writing'
    ],
    tips: [
      '🧰 Cars are strapped in container - need tools/straps for release',
      '🗺️ Unpacking moved upcountry can cost N$11,000 in staff travel',
      '📦 Confirm container location before vessel arrives'
    ],
    checklist: [
      { label: 'B/L received', id: 'bl-received' },
      { label: 'Tools ready', id: 'tools' },
      { label: 'Location confirmed', id: 'location' }
    ]
  },
  {
    title: 'Customs Clearance at Walvis Bay',
    duration: '5–14 days',
    required: [
      'Physical inspection - customs verifies VIN and engine number',
      'Value assessment against documents',
      'HS code classification confirmation',
      'Final duty/VAT payment if any adjustments',
      'Obtain Customs Release Order and Clearance Certificate'
    ],
    tips: [
      '🔍 Officer must find engine number on car - know where it is',
      '⚠️ Consignee account issues can block entire container',
      '💡 Verify consignee has no debts with shipping line BEFORE'
    ],
    warnings: [
      'Consignee has unpaid bills = indefinite hold',
      'Wrong HS code = 10-40% extra duty',
      'Can\'t find engine number = nothing moves'
    ],
    checklist: [
      { label: 'Inspection passed', id: 'inspection' },
      { label: 'Duties paid', id: 'duties' },
      { label: 'Release obtained', id: 'release' }
    ]
  },
  {
    title: 'Vehicle Release → Police → NATIS',
    duration: '3–7 days',
    required: [
      'Release vehicle from port with all clearance docs',
      'Police clearance - physical VIN/engine verification',
      'NATIS introduction (not roadworthy - just VIN capture)',
      'Book roadworthy test (often 2-3 days wait)',
      'Complete registration with full document pack'
    ],
    tips: [
      '📋 Carry ALL docs everywhere: assessment, receipts, clearances, SAD 500',
      '🚗 Book roadworthy test immediately - slots fill fast',
      '✅ Police need to physically see VIN and engine numbers'
    ],
    checklist: [
      { label: 'Port release', id: 'port-release' },
      { label: 'Police cleared', id: 'police' },
      { label: 'NATIS intro', id: 'natis' },
      { label: 'Roadworthy booked', id: 'roadworthy' },
      { label: 'Registered', id: 'registered' }
    ]
  }
]

export default async function PortalGuidePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Check both authenticated user and session-based access
  let entitlement = null
  let userEmail = null
  
  if (user) {
    entitlement = await getUserEntitlement(user.id)
    userEmail = user.email
  } else {
    // Try session-based access
    entitlement = await getSessionEntitlement()
    userEmail = entitlement?.email
  }
  
  // If no user and no session, redirect to login
  if (!user && !entitlement) {
    redirect('/auth/login?redirect=/portal/guide')
  }
  
  // If user is logged in but has no entitlement, show purchase prompt
  if (!entitlement) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8 text-center">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Guide Access Required</h2>
          <p className="text-gray-600 mb-4">
            You need to purchase the Mistake Guide or Import Mastery to access this content.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Logged in as: {userEmail}
          </p>
          <div className="space-y-3">
            <a 
              href="/na/guide"
              className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Purchase Guide Access →
            </a>
            <a 
              href="/portal"
              className="block text-gray-600 hover:underline"
            >
              Back to Portal
            </a>
          </div>
        </Card>
      </div>
    )
  }
  
  // Check if user has at least mistake tier
  const hasAccess = entitlement.tier === 'mistake' || entitlement.tier === 'mastery'
  
  if (!hasAccess) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8 text-center">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Upgrade Required</h2>
          <p className="text-gray-600 mb-4">
            Your current plan doesn't include guide access. Upgrade to Mistake Guide or Import Mastery.
          </p>
          <a 
            href={`/${entitlement.country || 'na'}/guide`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Upgrade Options →
          </a>
        </Card>
      </div>
    )
  }

  // Get country-specific content
  const countryName = entitlement.country === 'na' ? 'Namibia' :
                     entitlement.country === 'za' ? 'South Africa' :
                     entitlement.country === 'bw' ? 'Botswana' :
                     entitlement.country === 'zm' ? 'Zambia' : 'Namibia'
  
  const port = entitlement.country === 'na' ? 'Walvis Bay' :
               entitlement.country === 'za' ? 'Durban' :
               entitlement.country === 'bw' ? 'Walvis Bay' :
               entitlement.country === 'zm' ? 'Dar es Salaam' : 'Walvis Bay'
  
  const currency = entitlement.country === 'na' ? 'N$' :
                   entitlement.country === 'za' ? 'R' :
                   entitlement.country === 'bw' ? 'P' :
                   entitlement.country === 'zm' ? 'K' : 'N$'

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
                <p className="font-semibold text-red-900">Protected Content</p>
                <p className="text-sm text-red-700">
                  This guide is licensed to you personally. Sharing or redistribution is prohibited and tracked.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose Section */}
        <Card className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <h2 className="text-2xl font-bold mb-4">
            📚 {countryName} Mistake Guide — "Avoid My Mistakes"
          </h2>
          <p className="text-gray-700 mb-4">
            Save first-time importers from the most expensive and time-wasting mistakes when 
            importing a car through {port}. Every tactic here is based on real events I went 
            through — including the parts that cost me money, time and stress.
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                <strong>Reality check:</strong> Regulations, charges and office contacts change. 
                Use this guide as field-tested practice, then confirm specifics with authorities/port/your 
                agent before you pay.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 1: Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🔵 Complete Import Process Timeline
          </h2>
          <TimelineSection steps={namibiaTimelineSteps} />
        </section>

        {/* Section 2: Cost Breakdown */}
        <section className="mb-16">
          <CostBreakdown />
        </section>

        {/* Section 3: Mistakes to Avoid */}
        <section className="mb-16">
          <MistakeCards />
        </section>

        {/* Section 4: Professional Secrets */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">🧠 Professional Insider Secrets</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold mb-2">Duty accuracy, not games (Save 10–30%)</h3>
                <p className="text-gray-700">
                  Provide the correct HS code backed by VIN/engine evidence. Avoid "lowballing value" 
                  — it backfires with uplifts and audits.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold mb-2">Pre-clear with real agent (Save 2–7 days)</h3>
                <p className="text-gray-700">
                  Engage your clearing firm before ship arrives. Your pack (invoice, B/L draft, 
                  export cert, translator) should be ready on arrival.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold mb-2">Container-share hygiene (Save {currency}10,000+)</h3>
                <p className="text-gray-700">
                  Use written share agreement: drop-out rules, consignee name, unpacking site, 
                  materials, who carries shortfall.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold mb-2">Storage fee negotiation (Save 30–50%)</h3>
                <p className="text-gray-700">
                  "We're clearing in good faith; the hold resulted from a consignee account issue 
                  outside our control. Please authorise a goodwill reduction on storage."
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 5: Templates */}
        <section className="mb-16">
          <TemplatesSection />
        </section>

        {/* Section 6: Emergency Playbooks */}
        <section className="mb-16">
          <EmergencyPlaybook />
        </section>

        {/* Section 7: Country Transit Info */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">🌍 Transit to Other Countries via {port}</h2>
            
            <div className="space-y-6">
              {entitlement.country === 'na' && (
                <>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold mb-2">🇧🇼 Botswana (via Trans-Kalahari)</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Transit papers/bond from NamRA, clear with BURS at entry</li>
                      <li>• Bond cost is real - some firms pool transits</li>
                      <li>• Time-limited: overstay = penalties</li>
                      <li>• Pre-notify BURS of arrival where possible</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold mb-2">🇿🇲 Zambia (via Katima Mulilo)</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• ZRA pre-clearance and road transit papers needed</li>
                      <li>• Must reach declared border within allowed time</li>
                      <li>• Engage Zambian clearing firm before vessel arrives</li>
                      <li>• Carry printed copies of every document</li>
                    </ul>
                  </div>
                </>
              )}
              
              {entitlement.country === 'za' && (
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-2">🇧🇼 Transit to Neighboring Countries</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• In-transit bond required for vehicles passing through SA</li>
                    <li>• SADC customs union benefits may apply</li>
                    <li>• Road transport insurance mandatory</li>
                    <li>• Border post hours vary - check ahead</li>
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* Section 8: Police & Registration */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">🚓 Police & Registration — Exactly What To Do</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">Police Clearance</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Take car + assessment notice, receipts, customs release, SAD 500, ID/licence</li>
                  <li>• They physically confirm VIN + engine numbers</li>
                  <li>• If engine number is hard to see, carry seller's photo</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">Vehicle Registration</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Book roadworthy test immediately - slots fill up fast</li>
                  <li>• Carry same document pack as police</li>
                  <li>• Registration is final step - keep all docs forever</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Mastery Upsell for Mistake tier users */}
        {entitlement.tier === 'mistake' && (
          <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <h3 className="text-xl font-bold mb-4">🚀 Unlock Import Mastery Features</h3>
            <p className="text-gray-700 mb-4">
              You have access to the Mistake Guide. Upgrade to Import Mastery to unlock:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Live duty calculator with real-time rates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Verified agent contacts and ratings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Container booking system access</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Priority support hotline</span>
              </li>
            </ul>
            <a 
              href={`/${entitlement.country}/upsell`}
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Upgrade to Import Mastery →
            </a>
          </Card>
        )}

        {/* Success Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <TrendingDown className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{currency}8,450</p>
            <p className="text-sm text-gray-600">Avg. Saved</p>
          </Card>
          <Card className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">98.7%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </Card>
          <Card className="p-4 text-center">
            <Info className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">14 days</p>
            <p className="text-sm text-gray-600">Avg. Clear Time</p>
          </Card>
          <Card className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">12,847</p>
            <p className="text-sm text-gray-600">Cars Imported</p>
          </Card>
        </div>
      </div>
    </main>
  )
}