-- ========================================================
-- CLEAN DATABASE SETUP FOR CAR IMPORT CALCULATOR
-- Run this entire script in Supabase SQL Editor
-- ========================================================

-- Step 1: Create the purchases table if it doesn't exist
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL DEFAULT 'calculator_pro',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'nad',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'refunded')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Step 2: Add any missing columns to purchases (safe to run if table exists)
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS stripe_session_id TEXT UNIQUE;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS amount INTEGER;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'nad';
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW());

-- Step 3: Create the calculations table if it doesn't exist
CREATE TABLE IF NOT EXISTS calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_description TEXT,
  vehicle_type TEXT,
  purchase_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NAD',
  fob_price DECIMAL(10, 2),
  shipping_cost DECIMAL(10, 2),
  insurance DECIMAL(10, 2),
  port_charges DECIMAL(10, 2),
  clearing_agent_fee DECIMAL(10, 2),
  customs_duty DECIMAL(10, 2),
  vat DECIMAL(10, 2),
  environmental_levy DECIMAL(10, 2),
  registration_fee DECIMAL(10, 2),
  roadworthy_fee DECIMAL(10, 2),
  number_plates DECIMAL(10, 2),
  storage_fees DECIMAL(10, 2) DEFAULT 0,
  inspection_fee DECIMAL(10, 2) DEFAULT 0,
  transport_to_location DECIMAL(10, 2) DEFAULT 0,
  total_cost DECIMAL(10, 2),
  total_hidden_costs DECIMAL(10, 2),
  country_code TEXT DEFAULT 'NA',
  calculation_data JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Step 4: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_type ON purchases(product_type);
CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at DESC);

-- Step 5: Enable Row Level Security
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Step 6: Drop and recreate all policies (clean slate)
DROP POLICY IF EXISTS "Users can view own purchases" ON purchases;
DROP POLICY IF EXISTS "Service role can manage purchases" ON purchases;
DROP POLICY IF EXISTS "Service role can insert purchases" ON purchases;
DROP POLICY IF EXISTS "Service role can update purchases" ON purchases;
DROP POLICY IF EXISTS "Users can manage own calculations" ON calculations;
DROP POLICY IF EXISTS "Users can view own calculations" ON calculations;
DROP POLICY IF EXISTS "Users can insert own calculations" ON calculations;
DROP POLICY IF EXISTS "Users can update own calculations" ON calculations;
DROP POLICY IF EXISTS "Users can delete own calculations" ON calculations;

-- Step 7: Create fresh policies
-- Purchases policies
CREATE POLICY "Users can view own purchases" 
ON purchases FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert purchases" 
ON purchases FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can update purchases" 
ON purchases FOR UPDATE 
USING (true);

-- Calculations policies
CREATE POLICY "Users can view own calculations" 
ON calculations FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calculations" 
ON calculations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calculations" 
ON calculations FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calculations" 
ON calculations FOR DELETE 
USING (auth.uid() = user_id);

-- Step 8: Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_purchases_updated_at ON purchases;
DROP TRIGGER IF EXISTS update_calculations_updated_at ON calculations;

-- Create fresh triggers
CREATE TRIGGER update_purchases_updated_at 
BEFORE UPDATE ON purchases
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calculations_updated_at 
BEFORE UPDATE ON calculations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 9: Verify setup
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '==================================';
  RAISE NOTICE 'DATABASE SETUP COMPLETE!';
  RAISE NOTICE '==================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables created:';
  RAISE NOTICE '✅ purchases - For tracking payments';
  RAISE NOTICE '✅ calculations - For saving calculations';
  RAISE NOTICE '';
  RAISE NOTICE 'Security:';
  RAISE NOTICE '✅ Row Level Security enabled';
  RAISE NOTICE '✅ Policies configured';
  RAISE NOTICE '';
  RAISE NOTICE 'Performance:';
  RAISE NOTICE '✅ Indexes created';
  RAISE NOTICE '✅ Triggers set up';
  RAISE NOTICE '';
  RAISE NOTICE 'Your database is ready!';
  RAISE NOTICE '==================================';
END $$;

-- Step 10: Show current status
SELECT 
  'Database Status' as report_type,
  jsonb_build_object(
    'purchases_table', EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'purchases'),
    'calculations_table', EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'calculations'),
    'total_purchases', (SELECT COUNT(*) FROM purchases),
    'total_calculations', (SELECT COUNT(*) FROM calculations),
    'active_purchases', (SELECT COUNT(*) FROM purchases WHERE status = 'active')
  ) as details;