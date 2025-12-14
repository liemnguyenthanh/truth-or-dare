import { useState } from 'react';

export function useGameState() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedType, setSelectedType] = useState<'truth' | 'dare' | null>(
    null
  );
  const [isDrawingCard, setIsDrawingCard] = useState(false);

  const startGame = (category: string) => {
    setSelectedCategory(category);
    setGameStarted(true);
  };

  const endGame = () => {
    setGameStarted(false);
    setSelectedCategory(null);
    setSelectedType(null);
    setIsDrawingCard(false);
  };

  return {
    selectedCategory,
    gameStarted,
    selectedType,
    isDrawingCard,
    setSelectedType,
    setIsDrawingCard,
    startGame,
    endGame,
  };
}
