-- Migration SQL to run on Supabase Dashboard
-- Run this in SQL Editor on your Supabase project

-- Step 1: Drop old constraint (might have different name)
DO $$ 
BEGIN
    -- Try to drop with default name
    ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_game_mode_check;
EXCEPTION 
    WHEN undefined_object THEN NULL;
END $$;

-- Step 2: Find and drop actual constraint name
DO $$ 
DECLARE
    constraint_name TEXT;
BEGIN
    SELECT conname INTO constraint_name
    FROM pg_constraint
    WHERE conrelid = 'orders'::regclass
    AND contype = 'c'
    AND pg_get_constraintdef(oid) LIKE '%game_mode%';
    
    IF constraint_name IS NOT NULL THEN
        EXECUTE format('ALTER TABLE orders DROP CONSTRAINT %I', constraint_name);
    END IF;
END $$;

-- Step 3: Add new constraint with all game modes
ALTER TABLE orders ADD CONSTRAINT orders_game_mode_check 
CHECK (game_mode IN ('couples', 'drink', 'quick', 'group', 'spin_wheel'));

-- Step 4: Update comment
COMMENT ON COLUMN orders.game_mode IS 'Game mode that triggered payment: couples, drink, quick, group, or spin_wheel';

-- Verify
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'orders'::regclass 
AND contype = 'c' 
AND pg_get_constraintdef(oid) LIKE '%game_mode%';



