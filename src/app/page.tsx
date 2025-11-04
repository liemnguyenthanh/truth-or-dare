'use client';

import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

import RatingModal from '@/components/shared/RatingModal';

import { GameModeCard } from './index/components';
import { useGameModeSelection } from './index/hooks';

export default function HomePage() {
  const {
    gameModeOptions,
    showRatingModal,
    setShowRatingModal,
    handleModeSelect,
    handleRatingSubmit,
  } = useGameModeSelection();

  return (
    <main className='container mx-auto px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className='max-w-4xl mx-auto'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 auto-rows-fr'>
          {gameModeOptions.map((option, index) => {
            const isLastItem = index === gameModeOptions.length - 1;
            const isOddCount = gameModeOptions.length % 2 !== 0;
            const shouldSpanFull = isLastItem && isOddCount;

            return (
              <GameModeCard
                key={option.id}
                option={option}
                index={index}
                onClick={() => handleModeSelect(option.id)}
                shouldSpanFull={shouldSpanFull}
              />
            );
          })}
        </div>

        <div className='mt-8 text-center space-y-4'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Bạn có thể thay đổi chế độ chơi bất kỳ lúc nào
          </p>

          {/* Rating Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='pt-4'
          >
            <motion.button
              onClick={() => setShowRatingModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-200 font-medium'
            >
              <Heart className='w-5 h-5' />
              <span>Đánh giá trò chơi</span>
              <Star className='w-5 h-5' />
            </motion.button>
            <p className='text-xs text-gray-400 mt-2'>
              Chia sẻ cảm nhận của bạn về trò chơi
            </p>
          </motion.div>
        </div>

        {/* Rating Modal */}
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
          title='Đánh giá Thật Hay Thách'
          description='Bạn cảm thấy trò chơi thế nào?'
        />
      </motion.div>
    </main>
  );
}
