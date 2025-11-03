import { useCallback, useEffect, useRef, useState } from 'react';

import { DRINK_QUESTIONS, DrinkQuestion } from '@/data/questions/drink';

interface UseDrinkGameReturn {
  // State
  currentQuestion: DrinkQuestion | null;
  usedQuestions: Set<number>;
  isFlipping: boolean;
  isGameComplete: boolean;

  // Actions
  drawNewCard: () => void;
  resetGame: () => void;
}

const FLIP_ANIMATION_DELAY = 300;

export function useDrinkGame(
  isPaymentRequired: boolean,
  isGameUnlocked: boolean,
  onGameComplete: () => void
): UseDrinkGameReturn {
  const [currentQuestion, setCurrentQuestion] = useState<DrinkQuestion | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [isFlipping, setIsFlipping] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const hasAutoDrawnRef = useRef(false);

  // Lấy câu hỏi ngẫu nhiên
  const getRandomQuestion = useCallback((): {
    question: DrinkQuestion;
    originalIndex: number;
  } | null => {
    const availableQuestions = DRINK_QUESTIONS.filter(
      (_, index) => !usedQuestions.has(index)
    );

    if (availableQuestions.length === 0) {
      setIsGameComplete(true);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    const originalIndex = DRINK_QUESTIONS.findIndex((q) => q === selectedQuestion);

    return { question: selectedQuestion, originalIndex };
  }, [usedQuestions]);

  // Rút bài mới
  const drawNewCard = useCallback(() => {
    if (isGameComplete || isFlipping) {
      return;
    }

    setIsFlipping(true);

    setTimeout(() => {
      const result = getRandomQuestion();

      if (!result) {
        setIsFlipping(false);
        onGameComplete();
        return;
      }

      const { question, originalIndex } = result;
      setCurrentQuestion(question);
      setUsedQuestions((prev) => new Set(prev).add(originalIndex));
      setIsFlipping(false);
    }, FLIP_ANIMATION_DELAY);
  }, [getRandomQuestion, isGameComplete, isFlipping, onGameComplete]);

  // Reset game
  const resetGame = useCallback(() => {
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
    setIsFlipping(false);
    setIsGameComplete(false);
    hasAutoDrawnRef.current = false;
  }, []);

  // Rút bài đầu tiên khi load trang - luôn auto rút card đầu tiên (chỉ 1 lần)
  useEffect(() => {
    if (!hasAutoDrawnRef.current && !isGameComplete && usedQuestions.size === 0) {
      hasAutoDrawnRef.current = true;
      drawNewCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentQuestion,
    usedQuestions,
    isFlipping,
    isGameComplete,
    drawNewCard,
    resetGame,
  };
}

