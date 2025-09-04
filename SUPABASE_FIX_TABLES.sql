-- Fix existing tables by adding missing columns
-- Run this if you get errors about missing columns

-- =====================================================
-- FIX PURCHASES TABLE
-- =====================================================

-- Check what columns already exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'purchases';

-- Add missing columns to purchases table (safe to run multiple times)
ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT UNIQUE;

ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT;

ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS amount INTEGER;

ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'nad';

ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW());

-- Add indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_type ON purchases(product_type);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases(stripe_session_id);

-- =====================================================
-- FIX CALCULATIONS TABLE
-- =====================================================

-- Check what columns already exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'calculations';

-- Add missing columns to calculations table (safe to run multiple times)
ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS vehicle_description TEXT;

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS vehicle_type TEXT;

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS purchase_price DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'NAD';

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS total_cost DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS total_hidden_costs DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS country_code TEXT DEFAULT 'NA';

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS calculation_data JSONB DEFAULT '{}';

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW());

-- Add cost breakdown columns if needed
ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS fob_price DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS shipping_cost DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS insurance DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS port_charges DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS clearing_agent_fee DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS customs_duty DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS vat DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS environmental_levy DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS registration_fee DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS roadworthy_fee DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS number_plates DECIMAL(10, 2);

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS storage_fees DECIMAL(10, 2) DEFAULT 0;

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS inspection_fee DECIMAL(10, 2) DEFAULT 0;

ALTER TABLE calculations 
ADD COLUMN IF NOT EXISTS transport_to_location DECIMAL(10, 2) DEFAULT 0;

-- Add indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at DESC);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (if not already enabled)
-- =====================================================

-- Enable RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Users can view own purchases" ON purchases;
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can insert purchases" ON purchases;
CREATE POLICY "Service role can insert purchases" ON purchases
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update purchases" ON purchases;
CREATE POLICY "Service role can update purchases" ON purchases
  FOR UPDATE WITH CHECK (true);

-- Calculations policies
DROP POLICY IF EXISTS "Users can view own calculations" ON calculations;
CREATE POLICY "Users can view own calculations" ON calculations
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own calculations" ON calculations;
CREATE POLICY "Users can insert own calculations" ON calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own calculations" ON calculations;
CREATE POLICY "Users can update own calculations" ON calculations
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own calculations" ON calculations;
CREATE POLICY "Users can delete own calculations" ON calculations
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- CREATE TRIGGER FOR updated_at (if not exists)
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (drops and recreates to avoid errors)
DROP TRIGGER IF EXISTS update_purchases_updated_at ON purchases;
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_calculations_updated_at ON calculations;
CREATE TRIGGER update_calculations_updated_at BEFORE UPDATE ON calculations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFY EVERYTHING IS SET UP
-- =====================================================

-- Check final table structures
SELECT 
  'purchases' as table_name,
  COUNT(*) as column_count,
  STRING_AGG(column_name, ', ' ORDER BY ordinal_position) as columns
FROM information_schema.columns 
WHERE table_name = 'purchases'
UNION ALL
SELECT 
  'calculations' as table_name,
  COUNT(*) as column_count,
  STRING_AGG(column_name, ', ' ORDER BY ordinal_position) as columns
FROM information_schema.columns 
WHERE table_name = 'calculations';

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('purchases', 'calculations');

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('purchases', 'calculations')
ORDER BY tablename, policyname;