'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { CouplePosition } from '@/types';

interface PositionCardProps {
  position: CouplePosition;
  onCardClick?: (position: CouplePosition) => void;
  isFlipped?: boolean;
}

export default function PositionCard({
  position,
  onCardClick,
  isFlipped: externalIsFlipped,
}: PositionCardProps) {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);

  const isFlipped =
    externalIsFlipped !== undefined ? externalIsFlipped : internalIsFlipped;

  const handleClick = () => {
    if (externalIsFlipped === undefined) {
      setInternalIsFlipped(!internalIsFlipped);
    }
    if (onCardClick) {
      onCardClick(position);
    }
  };

  // Tạo hiệu ứng nhấp nháy ngôi sao cho độ khó
  const difficultyStars = Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`text-lg ${
        i < position.difficulty
          ? 'text-yellow-400'
          : 'text-gray-300 dark:text-gray-600'
      }`}
    >
      ★
    </span>
  ));

  return (
    <div
      className='perspective-1000 cursor-pointer h-96 w-72'
      onClick={handleClick}
    >
      <motion.div
        className='relative w-full h-full'
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Mặt sau của thẻ (hiển thị ban đầu) */}
        <motion.div
          className='absolute w-full h-full rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 border-2 border-white/20 shadow-xl flex flex-col items-center justify-center p-6'
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className='w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4'>
            <span className='text-5xl'>❤️</span>
          </div>
          <h2 className='text-2xl font-bold text-white mb-2'>Thẻ Bài Tư Thế</h2>
          <p className='text-white/80 text-center'>
            Nhấn để lật thẻ và khám phá tư thế mới
          </p>
        </motion.div>

        {/* Mặt trước của thẻ (sau khi lật) */}
        <motion.div
          className='absolute w-full h-full rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl p-4 flex flex-col'
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className='relative rounded-lg overflow-hidden mb-3'>
            <Image
              src={position.image}
              alt={position.name}
              width={300}
              height={200}
              className='w-full h-full object-cover'
            />
          </div>

          <h3 className='text-xl font-bold text-purple-700 dark:text-purple-300 mb-1'>
            {position.name}
          </h3>

          <div className='mb-2 flex items-center'>
            <div className='flex'>{difficultyStars}</div>
            <span className='text-xs text-gray-500 dark:text-gray-400 ml-2'>
              Độ khó
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
