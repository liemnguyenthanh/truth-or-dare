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
  SuccessToast,
  Text,
} from '@/components/shared';
import { getPaymentErrorMessage } from '@/lib/paymentErrors';
import RatingModal from '@/components/shared/RatingModal';
import { useHideNavigation } from '@/hooks/useHideNavigation';

import { QuestionType } from '@/types';

import {
  CategorySelection,
  GameStats,
  PaymentProgress,
  QuestionModal,
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
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  // Show success toast when payment succeeds
  useEffect(() => {
    if (payment.paymentSuccess) {
      setShowSuccessToast(true);
    }
  }, [payment.paymentSuccess]);

  // Show error toast when payment error occurs
  useEffect(() => {
    if (payment.paymentError) {
      setShowErrorToast(true);
    }
  }, [payment.paymentError]);

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

  // Handle payment click from question modal
  const handlePaymentFromModal = useCallback(async () => {
    // Just create order, don't close modal yet
    await payment.createOrder();
  }, [payment]);

  // Close question modal when order is created (only if payment modal is about to open)
  useEffect(() => {
    if (
      payment.orderData &&
      game.currentQuestion &&
      game.spinResult &&
      payment.isPaymentModalOpen
    ) {
      // Order created, close question modal and payment modal will open automatically
      game.setSpinResult(null);
      game.setCurrentQuestion(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    payment.orderData,
    payment.isPaymentModalOpen,
    game.currentQuestion,
    game.spinResult,
  ]);

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
        {/* Spin Wheel - Always visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
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
          setShowSuccessToast(true);
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

      {/* Success Toast */}
      {payment.paymentSuccess && showSuccessToast && (
        <SuccessToast
          message='Thanh toán thành công! Bạn có thể tiếp tục chơi.'
          onClose={() => {
            setShowSuccessToast(false);
            payment.resetPayment();
          }}
          duration={3000}
        />
      )}

      {/* Error Toast */}
      {payment.paymentError && showErrorToast && (
        <ErrorToast
          message={payment.error || 'Đã xảy ra lỗi'}
          suggestion={
            payment.paymentError
              ? getPaymentErrorMessage(payment.paymentError).suggestion
              : undefined
          }
          onRetry={
            payment.paymentError?.canRetry
              ? () => {
                  setShowErrorToast(false);
                  payment.retryPayment();
                  setTimeout(() => setShowErrorToast(true), 500);
                }
              : undefined
          }
          onClose={() => setShowErrorToast(false)}
          variant={payment.paymentError.type === 'WEBHOOK_DELAY' ? 'warning' : 'error'}
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

      {/* Question Modal - Show when spin result is available */}
      <QuestionModal
        isOpen={!!(game.currentQuestion && game.spinResult)}
        question={game.currentQuestion}
        spinResult={game.spinResult}
        onClose={handleContinueSpin}
        onContinue={handleContinueSpin}
        showPaymentButton={
          payment.isPaymentRequired &&
          !isGameUnlocked &&
          questionsPlayed >= PAYMENT_CARDS_LIMIT
        }
        onPaymentClick={handlePaymentFromModal}
        isProcessing={payment.isProcessing}
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
