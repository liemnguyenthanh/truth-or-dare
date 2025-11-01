import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { usePayment } from '@/hooks/usePayment';

interface UseDrinkPaymentOptions {
  cardsDrawn: number;
  onPaymentSuccess: () => void;
}

interface UseDrinkPaymentReturn {
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

export function useDrinkPayment({
  cardsDrawn,
  onPaymentSuccess,
}: UseDrinkPaymentOptions): UseDrinkPaymentReturn {
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
    createOrder: createOrderBase,
    closePaymentModal,
  } = usePayment({
    gameMode: 'drink',
    cardsFlipped: cardsDrawn,
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
    createOrder,
    closePaymentModal,
    isCodeInputOpen,
    isSavedCodesOpen,
    setIsCodeInputOpen,
    setIsSavedCodesOpen,
  };
}

