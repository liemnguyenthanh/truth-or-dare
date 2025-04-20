import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useGame, GameProvider } from '../context/GameContext';
import { v4 as uuidv4 } from 'uuid';

// Mock uuid to return predictable values
jest.mock('uuid', () => ({
  v4: jest.fn()
}));

// Access GameContext directly to reset it before tests
jest.mock('../context/GameContext', () => {
  const originalModule = jest.requireActual('../context/GameContext');
  
  // Override the useEffect that adds default players
  const GameProviderWrapper = (props: { children: React.ReactNode }) => {
    const result = originalModule.GameProvider(props);
    return result;
  };
  
  return {
    ...originalModule,
    GameProvider: GameProviderWrapper
  };
});

describe('GameContext', () => {
  beforeEach(() => {
    // Reset mocks
    (uuidv4 as jest.Mock).mockReset();
    // Set up sequential UUIDs for predictable testing
    (uuidv4 as jest.Mock).mockImplementation(() => `mock-uuid-${Math.random()}`);
    
    // Reset localStorage
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <GameProvider>{children}</GameProvider>
  );

  test('initializes with default state', () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    // Since we now initialize with default players, we need to modify our expectations
    expect(result.current.gameState.participants).toHaveLength(3);
    expect(result.current.gameState.currentParticipantIndex).toBe(0);
    expect(result.current.gameState.selectedCategory).toBeNull();
    expect(result.current.gameState.selectedType).toBeNull();
    expect(result.current.gameState.currentQuestion).toBeNull();
    expect(result.current.gameState.gameStarted).toBe(false);
    
    expect(result.current.categories).toHaveLength(4); // Default categories
    expect(result.current.questions.length).toBeGreaterThan(0); // Default questions
  });

  test('adds and removes participants', () => {
    const { result } = renderHook(() => useGame(), { wrapper });
    
    // Count initial participants (should be 3 default ones)
    const initialCount = result.current.gameState.participants.length;

    // Add participant
    act(() => {
      result.current.addParticipant('Player 1');
    });

    // Should have one more than the default count
    expect(result.current.gameState.participants).toHaveLength(initialCount + 1);
    expect(result.current.gameState.participants[initialCount].name).toBe('Player 1');

    const newParticipantId = result.current.gameState.participants[initialCount].id;

    // Remove the participant we just added
    act(() => {
      result.current.removeParticipant(newParticipantId);
    });

    // Should go back to initial count
    expect(result.current.gameState.participants).toHaveLength(initialCount);
  });

  test('starts the game and selects category', () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    // Start game with casual category (should already have enough default players)
    act(() => {
      result.current.startGame('casual');
    });

    expect(result.current.gameState.gameStarted).toBe(true);
    expect(result.current.gameState.selectedCategory).toBe('casual');
    expect(result.current.gameState.currentParticipantIndex).toBe(0);
  });

  test('selects question type and gets random question', () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    // Start game (default players are already present)
    act(() => {
      result.current.startGame('casual');
    });

    // Select truth type
    act(() => {
      result.current.selectType('truth');
    });

    expect(result.current.gameState.selectedType).toBe('truth');
    expect(result.current.gameState.currentQuestion).not.toBeNull();
    expect(result.current.gameState.currentQuestion?.type).toBe('truth');
    expect(result.current.gameState.currentQuestion?.category).toBe('casual');
  });

  test('advances to next participant', () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    // Start game with default players
    act(() => {
      result.current.startGame('casual');
      result.current.selectType('truth');
    });

    // Current participant should be the first one (index 0)
    expect(result.current.gameState.currentParticipantIndex).toBe(0);

    // Move to next participant
    act(() => {
      result.current.nextParticipant();
    });

    // Should now be the second participant (index 1)
    expect(result.current.gameState.currentParticipantIndex).toBe(1);
    expect(result.current.gameState.selectedType).toBeNull();
    expect(result.current.gameState.currentQuestion).toBeNull();

    // Move to third participant and then wrap around
    act(() => {
      result.current.nextParticipant(); // to index 2
      result.current.nextParticipant(); // should wrap to index 0
    });

    // Should wrap around to the first participant (index 0)
    expect(result.current.gameState.currentParticipantIndex).toBe(0);
  });

  test('adds custom question and stores in localStorage', () => {
    const { result } = renderHook(() => useGame(), { wrapper });
    
    const customQuestion = {
      text: 'Custom truth question',
      type: 'truth' as const,
      category: 'casual',
    };

    // Set custom UUID for the question
    (uuidv4 as jest.Mock).mockImplementationOnce(() => 'custom-question-id');

    // Add custom question
    act(() => {
      result.current.addCustomQuestion(customQuestion);
    });

    // Find the custom question in the list
    const addedQuestion = result.current.questions.find(q => q.id === 'custom-question-id');
    expect(addedQuestion).toBeDefined();
    expect(addedQuestion?.text).toBe('Custom truth question');
    expect(addedQuestion?.isCustom).toBe(true);

    // Verify it was saved to localStorage
    const storedQuestions = JSON.parse(localStorage.getItem('customQuestions') || '[]');
    expect(storedQuestions).toHaveLength(1);
    expect(storedQuestions[0].text).toBe('Custom truth question');
    expect(storedQuestions[0].id).toBe('custom-question-id');
  });

  test('resets the game state', () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    // Set up a game in progress - add more players beyond the defaults
    act(() => {
      result.current.addParticipant('Player Extra');
      result.current.startGame('casual');
      result.current.selectType('truth');
    });

    // Verify game is in progress
    expect(result.current.gameState.gameStarted).toBe(true);
    expect(result.current.gameState.selectedType).toBe('truth');
    expect(result.current.gameState.currentQuestion).not.toBeNull();
    expect(result.current.gameState.participants.length).toBeGreaterThan(3); // More than default players

    // Reset the game
    act(() => {
      result.current.resetGame();
    });

    // Game should be reset but participants should remain
    expect(result.current.gameState.gameStarted).toBe(false);
    expect(result.current.gameState.selectedType).toBeNull();
    expect(result.current.gameState.currentQuestion).toBeNull();
    expect(result.current.gameState.participants.length).toBeGreaterThan(3); // Still has all participants

    // Quit the game
    act(() => {
      result.current.quitGame();
    });

    // Game state should be reset and participants should return to default players
    expect(result.current.gameState.participants).toHaveLength(3);
    
    // Verify the participants are the default players
    const playerNames = result.current.gameState.participants.map(p => p.name);
    expect(playerNames).toContain('Vanpe');
    expect(playerNames).toContain('Lin');
    expect(playerNames).toContain('Tien');
  });

  test('initializes with default players', () => {
    const { result } = renderHook(() => useGame(), { wrapper });
    
    // Check that we have the three default players
    expect(result.current.gameState.participants).toHaveLength(3);
    
    // Verify the names of the default players
    const playerNames = result.current.gameState.participants.map(p => p.name);
    expect(playerNames).toContain('Vanpe');
    expect(playerNames).toContain('Lin');
    expect(playerNames).toContain('Tien');
  });
}); 