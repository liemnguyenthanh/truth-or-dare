'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

import SwipeCard from './SwipeCard';

import { CouplePosition } from '@/types';

interface SwipeCardStackProps {
  positions: CouplePosition[];
  onPositionChange?: (position: CouplePosition, index: number) => void;
  onFavorite?: (position: CouplePosition) => void;
  onShuffle?: () => void;
}

export default function SwipeCardStack({
  positions,
  onPositionChange,
  onFavorite,
  onShuffle,
}: SwipeCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStack, setCardStack] = useState<CouplePosition[]>([]);

  // Initialize card stack with first 3 cards for performance
  useEffect(() => {
    if (positions.length > 0) {
      const initialStack = positions.slice(0, Math.min(3, positions.length));
      setCardStack(initialStack);
      setCurrentIndex(0);
    }
  }, [positions]);

  // Update stack when current index changes
  useEffect(() => {
    if (positions.length > 0 && currentIndex < positions.length) {
      const nextCards = [];
      for (let i = 0; i < 3; i++) {
        const index = currentIndex + i;
        if (index < positions.length) {
          nextCards.push(positions[index]);
        }
      }
      setCardStack(nextCards);

      // Notify parent about position change
      if (onPositionChange && positions[currentIndex]) {
        onPositionChange(positions[currentIndex], currentIndex);
      }
    }
  }, [currentIndex, positions, onPositionChange]);

  const handleSwipeRight = useCallback(() => {
    if (currentIndex < positions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to beginning
      setCurrentIndex(0);
    }
  }, [currentIndex, positions.length]);

  const handleSwipeLeft = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Loop to end
      setCurrentIndex(positions.length - 1);
    }
  }, [currentIndex, positions.length]);

  const handleSwipeUp = useCallback(() => {
    // Favorite current position
    if (positions[currentIndex] && onFavorite) {
      onFavorite(positions[currentIndex]);
    }
    // Then move to next
    handleSwipeRight();
  }, [positions, currentIndex, onFavorite, handleSwipeRight]);

  const handleSwipeDown = useCallback(() => {
    // Skip current position (same as swipe right)
    handleSwipeRight();
  }, [handleSwipeRight]);

  const handleTap = useCallback(() => {
    // Haptic feedback for mobile
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  // Memoize animation variants
  const cardVariants = useMemo(
    () => ({
      initial: {
        scale: 0.9,
        y: 30,
        opacity: 0,
        rotateY: 0,
      },
      animate: (custom: {
        scale: number;
        yOffset: number;
        opacity: number;
      }) => ({
        scale: custom.scale,
        y: custom.yOffset,
        opacity: custom.opacity,
        rotateY: 0,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
          type: 'spring',
          stiffness: 300,
          damping: 25,
        },
      }),
      exit: {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.2, ease: 'easeIn' },
      },
    }),
    []
  );

  if (positions.length === 0) {
    return (
      <div className='relative w-full h-full flex items-center justify-center'>
        <div className='text-center text-gray-500 dark:text-gray-400'>
          <p className='text-lg'>Không có thẻ bài nào để hiển thị</p>
        </div>
      </div>
    );
  }

  return (
    <div className='relative w-full h-full'>
      <AnimatePresence mode='popLayout'>
        {cardStack.map((position, stackIndex) => {
          const isActive = stackIndex === 0;
          const zIndex = 10 + (cardStack.length - stackIndex);
          const scale = 1 - stackIndex * 0.04;
          const yOffset = stackIndex * 6;
          const opacity = isActive ? 1 : Math.max(0.5, 1 - stackIndex * 0.3);

          return (
            <motion.div
              key={`${position.id}-${currentIndex + stackIndex}`}
              className='absolute inset-0'
              variants={cardVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              custom={{ scale, yOffset, opacity }}
              style={{
                zIndex,
                transform: 'translate3d(0,0,0)',
                willChange: isActive ? 'transform' : 'auto',
              }}
            >
              <SwipeCard
                position={position}
                onSwipeLeft={isActive ? handleSwipeLeft : undefined}
                onSwipeRight={isActive ? handleSwipeRight : undefined}
                onSwipeUp={isActive ? handleSwipeUp : undefined}
                onSwipeDown={isActive ? handleSwipeDown : undefined}
                onTap={isActive ? handleTap : undefined}
                isActive={isActive}
                zIndex={zIndex}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Progress indicator - Memoized */}
      <div
        className='absolute top-0 left-4 right-4 -translate-y-1/2'
        style={{ zIndex: 9999 }}
      >
        <div className='bg-black backdrop-blur-sm rounded-full px-4 py-2 flex items-center justify-between'>
          <span className='text-white text-sm font-medium'>
            {currentIndex + 1} / {positions.length}
          </span>
          <div className='flex-1 mx-4'>
            <div className='w-full bg-white/20 rounded-full h-2'>
              <motion.div
                className='bg-white rounded-full h-2'
                animate={{
                  width: `${((currentIndex + 1) / positions.length) * 100}%`,
                }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut',
                  type: 'tween',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Swipe hints overlay */}
      <div
        className='absolute bottom-0 left-0 translate-y-1/2 right-0 pointer-events-auto'
        style={{ zIndex: 9998 }}
      >
        <div className='flex justify-center'>
          <div
            className='bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-3 cursor-pointer'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center space-x-8 text-white/80 text-sm'>
              <button
                className='flex items-center space-x-2 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10'
                onClick={(e) => {
                  e.stopPropagation();
                  handleSwipeLeft();
                }}
              >
                <span className='text-lg'>←</span>
                <span>Trước</span>
              </button>
              <button
                className='flex items-center space-x-2 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10'
                onClick={(e) => {
                  e.stopPropagation();
                  handleSwipeRight();
                }}
              >
                <span className='text-lg'>→</span>
                <span>Tiếp theo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
