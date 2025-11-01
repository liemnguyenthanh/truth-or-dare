'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  CreateOrderResponse,
  OrderStatus,
  ValidateCodeResponse,
} from '@/types/payment';
import {
  createOrderRequest,
  getOrderStatusRequest,
  validateCodeRequest,
} from '@/lib/paymentApi';
import { useOrderStorage } from '@/hooks';

interface UsePaymentOptions {
  gameMode: 'couples' | 'drink' | 'quick' | 'group' | 'spin_wheel';
  cardsFlipped: number;
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
}

interface UsePaymentReturn {
  // State
  isPaymentRequired: boolean;
  isPaymentModalOpen: boolean;
  orderData: CreateOrderResponse | null;
  isProcessing: boolean;
  error: string | null;

  // Actions
  createOrder: () => Promise<void>;
  checkOrderStatus: (orderId: string) => Promise<OrderStatus>;
  validateCode: (code: string) => Promise<boolean>;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
  resetPayment: () => void;
}

const PAYMENT_CARDS_LIMIT = 5;
const POLLING_INTERVAL = 1000; // 1 second

export function usePayment({
  gameMode,
  cardsFlipped,
  onPaymentSuccess,
  onPaymentCancel: _onPaymentCancel,
}: UsePaymentOptions): UsePaymentReturn {
  const { upsert, remove, list } = useOrderStorage();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<CreateOrderResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  // Check if payment is required - ALL modes now require payment
  const isPaymentRequired = true;

  // Create order
  const createOrder = useCallback(async () => {
    if (!isPaymentRequired || cardsFlipped < PAYMENT_CARDS_LIMIT) {
      return;
    }

    // Prevent double-click/double-call
    if (isProcessing) {
      // Create order already in progress, ignoring duplicate call
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const data: CreateOrderResponse = await createOrderRequest({
        game_mode: gameMode,
        cards_flipped: cardsFlipped,
      });
      // Order created successfully
      setOrderData(data);
      setIsPaymentModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Create order error
    } finally {
      setIsProcessing(false);
    }
  }, [gameMode, cardsFlipped, isPaymentRequired, isProcessing]);

  // Check order status
  const checkOrderStatus = useCallback(
    async (orderId: string): Promise<OrderStatus> => {
      try {
        return await getOrderStatusRequest(orderId);
      } catch (err) {
        return 'expired';
      }
    },
    []
  );

  // Validate code manually
  const validateCode = useCallback(async (code: string): Promise<boolean> => {
    try {
      const data: ValidateCodeResponse = await validateCodeRequest(code);
      return data.valid;
    } catch (err) {
      return false;
    }
  }, []);

  // Start polling for order status (refactored)
  const startPolling = useCallback(
    (orderId: string) => {
      // Utility to clear polling
      const clearPolling = () => {
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
        }
      };

      clearPolling();

      const handleStatus = async () => {
        const status = await checkOrderStatus(orderId);
        if (status === 'paid') {
          clearPolling();
          onPaymentSuccess();
          if (orderData) {
            upsert(orderData.orderId, {
              code: orderData.accessCode,
              expiresAt: orderData.codeExpiresAt,
              createdAt: new Date().toISOString(),
            });
          }

          setIsPaymentModalOpen(false);
        } else if (status === 'expired') {
          clearPolling();
          setError('Mã thanh toán đã hết hạn');
          if (orderData) {
            remove(orderData.orderId);
          }
        }
      };

      const interval = setInterval(handleStatus, POLLING_INTERVAL);
      pollingInterval.current = interval;
    },
    [checkOrderStatus, onPaymentSuccess, orderData]
  );

  // Stop polling
  const stopPolling = useCallback(() => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
  }, []);

  // Open payment modal
  const openPaymentModal = useCallback(() => {
    setIsPaymentModalOpen(true);
  }, []);

  // Close payment modal
  const closePaymentModal = useCallback(() => {
    setIsPaymentModalOpen(false);
    stopPolling();
  }, [stopPolling]);

  // Reset payment state
  const resetPayment = useCallback(() => {
    setOrderData(null);
    setIsPaymentModalOpen(false);
    setIsProcessing(false);
    setError(null);
    stopPolling();
  }, [stopPolling]);

  // Start polling when order data is available
  useEffect(() => {
    if (orderData && isPaymentModalOpen) {
      startPolling(orderData.orderId);
    }
  }, [orderData, isPaymentModalOpen, startPolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    // State
    isPaymentRequired,
    isPaymentModalOpen,
    orderData,
    isProcessing,
    error,

    // Actions
    createOrder,
    checkOrderStatus,
    validateCode,
    openPaymentModal,
    closePaymentModal,
    resetPayment,
  };
}
