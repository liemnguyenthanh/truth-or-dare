'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Translations are now loaded automatically via useTranslation hook
import { getQuickQuestions } from '@/lib/questions';
import { useDonate } from '@/hooks';
import { useTranslation } from '@/hooks/useTranslation';

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

import { getLocaleFromPath, getLocalizedPath } from '@/i18n/config';

import {
  CategorySelection,
  GameStats,
  QuestionModal,
} from '../../spin-wheel/components';
import {
  useSpinWheelCategories,
  useSpinWheelGame,
} from '../../spin-wheel/hooks';

import { QuestionType } from '@/types';

// Helper để lấy questions theo category với locale support
function getQuestionsForCategory(category: string, locale: string) {
  if (category === '18' || category === 'party') {
    return getQuickQuestions(category as '18' | 'party', locale as 'vi' | 'en');
  }
  return [];
}

export function SpinWheelPageClient({ locale }: { locale: string }) {
  const router = useRouter();
  const validLocale = useMemo(() => getLocaleFromPath(`/${locale}`), [locale]);
  const { t } = useTranslation({
    namespaces: ['common', 'pages', 'gameModes'],
  });

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

  // Category management
  const categories = useSpinWheelCategories();

  // Hide navigation when category is selected or playing game
  useEffect(() => {
    const nav = document.querySelector('#navigation') as HTMLElement | null;
    const main = document.querySelector('main') as HTMLElement | null;

    if (categories.selectedCategory) {
      // Ẩn navigation khi đã chọn category hoặc đang chơi
      if (nav) {
        nav.style.display = 'none';
      }
      if (main) {
        main.style.paddingTop = '0';
      }
    } else {
      // Hiện navigation khi chưa chọn category
      if (nav) {
        nav.style.display = '';
      }
      if (main) {
        main.style.paddingTop = '';
      }
    }

    // Cleanup
    return () => {
      if (nav) {
        nav.style.display = '';
      }
      if (main) {
        main.style.paddingTop = '';
      }
    };
  }, [categories.selectedCategory]);

  // Game logic
  const game = useSpinWheelGame(categories.selectedCategory, validLocale);

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

  const handleDonateClick = donate.isEnabled
    ? donate.openDonateModal
    : undefined;

  // Handle view questions
  const handleViewQuestions = useCallback((categoryId: string) => {
    setViewQuestionsCategory(categoryId);
  }, []);

  // Get questions for selected category
  const viewQuestions = viewQuestionsCategory
    ? getQuestionsForCategory(viewQuestionsCategory, validLocale)
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
        const typeLabel = type === 'truth' ? t('stats.truth') : t('stats.dare');
        setErrorMessage(t('spinWheel.noQuestions', { type: typeLabel }));

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    },
    [game, t]
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
          onBack={() => router.push(getLocalizedPath('/', validLocale))}
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
              {t('spinWheel.noQuestionsTitle')}
            </Heading>
            <Text className='mb-6'>
              {t('spinWheel.noQuestionsDescription')}
            </Text>
            <PrimaryButton onClick={handleBackToCategory} size='md'>
              {t('spinWheel.selectAnotherCategory')}
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  // Main game view
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200'>
      {donate.isEnabled && <DonateTicker />}
      <div className='p-2'>
        <PageHeader
          onBack={handleBackToCategory}
          backLabel={t('buttons.back')}
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
              {t('spinWheel.name')}
            </Heading>
            <Text variant='large' className='mb-6'>
              {t('spinWheel.spinDescription')}
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
      {donate.isEnabled && (
        <DonateModal
          isOpen={donate.isDonateModalOpen}
          onClose={donate.closeDonateModal}
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
        title={t('spinWheel.congratulations')}
        description={t('spinWheel.milestoneDescription')}
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
