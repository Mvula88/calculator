import { createClient, createServiceClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lock, Users, Calculator, Globe, AlertTriangle, Star, ExternalLink, Shield, DollarSign, Ship, CheckCircle } from 'lucide-react'
import UpgradeButton from './upgrade-button'

async function getUserEntitlement(userId: string, email?: string) {
  const supabase = createServiceClient()
  
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

export default async function PortalMasteryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let entitlement = null
  let userEmail = null
  
  if (user) {
    entitlement = await getUserEntitlement(user.id, user.email)
    userEmail = user.email
  } else {
    entitlement = await getSessionEntitlement()
    userEmail = entitlement?.email
  }
  
  if (!user && !entitlement) {
    redirect('/auth/login?redirect=/portal/mastery')
  }
  
  if (!entitlement || entitlement.tier !== 'mastery') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8 text-center">
          <Lock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Import Mastery Required</h2>
          <p className="text-gray-600 mb-4">
            This section is exclusive to Import Mastery members. Upgrade to access premium tools and resources.
          </p>
          <UpgradeButton 
            userEmail={userEmail} 
            country={entitlement?.country || 'na'} 
          />
        </Card>
      </div>
    )
  }

  const currency = entitlement.country === 'na' ? 'N$' :
                   entitlement.country === 'za' ? 'R' :
                   entitlement.country === 'bw' ? 'P' :
                   entitlement.country === 'zm' ? 'K' : 'N$'
  
  const countryName = entitlement.country === 'na' ? 'Namibia' :
                     entitlement.country === 'za' ? 'South Africa' :
                     entitlement.country === 'bw' ? 'Botswana' :
                     entitlement.country === 'zm' ? 'Zambia' : 'Namibia'

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Import Mastery Suite</h1>
              <p className="text-gray-600 mt-2">Exclusive tools and resources for serious importers</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <Shield className="h-4 w-4" />
              <span>Licensed to: {userEmail}</span>
            </div>
          </div>
        </div>

        {/* Service Provider Directory */}
        <section className="mb-12">
          <Card className="p-8 border-2 border-purple-200">
            <h2 className="text-2xl font-bold mb-6 text-purple-800">
              <Users className="inline h-6 w-6 mr-2" />
              Verified Service Provider Directory
            </h2>
            <p className="text-gray-600 mb-6">
              Pre-vetted, reliable service providers with negotiated rates for IMPOTA members
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Clearing Agents */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg mb-3">🏢 Clearing Agents</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold">Swift Clear Logistics</h4>
                    <p className="text-sm text-gray-600">Walvis Bay specialist</p>
                    <p className="text-sm">Rate: {currency}7,500 (IMPOTA rate)</p>
                    <p className="text-sm">Contact: +264 61 123 4567</p>
                    <p className="text-xs text-green-600">✓ 5-day average clearance</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold">Pro Import Services</h4>
                    <p className="text-sm text-gray-600">Handles Japan docs</p>
                    <p className="text-sm">Rate: {currency}8,000 (includes translation)</p>
                    <p className="text-sm">Contact: +264 61 234 5678</p>
                    <p className="text-xs text-green-600">✓ JEVIC certified partner</p>
                  </div>
                </div>
              </div>

              {/* Shipping Lines */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg mb-3">🚢 Shipping Lines</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold">Mitsui O.S.K. Lines (MOL)</h4>
                    <p className="text-sm text-gray-600">Direct Japan-Walvis Bay</p>
                    <p className="text-sm">Container: {currency}32,000 (negotiated)</p>
                    <p className="text-sm">Transit: 28-32 days</p>
                    <p className="text-xs text-blue-600">✓ Best for container sharing</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold">NYK Line</h4>
                    <p className="text-sm text-gray-600">RoRo specialist</p>
                    <p className="text-sm">RoRo: {currency}18,000-22,000</p>
                    <p className="text-sm">Transit: 35-40 days</p>
                    <p className="text-xs text-blue-600">✓ Handles oversized vehicles</p>
                  </div>
                </div>
              </div>

              {/* Transport Companies */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-bold text-lg mb-3">🚚 Transport Companies</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold">Cross Border Logistics</h4>
                    <p className="text-sm text-gray-600">Walvis Bay to {countryName}</p>
                    <p className="text-sm">Rate: {currency}12/km (bulk discount)</p>
                    <p className="text-sm">Contact: +264 81 345 6789</p>
                    <p className="text-xs text-green-600">✓ GPS tracking included</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold">SafeHaul Transport</h4>
                    <p className="text-sm text-gray-600">Insured car carriers</p>
                    <p className="text-sm">Rate: {currency}15/km (premium)</p>
                    <p className="text-sm">Contact: +264 81 456 7890</p>
                    <p className="text-xs text-green-600">✓ Full insurance coverage</p>
                  </div>
                </div>
              </div>

              {/* Inspection Services */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-bold text-lg mb-3">🔍 Pre-Purchase Inspection</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold">JEVIC</h4>
                    <p className="text-sm text-gray-600">Official inspection</p>
                    <p className="text-sm">Cost: $250-350</p>
                    <p className="text-sm">Report: 48 hours</p>
                    <p className="text-xs text-purple-600">✓ Required for some imports</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold">EAA Co. Ltd</h4>
                    <p className="text-sm text-gray-600">Detailed inspection</p>
                    <p className="text-sm">Cost: $200-300</p>
                    <p className="text-sm">Report: 24-48 hours</p>
                    <p className="text-xs text-purple-600">✓ Video inspection available</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important:</strong> Always verify current rates and availability. IMPOTA negotiated rates require mentioning your membership.
              </p>
            </div>
          </Card>
        </section>

        {/* Auction Site Mastery Guide */}
        <section className="mb-12">
          <Card className="p-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold mb-6 text-green-800">
              <Globe className="inline h-6 w-6 mr-2" />
              Japanese Auction Site Mastery
            </h2>
            <p className="text-gray-600 mb-6">
              Advanced strategies for buying directly from Japanese auctions
            </p>
            
            <div className="space-y-6">
              {/* Auction Grading */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">📊 Understanding Auction Grades</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Grade System:</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>S:</strong> Brand new / Nearly new</li>
                      <li><strong>6:</strong> Extremely low mileage, mint</li>
                      <li><strong>5:</strong> Excellent, minimal wear</li>
                      <li><strong>4.5:</strong> Very good, light use</li>
                      <li><strong>4:</strong> Good, normal wear</li>
                      <li><strong>3.5:</strong> Average, visible wear</li>
                      <li><strong>3:</strong> Below average</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Interior Grades:</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>A:</strong> Like new</li>
                      <li><strong>B:</strong> Clean, minimal wear</li>
                      <li><strong>C:</strong> Average wear</li>
                      <li><strong>D:</strong> Poor condition</li>
                    </ul>
                    <p className="text-xs text-green-700 mt-2">
                      💡 Tip: Grade 4/B is sweet spot for value
                    </p>
                  </div>
                </div>
              </div>

              {/* Auction Timing */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">⏰ Best Times to Buy</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Seasonal Patterns:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>March-April:</strong> Financial year-end deals</li>
                      <li>• <strong>September:</strong> Model year clearance</li>
                      <li>• <strong>December:</strong> Year-end inventory clear</li>
                      <li>• <strong>Golden Week:</strong> Avoid (May holidays)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Weekly Patterns:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Tuesday:</strong> Most inventory</li>
                      <li>• <strong>Thursday:</strong> Best deals</li>
                      <li>• <strong>Friday:</strong> Higher competition</li>
                      <li>• <strong>Monday:</strong> Leftover bargains</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bidding Strategies */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">🎯 Smart Bidding Tactics</h3>
                <ol className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-bold">1.</span>
                    <div>
                      <strong>Set hard limit:</strong> Calculate total landed cost first. Max bid = (Budget ÷ 2.2) - shipping
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">2.</span>
                    <div>
                      <strong>Check auction history:</strong> Same model's selling prices over last 30 days
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">3.</span>
                    <div>
                      <strong>Avoid emotion:</strong> Lost auction = saved mistake. Another car comes tomorrow
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">4.</span>
                    <div>
                      <strong>USS auction sheets:</strong> Learn to read them - shows all damage/repairs
                    </div>
                  </li>
                </ol>
              </div>

              {/* Platform Comparison */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">🌐 Platform Comparison</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Direct Purchase Sites:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>SBT Japan:</strong> Fixed prices, beginner-friendly, English support</li>
                      <li>• <strong>BE FORWARD:</strong> Large inventory, negotiable prices</li>
                      <li>• <strong>Japan Partner:</strong> Good for parts and accessories</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">Auction Access (Need Agent):</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>USS Auctions:</strong> Largest, best selection (150,000+ weekly)</li>
                      <li>• <strong>JAA:</strong> Good for luxury/sports cars</li>
                      <li>• <strong>TAA:</strong> Toyota specialist auctions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Container Sharing Education */}
        <section className="mb-12">
          <Card className="p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">
              <Ship className="inline h-6 w-6 mr-2" />
              Container Sharing: Save {currency}30,000+
            </h2>
            <p className="text-gray-600 mb-6">
              Split shipping costs with other importers - when done right
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">✅ How It Works:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 40ft container fits 4-6 cars</li>
                  <li>• Cost: {currency}45,000 total</li>
                  <li>• Split 3 ways = {currency}15,000 each</li>
                  <li>• Save {currency}30,000 vs solo shipping</li>
                </ul>
                
                <div className="mt-4 p-4 bg-green-50 rounded">
                  <h4 className="font-semibold mb-2">Verified Platform:</h4>
                  <a 
                    href="https://contshare.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    ContShare.com
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <p className="text-xs text-gray-600 mt-1">
                    Safe container sharing with escrow protection
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">⚠️ Critical Rules:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Written agreement BEFORE payment</li>
                  <li>• All parties on Bill of Lading</li>
                  <li>• Agree unpacking location upfront</li>
                  <li>• Escrow payment protection</li>
                  <li>• Insurance for each vehicle</li>
                </ul>
                
                <div className="mt-4 p-4 bg-red-50 rounded">
                  <h4 className="font-semibold mb-2 text-red-700">Never:</h4>
                  <ul className="text-xs text-red-600 space-y-1">
                    <li>• Pay coordinator directly</li>
                    <li>• Share without contract</li>
                    <li>• Accept verbal agreements</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>


        {/* Success Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full">
            <Star className="h-5 w-5" />
            <span className="font-semibold">You're an Import Mastery Member</span>
            <Star className="h-5 w-5" />
          </div>
        </div>
      </div>
    </main>
  )
}