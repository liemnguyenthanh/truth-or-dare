import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-sepay-signature',
};

interface PaymentWebhookPayload {
  id: number; // ID giao dịch trên SePay
  gateway: string; // Brand name của ngân hàng (MBBank)
  transactionDate: string; // Thời gian xảy ra giao dịch (YYYY-MM-DD HH:mm:ss)
  accountNumber: string; // Số tài khoản ngân hàng
  code: string | null; // Mã code thanh toán (thường null, cần parse từ content)
  content: string; // Nội dung chuyển khoản (chứa TORD code)
  transferType: 'in' | 'out'; // Loại giao dịch. in là tiền vào, out là tiền ra
  transferAmount: number; // Số tiền giao dịch
  accumulated: number; // Số dư tài khoản (lũy kế)
  subAccount: string | null; // Tài khoản ngân hàng phụ
  referenceCode: string; // Mã tham chiếu của tin nhắn sms
  description: string; // Toàn bộ nội dung tin nhắn sms (chứa TORD code)
}

/**
 * Verify SePay API Key authentication
 */
function verifySePayApiKey(authHeader: string): boolean {
  // Skip verification in development
  if (Deno.env.get('NODE_ENV') === 'development') {
    return true;
  }

  const expectedApiKey = Deno.env.get('SEPAY_API_KEY');
  if (!expectedApiKey) {
    console.warn('SePay API key not configured, skipping verification');
    return true;
  }

  // SePay sends: "Authorization": "Apikey YOUR_API_KEY"
  const expectedAuth = `Apikey ${expectedApiKey}`;
  return authHeader === expectedAuth;
}

/**
 * Parse access code from SePay webhook
 */
function parseAccessCode(payload: PaymentWebhookPayload): string | null {
  // SePay thường không tự nhận diện được code, nên payload.code thường null
  // Cần parse từ content hoặc description

  // Parse từ content: "TORDG3ECCLAB FT25298106213729 Ma giao dich Trace883176 Trace 883176"
  const contentMatch = payload.content.match(/TORD([A-Z0-9]{8})/);
  if (contentMatch) return contentMatch[1];

  // Parse từ description: "BankAPINotify TORDG3ECCLAB FT25298106213729 Ma giao dich Trace883176 Trace 883176"
  const descMatch = payload.description.match(/TORD([A-Z0-9]{8})/);
  if (descMatch) return descMatch[1];

  // Fallback: try with TORD- format (old format)
  const contentMatchOld = payload.content.match(/TORD-([A-Z0-9]{8})/);
  if (contentMatchOld) return contentMatchOld[1];

  const descMatchOld = payload.description.match(/TORD-([A-Z0-9]{8})/);
  if (descMatchOld) return descMatchOld[1];

  return null;
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

    const body = await req.text();
    const authHeader = req.headers.get('Authorization') || '';

    // Verify SePay API Key authentication
    if (!verifySePayApiKey(authHeader)) {
      console.error('Invalid SePay API key');
      return new Response(JSON.stringify({ error: 'Invalid API key' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload: PaymentWebhookPayload = JSON.parse(body);

    // Check if this is a money-in transaction
    if (payload.transferType !== 'in') {
      console.log('Ignoring money-out transaction:', payload.id);
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Ignored money-out transaction',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse access code from SePay payload
    const accessCode = parseAccessCode(payload);
    if (!accessCode) {
      console.error('No access code found in transaction:', payload.id);
      return new Response(JSON.stringify({ error: 'No access code found' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get order from database
    const { data: order, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('access_code', accessCode)
      .single();

    if (error || !order) {
      console.error('Order not found for access code:', accessCode);
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if order is already paid
    if (order.status === 'paid') {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if order is expired
    const now = new Date();
    const expiryTime = new Date(order.code_expires_at);
    if (now > expiryTime) {
      console.error('Order expired:', order.id);
      return new Response(JSON.stringify({ error: 'Order expired' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if amount is sufficient
    if (payload.transferAmount < order.amount) {
      console.error(
        'Insufficient amount:',
        payload.transferAmount,
        'expected:',
        order.amount
      );
      return new Response(JSON.stringify({ error: 'Insufficient amount' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Convert transactionDate to ISO format
    // Input: "2025-10-24 20:43:00" -> Output: "2025-10-24T20:43:00.000Z"
    const transactionDateISO = new Date(
      payload.transactionDate.replace(' ', 'T') + '+07:00'
    ).toISOString();

    // Update order status to paid
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        status: 'paid',
        paid_at: transactionDateISO,
        payment_meta: {
          sepay_id: payload.id,
          gateway: payload.gateway,
          account_number: payload.accountNumber,
          reference_code: payload.referenceCode,
          full_payload: payload,
        },
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return new Response(JSON.stringify({ error: 'Failed to update order' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Order paid successfully:', order.id);
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
