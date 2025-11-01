-- Update orders table to support all game modes
-- This migration updates the CHECK constraint on game_mode column

-- Drop the old constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_game_mode_check;

-- Add new constraint with all supported game modes
ALTER TABLE orders ADD CONSTRAINT orders_game_mode_check 
CHECK (game_mode IN ('couples', 'drink', 'quick', 'group', 'spin_wheel'));

-- Update comment
COMMENT ON COLUMN orders.game_mode IS 'Game mode that triggered payment: couples, drink, quick, group, or spin_wheel';



