-- Create device tracking table
CREATE TABLE IF NOT EXISTS user_devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_fingerprint TEXT NOT NULL,
  device_type TEXT NOT NULL CHECK (device_type IN ('phone', 'computer')),
  device_name TEXT,
  user_agent TEXT,
  ip_address INET,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, device_fingerprint)
);

-- Create active sessions table for concurrent session limiting
CREATE TABLE IF NOT EXISTS active_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  device_fingerprint TEXT NOT NULL,
  ip_address INET,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_user_devices_user_id ON user_devices(user_id);
CREATE INDEX idx_user_devices_type ON user_devices(user_id, device_type);
CREATE INDEX idx_active_sessions_user_id ON active_sessions(user_id);
CREATE INDEX idx_active_sessions_token ON active_sessions(session_token);

-- Function to check device limits
CREATE OR REPLACE FUNCTION check_device_limit(
  p_user_id UUID,
  p_device_type TEXT,
  p_device_fingerprint TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  device_count INTEGER;
  existing_device BOOLEAN;
BEGIN
  -- Check if this is an existing device
  SELECT EXISTS(
    SELECT 1 FROM user_devices 
    WHERE user_id = p_user_id 
    AND device_fingerprint = p_device_fingerprint
  ) INTO existing_device;
  
  -- If existing device, allow access
  IF existing_device THEN
    -- Update last_active
    UPDATE user_devices 
    SET last_active = NOW() 
    WHERE user_id = p_user_id 
    AND device_fingerprint = p_device_fingerprint;
    RETURN TRUE;
  END IF;
  
  -- Count devices of this type
  SELECT COUNT(*) INTO device_count
  FROM user_devices
  WHERE user_id = p_user_id
  AND device_type = p_device_type;
  
  -- Check limit (2 per type)
  IF device_count >= 2 THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to enforce single concurrent session
CREATE OR REPLACE FUNCTION enforce_single_session(
  p_user_id UUID,
  p_session_token TEXT,
  p_device_fingerprint TEXT,
  p_ip_address INET
) RETURNS BOOLEAN AS $$
BEGIN
  -- Delete all other active sessions for this user
  DELETE FROM active_sessions 
  WHERE user_id = p_user_id 
  AND session_token != p_session_token;
  
  -- Insert or update current session
  INSERT INTO active_sessions (user_id, session_token, device_fingerprint, ip_address)
  VALUES (p_user_id, p_session_token, p_device_fingerprint, p_ip_address)
  ON CONFLICT (session_token) 
  DO UPDATE SET 
    last_activity = NOW(),
    ip_address = EXCLUDED.ip_address;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- RLS Policies
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own devices
CREATE POLICY "Users can view own devices" ON user_devices
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only see their own sessions
CREATE POLICY "Users can view own sessions" ON active_sessions
  FOR SELECT USING (auth.uid() = user_id);