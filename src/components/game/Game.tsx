'use client';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { gtmEvents } from '@/lib/gtm';
// Import from our new module structure
import { useGame } from '@/hooks/useGame';

import { CategorySelectionPage } from '@/features/game/pages/CategorySelectionPage';
import { GameModeSelectionPage } from '@/features/game/pages/GameModeSelectionPage';
import { GamePlayPage } from '@/features/game/pages/GamePlayPage';
import { GameSetupPage } from '@/features/game/pages/GameSetupPage';
import { SpinWheelGamePage } from '@/features/game/pages/SpinWheelGamePage';
import { QuestionListPage } from '@/features/questions/pages/QuestionListPage';

// Define game flow stages
enum GameStage {
  GAME_MODE_SELECTION = 'GAME_MODE_SELECTION',
  SETUP = 'SETUP',
  CATEGORY_SELECTION = 'CATEGORY_SELECTION',
  GAME_PLAY = 'GAME_PLAY',
  SPIN_WHEEL = 'SPIN_WHEEL',
  QUESTION_LIST = 'QUESTION_LIST',
}

export function Game() {
  const { gameState } = useGame();
  const [currentStage, setCurrentStage] = useState<GameStage>(
    GameStage.GAME_MODE_SELECTION
  );

  // Track page view on component mount
  useEffect(() => {
    gtmEvents.pageView('home');
  }, []);

  // Track game start
  useEffect(() => {
    if (gameState.gameStarted) {
      gtmEvents.gameStart();
    }
  }, [gameState.gameStarted]);

  // Determine the current stage based on game state and current stage
  const determineStage = () => {
    // If the game has started, show the appropriate game screen
    if (gameState.gameStarted) {
      return gameState.gameMode === 'spin_wheel'
        ? GameStage.SPIN_WHEEL
        : GameStage.GAME_PLAY;
    }

    // If no game mode is selected, show game mode selection
    if (!gameState.gameMode) {
      return GameStage.GAME_MODE_SELECTION;
    }

    // Otherwise, show the current stage chosen by the user
    return currentStage;
  };

  const stage = determineStage();

  return (
    <div className='min-h-screen p-2 transition-colors duration-200'>
      <AnimatePresence mode='wait'>
        {stage === GameStage.GAME_MODE_SELECTION && (
          <GameModeSelectionPage
            key='mode-selection'
            onModeSelected={(mode) => {
              if (mode === 'spin_wheel') {
                setCurrentStage(GameStage.CATEGORY_SELECTION);
              } else if (mode === 'quick') {
                setCurrentStage(GameStage.CATEGORY_SELECTION);
              } else {
                setCurrentStage(GameStage.SETUP);
              }
            }}
          />
        )}

        {stage === GameStage.SETUP && (
          <GameSetupPage
            key='setup'
            onContinue={() => setCurrentStage(GameStage.CATEGORY_SELECTION)}
          />
        )}

        {stage === GameStage.CATEGORY_SELECTION && (
          <CategorySelectionPage
            key='category'
            onBack={() => {
              if (
                gameState.gameMode === 'quick' ||
                gameState.gameMode === 'spin_wheel'
              ) {
                setCurrentStage(GameStage.GAME_MODE_SELECTION);
              } else {
                setCurrentStage(GameStage.SETUP);
              }
            }}
          />
        )}

        {stage === GameStage.GAME_PLAY && <GamePlayPage key='gameplay' />}

        {stage === GameStage.SPIN_WHEEL && (
          <SpinWheelGamePage key='spin-wheel' />
        )}

        {stage === GameStage.QUESTION_LIST && (
          <QuestionListPage
            key='questions'
            onBack={() => setCurrentStage(GameStage.GAME_MODE_SELECTION)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
