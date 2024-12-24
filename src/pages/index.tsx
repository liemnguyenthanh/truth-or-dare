import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SetupScreen from '../components/SetupScreen';
import GameScreen from '../components/GameScreen';
import { useGame } from '../hooks/useGame';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const {
    gameState,
    addParticipant,
    removeParticipant,
    startGame,
    completeChallenge,
    resetGame,
    allQuestionsCompleted,
    getCurrentQuestion,
  } = useGame();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Layout><div className="min-h-[60vh]" /></Layout>;
  }

  return (
    <Layout>
      <div className="space-y-8">
        {!gameState.isGameStarted ? (
          <SetupScreen
            participants={gameState.participants}
            onAdd={addParticipant}
            onRemove={removeParticipant}
            onStart={startGame}
          />
        ) : (
          <GameScreen
            gameState={gameState}
            onComplete={completeChallenge}
            onReset={resetGame}
            allQuestionsCompleted={allQuestionsCompleted}
            currentQuestion={getCurrentQuestion()}
          />
        )}
      </div>
    </Layout>
  );
}