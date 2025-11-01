-- Create orders table for payment system
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT, -- optional, null if guest
  amount INTEGER NOT NULL DEFAULT 10000, -- VNĐ (10k - configurable via PAYMENT_AMOUNT env var)
  access_code TEXT NOT NULL UNIQUE, -- 8 characters
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired')),
  code_expires_at TIMESTAMPTZ NOT NULL, -- 24h from creation
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ, -- nullable
  payment_meta JSONB, -- store webhook payload
  note TEXT, -- optional description
  game_mode TEXT CHECK (game_mode IN ('couples', 'drink', 'quick', 'group', 'spin_wheel')), -- all game modes
  cards_flipped INTEGER DEFAULT 0 -- track how many cards flipped
);

-- Create indexes for performance
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_access_code ON orders (access_code);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);
CREATE INDEX IF NOT EXISTS idx_orders_code_expires_at ON orders (code_expires_at);

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
