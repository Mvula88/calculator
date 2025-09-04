# Quick Test Guide for Auth & Payment

## Step-by-Step Testing Process

### 1. Test User Registration
```
1. Open browser in incognito mode
2. Go to: https://calculator-six-omega-56.vercel.app/auth/register
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Phone: +264 81 234 5678
   - Password: test123
4. Click "Continue to Payment"
5. ✅ Should redirect to /checkout page
```

### 2. Test Payment Flow
```
1. On checkout page, verify:
   - Price shows correctly (N$1,499 or local currency)
   - "Pay Now" button is visible
2. Click "Pay Now"
3. ✅ Should redirect to Stripe checkout
4. Use test card: 4242 4242 4242 4242
   - Expiry: 12/25
   - CVC: 123
5. Complete payment
6. ✅ Should redirect to /dashboard?payment=success
```

### 3. Verify Dashboard Access
```
1. Check dashboard shows:
   - Success message (green alert)
   - "FULL ACCESS" badge
   - Calculator button works
2. Navigate to /calculator
3. ✅ Should have full access (no redirect to pricing)
```

## Quick Fixes for Common Problems

### Problem: "Unauthorized" error at checkout
```sql
-- Run in Supabase SQL Editor
-- Get your user ID first
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'your-email@example.com';

-- Note the ID and continue to next step
```

### Problem: Can't access dashboard after payment
```sql
-- Manually create purchase record (replace YOUR_USER_ID)
INSERT INTO purchases (
  user_id,
  product_type,
  amount,
  currency,
  status,
  stripe_session_id
) VALUES (
  'YOUR_USER_ID',  -- From query above
  'calculator_pro',
  149900,
  'nad',
  'active',
  'manual_test_' || gen_random_uuid()
);

-- Verify it worked
SELECT * FROM purchases WHERE user_id = 'YOUR_USER_ID';
```

### Problem: Keep getting redirected to pricing
```javascript
// The issue is middleware checking for purchase
// Temporary fix: Clear cookies and try again
// Or wait 60 seconds for grace period to expire
```

## Test Cleanup

### Remove Test Data
```sql
-- Delete test purchases
DELETE FROM purchases 
WHERE stripe_session_id LIKE 'manual_test_%'
OR stripe_session_id LIKE 'test_%';

-- Delete test calculations
DELETE FROM calculations 
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email LIKE 'test%@example.com'
);

-- Delete test users (this also deletes their purchases/calculations)
DELETE FROM auth.users 
WHERE email LIKE 'test%@example.com';
```

## Verification Checklist

- [ ] Can create new account
- [ ] Redirects to checkout after registration  
- [ ] Checkout page shows correct price
- [ ] Stripe payment works with test card
- [ ] Redirects to dashboard after payment
- [ ] Dashboard shows success message
- [ ] Can access calculator without redirect
- [ ] Purchase record exists in database

## Environment Check

Run this to verify your setup:

```sql
-- Check if tables exist
SELECT 
  table_name,
  CASE 
    WHEN table_name = 'purchases' THEN '✅ Payment tracking ready'
    WHEN table_name = 'calculations' THEN '✅ Calculator storage ready'
  END as status
FROM information_schema.tables
WHERE table_schema = 'public' 
AND table_name IN ('purchases', 'calculations');

-- Check if you have any successful purchases
SELECT 
  COUNT(*) as total_purchases,
  COUNT(DISTINCT user_id) as unique_users
FROM purchases
WHERE status = 'active';

-- Check recent purchase attempts
SELECT 
  created_at,
  product_type,
  amount,
  currency,
  status
FROM purchases
ORDER BY created_at DESC
LIMIT 5;
```

## Live Testing URL
Test the production site: https://calculator-six-omega-56.vercel.app

## Test Credentials for Stripe
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any valid ZIP (e.g., `10001`)