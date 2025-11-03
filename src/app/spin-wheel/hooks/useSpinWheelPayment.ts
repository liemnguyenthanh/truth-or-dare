import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { usePayment } from '@/hooks/usePayment';

interface UseSpinWheelPaymentOptions {
  questionsPlayed: number;
  onPaymentSuccess: () => void;
}

interface UseSpinWheelPaymentReturn {
  // Payment state
  isPaymentRequired: boolean;
  isPaymentModalOpen: boolean;
  orderData: ReturnType<typeof usePayment>['orderData'];
  isProcessing: boolean;
  error: string | null;
  paymentSuccess: boolean;
  paymentError: ReturnType<typeof usePayment>['paymentError'];

  // Payment actions
  createOrder: () => Promise<void>;
  closePaymentModal: () => void;
  resetPayment: () => void;
  retryPayment: () => Promise<void>;

  // Modal state
  isCodeInputOpen: boolean;
  isSavedCodesOpen: boolean;
  setIsCodeInputOpen: (open: boolean) => void;
  setIsSavedCodesOpen: (open: boolean) => void;
}

export function useSpinWheelPayment({
  questionsPlayed,
  onPaymentSuccess,
}: UseSpinWheelPaymentOptions): UseSpinWheelPaymentReturn {
  const router = useRouter();
  const [isCodeInputOpen, setIsCodeInputOpen] = useState(false);
  const [isSavedCodesOpen, setIsSavedCodesOpen] = useState(false);
  const [isGameUnlocked, setIsGameUnlocked] = useState(false);

  const {
    isPaymentRequired,
    isPaymentModalOpen,
    orderData,
    isProcessing,
    error,
    paymentSuccess,
    paymentError,
    createOrder: createOrderBase,
    closePaymentModal,
    resetPayment,
    retryPayment,
  } = usePayment({
    gameMode: 'spin_wheel',
    cardsFlipped: questionsPlayed,
    onPaymentSuccess: () => {
      setIsGameUnlocked(true);
      onPaymentSuccess();
      closePaymentModal();
    },
    onPaymentCancel: () => {
      router.push('/');
    },
  });

  const createOrder = useCallback(async () => {
    await createOrderBase();
  }, [createOrderBase]);

  return {
    isPaymentRequired,
    isPaymentModalOpen,
    orderData,
    isProcessing,
    error,
    paymentSuccess,
    paymentError,
    createOrder,
    closePaymentModal,
    resetPayment,
    retryPayment,
    isCodeInputOpen,
    isSavedCodesOpen,
    setIsCodeInputOpen,
    setIsSavedCodesOpen,
  };
}

