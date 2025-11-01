'use client';

import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

import { CouplePosition } from '@/types';

interface SwipeCardProps {
  position: CouplePosition;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  isActive?: boolean;
  zIndex?: number;
}

export default function SwipeCard({
  position,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  isActive = true,
  zIndex = 1,
}: SwipeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitDirection, setExitDirection] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform values for rotation and opacity
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const threshold = 100;
      const velocity = 500;

      if (
        Math.abs(info.offset.x) > threshold ||
        Math.abs(info.velocity.x) > velocity
      ) {
        if (info.offset.x > 0) {
          setExitDirection('right');
          onSwipeRight?.();
        } else {
          setExitDirection('left');
          onSwipeLeft?.();
        }
      } else if (
        Math.abs(info.offset.y) > threshold ||
        Math.abs(info.velocity.y) > velocity
      ) {
        if (info.offset.y < 0) {
          setExitDirection('up');
          onSwipeUp?.();
        } else {
          setExitDirection('down');
          onSwipeDown?.();
        }
      }
    },
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]
  );

  const handleTap = useCallback(() => {
    if (isActive) {
      setIsFlipped(!isFlipped);
      onTap?.();
    }
  }, [isActive, isFlipped, onTap]);

  // Memoize difficulty stars to prevent re-render
  const difficultyStars = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => (
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
      )),
    [position.difficulty]
  );

  // Exit animations with hardware acceleration
  const exitVariants = useMemo(
    () => ({
      left: {
        x: -1000,
        rotate: -30,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      },
      right: {
        x: 1000,
        rotate: 30,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      },
      up: {
        y: -1000,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      },
      down: {
        y: 1000,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      },
    }),
    []
  );

  return (
    <motion.div
      className={`absolute inset-0 cursor-pointer swipe-card touch-optimized ${
        isDragging ? 'dragging' : ''
      }`}
      style={{
        x,
        y,
        rotate,
        opacity,
        zIndex,
      }}
      drag={isActive}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      animate={
        exitDirection
          ? exitVariants[exitDirection as keyof typeof exitVariants]
          : {}
      }
      whileTap={{ scale: 0.98 }}
      // Optimize drag performance
      dragTransition={{
        bounceStiffness: 600,
        bounceDamping: 20,
        power: 0.3,
        timeConstant: 200,
      }}
    >
      <div className='w-full h-full' style={{ perspective: '1000px' }}>
        <motion.div
          className='relative w-full h-full'
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Back of card (initial view) */}
          <motion.div
            className='absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 border-2 border-white/20 shadow-2xl flex flex-col items-center justify-center p-8'
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <div className='w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-6'>
              <span className='text-6xl'>❤️</span>
            </div>
            <h2 className='text-3xl font-bold text-white mb-4 text-center'>
              Thẻ Bài Tư Thế
            </h2>
            <p className='text-white/80 text-center text-lg leading-relaxed'>
              Nhấn để lật thẻ và khám phá tư thế mới
            </p>
          </motion.div>

          {/* Front of card (after flip) */}
          <motion.div
            className='absolute w-full h-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl p-6 flex flex-col'
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className='relative flex-1 rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700'>
              <Image
                src={position.image}
                alt={position.name}
                width={300}
                height={200}
                className='w-full h-full object-cover'
                priority
                onError={() => {
                  // Handle image error
                }}
              />
            </div>

            <div className='space-y-3'>
              <h3 className='text-2xl font-bold text-purple-700 dark:text-purple-300 text-center'>
                {position.name}
              </h3>

              <div className='flex items-center justify-center'>
                <div className='flex'>{difficultyStars}</div>
                <span className='text-sm text-gray-500 dark:text-gray-400 ml-2'>
                  Độ khó: {position.difficulty}/5
                </span>
              </div>
            </div>

            {/* Swipe hints for flipped card */}
            <div className='absolute bottom-4 left-0 right-0'>
              <div className='flex justify-center items-center space-x-12 text-gray-400 text-xs'>
                <div className='flex flex-col items-center'>
                  <span className='text-xl mb-1'>←</span>
                  <span>Trước</span>
                </div>
                <div className='flex flex-col items-center'>
                  <span className='text-xl mb-1'>→</span>
                  <span>Tiếp</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
