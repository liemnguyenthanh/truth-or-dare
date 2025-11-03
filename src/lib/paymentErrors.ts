/**
 * Payment error types and handling
 */

export enum PaymentErrorType {
  // Network errors (can retry)
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  CONNECTION_FAILED = 'CONNECTION_FAILED',

  // Supabase errors (can retry)
  SUPABASE_ERROR = 'SUPABASE_ERROR',
  DATABASE_UNAVAILABLE = 'DATABASE_UNAVAILABLE',

  // Webhook errors (cannot retry easily)
  WEBHOOK_DELAY = 'WEBHOOK_DELAY',
  WEBHOOK_FAILED = 'WEBHOOK_FAILED',
  WEBHOOK_TIMEOUT = 'WEBHOOK_TIMEOUT',

  // Order errors
  ORDER_EXPIRED = 'ORDER_EXPIRED',
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  ORDER_ALREADY_PAID = 'ORDER_ALREADY_PAID',
  AMOUNT_MISMATCH = 'AMOUNT_MISMATCH',

  // Validation errors
  INVALID_CODE = 'INVALID_CODE',
  CODE_EXPIRED = 'CODE_EXPIRED',

  // Unknown errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface PaymentError {
  type: PaymentErrorType;
  message: string;
  canRetry: boolean;
  userMessage: string;
  technicalDetails?: string;
}

/**
 * Classify payment error from error object or message
 */
export function classifyPaymentError(error: unknown): PaymentError {
  const errorMessage =
    error instanceof Error ? error.message : String(error);
  const lowerMessage = errorMessage.toLowerCase();

  // Network errors
  if (
    lowerMessage.includes('network') ||
    lowerMessage.includes('fetch') ||
    lowerMessage.includes('connection') ||
    lowerMessage.includes('failed to fetch')
  ) {
    return {
      type: PaymentErrorType.NETWORK_ERROR,
      message: errorMessage,
      canRetry: true,
      userMessage:
        'Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.',
      technicalDetails: errorMessage,
    };
  }

  // Timeout errors
  if (lowerMessage.includes('timeout') || lowerMessage.includes('timed out')) {
    return {
      type: PaymentErrorType.TIMEOUT,
      message: errorMessage,
      canRetry: true,
      userMessage:
        'Kết nối quá lâu. Webhook có thể bị delay. Vui lòng thử lại sau hoặc nhập mã code thủ công.',
      technicalDetails: errorMessage,
    };
  }

  // Supabase errors
  if (
    lowerMessage.includes('supabase') ||
    lowerMessage.includes('database') ||
    lowerMessage.includes('postgres')
  ) {
    return {
      type: PaymentErrorType.SUPABASE_ERROR,
      message: errorMessage,
      canRetry: true,
      userMessage:
        'Lỗi kết nối database. Vui lòng thử lại sau vài giây.',
      technicalDetails: errorMessage,
    };
  }

  // Order expired
  if (
    lowerMessage.includes('expired') ||
    lowerMessage.includes('hết hạn')
  ) {
    return {
      type: PaymentErrorType.ORDER_EXPIRED,
      message: errorMessage,
      canRetry: false,
      userMessage:
        'Mã thanh toán đã hết hạn. Vui lòng tạo đơn thanh toán mới.',
      technicalDetails: errorMessage,
    };
  }

  // Order not found
  if (
    lowerMessage.includes('not found') ||
    lowerMessage.includes('không tìm thấy')
  ) {
    return {
      type: PaymentErrorType.ORDER_NOT_FOUND,
      message: errorMessage,
      canRetry: false,
      userMessage:
        'Không tìm thấy đơn thanh toán. Vui lòng tạo đơn mới.',
      technicalDetails: errorMessage,
    };
  }

  // Amount mismatch
  if (
    lowerMessage.includes('amount') ||
    lowerMessage.includes('số tiền') ||
    lowerMessage.includes('insufficient')
  ) {
    return {
      type: PaymentErrorType.AMOUNT_MISMATCH,
      message: errorMessage,
      canRetry: false,
      userMessage:
        'Số tiền chuyển khoản không đúng. Vui lòng chuyển đúng số tiền hiển thị.',
      technicalDetails: errorMessage,
    };
  }

  // Invalid code
  if (
    lowerMessage.includes('invalid') ||
    lowerMessage.includes('không hợp lệ')
  ) {
    return {
      type: PaymentErrorType.INVALID_CODE,
      message: errorMessage,
      canRetry: false,
      userMessage:
        'Mã code không hợp lệ. Vui lòng kiểm tra lại mã code.',
      technicalDetails: errorMessage,
    };
  }

  // Unknown error
  return {
    type: PaymentErrorType.UNKNOWN_ERROR,
    message: errorMessage,
    canRetry: false,
    userMessage:
      'Đã xảy ra lỗi không xác định. Vui lòng thử lại hoặc liên hệ hỗ trợ.',
    technicalDetails: errorMessage,
  };
}

/**
 * Get user-friendly error message with suggestions
 */
export function getPaymentErrorMessage(error: PaymentError): {
  message: string;
  suggestion?: string;
} {
  const suggestions: Record<PaymentErrorType, string | undefined> = {
    [PaymentErrorType.NETWORK_ERROR]:
      'Kiểm tra kết nối internet và thử lại.',
    [PaymentErrorType.TIMEOUT]:
      'Thanh toán có thể thành công nhưng webhook bị delay. Đợi thêm vài phút hoặc nhập mã code thủ công trong "Mã codes".',
    [PaymentErrorType.CONNECTION_FAILED]:
      'Kiểm tra kết nối internet và thử lại.',
    [PaymentErrorType.SUPABASE_ERROR]:
      'Đợi vài giây và thử lại. Nếu vẫn lỗi, có thể server đang bận.',
    [PaymentErrorType.DATABASE_UNAVAILABLE]:
      'Database tạm thời không khả dụng. Vui lòng thử lại sau.',
    [PaymentErrorType.WEBHOOK_DELAY]:
      'Webhook từ SePay có thể bị delay. Đợi thêm vài phút hoặc nhập mã code thủ công.',
    [PaymentErrorType.WEBHOOK_FAILED]:
      'Webhook không thể cập nhật trạng thái. Vui lòng nhập mã code thủ công trong "Mã codes".',
    [PaymentErrorType.WEBHOOK_TIMEOUT]:
      'Webhook timeout. Thanh toán có thể đã thành công. Đợi thêm hoặc nhập mã code thủ công.',
    [PaymentErrorType.ORDER_EXPIRED]:
      'Mã thanh toán đã hết hạn (30 ngày). Vui lòng tạo đơn thanh toán mới.',
    [PaymentErrorType.ORDER_NOT_FOUND]:
      'Đơn thanh toán không tồn tại. Vui lòng tạo đơn mới.',
    [PaymentErrorType.ORDER_ALREADY_PAID]:
      'Đơn thanh toán này đã được thanh toán.',
    [PaymentErrorType.AMOUNT_MISMATCH]:
      'Số tiền chuyển khoản phải đúng với số tiền hiển thị.',
    [PaymentErrorType.INVALID_CODE]:
      'Kiểm tra lại mã code 8 ký tự và thử lại.',
    [PaymentErrorType.CODE_EXPIRED]:
      'Mã code đã hết hạn. Vui lòng thanh toán lại để có mã code mới.',
    [PaymentErrorType.UNKNOWN_ERROR]:
      'Thử lại sau vài phút. Nếu vẫn lỗi, liên hệ hỗ trợ.',
  };

  return {
    message: error.userMessage,
    suggestion: suggestions[error.type],
  };
}

