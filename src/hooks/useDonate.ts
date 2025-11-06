'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseDonateOptions {
  cardsPlayed: number;
}

interface UseDonateReturn {
  isDonateModalOpen: boolean;
  openDonateModal: () => void;
  closeDonateModal: () => void;
}

// Hiển thị donate modal sau mỗi 10-15 cards (random)
const DONATE_INTERVAL_MIN = 10;
const DONATE_INTERVAL_MAX = 15;

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
    setIsDonateModalOpen(true);
  }, []);

  const closeDonateModal = useCallback(() => {
    setIsDonateModalOpen(false);
  }, []);

  return {
    isDonateModalOpen,
    openDonateModal,
    closeDonateModal,
  };
}
