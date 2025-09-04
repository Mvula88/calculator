# Supabase Database Setup Guide

## Quick Answer: You Only Need 2 Tables! ✅

### Required Tables:
1. **`purchases`** - Tracks who paid for the calculator
2. **`calculations`** - Stores saved import calculations

## Step-by-Step Setup

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"

### Step 2: Create the Tables
Copy and paste this SQL into the editor and run it:

```sql
-- 1. CREATE PURCHASES TABLE
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'nad',
  status TEXT DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_purchases_user_id ON purchases(user_id);

-- Enable Row Level Security
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own purchases
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- 2. CREATE CALCULATIONS TABLE
CREATE TABLE IF NOT EXISTS calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_description TEXT,
  vehicle_type TEXT,
  purchase_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NAD',
  total_cost DECIMAL(10, 2),
  total_hidden_costs DECIMAL(10, 2),
  country_code TEXT DEFAULT 'NA',
  calculation_data JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_calculations_user_id ON calculations(user_id);

-- Enable Row Level Security
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own calculations
CREATE POLICY "Users can view own calculations" ON calculations
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert own calculations" ON calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update own calculations" ON calculations
  FOR UPDATE USING (auth.uid() = user_id);
```

### Step 3: Verify Tables Were Created
Run this query to check:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('purchases', 'calculations');
```

You should see:
- purchases
- calculations

## What Each Table Does

### `purchases` Table
- **Purpose**: Tracks who has paid for Calculator Pro
- **Created by**: Stripe webhook after successful payment
- **Used for**: Checking if user has access to premium features

### `calculations` Table  
- **Purpose**: Stores saved import cost calculations
- **Created by**: When user clicks "Save Calculation" in the calculator
- **Used for**: Showing calculation history in dashboard

## Testing Your Setup

### Test Purchase Creation (for development):
```sql
-- Create a test purchase for your user
INSERT INTO purchases (
  user_id, 
  product_type, 
  amount, 
  currency, 
  status
) VALUES (
  'YOUR-USER-ID-HERE', -- Get this from Auth > Users in Supabase
  'calculator_pro',
  149900, -- N$1,499 in cents
  'nad',
  'active'
);
```

### Check if Purchase Exists:
```sql
-- Check purchases for a user
SELECT * FROM purchases WHERE user_id = 'YOUR-USER-ID-HERE';
```

## Troubleshooting

### If tables already exist:
The SQL uses `CREATE TABLE IF NOT EXISTS` so it's safe to run multiple times.

### If you get permission errors:
Make sure you're running the SQL as an admin user in Supabase.

### To completely reset (start fresh):
```sql
-- WARNING: This deletes all data!
DROP TABLE IF EXISTS calculations CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
-- Then run the create statements again
```

## That's It! 🎉
With just these 2 tables, your platform is ready to:
- Track payments via Stripe webhook
- Save user calculations
- Control access to premium features

The platform will automatically create purchase records when payments are successful through Stripe.