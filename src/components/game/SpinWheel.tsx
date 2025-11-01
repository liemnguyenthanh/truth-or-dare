import { motion, useAnimation } from 'framer-motion';
import React, { useMemo, useState } from 'react';

import { gtmEvents } from '@/lib/gtm';

import { QuestionType } from '@/types';

import {
  DEGREES_PER_SEGMENT,
  SEGMENT_COUNT,
} from '@/app/spin-wheel/constants';

interface SpinWheelProps {
  onSpinEnd: (type: QuestionType) => void;
}

// Create segments array: 10 truth, 10 dare, alternating
const createSegments = (): Array<{ type: QuestionType; label: string }> => {
  const segments: Array<{ type: QuestionType; label: string }> = [];
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    segments.push({
      type: i % 2 === 0 ? 'truth' : 'dare',
      label: i % 2 === 0 ? 'Thật' : 'Thách',
    });
  }
  return segments;
};

export function SpinWheel({ onSpinEnd }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();

  // Memoize segments to avoid recalculation
  const segments = useMemo(() => createSegments(), []);

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    gtmEvents.buttonClick('spin_wheel', 'spin_wheel');

    // Random number of full rotations (3-5) plus random ending position
    const fullRotations = Math.floor(Math.random() * 3) + 3; // 3-5 rotations
    const endingSegmentIndex = Math.floor(Math.random() * SEGMENT_COUNT);
    const segmentCenterAngle = endingSegmentIndex * DEGREES_PER_SEGMENT + DEGREES_PER_SEGMENT / 2;
    // Thêm một chút random để tự nhiên hơn
    const randomOffset = (Math.random() - 0.5) * (DEGREES_PER_SEGMENT * 0.6);
    const endingDegrees = segmentCenterAngle + randomOffset;
    const totalRotation = fullRotations * 360 + endingDegrees;

    await controls.start({
      rotate: totalRotation,
      transition: {
        duration: 1,
        ease: [0.2, 0, 0.2, 1], // Custom easing for realistic spin feel
      },
    });

    // Determine result based on ending position
    // Normalize to 0-360 range
    const normalizedDegrees = ((endingDegrees % 360) + 360) % 360;
    // Pointer is at top (pointing to 0 degrees in screen space)
    // SVG is rotated -90deg so segment 0 is at top
    // We need to account for the rotation and find which segment is under pointer
    // The pointer is at 0 degrees (top), so we need to reverse the rotation
    const adjustedDegrees = (360 - normalizedDegrees) % 360;
    const segmentIndex = Math.floor(adjustedDegrees / DEGREES_PER_SEGMENT) % SEGMENT_COUNT;
    const result = segments[segmentIndex].type;

    setIsSpinning(false);
    onSpinEnd(result as QuestionType);
  };

  // Create SVG path for segments
  const createSegmentPath = (index: number, radius: number = 100) => {
    const startAngle = (index * DEGREES_PER_SEGMENT - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * DEGREES_PER_SEGMENT - 90) * (Math.PI / 180);

    const x1 = 50 + radius * Math.cos(startAngle);
    const y1 = 50 + radius * Math.sin(startAngle);
    const x2 = 50 + radius * Math.cos(endAngle);
    const y2 = 50 + radius * Math.sin(endAngle);

    const largeArc = DEGREES_PER_SEGMENT > 180 ? 1 : 0;

    return `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className='relative w-full max-w-lg mx-auto aspect-square'>
      {/* Pointer - Triangle at top */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30'>
        <div
          className='w-0 h-0'
          style={{
            borderLeft: '1.5rem solid transparent',
            borderRight: '1.5rem solid transparent',
            borderTop: '2.5rem solid rgb(147, 51, 234)', // purple-600
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
          }}
        />
      </div>

      {/* Wheel Container */}
      <div className='relative w-full h-full rounded-full overflow-hidden shadow-2xl'>
        <motion.div
          animate={controls}
          className='w-full h-full rounded-full relative'
          style={{ transformOrigin: 'center center' }}
        >
          {/* SVG Wheel */}
          <svg
            viewBox='0 0 100 100'
            className='w-full h-full'
            style={{ transform: 'rotate(-90deg)' }} // Rotate so top segment is at top
          >
            {segments.map((segment, index) => {
              const isEven = index % 2 === 0;
              // Truth segments: purple gradient, Dare segments: dark purple/gray
              const segmentColor = isEven
                ? 'rgb(147, 51, 234)' // purple-600 for truth
                : 'rgb(75, 85, 99)'; // gray-600 for dare (darker)

              return (
                <g key={index}>
                  <path
                    d={createSegmentPath(index)}
                    fill={segmentColor}
                    stroke='rgba(0, 0, 0, 0.1)'
                    strokeWidth='0.2'
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Circle with Icon */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-xl z-10 flex items-center justify-center border-4 border-purple-300 dark:border-purple-700'>
            <span className='text-4xl'>🎯</span>
          </div>
        </motion.div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold text-xs flex items-center justify-center transform hover:scale-105 active:scale-95'
      >
        {isSpinning ? 'QUAY...' : 'QUAY'}
      </button>
    </div>
  );
}