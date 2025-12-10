'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseDonateOptions {
  cardsPlayed: number;
}

interface UseDonateReturn {
  isEnabled: boolean;
  isDonateModalOpen: boolean;
  openDonateModal: () => void;
  closeDonateModal: () => void;
}

// Hiển thị donate modal sau mỗi 10-15 cards (random)
const DONATE_INTERVAL_MIN = 10;
const DONATE_INTERVAL_MAX = 15;
const DONATE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_DONATE === 'true';

export function useDonate({ cardsPlayed }: UseDonateOptions): UseDonateReturn {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const lastDonateCardRef = useRef(0);
  const nextDonateCardRef = useRef(
    Math.floor(
      Math.random() * (DONATE_INTERVAL_MAX - DONATE_INTERVAL_MIN + 1)
    ) + DONATE_INTERVAL_MIN
  );

  // Tự động hiển thị donate modal sau mỗi interval
  useEffect(() => {
    if (!DONATE_ENABLED) return;

    if (
      cardsPlayed > 0 &&
      cardsPlayed >= nextDonateCardRef.current &&
      cardsPlayed > lastDonateCardRef.current &&
      !isDonateModalOpen
    ) {
      setIsDonateModalOpen(true);
      lastDonateCardRef.current = cardsPlayed;
      // Set next interval (random 10-15 cards)
      nextDonateCardRef.current =
        cardsPlayed +
        Math.floor(
          Math.random() * (DONATE_INTERVAL_MAX - DONATE_INTERVAL_MIN + 1)
        ) +
        DONATE_INTERVAL_MIN;
    }
  }, [cardsPlayed, isDonateModalOpen]);

  const openDonateModal = useCallback(() => {
    if (!DONATE_ENABLED) return;
    setIsDonateModalOpen(true);
  }, []);

  const closeDonateModal = useCallback(() => {
    setIsDonateModalOpen(false);
  }, []);

  return {
    isEnabled: DONATE_ENABLED,
    isDonateModalOpen,
    openDonateModal,
    closeDonateModal,
  };
}
