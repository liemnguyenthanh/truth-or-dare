'use client';

import { motion } from 'framer-motion';

import { formatPaymentAmount, PAYMENT_CONFIG } from '@/lib/config/payment';
import { useTranslation } from '@/hooks/useTranslation';

import { PrimaryButton } from './PrimaryButton';

interface PaymentButtonProps {
  isProcessing: boolean;
  onCreateOrder: () => void;
  onCodeInputClick: () => void;
  className?: string;
  // Optional: Show progress bar (for couples mode)
  showProgress?: boolean;
  cardsFlipped?: number;
  maxCards?: number;
}

export function PaymentButton({
  isProcessing,
  onCreateOrder,
  onCodeInputClick,
  className = 'mt-4',
  showProgress = false,
  cardsFlipped = 0,
  maxCards = 5,
}: PaymentButtonProps) {
  const { t } = useTranslation({ namespaces: ['common'] });
  const progressPercentage =
    showProgress && cardsFlipped > 0 ? (cardsFlipped / maxCards) * 100 : 0;
  const canPay = !showProgress || cardsFlipped >= maxCards;

  return (
    <div className={`${className} flex flex-col items-center gap-2`}>
      {/* Progress Bar - Optional */}
      {showProgress && cardsFlipped > 0 && cardsFlipped < maxCards && (
        <div className='w-full max-w-sm bg-black/60 backdrop-blur-sm rounded-full px-4 py-2'>
          <div className='flex items-center justify-between text-white text-xs mb-2'>
            <span>
              {t('buttons.flipped', { flipped: cardsFlipped, max: maxCards })}
            </span>
            <span>
              {t('buttons.remaining', { remaining: maxCards - cardsFlipped })}
            </span>
          </div>
          <div className='w-full bg-white/20 rounded-full h-2'>
            <motion.div
              className='bg-gradient-to-r from-purple-400 to-pink-500 rounded-full h-2'
              animate={{
                width: `${progressPercentage}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Payment Button */}
      {canPay && (
        <>
          <PrimaryButton
            onClick={onCreateOrder}
            disabled={isProcessing}
            isLoading={isProcessing}
            loadingText={t('buttons.creatingOrder')}
            size='md'
            className='w-auto'
          >
            {t('buttons.paymentRequired', {
              amount: formatPaymentAmount(PAYMENT_CONFIG.AMOUNT),
            })}
          </PrimaryButton>
          <button
            onClick={onCodeInputClick}
            className='text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors'
          >
            {t('buttons.hasCode')}
          </button>
        </>
      )}
    </div>
  );
}
