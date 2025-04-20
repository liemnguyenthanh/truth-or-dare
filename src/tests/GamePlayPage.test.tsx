import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GamePlayPage } from '../pages/GamePlayPage';
import { GameProvider } from '../context/GameContext';
import * as GameContext from '../context/GameContext';

// Mock uuid
jest.mock('uuid', () => {
  let counter = 0;
  return {
    v4: jest.fn().mockImplementation(() => `test-uuid-${counter++}`)
  }
});

// Mock the 3D scene component since it can be problematic in tests
jest.mock('../components/3d/Scene', () => ({
  Scene: () => <div data-testid="mock-scene">3D Scene</div>
}));

describe('GamePlayPage', () => {
  test('renders truth or dare selection when no type selected', () => {
    // Mock useGame to return a game state without a selected type
    jest.spyOn(GameContext, 'useGame').mockImplementation(() => ({
      gameState: {
        participants: [{ id: 'player-1', name: 'Player 1' }],
        currentParticipantIndex: 0,
        selectedCategory: 'casual',
        selectedType: null,
        currentQuestion: null,
        gameStarted: true
      },
      categories: [],
      questions: [],
      addParticipant: jest.fn(),
      removeParticipant: jest.fn(),
      startGame: jest.fn(),
      selectType: jest.fn(),
      nextQuestion: jest.fn(),
      nextParticipant: jest.fn(),
      resetGame: jest.fn(),
      quitGame: jest.fn(),
      addCustomQuestion: jest.fn()
    }));
    
    render(
      <GameProvider>
        <GamePlayPage />
      </GameProvider>
    );
    
    expect(screen.getByText('Thật Hay Thách')).toBeInTheDocument();
    expect(screen.getByTestId('mock-scene')).toBeInTheDocument();
    expect(screen.getByText('THẬT')).toBeInTheDocument();
    expect(screen.getByText('THÁCH')).toBeInTheDocument();
    
    // Cleanup
    jest.restoreAllMocks();
  });
  
  test('renders question display when type is selected', () => {
    // Mock useGame to return a game state with a selected type and question
    jest.spyOn(GameContext, 'useGame').mockImplementation(() => ({
      gameState: {
        participants: [{ id: 'player-1', name: 'Player 1' }],
        currentParticipantIndex: 0,
        selectedCategory: 'casual',
        selectedType: 'truth',
        currentQuestion: {
          id: 'q1',
          text: 'Test question?',
          type: 'truth',
          category: 'casual',
          isCustom: false
        },
        gameStarted: true
      },
      categories: [],
      questions: [],
      addParticipant: jest.fn(),
      removeParticipant: jest.fn(),
      startGame: jest.fn(),
      selectType: jest.fn(),
      nextQuestion: jest.fn(),
      nextParticipant: jest.fn(),
      resetGame: jest.fn(),
      quitGame: jest.fn(),
      addCustomQuestion: jest.fn()
    }));
    
    render(<GamePlayPage />);
    
    // Check for question-related elements
    expect(screen.getByText('Thật Hay Thách')).toBeInTheDocument();
    expect(screen.getByText('Test question?')).toBeInTheDocument();
    expect(screen.getByText('Người Chơi Tiếp')).toBeInTheDocument();
    
    // Cleanup
    jest.restoreAllMocks();
  });
}); 