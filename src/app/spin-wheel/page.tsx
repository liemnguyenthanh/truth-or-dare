'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDonate } from '@/hooks';
import { useHideNavigation } from '@/hooks/useHideNavigation';

import { EighteenQuestions } from '@/data/questions/18';
import { PartyQuestions } from '@/data/questions/party';

import { SpinWheel } from '@/components/game/SpinWheel';
import {
  DonateModal,
  DonateTicker,
  ErrorToast,
  Heading,
  PageHeader,
  PrimaryButton,
  Text,
  ViewQuestionsModal,
} from '@/components/shared';
import RatingModal from '@/components/shared/RatingModal';

import { CategorySelection, GameStats, QuestionModal } from './components';
import { useSpinWheelCategories, useSpinWheelGame } from './hooks';

import { QuestionType } from '@/types';

// Helper để lấy questions theo category
function getQuestionsForCategory(category: string) {
  switch (category) {
    case '18':
      return EighteenQuestions;
    case 'party':
      return PartyQuestions;
    default:
      return [];
  }
}

export default function SpinWheelPage() {
  const router = useRouter();
  const [questionsPlayed, setQuestionsPlayed] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [viewQuestionsCategory, setViewQuestionsCategory] = useState<
    string | null
  >(null);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Ẩn navigation khi vào game
  useHideNavigation();

  // Category management
  const categories = useSpinWheelCategories();

  // Game logic
  const game = useSpinWheelGame(categories.selectedCategory);

  // Track questions played
  useEffect(() => {
    if (game.currentQuestion && game.usedQuestions.size > questionsPlayed) {
      setQuestionsPlayed(game.usedQuestions.size);
    }
  }, [game.currentQuestion, game.usedQuestions.size, questionsPlayed]);

  // Donate modal hook
  const donate = useDonate({
    cardsPlayed: questionsPlayed,
  });

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

  // Handle donate button click
  const handleDonateClick = useCallback(() => {
    donate.openDonateModal();
  }, [donate]);

  // Handle view questions
  const handleViewQuestions = useCallback((categoryId: string) => {
    setViewQuestionsCategory(categoryId);
  }, []);

  // Get questions for selected category
  const viewQuestions = viewQuestionsCategory
    ? getQuestionsForCategory(viewQuestionsCategory)
    : [];

  // Get category name
  const categoryName =
    (viewQuestionsCategory &&
      categories.categories.find((cat) => cat.id === viewQuestionsCategory)
        ?.name) ||
    '';

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
    setQuestionsPlayed(0);
  }, [game, categories]);

  // Show category selection first
  if (!categories.selectedCategory) {
    return (
      <>
        <CategorySelection
          categories={categories.categories}
          onCategorySelect={categories.selectCategory}
          onBack={() => router.push('/')}
          onViewQuestions={handleViewQuestions}
        />

        <ViewQuestionsModal
          isOpen={viewQuestionsCategory !== null}
          onClose={() => setViewQuestionsCategory(null)}
          categoryName={categoryName}
          questions={viewQuestions}
          onSelectCategory={() => {
            if (viewQuestionsCategory) {
              categories.selectCategory(viewQuestionsCategory);
              setViewQuestionsCategory(null);
            }
          }}
        />
      </>
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
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200'>
      <DonateTicker />
      <div className='p-2'>
        <PageHeader
          onBack={handleBackToCategory}
          backLabel='Quay lại'
          onDonate={handleDonateClick}
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
      </div>

      {/* Donate Modal */}
      <DonateModal
        isOpen={donate.isDonateModalOpen}
        onClose={donate.closeDonateModal}
      />

      {/* Question Error Display */}
      {errorMessage && (
        <ErrorToast
          message={errorMessage}
          variant='warning'
          onClose={() => setErrorMessage(null)}
        />
      )}

      {/* Question Modal - Show when spin result is available */}
      <QuestionModal
        isOpen={!!(game.currentQuestion && game.spinResult)}
        question={game.currentQuestion}
        spinResult={game.spinResult}
        onClose={handleContinueSpin}
        onContinue={handleContinueSpin}
        showPaymentButton={false}
        onPaymentClick={() => undefined}
        isProcessing={false}
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
          isGameUnlocked: true,
        }}
      />
    </div>
  );
}
