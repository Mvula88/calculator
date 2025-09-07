-- STEP 3: Run this AFTER cleanup to prevent future duplicates
-- Run in Supabase SQL Editor

-- Add unique constraint on stripe_session_id (prevents webhook duplicates)
ALTER TABLE public.entitlements 
DROP CONSTRAINT IF EXISTS entitlements_stripe_session_id_key;

ALTER TABLE public.entitlements 
ADD CONSTRAINT entitlements_stripe_session_id_unique 
UNIQUE (stripe_session_id);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_entitlements_stripe_session_id 
ON public.entitlements(stripe_session_id);

CREATE INDEX IF NOT EXISTS idx_entitlements_email_active 
ON public.entitlements(LOWER(email), active);

CREATE INDEX IF NOT EXISTS idx_entitlements_idempotency_key 
ON public.entitlements(idempotency_key)
WHERE idempotency_key IS NOT NULL;

-- Verify constraints were added
SELECT 
  conname as constraint_name,
  contype as constraint_type
FROM pg_constraint 
WHERE conrelid = 'public.entitlements'::regclass;

-- Show final status
SELECT 
  COUNT(*) as total_entitlements,
  SUM(CASE WHEN active = true THEN 1 ELSE 0 END) as active_entitlements,
  SUM(CASE WHEN active = false THEN 1 ELSE 0 END) as inactive_entitlements,
  COUNT(DISTINCT LOWER(email)) as unique_emails
FROM public.entitlements;