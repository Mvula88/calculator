-- ========================================================
-- QUERIES THAT MATCH YOUR ACTUAL TABLE STRUCTURE
-- ========================================================

-- 1. VIEW YOUR TABLE STRUCTURE (Already works!)
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'purchases'
ORDER BY ordinal_position;

-- 2. CHECK RECENT PURCHASES (Using your actual columns)
SELECT 
  COALESCE(p.purchased_at, p.created_at, NOW()) as purchase_date,
  p.product_type,
  p.amount,
  p.currency,
  p.status,
  p.stripe_session_id,
  u.email as user_email
FROM purchases p
LEFT JOIN auth.users u ON p.user_id = u.id
ORDER BY COALESCE(p.purchased_at, p.created_at) DESC
LIMIT 10;

-- 3. CHECK IF ANY USERS HAVE ACTIVE PURCHASES
SELECT 
  u.email,
  u.created_at as user_registered,
  COALESCE(p.purchased_at, p.created_at) as purchase_date,
  p.product_type,
  p.status,
  p.amount,
  p.currency
FROM auth.users u
INNER JOIN purchases p ON u.id = p.user_id
WHERE p.status = 'active' OR p.status IS NULL
ORDER BY COALESCE(p.purchased_at, p.created_at) DESC
LIMIT 10;

-- 4. COUNT STATISTICS
SELECT 
  'Platform Statistics' as report,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM purchases) as total_purchases,
  (SELECT COUNT(*) FROM purchases WHERE status = 'active' OR status IS NULL) as active_purchases,
  (SELECT COUNT(DISTINCT user_id) FROM purchases) as paying_users,
  (SELECT SUM(amount) FROM purchases WHERE status = 'active') as total_revenue_cents;

-- 5. CHECK RECENT STRIPE WEBHOOK EVENTS
SELECT 
  stripe_session_id,
  stripe_payment_intent,
  COALESCE(purchased_at, created_at) as date,
  amount,
  currency,
  status
FROM purchases
WHERE stripe_session_id IS NOT NULL
ORDER BY COALESCE(purchased_at, created_at) DESC
LIMIT 10;

-- 6. FIND USERS WITHOUT PURCHASES (might need help)
SELECT 
  u.id,
  u.email,
  u.created_at as registered
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id
WHERE p.id IS NULL
ORDER BY u.created_at DESC
LIMIT 10;

-- ========================================================
-- CREATE A TEST PURCHASE FOR A USER
-- ========================================================

-- First, get user IDs
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC
LIMIT 5;

-- Then create a test purchase (replace USER_ID with actual ID from above)
/*
INSERT INTO purchases (
  user_id,
  product_type,
  amount,
  purchased_at,
  stripe_session_id,
  stripe_payment_intent,
  currency,
  status,
  metadata
) VALUES (
  'USER_ID_HERE',  -- Replace with actual user ID
  'calculator_pro',
  149900,  -- N$1,499.00 in cents
  NOW(),
  'cs_test_' || gen_random_uuid(),
  'pi_test_' || gen_random_uuid(),
  'nad',
  'active',
  '{"test": true}'::jsonb
)
RETURNING *;
*/

-- ========================================================
-- FIX A USER WHO CAN'T ACCESS DASHBOARD
-- ========================================================

-- 1. Find the user
SELECT id, email FROM auth.users WHERE email = 'user@example.com'; -- Replace email

-- 2. Check if they have a purchase
SELECT * FROM purchases WHERE user_id = 'USER_ID_HERE'; -- Replace with ID from step 1

-- 3. If no purchase exists, create one
/*
INSERT INTO purchases (
  user_id,
  product_type,
  amount,
  purchased_at,
  currency,
  status
) VALUES (
  'USER_ID_HERE',  -- From step 1
  'calculator_pro',
  149900,
  NOW(),
  'nad',
  'active'
)
ON CONFLICT DO NOTHING
RETURNING *;
*/

-- ========================================================
-- CHECK FOR ISSUES
-- ========================================================

-- Check for duplicate purchases (should be none or few)
SELECT 
  user_id,
  COUNT(*) as purchase_count,
  STRING_AGG(status, ', ') as statuses
FROM purchases
GROUP BY user_id
HAVING COUNT(*) > 1;

-- Check for purchases without users (orphaned records)
SELECT 
  p.id as purchase_id,
  p.stripe_session_id,
  p.user_id,
  p.amount,
  p.status
FROM purchases p
LEFT JOIN auth.users u ON p.user_id = u.id
WHERE u.id IS NULL;

-- Check today's purchases
SELECT 
  COALESCE(purchased_at, created_at) as purchase_time,
  stripe_session_id,
  amount,
  currency,
  status
FROM purchases
WHERE DATE(COALESCE(purchased_at, created_at)) = CURRENT_DATE
ORDER BY COALESCE(purchased_at, created_at) DESC;

-- ========================================================
-- CLEANUP (BE CAREFUL!)
-- ========================================================

-- Remove test purchases only
/*
DELETE FROM purchases 
WHERE stripe_session_id LIKE 'cs_test_%'
   OR stripe_session_id LIKE 'pi_test_%'
   OR metadata->>'test' = 'true';
*/

-- ========================================================
-- FINAL CHECK: Can users access the platform?
-- ========================================================
SELECT 
  u.email,
  CASE 
    WHEN p.id IS NOT NULL THEN '✅ Has Access'
    ELSE '❌ No Access'
  END as access_status,
  p.status as purchase_status,
  p.amount as amount_paid,
  COALESCE(p.purchased_at, p.created_at) as purchase_date
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id AND (p.status = 'active' OR p.status IS NULL)
ORDER BY u.created_at DESC
LIMIT 20;