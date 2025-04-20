import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategorySelectionPage } from '../components/CategorySelectionPage';
import { GameProvider } from '../context/GameContext';
import * as GameContext from '../context/GameContext';

// Mock uuid
jest.mock('uuid', () => {
  let counter = 0;
  return {
    v4: jest.fn().mockImplementation(() => `test-uuid-${counter++}`)
  }
});

describe('CategorySelectionPage', () => {
  const mockOnBack = jest.fn();
  
  const renderCategorySelectionPage = () => {
    return render(
      <GameProvider>
        <CategorySelectionPage onBack={mockOnBack} />
      </GameProvider>
    );
  };
  
  beforeEach(() => {
    // Reset mocks
    mockOnBack.mockReset();
  });
  
  test('renders the category selection page with title', () => {
    renderCategorySelectionPage();
    
    expect(screen.getByText('Thật Hay Thách')).toBeInTheDocument();
    // With default players count (which could be 0 now)
    expect(screen.getByText(/người chơi sẵn sàng!/i)).toBeInTheDocument();
  });
  
  test('displays all categories', () => {
    renderCategorySelectionPage();
    
    // Check for categories (will depend on your actual category names)
    expect(screen.getByText('Thường')).toBeInTheDocument();
    expect(screen.getByText('Tiệc Tùng')).toBeInTheDocument();
    expect(screen.getByText('Bạn Bè')).toBeInTheDocument();
    expect(screen.getByText('Cặp Đôi')).toBeInTheDocument();
  });
  
  test('calls onBack when back button is clicked', () => {
    renderCategorySelectionPage();
    
    // Click the back button
    const backButton = screen.getByText('Quay Lại Chọn Người Chơi');
    fireEvent.click(backButton);
    
    // Check if the onBack callback was called
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
  
  test('starts game when a category is selected', () => {
    // Spy on startGame function
    const startGameSpy = jest.spyOn(GameContext.useGame(), 'startGame');
    
    renderCategorySelectionPage();
    
    // Click on the first category (Casual)
    fireEvent.click(screen.getByText('Thường'));
    
    // Check if startGame was called
    expect(startGameSpy).toHaveBeenCalled();
    
    // Clean up
    startGameSpy.mockRestore();
  });
}); 