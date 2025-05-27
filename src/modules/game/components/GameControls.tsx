import { motion } from 'framer-motion';
import React from 'react';

import { useGame } from '../hooks/useGameContext';

export function GameControls() {
  const { quitGame } = useGame();

  return (
    <div className='fixed bottom-4 right-4 flex gap-2'>
      <motion.button
        onClick={quitGame}
        className='p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title='Thoát Trò Chơi'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </motion.button>
    </div>
  );
}
