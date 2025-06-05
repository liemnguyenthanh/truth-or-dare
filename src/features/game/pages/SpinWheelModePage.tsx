'use client';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { gtmEvents } from '@/shared/lib/gtm';

import { CategorySelectionPage } from './CategorySelectionPage';
import { SpinWheelGamePage } from './SpinWheelGamePage';
import { GameProvider } from '../context/GameProvider';
import { useGame } from '../hooks';

// Define Spin Wheel game flow stages
enum SpinWheelGameStage {
  CATEGORY_SELECTION = 'CATEGORY_SELECTION',
  SPIN_WHEEL = 'SPIN_WHEEL',
}

function SpinWheelModePageContent() {
  const { gameState, setGameMode } = useGame();
  const [currentStage, setCurrentStage] = useState<SpinWheelGameStage>(
    SpinWheelGameStage.CATEGORY_SELECTION
  );

  // Set game mode to spin_wheel on component mount
  useEffect(() => {
    setGameMode('spin_wheel');
    gtmEvents.pageView('spin-wheel-mode');
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
      return SpinWheelGameStage.SPIN_WHEEL;
    }
    return currentStage;
  };

  const stage = determineStage();

  return (
    <div className='min-h-screen p-2 transition-colors duration-200'>
      <AnimatePresence mode='wait'>
        {stage === SpinWheelGameStage.CATEGORY_SELECTION && (
          <CategorySelectionPage
            key='category'
            onBack={() => {
              // Navigate back to home page
              window.history.back();
            }}
          />
        )}

        {stage === SpinWheelGameStage.SPIN_WHEEL && (
          <SpinWheelGamePage key='spin-wheel' />
        )}
      </AnimatePresence>
    </div>
  );
}

export function SpinWheelModePage() {
  return (
    <GameProvider>
      <SpinWheelModePageContent />
    </GameProvider>
  );
}
