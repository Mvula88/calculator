-- ========================================================
-- GRANT ACCESS TO YOUR 4 REGISTERED USERS
-- Based on the users shown in your screenshot
-- ========================================================

-- First, check current purchase status for these users
SELECT 
  u.id,
  u.email,
  u.created_at as registered,
  p.id as purchase_id,
  CASE 
    WHEN p.id IS NOT NULL THEN '✅ Has purchase'
    ELSE '❌ No purchase'
  END as status
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id
WHERE u.email IN (
  'oshanamailadverts1ng@gmail.com',
  'testuser@gmail.com',
  'inekela34@gmail.com',
  'ismaelmvula@gmail.com'
)
ORDER BY u.created_at DESC;

-- ========================================================
-- CREATE PURCHASE RECORDS FOR THESE USERS
-- Run this to give them access
-- ========================================================

-- Grant access to oshanamailadverts1ng@gmail.com
INSERT INTO purchases (
  user_id,
  product_type,
  amount,
  currency,
  status,
  purchased_at,
  stripe_session_id,
  metadata
) 
SELECT 
  id,
  'calculator_pro',
  149900,
  'nad',
  'active',
  NOW(),
  'manual_fix_' || gen_random_uuid(),
  '{"note": "Manual access grant after payment verification"}'::jsonb
FROM auth.users
WHERE email = 'oshanamailadverts1ng@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM purchases WHERE user_id = auth.users.id
  );

-- Grant access to testuser@gmail.com  
INSERT INTO purchases (
  user_id,
  product_type,
  amount,
  currency,
  status,
  purchased_at,
  stripe_session_id,
  metadata
)
SELECT 
  id,
  'calculator_pro',
  149900,
  'nad',
  'active',
  NOW(),
  'manual_fix_' || gen_random_uuid(),
  '{"note": "Manual access grant after payment verification"}'::jsonb
FROM auth.users
WHERE email = 'testuser@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM purchases WHERE user_id = auth.users.id
  );

-- Grant access to inekela34@gmail.com
INSERT INTO purchases (
  user_id,
  product_type,
  amount,
  currency,
  status,
  purchased_at,
  stripe_session_id,
  metadata
)
SELECT 
  id,
  'calculator_pro',
  149900,
  'nad',
  'active',
  NOW(),
  'manual_fix_' || gen_random_uuid(),
  '{"note": "Manual access grant after payment verification"}'::jsonb
FROM auth.users
WHERE email = 'inekela34@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM purchases WHERE user_id = auth.users.id
  );

-- Grant access to ismaelmvula@gmail.com (you!)
INSERT INTO purchases (
  user_id,
  product_type,
  amount,
  currency,
  status,
  purchased_at,
  stripe_session_id,
  metadata
)
SELECT 
  id,
  'calculator_pro',
  149900,
  'nad',
  'active',
  NOW(),
  'manual_fix_' || gen_random_uuid(),
  '{"note": "Platform owner - full access"}'::jsonb
FROM auth.users
WHERE email = 'ismaelmvula@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM purchases WHERE user_id = auth.users.id
  );

-- ========================================================
-- VERIFY ACCESS WAS GRANTED
-- ========================================================

SELECT 
  u.email,
  p.id as purchase_id,
  p.status,
  p.purchased_at,
  CASE 
    WHEN p.id IS NOT NULL THEN '✅ Access Granted!'
    ELSE '❌ Still needs fix'
  END as access_status
FROM auth.users u
LEFT JOIN purchases p ON u.id = p.user_id
WHERE u.email IN (
  'oshanamailadverts1ng@gmail.com',
  'testuser@gmail.com', 
  'inekela34@gmail.com',
  'ismaelmvula@gmail.com'
)
ORDER BY u.email;

-- ========================================================
-- ALTERNATIVE: Grant access to ALL users at once
-- ========================================================
-- Uncomment this if you want to give ALL users access
/*
INSERT INTO purchases (user_id, product_type, amount, currency, status, purchased_at, stripe_session_id)
SELECT 
  u.id,
  'calculator_pro',
  149900,
  'nad',
  'active',
  NOW(),
  'bulk_grant_' || gen_random_uuid()
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM purchases p WHERE p.user_id = u.id
);
*/