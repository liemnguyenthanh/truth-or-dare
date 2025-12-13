import { useCallback, useMemo, useState } from 'react';

import { getQuickQuestions } from '@/lib/questions';

import type { Locale } from '@/i18n/config';

import { Question, QuestionType } from '@/types';

interface UseSpinWheelGameReturn {
  // State
  currentQuestion: Question | null;
  usedQuestions: Set<string>;
  spinResult: QuestionType | null;
  totalQuestions: number;
  truthCount: { used: number; total: number };
  dareCount: { used: number; total: number };

  // Actions
  drawQuestion: (type: QuestionType) => Question | null;
  resetGame: () => void;
  setSpinResult: (type: QuestionType | null) => void;
  setCurrentQuestion: (question: Question | null) => void;
}

export function useSpinWheelGame(
  selectedCategory: string | null,
  locale: Locale = 'vi'
): UseSpinWheelGameReturn {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [spinResult, setSpinResult] = useState<QuestionType | null>(null);

  // Get questions for category
  const allQuestions = useMemo(() => {
    if (!selectedCategory) return [];

    if (selectedCategory === '18' || selectedCategory === 'party') {
      return getQuickQuestions(selectedCategory as '18' | 'party', locale);
    }
    return [];
  }, [selectedCategory, locale]);

  // Get total questions count
  const totalQuestions = useMemo(() => allQuestions.length, [allQuestions]);

  // Get per-type counts
  const truthCount = useMemo(() => {
    const truthQuestions = allQuestions.filter((q) => q.type === 'truth');
    const usedTruthCount = Array.from(usedQuestions).filter((qId) => {
      const q = allQuestions.find((q) => q.id === qId);
      return q?.type === 'truth';
    }).length;
    return {
      used: usedTruthCount,
      total: truthQuestions.length,
    };
  }, [allQuestions, usedQuestions]);

  const dareCount = useMemo(() => {
    const dareQuestions = allQuestions.filter((q) => q.type === 'dare');
    const usedDareCount = Array.from(usedQuestions).filter((qId) => {
      const q = allQuestions.find((q) => q.id === qId);
      return q?.type === 'dare';
    }).length;
    return {
      used: usedDareCount,
      total: dareQuestions.length,
    };
  }, [allQuestions, usedQuestions]);

  // Get random question for type
  const drawQuestion = useCallback(
    (type: QuestionType): Question | null => {
      if (!selectedCategory || allQuestions.length === 0) return null;

      const availableQuestions = allQuestions.filter(
        (q) => q.type === type && !usedQuestions.has(q.id || '')
      );

      // Reset if no available questions of this type
      if (availableQuestions.length === 0) {
        const resetQuestions = allQuestions.filter((q) => q.type === type);
        if (resetQuestions.length === 0) {
          // No questions of this type exist
          return null;
        }

        // Only reset questions of THIS type, keep other types' questions in usedQuestions
        // This ensures we don't lose track of questions from other types
        const newUsedSet = new Set<string>(
          Array.from(usedQuestions).filter((qId) => {
            const q = allQuestions.find((q) => q.id === qId);
            // Keep questions that are NOT of this type
            return q?.type !== type;
          })
        );

        // Get a random question from this type
        const randomIndex = Math.floor(Math.random() * resetQuestions.length);
        const question = resetQuestions[randomIndex];
        newUsedSet.add(question.id || '');
        setUsedQuestions(newUsedSet);
        return question;
      }

      // Get random question from available
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const question = availableQuestions[randomIndex];
      setUsedQuestions((prev) => new Set(prev).add(question.id || ''));
      return question;
    },
    [selectedCategory, allQuestions, usedQuestions]
  );

  // Reset game state
  const resetGame = useCallback(() => {
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
    setSpinResult(null);
  }, []);

  return {
    currentQuestion,
    usedQuestions,
    spinResult,
    totalQuestions,
    truthCount,
    dareCount,
    drawQuestion,
    resetGame,
    setSpinResult,
    setCurrentQuestion,
  };
}
