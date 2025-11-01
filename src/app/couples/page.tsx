'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import {
  SwipeCardStack,
} from '@/components/game';
import { CodeInputModal } from '@/components/payment/CodeInputModal';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { SavedCodesModal } from '@/components/payment/SavedCodesModal';
import { ErrorToast, PageHeader, Text } from '@/components/shared';
import AgeVerificationModal from '@/components/shared/AgeVerificationModal';
import { useHideNavigation } from '@/hooks/useHideNavigation';

import {
  useCouplesGame,
  useCouplesPayment,
} from './hooks';
import { PaymentButton } from '@/components/shared';

const PAYMENT_CARDS_LIMIT = 5;

export default function CouplePositionsPage() {
  const router = useRouter();
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [isGameUnlocked, setIsGameUnlocked] = useState(false);

  // Ẩn navigation khi vào game
  useHideNavigation();

  // Check age verification from localStorage
  useEffect(() => {
    const ageVerifiedLocal = localStorage.getItem('age_verified') === 'true';
    if (ageVerifiedLocal) {
      setAgeVerified(true);
      setShowAgeVerification(false);
    }
  }, []);

  // Game hook - no category filtering anymore
  const game = useCouplesGame(
    true, // Payment is always required (handled at payment level)
    isGameUnlocked
  );

  // Payment hook - uses game.cardsFlipped
  const payment = useCouplesPayment({
    cardsFlipped: game.cardsFlipped,
    onPaymentSuccess: () => {
      setIsGameUnlocked(true);
    },
  });

  // Handle age verification
  const handleAgeConfirm = useCallback(() => {
    localStorage.setItem('age_verified', 'true');
    setShowAgeVerification(false);
    setAgeVerified(true);
  }, []);

  const handleAgeCancel = useCallback(() => {
    router.push('/');
  }, [router]);


  // Handle position change
  const handlePositionChange = useCallback(
    (position: any, index: number) => {
      game.onPositionChange(position, index);
      // Note: Payment is NOT auto-triggered - user must click button
    },
    [game]
  );

  // If age not verified, show modal
  if (showAgeVerification) {
    return (
      <AgeVerificationModal
        isOpen={showAgeVerification}
        onConfirm={handleAgeConfirm}
        onCancel={handleAgeCancel}
      />
    );
  }

  // Main game view
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 relative h-screen overflow-hidden'>
      {/* Header */}
      <div className='absolute top-0 left-0 right-0 z-50'>
        <div className='bg-gradient-to-b from-black/20 to-transparent p-3'>
          <PageHeader
            backHref='/'
            backLabel='Quay lại'
            onViewCodes={() => payment.setIsSavedCodesOpen(true)}
            codesLabel='Mã codes'
            className='relative z-50'
          />
        </div>
      </div>

      {/* Main Swipe Area */}
      <div className='absolute inset-0 pt-[100px] pb-40 px-4'>
        <div className='relative w-full h-full max-w-sm mx-auto'>
          {game.displayedPositions.length > 0 ? (
            <SwipeCardStack
              positions={game.displayedPositions}
              onPositionChange={handlePositionChange}
              disabled={
                payment.isPaymentRequired &&
                !isGameUnlocked &&
                game.cardsFlipped >= PAYMENT_CARDS_LIMIT
              }
            />
          ) : (
            <div className='flex items-center justify-center h-full'>
              <div className='text-center'>
                <div className='w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto'>
                  <span className='text-4xl'>😔</span>
                </div>
                <Text variant='large' className='text-gray-500 dark:text-gray-400'>
                  Không tìm thấy tư thế phù hợp
                </Text>
                <Text variant='small' className='text-gray-400 dark:text-gray-500 mt-2'>
                  Thử chọn danh mục khác
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Button - Fixed bottom */}
      {payment.isPaymentRequired &&
        !isGameUnlocked &&
        game.cardsFlipped >= PAYMENT_CARDS_LIMIT && (
          <div
            className='absolute bottom-4 left-4 right-4 z-50'
            style={{ zIndex: 10000 }}
          >
            <PaymentButton
              isProcessing={payment.isProcessing}
              onCreateOrder={payment.createOrder}
              onCodeInputClick={() => payment.setIsCodeInputOpen(true)}
              showProgress={true}
              cardsFlipped={game.cardsFlipped}
              maxCards={PAYMENT_CARDS_LIMIT}
            />
          </div>
        )}

      {/* Payment Progress - Show when cards flipped but not yet reached limit */}
      {payment.isPaymentRequired &&
        !isGameUnlocked &&
        game.cardsFlipped > 0 &&
        game.cardsFlipped < PAYMENT_CARDS_LIMIT && (
          <div
            className='absolute bottom-4 left-4 right-4 z-50 max-w-[375px] mx-auto'
            style={{ zIndex: 10000 }}
          >
            <div className='bg-black/60 backdrop-blur-sm rounded-full px-4 py-2'>
              <div className='flex items-center justify-between text-white text-sm'>
                <span>Đã lật: {game.cardsFlipped}/{PAYMENT_CARDS_LIMIT}</span>
                <div className='flex-1 mx-3'>
                  <div className='w-full bg-white/20 rounded-full h-2'>
                    <motion.div
                      className='bg-gradient-to-r from-purple-400 to-pink-500 rounded-full h-2'
                      animate={{
                        width: `${(game.cardsFlipped / PAYMENT_CARDS_LIMIT) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => payment.setIsCodeInputOpen(true)}
                  className='text-xs text-blue-400 hover:text-blue-300 underline'
                >
                  Có mã code?
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={payment.isPaymentModalOpen}
        onClose={payment.closePaymentModal}
        orderData={payment.orderData}
        onPaymentSuccess={() => {
          setIsGameUnlocked(true);
          payment.closePaymentModal();
        }}
        onPaymentCancel={() => {
          router.push('/');
        }}
      />

      {/* Code Input Modal */}
      <CodeInputModal
        isOpen={payment.isCodeInputOpen}
        onClose={() => payment.setIsCodeInputOpen(false)}
        onCodeValid={(_code) => {
          setIsGameUnlocked(true);
          payment.setIsCodeInputOpen(false);
        }}
        onCodeInvalid={() => {
          // Error handled by modal
        }}
      />

      {/* Error Display */}
      {payment.error && (
        <ErrorToast
          message={payment.error}
          variant='error'
          className='absolute top-20 left-4 right-4'
        />
      )}

      {/* Saved Codes Modal */}
      <SavedCodesModal
        isOpen={payment.isSavedCodesOpen}
        onClose={() => payment.setIsSavedCodesOpen(false)}
      />
    </div>
  );
}