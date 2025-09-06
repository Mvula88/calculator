// Script to check if entitlement was created
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkEntitlements() {
  console.log('Checking recent entitlements...\n')
  
  const { data: entitlements, error } = await supabase
    .from('entitlements')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  
  if (error) {
    console.error('Error fetching entitlements:', error)
    return
  }
  
  if (!entitlements || entitlements.length === 0) {
    console.log('No entitlements found in database')
    console.log('\nPossible issues:')
    console.log('1. Webhook not configured in Stripe')
    console.log('2. Webhook endpoint not working')
    console.log('3. Database table not created')
    return
  }
  
  console.log(`Found ${entitlements.length} recent entitlement(s):\n`)
  
  entitlements.forEach((ent, index) => {
    console.log(`${index + 1}. Entitlement #${ent.id}`)
    console.log(`   Email: ${ent.email}`)
    console.log(`   Tier: ${ent.tier}`)
    console.log(`   Country: ${ent.country}`)
    console.log(`   Active: ${ent.active}`)
    console.log(`   Created: ${new Date(ent.created_at).toLocaleString()}`)
    console.log(`   Stripe Session: ${ent.stripe_session_id}`)
    console.log('---')
  })
}

checkEntitlements()