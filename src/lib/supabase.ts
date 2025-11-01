import { createClient } from '@supabase/supabase-js';

import { PAYMENT_CONFIG } from './config/payment';

// Client-side Supabase client
export const supabase = createClient(
  PAYMENT_CONFIG.SUPABASE.URL,
  PAYMENT_CONFIG.SUPABASE.ANON_KEY
);

// Server-side Supabase client with service role
export const supabaseAdmin = createClient(
  PAYMENT_CONFIG.SUPABASE.URL,
  PAYMENT_CONFIG.SUPABASE.SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Database types
export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          amount: number;
          access_code: string;
          status: 'pending' | 'paid' | 'expired';
          code_expires_at: string;
          created_at: string;
          paid_at: string | null;
          payment_meta: Record<string, unknown>;
          note: string | null;
          game_mode: 'couples' | 'drink';
          cards_flipped: number;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          amount?: number;
          access_code: string;
          status?: 'pending' | 'paid' | 'expired';
          code_expires_at: string;
          created_at?: string;
          paid_at?: string | null;
          payment_meta?: Record<string, unknown>;
          note?: string | null;
          game_mode: 'couples' | 'drink';
          cards_flipped?: number;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          amount?: number;
          access_code?: string;
          status?: 'pending' | 'paid' | 'expired';
          code_expires_at?: string;
          created_at?: string;
          paid_at?: string | null;
          payment_meta?: Record<string, unknown>;
          note?: string | null;
          game_mode?: 'couples' | 'drink';
          cards_flipped?: number;
        };
      };
    };
  };
}
