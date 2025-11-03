-- ============================================================================
-- FULL DATABASE SETUP - Drop and Recreate All Tables
-- ============================================================================
-- Run this script to completely reset and setup the database
-- WARNING: This will DELETE ALL DATA in the tables below!
-- ============================================================================

-- Step 1: Drop all tables (CASCADE to handle foreign keys)
DROP TABLE IF EXISTS feedback_comments CASCADE;
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- Step 2: Drop function if exists
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============================================================================
-- Migration 001: Create orders table for payment system
-- ============================================================================
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT, -- optional, null if guest
  amount INTEGER NOT NULL DEFAULT 10000, -- VNĐ (10k - configurable via PAYMENT_AMOUNT env var)
  access_code TEXT NOT NULL UNIQUE, -- 8 characters
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired')),
  code_expires_at TIMESTAMPTZ NOT NULL, -- 30 days from creation
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ, -- nullable
  payment_meta JSONB, -- store webhook payload
  note TEXT, -- optional description
  game_mode TEXT CHECK (game_mode IN ('couples', 'drink', 'quick', 'group', 'spin_wheel')), -- all game modes
  cards_flipped INTEGER DEFAULT 0 -- track how many cards flipped
);

-- Create indexes for performance
CREATE UNIQUE INDEX idx_orders_access_code ON orders (access_code);
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_created_at ON orders (created_at);
CREATE INDEX idx_orders_code_expires_at ON orders (code_expires_at);

-- Add comments for documentation
COMMENT ON TABLE orders IS 'Payment orders for Truth or Dare game';
COMMENT ON COLUMN orders.access_code IS '8-character unique code for manual validation';
COMMENT ON COLUMN orders.payment_meta IS 'Webhook payload from payment provider';
COMMENT ON COLUMN orders.game_mode IS 'Game mode that triggered payment: couples, drink, quick, group, or spin_wheel';
COMMENT ON COLUMN orders.cards_flipped IS 'Number of cards flipped before payment required';

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Policy 1: Users can only read their own orders (if user_id is set)
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    user_id IS NULL OR 
    user_id = auth.uid()::text OR
    auth.role() = 'service_role'
  );

-- Policy 2: Users can only insert orders with their own user_id or null
CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (
    user_id IS NULL OR 
    user_id = auth.uid()::text OR
    auth.role() = 'service_role'
  );

-- Policy 3: Only service role can update orders (for webhook)
CREATE POLICY "Service role can update orders" ON orders
  FOR UPDATE USING (auth.role() = 'service_role');

-- Policy 4: Only service role can delete orders
CREATE POLICY "Service role can delete orders" ON orders
  FOR DELETE USING (auth.role() = 'service_role');

-- Policy 5: Allow anonymous access for order status check (by access_code only)
CREATE POLICY "Anonymous can check order status by access code" ON orders
  FOR SELECT USING (
    access_code IS NOT NULL AND
    (user_id IS NULL OR auth.role() = 'service_role')
  );

-- ============================================================================
-- Migration 002: Create feedback table
-- ============================================================================
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('bug', 'feature', 'general', 'rating')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  category VARCHAR(100),
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'rejected')),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_feedback_type ON feedback(type);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_created_at ON feedback(created_at);
CREATE INDEX idx_feedback_priority ON feedback(priority);

-- Enable Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to insert feedback
CREATE POLICY "Allow public to insert feedback" ON feedback
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read pending feedback (for public display)
CREATE POLICY "Allow public to read pending feedback" ON feedback
  FOR SELECT USING (status = 'pending');

-- Allow authenticated users to read all feedback (for admin)
CREATE POLICY "Allow authenticated users to read all feedback" ON feedback
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update feedback status (for admin)
CREATE POLICY "Allow authenticated users to update feedback" ON feedback
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_feedback_updated_at 
  BEFORE UPDATE ON feedback 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Migration 003: Update orders table to support all game modes
-- ============================================================================
-- Drop the old constraint (if exists from initial creation)
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_game_mode_check;

-- Add new constraint with all supported game modes
ALTER TABLE orders ADD CONSTRAINT orders_game_mode_check 
CHECK (game_mode IN ('couples', 'drink', 'quick', 'group', 'spin_wheel'));

-- Update comment
COMMENT ON COLUMN orders.game_mode IS 'Game mode that triggered payment: couples, drink, quick, group, or spin_wheel';

-- ============================================================================
-- Migration 004: Create feedback_comments table for nested comments
-- ============================================================================
CREATE TABLE feedback_comments (
  id BIGSERIAL PRIMARY KEY,
  feedback_id BIGINT NOT NULL REFERENCES feedback(id) ON DELETE CASCADE,
  parent_id BIGINT REFERENCES feedback_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name VARCHAR(100) DEFAULT 'Ẩn danh',
  email VARCHAR(255),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_feedback_comments_feedback_id ON feedback_comments(feedback_id);
CREATE INDEX idx_feedback_comments_parent_id ON feedback_comments(parent_id);
CREATE INDEX idx_feedback_comments_created_at ON feedback_comments(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE feedback_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to insert comments
CREATE POLICY "Allow public to insert comments" ON feedback_comments
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read comments on pending feedbacks
CREATE POLICY "Allow public to read comments on pending feedback" ON feedback_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM feedback 
      WHERE feedback.id = feedback_comments.feedback_id 
      AND feedback.status = 'pending'
    )
  );

-- Allow authenticated users to read all comments (for admin)
CREATE POLICY "Allow authenticated users to read all comments" ON feedback_comments
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_feedback_comments_updated_at 
  BEFORE UPDATE ON feedback_comments 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Setup Complete!
-- ============================================================================
-- Tables created:
--   ✅ orders
--   ✅ feedback
--   ✅ feedback_comments
--
-- Functions created:
--   ✅ update_updated_at_column()
--
-- All RLS policies and triggers are set up.
-- ============================================================================

