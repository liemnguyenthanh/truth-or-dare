import { useCallback, useState } from 'react';

import { EighteenQuestions } from '@/data/questions/18';
import { PartyQuestions } from '@/data/questions/party';

import { Question, QuestionType } from '@/types';

export function useQuestionLogic(selectedCategory: string | null) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [usedTruthQuestions, setUsedTruthQuestions] = useState<Set<string>>(new Set());
  const [usedDareQuestions, setUsedDareQuestions] = useState<Set<string>>(new Set());

  const getQuestionsForCategory = (category: string) => {
    switch (category) {
      case '18':
        return EighteenQuestions;
      case 'party':
        return PartyQuestions;
      default:
        return [];
    }
  };

  const getRandomQuestion = useCallback(
    (type: QuestionType) => {
      if (!selectedCategory) return null;

      const allQuestions = getQuestionsForCategory(selectedCategory);
      
      // Sử dụng Set riêng cho từng loại
      const usedSet = type === 'truth' ? usedTruthQuestions : usedDareQuestions;
      const setUsedFunction = type === 'truth' ? setUsedTruthQuestions : setUsedDareQuestions;
      
      const availableQuestions = allQuestions.filter(
        (q) => q.type === type && !usedSet.has(q.id || '')
      );

      if (availableQuestions.length === 0) {
        // Reset chỉ Set của loại đó (truth hoặc dare)
        setUsedFunction(new Set());
        const resetQuestions = allQuestions.filter((q) => q.type === type);
        if (resetQuestions.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * resetQuestions.length);
        const question = resetQuestions[randomIndex];
        setUsedFunction(new Set([question.id || '']));
        return question;
      }

      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const question = availableQuestions[randomIndex];
      setUsedFunction((prev) => new Set(prev).add(question.id || ''));
      return question;
    },
    [selectedCategory, usedTruthQuestions, usedDareQuestions]
  );

  const drawNewQuestion = useCallback(
    (type: QuestionType, setIsDrawingCard: (value: boolean) => void) => {
      setIsDrawingCard(true);
      
      // Animation delay để tạo hiệu ứng rút bài
      setTimeout(() => {
        const question = getRandomQuestion(type);
        setCurrentQuestion(question);
        setIsDrawingCard(false);
      }, 600); // 600ms animation để match với flip duration
    },
    [getRandomQuestion]
  );

  const getTotalQuestions = () => {
    if (!selectedCategory) return 0;
    return getQuestionsForCategory(selectedCategory).length;
  };

  // Check xem còn câu Truth hay Dare nào không
  const hasAvailableTruth = useCallback(() => {
    if (!selectedCategory) return false;
    const allQuestions = getQuestionsForCategory(selectedCategory);
    const availableTruth = allQuestions.filter(
      (q) => q.type === 'truth' && !usedTruthQuestions.has(q.id || '')
    );
    return availableTruth.length > 0;
  }, [selectedCategory, usedTruthQuestions]);

  const hasAvailableDare = useCallback(() => {
    if (!selectedCategory) return false;
    const allQuestions = getQuestionsForCategory(selectedCategory);
    const availableDare = allQuestions.filter(
      (q) => q.type === 'dare' && !usedDareQuestions.has(q.id || '')
    );
    return availableDare.length > 0;
  }, [selectedCategory, usedDareQuestions]);

  const isGameComplete = useCallback(() => {
    if (!selectedCategory) return false;
    const allQuestions = getQuestionsForCategory(selectedCategory);
    const totalTruth = allQuestions.filter((q) => q.type === 'truth').length;
    const totalDare = allQuestions.filter((q) => q.type === 'dare').length;
    
    // Game hoàn thành khi đã chơi HẾT cả Truth VÀ Dare
    return usedTruthQuestions.size >= totalTruth && usedDareQuestions.size >= totalDare;
  }, [selectedCategory, usedTruthQuestions.size, usedDareQuestions.size]);

  return {
    currentQuestion,
    usedQuestions: new Set([...Array.from(usedTruthQuestions), ...Array.from(usedDareQuestions)]),
    drawNewQuestion,
    getTotalQuestions,
    hasAvailableTruth,
    hasAvailableDare,
    isGameComplete,
  };
}
