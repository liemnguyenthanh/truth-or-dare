import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import { ParticipantManager } from './ParticipantManager';
import { useGame } from '../context/GameContext';

interface GameSetupPageProps {
  onContinue: () => void;
}

export function GameSetupPage({ onContinue }: GameSetupPageProps) {
  const { gameState } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className='mb-10 text-center'>
        <h1 className='text-4xl font-bold text-purple-800 dark:text-purple-300 mb-4'>
          Thật Hay Thách
        </h1>
        <p className='text-purple-600 dark:text-purple-300'>
          Thêm ít nhất 2 người chơi để bắt đầu trò chơi
        </p>
      </div>

      <div className='mt-10'>
        <ParticipantManager />
        {gameState.participants.length >= 2 && (
          <div className='flex justify-center'>
            <motion.button
              onClick={onContinue}
              className='px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg shadow-md transition-colors duration-200'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Chơi Ngay
            </motion.button>
          </div>
        )}
      </div>

      {/* <div className='mt-10'>
        <CustomQuestionForm />
      </div> */}

      <div className='mt-5 text-center'>
        <Link
          href='/questions'
          className='inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500 text-white rounded-lg shadow-md transition-colors duration-200 mb-4'
        >
          Danh Sách Câu Hỏi
        </Link>
      </div>
    </motion.div>
  );
}
