import { GameMode, GameModeOption } from '@core/types/game';
import { motion } from 'framer-motion';
import React from 'react';

import { useGame } from '../hooks';

interface GameModeSelectionPageProps {
  onModeSelected: (mode: GameMode) => void;
}

const gameModeOptions: GameModeOption[] = [
  {
    id: 'quick',
    name: 'Chế Độ Nhanh',
    description: 'Chơi ngay không cần nhập tên. Chọn category và bắt đầu!',
    icon: '⚡',
  },
  {
    id: 'group',
    name: 'Chế Độ Nhóm',
    description: 'Thêm tên người chơi và chơi theo lượt',
    icon: '👥',
  },
];

export function GameModeSelectionPage({
  onModeSelected,
}: GameModeSelectionPageProps) {
  const { setGameMode } = useGame();

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    onModeSelected(mode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className='max-w-4xl mx-auto'
    >
      <div className='mb-10 text-center'>
        <h1 className='text-4xl font-bold text-purple-800 dark:text-purple-300 mb-4'>
          Thật Hay Thách
        </h1>
        <p className='text-purple-600 dark:text-purple-300 text-lg'>
          Chọn chế độ chơi để bắt đầu
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        {gameModeOptions.map((option) => (
          <motion.div
            key={option.id}
            className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all duration-200'
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleModeSelect(option.id)}
          >
            <div className='text-center'>
              <div className='text-6xl mb-4'>{option.icon}</div>
              <h3 className='text-2xl font-bold text-purple-800 dark:text-purple-300 mb-3'>
                {option.name}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-lg leading-relaxed'>
                {option.description}
              </p>
            </div>

            <div className='mt-6 flex justify-center'>
              <motion.button
                className='px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg shadow-md transition-colors duration-200 font-medium'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chọn chế độ này
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='mt-8 text-center'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Bạn có thể thay đổi chế độ chơi bất kỳ lúc nào
        </p>
      </div>
    </motion.div>
  );
}
