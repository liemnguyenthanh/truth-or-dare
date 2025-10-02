'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { DRINK_QUESTIONS, DrinkQuestion } from '@/data/questions/drink';

export default function DrinkPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<DrinkQuestion | null>(
    null
  );
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [isFlipping, setIsFlipping] = useState(false);

  // Ẩn navigation khi vào trang này
  useEffect(() => {
    // Ẩn navigation
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    if (nav) nav.style.display = 'none';
    if (main) main.style.paddingTop = '0';

    // Cleanup khi rời trang
    return () => {
      if (nav) nav.style.display = '';
      if (main) main.style.paddingTop = '';
    };
  }, []);

  // Lấy câu hỏi ngẫu nhiên
  const getRandomQuestion = useCallback(() => {
    const availableQuestions = DRINK_QUESTIONS.filter(
      (_, index) => !usedQuestions.has(index)
    );

    if (availableQuestions.length === 0) {
      // Reset nếu đã hết câu hỏi
      setUsedQuestions(new Set());
      const randomIndex = Math.floor(Math.random() * DRINK_QUESTIONS.length);
      return {
        question: DRINK_QUESTIONS[randomIndex],
        originalIndex: randomIndex,
      };
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    const originalIndex = DRINK_QUESTIONS.findIndex(
      (q) => q === selectedQuestion
    );

    return { question: selectedQuestion, originalIndex };
  }, [usedQuestions]);

  // Rút bài mới
  const drawNewCard = useCallback(() => {
    setIsFlipping(true);

    setTimeout(() => {
      const { question, originalIndex } = getRandomQuestion();
      setCurrentQuestion(question);
      setUsedQuestions((prev) => new Set(prev).add(originalIndex));
      setIsFlipping(false);
    }, 300);
  }, [getRandomQuestion]);

  // Rút bài đầu tiên khi load trang
  useEffect(() => {
    drawNewCard();
  }, []);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
      {/* Header với nút quay lại */}
      <div className='flex items-center justify-between mb-6 pt-4'>
        <button
          onClick={handleBack}
          className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/70 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          <span className='font-medium'>Quay lại</span>
        </button>
      </div>

      {/* Main Card Area */}
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <motion.div
          key={currentQuestion?.text}
          initial={{ rotateY: 180, scale: 0.8 }}
          animate={{
            rotateY: isFlipping ? 180 : 0,
            scale: isFlipping ? 0.8 : 1,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 100,
          }}
          className='relative w-full max-w-md'
        >
          {/* Card */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-4 border-orange-200 dark:border-orange-800 min-h-[300px] flex flex-col justify-center items-center text-center'>
            {currentQuestion && !isFlipping ? (
              <>
                <div className='text-4xl mb-4'>🃏</div>
                <p className='text-lg text-gray-800 dark:text-white leading-relaxed'>
                  {currentQuestion.text}
                </p>
              </>
            ) : (
              <div className='flex flex-col items-center'>
                <div className='text-6xl mb-4'>🍺</div>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500'></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Draw Button */}
        <motion.button
          onClick={drawNewCard}
          disabled={isFlipping}
          className='mt-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed'
          whileTap={{ scale: 0.95 }}
        >
          {isFlipping ? (
            <div className='flex items-center gap-2'>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
              Đang rút bài...
            </div>
          ) : (
            '🎲 Rút bài mới'
          )}
        </motion.button>

        {/* Stats */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Đã rút: {usedQuestions.size}/{DRINK_QUESTIONS.length} bài
          </p>
          {usedQuestions.size === DRINK_QUESTIONS.length && (
            <p className='text-xs text-orange-600 dark:text-orange-400 mt-1'>
              🔄 Đã reset bộ bài
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
