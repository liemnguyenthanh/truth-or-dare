import { motion } from 'framer-motion';
import React from 'react';

import { useTranslations } from '@/hooks/useTranslations';

import { CategorySelector } from '../components/CategorySelector';
import { useGame } from '../hooks';

interface CategorySelectionPageProps {
  onBack: () => void;
}

export function CategorySelectionPage({ onBack }: CategorySelectionPageProps) {
  const { gameState } = useGame();
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className='mb-10 text-center'>
        <h1 className='text-4xl font-bold text-purple-800 dark:text-purple-300 mb-4'>
          {t.gamePages.title}
        </h1>
        <p className='text-lg text-purple-600 dark:text-purple-300 mb-6'>
          {gameState.participants.length}{' '}
          {t.gamePages.categorySelection.playersReady}
        </p>
      </div>

      <div className='mb-10'>
        <CategorySelector />
      </div>

      <div className='mt-10'>
        <button
          onClick={onBack}
          className='block mx-auto text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200'
        >
          {t.gamePages.categorySelection.backToPlayers}
        </button>
      </div>
    </motion.div>
  );
}
