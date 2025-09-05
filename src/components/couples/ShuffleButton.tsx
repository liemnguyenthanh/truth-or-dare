'use client';

import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';

interface ShuffleButtonProps {
  onShuffle: () => void;
}

export default function ShuffleButton({ onShuffle }: ShuffleButtonProps) {
  const handleClick = () => {
    onShuffle();

    // Haptic feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  return (
    <motion.div
      className='fixed top-20 right-4'
      style={{ zIndex: 10000 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={handleClick}
        className='bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-colors border border-white/20'
        aria-label='Shuffle cards'
      >
        <Shuffle size={20} />
      </button>
    </motion.div>
  );
}
