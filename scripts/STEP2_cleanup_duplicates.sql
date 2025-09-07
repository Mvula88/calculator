-- STEP 2: Run this AFTER adding columns to clean up duplicates
-- Run in Supabase SQL Editor

-- Show duplicates before cleanup
SELECT 
  LOWER(email) as email,
  tier,
  COUNT(*) as total_count,
  SUM(CASE WHEN active = true THEN 1 ELSE 0 END) as active_count
FROM public.entitlements
GROUP BY LOWER(email), tier
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC;

-- Deactivate duplicate entitlements (keeping the most recent)
WITH ranked_entitlements AS (
  SELECT 
    id,
    email,
    tier,
    created_at,
    active,
    ROW_NUMBER() OVER (
      PARTITION BY LOWER(email), tier 
      ORDER BY created_at DESC
    ) as rn
  FROM public.entitlements
  WHERE active = true
)
UPDATE public.entitlements
SET 
  active = false,
  notes = 'Deactivated as duplicate on ' || NOW()::TEXT
WHERE id IN (
  SELECT id FROM ranked_entitlements WHERE rn > 1
)
RETURNING email, tier;

-- Show how many were cleaned up
SELECT 
  COUNT(*) as duplicates_deactivated
FROM public.entitlements
WHERE notes LIKE '%Deactivated as duplicate%';

-- Verify no active duplicates remain
SELECT 
  LOWER(email) as email,
  tier,
  COUNT(*) as active_count
FROM public.entitlements
WHERE active = true
GROUP BY LOWER(email), tier
HAVING COUNT(*) > 1;