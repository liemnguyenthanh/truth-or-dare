import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

interface ValidateCodeResponse {
  valid: boolean;
  order?: any;
  reason?: 'expired' | 'not_paid' | 'not_found';
}

// Simple rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

/**
 * Validate access code format
 */
function validateAccessCodeFormat(code: string): boolean {
  return /^[A-Z0-9]{8}$/.test(code);
}

/**
 * Check if access code is expired
 */
function isCodeExpired(expiryTime: string): boolean {
  return new Date() > new Date(expiryTime);
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

    // Get client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded
      ? forwarded.split(',')[0]
      : req.headers.get('x-real-ip') || '127.0.0.1';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response(JSON.stringify({ error: 'Code is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate code format
    if (!validateAccessCodeFormat(code)) {
      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'not_found',
        } as ValidateCodeResponse),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get order from database
    const { data: order, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('access_code', code)
      .single();

    if (error || !order) {
      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'not_found',
        } as ValidateCodeResponse),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if code is expired
    if (isCodeExpired(order.code_expires_at)) {
      // Update status to expired if still pending
      if (order.status === 'pending') {
        await supabaseClient
          .from('orders')
          .update({ status: 'expired' })
          .eq('id', order.id);
      }

      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'expired',
        } as ValidateCodeResponse),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if order is paid
    if (order.status !== 'paid') {
      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'not_paid',
        } as ValidateCodeResponse),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Valid and paid
    const response: ValidateCodeResponse = {
      valid: true,
      order: order,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Validate code error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
