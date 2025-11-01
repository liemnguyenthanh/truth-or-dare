import { act,renderHook } from '@testing-library/react-hooks';

import { useQuickGame } from '@/app/quick/hooks/useQuickGame';

// Mock question data
const mockQuestions = {
  '18': [
    { id: '1', type: 'truth' as const, question: 'Truth question 1' },
    { id: '2', type: 'dare' as const, question: 'Dare question 1' },
    { id: '3', type: 'truth' as const, question: 'Truth question 2' },
    { id: '4', type: 'dare' as const, question: 'Dare question 2' },
  ],
  party: [
    { id: '5', type: 'truth' as const, question: 'Party truth 1' },
    { id: '6', type: 'dare' as const, question: 'Party dare 1' },
  ],
};

// Mock the question data imports
jest.mock('@/data/questions/18', () => ({
  EighteenQuestions: mockQuestions['18'],
}));

jest.mock('@/data/questions/party', () => ({
  PartyQuestions: mockQuestions.party,
}));

// Mock DOM methods
const mockNav = {
  style: { display: '' },
};
const mockMain = {
  style: { paddingTop: '' },
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
    if (selector === 'nav') return mockNav as any;
    if (selector === 'main') return mockMain as any;
    return null;
  });
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('useQuickGame', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useQuickGame());

    expect(result.current.selectedCategory).toBeNull();
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.selectedType).toBeNull();
    expect(result.current.isDrawingCard).toBe(false);
    expect(result.current.truthCount).toBe(0);
    expect(result.current.dareCount).toBe(0);
    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.usedQuestions.size).toBe(0);
  });

  it('should provide correct categories', () => {
    const { result } = renderHook(() => useQuickGame());

    expect(result.current.categories).toHaveLength(2);
    expect(result.current.categories[0]).toEqual({
      id: '18',
      name: '18+',
      description: 'Câu hỏi dành cho người lớn',
      icon: '💜',
    });
    expect(result.current.categories[1]).toEqual({
      id: 'party',
      name: 'Party',
      description: 'Câu hỏi vui nhộn cho bữa tiệc',
      icon: '🎉',
    });
  });

  it('should start game and select category', () => {
    const { result } = renderHook(() => useQuickGame());

    act(() => {
      result.current.selectCategory('18');
    });

    expect(result.current.selectedCategory).toBe('18');
    expect(result.current.gameStarted).toBe(true);
  });

  it('should end game and reset all state', () => {
    const { result } = renderHook(() => useQuickGame());

    // Start game first
    act(() => {
      result.current.selectCategory('party');
    });

    // End game
    act(() => {
      result.current.endGame();
    });

    expect(result.current.selectedCategory).toBeNull();
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.selectedType).toBeNull();
    expect(result.current.isDrawingCard).toBe(false);
    expect(result.current.truthCount).toBe(0);
    expect(result.current.dareCount).toBe(0);
  });

  it('should draw truth card and update stats', () => {
    const { result } = renderHook(() => useQuickGame());

    act(() => {
      result.current.selectCategory('18');
    });

    act(() => {
      result.current.drawNewCard('truth');
    });

    expect(result.current.selectedType).toBe('truth');
    expect(result.current.isDrawingCard).toBe(true);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.currentQuestion).toBeTruthy();
    expect(result.current.currentQuestion?.type).toBe('truth');
    expect(result.current.truthCount).toBe(1);
    expect(result.current.dareCount).toBe(0);
    expect(result.current.isDrawingCard).toBe(false);
  });

  it('should draw dare card and update stats', () => {
    const { result } = renderHook(() => useQuickGame());

    act(() => {
      result.current.selectCategory('18');
    });

    act(() => {
      result.current.drawNewCard('dare');
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.currentQuestion).toBeTruthy();
    expect(result.current.currentQuestion?.type).toBe('dare');
    expect(result.current.truthCount).toBe(0);
    expect(result.current.dareCount).toBe(1);
  });

  it('should handle multiple card draws', () => {
    const { result } = renderHook(() => useQuickGame());

    act(() => {
      result.current.selectCategory('18');
    });

    // Draw truth
    act(() => {
      result.current.drawNewCard('truth');
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Draw dare
    act(() => {
      result.current.drawNewCard('dare');
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.truthCount).toBe(1);
    expect(result.current.dareCount).toBe(1);
    expect(result.current.usedQuestions.size).toBe(2);
  });

  it('should provide correct total questions', () => {
    const { result } = renderHook(() => useQuickGame());

    act(() => {
      result.current.selectCategory('18');
    });

    expect(result.current.totalQuestions).toBe(4);

    act(() => {
      result.current.selectCategory('party');
    });

    expect(result.current.totalQuestions).toBe(2);
  });

  it('should handle rapid interactions', () => {
    const { result } = renderHook(() => useQuickGame());

    act(() => {
      result.current.selectCategory('18');
      result.current.drawNewCard('truth');
      result.current.drawNewCard('dare');
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Should handle rapid interactions gracefully
    expect(result.current.selectedType).toBe('dare'); // Last draw
    expect(result.current.isDrawingCard).toBe(false);
  });

  it('should maintain state consistency across operations', () => {
    const { result } = renderHook(() => useQuickGame());

    act(() => {
      result.current.selectCategory('party');
    });

    act(() => {
      result.current.drawNewCard('truth');
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    // State should be consistent
    expect(result.current.gameStarted).toBe(true);
    expect(result.current.selectedCategory).toBe('party');
    expect(result.current.selectedType).toBe('truth');
    expect(result.current.currentQuestion?.type).toBe('truth');
    expect(result.current.truthCount).toBe(1);
    expect(result.current.usedQuestions.size).toBe(1);
  });
});
