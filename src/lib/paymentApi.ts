import { CreateOrderResponse, OrderStatus, ValidateCodeResponse } from '@/types/payment';

function getSupabaseUrl(): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error('Supabase URL not configured');
  }
  return supabaseUrl;
}

function getAuthHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
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

export async function getOrderStatusRequest(orderId: string): Promise<OrderStatus> {
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

export async function validateCodeRequest(code: string): Promise<ValidateCodeResponse> {
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


