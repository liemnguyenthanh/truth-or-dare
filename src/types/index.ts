export type QuestionType = 'truth' | 'dare';

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

export interface GameState {
  participants: Participant[];
  currentParticipantIndex: number;
  selectedCategory: string | null;
  selectedType: QuestionType | null;
  currentQuestion: Question | null;
  gameStarted: boolean;
} 