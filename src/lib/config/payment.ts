// Payment configuration
// Amount can be changed via environment variable PAYMENT_AMOUNT
// Default is 10000 VNĐ (10k)
export const PAYMENT_CONFIG = {
  // Amount in VNĐ - Change this or set PAYMENT_AMOUNT env var to update
  AMOUNT: parseInt(process.env.PAYMENT_AMOUNT || '10000'),

  // Supabase configuration - Hardcoded for static export
  SUPABASE: {
    URL: 'https://qixucipfehjbdhwzrhfq.supabase.co',
    ANON_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpeHVjaXBmZWhqYmRod3pyaGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDUxMTMsImV4cCI6MjA3NjE4MTExM30.Wn-q3l7lyeLwOqsneO9VveBUykkimvP9TGJAdrubBuc',
    SERVICE_ROLE_KEY: '', // Not needed for static export
  },
} as const;

// Helper function to format amount for display
export function formatPaymentAmount(amount?: number): string {
  const amt = amount || PAYMENT_CONFIG.AMOUNT;
  return `${amt.toLocaleString('vi-VN')} ₫`;
}
