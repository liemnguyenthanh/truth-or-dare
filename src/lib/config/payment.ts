// Payment configuration
// Amount can be changed via environment variable PAYMENT_AMOUNT
// Default is 10000 VNĐ (10k)
export const PAYMENT_CONFIG = {
  // Amount in VNĐ - Change this or set PAYMENT_AMOUNT env var to update
  AMOUNT: parseInt(process.env.PAYMENT_AMOUNT || '10000'),

  // Code expiry in hours
  CODE_EXPIRY_HOURS: parseInt(process.env.PAYMENT_CODE_EXPIRY_HOURS || '24'),

  // Number of cards to flip before payment required
  CARDS_LIMIT: parseInt(process.env.PAYMENT_CARDS_LIMIT || '5'),

  // Game modes that require payment
  PAYMENT_REQUIRED_MODES: ['couples', 'drink', 'quick', 'group', 'spin_wheel'] as const,

  // SePay configuration
  SEPAY: {
    API_KEY: process.env.SEPAY_API_KEY || '',
    WEBHOOK_SECRET: process.env.SEPAY_WEBHOOK_SECRET || '',
    BANK_ACCOUNT: process.env.SEPAY_BANK_ACCOUNT || '',
    BANK_NAME: process.env.SEPAY_BANK_NAME || '',
  },

  // Supabase configuration
  SUPABASE: {
    URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
} as const;

// Helper function to format amount for display
export function formatPaymentAmount(amount?: number): string {
  const amt = amount || PAYMENT_CONFIG.AMOUNT;
  return `${amt.toLocaleString('vi-VN')} ₫`;
}

// Type definitions
export type PaymentRequiredMode =
  (typeof PAYMENT_CONFIG.PAYMENT_REQUIRED_MODES)[number];

// Validation
export function validatePaymentConfig() {
  const required = [
    'SEPAY_API_KEY',
    'SEPAY_WEBHOOK_SECRET',
    'SEPAY_BANK_ACCOUNT',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    // Missing payment environment variables
    return false;
  }

  return true;
}
