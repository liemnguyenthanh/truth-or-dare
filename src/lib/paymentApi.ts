import { supabase } from './supabase';

import {
  CreateOrderResponse,
  OrderStatus,
  ValidateCodeResponse,
} from '@/types/payment';

// Hardcoded Supabase config for static export
const SUPABASE_URL = 'https://qixucipfehjbdhwzrhfq.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpeHVjaXBmZWhqYmRod3pyaGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDUxMTMsImV4cCI6MjA3NjE4MTExM30.Wn-q3l7lyeLwOqsneO9VveBUykkimvP9TGJAdrubBuc';

function getSupabaseUrl(): string {
  return SUPABASE_URL;
}

function getAuthHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };
}

export async function createOrderRequest(args: {
  game_mode: 'couples' | 'drink' | 'quick' | 'group' | 'spin_wheel';
  cards_flipped: number;
}): Promise<CreateOrderResponse> {
  const supabaseUrl = getSupabaseUrl();

  const response = await fetch(`${supabaseUrl}/functions/v1/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(args),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to create order');
  }

  return response.json();
}

export async function getOrderStatusRequest(
  orderId: string
): Promise<OrderStatus> {
  const supabaseUrl = getSupabaseUrl();

  const response = await fetch(
    `${supabaseUrl}/functions/v1/order-status?orderId=${orderId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to check order status');
  }

  const data = await response.json();
  return data.status as OrderStatus;
}

export async function validateCodeRequest(
  code: string
): Promise<ValidateCodeResponse> {
  const supabaseUrl = getSupabaseUrl();

  const response = await fetch(
    `${supabaseUrl}/functions/v1/validate-code?code=${code}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to validate code');
  }

  return response.json();
}

export async function adminUpdateOrderRequest(args: {
  orderId: string;
  status: 'pending' | 'paid' | 'expired';
}): Promise<{ success: boolean; order: unknown }> {
  const supabaseUrl = getSupabaseUrl();

  // Get current session token from Supabase Auth
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(
    `${supabaseUrl}/functions/v1/admin-update-order`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
        apikey: SUPABASE_ANON_KEY, // Required for Supabase Edge Functions
      },
      body: JSON.stringify(args),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update order');
  }

  return response.json();
}
