import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';

import { gtmEvents } from '@/lib/gtm';
import { soundManager } from '@/lib/sounds';
import { useTranslations } from '@/hooks/useTranslations';

import { QuestionType } from '@/types';

interface SpinWheelProps {
  onSpinEnd: (type: QuestionType) => void;
}

export function SpinWheel({ onSpinEnd }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  const t = useTranslations();

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    gtmEvents.buttonClick('spin_wheel', 'spin_wheel');
    soundManager.play('spin');

    // Random number of full rotations (3-5) plus random ending position
    const fullRotations = Math.floor(Math.random() * 3) + 3; // 3-5 rotations
    const endingDegrees = Math.random() * 360;
    const totalRotation = fullRotations * 360 + endingDegrees;

    await controls.start({
      rotate: totalRotation,
      transition: {
        duration: 3,
        ease: [0.2, 0, 0.2, 1], // Custom easing for realistic spin feel
      },
    });

    // Stop spinning sound and play win sound
    soundManager.stop('spin');
    soundManager.play('win');

    // Determine if it landed on Truth or Dare based on ending position
    const normalizedDegrees = endingDegrees % 360;
    const result = normalizedDegrees < 180 ? 'truth' : 'dare';

    setIsSpinning(false);
    onSpinEnd(result as QuestionType);
  };

  return (
    <div className='relative w-full max-w-md mx-auto aspect-square'>
      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
      >
        {isSpinning
          ? t.gamePages.spinWheel.spinning
          : t.gamePages.spinWheel.spinToStart}
      </button>

      {/* Wheel */}
      <motion.div
        animate={controls}
        className='w-full h-full rounded-full overflow-hidden relative'
        style={{ transformOrigin: 'center center' }}
      >
        {/* Truth Section */}
        <div className='absolute top-0 left-0 w-full h-1/2 bg-blue-500 flex items-center justify-center text-white text-2xl font-bold transform -rotate-90 origin-bottom'>
          {t.questions.types.truth.toUpperCase()}
        </div>
        {/* Dare Section */}
        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gray-900 flex items-center justify-center text-white text-2xl font-bold transform rotate-90 origin-top'>
          {t.questions.types.dare.toUpperCase()}
        </div>

        {/* Center Point */}
        <div className='absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg z-0' />
      </motion.div>

      {/* Pointer */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 z-20'>
        <div className='w-0 h-0 border-l-[1rem] border-r-[1rem] border-t-[2rem] border-l-transparent border-r-transparent border-t-red-500' />
      </div>
    </div>
  );
}
