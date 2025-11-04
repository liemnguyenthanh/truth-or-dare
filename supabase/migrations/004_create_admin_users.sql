-- ============================================================================
-- Migration 004: Create admin_users table for admin authentication
-- ============================================================================
-- This table stores admin users who can access the admin panel
-- Admin users are created in Supabase Auth, and this table tracks their admin status

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for email lookup
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

-- Add comments
COMMENT ON TABLE admin_users IS 'Admin users who can access the admin panel';
COMMENT ON COLUMN admin_users.id IS 'References auth.users.id';
COMMENT ON COLUMN admin_users.role IS 'Admin role: admin or super_admin';

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
-- Policy 1: Users can only read their own admin status
CREATE POLICY "Users can view own admin status" ON admin_users
  FOR SELECT USING (auth.uid() = id);

-- Policy 2: Only service role can insert admin users
CREATE POLICY "Service role can insert admin users" ON admin_users
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Policy 3: Only service role can update admin users
CREATE POLICY "Service role can update admin users" ON admin_users
  FOR UPDATE USING (auth.role() = 'service_role');

-- Policy 4: Only service role can delete admin users
CREATE POLICY "Service role can delete admin users" ON admin_users
  FOR DELETE USING (auth.role() = 'service_role');

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = user_id AND is_active = true
  );
$$;

-- Update RLS policies for orders table to allow admin access
-- Policy 6: Admins can view all orders
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    auth.role() = 'service_role' OR
    (auth.uid() IS NOT NULL AND is_admin(auth.uid()))
  );

-- Policy 7: Admins can update all orders
CREATE POLICY "Admins can update all orders" ON orders
  FOR UPDATE USING (
    auth.role() = 'service_role' OR
    (auth.uid() IS NOT NULL AND is_admin(auth.uid()))
  );

