import { useState } from 'react';

export function useGameStats() {
  const [truthCount, setTruthCount] = useState(0);
  const [dareCount, setDareCount] = useState(0);

  const incrementCount = (type: 'truth' | 'dare') => {
    if (type === 'truth') {
      setTruthCount(prev => prev + 1);
    } else {
      setDareCount(prev => prev + 1);
    }
  };

  const resetStats = () => {
    setTruthCount(0);
    setDareCount(0);
  };

  return {
    truthCount,
    dareCount,
    incrementCount,
    resetStats,
  };
}
