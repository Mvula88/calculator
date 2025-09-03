-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (only paid users exist)
CREATE TABLE public.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_amount DECIMAL(10,2) NOT NULL,
  stripe_customer_id TEXT
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Products purchased
CREATE TABLE public.purchases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('calculator_pro', 'avoid_mistake', 'translation_provider', 'hidden_platforms')),
  amount DECIMAL(10,2) NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  stripe_payment_intent TEXT
);

-- Enable Row Level Security
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Calculator usage tracking
CREATE TABLE public.calculations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  calculation_data JSONB NOT NULL,
  vehicle_details JSONB NOT NULL,
  total_cost DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.calculations ENABLE ROW LEVEL SECURITY;

-- Hidden platform applications
CREATE TABLE public.hidden_platform_access (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  application_data JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid')),
  approved_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.hidden_platform_access ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_stripe_customer ON public.users(stripe_customer_id);
CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX idx_purchases_product_type ON public.purchases(product_type);
CREATE INDEX idx_calculations_user_id ON public.calculations(user_id);
CREATE INDEX idx_calculations_created_at ON public.calculations(created_at DESC);
CREATE INDEX idx_hidden_platform_user_id ON public.hidden_platform_access(user_id);
CREATE INDEX idx_hidden_platform_status ON public.hidden_platform_access(status);

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for purchases table
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for calculations table
CREATE POLICY "Users can view own calculations" ON public.calculations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own calculations" ON public.calculations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calculations" ON public.calculations
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calculations" ON public.calculations
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for hidden platform access
CREATE POLICY "Users can view own applications" ON public.hidden_platform_access
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications" ON public.hidden_platform_access
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);