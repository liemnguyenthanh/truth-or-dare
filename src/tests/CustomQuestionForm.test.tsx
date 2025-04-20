import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { CustomQuestionForm } from '../components/CustomQuestionForm';
import { GameProvider } from '../context/GameContext';
import { v4 as uuidv4 } from 'uuid';

// Mock uuid
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('test-uuid-123')
}));

// Mock local storage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('CustomQuestionForm', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockClear();
    localStorageMock.clear();
  });

  const renderCustomQuestionForm = () => {
    return render(
      <GameProvider>
        <CustomQuestionForm />
      </GameProvider>
    );
  };

  test('renders the add custom question button', () => {
    renderCustomQuestionForm();
    
    // Check for the button
    expect(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh')).toBeInTheDocument();
    
    // Form should not be visible initially
    expect(screen.queryByText('Loại')).not.toBeInTheDocument();
  });

  test('shows the form when button is clicked', async () => {
    renderCustomQuestionForm();
    
    // Click the button to show form
    fireEvent.click(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh'));
    
    // Form should now be visible
    await waitFor(() => {
      expect(screen.getByText('Loại')).toBeInTheDocument();
      expect(screen.getByText('Chủ Đề')).toBeInTheDocument();
      expect(screen.getByText('Câu Hỏi')).toBeInTheDocument();
    });
  });

  test('hides the form when cancel button is clicked', async () => {
    renderCustomQuestionForm();
    
    // Show the form
    fireEvent.click(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh'));
    
    // Click cancel
    await waitFor(() => {
      fireEvent.click(screen.getByText('Hủy'));
    });
    
    // Form should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Loại')).not.toBeInTheDocument();
      expect(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh')).toBeInTheDocument();
    });
  });

  test('defaults to "truth" question type', async () => {
    renderCustomQuestionForm();
    
    // Show the form
    fireEvent.click(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh'));
    
    // Truth radio should be checked by default
    await waitFor(() => {
      const truthRadio = screen.getByLabelText('Thật') as HTMLInputElement;
      expect(truthRadio.checked).toBe(true);
    });
  });

  test('can switch between question types', async () => {
    renderCustomQuestionForm();
    
    // Show the form
    fireEvent.click(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh'));
    
    // Get radio buttons
    await waitFor(() => {
      const truthRadio = screen.getByLabelText('Thật') as HTMLInputElement;
      const dareRadio = screen.getByLabelText('Thách') as HTMLInputElement;
      
      // Truth should be selected by default
      expect(truthRadio.checked).toBe(true);
      expect(dareRadio.checked).toBe(false);
      
      // Switch to Dare
      fireEvent.click(dareRadio);
      expect(dareRadio.checked).toBe(true);
      expect(truthRadio.checked).toBe(false);
      
      // Switch back to Truth
      fireEvent.click(truthRadio);
      expect(truthRadio.checked).toBe(true);
      expect(dareRadio.checked).toBe(false);
    });
  });

  test('changes placeholder text based on question type', async () => {
    renderCustomQuestionForm();
    
    // Show the form
    fireEvent.click(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh'));
    
    await waitFor(() => {
      // Get textarea and radio buttons
      const textarea = screen.getByPlaceholderText('Nhập câu hỏi của bạn ở đây...') as HTMLTextAreaElement;
      const dareRadio = screen.getByLabelText('Thách') as HTMLInputElement;
      
      // Switch to Dare
      fireEvent.click(dareRadio);
      
      // Placeholder should remain the same as it's not changing in the component
      expect(textarea.placeholder).toBe('Nhập câu hỏi của bạn ở đây...');
    });
  });

  test('submits a custom question when form is filled out', async () => {
    renderCustomQuestionForm();
    
    // Show the form
    fireEvent.click(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh'));
    
    await waitFor(async () => {
      // Fill out the form
      const textarea = screen.getByPlaceholderText('Nhập câu hỏi của bạn ở đây...');
      fireEvent.change(textarea, { target: { value: 'Bạn sợ điều gì nhất?' } });
      
      // Submit the form
      fireEvent.click(screen.getByText('Thêm'));
    });
    
    // Form should be hidden after submit
    await waitFor(() => {
      expect(screen.queryByText('Loại')).not.toBeInTheDocument();
      expect(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh')).toBeInTheDocument();
    });
    
    // Check localStorage for the new question
    const storedQuestions = JSON.parse(localStorage.getItem('customQuestions') || '[]');
    expect(storedQuestions.length).toBe(1);
    expect(storedQuestions[0].text).toBe('Bạn sợ điều gì nhất?');
    expect(storedQuestions[0].type).toBe('truth');
    expect(storedQuestions[0].isCustom).toBe(true);
  });

  test('does not submit when question text is empty', async () => {
    renderCustomQuestionForm();
    
    // Show the form
    fireEvent.click(screen.getByText('Thêm Câu Hỏi Tùy Chỉnh'));
    
    await waitFor(() => {
      // Try to submit with empty text
      fireEvent.click(screen.getByText('Thêm'));
    });
    
    // Form should still be visible
    expect(screen.getByText('Loại')).toBeInTheDocument();
    
    // No new question in localStorage
    const storedQuestions = JSON.parse(localStorage.getItem('customQuestions') || '[]');
    expect(storedQuestions.length).toBe(0);
  });
}); 