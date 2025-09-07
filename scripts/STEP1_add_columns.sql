-- STEP 1: Run this FIRST to add missing columns
-- Run in Supabase SQL Editor

-- Add notes column for tracking
ALTER TABLE public.entitlements 
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add idempotency_key column for webhook deduplication
ALTER TABLE public.entitlements 
ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'entitlements' 
AND column_name IN ('notes', 'idempotency_key');