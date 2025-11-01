// Payment system types
export type OrderStatus = 'pending' | 'paid' | 'expired';

export interface Order {
  id: string;
  user_id?: string;
  amount: number;
  access_code: string;
  status: OrderStatus;
  code_expires_at: string;
  created_at: string;
  paid_at?: string;
  payment_meta?: Record<string, unknown>;
  note?: string;
  game_mode: 'couples' | 'drink' | 'quick' | 'group' | 'spin_wheel';
  cards_flipped: number;
}

export interface CreateOrderRequest {
  user_id?: string;
  amount?: number;
  game_mode: 'couples' | 'drink' | 'quick' | 'group' | 'spin_wheel';
  cards_flipped: number;
}

export interface CreateOrderResponse {
  orderId: string;
  accessCode: string;
  codeExpiresAt: string;
  qrUrl: string;
  amount?: number;
}

export interface OrderStatusResponse {
  status: OrderStatus;
  order?: Order;
}

export interface ValidateCodeRequest {
  code: string;
}

export interface ValidateCodeResponse {
  valid: boolean;
  order?: Order;
  reason?: 'expired' | 'not_paid' | 'not_found';
}

export interface PaymentWebhookPayload {
  amount: number;
  description: string;
  trans_time: string;
  signature: string;
  [key: string]: unknown;
}

// Game integration types
export interface PaymentState {
  isPaymentRequired: boolean;
  cardsFlipped: number;
  currentOrder?: Order;
  isProcessing: boolean;
  error?: string;
}

export interface PaymentActions {
  createOrder: (gameMode: 'couples' | 'drink' | 'quick' | 'group' | 'spin_wheel') => Promise<void>;
  checkOrderStatus: (orderId: string) => Promise<OrderStatus>;
  validateCode: (code: string) => Promise<boolean>;
  resetPayment: () => void;
}
