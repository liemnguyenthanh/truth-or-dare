'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { useHideNavigation } from '@/hooks/useHideNavigation';
import { DRINK_QUESTIONS } from '@/data/questions/drink';

import { CodeInputModal } from '@/components/payment/CodeInputModal';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { SavedCodesModal } from '@/components/payment/SavedCodesModal';
import { ErrorToast, PageHeader } from '@/components/shared';
import RatingModal from '@/components/shared/RatingModal';

import { DrinkCard, DrawButton, PaymentProgress, GameStats } from './components';
import { useDrinkGame, useDrinkPayment } from './hooks';

const PAYMENT_CARDS_LIMIT = 5;

export default function DrinkPage() {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isGameUnlocked, setIsGameUnlocked] = useState(false);
  const [cardsDrawn, setCardsDrawn] = useState(0);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Ẩn navigation khi vào trang này
  useHideNavigation();

  // Payment hook
  const payment = useDrinkPayment({
    cardsDrawn,
    onPaymentSuccess: () => {
      setIsGameUnlocked(true);
    },
  });

  // Game hook
  const game = useDrinkGame(
    payment.isPaymentRequired,
    isGameUnlocked,
    () => {
      setShowRatingModal(true);
    }
  );

  // Track cards drawn for payment when new card is drawn
  useEffect(() => {
    if (
      payment.isPaymentRequired &&
      !isGameUnlocked &&
      game.currentQuestion &&
      !game.isFlipping &&
      game.usedQuestions.size > cardsDrawn
    ) {
      setCardsDrawn(game.usedQuestions.size);
    }
  }, [
    game.currentQuestion,
    game.isFlipping,
    game.usedQuestions.size,
    payment.isPaymentRequired,
    isGameUnlocked,
    cardsDrawn,
  ]);

  // Handle rating modal close
  const handleRatingClose = useCallback(() => {
    setShowRatingModal(false);
    router.push('/');
  }, [router]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
      <PageHeader onViewCodes={() => payment.setIsSavedCodesOpen(true)} />

      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <DrinkCard question={game.currentQuestion} isFlipping={game.isFlipping} />

        <DrawButton
          isFlipping={game.isFlipping}
          isGameComplete={game.isGameComplete}
          isPaymentRequired={payment.isPaymentRequired}
          isGameUnlocked={isGameUnlocked}
          cardsDrawn={cardsDrawn}
          isProcessing={payment.isProcessing}
          onCreateOrder={payment.createOrder}
          onDrawCard={game.drawNewCard}
        />

        {payment.isPaymentRequired &&
          !isGameUnlocked &&
          cardsDrawn > 0 && (
            <PaymentProgress
              cardsDrawn={cardsDrawn}
              maxCards={PAYMENT_CARDS_LIMIT}
              onCodeInputClick={() => payment.setIsCodeInputOpen(true)}
            />
          )}

        <GameStats
          usedCount={game.usedQuestions.size}
          totalCount={DRINK_QUESTIONS.length}
          isGameComplete={game.isGameComplete}
        />
      </div>

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

      {payment.error && (
        <ErrorToast message={payment.error} variant='error' />
      )}

      <SavedCodesModal
        isOpen={payment.isSavedCodesOpen}
        onClose={() => payment.setIsSavedCodesOpen(false)}
      />

      <RatingModal
        isOpen={showRatingModal}
        onClose={handleRatingClose}
        title='🎉 Hoàn thành game!'
        description='Bạn đã chơi hết tất cả câu hỏi. Hãy đánh giá trải nghiệm của bạn!'
        category='drink-mode'
        autoSubmit={true}
        metadata={{
          cardsDrawn: game.usedQuestions.size,
          totalQuestions: DRINK_QUESTIONS.length,
          isGameUnlocked,
        }}
      />
    </div>
  );
}
