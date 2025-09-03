// Test script to verify Stripe webhook is working
// Run this after setting up your webhook

const testWebhook = async () => {
  console.log('🧪 Testing Stripe Webhook Integration\n');
  
  // Your webhook endpoint
  const webhookUrl = 'https://calculator-six-omega-56.vercel.app/api/stripe/webhook';
  
  console.log('📍 Webhook Endpoint:', webhookUrl);
  console.log('\n✅ Your webhook is configured correctly if you see events in:');
  console.log('   1. Stripe Dashboard → Developers → Webhooks → Your endpoint → "Webhook attempts"');
  console.log('   2. Vercel Functions logs (when a real payment is made)');
  
  console.log('\n📝 Quick Checklist:');
  console.log('   [ ] Endpoint URL added to Stripe');
  console.log('   [ ] Events selected (checkout.session.completed, etc.)');
  console.log('   [ ] Webhook secret copied to Vercel env vars');
  console.log('   [ ] STRIPE_WEBHOOK_SECRET added to Vercel');
  
  console.log('\n🎯 Test Payment Flow:');
  console.log('   1. Go to your site: https://calculator-six-omega-56.vercel.app');
  console.log('   2. Register a test account');
  console.log('   3. Use test card: 4242 4242 4242 4242');
  console.log('   4. Check Stripe Dashboard for webhook delivery');
};

testWebhook();