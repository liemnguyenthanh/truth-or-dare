'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getDrinkCategories, getDrinkQuestions } from '@/lib/questions';
import { useDonate } from '@/hooks';
import { useTranslation } from '@/hooks/useTranslation';

import type { DrinkCategoryId } from '@/data/questions/drink';

// Translations are now loaded automatically via useTranslation hook
import {
  DonateModal,
  DonateTicker,
  PageHeader,
  ViewQuestionsModal,
} from '@/components/shared';
import RatingModal from '@/components/shared/RatingModal';

import { getLocaleFromPath, getLocalizedPath } from '@/i18n/config';

import {
  CategorySelector,
  DrawButton,
  DrinkCard,
  GameStats,
} from '../../drink/components';
import { useDrinkGame } from '../../drink/hooks';

export function DrinkPageClient({ params }: { params: { locale: string } }) {
  const router = useRouter();
  const locale = useMemo(
    () => getLocaleFromPath(`/${params.locale}`),
    [params.locale]
  );
  const { t, translations } = useTranslation({
    namespaces: ['pages', 'common', 'categories'],
  });

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<DrinkCategoryId | null>(null);
  const [viewQuestionsCategory, setViewQuestionsCategory] =
    useState<DrinkCategoryId | null>(null);

  // Load questions and categories for locale
  const drinkQuestions = useMemo(() => getDrinkQuestions(locale), [locale]);
  const drinkCategories = useMemo(() => getDrinkCategories(locale), [locale]);

  // Auto scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Hide navigation when category is selected or playing game
  useEffect(() => {
    const nav = document.querySelector('#navigation') as HTMLElement | null;
    const main = document.querySelector('main') as HTMLElement | null;

    if (selectedCategory) {
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
  }, [selectedCategory]);

  // Game hook - no payment restrictions
  // Pass translated questions to the hook
  const game = useDrinkGame(
    selectedCategory,
    false, // isPaymentRequired = false
    true, // isGameUnlocked = true (always unlocked)
    () => {
      setShowRatingModal(true);
    },
    drinkQuestions // Pass translated questions
  );

  // Donate modal hook
  const donate = useDonate({
    cardsPlayed: game.usedQuestions.size,
  });

  // Calculate total questions for selected category
  const categoryQuestionsCount = selectedCategory
    ? drinkQuestions.filter((q) => q.category === selectedCategory).length
    : 0;

  // Handle rating modal close
  const handleRatingClose = useCallback(() => {
    setShowRatingModal(false);
    router.push(getLocalizedPath('/', locale));
  }, [router, locale]);

  const handleDonateClick = donate.isEnabled
    ? donate.openDonateModal
    : undefined;

  // Handle view questions
  const handleViewQuestions = useCallback((categoryId: DrinkCategoryId) => {
    setViewQuestionsCategory(categoryId);
  }, []);

  // Get questions for selected category
  const viewQuestions = viewQuestionsCategory
    ? drinkQuestions.filter((q) => q.category === viewQuestionsCategory)
    : [];

  // Get category name with translation
  const categoryName = useMemo(() => {
    if (!viewQuestionsCategory) return '';
    const category = drinkCategories.find(
      (cat) => cat.id === viewQuestionsCategory
    );
    if (!category) return '';
    const categoryTranslations = translations?.categories?.drink;
    if (categoryTranslations) {
      const translated = (categoryTranslations as Record<string, unknown>)[
        category.id
      ];
      if (
        translated &&
        typeof translated === 'object' &&
        translated !== null &&
        'name' in translated
      ) {
        const name = (translated as { name?: string }).name;
        if (typeof name === 'string') {
          return name;
        }
      }
    }
    return category.name;
  }, [viewQuestionsCategory, drinkCategories, translations]);

  // Category not selected - show category selector
  if (!selectedCategory) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
        <PageHeader onDonate={handleDonateClick} />

        <div className='flex flex-col items-center justify-center min-h-[80vh]'>
          <CategorySelector
            categories={drinkCategories}
            onSelectCategory={(categoryId) => {
              setSelectedCategory(categoryId);
            }}
            onViewQuestions={handleViewQuestions}
          />
        </div>

        <ViewQuestionsModal
          isOpen={viewQuestionsCategory !== null}
          onClose={() => setViewQuestionsCategory(null)}
          categoryName={categoryName}
          questions={viewQuestions}
          onSelectCategory={() => {
            if (viewQuestionsCategory) {
              setSelectedCategory(viewQuestionsCategory);
              setViewQuestionsCategory(null);
            }
          }}
        />
      </div>
    );
  }

  // Category selected - show game
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200'>
      {donate.isEnabled && <DonateTicker />}
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

        {donate.isEnabled && (
          <DonateModal
            isOpen={donate.isDonateModalOpen}
            onClose={donate.closeDonateModal}
          />
        )}

        <RatingModal
          isOpen={showRatingModal}
          onClose={handleRatingClose}
          title={t('drink.gameComplete')}
          description={t('drink.gameCompleteDescription')}
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
