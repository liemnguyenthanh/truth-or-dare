import { useCallback, useState } from 'react';

import { useLocalizedRouter } from '@/hooks/useLocalizedRouter';
import { usePayment } from '@/hooks/usePayment';

interface UseCouplesPaymentOptions {
  cardsFlipped: number;
  onPaymentSuccess: () => void;
}

interface UseCouplesPaymentReturn {
  // Payment state
  isPaymentRequired: boolean;
  isPaymentModalOpen: boolean;
  orderData: ReturnType<typeof usePayment>['orderData'];
  isProcessing: boolean;
  error: string | null;

  // Payment actions
  createOrder: () => Promise<void>;
  closePaymentModal: () => void;

  // Modal state
  isCodeInputOpen: boolean;
  isSavedCodesOpen: boolean;
  setIsCodeInputOpen: (open: boolean) => void;
  setIsSavedCodesOpen: (open: boolean) => void;
}

export function useCouplesPayment({
  cardsFlipped,
  onPaymentSuccess,
}: UseCouplesPaymentOptions): UseCouplesPaymentReturn {
  const router = useLocalizedRouter();
  const [isCodeInputOpen, setIsCodeInputOpen] = useState(false);
  const [isSavedCodesOpen, setIsSavedCodesOpen] = useState(false);

  const {
    isPaymentRequired,
    isPaymentModalOpen,
    orderData,
    isProcessing,
    error,
    createOrder: createOrderBase,
    closePaymentModal,
  } = usePayment({
    gameMode: 'couples',
    cardsFlipped,
    onPaymentSuccess: () => {
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
    createOrder,
    closePaymentModal,
    isCodeInputOpen,
    isSavedCodesOpen,
    setIsCodeInputOpen,
    setIsSavedCodesOpen,
  };
}
