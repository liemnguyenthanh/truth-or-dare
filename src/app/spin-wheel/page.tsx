'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { SpinWheel } from '@/components/game/SpinWheel';
import { CodeInputModal } from '@/components/payment/CodeInputModal';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { SavedCodesModal } from '@/components/payment/SavedCodesModal';
import {
  ContinueButton,
  ErrorToast,
  Heading,
  PageHeader,
  PaymentButton,
  PrimaryButton,
  Text,
} from '@/components/shared';
import RatingModal from '@/components/shared/RatingModal';
import { useHideNavigation } from '@/hooks/useHideNavigation';

import { QuestionType } from '@/types';

import {
  CategorySelection,
  GameStats,
  PaymentProgress,
  QuestionCard,
} from './components';
import {
  useSpinWheelCategories,
  useSpinWheelGame,
  useSpinWheelPayment,
} from './hooks';

const PAYMENT_CARDS_LIMIT = 5;

export default function SpinWheelPage() {
  const router = useRouter();
  const [isGameUnlocked, setIsGameUnlocked] = useState(false);
  const [questionsPlayed, setQuestionsPlayed] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Ẩn navigation khi vào game
  useHideNavigation();

  // Category management
  const categories = useSpinWheelCategories();

  // Payment hook
  const payment = useSpinWheelPayment({
    questionsPlayed,
    onPaymentSuccess: () => {
      setIsGameUnlocked(true);
    },
  });

  // Game logic
  const game = useSpinWheelGame(categories.selectedCategory);

  // Track questions played for payment
  useEffect(() => {
    if (
      payment.isPaymentRequired &&
      !isGameUnlocked &&
      game.currentQuestion &&
      game.usedQuestions.size > questionsPlayed
    ) {
      setQuestionsPlayed(game.usedQuestions.size);
    }
  }, [
    game.currentQuestion,
    game.usedQuestions.size,
    payment.isPaymentRequired,
    isGameUnlocked,
    questionsPlayed,
  ]);

  // Show rating modal when user has played significant amount of questions
  // Show after every 20 questions as milestone (optional feedback)
  useEffect(() => {
    if (
      questionsPlayed >= 20 &&
      questionsPlayed % 20 === 0 &&
      game.currentQuestion &&
      !showRatingModal &&
      questionsPlayed > 0
    ) {
      // Show rating modal after milestone (every 20 questions)
      // User can close and continue playing
      setShowRatingModal(true);
    }
  }, [questionsPlayed, game.currentQuestion, showRatingModal]);

  // Handle rating modal close
  const handleRatingClose = useCallback(() => {
    setShowRatingModal(false);
  }, []);

  // Handle spin end
  const handleSpinEnd = useCallback(
    (type: QuestionType) => {
      setErrorMessage(null);
      const question = game.drawQuestion(type);
      
      if (question) {
        game.setCurrentQuestion(question);
        game.setSpinResult(type);
      } else {
        const typeLabel = type === 'truth' ? 'Thật' : 'Thách';
        setErrorMessage(
          `Không còn câu hỏi loại "${typeLabel}" trong category này. Vui lòng chọn category khác hoặc thử lại.`
        );
        
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    },
    [game]
  );

  // Handle continue to next spin
  const handleContinueSpin = useCallback(() => {
    game.setSpinResult(null);
    game.setCurrentQuestion(null);
  }, [game]);

  // Handle back to category selection
  const handleBackToCategory = useCallback(() => {
    game.resetGame();
    categories.resetCategory();
    setIsGameUnlocked(false);
    setQuestionsPlayed(0);
  }, [game, categories]);

  // Show category selection first
  if (!categories.selectedCategory) {
    return (
      <CategorySelection
        categories={categories.categories}
        onCategorySelect={categories.selectCategory}
        onBack={() => router.push('/')}
      />
    );
  }

  // Error state: no questions available
  if (game.totalQuestions === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4'>
        <div className='max-w-2xl mx-auto'>
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 text-center'>
            <div className='text-6xl mb-4'>⚠️</div>
            <Heading level={2} className='mb-4'>
              Không có câu hỏi
            </Heading>
            <Text className='mb-6'>
              Category này chưa có câu hỏi. Vui lòng chọn category khác.
            </Text>
            <PrimaryButton onClick={handleBackToCategory} size='md'>
              Chọn lại category
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  // Main game view
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
      <PageHeader
        onViewCodes={() => payment.setIsSavedCodesOpen(true)}
        onBack={handleBackToCategory}
        backLabel='Quay lại'
        codesLabel='Mã codes'
      />

      {/* Main Game Area */}
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-6'>
        <AnimatePresence mode='wait'>
          {!game.currentQuestion ? (
            // Spin Wheel
            <motion.div
              key='wheel'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className='text-center w-full max-w-md mx-auto'
            >
              <Heading level={1} className='mb-4'>
                Vòng Quay May Mắn
              </Heading>
              <Text variant='large' className='mb-6'>
                Quay để chọn loại câu hỏi
              </Text>
              <SpinWheel onSpinEnd={handleSpinEnd} />
            </motion.div>
          ) : game.spinResult && game.currentQuestion ? (
            // Question Card - Show immediately after spin
            <motion.div
              key={game.currentQuestion.id || game.currentQuestion.text}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
              }}
              className='w-full max-w-md mx-auto flex flex-col items-center gap-4'
            >
              <QuestionCard
                question={game.currentQuestion}
                spinResult={game.spinResult}
              />
              
              {/* Payment Button - Show when >= 5 questions played */}
              {payment.isPaymentRequired &&
                !isGameUnlocked &&
                questionsPlayed >= PAYMENT_CARDS_LIMIT && (
                  <PaymentButton
                    isProcessing={payment.isProcessing}
                    onCreateOrder={payment.createOrder}
                    onCodeInputClick={() => payment.setIsCodeInputOpen(true)}
                    className='mt-0'
                  />
                )}
              
              {/* Continue Button - Show if unlocked or < 5 questions */}
              {(!payment.isPaymentRequired ||
                isGameUnlocked ||
                questionsPlayed < PAYMENT_CARDS_LIMIT) && (
                <ContinueButton onClick={handleContinueSpin} className='mt-0' />
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Payment Progress - Show when questions played but not yet reached limit */}
        {payment.isPaymentRequired &&
          !isGameUnlocked &&
          questionsPlayed > 0 &&
          questionsPlayed < PAYMENT_CARDS_LIMIT && (
            <PaymentProgress
              cardsDrawn={questionsPlayed}
              maxCards={PAYMENT_CARDS_LIMIT}
              onCodeInputClick={() => payment.setIsCodeInputOpen(true)}
            />
          )}

        {/* Stats - Always show when in game */}
        {game.usedQuestions.size > 0 && (
          <GameStats
            usedCount={game.usedQuestions.size}
            totalCount={game.totalQuestions}
            truthUsed={game.truthCount.used}
            dareUsed={game.dareCount.used}
            truthTotal={game.truthCount.total}
            dareTotal={game.dareCount.total}
          />
        )}
      </div>

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
        />
      )}

      {/* Question Error Display */}
      {errorMessage && (
        <ErrorToast
          message={errorMessage}
          variant='warning'
          onClose={() => setErrorMessage(null)}
        />
      )}

      {/* Saved Codes Modal */}
      <SavedCodesModal
        isOpen={payment.isSavedCodesOpen}
        onClose={() => payment.setIsSavedCodesOpen(false)}
      />

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={handleRatingClose}
        title='🎉 Chúc mừng!'
        description='Bạn đã chơi rất nhiều câu hỏi! Hãy đánh giá trải nghiệm của bạn!'
        category='spin-wheel-mode'
        autoSubmit={false}
        metadata={{
          questionsPlayed,
          totalQuestions: game.totalQuestions,
          truthUsed: game.truthCount.used,
          dareUsed: game.dareCount.used,
          isGameUnlocked,
        }}
      />
    </div>
  );
}
