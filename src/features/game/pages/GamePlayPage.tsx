import { motion } from 'framer-motion';
import React from 'react';

import { useTranslations } from '@/hooks/useTranslations';

import { ParticipantQueue } from '@/components/shared/ParticipantQueue';

import { GameControls } from '../components/GameControls';
import { QuestionDisplay } from '../components/QuestionDisplay';
import { TruthOrDare } from '../components/TruthOrDare';
// Import from our new module structure
import { useGame } from '../hooks';

export function GamePlayPage() {
  const { gameState } = useGame();
  const t = useTranslations();
  const currentParticipant =
    gameState.participants[gameState.currentParticipantIndex];
  const isQuickMode = gameState.gameMode === 'quick';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col min-h-[80vh] justify-between'
    >
      <div>
        <div className='mb-6 text-center'>
          <h1 className='text-4xl font-bold text-purple-800 dark:text-purple-300 mb-2'>
            {t.gamePages.title}
          </h1>
          {!isQuickMode && (
            <h2 className='text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400'>
              {t.gamePages.gamePlay.playerTurn.replace(
                '{name}',
                currentParticipant?.name || ''
              )}
            </h2>
          )}
          {isQuickMode && (
            <p className='text-lg text-purple-600 dark:text-purple-400'>
              {t.gamePages.gamePlay.quickMode}
            </p>
          )}
        </div>

        {/* Show truth or dare selection */}
        {!gameState.selectedType && (
          <div className='mt-8'>
            <TruthOrDare />
          </div>
        )}

        {/* Show question display */}
        {gameState.selectedType && (
          <div className='mb-10'>
            <QuestionDisplay />
          </div>
        )}

        <GameControls />
      </div>

      {/* Show participant queue only for group mode */}
      {!isQuickMode && (
        <div className='mt-auto pt-6'>
          <ParticipantQueue queueLength={50} />
        </div>
      )}
    </motion.div>
  );
}
