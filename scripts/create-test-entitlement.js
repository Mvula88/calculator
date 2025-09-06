// Script to create a test entitlement for development
// Run with: node scripts/create-test-entitlement.js <email>

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTestEntitlement(email) {
  if (!email) {
    console.error('Please provide an email address')
    console.log('Usage: node scripts/create-test-entitlement.js <email>')
    process.exit(1)
  }

  try {
    // First check if user exists
    const { data: users } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    const userId = users?.id || null

    // Create entitlement
    const { data, error } = await supabase
      .from('entitlements')
      .insert({
        user_id: userId,
        email: email.toLowerCase(),
        tier: 'mastery', // Give full access for testing
        country: 'na',
        active: true,
        stripe_session_id: `test_${Date.now()}`,
        amount_paid: 299900, // $2999 in cents
        currency: 'nad'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating entitlement:', error)
      process.exit(1)
    }

    console.log('✅ Test entitlement created successfully!')
    console.log('Email:', email)
    console.log('Tier: mastery')
    console.log('Country: na (Namibia)')
    console.log('Entitlement ID:', data.id)
    console.log('\nUser can now access /portal and /portal/guide')

  } catch (error) {
    console.error('Failed to create entitlement:', error)
    process.exit(1)
  }
}

const email = process.argv[2]
createTestEntitlement(email)