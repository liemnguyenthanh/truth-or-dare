import { act,renderHook } from '@testing-library/react-hooks';

import { useGameState } from '@/app/quick/hooks/useGameState';

// Mock DOM methods
const mockNav = {
  style: { display: '' },
};
const mockMain = {
  style: { paddingTop: '' },
};

beforeEach(() => {
  // Mock DOM elements
  jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
    if (selector === 'nav') return mockNav as any;
    if (selector === 'main') return mockMain as any;
    return null;
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useGameState', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useGameState());

    expect(result.current.selectedCategory).toBeNull();
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.selectedType).toBeNull();
    expect(result.current.isDrawingCard).toBe(false);
  });

  it('should start game and update state', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.startGame('18');
    });

    expect(result.current.selectedCategory).toBe('18');
    expect(result.current.gameStarted).toBe(true);
  });

  it('should end game and reset state', () => {
    const { result } = renderHook(() => useGameState());

    // Start game first
    act(() => {
      result.current.startGame('party');
    });

    // End game
    act(() => {
      result.current.endGame();
    });

    expect(result.current.selectedCategory).toBeNull();
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.selectedType).toBeNull();
    expect(result.current.isDrawingCard).toBe(false);
  });

  it('should hide navigation when game starts', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.startGame('18');
    });

    expect(mockNav.style.display).toBe('none');
    expect(mockMain.style.paddingTop).toBe('0');
  });

  it('should restore navigation when game ends', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.startGame('18');
    });

    act(() => {
      result.current.endGame();
    });

    expect(mockNav.style.display).toBe('');
    expect(mockMain.style.paddingTop).toBe('');
  });

  it('should update selectedType', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.setSelectedType('truth');
    });

    expect(result.current.selectedType).toBe('truth');
  });

  it('should update isDrawingCard', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      result.current.setIsDrawingCard(true);
    });

    expect(result.current.isDrawingCard).toBe(true);
  });

  it('should handle cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useGameState());

    act(() => {
      result.current.startGame('18');
    });

    unmount();

    // Navigation should be restored on cleanup
    expect(mockNav.style.display).toBe('');
    expect(mockMain.style.paddingTop).toBe('');
  });
});
