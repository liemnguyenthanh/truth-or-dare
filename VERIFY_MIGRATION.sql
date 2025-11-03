-- Verify migration success
-- Run this to check if constraint was updated

-- Check constraint definition
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'orders'::regclass 
AND contype = 'c' 
AND pg_get_constraintdef(oid) LIKE '%game_mode%';

-- Check if can insert with new game modes
-- This should work without error:
INSERT INTO orders (
    access_code, 
    amount, 
    status, 
    code_expires_at, 
    game_mode, 
    cards_flipped
) VALUES (
    'TEST001',
    10000,
    'pending',
    NOW() + INTERVAL '24 hours',
    'quick',
    5
) ON CONFLICT (access_code) DO NOTHING;

-- Clean up test record
DELETE FROM orders WHERE access_code = 'TEST001';

-- Show all current orders by game_mode
SELECT game_mode, COUNT(*) as count 
FROM orders 
GROUP BY game_mode;



