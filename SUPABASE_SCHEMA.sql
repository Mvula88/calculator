-- Complete Supabase Schema for Car Import Calculator Platform
-- Run these SQL commands in your Supabase SQL Editor

-- =====================================================
-- MINIMUM REQUIRED TABLES (You need these 2 tables)
-- =====================================================

-- 1. PURCHASES TABLE (Required for payment tracking)
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL CHECK (product_type IN ('calculator_pro', 'avoid_mistake', 'translation', 'hidden_platforms')),
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT NOT NULL DEFAULT 'nad',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'refunded')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_type ON purchases(product_type);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases(stripe_session_id);

-- Enable Row Level Security
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for purchases
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert purchases" ON purchases
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update purchases" ON purchases
  FOR UPDATE WITH CHECK (true);

-- 2. CALCULATIONS TABLE (Required for saving calculations)
CREATE TABLE IF NOT EXISTS calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_description TEXT,
  vehicle_type TEXT,
  purchase_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NAD',
  
  -- Cost breakdown
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
  
  -- Additional costs
  storage_fees DECIMAL(10, 2) DEFAULT 0,
  inspection_fee DECIMAL(10, 2) DEFAULT 0,
  transport_to_location DECIMAL(10, 2) DEFAULT 0,
  
  -- Totals
  total_cost DECIMAL(10, 2),
  total_hidden_costs DECIMAL(10, 2),
  
  -- Metadata
  country_code TEXT DEFAULT 'NA',
  calculation_data JSONB DEFAULT '{}', -- Store complete calculation details
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for calculations
CREATE POLICY "Users can view own calculations" ON calculations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calculations" ON calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calculations" ON calculations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calculations" ON calculations
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calculations_updated_at BEFORE UPDATE ON calculations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TEST YOUR SETUP
-- =====================================================
-- Run this query to check if tables are created:
SELECT table_name, 
       CASE 
         WHEN table_name = 'purchases' THEN 'Required - Tracks user payments'
         WHEN table_name = 'calculations' THEN 'Required - Stores saved calculations'
         ELSE 'Optional'
       END as purpose
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('purchases', 'calculations')
ORDER BY table_name;