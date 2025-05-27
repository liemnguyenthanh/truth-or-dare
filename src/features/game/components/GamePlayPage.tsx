import { ParticipantQueue } from '@participants/components/ParticipantQueue';
import { motion } from 'framer-motion';
import React from 'react';

import { GameControls } from './GameControls';
import { QuestionDisplay } from './QuestionDisplay';
import { TruthOrDare } from './TruthOrDare';
// Import from our new module structure
import { useGame } from '../hooks';

export function GamePlayPage() {
  const { gameState } = useGame();
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
            Thật Hay Thách
          </h1>
          {!isQuickMode && (
            <h2 className='text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400'>
              Lượt của {currentParticipant?.name}
            </h2>
          )}
          {isQuickMode && (
            <p className='text-lg text-purple-600 dark:text-purple-400'>
              Chế độ nhanh - Chọn thật hay thách!
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
