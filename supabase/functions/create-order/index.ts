import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

interface CreateOrderRequest {
  user_id?: string;
  amount?: number;
  game_mode: 'couples' | 'drink' | 'quick' | 'group' | 'spin_wheel';
  cards_flipped: number;
}

interface CreateOrderResponse {
  orderId: string;
  accessCode: string;
  codeExpiresAt: string;
  qrUrl: string;
}

/**
 * Generate random 8-character access code (uppercase letters + numbers)
 */
function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate QR code URL for payment using SePay API
 */
function generateQRUrl(accessCode: string, amount: number): string {
  const description = `TORD-${accessCode}`;
  const bankAccount = Deno.env.get('SEPAY_BANK_ACCOUNT') || '0326347644';
  const bankName = Deno.env.get('SEPAY_BANK_NAME') || 'MBBank';

  const params = new URLSearchParams({
    acc: bankAccount,
    bank: bankName,
    amount: amount.toString(),
    des: description,
    template: 'compact', // Use compact template for better display
  });

  // Use SePay QR API as per documentation
  return `https://qr.sepay.vn/img?${params.toString()}`;
}

/**
 * Calculate expiry time for access code
 */
function calculateExpiryTime(): string {
  const now = new Date();
  const expiryHours = parseInt(
    Deno.env.get('PAYMENT_CODE_EXPIRY_HOURS') || '24'
  );
  const expiry = new Date(now.getTime() + expiryHours * 60 * 60 * 1000);
  return expiry.toISOString();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Validate environment
    const requiredEnvVars = [
      'SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'SEPAY_BANK_ACCOUNT',
      'SEPAY_BANK_NAME',
    ];

    const missingEnvVars = requiredEnvVars.filter((key) => !Deno.env.get(key));
    if (missingEnvVars.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Payment system not configured',
          missing: missingEnvVars,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const body: CreateOrderRequest = await req.json();

    // Validate request
    const paymentRequiredModes = ['couples', 'drink', 'quick', 'group', 'spin_wheel'];
    if (!body.game_mode || !paymentRequiredModes.includes(body.game_mode)) {
      return new Response(JSON.stringify({ error: 'Invalid game mode' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cardsLimit = parseInt(Deno.env.get('PAYMENT_CARDS_LIMIT') || '5');
    if (body.cards_flipped < cardsLimit) {
      return new Response(
        JSON.stringify({ error: 'Not enough cards flipped' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate unique request ID to prevent duplicate orders
    const requestId = crypto.randomUUID();
    const now = new Date();

    // Check for existing pending orders within last 30 seconds
    const { data: existingOrders, error: checkError } = await supabaseClient
      .from('orders')
      .select('id, status, created_at, payment_meta')
      .eq('game_mode', body.game_mode)
      .eq('status', 'pending')
      .gte('created_at', new Date(now.getTime() - 30 * 1000).toISOString()) // Last 30 seconds
      .order('created_at', { ascending: false })
      .limit(1);

    if (checkError) {
      console.error('Error checking existing orders:', checkError);
    }

    if (existingOrders && existingOrders.length > 0) {
      const existingOrder = existingOrders[0];
      console.log(
        'Duplicate order request detected, returning existing order:',
        existingOrder.id
      );

      // Get full order data
      const { data: orderData, error: fetchError } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('id', existingOrder.id)
        .single();

      if (fetchError || !orderData) {
        console.error('Error fetching existing order:', fetchError);
      } else {
        return new Response(
          JSON.stringify({
            orderId: orderData.id,
            accessCode: orderData.access_code,
            codeExpiresAt: orderData.code_expires_at,
            qrUrl: generateQRUrl(orderData.access_code, orderData.amount),
            amount: orderData.amount,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Create order data
    const accessCode = generateAccessCode();
    const expiryTime = calculateExpiryTime();
    // Get amount from env var or default to 10000 VNĐ
    const amount = parseInt(Deno.env.get('PAYMENT_AMOUNT') || '10000');

    const orderData = {
      user_id: body.user_id || null,
      amount: amount,
      access_code: accessCode,
      status: 'pending',
      code_expires_at: expiryTime,
      paid_at: null,
      payment_meta: {
        request_id: requestId,
        created_at: now.toISOString(),
        duplicate_protection: true,
      },
      note: null,
      game_mode: body.game_mode,
      cards_flipped: body.cards_flipped,
    };

    // Insert into database
    const { data: order, error } = await supabaseClient
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({ error: 'Failed to create order' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Format response
    const response: CreateOrderResponse = {
      orderId: order.id,
      accessCode: order.access_code,
      codeExpiresAt: order.code_expires_at,
      qrUrl: generateQRUrl(order.access_code, order.amount),
    };

    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Create order error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
