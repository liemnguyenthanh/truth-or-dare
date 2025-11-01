import { useCallback, useEffect, useMemo, useState } from 'react';

import { couplePositions } from '@/data/couples/positions';

import { CouplePosition } from '@/types';

interface UseCouplesGameReturn {
  // State
  positions: CouplePosition[];
  displayedPositions: CouplePosition[];
  currentPosition: CouplePosition | null;
  cardsFlipped: number;

  // Actions
  setCurrentPosition: (position: CouplePosition | null) => void;
  onPositionChange: (position: CouplePosition, index: number) => void;
  resetCardsFlipped: () => void;
}

const PAYMENT_CARDS_LIMIT = 5;

export function useCouplesGame(
  isPaymentRequired: boolean,
  isGameUnlocked: boolean
): UseCouplesGameReturn {
  const [positions, setPositions] = useState<CouplePosition[]>([]);
  const [currentPosition, setCurrentPosition] = useState<CouplePosition | null>(
    null
  );
  const [cardsFlipped, setCardsFlipped] = useState(0);

  // Initialize positions with shuffle when component mounts
  useEffect(() => {
    const shuffledPositions = [...couplePositions].sort(
      () => Math.random() - 0.5
    );
    setPositions(shuffledPositions);
  }, []);

  // Display all positions (no filtering)
  const displayedPositions = useMemo(() => {
    return positions;
  }, [positions]);


  // Reset cards flipped count
  const resetCardsFlipped = useCallback(() => {
    setCardsFlipped(0);
  }, []);

  // Handle position change (when user swipes)
  const onPositionChange = useCallback(
    (position: CouplePosition, index: number) => {
      setCurrentPosition(position);

      // Track cards flipped for payment (only if payment required and not unlocked)
      if (isPaymentRequired && !isGameUnlocked) {
        setCardsFlipped(index + 1);
      }
    },
    [isPaymentRequired, isGameUnlocked]
  );

  return {
    positions,
    displayedPositions,
    currentPosition,
    cardsFlipped,
    setCurrentPosition,
    onPositionChange,
    resetCardsFlipped,
  };
}
