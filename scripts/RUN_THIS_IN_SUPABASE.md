# Database Cleanup Instructions

## For Supabase SQL Editor

### 1. First, run the migration to add constraints:

```sql
-- Add unique constraint to prevent future duplicates
ALTER TABLE public.entitlements 
ADD CONSTRAINT IF NOT EXISTS unique_active_entitlement_per_email_tier 
UNIQUE (email, tier, active) 
WHERE active = true;

-- Add unique constraint on stripe_session_id
ALTER TABLE public.entitlements 
DROP CONSTRAINT IF EXISTS entitlements_stripe_session_id_key;

ALTER TABLE public.entitlements 
ADD CONSTRAINT IF NOT EXISTS entitlements_stripe_session_id_unique 
UNIQUE (stripe_session_id);

-- Add columns if they don't exist
ALTER TABLE public.entitlements 
ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

ALTER TABLE public.entitlements 
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_entitlements_stripe_session_id 
ON public.entitlements(stripe_session_id);

CREATE INDEX IF NOT EXISTS idx_entitlements_idempotency_key 
ON public.entitlements(idempotency_key);
```

### 2. Then, clean up existing duplicates:

Run the contents of `cleanup-duplicates-supabase.sql` in the SQL Editor.

This will:
- Show you current duplicates
- Deactivate older duplicates (keeping most recent)
- Show cleanup results
- Verify no active duplicates remain

## For Local TypeScript Cleanup (Alternative)

If you prefer to run the cleanup locally:

```bash
# Install tsx if needed
npm install -g tsx

# Run the cleanup script
npx tsx scripts/cleanup-duplicate-entitlements.ts
```

**Note:** The TypeScript script requires your `.env.local` file to have the correct Supabase credentials.