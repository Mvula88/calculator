-- Create entitlements table (PRIMARY ACCESS CONTROL)
CREATE TABLE IF NOT EXISTS public.entitlements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  tier TEXT CHECK (tier IN ('mistake', 'mastery')) NOT NULL,
  country TEXT,
  active BOOLEAN DEFAULT true,
  stripe_session_id TEXT UNIQUE,
  amount_paid INTEGER,
  currency TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_entitlements_email ON public.entitlements(LOWER(email));
CREATE INDEX idx_entitlements_user_id ON public.entitlements(user_id);
CREATE INDEX idx_entitlements_active ON public.entitlements(active);
CREATE INDEX idx_entitlements_email_active ON public.entitlements(LOWER(email), active);

-- Enable Row Level Security (but we'll bypass it with service role)
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows service role full access
CREATE POLICY "Service role has full access" ON public.entitlements
  FOR ALL USING (true);

-- Function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at
CREATE TRIGGER update_entitlements_updated_at
  BEFORE UPDATE ON public.entitlements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON public.entitlements TO service_role;
GRANT SELECT ON public.entitlements TO anon, authenticated;