-- ========================================================
-- FIX MISSING COLUMNS AND VERIFY SETUP
-- ========================================================

-- STEP 1: Add missing created_at column to purchases if it doesn't exist
ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW());

-- STEP 2: Check what columns exist in purchases table
SELECT 
  column_name,
  data_type,
  column_default
FROM information_schema.columns
WHERE table_name = 'purchases'
ORDER BY ordinal_position;

-- STEP 3: Verify tables exist and count columns
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

-- STEP 4: Check recent purchases (handling missing columns gracefully)
SELECT 
  COALESCE(p.created_at, NOW()) as purchase_date,
  p.product_type,
  p.amount,
  p.currency,
  p.status,
  p.stripe_session_id,
  u.email as user_email
FROM purchases p
LEFT JOIN auth.users u ON p.user_id = u.id
ORDER BY p.id DESC
LIMIT 5;

-- STEP 5: Check users with active purchases
SELECT 
  u.email,
  u.created_at as user_registered,
  COALESCE(p.created_at, NOW()) as purchase_date,
  p.product_type,
  p.status
FROM auth.users u
INNER JOIN purchases p ON u.id = p.user_id
WHERE p.status = 'active' OR p.status IS NULL
ORDER BY u.created_at DESC
LIMIT 10;

-- STEP 6: Count statistics
SELECT 
  'Statistics' as report,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM purchases) as total_purchases,
  (SELECT COUNT(*) FROM purchases WHERE status = 'active' OR status IS NULL) as active_purchases,
  (SELECT COUNT(*) FROM calculations) as saved_calculations;

-- ========================================================
-- CREATE A COMPLETE PURCHASES TABLE (if needed)
-- ========================================================
-- If your purchases table is missing many columns, drop and recreate it:
-- WARNING: Uncomment only if you want to start fresh!

/*
DROP TABLE IF EXISTS purchases CASCADE;

CREATE TABLE purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL DEFAULT 'calculator_pro',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount INTEGER NOT NULL DEFAULT 149900,
  currency TEXT NOT NULL DEFAULT 'nad',
  status TEXT DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_stripe_session ON purchases(stripe_session_id);

-- Enable RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage purchases" ON purchases
  FOR ALL USING (true);
*/

-- ========================================================
-- MANUAL PURCHASE CREATION FOR TESTING
-- ========================================================

-- Get user IDs first
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC
LIMIT 5;

-- Create a test purchase (update USER_ID_HERE with actual ID from above)
/*
INSERT INTO purchases (
  user_id,
  product_type,
  stripe_session_id,
  amount,
  currency,
  status
) VALUES (
  'USER_ID_HERE',  -- Replace with actual user ID
  'calculator_pro',
  'test_' || gen_random_uuid(),
  149900,
  'nad',
  'active'
)
ON CONFLICT (stripe_session_id) DO NOTHING
RETURNING *;
*/

-- ========================================================
-- QUICK FIX: Add all possibly missing columns
-- ========================================================
-- Run these to ensure all columns exist:

ALTER TABLE purchases ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid();
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS product_type TEXT DEFAULT 'calculator_pro';
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS stripe_session_id TEXT;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS amount INTEGER DEFAULT 149900;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'nad';
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW());
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW());

-- Add primary key if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'purchases' 
    AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE purchases ADD PRIMARY KEY (id);
  END IF;
END $$;

-- ========================================================
-- FINAL VERIFICATION
-- ========================================================

-- Check the final structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'purchases'
ORDER BY ordinal_position;