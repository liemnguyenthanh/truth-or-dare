import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GameSetupPage } from '../pages/GameSetupPage';
import { GameProvider } from '../context/GameContext';

// Mock uuid
jest.mock('uuid', () => {
  let counter = 0;
  return {
    v4: jest.fn().mockImplementation(() => `test-uuid-${counter++}`)
  }
});

describe('GameSetupPage', () => {
  const mockOnContinue = jest.fn();
  
  const renderGameSetupPage = () => {
    return render(
      <GameProvider>
        <GameSetupPage onContinue={mockOnContinue} />
      </GameProvider>
    );
  };
  
  beforeEach(() => {
    // Reset mocks
    mockOnContinue.mockReset();
  });
  
  test('renders the setup page with title', () => {
    renderGameSetupPage();
    
    expect(screen.getByText('Thật Hay Thách')).toBeInTheDocument();
    expect(screen.getByText('Thêm ít nhất 2 người chơi để bắt đầu trò chơi')).toBeInTheDocument();
  });
  
  test('displays continue button when enough players are present', () => {
    renderGameSetupPage();
    
    // With default players (which should be 0 now), the button should exist
    expect(screen.queryByText('Tiếp Tục Đến Chủ Đề')).toBeNull();
    
    // Add players to reach the minimum
    const input = screen.getByPlaceholderText('Nhập tên người chơi');
    const addButton = screen.getByRole('button', { name: 'Thêm' });
    
    // Add first player
    fireEvent.change(input, { target: { value: 'Player 1' } });
    fireEvent.click(addButton);
    
    // Add second player
    fireEvent.change(input, { target: { value: 'Player 2' } });
    fireEvent.click(addButton);
    
    // Now the continue button should appear
    expect(screen.getByText('Tiếp Tục Đến Chủ Đề')).toBeInTheDocument();
  });
  
  test('calls onContinue when continue button is clicked', () => {
    renderGameSetupPage();
    
    // Add two players to make the continue button appear
    const input = screen.getByPlaceholderText('Nhập tên người chơi');
    const addButton = screen.getByRole('button', { name: 'Thêm' });
    
    fireEvent.change(input, { target: { value: 'Player 1' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'Player 2' } });
    fireEvent.click(addButton);
    
    // Click the continue button
    const continueButton = screen.getByText('Tiếp Tục Đến Chủ Đề');
    fireEvent.click(continueButton);
    
    // Check if the onContinue callback was called
    expect(mockOnContinue).toHaveBeenCalledTimes(1);
  });
}); 