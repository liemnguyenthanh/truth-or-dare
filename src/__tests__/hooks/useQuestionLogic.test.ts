import { act,renderHook } from '@testing-library/react-hooks';

import { useQuestionLogic } from '@/app/quick/hooks/useQuestionLogic';

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

describe('useQuestionLogic', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with null question and empty used questions', () => {
    const { result } = renderHook(() => useQuestionLogic('18'));

    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.usedQuestions.size).toBe(0);
  });

  it('should get correct total questions for 18+ category', () => {
    const { result } = renderHook(() => useQuestionLogic('18'));

    expect(result.current.getTotalQuestions()).toBe(4);
  });

  it('should get correct total questions for party category', () => {
    const { result } = renderHook(() => useQuestionLogic('party'));

    expect(result.current.getTotalQuestions()).toBe(2);
  });

  it('should return 0 for unknown category', () => {
    const { result } = renderHook(() => useQuestionLogic('unknown'));

    expect(result.current.getTotalQuestions()).toBe(0);
  });

  it('should draw a truth question', async () => {
    const { result } = renderHook(() => useQuestionLogic('18'));
    const setIsDrawingCard = jest.fn();

    act(() => {
      result.current.drawNewQuestion('truth', setIsDrawingCard);
    });

    expect(setIsDrawingCard).toHaveBeenCalledWith(true);

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.currentQuestion).toBeTruthy();
    expect(result.current.currentQuestion?.type).toBe('truth');
    expect(setIsDrawingCard).toHaveBeenCalledWith(false);
  });

  it('should draw a dare question', async () => {
    const { result } = renderHook(() => useQuestionLogic('18'));
    const setIsDrawingCard = jest.fn();

    act(() => {
      result.current.drawNewQuestion('dare', setIsDrawingCard);
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.currentQuestion).toBeTruthy();
    expect(result.current.currentQuestion?.type).toBe('dare');
  });

  it('should track used questions', () => {
    const { result } = renderHook(() => useQuestionLogic('18'));
    const setIsDrawingCard = jest.fn();

    act(() => {
      result.current.drawNewQuestion('truth', setIsDrawingCard);
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.usedQuestions.size).toBe(1);
    expect(result.current.usedQuestions.has('1')).toBe(true);
  });

  it('should reset used questions when all questions are used', () => {
    const { result } = renderHook(() => useQuestionLogic('party'));
    const setIsDrawingCard = jest.fn();

    // Draw all truth questions (only 1 in party category)
    act(() => {
      result.current.drawNewQuestion('truth', setIsDrawingCard);
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Draw again - should reset and reuse
    act(() => {
      result.current.drawNewQuestion('truth', setIsDrawingCard);
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.usedQuestions.size).toBe(1);
  });

  it('should handle null category gracefully', () => {
    const { result } = renderHook(() => useQuestionLogic(null));
    const setIsDrawingCard = jest.fn();

    act(() => {
      result.current.drawNewQuestion('truth', setIsDrawingCard);
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.currentQuestion).toBeNull();
  });

  it('should not draw question if no questions available', () => {
    const { result } = renderHook(() => useQuestionLogic('unknown'));
    const setIsDrawingCard = jest.fn();

    act(() => {
      result.current.drawNewQuestion('truth', setIsDrawingCard);
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current.currentQuestion).toBeNull();
  });

  it('should handle rapid question drawing', () => {
    const { result } = renderHook(() => useQuestionLogic('18'));
    const setIsDrawingCard = jest.fn();

    act(() => {
      result.current.drawNewQuestion('truth', setIsDrawingCard);
      result.current.drawNewQuestion('dare', setIsDrawingCard);
    });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Should have the last drawn question
    expect(result.current.currentQuestion).toBeTruthy();
    expect(result.current.usedQuestions.size).toBeGreaterThan(0);
  });
});
