-- ========================================================
-- EMERGENCY FIX FOR USERS WHO PAID BUT CAN'T ACCESS
-- ========================================================

-- STEP 1: Find all users and their purchase status
SELECT 
  u.id,
  u.email,
  u.created_at as registered,
  p.id as purchase_id,
  p.status as purchase_status,
  p.purchased_at,
  p.stripe_session_id,
  CASE 
    WHEN p.id IS NOT NULL THEN '✅ Should have access'
    ELSE '❌ No purchase found'
  END as access_status
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id
ORDER BY u.created_at DESC;

-- STEP 2: Check for users who registered recently but have no purchase
SELECT 
  u.id,
  u.email,
  u.created_at as registered,
  EXTRACT(EPOCH FROM (NOW() - u.created_at))/60 as minutes_since_registration
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id
WHERE p.id IS NULL
  AND u.created_at > NOW() - INTERVAL '24 hours'
ORDER BY u.created_at DESC;

-- STEP 3: Check Stripe webhook events (if you see successful payments in Stripe but no purchase records)
-- Look for orphaned Stripe sessions
SELECT 
  stripe_session_id,
  user_id,
  purchased_at,
  status,
  amount
FROM purchases
WHERE stripe_session_id IS NOT NULL
ORDER BY purchased_at DESC
LIMIT 20;

-- ========================================================
-- MANUAL FIX OPTIONS
-- ========================================================

-- OPTION 1: If you KNOW a user paid (check Stripe dashboard)
-- Replace email with actual user email
/*
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get user ID
  SELECT id INTO v_user_id 
  FROM auth.users 
  WHERE email = 'user@example.com'; -- REPLACE WITH ACTUAL EMAIL
  
  -- Create purchase if doesn't exist
  INSERT INTO purchases (
    user_id,
    product_type,
    amount,
    currency,
    status,
    purchased_at,
    stripe_session_id,
    metadata
  ) VALUES (
    v_user_id,
    'calculator_pro',
    149900,
    'nad',
    'active',
    NOW(),
    'manual_' || gen_random_uuid(),
    '{"note": "Manually created after payment verification"}'::jsonb
  )
  ON CONFLICT (stripe_session_id) DO NOTHING;
  
  RAISE NOTICE 'Purchase created for user %', v_user_id;
END $$;
*/

-- OPTION 2: Bulk fix - Create purchases for ALL users (DANGEROUS - only for testing)
/*
INSERT INTO purchases (user_id, product_type, amount, currency, status, purchased_at)
SELECT 
  u.id,
  'calculator_pro',
  149900,
  'nad',
  'active',
  NOW()
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id
WHERE p.id IS NULL;
*/

-- OPTION 3: Fix specific user by email
/*
INSERT INTO purchases (
  user_id,
  product_type,
  amount,
  currency,
  status,
  purchased_at
)
SELECT 
  id,
  'calculator_pro',
  149900,
  'nad',
  'active',
  NOW()
FROM auth.users
WHERE email = 'specific@email.com' -- REPLACE WITH ACTUAL EMAIL
  AND NOT EXISTS (
    SELECT 1 FROM purchases WHERE user_id = auth.users.id
  );
*/

-- ========================================================
-- VERIFICATION AFTER FIX
-- ========================================================

-- Check if fix worked
SELECT 
  u.email,
  p.id as purchase_id,
  p.status,
  p.purchased_at,
  CASE 
    WHEN p.id IS NOT NULL THEN '✅ Fixed - User has access'
    ELSE '❌ Still no access'
  END as status
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id
WHERE u.email IN ('user@example.com'); -- Add emails to check

-- ========================================================
-- CLEAR COOKIES INSTRUCTION FOR USER
-- ========================================================
/*
After running the fix, tell the user to:

1. Clear browser cookies for the site
2. Log out and log back in
3. Or open the site in incognito/private mode

This ensures old middleware cookies don't interfere.
*/