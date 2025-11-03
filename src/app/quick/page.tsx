'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import RatingModal from '@/components/shared/RatingModal';
import { CodeInputModal } from '@/components/payment/CodeInputModal';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { SavedCodesModal } from '@/components/payment/SavedCodesModal';
import { ErrorToast, Heading, PageHeader, PaymentButton, Text } from '@/components/shared';

import {
  CategorySelection,
  GameStats,
  QuestionCard,
  TruthDareButtons,
} from './components';
import { useQuickGame, useQuickPayment } from './hooks';

const PAYMENT_CARDS_LIMIT = 5;

export default function QuickPage() {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isGameUnlocked, setIsGameUnlocked] = useState(false);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Game hook
  const game = useQuickGame();

  // Track total questions played
  const questionsPlayed = game.truthCount + game.dareCount;

  // Payment hook
  const payment = useQuickPayment({
    questionsPlayed,
    onPaymentSuccess: () => {
      setIsGameUnlocked(true);
    },
  });

  // Kiểm tra game complete và show rating modal
  useEffect(() => {
    if (game.isGameComplete && game.gameStarted && !showRatingModal) {
      setShowRatingModal(true);
    }
  }, [game.isGameComplete, game.gameStarted, showRatingModal]);

  const handleRatingClose = useCallback(() => {
    setShowRatingModal(false);
    game.endGame();
    router.push('/');
  }, [game, router]);

  if (game.gameStarted && game.selectedCategory) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
        <PageHeader onViewCodes={() => payment.setIsSavedCodesOpen(true)} />

        <div className='flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] gap-3 sm:gap-4 md:gap-6'>
          {!game.selectedType ? (
            <div className='text-center mb-4 sm:mb-6 md:mb-8'>
              <Heading level={1} className='mb-2'>
                Chọn loại câu hỏi
              </Heading>
              <TruthDareButtons
                selectedType={game.selectedType}
                currentQuestion={game.currentQuestion}
                isDrawingCard={game.isDrawingCard}
                onDrawCard={game.drawNewCard}
                showInitialSelection={true}
                disabledTruth={
                  !game.hasAvailableTruth ||
                  (payment.isPaymentRequired &&
                    !isGameUnlocked &&
                    questionsPlayed >= PAYMENT_CARDS_LIMIT)
                }
                disabledDare={
                  !game.hasAvailableDare ||
                  (payment.isPaymentRequired &&
                    !isGameUnlocked &&
                    questionsPlayed >= PAYMENT_CARDS_LIMIT)
                }
              />

              {payment.isPaymentRequired &&
                !isGameUnlocked &&
                questionsPlayed >= PAYMENT_CARDS_LIMIT && (
                  <PaymentButton
                    isProcessing={payment.isProcessing}
                    onCreateOrder={payment.createOrder}
                    onCodeInputClick={() => payment.setIsCodeInputOpen(true)}
                    className='mt-2 sm:mt-3 md:mt-4'
                  />
                )}
            </div>
          ) : (
            <QuestionCard
              selectedType={game.selectedType}
              currentQuestion={game.currentQuestion}
              isDrawingCard={game.isDrawingCard}
            />
          )}

          {game.selectedType && game.currentQuestion && (
            <>
              <TruthDareButtons
                selectedType={game.selectedType}
                currentQuestion={game.currentQuestion}
                isDrawingCard={game.isDrawingCard}
                onDrawCard={game.drawNewCard}
                showInitialSelection={false}
                disabledTruth={
                  !game.hasAvailableTruth ||
                  (payment.isPaymentRequired &&
                    !isGameUnlocked &&
                    questionsPlayed >= PAYMENT_CARDS_LIMIT)
                }
                disabledDare={
                  !game.hasAvailableDare ||
                  (payment.isPaymentRequired &&
                    !isGameUnlocked &&
                    questionsPlayed >= PAYMENT_CARDS_LIMIT)
                }
              />

              {payment.isPaymentRequired &&
                !isGameUnlocked &&
                questionsPlayed >= PAYMENT_CARDS_LIMIT && (
                  <PaymentButton
                    isProcessing={payment.isProcessing}
                    onCreateOrder={payment.createOrder}
                    onCodeInputClick={() => payment.setIsCodeInputOpen(true)}
                    className='mt-2 sm:mt-3 md:mt-4'
                  />
                )}
            </>
          )}

          <GameStats
            selectedType={game.selectedType}
            truthCount={game.truthCount}
            dareCount={game.dareCount}
            usedQuestions={game.usedQuestions}
            totalQuestions={game.totalQuestions}
          />
        </div>

        <PaymentModal
          isOpen={payment.isPaymentModalOpen}
          onClose={payment.closePaymentModal}
          orderData={payment.orderData}
          onPaymentSuccess={() => setIsGameUnlocked(true)}
          onPaymentCancel={() => router.push('/')}
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
          <div className='fixed top-20 left-4 right-4 z-50'>
            <div className='bg-red-500/90 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm'>
              {payment.error}
            </div>
          </div>
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
          category='quick-mode'
          autoSubmit={true}
          metadata={{
            truthCount: game.truthCount,
            dareCount: game.dareCount,
            totalQuestions: game.totalQuestions,
            selectedCategory: game.selectedCategory,
          }}
        />
      </div>
    );
  }

  return (
    <CategorySelection
      categories={game.categories}
      onCategorySelect={game.selectCategory}
    />
  );
}
