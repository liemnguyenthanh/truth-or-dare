export type QuestionType = 'truth' | 'dare';

export type GameMode = 'quick' | 'group' | 'spin_wheel' | 'couples';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  category: string;
  isCustom?: boolean;
}

export interface Participant {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface GameModeOption {
  id: GameMode;
  name: string;
  description: string;
  icon: string;
  isNew?: boolean;
}

export interface GameState {
  participants: Participant[];
  currentParticipantIndex: number;
  selectedCategory: string | null;
  selectedType: QuestionType | null;
  currentQuestion: Question | null;
  gameStarted: boolean;
  gameMode: GameMode | null;
}

export interface CouplePosition {
  id: string;
  name: string;
  image: string;
  category: string;
  difficulty: number; // 1-5
}

export interface CoupleCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  requiresAdult: boolean;
}
