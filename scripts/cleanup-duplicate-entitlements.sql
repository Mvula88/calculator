-- Cleanup s


cript to remove duplicate entitlements
-- Run this in Supabase SQL Editor to clean existing duplicates

-- First, identify duplicates (keeping the most recent one)
WITH duplicates AS (
  SELECT 
    id,
    email,
    tier,
    created_at,
    ROW_NUMBER() OVER (
      PARTITION BY LOWER(email), tier 
      ORDER BY created_at DESC
    ) as rn
  FROM public.entitlements
  WHERE active = true
)
-- Mark older duplicates as inactive instead of deleting
UPDATE public.entitlements
SET 
  active = false,
  notes = COALESCE(notes || ' | ', '') || 'Deactivated as duplicate on ' || NOW()::TEXT
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Report on what was cleaned up
WITH cleanup_summary AS (
  SELECT 
    LOWER(email) as email,
    tier,
    COUNT(*) as total_entitlements,
    SUM(CASE WHEN active = true THEN 1 ELSE 0 END) as active_count,
    SUM(CASE WHEN active = false THEN 1 ELSE 0 END) as inactive_count
  FROM public.entitlements
  GROUP BY LOWER(email), tier
  HAVING COUNT(*) > 1
)
SELECT 
  email,
  tier,
  total_entitlements,
  active_count,
  inactive_count,
  'Cleaned' as status
FROM cleanup_summary
ORDER BY email, tier;