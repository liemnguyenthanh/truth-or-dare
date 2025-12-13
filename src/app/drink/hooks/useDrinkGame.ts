import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  DRINK_QUESTIONS_BY_CATEGORY,
  DrinkCategoryId,
  DrinkQuestion,
} from '@/data/questions/drink';

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

interface UseDrinkGameProps {
  categoryId: DrinkCategoryId | null;
  isPaymentRequired: boolean;
  isGameUnlocked: boolean;
  onGameComplete: () => void;
  questions?: DrinkQuestion[]; // Optional: pass translated questions
}

const FLIP_ANIMATION_DELAY = 300;

export function useDrinkGame(
  categoryId: DrinkCategoryId | null,
  isPaymentRequired: boolean,
  isGameUnlocked: boolean,
  onGameComplete: () => void,
  questions?: DrinkQuestion[] // Optional translated questions
): UseDrinkGameReturn {
  const [currentQuestion, setCurrentQuestion] = useState<DrinkQuestion | null>(
    null
  );
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [isFlipping, setIsFlipping] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const hasAutoDrawnRef = useRef(false);

  // Lấy bộ câu hỏi theo category
  // Nếu có questions prop (translated), dùng nó; nếu không, dùng fallback
  const categoryQuestions = useMemo(() => {
    if (!categoryId) return [];

    // Nếu có questions prop (đã được translate), filter theo category
    if (questions && questions.length > 0) {
      return questions.filter((q) => q.category === categoryId);
    }

    // Fallback: dùng data tiếng Việt cố định
    return DRINK_QUESTIONS_BY_CATEGORY[categoryId] || [];
  }, [categoryId, questions]);

  // Lấy câu hỏi ngẫu nhiên
  const getRandomQuestion = useCallback((): {
    question: DrinkQuestion;
    questionIndex: number; // Index trong bộ câu hỏi của category
  } | null => {
    if (categoryQuestions.length === 0) {
      setIsGameComplete(true);
      return null;
    }

    // Lọc các câu hỏi chưa được dùng (dùng index trong bộ câu hỏi của category)
    const availableQuestions = categoryQuestions
      .map((q, index) => ({ question: q, index }))
      .filter(({ index }) => !usedQuestions.has(index));

    if (availableQuestions.length === 0) {
      setIsGameComplete(true);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selected = availableQuestions[randomIndex];

    return { question: selected.question, questionIndex: selected.index };
  }, [categoryQuestions, usedQuestions]);

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

      const { question, questionIndex } = result;
      setCurrentQuestion(question);
      setUsedQuestions((prev) => new Set(prev).add(questionIndex));
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

  // Reset game khi category thay đổi
  useEffect(() => {
    if (categoryId) {
      resetGame();
      hasAutoDrawnRef.current = false;
    }
  }, [categoryId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Rút bài đầu tiên khi load trang - luôn auto rút card đầu tiên (chỉ 1 lần)
  useEffect(() => {
    if (
      categoryId &&
      !hasAutoDrawnRef.current &&
      !isGameComplete &&
      usedQuestions.size === 0
    ) {
      hasAutoDrawnRef.current = true;
      drawNewCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return {
    currentQuestion,
    usedQuestions,
    isFlipping,
    isGameComplete,
    drawNewCard,
    resetGame,
  };
}
