'use client';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

import { gtmEvents } from '@/lib/gtm';
import { soundManager } from '@/lib/sounds';
import { useTranslations } from '@/hooks/useTranslations';

import { GameControls } from '../components/GameControls';
import { useGame } from '../hooks';

const WHEEL_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
];

export function SpinWheelGamePage() {
  const {
    gameState,
    questions,
    selectType,
    resetGame,
    setGameMode,
    startGame,
  } = useGame();
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  const t = useTranslations();

  // Get questions based on selected category
  const availableQuestions = questions.filter(
    (q) => q.category === gameState.selectedCategory
  );

  const handleSpin = async () => {
    if (isSpinning || availableQuestions.length === 0) return;

    setIsSpinning(true);
    gtmEvents.buttonClick('spin_wheel', 'spin_wheel');
    soundManager.play('spin');

    // Random number of full rotations (3-5) plus random ending position
    const fullRotations = Math.floor(Math.random() * 3) + 3;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    const segmentAngle = 360 / availableQuestions.length;
    const endingDegrees = questionIndex * segmentAngle;
    const totalRotation = fullRotations * 360 + endingDegrees;

    await controls.start({
      rotate: totalRotation,
      transition: {
        duration: 3,
        ease: [0.2, 0, 0.2, 1],
      },
    });

    soundManager.stop('spin');
    soundManager.play('win');

    // Select the question type and update game state
    const selectedQuestion = availableQuestions[questionIndex];
    selectType(selectedQuestion.type);
    setIsSpinning(false);
  };

  const handleCloseQuestion = () => {
    // Reset game state but keep the game mode and category
    const currentMode = gameState.gameMode;
    const currentCategory = gameState.selectedCategory;
    resetGame();
    if (currentMode) {
      setGameMode(currentMode);
      if (currentCategory) {
        startGame(currentCategory);
      }
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className='relative w-full max-w-[300px] sm:max-w-md md:max-w-lg lg:max-w-2xl aspect-square mb-8'>
        {/* Spin Button - Adjusted for mobile */}
        <button
          onClick={handleSpin}
          disabled={isSpinning || availableQuestions.length === 0}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
            w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
            rounded-full bg-purple-600 text-white shadow-lg 
            hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed 
            transition-all duration-200 transform hover:scale-105
            text-base sm:text-lg md:text-xl font-bold
            flex items-center justify-center'
        >
          {isSpinning
            ? t.gamePages.spinWheel.spinning
            : t.gamePages.spinWheel.spinToStart}
        </button>

        {/* Wheel */}
        <motion.div
          animate={controls}
          className='w-full h-full rounded-full overflow-hidden relative 
            border-4 sm:border-6 md:border-8 border-white shadow-2xl
            bg-gray-100 dark:bg-gray-700'
          style={{ transformOrigin: 'center center' }}
        >
          {availableQuestions.map((question, index) => {
            const rotation = (index * 360) / availableQuestions.length;
            return (
              <div
                key={question.id}
                className={`absolute w-1/2 h-1/2 origin-bottom-right ${
                  WHEEL_COLORS[index % WHEEL_COLORS.length]
                }`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div
                  className='absolute inset-0 flex items-center justify-center 
                    text-white font-bold text-xs sm:text-sm md:text-base p-2 text-center
                    transition-transform'
                  style={{
                    transform: `rotate(${
                      90 + 360 / availableQuestions.length / 2
                    }deg)`,
                    transformOrigin: 'center center',
                  }}
                >
                  {question.type === 'truth'
                    ? `🤔 ${t.questions.types.truth}`
                    : `🎯 ${t.questions.types.dare}`}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Pointer - Adjusted size for mobile */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-8 sm:h-12 z-20'>
          <div
            className='w-0 h-0 
            border-l-[0.75rem] sm:border-l-[1rem] 
            border-r-[0.75rem] sm:border-r-[1rem] 
            border-t-[1.5rem] sm:border-t-[2rem] 
            border-l-transparent border-r-transparent border-t-red-500'
          />
        </div>
      </div>

      {/* Question Modal - Improved responsive design */}
      {gameState.currentQuestion && !isSpinning && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className='w-full max-w-[90vw] sm:max-w-md md:max-w-lg 
              bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
              p-4 sm:p-6 md:p-8 relative'
          >
            <div className='absolute -top-2 -right-2 sm:-top-4 sm:-right-4'>
              <button
                onClick={handleCloseQuestion}
                className='w-6 h-6 sm:w-8 sm:h-8 rounded-full 
                  bg-red-500 text-white flex items-center justify-center 
                  hover:bg-red-600 transition-colors transform hover:scale-105'
              >
                ✕
              </button>
            </div>

            <div className='text-center'>
              <div className='text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6'>
                {gameState.currentQuestion.type === 'truth' ? '🤔' : '🎯'}
              </div>
              <h2
                className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6 
                text-purple-600 dark:text-purple-400'
              >
                {gameState.currentQuestion.type === 'truth'
                  ? t.questions.types.truth
                  : t.questions.types.dare}
              </h2>
              <p
                className='text-lg sm:text-xl text-gray-800 dark:text-gray-200 
                mb-6 sm:mb-8 leading-relaxed'
              >
                {gameState.currentQuestion.text}
              </p>
              <button
                onClick={handleCloseQuestion}
                className='px-4 sm:px-6 py-2 sm:py-3 
                  bg-purple-600 text-white rounded-lg 
                  hover:bg-purple-700 transition-all duration-200 
                  transform hover:scale-105'
              >
                {t.gamePages.spinWheel.selectQuestion}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Empty state message */}
      {availableQuestions.length === 0 && (
        <p className='text-center text-gray-500 dark:text-gray-400 mt-4'>
          {t.gamePages.spinWheel.noQuestions}
        </p>
      )}

      {/* Game Controls */}
      <GameControls />
    </div>
  );
}
