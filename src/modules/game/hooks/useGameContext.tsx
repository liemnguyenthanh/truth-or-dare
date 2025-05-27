'use client';
import {
  defaultCategories,
  defaultPlayers,
  defaultQuestions,
} from '@core/constants/gameData';
import {
  Category,
  GameMode,
  GameState,
  Participant,
  Question,
  QuestionType,
} from '@core/types/game';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

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

const initialGameState: GameState = {
  participants: [],
  currentParticipantIndex: 0,
  selectedCategory: null,
  selectedType: null,
  currentQuestion: null,
  gameStarted: false,
  gameMode: null,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [categories] = useState<Category[]>(defaultCategories);
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [shouldRemoveQueue, setShouldRemoveQueue] = useState<boolean>(false);

  // Initialize with default players and load custom questions on component mount
  useEffect(() => {
    // Add default players
    const initialPlayers: Participant[] = defaultPlayers.map((name) => ({
      id: uuidv4(),
      name,
    }));

    setGameState((prev) => ({
      ...prev,
      participants: initialPlayers,
    }));

    // Load custom questions from localStorage
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

  // Save custom questions to localStorage when they change
  const saveCustomQuestions = (allQuestions: Question[]) => {
    const customQuestions = allQuestions.filter((q) => q.isCustom);
    localStorage.setItem('customQuestions', JSON.stringify(customQuestions));
  };

  const addParticipant = (name: string) => {
    if (!name.trim()) return;

    const newParticipant: Participant = {
      id: uuidv4(),
      name: name.trim(),
    };

    setGameState((prev) => ({
      ...prev,
      participants: [...prev.participants, newParticipant],
    }));
  };

  const removeParticipant = (id: string) => {
    setGameState((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p.id !== id),
    }));
  };

  const startGame = (categoryId: string) => {
    setGameState((prev) => {
      // For quick mode, we don't need participants
      let participants = prev.participants;
      if (prev.gameMode === 'quick') {
        participants = [{ id: 'quick-player', name: 'Player' }];
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
  };

  const selectType = (type: QuestionType) => {
    const filteredQuestions = questions.filter(
      (q) => q.type === type && q.category === gameState.selectedCategory
    );

    // Select a random question from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const randomQuestion = filteredQuestions[randomIndex];

    setGameState((prev) => ({
      ...prev,
      selectedType: type,
      currentQuestion: { ...randomQuestion },
    }));

    //remove question already answered
    setQuestions((prev) => prev.filter((q) => q.id !== randomQuestion.id));
  };

  const nextParticipant = () => {
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
  };

  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      currentParticipantIndex: 0,
      selectedCategory: null,
      selectedType: null,
      currentQuestion: null,
      gameStarted: false,
      gameMode: null,
    }));
  };

  const quitGame = () => {
    const defaultParticipants = defaultPlayers.map((name) => ({
      id: uuidv4(),
      name,
    }));

    setGameState({
      ...initialGameState,
      participants: defaultParticipants,
    });
  };

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

  const setGameMode = (mode: GameMode) => {
    setGameState((prev) => ({
      ...prev,
      gameMode: mode,
    }));
  };

  const isGameStarted = gameState.gameStarted;
  //on mount, set if game started, navigation opacity to 0
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
