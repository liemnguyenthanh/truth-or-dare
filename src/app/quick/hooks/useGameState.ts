import { useEffect, useState } from 'react';

export function useGameState() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedType, setSelectedType] = useState<'truth' | 'dare' | null>(null);
  const [isDrawingCard, setIsDrawingCard] = useState(false);

  // Ẩn navigation khi vào game
  useEffect(() => {
    if (gameStarted) {
      const nav = document.querySelector('nav');
      const main = document.querySelector('main');
      if (nav) nav.style.display = 'none';
      if (main) main.style.paddingTop = '0';

      return () => {
        if (nav) nav.style.display = '';
        if (main) main.style.paddingTop = '';
      };
    }
  }, [gameStarted]);

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
