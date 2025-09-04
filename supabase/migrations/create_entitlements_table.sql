-- Create entitlements table for managing user access
create table if not exists entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null references auth.users(id) on delete cascade,
  email text not null,
  country text not null check (country in ('na','za','bw','zm')),
  tier text not null check (tier in ('mistake','mastery')),
  stripe_payment_intent_id text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Create index for efficient email lookups
create index if not exists entitlements_email_idx on entitlements (lower(email));

-- Create index for user_id lookups
create index if not exists entitlements_user_id_idx on entitlements (user_id);

-- Enable RLS
alter table entitlements enable row level security;

-- Policy to allow users to view their own entitlements
create policy "Users can view own entitlements" on entitlements
  for select using (
    auth.uid() = user_id OR 
    lower(email) = lower(auth.jwt()->>'email')
  );

-- Policy for service role to manage entitlements
create policy "Service role can manage entitlements" on entitlements
  for all using (auth.jwt()->>'role' = 'service_role');