-- Run this script directly in Supabase SQL Editor to clean up duplicate entitlements

-- Step 1: Show duplicates before cleanup
SELECT 
  LOWER(email) as email,
  tier,
  COUNT(*) as total_count,
  SUM(CASE WHEN active = true THEN 1 ELSE 0 END) as active_count
FROM public.entitlements
GROUP BY LOWER(email), tier
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC;

-- Step 2: Deactivate duplicate entitlements (keeping the most recent)
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
  notes = COALESCE(notes, '') || CASE 
    WHEN notes IS NULL OR notes = '' THEN 'Deactivated as duplicate on ' 
    ELSE ' | Deactivated as duplicate on ' 
  END || NOW()::TEXT
WHERE id IN (
  SELECT id FROM ranked_entitlements WHERE rn > 1
);

-- Step 3: Show results after cleanup
SELECT 
  'Cleanup Complete' as status,
  COUNT(*) as duplicates_deactivated
FROM public.entitlements
WHERE notes LIKE '%Deactivated as duplicate%';

-- Step 4: Verify no active duplicates remain
SELECT 
  LOWER(email) as email,
  tier,
  COUNT(*) as active_count
FROM public.entitlements
WHERE active = true
GROUP BY LOWER(email), tier
HAVING COUNT(*) > 1;