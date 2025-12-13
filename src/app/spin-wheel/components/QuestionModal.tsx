'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

import { useTranslation } from '@/hooks/useTranslation';

import { PrimaryButton } from '@/components/shared';
import { Heading, Text } from '@/components/shared/Typography';

import { Question, QuestionType } from '@/types';

interface QuestionModalProps {
  isOpen: boolean;
  question: Question | null;
  spinResult: QuestionType | null;
  onClose: () => void;
  onContinue: () => void;
  showPaymentButton?: boolean;
  onPaymentClick?: () => void;
  isProcessing?: boolean;
}

export function QuestionModal({
  isOpen,
  question,
  spinResult,
  onClose,
  onContinue,
  showPaymentButton = false,
  onPaymentClick,
  isProcessing = false,
}: QuestionModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const { t } = useTranslation({ namespaces: ['common'] });

  if (!question || !spinResult) return null;

  const icon = spinResult === 'truth' ? '💭' : '💖';
  const typeLabel = spinResult === 'truth' ? t('stats.truth') : t('stats.dare');
  const typeColor =
    spinResult === 'truth'
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-pink-600 dark:text-pink-400';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isProcessing ? undefined : onClose}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50'
            style={{ cursor: isProcessing ? 'not-allowed' : 'pointer' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'
          >
            <div
              className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className='sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between rounded-t-2xl'>
                <div className='flex items-center gap-3'>
                  <div className='text-3xl'>{icon}</div>
                  <Heading level={3} className={`${typeColor} !mb-0`}>
                    {typeLabel}
                  </Heading>
                </div>
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <X className='w-5 h-5 text-gray-500' />
                </button>
              </div>

              {/* Content */}
              <div className='p-6 sm:p-8'>
                <Text
                  variant='large'
                  className='text-gray-800 dark:text-white leading-relaxed text-center mb-6'
                >
                  {question.text}
                </Text>

                {/* Buttons */}
                <div className='flex flex-col gap-3 mt-6'>
                  {showPaymentButton && onPaymentClick ? (
                    <PrimaryButton
                      onClick={onPaymentClick}
                      disabled={isProcessing}
                      size='md'
                      className='w-full relative'
                    >
                      {isProcessing ? (
                        <span className='flex items-center justify-center gap-2'>
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                          {t('game.processingPayment')}
                        </span>
                      ) : (
                        t('game.payToContinue')
                      )}
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      onClick={onContinue}
                      disabled={isProcessing}
                      size='md'
                      className='w-full'
                    >
                      {t('game.continueSpin')}
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
