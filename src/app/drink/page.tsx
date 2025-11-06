'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDonate } from '@/hooks';
import { useHideNavigation } from '@/hooks/useHideNavigation';

import { DRINK_QUESTIONS, DrinkCategoryId } from '@/data/questions/drink';

import { DonateModal, DonateTicker, PageHeader } from '@/components/shared';
import RatingModal from '@/components/shared/RatingModal';

import {
  CategorySelector,
  DrawButton,
  DrinkCard,
  GameStats,
} from './components';
import { useDrinkGame } from './hooks';

export default function DrinkPage() {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<DrinkCategoryId | null>(null);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Ẩn navigation khi vào trang này
  useHideNavigation();

  // Game hook - no payment restrictions
  const game = useDrinkGame(
    selectedCategory,
    false, // isPaymentRequired = false
    true, // isGameUnlocked = true (always unlocked)
    () => {
      setShowRatingModal(true);
    }
  );

  // Donate modal hook
  const donate = useDonate({
    cardsPlayed: game.usedQuestions.size,
  });

  // Tính tổng số câu hỏi của category đã chọn
  const categoryQuestionsCount = selectedCategory
    ? DRINK_QUESTIONS.filter((q) => q.category === selectedCategory).length
    : 0;

  // Handle rating modal close
  const handleRatingClose = useCallback(() => {
    setShowRatingModal(false);
    router.push('/');
  }, [router]);

  // Handle donate button click
  const handleDonateClick = useCallback(() => {
    donate.openDonateModal();
  }, [donate]);

  // Chưa chọn category - hiển thị category selector
  if (!selectedCategory) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
        <PageHeader onDonate={handleDonateClick} />

        <div className='flex flex-col items-center justify-center min-h-[80vh]'>
          <CategorySelector
            onSelectCategory={(categoryId) => {
              setSelectedCategory(categoryId);
            }}
          />
        </div>
      </div>
    );
  }

  // Đã chọn category - hiển thị game
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200'>
      <DonateTicker />
      <div className='p-2'>
        <PageHeader onDonate={handleDonateClick} />

        <div className='flex flex-col items-center justify-center min-h-[60vh]'>
          <DrinkCard
            question={game.currentQuestion}
            isFlipping={game.isFlipping}
          />

          <DrawButton
            isFlipping={game.isFlipping}
            isGameComplete={game.isGameComplete}
            isPaymentRequired={false}
            isGameUnlocked={true}
            cardsDrawn={game.usedQuestions.size}
            isProcessing={false}
            onCreateOrder={() => undefined}
            onDrawCard={game.drawNewCard}
          />

          <GameStats
            usedCount={game.usedQuestions.size}
            totalCount={categoryQuestionsCount}
            isGameComplete={game.isGameComplete}
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
          category='drink-mode'
          autoSubmit={true}
          metadata={{
            cardsDrawn: game.usedQuestions.size,
            totalQuestions: categoryQuestionsCount,
            isGameUnlocked: true,
            category: selectedCategory,
          }}
        />
      </div>
    </div>
  );
}
