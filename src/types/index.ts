export interface Participant {
  id: string;
  name: string;
  score: {
    truths: number;
    dares: number;
  };
}

export interface QuestionData {
  participantId: string;
  type: 'truth' | 'dare';
  question: string;
  completed: boolean;
}

export interface GameState {
  participants: Participant[];
  currentQuestions: QuestionData[];
  currentQuestionIndex: number;
  isGameStarted: boolean;
}