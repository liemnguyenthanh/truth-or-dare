'use client';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { gtmEvents } from '@/shared/lib/gtm';

import { CategorySelectionPage } from './CategorySelectionPage';
import { GamePlayPage } from './GamePlayPage';
import { GameSetupPage } from './GameSetupPage';
import { GameProvider } from '../context/GameProvider';
import { useGame } from '../hooks';

// Define Group game flow stages
enum GroupGameStage {
  SETUP = 'SETUP',
  CATEGORY_SELECTION = 'CATEGORY_SELECTION',
  GAME_PLAY = 'GAME_PLAY',
}

function GroupModePageContent() {
  const { gameState, setGameMode } = useGame();
  const [currentStage, setCurrentStage] = useState<GroupGameStage>(
    GroupGameStage.SETUP
  );

  // Set game mode to group on component mount
  useEffect(() => {
    setGameMode('group');
    gtmEvents.pageView('group-mode');
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
      return GroupGameStage.GAME_PLAY;
    }
    return currentStage;
  };

  const stage = determineStage();

  return (
    <div className='min-h-screen p-2 transition-colors duration-200'>
      <AnimatePresence mode='wait'>
        {stage === GroupGameStage.SETUP && (
          <GameSetupPage
            key='setup'
            onContinue={() =>
              setCurrentStage(GroupGameStage.CATEGORY_SELECTION)
            }
          />
        )}

        {stage === GroupGameStage.CATEGORY_SELECTION && (
          <CategorySelectionPage
            key='category'
            onBack={() => setCurrentStage(GroupGameStage.SETUP)}
          />
        )}

        {stage === GroupGameStage.GAME_PLAY && <GamePlayPage key='gameplay' />}
      </AnimatePresence>
    </div>
  );
}

export function GroupModePage() {
  return (
    <GameProvider>
      <GroupModePageContent />
    </GameProvider>
  );
}
