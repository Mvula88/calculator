-- ========================================================
-- VERIFICATION AND TESTING QUERIES
-- Run these in Supabase SQL Editor to check your setup
-- ========================================================

-- 1. CHECK IF TABLES EXIST AND COUNT COLUMNS
SELECT 
  t.table_name,
  COUNT(c.column_name) as column_count,
  CASE 
    WHEN t.table_name = 'purchases' THEN '✅ Payment tracking table'
    WHEN t.table_name = 'calculations' THEN '✅ Calculator storage table'
  END as description
FROM information_schema.tables t
LEFT JOIN information_schema.columns c 
  ON t.table_name = c.table_name 
  AND t.table_schema = c.table_schema
WHERE t.table_schema = 'public' 
  AND t.table_name IN ('purchases', 'calculations')
GROUP BY t.table_name
ORDER BY t.table_name;

-- 2. CHECK RECENT PURCHASES (Last 5)
SELECT 
  p.created_at,
  p.product_type,
  p.amount,
  p.currency,
  p.status,
  p.stripe_session_id,
  u.email as user_email
FROM purchases p
LEFT JOIN auth.users u ON p.user_id = u.id
ORDER BY p.created_at DESC
LIMIT 5;

-- 3. CHECK IF ANY USERS HAVE ACTIVE PURCHASES
SELECT 
  u.email,
  u.created_at as user_registered,
  p.created_at as purchase_date,
  p.product_type,
  p.status
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id
WHERE p.status = 'active'
ORDER BY p.created_at DESC
LIMIT 10;

-- 4. COUNT STATISTICS
SELECT 
  'Statistics' as report,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM purchases) as total_purchases,
  (SELECT COUNT(*) FROM purchases WHERE status = 'active') as active_purchases,
  (SELECT COUNT(*) FROM calculations) as saved_calculations;

-- 5. CHECK PURCHASE TABLE STRUCTURE
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'purchases'
ORDER BY ordinal_position;

-- ========================================================
-- MANUAL TEST: Create a test purchase for development
-- ========================================================

-- First, get a user ID to test with
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC
LIMIT 5;

-- Then create a test purchase (replace USER_ID_HERE with actual ID from above)
/*
INSERT INTO purchases (
  user_id,
  product_type,
  stripe_session_id,
  stripe_payment_intent,
  amount,
  currency,
  status,
  metadata
) VALUES (
  'USER_ID_HERE',  -- Replace with actual user ID
  'calculator_pro',
  'cs_test_manual_' || gen_random_uuid(),
  'pi_test_manual_' || gen_random_uuid(),
  149900,  -- Amount in cents (N$1,499.00)
  'nad',
  'active',
  '{"note": "Manual test purchase for development"}'::jsonb
);
*/

-- 6. VERIFY WEBHOOKS ARE CREATING PURCHASES
-- Check for recent Stripe session IDs
SELECT 
  stripe_session_id,
  created_at,
  amount,
  currency,
  status
FROM purchases
WHERE stripe_session_id LIKE 'cs_%'
ORDER BY created_at DESC
LIMIT 5;

-- 7. CHECK FOR DUPLICATE PURCHASES (Should be none)
SELECT 
  user_id,
  product_type,
  COUNT(*) as purchase_count
FROM purchases
WHERE status = 'active'
GROUP BY user_id, product_type
HAVING COUNT(*) > 1;

-- 8. FIX: If user can't access dashboard after payment
-- Find their user ID first
SELECT id, email FROM auth.users WHERE email = 'user@example.com'; -- Replace with actual email

-- Then manually create purchase (uncomment and update USER_ID)
/*
INSERT INTO purchases (
  user_id,
  product_type,
  stripe_session_id,
  amount,
  currency,
  status
) VALUES (
  'USER_ID_HERE',  -- From query above
  'calculator_pro',
  'manual_fix_' || gen_random_uuid(),
  149900,
  'nad',
  'active'
);
*/

-- 9. CHECK ROW LEVEL SECURITY STATUS
SELECT 
  tablename,
  rowsecurity as rls_enabled,
  CASE 
    WHEN rowsecurity THEN '✅ RLS Enabled'
    ELSE '❌ RLS Disabled - Security Risk!'
  END as status
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('purchases', 'calculations');

-- 10. CLEANUP TEST DATA (Be careful!)
-- Delete only manual test purchases
/*
DELETE FROM purchases 
WHERE stripe_session_id LIKE 'cs_test_manual_%'
   OR stripe_session_id LIKE 'manual_fix_%';
*/