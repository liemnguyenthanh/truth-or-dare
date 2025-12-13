import { useCallback, useMemo } from 'react';

import { getQuickCategories } from '@/lib/questions';

import type { Locale } from '@/i18n/config';

import { useGameState } from './useGameState';
import { useGameStats } from './useGameStats';
import { useQuestionLogic } from './useQuestionLogic';

import { QuestionType } from '@/types';

export function useQuickGame(locale: Locale = 'vi') {
  const gameState = useGameState();
  const gameStats = useGameStats();
  const questionLogic = useQuestionLogic(gameState.selectedCategory, locale);

  const drawNewCard = useCallback(
    (type: QuestionType) => {
      questionLogic.drawNewQuestion(type, gameState.setIsDrawingCard);
      gameState.setSelectedType(type);
      gameStats.incrementCount(type);
    },
    [questionLogic, gameState, gameStats]
  );

  const categories = useMemo(() => {
    const translatedCategories = getQuickCategories(locale);
    // Add icon and color to translated categories
    return translatedCategories.map((cat) => ({
      ...cat,
      icon: cat.id === '18' ? '💜' : '🎉',
      color: cat.id === '18' ? '#9b59b6' : '#3498db',
    }));
  }, [locale]);

  return {
    // Game State
    ...gameState,

    // Game Stats
    ...gameStats,

    // Question Logic
    currentQuestion: questionLogic.currentQuestion,
    usedQuestions: questionLogic.usedQuestions,
    totalQuestions: questionLogic.getTotalQuestions(),
    hasAvailableTruth: questionLogic.hasAvailableTruth(),
    hasAvailableDare: questionLogic.hasAvailableDare(),
    isGameComplete: questionLogic.isGameComplete(),

    // Actions
    drawNewCard,
    selectCategory: gameState.startGame,

    // Data
    categories,
  };
}
