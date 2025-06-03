'use client';
import {
  defaultCategories,
  defaultPlayers,
  defaultQuestions,
} from '@data/gameData';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { initialGameState } from '../store/gameState';

import {
  Category,
  GameMode,
  GameState,
  Participant,
  Question,
  QuestionType,
} from '@/types';

interface GameContextType {
  gameState: GameState;
  categories: Category[];
  questions: Question[];
  shouldRemoveQueue: boolean;
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  startGame: (categoryId: string) => void;
  selectType: (type: QuestionType) => void;
  nextParticipant: () => void;
  resetGame: () => void;
  quitGame: () => void;
  addCustomQuestion: (question: Omit<Question, 'id' | 'isCustom'>) => void;
  setGameMode: (mode: GameMode) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [categories] = useState<Category[]>(defaultCategories);
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [shouldRemoveQueue, setShouldRemoveQueue] = useState<boolean>(false);

  useEffect(() => {
    const initialPlayers: Participant[] = defaultPlayers.map((name) => ({
      id: uuidv4(),
      name,
    }));
    setGameState((prev) => ({
      ...prev,
      participants: initialPlayers,
    }));
    const storedQuestions = localStorage.getItem('customQuestions');
    if (storedQuestions) {
      try {
        const parsedQuestions = JSON.parse(storedQuestions) as Question[];
        setQuestions([...defaultQuestions, ...parsedQuestions]);
      } catch (error) {
        throw new Error(`Error parsing custom questions: ${error}`);
      }
    }
  }, []);

  const saveCustomQuestions = (allQuestions: Question[]) => {
    const customQuestions = allQuestions.filter((q) => q.isCustom);
    localStorage.setItem('customQuestions', JSON.stringify(customQuestions));
  };

  const setGameMode = useCallback((mode: GameMode) => {
    setGameState((prev) => ({
      ...prev,
      gameMode: mode,
      participants:
        mode === 'spin_wheel'
          ? [{ id: 'spin-wheel-player', name: 'Player' }]
          : prev.participants,
    }));
  }, []);

  const addParticipant = useCallback((name: string) => {
    if (!name.trim()) return;
    const newParticipant: Participant = {
      id: uuidv4(),
      name: name.trim(),
    };
    setGameState((prev) => ({
      ...prev,
      participants: [...prev.participants, newParticipant],
    }));
  }, []);

  const removeParticipant = useCallback((id: string) => {
    setGameState((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p.id !== id),
    }));
  }, []);

  const startGame = useCallback((categoryId: string) => {
    setGameState((prev) => {
      let participants = prev.participants;
      if (prev.gameMode === 'quick') {
        participants = [{ id: 'quick-player', name: 'Player' }];
      } else if (prev.gameMode === 'spin_wheel') {
        participants = [{ id: 'spin-wheel-player', name: 'Player' }];
      }
      return {
        ...prev,
        participants,
        selectedCategory: categoryId,
        currentParticipantIndex: 0,
        gameStarted: true,
      };
    });
    setQuestions(defaultQuestions);
  }, []);

  const selectType = useCallback(
    (type: QuestionType) => {
      const filteredQuestions = questions.filter(
        (q) => q.type === type && q.category === gameState.selectedCategory
      );
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      const randomQuestion = filteredQuestions[randomIndex];
      setGameState((prev) => ({
        ...prev,
        selectedType: type,
        currentQuestion: { ...randomQuestion },
      }));
      setQuestions((prev) => prev.filter((q) => q.id !== randomQuestion.id));
    },
    [gameState.selectedCategory, questions]
  );

  const nextParticipant = useCallback(() => {
    setShouldRemoveQueue(true);
    setGameState((prev) => {
      const nextIndex =
        (prev.currentParticipantIndex + 1) % prev.participants.length;
      return {
        ...prev,
        currentParticipantIndex: nextIndex,
        selectedType: null,
        currentQuestion: null,
      };
    });
    setTimeout(() => {
      setShouldRemoveQueue(false);
    }, 100);
  }, []);

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentParticipantIndex: 0,
      selectedCategory: null,
      selectedType: null,
      currentQuestion: null,
      gameStarted: false,
      gameMode: null,
    }));
  }, []);

  const quitGame = useCallback(() => {
    const defaultParticipants = defaultPlayers.map((name) => ({
      id: uuidv4(),
      name,
    }));
    setGameState({
      ...initialGameState,
      participants: defaultParticipants,
    });
  }, []);

  const addCustomQuestion = (question: Omit<Question, 'id' | 'isCustom'>) => {
    const newQuestion: Question = {
      ...question,
      id: uuidv4(),
      isCustom: true,
    };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    saveCustomQuestions(updatedQuestions);
  };

  const isGameStarted = gameState.gameStarted;
  useEffect(() => {
    const navigation = document.getElementById('navigation');
    if (navigation) {
      navigation.style.opacity = isGameStarted ? '0' : '1';
    }
    return () => {
      if (navigation) {
        navigation.style.opacity = '1';
      }
    };
  }, [isGameStarted]);

  const value: GameContextType = {
    gameState,
    categories,
    questions,
    shouldRemoveQueue,
    addParticipant,
    removeParticipant,
    startGame,
    selectType,
    nextParticipant,
    resetGame,
    quitGame,
    addCustomQuestion,
    setGameMode,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
