import { useCallback } from 'react';

import { useGameState } from './useGameState';
import { useGameStats } from './useGameStats';
import { useQuestionLogic } from './useQuestionLogic';

import { QuestionType } from '@/types';

export function useQuickGame() {
  const gameState = useGameState();
  const gameStats = useGameStats();
  const questionLogic = useQuestionLogic(gameState.selectedCategory);

  const drawNewCard = useCallback(
    (type: QuestionType) => {
      questionLogic.drawNewQuestion(type, gameState.setIsDrawingCard);
      gameState.setSelectedType(type);
      gameStats.incrementCount(type);
    },
    [questionLogic, gameState, gameStats]
  );

  const categories = [
    {
      id: '18',
      name: '18+',
      description: 'Câu hỏi dành cho người lớn',
      icon: '💜',
    },
    {
      id: 'party',
      name: 'Party',
      description: 'Câu hỏi vui nhộn cho bữa tiệc',
      icon: '🎉',
    },
  ];

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
