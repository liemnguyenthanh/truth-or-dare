import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { QuestionListPage } from '@/modules/questions/components/QuestionListPage';
import { gtmEvents } from '@/shared/lib/gtm';

import { CategorySelectionPage } from './CategorySelectionPage';
import { GamePlayPage } from './GamePlayPage';
import { GameSetupPage } from './GameSetupPage';
// Import from our new module structure
import { useGame } from '../hooks/useGameContext';

// Define game flow stages
enum GameStage {
  SETUP = 'SETUP',
  CATEGORY_SELECTION = 'CATEGORY_SELECTION',
  GAME_PLAY = 'GAME_PLAY',
  QUESTION_LIST = 'QUESTION_LIST',
}

export function Game() {
  const { gameState } = useGame();
  const [currentStage, setCurrentStage] = useState<GameStage>(GameStage.SETUP);

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
    // If the game has started, show the game play screen
    if (gameState.gameStarted) {
      return GameStage.GAME_PLAY;
    }

    // Otherwise, show the current stage chosen by the user
    return currentStage;
  };

  const stage = determineStage();

  return (
    <div className='min-h-screen py-12 px-4 transition-colors duration-200'>
      <AnimatePresence mode='wait'>
        {stage === GameStage.SETUP && (
          <GameSetupPage
            key='setup'
            onContinue={() => setCurrentStage(GameStage.CATEGORY_SELECTION)}
          />
        )}

        {stage === GameStage.CATEGORY_SELECTION && (
          <CategorySelectionPage
            key='category'
            onBack={() => setCurrentStage(GameStage.SETUP)}
          />
        )}

        {stage === GameStage.GAME_PLAY && <GamePlayPage key='gameplay' />}

        {stage === GameStage.QUESTION_LIST && (
          <QuestionListPage
            key='questions'
            onBack={() => setCurrentStage(GameStage.SETUP)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
