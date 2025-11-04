'use client';

import { motion } from 'framer-motion';
import { GameModeOption } from '@/types';

interface GameModeCardProps {
  option: GameModeOption;
  index: number;
  onClick: () => void;
  shouldSpanFull?: boolean;
}

export function GameModeCard({
  option,
  index,
  onClick,
  shouldSpanFull = false,
}: GameModeCardProps) {
  return (
    <div
      key={option.id}
      className={`relative ${shouldSpanFull ? 'sm:col-span-2' : ''}`}
    >
      {/* NEW Badge - góc phải trên */}
      {option.isNew && (
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{
            delay: index * 0.1 + 0.2,
            type: 'spring',
            stiffness: 500,
            damping: 15,
          }}
          className='absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg z-10'
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            MỚI ✨
          </motion.span>
        </motion.div>
      )}

      {/* Has New Questions Badge - style lại nhưng vị trí giữ như cũ */}
      {option.hasNewQuestions && (
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{
            delay: option.isNew ? index * 0.1 + 0.4 : index * 0.1 + 0.2,
            type: 'spring',
            stiffness: 500,
            damping: 15,
          }}
          className='absolute top-6 -right-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap'
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='inline-flex items-center gap-1'
          >
            <span>📝</span>
            <span>CÂU HỎI MỚI</span>
            <span>✨</span>
          </motion.span>
        </motion.div>
      )}

      <motion.div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all duration-200 h-full min-h-[200px] flex flex-col ${
          option.isNew ? 'ring-2 ring-pink-400 ring-opacity-50' : ''
        }`}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        animate={
          option.isNew
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(236, 72, 153, 0.4)',
                  '0 0 0 10px rgba(236, 72, 153, 0)',
                  '0 0 0 0 rgba(236, 72, 153, 0)',
                ],
              }
            : {}
        }
        transition={
          option.isNew
            ? {
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
      >
        <div className='text-center flex-1 flex flex-col justify-center'>
          <div className='text-5xl sm:text-6xl mb-3 sm:mb-4'>
            {option.icon}
          </div>
          <h3 className='text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-300 mb-2 sm:mb-3'>
            {option.name}
          </h3>
          <p className='text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed'>
            {option.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

