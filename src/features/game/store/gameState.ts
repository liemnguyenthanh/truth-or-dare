import { GameState } from '@core/types/game';

export const initialGameState: GameState = {
  participants: [],
  currentParticipantIndex: 0,
  selectedCategory: null,
  selectedType: null,
  currentQuestion: null,
  gameStarted: false,
  gameMode: null,
};
