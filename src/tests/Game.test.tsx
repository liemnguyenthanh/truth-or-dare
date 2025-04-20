import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Game } from '../components/Game';
import { GameProvider } from '../context/GameContext';
import * as GameContext from '../context/GameContext';

// Mock uuid
jest.mock('uuid', () => {
  let counter = 0;
  return {
    v4: jest.fn().mockImplementation(() => `test-uuid-${counter++}`)
  }
});

// Mock the 3D scene component
jest.mock('../components/3d/Scene', () => ({
  Scene: () => <div data-testid="mock-scene">3D Scene</div>
}));

describe('Game Component', () => {
  const renderGame = () => {
    return render(
      <GameProvider>
        <Game />
      </GameProvider>
    );
  };
  
  test('renders setup page initially', () => {
    renderGame();
    
    // Check for setup page elements
    expect(screen.getByText('Thật Hay Thách')).toBeInTheDocument();
    expect(screen.getByText('Thêm ít nhất 2 người chơi để bắt đầu trò chơi')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập tên người chơi')).toBeInTheDocument();
  });
  
  test('navigates to category selection when continue button is clicked', () => {
    renderGame();
    
    // Add two players to enable the continue button
    const input = screen.getByPlaceholderText('Nhập tên người chơi');
    const addButton = screen.getByRole('button', { name: 'Thêm' });
    
    fireEvent.change(input, { target: { value: 'Player 1' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'Player 2' } });
    fireEvent.click(addButton);
    
    // Click continue button
    const continueButton = screen.getByText('Tiếp Tục Đến Chủ Đề');
    fireEvent.click(continueButton);
    
    // Check if we're on the category selection page
    expect(screen.getByText(/người chơi sẵn sàng!/i)).toBeInTheDocument();
    expect(screen.getByText('Quay Lại Chọn Người Chơi')).toBeInTheDocument();
    expect(screen.getByText('Thường')).toBeInTheDocument();
  });
  
  test('navigates back to setup page from category selection', () => {
    // Set up initial state to be in category selection
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, jest.fn()]) // isSpinning
      .mockImplementationOnce(() => ['CATEGORY_SELECTION', jest.fn()]); // currentStage
    
    renderGame();
    
    // Click back button
    const backButton = screen.getByText('Quay Lại Chọn Người Chơi');
    fireEvent.click(backButton);
    
    // Should navigate back to setup
    expect(screen.getByText('Thêm ít nhất 2 người chơi để bắt đầu trò chơi')).toBeInTheDocument();
    
    // Clean up
    jest.restoreAllMocks();
  });
  
  test('navigates to gameplay when game is started', () => {
    // Mock the game state to be started
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
    
    renderGame();
    
    // Should show gameplay elements
    expect(screen.getByTestId('mock-scene')).toBeInTheDocument();
    expect(screen.getByText('THẬT')).toBeInTheDocument();
    expect(screen.getByText('THÁCH')).toBeInTheDocument();
    
    // Clean up
    jest.restoreAllMocks();
  });
}); 