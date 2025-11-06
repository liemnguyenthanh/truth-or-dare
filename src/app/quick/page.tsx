'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDonate } from '@/hooks';

import { DonateModal, Heading, PageHeader } from '@/components/shared';
import RatingModal from '@/components/shared/RatingModal';

import {
  CategorySelection,
  GameStats,
  QuestionCard,
  TruthDareButtons,
} from './components';
import { useQuickGame } from './hooks';

export default function QuickPage() {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Game hook
  const game = useQuickGame();

  // Track total questions played
  const questionsPlayed = game.truthCount + game.dareCount;

  // Donate modal hook
  const donate = useDonate({
    cardsPlayed: questionsPlayed,
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
        <PageHeader />

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
                disabledTruth={!game.hasAvailableTruth}
                disabledDare={!game.hasAvailableDare}
              />
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
                disabledTruth={!game.hasAvailableTruth}
                disabledDare={!game.hasAvailableDare}
              />
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

        <DonateModal
          isOpen={donate.isDonateModalOpen}
          onClose={donate.closeDonateModal}
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
