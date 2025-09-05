'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';

import { CouplePosition } from '@/types';

interface FavoritesButtonProps {
  favorites: CouplePosition[];
  onViewFavorites?: () => void;
}

export default function FavoritesButton({
  favorites,
  onViewFavorites,
}: FavoritesButtonProps) {
  const [showPulse, setShowPulse] = useState(false);

  const handleClick = () => {
    setShowPulse(true);
    setTimeout(() => setShowPulse(false), 300);
    onViewFavorites?.();

    // Haptic feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  if (favorites.length === 0) {
    return null;
  }

  return (
    <motion.div
      className='fixed bottom-24 left-4'
      style={{ zIndex: 10001 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <button
        onClick={handleClick}
        className='relative bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-colors'
      >
        <Heart size={20} fill='currentColor' />

        {/* Badge */}
        <AnimatePresence>
          {favorites.length > 0 && (
            <motion.div
              className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              {favorites.length > 99 ? '99+' : favorites.length}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse effect */}
        <AnimatePresence>
          {showPulse && (
            <motion.div
              className='absolute inset-0 bg-pink-400 rounded-full'
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
