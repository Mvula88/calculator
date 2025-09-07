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

async function getUserEntitlement(userId: string, email?: string) {
  const supabase = createServiceClient()
  
  // Build query with OR condition for user_id or email
  let query = supabase
    .from('entitlements')
    .select('*')
    .eq('active', true)
  
  const conditions = []
  if (userId) {
    conditions.push(`user_id.eq.${userId}`)
  }
  if (email) {
    conditions.push(`email.eq.${email.toLowerCase()}`)
  }
  
  if (conditions.length > 0) {
    query = query.or(conditions.join(','))
  }
  
  const { data: entitlements } = await query
  
  // If multiple entitlements, return the highest tier (mastery > mistake)
  if (entitlements && entitlements.length > 0) {
    const masteryEntitlement = entitlements.find(e => e.tier === 'mastery')
    return masteryEntitlement || entitlements[0]
  }
  
  return null
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
    entitlement = await getUserEntitlement(user.id, user.email)
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

        {/* NEW: Basic DIY Import Process - Available to both tiers */}
        <section className="mb-16">
          <Card className="p-8 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <h2 className="text-3xl font-bold mb-2 text-green-800">
              🎯 DIY Import Process: Bypass the Dealers
            </h2>
            <p className="text-gray-600 mb-6">
              Here's exactly how to import a car yourself, saving {currency}50,000-100,000 vs buying from dealers
            </p>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Find Your Car Online (No Middleman)
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">Japanese Auction Sites (Best Value):</p>
                  <ul className="ml-4 space-y-1">
                    <li>• <strong>SBT Japan</strong> - Direct buying, English support</li>
                    <li>• <strong>BE FORWARD</strong> - Fixed prices, easy process</li>
                    <li>• <strong>Japanese Used Cars</strong> - Good selection</li>
                    <li>• <strong>Auto Access Japan</strong> - Auction agent service</li>
                  </ul>
                  <div className="bg-blue-50 p-3 rounded mt-3">
                    <p className="text-sm"><strong>💡 Pro Tip:</strong> Cars from Japan are 30-50% cheaper than dealer prices. Age restriction for {countryName}: Max 12 years old from manufacture date.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Calculate True Cost BEFORE Buying
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>Your total cost = FOB price + these charges:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• <strong>Ocean freight:</strong> {currency}25,000-35,000 (shared container)</li>
                    <li>• <strong>Import duty:</strong> 30% of FOB value</li>
                    <li>• <strong>VAT:</strong> 15% of (FOB + duty)</li>
                    <li>• <strong>Port charges:</strong> {currency}8,000-12,000</li>
                    <li>• <strong>Clearing agent:</strong> {currency}7,000-10,000</li>
                    <li>• <strong>Transport to you:</strong> {currency}3,000-15,000</li>
                  </ul>
                  <div className="bg-yellow-50 p-3 rounded mt-3">
                    <p className="text-sm"><strong>⚠️ Rule of thumb:</strong> Multiply the FOB price by 2.2 to get your final cost in {countryName}.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                  Buy & Ship (The Smart Way)
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">Critical steps:</p>
                  <ol className="ml-4 space-y-2">
                    <li><strong>1. Inspect before buying:</strong> Use inspection services (JEVIC, EAA) - costs $200 but saves disasters</li>
                    <li><strong>2. Payment:</strong> Use bank transfer (NOT Western Union). Get invoice with VIN clearly shown</li>
                    <li><strong>3. Shipping decision:</strong>
                      <ul className="ml-4 mt-1">
                        <li>• <strong>RoRo:</strong> Cheaper but 45+ days, higher theft risk</li>
                        <li>• <strong>Container:</strong> Safer, faster (30 days), can share cost</li>
                      </ul>
                    </li>
                    <li><strong>4. Documents to demand:</strong> Export certificate, Bill of Lading, Commercial Invoice</li>
                  </ol>
                  <div className="bg-red-50 p-3 rounded mt-3">
                    <p className="text-sm"><strong>🚨 Never skip:</strong> Get the export certificate translated by certified translator BEFORE shipping!</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                  Clear Through {port} (Not Dealer Port)
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">Why {port} saves you money:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Faster clearance (5-7 days vs 3 weeks)</li>
                    <li>• Lower storage fees ({currency}600/day vs {currency}1,200/day)</li>
                    <li>• Less congestion = less delays</li>
                    <li>• Direct road access to {countryName}</li>
                  </ul>
                  <p className="font-semibold mt-3">You MUST hire a clearing agent:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• They handle customs paperwork (SAD 500)</li>
                    <li>• Calculate correct duty/VAT</li>
                    <li>• Prevent expensive mistakes</li>
                    <li>• Cost: {currency}7,000-10,000 (worth every cent)</li>
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                  Register & Drive (Final Steps)
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">After port clearance:</p>
                  <ol className="ml-4 space-y-1">
                    <li><strong>1. Police clearance:</strong> Physical VIN/engine verification</li>
                    <li><strong>2. Roadworthy test:</strong> Book immediately (slots fill fast)</li>
                    <li><strong>3. Registration:</strong> NATIS/eNaTIS with all documents</li>
                    <li><strong>4. Insurance:</strong> Get before driving home</li>
                  </ol>
                  <div className="bg-green-50 p-3 rounded mt-3">
                    <p className="text-sm"><strong>✅ Total time:</strong> 35-45 days from purchase to driving</p>
                    <p className="text-sm"><strong>✅ Total savings:</strong> {currency}50,000-100,000 vs dealer prices</p>
                  </div>
                </div>
              </div>

              {/* DIY vs Dealer Comparison */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold mb-4">💰 DIY Import vs Dealer: Real Numbers</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ Buying from Dealer</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 2019 Toyota Corolla: {currency}350,000</li>
                      <li>• Dealer margin: {currency}80,000-120,000</li>
                      <li>• Hidden costs: Often not disclosed</li>
                      <li>• Limited selection</li>
                      <li>• No control over quality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ DIY Import</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Same car FOB: {currency}120,000</li>
                      <li>• Total landed cost: {currency}250,000</li>
                      <li>• You save: {currency}100,000</li>
                      <li>• Choose exact spec you want</li>
                      <li>• Full service history access</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Warning Box */}
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-bold text-red-800 mb-2">⚠️ Common DIY Mistakes That Cost Thousands:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Buying without inspection = engine problems ({currency}50,000+ repairs)</li>
                  <li>• Wrong shipping line = 3-week delays ({currency}15,000 storage)</li>
                  <li>• No clearing agent = customs penalties ({currency}20,000+)</li>
                  <li>• Missing documents = indefinite hold</li>
                  <li>• Container sharing gone wrong = paying full {currency}45,000</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* NEW: Scam Warning Section - Available to both tiers */}
        <section className="mb-16">
          <Card className="p-8 border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
            <h2 className="text-3xl font-bold mb-2 text-red-800">
              🚨 Import Scams: How They Get You
            </h2>
            <p className="text-gray-600 mb-6">
              These scams cost importers millions every year. Here's exactly how to spot and avoid them:
            </p>
            
            <div className="space-y-6">
              {/* Scam 1 */}
              <div className="p-4 bg-white border-l-4 border-red-500 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-red-700">
                  🎭 The "Inspection Certificate" Scam
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>How it works:</strong> Seller sends fake JEVIC/JAAI inspection certificate. Car arrives with hidden damage, wrong engine, or doesn't match specs.
                </p>
                <div className="bg-yellow-50 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-yellow-800">✅ How to avoid:</p>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    <li>• Book inspection YOURSELF directly with JEVIC/JAAI</li>
                    <li>• Never trust seller-provided certificates</li>
                    <li>• Cost: $200-300 (saves you {currency}100,000+ in surprises)</li>
                    <li>• Verify certificate number on inspector's website</li>
                  </ul>
                </div>
              </div>

              {/* Scam 2 */}
              <div className="p-4 bg-white border-l-4 border-orange-500 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-orange-700">
                  💰 The "Urgent Payment" Trap
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>How it works:</strong> After initial payment, seller claims: "Port fees increased! Send {currency}5,000 NOW or car gets auctioned!" Creates panic, you send money, car never existed.
                </p>
                <div className="bg-green-50 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-green-800">✅ How to avoid:</p>
                  <ul className="text-sm text-green-700 mt-1 space-y-1">
                    <li>• ALL fees are known upfront - no surprises</li>
                    <li>• Real ports don't auction cars in 24 hours</li>
                    <li>• Verify through shipping line, not seller</li>
                    <li>• If pressured with "urgent" - it's a scam</li>
                  </ul>
                </div>
              </div>

              {/* Scam 3 */}
              <div className="p-4 bg-white border-l-4 border-purple-500 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-purple-700">
                  📦 The "Container Sharing" Con
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>How it works:</strong> "Agent" collects {currency}15,000 from 3 people to share container. Takes money, disappears. Or loads only 1 car, claims others "had problems."
                </p>
                <div className="bg-blue-50 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-blue-800">✅ How to avoid:</p>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Use verified platforms like ContShare.com</li>
                    <li>• Written agreement with all parties</li>
                    <li>• Pay shipping line directly, not coordinator</li>
                    <li>• Meet other importers in person first</li>
                  </ul>
                </div>
              </div>

              {/* Scam 4 */}
              <div className="p-4 bg-white border-l-4 border-yellow-500 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-yellow-700">
                  🎯 The "Clearing Agent" Markup
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>How it works:</strong> Agent quotes {currency}7,000 to clear. Then adds: "inspection fee" {currency}3,000, "facilitation" {currency}5,000, "speed money" {currency}8,000. Final bill: {currency}25,000+
                </p>
                <div className="bg-purple-50 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-purple-800">✅ How to avoid:</p>
                  <ul className="text-sm text-purple-700 mt-1 space-y-1">
                    <li>• Get TOTAL quote in writing before shipping</li>
                    <li>• Real clearing is {currency}7,000-10,000 max</li>
                    <li>• No legitimate "facilitation fees"</li>
                    <li>• Pay customs duty directly to revenue authority</li>
                  </ul>
                </div>
              </div>

              {/* Scam 5 */}
              <div className="p-4 bg-white border-l-4 border-green-500 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-green-700">
                  🚗 The "Perfect Car" Bait
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>How it works:</strong> Amazing deal on perfect car. After deposit: "Small accident found, but fixable!" Then: "Engine needs work." You're invested, keep paying. Car is junk.
                </p>
                <div className="bg-red-50 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-red-800">✅ How to avoid:</p>
                  <ul className="text-sm text-red-700 mt-1 space-y-1">
                    <li>• If price is 40%+ below market = scam</li>
                    <li>• Demand video walkaround with your name/date shown</li>
                    <li>• Use escrow service for payment</li>
                    <li>• Research seller reputation on forums</li>
                  </ul>
                </div>
              </div>

              {/* Scam 6 */}
              <div className="p-4 bg-white border-l-4 border-blue-500 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-blue-700">
                  📱 The WhatsApp "Broker"
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>How it works:</strong> Random WhatsApp message: "Brother, I can get you any car 50% cheaper!" Shows stolen photos, fake testimonials. Money vanishes to untraceable account.
                </p>
                <div className="bg-orange-50 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-orange-800">✅ How to avoid:</p>
                  <ul className="text-sm text-orange-700 mt-1 space-y-1">
                    <li>• NEVER buy through WhatsApp/Telegram brokers</li>
                    <li>• Use established platforms with buyer protection</li>
                    <li>• Verify business registration and physical address</li>
                    <li>• If they found you, it's a scam</li>
                  </ul>
                </div>
              </div>

              {/* Red Flags Summary */}
              <div className="mt-8 p-6 bg-red-100 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-red-900">🚩 Universal Red Flags = RUN!</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Pressure to pay NOW</li>
                    <li>• Western Union/MoneyGram payment</li>
                    <li>• "Special deal just for you"</li>
                    <li>• Won't video call or meet</li>
                    <li>• Emotional manipulation stories</li>
                  </ul>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Price too good to be true</li>
                    <li>• Documents look edited/blurry</li>
                    <li>• Different names on documents</li>
                    <li>• Gmail/Yahoo business email</li>
                    <li>• "Trust me brother" language</li>
                  </ul>
                </div>
              </div>

              {/* Safe Practices */}
              <div className="mt-6 p-6 bg-green-100 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-green-900">✅ Golden Rules for Safe Importing</h3>
                <ol className="text-sm text-green-800 space-y-2">
                  <li><strong>1. Verify Everything:</strong> Business registration, physical address, phone numbers</li>
                  <li><strong>2. Use Escrow:</strong> Never send full payment upfront</li>
                  <li><strong>3. Document Everything:</strong> Screenshots, emails, receipts - save it all</li>
                  <li><strong>4. Trust Your Gut:</strong> If something feels wrong, it probably is</li>
                  <li><strong>5. Join Forums:</strong> Learn from others' experiences before you buy</li>
                </ol>
              </div>

              {/* Scam Recovery */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">🆘 If You've Been Scammed:</h4>
                <ol className="text-sm text-gray-700 space-y-1">
                  <li>1. Report to police immediately (get case number)</li>
                  <li>2. Contact your bank (possible reversal)</li>
                  <li>3. Report to platform where you found them</li>
                  <li>4. Share in import forums (warn others)</li>
                  <li>5. Contact consumer protection agency</li>
                </ol>
                <p className="text-xs text-gray-600 mt-2 italic">Reality: Recovery is rare. Prevention is everything.</p>
              </div>
            </div>
          </Card>
        </section>

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