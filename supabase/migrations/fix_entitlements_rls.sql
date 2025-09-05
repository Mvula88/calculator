-- Fix RLS policies for entitlements table to be more permissive

-- Drop existing policy
drop policy if exists "Users can view own entitlements" on entitlements;

-- Create a more permissive policy that allows users to check entitlements by email
-- This is safe because we're only allowing SELECT, and email matching is case-insensitive
create policy "Users can view entitlements by email or user_id" on entitlements
  for select using (
    -- Match by user_id if it exists
    (user_id is not null and auth.uid() = user_id) 
    OR 
    -- Match by email (case insensitive)
    lower(email) = lower(coalesce(auth.jwt()->>'email', ''))
    OR
    -- Allow authenticated users to check if an entitlement exists for their email
    -- This helps with the portal check
    (auth.uid() is not null and lower(email) = lower(coalesce(auth.jwt()->>'email', '')))
  );

-- Also create a policy that allows any authenticated user to check if entitlements exist
-- This is needed for the portal to verify access
create policy "Authenticated users can check entitlements" on entitlements
  for select using (
    auth.uid() is not null
  );

-- Make sure indexes are optimized
drop index if exists entitlements_email_idx;
create index entitlements_email_idx on entitlements (lower(email));

-- Add a composite index for better performance
create index if not exists entitlements_email_active_idx on entitlements (lower(email), active);