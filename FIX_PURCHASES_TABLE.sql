-- ========================================================
-- FIX FOREIGN KEY CONSTRAINT ISSUE
-- ========================================================

-- Check current foreign key constraints on purchases table
SELECT
    conname AS constraint_name,
    conrelid::regclass AS table_name,
    a.attname AS column_name,
    confrelid::regclass AS foreign_table_name,
    af.attname AS foreign_column_name
FROM
    pg_constraint c
    JOIN pg_attribute a ON a.attnum = ANY(c.conkey) AND a.attrelid = c.conrelid
    JOIN pg_attribute af ON af.attnum = ANY(c.confkey) AND af.attrelid = c.confrelid
WHERE
    contype = 'f'
    AND conrelid::regclass::text = 'purchases';

-- ========================================================
-- OPTION 1: ALTER THE CONSTRAINT (Recommended)
-- ========================================================

-- Drop the existing foreign key constraint
ALTER TABLE purchases 
DROP CONSTRAINT IF EXISTS purchases_user_id_fkey;

-- Add new foreign key constraint pointing to auth.users
ALTER TABLE purchases 
ADD CONSTRAINT purchases_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- ========================================================
-- OPTION 2: CREATE USERS TABLE (Alternative)
-- Only if Option 1 doesn't work
-- ========================================================

/*
-- Create users table that mirrors auth.users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Populate users table from auth.users
INSERT INTO users (id, email, created_at)
SELECT id, email, created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;
*/

-- ========================================================
-- NOW GRANT ACCESS TO YOUR USERS
-- ========================================================

-- After fixing the constraint, run this to grant access
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
  'manual_' || gen_random_uuid(),
  '{"note": "Manual access grant"}'::jsonb
FROM auth.users
WHERE email IN (
  'oshanamailadverts1ng@gmail.com',
  'testuser@gmail.com',
  'inekela34@gmail.com',
  'ismaelmvula@gmail.com'
)
AND NOT EXISTS (
  SELECT 1 FROM purchases p WHERE p.user_id = auth.users.id
)
RETURNING *;

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