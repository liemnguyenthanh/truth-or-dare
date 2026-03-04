import { useCallback, useEffect, useMemo, useState } from 'react';

import { getQuickCategories } from '@/lib/questions';

import { useGameState } from '@/app/quick/hooks/useGameState';
import { useGameStats } from '@/app/quick/hooks/useGameStats';
import { useQuestionLogic } from '@/app/quick/hooks/useQuestionLogic';
import type { Locale } from '@/i18n/config';

import { QuestionType } from '@/types';

interface Participant {
  id: string;
  name: string;
}

export function useGroupGame(
  participants: Participant[],
  locale: Locale = 'vi'
) {
  const gameState = useGameState();
  const gameStats = useGameStats();
  const questionLogic = useQuestionLogic(gameState.selectedCategory, locale);

  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);

  // Reset participant index when participants change
  useEffect(() => {
    setCurrentParticipantIndex(0);
    setIsFirstQuestion(true);
  }, [participants.length]);

  const drawNewCard = useCallback(
    (type: QuestionType) => {
      // If not the first time (have previous question) → move to next player before drawing new question
      if (!isFirstQuestion && questionLogic.currentQuestion) {
        // Move to next participant
        setCurrentParticipantIndex((prev) => (prev + 1) % participants.length);
      }

      // Draw new question
      questionLogic.drawNewQuestion(type, gameState.setIsDrawingCard);
      gameState.setSelectedType(type);
      gameStats.incrementCount(type);

      // Mark no longer first time
      setIsFirstQuestion(false);
    },
    [questionLogic, gameState, gameStats, participants.length, isFirstQuestion]
  );

  const nextParticipant = useCallback(() => {
    setCurrentParticipantIndex((prev) => (prev + 1) % participants.length);
    gameState.setSelectedType(null);
  }, [participants.length, gameState]);

  const nextQuestion = useCallback(() => {
    gameState.setSelectedType(null);
  }, [gameState]);

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
    currentParticipantIndex,
    currentParticipant: participants[currentParticipantIndex],

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
    nextParticipant,
    nextQuestion,
    selectCategory: gameState.startGame,

    // Data
    categories,
    participants,
  };
}
