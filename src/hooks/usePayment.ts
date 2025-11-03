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
import { classifyPaymentError, getPaymentErrorMessage, type PaymentError } from '@/lib/paymentErrors';
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
  paymentError: PaymentError | null;
  paymentSuccess: boolean; // Track payment success

  // Actions
  createOrder: () => Promise<void>;
  checkOrderStatus: (orderId: string) => Promise<OrderStatus>;
  validateCode: (code: string) => Promise<boolean>;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
  resetPayment: () => void;
  retryPayment: () => Promise<void>; // Retry payment check
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
  const [paymentError, setPaymentError] = useState<PaymentError | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const paidOrderIds = useRef<Set<string>>(new Set()); // Track paid orders to prevent duplicate saves

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
      const classifiedError = classifyPaymentError(err);
      setPaymentError(classifiedError);
      const { message } = getPaymentErrorMessage(classifiedError);
      setError(message);
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
        try {
          const status = await checkOrderStatus(orderId);
          if (status === 'paid') {
            clearPolling();
            setPaymentSuccess(true);
            setPaymentError(null);
            setError(null);
            
            // Prevent duplicate saves - only save once per orderId
            if (!paidOrderIds.current.has(orderId)) {
              paidOrderIds.current.add(orderId);
              onPaymentSuccess();
              if (orderData) {
                upsert(orderData.orderId, {
                  code: orderData.accessCode,
                  expiresAt: orderData.codeExpiresAt,
                  createdAt: new Date().toISOString(),
                });
              }
            }

            setIsPaymentModalOpen(false);
          } else if (status === 'expired') {
            clearPolling();
            const expiredError = classifyPaymentError(new Error('Mã thanh toán đã hết hạn'));
            setPaymentError(expiredError);
            const { message } = getPaymentErrorMessage(expiredError);
            setError(message);
            if (orderData) {
              remove(orderData.orderId);
            }
          }
        } catch (err) {
          // Network or other errors during status check
          const classifiedError = classifyPaymentError(err);
          setPaymentError(classifiedError);
          // Don't clear polling for network errors - let it retry
          if (classifiedError.type === 'NETWORK_ERROR' || classifiedError.type === 'TIMEOUT') {
            // Continue polling - might be temporary
            console.warn('Payment status check error, will retry:', err);
          } else {
            // For other errors, stop polling
            clearPolling();
            const { message } = getPaymentErrorMessage(classifiedError);
            setError(message);
          }
        }
      };

      const interval = setInterval(handleStatus, POLLING_INTERVAL);
      pollingInterval.current = interval;
    },
    [checkOrderStatus, onPaymentSuccess, orderData, upsert, remove]
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

  // Retry payment check
  const retryPayment = useCallback(async () => {
    if (!orderData) return;
    
    setError(null);
    setPaymentError(null);
    
    try {
      const status = await checkOrderStatus(orderData.orderId);
      if (status === 'paid') {
        setPaymentSuccess(true);
        onPaymentSuccess();
        if (orderData) {
          upsert(orderData.orderId, {
            code: orderData.accessCode,
            expiresAt: orderData.codeExpiresAt,
            createdAt: new Date().toISOString(),
          });
        }
        setIsPaymentModalOpen(false);
      } else {
        const { message } = getPaymentErrorMessage(
          classifyPaymentError(new Error('Thanh toán chưa được xác nhận'))
        );
        setError(message);
      }
    } catch (err) {
      const classifiedError = classifyPaymentError(err);
      setPaymentError(classifiedError);
      const { message } = getPaymentErrorMessage(classifiedError);
      setError(message);
    }
  }, [orderData, checkOrderStatus, onPaymentSuccess, upsert]);

  // Reset payment state
  const resetPayment = useCallback(() => {
    setOrderData(null);
    setIsPaymentModalOpen(false);
    setIsProcessing(false);
    setError(null);
    setPaymentError(null);
    setPaymentSuccess(false);
    stopPolling();
    paidOrderIds.current.clear(); // Clear paid orders when resetting
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
    paymentError,
    paymentSuccess,

    // Actions
    createOrder,
    checkOrderStatus,
    validateCode,
    openPaymentModal,
    closePaymentModal,
    resetPayment,
    retryPayment,
  };
}
