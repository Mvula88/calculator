-- Add unique constraint to prevent duplicate active entitlements per email/tier
-- This allows users to have different tiers but prevents duplicate same-tier entitlements
ALTER TABLE public.entitlements 
ADD CONSTRAINT unique_active_entitlement_per_email_tier 
UNIQUE (email, tier, active) 
WHERE active = true;

-- Add index on stripe_session_id for faster webhook processing
CREATE INDEX IF NOT EXISTS idx_entitlements_stripe_session_id 
ON public.entitlements(stripe_session_id);

-- Add idempotency_key column if it doesn't exist
ALTER TABLE public.entitlements 
ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

-- Add notes column for tracking disputes or issues
ALTER TABLE public.entitlements 
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create index on idempotency_key for deduplication
CREATE INDEX IF NOT EXISTS idx_entitlements_idempotency_key 
ON public.entitlements(idempotency_key);

-- Update the unique constraint on stripe_session_id to be more robust
ALTER TABLE public.entitlements 
DROP CONSTRAINT IF EXISTS entitlements_stripe_session_id_key;

ALTER TABLE public.entitlements 
ADD CONSTRAINT entitlements_stripe_session_id_unique 
UNIQUE (stripe_session_id);