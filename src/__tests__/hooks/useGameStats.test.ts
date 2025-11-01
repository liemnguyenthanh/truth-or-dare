import { act,renderHook } from '@testing-library/react-hooks';

import { useGameStats } from '@/app/quick/hooks/useGameStats';

describe('useGameStats', () => {
  it('should initialize with zero counts', () => {
    const { result } = renderHook(() => useGameStats());

    expect(result.current.truthCount).toBe(0);
    expect(result.current.dareCount).toBe(0);
  });

  it('should increment truth count', () => {
    const { result } = renderHook(() => useGameStats());

    act(() => {
      result.current.incrementCount('truth');
    });

    expect(result.current.truthCount).toBe(1);
    expect(result.current.dareCount).toBe(0);
  });

  it('should increment dare count', () => {
    const { result } = renderHook(() => useGameStats());

    act(() => {
      result.current.incrementCount('dare');
    });

    expect(result.current.truthCount).toBe(0);
    expect(result.current.dareCount).toBe(1);
  });

  it('should increment multiple counts', () => {
    const { result } = renderHook(() => useGameStats());

    act(() => {
      result.current.incrementCount('truth');
      result.current.incrementCount('truth');
      result.current.incrementCount('dare');
    });

    expect(result.current.truthCount).toBe(2);
    expect(result.current.dareCount).toBe(1);
  });

  it('should reset stats to zero', () => {
    const { result } = renderHook(() => useGameStats());

    // Add some counts first
    act(() => {
      result.current.incrementCount('truth');
      result.current.incrementCount('dare');
      result.current.incrementCount('truth');
    });

    // Reset
    act(() => {
      result.current.resetStats();
    });

    expect(result.current.truthCount).toBe(0);
    expect(result.current.dareCount).toBe(0);
  });

  it('should handle rapid increments', () => {
    const { result } = renderHook(() => useGameStats());

    act(() => {
      // Rapid increments
      for (let i = 0; i < 100; i++) {
        result.current.incrementCount('truth');
      }
    });

    expect(result.current.truthCount).toBe(100);
  });

  it('should maintain separate counts for different types', () => {
    const { result } = renderHook(() => useGameStats());

    act(() => {
      result.current.incrementCount('truth');
      result.current.incrementCount('dare');
      result.current.incrementCount('truth');
      result.current.incrementCount('dare');
      result.current.incrementCount('dare');
    });

    expect(result.current.truthCount).toBe(2);
    expect(result.current.dareCount).toBe(3);
  });
});
