import { useLocalStorage } from './useLocalStorage';
import { GameState, Participant, QuestionData } from '../types';
import { defaultPlayers } from '../config/defaultPlayers';
import { supabase } from '@/lib/supabase';

const createInitialState = (): GameState => {
  const initialParticipants: Participant[] = defaultPlayers.map(name => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name,
    score: { truths: 0, dares: 0 },
  }));

  return {
    participants: initialParticipants,
    currentQuestions: [],
    currentQuestionIndex: 0,
    isGameStarted: false
  };
};

export function useGame() {
  const [gameState, setGameState] = useLocalStorage<GameState>('truthOrDare', createInitialState());

  const generateQuestions = async (participants: Participant[]): Promise<QuestionData[]> => {
    if (participants.length < 2) return [];
    
    const { data: questions } = await supabase
      .from('question')
      .select('*');

    if (!questions) return [];
    
    const shuffledParticipants = [...participants]
      .sort(() => Math.random() - 0.5);
    
    return shuffledParticipants.map(participant => {
      const type = Math.random() > 0.5 ? 'truth' : 'dare';
      const typeQuestions = questions.filter(q => q.type === type);
      const randomIndex = Math.floor(Math.random() * typeQuestions.length);
      
      return {
        participantId: participant.id,
        type,
        question: typeQuestions[randomIndex].question,
        completed: false
      };
    });
  };

  const addParticipant = (name: string) => {
    if (!name.trim()) return;
    
    const newParticipant: Participant = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      score: { truths: 0, dares: 0 },
    };

    setGameState(prev => ({
      ...prev,
      participants: [...prev.participants, newParticipant],
    }));
  };

  const removeParticipant = (id: string) => {
    setGameState(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== id),
    }));
  };

  const startGame = async () => {
    if (gameState.participants.length < 2) return;
    
    const questions = await generateQuestions(gameState.participants);
    setGameState(prev => ({
      ...prev,
      currentQuestions: questions,
      currentQuestionIndex: 0,
      isGameStarted: true
    }));
  };

  const completeChallenge = (participantId: string) => {
    setGameState(prev => {
      const currentQuestion = prev.currentQuestions[prev.currentQuestionIndex];
      if (!currentQuestion || currentQuestion.participantId !== participantId) {
        return prev;
      }

      const updatedQuestions = [...prev.currentQuestions];
      updatedQuestions[prev.currentQuestionIndex] = {
        ...currentQuestion,
        completed: true
      };

      const updatedParticipants = prev.participants.map(p => 
        p.id === participantId
          ? {
              ...p,
              score: {
                ...p.score,
                [currentQuestion.type === 'truth' ? 'truths' : 'dares']: 
                  p.score[currentQuestion.type === 'truth' ? 'truths' : 'dares'] + 1,
              },
            }
          : p
      );

      return {
        ...prev,
        participants: updatedParticipants,
        currentQuestions: updatedQuestions,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      };
    });
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestions: [],
      currentQuestionIndex: 0,
      isGameStarted: false
    }));
  };

  const getCurrentQuestion = (): QuestionData | null => {
    if (!gameState.currentQuestions.length || 
        gameState.currentQuestionIndex >= gameState.currentQuestions.length) {
      return null;
    }
    return gameState.currentQuestions[gameState.currentQuestionIndex];
  };

  const allQuestionsCompleted = 
    gameState.currentQuestionIndex >= gameState.currentQuestions.length;

  return {
    gameState,
    addParticipant,
    removeParticipant,
    startGame,
    completeChallenge,
    resetGame,
    allQuestionsCompleted,
    getCurrentQuestion,
  };
}