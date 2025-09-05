import { motion } from 'framer-motion';
import React from 'react';

import { useTranslations } from '@/hooks/useTranslations';

import { useGame } from '../hooks';

export function QuestionDisplay() {
  const { gameState, nextParticipant } = useGame();
  const t = useTranslations();
  const isQuickMode = gameState.gameMode === 'quick';

  if (!gameState.currentQuestion) return null;

  const handleNext = () => {
    if (isQuickMode) {
      // In quick mode, just reset to show truth/dare selection again
      nextParticipant();
    } else {
      // In group mode, move to next participant
      nextParticipant();
    }
  };

  return (
    <motion.div
      className='w-full max-w-md mx-auto text-center p-6'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className='p-8 rounded-xl shadow-lg mb-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700'
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <p className='text-xl font-medium text-gray-900 dark:text-gray-100'>
          {gameState.currentQuestion.text}
        </p>
      </motion.div>

      <div className='flex gap-4 justify-center'>
        <motion.button
          onClick={handleNext}
          className='px-4 py-2 rounded-lg text-white shadow-md bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isQuickMode
            ? t.gamePages.gamePlay.nextQuestion
            : t.gamePages.gamePlay.nextPlayer}
        </motion.button>
      </div>
    </motion.div>
  );
}
