import { fireEvent,render, screen } from '@testing-library/react';
import { act,renderHook } from '@testing-library/react-hooks';

import { useQuickGame } from '@/app/quick/hooks/useQuickGame';
import { QuickModePage } from '@/app/quick/QuickModePage';

// Mock large question datasets
const largeQuestionSet = Array.from({ length: 1000 }, (_, i) => ({
  id: `q${i}`,
  type: i % 2 === 0 ? 'truth' as const : 'dare' as const,
  question: `Question number ${i} with some content to make it realistic`,
}));

jest.mock('@/data/questions/18', () => ({
  EighteenQuestions: largeQuestionSet,
}));

jest.mock('@/data/questions/party', () => ({
  PartyQuestions: largeQuestionSet.slice(0, 500),
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

describe('Performance Tests', () => {
  describe('Memory Management', () => {
    it('should not leak memory with rapid hook usage', () => {
      const initialMemory = process.memoryUsage();

      for (let i = 0; i < 100; i++) {
        const { result, unmount } = renderHook(() => useQuickGame());

        act(() => {
          result.current.selectCategory('18');
          result.current.drawNewCard('truth');
        });

        act(() => {
          jest.advanceTimersByTime(600);
        });

        unmount();
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;

      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });

    it('should cleanup timers properly', () => {
      const { result, unmount } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
        result.current.drawNewCard('truth');
      });

      // Should not throw when unmounting with active timers
      expect(() => unmount()).not.toThrow();
    });

    it('should handle large usedQuestions sets efficiently', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      // Draw many questions to build up usedQuestions set
      act(() => {
        for (let i = 0; i < 100; i++) {
          result.current.drawNewCard('truth');
        }
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      expect(result.current.usedQuestions.size).toBeGreaterThan(0);
      expect(result.current.usedQuestions.size).toBeLessThanOrEqual(1000);
    });
  });

  describe('Rendering Performance', () => {
    it('should render large question sets efficiently', () => {
      const startTime = performance.now();

      render(<QuickModePage />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });

    it('should handle rapid state updates efficiently', () => {
      const { result } = renderHook(() => useQuickGame());

      const startTime = performance.now();

      act(() => {
        // Rapid state updates
        for (let i = 0; i < 1000; i++) {
          result.current.setSelectedType('truth');
          result.current.setIsDrawingCard(true);
          result.current.setIsDrawingCard(false);
        }
      });

      const endTime = performance.now();
      const updateTime = endTime - startTime;

      // Should handle rapid updates efficiently (less than 50ms)
      expect(updateTime).toBeLessThan(50);
    });

    it('should handle rapid UI interactions efficiently', () => {
      render(<QuickModePage />);

      const startTime = performance.now();

      // Rapid UI interactions
      const categoryButton = screen.getByText('18+').closest('button');
      for (let i = 0; i < 100; i++) {
        fireEvent.click(categoryButton!);
      }

      const endTime = performance.now();
      const interactionTime = endTime - startTime;

      // Should handle rapid interactions efficiently (less than 200ms)
      expect(interactionTime).toBeLessThan(200);
    });
  });

  describe('Question Selection Performance', () => {
    it('should select questions efficiently from large sets', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      const startTime = performance.now();

      act(() => {
        result.current.drawNewCard('truth');
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      const endTime = performance.now();
      const selectionTime = endTime - startTime;

      // Should select questions efficiently (less than 10ms)
      expect(selectionTime).toBeLessThan(10);
    });

    it('should handle question reset efficiently', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      // Draw all questions to trigger reset
      act(() => {
        for (let i = 0; i < 1000; i++) {
          result.current.drawNewCard('truth');
        }
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Should handle reset efficiently
      expect(result.current.usedQuestions.size).toBeLessThanOrEqual(1000);
    });
  });

  describe('Stats Performance', () => {
    it('should handle rapid stats updates efficiently', () => {
      const { result } = renderHook(() => useQuickGame());

      const startTime = performance.now();

      act(() => {
        // Rapid stats updates
        for (let i = 0; i < 10000; i++) {
          result.current.incrementCount('truth');
        }
      });

      const endTime = performance.now();
      const statsTime = endTime - startTime;

      // Should handle rapid stats updates efficiently (less than 20ms)
      expect(statsTime).toBeLessThan(20);
      expect(result.current.truthCount).toBe(10000);
    });

    it('should handle mixed stats updates efficiently', () => {
      const { result } = renderHook(() => useQuickGame());

      const startTime = performance.now();

      act(() => {
        // Mixed stats updates
        for (let i = 0; i < 5000; i++) {
          result.current.incrementCount('truth');
          result.current.incrementCount('dare');
        }
      });

      const endTime = performance.now();
      const statsTime = endTime - startTime;

      // Should handle mixed updates efficiently (less than 30ms)
      expect(statsTime).toBeLessThan(30);
      expect(result.current.truthCount).toBe(5000);
      expect(result.current.dareCount).toBe(5000);
    });
  });

  describe('DOM Manipulation Performance', () => {
    it('should handle navigation hiding/showing efficiently', () => {
      const { result } = renderHook(() => useQuickGame());

      const startTime = performance.now();

      act(() => {
        // Rapid navigation changes
        for (let i = 0; i < 100; i++) {
          result.current.selectCategory('18');
          result.current.endGame();
        }
      });

      const endTime = performance.now();
      const domTime = endTime - startTime;

      // Should handle DOM manipulation efficiently (less than 100ms)
      expect(domTime).toBeLessThan(100);
    });
  });

  describe('Concurrent Operations', () => {
    it('should handle concurrent question draws', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      const startTime = performance.now();

      // Concurrent draws
      act(() => {
        result.current.drawNewCard('truth');
        result.current.drawNewCard('dare');
        result.current.drawNewCard('truth');
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      const endTime = performance.now();
      const concurrentTime = endTime - startTime;

      // Should handle concurrent operations efficiently
      expect(concurrentTime).toBeLessThan(20);
    });

    it('should handle concurrent state updates', () => {
      const { result } = renderHook(() => useQuickGame());

      const startTime = performance.now();

      act(() => {
        // Concurrent state updates
        result.current.setSelectedType('truth');
        result.current.setIsDrawingCard(true);
        result.current.incrementCount('truth');
        result.current.selectCategory('18');
      });

      const endTime = performance.now();
      const concurrentTime = endTime - startTime;

      // Should handle concurrent state updates efficiently
      expect(concurrentTime).toBeLessThan(10);
    });
  });
});
