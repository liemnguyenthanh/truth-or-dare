'use client';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import RatingModal from '@/components/shared/RatingModal';

import { GameMode, GameModeOption } from '@/types';

interface GameModeSelectionPageProps {
  onModeSelected?: (mode: GameMode) => void;
}

const gameModeOptions: GameModeOption[] = [
  {
    id: 'couples',
    name: 'Thẻ Bài Cặp Đôi',
    description: 'Lật bài chọn tư thế dành cho cặp đôi (18+) - Cập nhật mới!',
    icon: '❤️',
    isNew: true,
  },
  {
    id: 'drink',
    name: 'Drink',
    description: 'Rút bài và thực hiện thử thách. Ai không làm được thì uống!',
    icon: '🍺',
    isNew: true,
  },
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
  {
    id: 'spin_wheel',
    name: 'Vòng Quay May Mắn',
    description: 'Quay vòng may mắn để nhận câu hỏi ngẫu nhiên',
    icon: '🎡',
  },
];

export function GameModeSelectionPage({
  onModeSelected,
}: GameModeSelectionPageProps) {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);

  const handleModeSelect = (mode: GameMode) => {
    if (onModeSelected) {
      onModeSelected(mode);
    } else {
      // Navigate to the appropriate page
      switch (mode) {
        case 'quick':
          router.push('/quick');
          break;
        case 'group':
          router.push('/group');
          break;
        case 'spin_wheel':
          router.push('/spin-wheel');
          break;
        case 'couples':
          router.push('/couples');
          break;
        case 'drink':
          router.push('/drink');
          break;
      }
    }
  };

  const handleRatingSubmit = async (data: {
    rating: number;
    comment: string;
    emoji?: string;
  }) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'rating',
          title: `Đánh giá ${data.rating} sao`,
          description: data.comment,
          rating: data.rating,
          category: 'homepage',
        }),
      });

      if (response.ok) {
        // Could show a success toast here
        console.log('Rating submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
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

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
        {gameModeOptions.map((option) => (
          <motion.div
            key={option.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all duration-200 relative ${
              option.isNew ? 'ring-2 ring-pink-400 ring-opacity-50' : ''
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleModeSelect(option.id)}
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
            {/* NEW Badge */}
            {option.isNew && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: -12 }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                }}
                className='absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm sm:text-xs font-bold px-4 py-2 sm:px-3 sm:py-1 rounded-full shadow-lg z-10'
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

            <div className='text-center'>
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

            <div className='mt-4 sm:mt-6 flex justify-center'>
              <motion.button
                className='px-5 py-2.5 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg shadow-md transition-colors duration-200 font-medium text-sm sm:text-base'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chọn chế độ này
              </motion.button>
            </div>
          </motion.div>
        ))}
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
  );
}
