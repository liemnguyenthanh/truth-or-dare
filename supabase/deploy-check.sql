-- Deployment Verification Script
-- Run this in Supabase SQL Editor to check if everything is configured correctly

-- 1. Check if orders table exists and has correct schema
SELECT 
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;

-- 2. Check amount default value
SELECT 
  column_name,
  column_default
FROM information_schema.columns
WHERE table_name = 'orders' AND column_name = 'amount';

-- 3. Check game_mode constraint
SELECT 
  constraint_name,
  check_clause
FROM information_schema.check_constraints
WHERE constraint_name LIKE '%game_mode%';

-- 4. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'orders';

-- 5. Check existing orders (if any)
SELECT 
  id,
  game_mode,
  amount,
  status,
  created_at
FROM orders
ORDER BY created_at DESC
LIMIT 10;

-- Expected Results:
-- ✅ amount default: 10000
-- ✅ game_mode includes all 5 modes
-- ✅ RLS: enabled (true)
-- ✅ Amount in existing orders: any value is OK




