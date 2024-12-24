import { motion } from 'framer-motion';
import QuestionDisplay from './QuestionDisplay';
import { GameState, QuestionData } from '../types';

interface GameScreenProps {
  gameState: GameState;
  onComplete: (participantId: string) => void;
  onReset: () => void;
  allQuestionsCompleted: boolean;
  currentQuestion: QuestionData | null;
}

export default function GameScreen({ 
  gameState, 
  onComplete, 
  onReset,
  allQuestionsCompleted,
  currentQuestion
}: GameScreenProps) {
  if (!currentQuestion) {
    if (allQuestionsCompleted) {
      return (
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-purple-400">Game Complete!</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xl font-bold"
          >
            Play Again
          </motion.button>
        </div>
      );
    }
    return null;
  }

  const participant = gameState.participants.find(
    p => p.id === currentQuestion.participantId
  );

  if (!participant) return null;

  const nextParticipant = gameState.participants[
    (gameState.participants.findIndex(p => p.id === participant.id) + 1) % gameState.participants.length
  ];

  return (
    <div className="space-y-6">
      <QuestionDisplay
        participant={participant}
        question={currentQuestion.question}
        questionType={currentQuestion.type}
        completed={currentQuestion.completed}
        onComplete={() => onComplete(currentQuestion.participantId)}
      />
      {!currentQuestion.completed && (
        <p className="text-center text-purple-400">
          Next up: {nextParticipant.name}
        </p>
      )}
    </div>
  );
}