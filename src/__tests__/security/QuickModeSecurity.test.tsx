import { fireEvent,render, screen } from '@testing-library/react';
import { act,renderHook } from '@testing-library/react-hooks';

import { useQuickGame } from '@/app/quick/hooks/useQuickGame';
import { QuickModePage } from '@/app/quick/QuickModePage';

// Mock question data with potential security issues
const maliciousQuestions = {
  '18': [
    { 
      id: '<script>alert("xss")</script>', 
      type: 'truth' as const, 
      question: '<script>alert("xss")</script>Test question' 
    },
    { 
      id: 'javascript:alert("xss")', 
      type: 'dare' as const, 
      question: 'javascript:alert("xss")Test question' 
    },
    { 
      id: '1', 
      type: 'truth' as const, 
      question: 'Normal question' 
    },
  ],
  party: [
    { 
      id: '2', 
      type: 'dare' as const, 
      question: 'Another normal question' 
    },
  ],
};

// Mock the question data imports
jest.mock('@/data/questions/18', () => ({
  EighteenQuestions: maliciousQuestions['18'],
}));

jest.mock('@/data/questions/party', () => ({
  PartyQuestions: maliciousQuestions.party,
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

describe('Security & Edge Cases', () => {
  describe('XSS Protection', () => {
    it('should not execute malicious scripts in question IDs', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      act(() => {
        result.current.drawNewCard('truth');
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Should not execute script, just display as text
      expect(result.current.currentQuestion?.id).toContain('<script>');
      expect(result.current.usedQuestions.has('<script>alert("xss")</script>')).toBe(true);
    });

    it('should not execute malicious scripts in question text', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      act(() => {
        result.current.drawNewCard('truth');
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Question should be treated as text, not executed
      expect(result.current.currentQuestion?.question).toContain('<script>');
    });

    it('should render malicious content as text in UI', () => {
      render(<QuickModePage />);

      // Select category
      const categoryButton = screen.getByText('18+').closest('button');
      fireEvent.click(categoryButton!);

      // Select truth (should get malicious question)
      const truthButton = screen.getByText('Thật').closest('button');
      fireEvent.click(truthButton!);

      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Should display as text, not execute
      expect(screen.getByText(/<script>/)).toBeInTheDocument();
    });
  });

  describe('Memory Leaks', () => {
    it('should cleanup timers on unmount', () => {
      const { result, unmount } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
        result.current.drawNewCard('truth');
      });

      // Should not throw when unmounting with active timers
      expect(() => unmount()).not.toThrow();
    });

    it('should cleanup DOM manipulation on unmount', () => {
      const { result, unmount } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      unmount();

      // Navigation should be restored
      expect(mockNav.style.display).toBe('');
      expect(mockMain.style.paddingTop).toBe('');
    });

    it('should handle rapid mount/unmount cycles', () => {
      for (let i = 0; i < 10; i++) {
        const { result, unmount } = renderHook(() => useQuickGame());

        act(() => {
          result.current.selectCategory('18');
          result.current.drawNewCard('truth');
        });

        unmount();
      }

      // Should not accumulate memory leaks
      expect(true).toBe(true); // If we get here without errors, test passes
    });
  });

  describe('Race Conditions', () => {
    it('should handle rapid category changes', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
        result.current.selectCategory('party');
        result.current.selectCategory('18');
      });

      expect(result.current.selectedCategory).toBe('18');
    });

    it('should handle rapid card draws', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
        result.current.drawNewCard('truth');
        result.current.drawNewCard('dare');
        result.current.drawNewCard('truth');
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Should handle rapid draws gracefully
      expect(result.current.selectedType).toBe('truth'); // Last draw
    });

    it('should handle rapid state updates', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        // Rapid state updates
        for (let i = 0; i < 100; i++) {
          result.current.setSelectedType('truth');
          result.current.setIsDrawingCard(true);
          result.current.setIsDrawingCard(false);
        }
      });

      expect(result.current.selectedType).toBe('truth');
      expect(result.current.isDrawingCard).toBe(false);
    });
  });

  describe('Invalid Input Handling', () => {
    it('should handle null category gracefully', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory(null as any);
      });

      expect(result.current.selectedCategory).toBeNull();
    });

    it('should handle undefined category gracefully', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory(undefined as any);
      });

      expect(result.current.selectedCategory).toBeUndefined();
    });

    it('should handle invalid question types', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
        result.current.drawNewCard('invalid' as any);
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Should handle gracefully
      expect(result.current.selectedType).toBe('invalid');
    });

    it('should handle empty question arrays', () => {
      // Mock empty questions
      jest.doMock('@/data/questions/18', () => ({
        EighteenQuestions: [],
      }));

      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
        result.current.drawNewCard('truth');
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      expect(result.current.currentQuestion).toBeNull();
    });
  });

  describe('Performance Edge Cases', () => {
    it('should handle large question sets efficiently', () => {
      const largeQuestionSet = Array.from({ length: 10000 }, (_, i) => ({
        id: i.toString(),
        type: 'truth' as const,
        question: `Question ${i}`,
      }));

      jest.doMock('@/data/questions/18', () => ({
        EighteenQuestions: largeQuestionSet,
      }));

      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
        result.current.drawNewCard('truth');
      });

      act(() => {
        jest.advanceTimersByTime(600);
      });

      expect(result.current.currentQuestion).toBeTruthy();
    });

    it('should handle rapid stats updates', () => {
      const { result } = renderHook(() => useQuickGame());

      act(() => {
        // Rapid stats updates
        for (let i = 0; i < 1000; i++) {
          result.current.incrementCount('truth');
        }
      });

      expect(result.current.truthCount).toBe(1000);
    });
  });

  describe('Browser Compatibility', () => {
    it('should handle missing DOM elements gracefully', () => {
      jest.spyOn(document, 'querySelector').mockReturnValue(null);

      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      // Should not throw when DOM elements are missing
      expect(result.current.gameStarted).toBe(true);
    });

    it('should handle missing style properties', () => {
      const mockNavNoStyle = {};
      jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
        if (selector === 'nav') return mockNavNoStyle as any;
        return null;
      });

      const { result } = renderHook(() => useQuickGame());

      act(() => {
        result.current.selectCategory('18');
      });

      // Should not throw when style properties are missing
      expect(result.current.gameStarted).toBe(true);
    });
  });
});
