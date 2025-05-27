'use client';
import { useContext } from 'react';

import { GameContext } from '../context/GameProvider'; // Adjust path as needed

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
