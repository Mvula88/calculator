# Complete Authentication & Payment Setup Guide

## Overview of the Flow
1. User signs up → 2. Redirected to checkout → 3. Pays via Stripe → 4. Gets access to dashboard

## Part 1: Supabase Setup

### Step 1.1: Database Tables
Run this SQL in Supabase SQL Editor to create/fix all tables:

```sql
-- Drop and recreate tables cleanly (WARNING: This will delete existing data)
-- Comment out the DROP commands if you want to keep existing data

-- DROP TABLE IF EXISTS purchases CASCADE;
-- DROP TABLE IF EXISTS calculations CASCADE;

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL DEFAULT 'calculator_pro',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'nad',
  status TEXT DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create calculations table
CREATE TABLE IF NOT EXISTS calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_description TEXT,
  vehicle_type TEXT,
  purchase_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NAD',
  total_cost DECIMAL(10, 2),
  total_hidden_costs DECIMAL(10, 2),
  country_code TEXT DEFAULT 'NA',
  calculation_data JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id);

-- Enable Row Level Security
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view own purchases" ON purchases;
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage purchases" ON purchases;
CREATE POLICY "Service role can manage purchases" ON purchases
  FOR ALL USING (true);

DROP POLICY IF EXISTS "Users can manage own calculations" ON calculations;
CREATE POLICY "Users can manage own calculations" ON calculations
  FOR ALL USING (auth.uid() = user_id);
```

### Step 1.2: Verify Tables
Run this to check:
```sql
SELECT table_name, 
       (SELECT COUNT(*) FROM information_schema.columns 
        WHERE columns.table_name = tables.table_name) as column_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('purchases', 'calculations');
```

## Part 2: Environment Variables (.env.local)

Make sure all these are set correctly:

```env
# Supabase (get from Supabase dashboard > Settings > API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (get from Stripe dashboard)
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App URL (change for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # For local testing
# NEXT_PUBLIC_APP_URL=https://calculator-six-omega-56.vercel.app  # For production
```

## Part 3: Stripe Setup

### Step 3.1: Create Webhook Endpoint
1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint:
   - **Endpoint URL**: `https://your-domain.vercel.app/api/stripe/webhook`
   - **Events to listen**: 
     - `checkout.session.completed`
     - `payment_intent.succeeded`
3. Copy the webhook secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### Step 3.2: Test Webhook Locally (Optional)
```bash
# Install Stripe CLI
# Then run:
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Part 4: Authentication Flow

### User Registration Flow:
1. **Register Page** (`/auth/register`)
   - User enters: name, email, phone, password
   - Creates Supabase auth account
   - Redirects to `/checkout`

2. **Checkout Page** (`/checkout`)
   - Shows order summary
   - User clicks "Pay Now"
   - Creates Stripe checkout session
   - Redirects to Stripe

3. **Stripe Payment**
   - User enters card details
   - On success: redirects to `/dashboard?payment=success`
   - On cancel: redirects to `/pricing?payment=cancelled`

4. **Dashboard** (`/dashboard`)
   - Shows success message
   - Webhook creates purchase record
   - User has full access

## Part 5: Testing the Flow

### Step 5.1: Test Registration
1. Go to `/auth/register`
2. Create a new account
3. Should redirect to `/checkout`

### Step 5.2: Test Payment
Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date, any CVC

### Step 5.3: Verify Purchase Record
Check in Supabase:
```sql
SELECT * FROM purchases ORDER BY created_at DESC LIMIT 5;
```

## Part 6: Common Issues & Fixes

### Issue 1: "Unauthorized" after payment
**Fix**: The webhook hasn't created the purchase yet. We have a 60-second grace period.

### Issue 2: Redirect to pricing instead of dashboard
**Fix**: Check middleware bypass for `?payment=success`

### Issue 3: No purchase record created
**Fix**: Check webhook logs in Stripe dashboard

### Issue 4: Can't access dashboard
**Fix**: Manually create purchase record:
```sql
INSERT INTO purchases (user_id, product_type, amount, currency, status)
VALUES (
  'your-user-id-from-auth-users',
  'calculator_pro',
  149900,
  'nad',
  'active'
);
```

## Part 7: Production Deployment Checklist

- [ ] Update `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Set all environment variables in Vercel
- [ ] Create production webhook in Stripe
- [ ] Update webhook secret for production
- [ ] Switch to Stripe live keys (when ready)
- [ ] Test complete flow in production with test mode
- [ ] Enable Stripe live mode

## Part 8: Quick Test Script

Create a test user with purchase (for development):

```sql
-- Get a user ID from auth.users
SELECT id, email FROM auth.users LIMIT 5;

-- Create a purchase for testing (replace USER_ID)
INSERT INTO purchases (
  user_id,
  product_type,
  stripe_session_id,
  amount,
  currency,
  status
) VALUES (
  'USER_ID_HERE',
  'calculator_pro',
  'test_session_' || gen_random_uuid(),
  149900,
  'nad',
  'active'
);
```

## Part 9: Monitoring

### Check Payment Flow:
1. **Stripe Dashboard** > Payments (see all transactions)
2. **Stripe Dashboard** > Developers > Webhooks (see webhook logs)
3. **Supabase Dashboard** > Table Editor > purchases (see records)
4. **Vercel Dashboard** > Functions > Logs (see API logs)

## Support Contact
If you're stuck, check:
1. Browser console for errors
2. Network tab for API failures
3. Stripe webhook logs
4. Vercel function logs