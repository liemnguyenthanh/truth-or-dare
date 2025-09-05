'use client';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { gtmEvents } from '@/lib/gtm';

import { CategorySelectionPage } from './CategorySelectionPage';
import { GamePlayPage } from './GamePlayPage';
import { GameProvider } from '../context/GameProvider';
import { useGame } from '../hooks';

// Define Quick game flow stages
enum QuickGameStage {
  CATEGORY_SELECTION = 'CATEGORY_SELECTION',
  GAME_PLAY = 'GAME_PLAY',
}

function QuickModePageContent() {
  const { gameState, setGameMode } = useGame();
  const [currentStage, setCurrentStage] = useState<QuickGameStage>(
    QuickGameStage.CATEGORY_SELECTION
  );

  // Set game mode to quick on component mount
  useEffect(() => {
    setGameMode('quick');
    gtmEvents.pageView('quick-mode');
  }, [setGameMode]);

  // Track game start
  useEffect(() => {
    if (gameState.gameStarted) {
      gtmEvents.gameStart();
    }
  }, [gameState.gameStarted]);

  // Determine the current stage based on game state
  const determineStage = () => {
    if (gameState.gameStarted) {
      return QuickGameStage.GAME_PLAY;
    }
    return currentStage;
  };

  const stage = determineStage();

  return (
    <div className='min-h-screen p-2 transition-colors duration-200'>
      <AnimatePresence mode='wait'>
        {stage === QuickGameStage.CATEGORY_SELECTION && (
          <CategorySelectionPage
            key='category'
            onBack={() => {
              // Navigate back to home page
              window.history.back();
            }}
          />
        )}

        {stage === QuickGameStage.GAME_PLAY && <GamePlayPage key='gameplay' />}
      </AnimatePresence>
    </div>
  );
}

export function QuickModePage() {
  return (
    <GameProvider>
      <QuickModePageContent />
    </GameProvider>
  );
}
