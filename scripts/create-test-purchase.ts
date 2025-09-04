// Script to create a test purchase record for development
// Run with: npx tsx scripts/create-test-purchase.ts

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function createTestPurchase() {
  // First, sign in or create a test user
  const testEmail = 'testuser@gmail.com'
  const testPassword = 'TestPassword123!'
  
  // Try to sign in first
  let { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  })
  
  // If sign in fails, try to create a new user (but might be rate limited)
  if (signInError) {
    if (signInError.message.includes('Invalid login credentials')) {
      console.log('Creating new test user...')
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      })
      
      if (signUpError) {
        console.error('Error creating test user:', signUpError)
        console.log('\nTry again in 30 seconds if rate limited.')
        return
      }
      
      // Use signUpData directly instead of reassigning
      if (!signUpData?.user) {
        console.error('No user data from signup')
        return
      }
      authData = { user: signUpData.user, session: signUpData.session }
    } else {
      console.error('Sign in error:', signInError)
      return
    }
  }
  
  if (!authData?.user) {
    console.error('No user data available')
    return
  }
  
  console.log('User authenticated:', authData.user.email)
  
  // Check if purchase already exists
  const { data: existingPurchase } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', authData.user.id)
    .eq('product_type', 'calculator_pro')
    .single()
  
  if (existingPurchase) {
    console.log('✅ Purchase record already exists for this user')
    console.log('You can now access the dashboard at: http://localhost:3003/dashboard')
    console.log('Login with:', testEmail, '/', testPassword)
    return
  }
  
  // Create a purchase record
  const { data: purchase, error: purchaseError } = await supabase
    .from('purchases')
    .insert({
      user_id: authData.user.id,
      product_type: 'calculator_pro',
      amount: 1499,
      stripe_payment_id: 'test_payment_' + Date.now(),
      stripe_customer_id: 'test_customer_' + Date.now(),
      status: 'completed'
    })
    .select()
    .single()
  
  if (purchaseError) {
    console.error('Error creating purchase:', purchaseError)
    return
  }
  
  console.log('✅ Test purchase created successfully!')
  console.log('Purchase ID:', purchase.id)
  console.log('\n📝 Test credentials:')
  console.log('Email:', testEmail)
  console.log('Password:', testPassword)
  console.log('\n🚀 You can now access the dashboard at: http://localhost:3003/dashboard')
}

createTestPurchase().catch(console.error)