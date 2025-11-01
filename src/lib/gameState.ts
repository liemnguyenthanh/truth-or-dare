import { GameState } from '@/types';

export const initialGameState: GameState = {
  participants: [],
  currentParticipantIndex: 0,
  selectedCategory: null,
  selectedType: null,
  currentQuestion: null,
  gameStarted: false,
  gameMode: null,
};
