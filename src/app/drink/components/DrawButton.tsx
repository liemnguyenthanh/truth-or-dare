'use client';

import { motion } from 'framer-motion';

import { formatPaymentAmount, PAYMENT_CONFIG } from '@/lib/config/payment';
import { useTranslation } from '@/hooks/useTranslation';

interface DrawButtonProps {
  isFlipping: boolean;
  isGameComplete: boolean;
  isPaymentRequired: boolean;
  isGameUnlocked: boolean;
  cardsDrawn: number;
  isProcessing: boolean;
  onCreateOrder: () => void;
  onDrawCard: () => void;
}

export function DrawButton({
  isFlipping,
  isGameComplete,
  isPaymentRequired,
  isGameUnlocked,
  cardsDrawn,
  isProcessing,
  onCreateOrder,
  onDrawCard,
}: DrawButtonProps) {
  const { t } = useTranslation({ namespaces: ['pages'] });
  const isPaymentBlocked =
    isPaymentRequired && !isGameUnlocked && cardsDrawn >= 5;
  const isDisabled =
    isFlipping || isGameComplete || (isPaymentBlocked && isProcessing);

  const handleClick = () => {
    if (isPaymentBlocked) {
      onCreateOrder();
    } else {
      onDrawCard();
    }
  };

  const getButtonText = () => {
    if (isFlipping) {
      return (
        <div className='flex items-center gap-2'>
          <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
          {t('drink.drawingCard')}
        </div>
      );
    }

    if (isGameComplete) {
      return t('drink.gameCompleteTitle');
    }

    if (isPaymentBlocked) {
      if (isProcessing) {
        return (
          <div className='flex items-center gap-2'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
            {t('drink.creatingOrder')}
          </div>
        );
      }
      return t('drink.paymentRequired', {
        amount: formatPaymentAmount(PAYMENT_CONFIG.AMOUNT),
      });
    }

    return t('drink.drawNewCard');
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isDisabled}
      className='mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed'
      whileTap={{ scale: 0.95 }}
    >
      {getButtonText()}
    </motion.button>
  );
}
