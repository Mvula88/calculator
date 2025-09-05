// Manual script to create an entitlement for testing
// Run with: node scripts/create-test-entitlement.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role to bypass RLS
)

async function createTestEntitlement() {
  const email = 'ismaelmvula@gmail.com' // Your email
  const userId = 'b565587a-6298-45f1-ad24-049ad4dc12bf' // Your user ID
  
  console.log('Creating entitlement for:', { email, userId })
  
  // First, check if entitlement already exists
  const { data: existing, error: checkError } = await supabase
    .from('entitlements')
    .select('*')
    .eq('email', email.toLowerCase())
    .single()
  
  if (existing) {
    console.log('Entitlement already exists:', existing)
    
    // Update it to be active
    const { data: updated, error: updateError } = await supabase
      .from('entitlements')
      .update({ 
        active: true,
        user_id: userId // Make sure user_id is set
      })
      .eq('email', email.toLowerCase())
      .select()
    
    if (updateError) {
      console.error('Error updating entitlement:', updateError)
    } else {
      console.log('Entitlement updated:', updated)
    }
  } else {
    // Create new entitlement
    const { data: created, error: createError } = await supabase
      .from('entitlements')
      .insert({
        user_id: userId,
        email: email.toLowerCase(),
        country: 'na', // Namibia
        tier: 'mistake', // The tier you purchased
        stripe_payment_intent_id: 'manual_test_' + Date.now(),
        active: true
      })
      .select()
    
    if (createError) {
      console.error('Error creating entitlement:', createError)
    } else {
      console.log('Entitlement created:', created)
    }
  }
  
  // Verify it exists
  const { data: final, error: finalError } = await supabase
    .from('entitlements')
    .select('*')
    .eq('email', email.toLowerCase())
  
  console.log('\nFinal entitlements for this email:', final)
}

createTestEntitlement().catch(console.error)