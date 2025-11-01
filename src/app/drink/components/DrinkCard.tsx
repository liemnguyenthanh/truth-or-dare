'use client';

import { motion } from 'framer-motion';

import { DrinkQuestion } from '@/data/questions/drink';
import { Text } from '@/components/shared/Typography';

interface DrinkCardProps {
  question: DrinkQuestion | null;
  isFlipping: boolean;
}

export function DrinkCard({ question, isFlipping }: DrinkCardProps) {
  return (
    <motion.div
      key={question?.text}
      initial={{ rotateY: 180, scale: 0.8 }}
      animate={{
        rotateY: isFlipping ? 180 : 0,
        scale: isFlipping ? 0.8 : 1,
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 100,
      }}
      className='relative w-full max-w-md'
    >
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border-2 border-purple-200 dark:border-purple-800 min-h-[300px] flex flex-col justify-center items-center text-center'>
        {question && !isFlipping ? (
          <>
            <div className='text-4xl mb-4'>🃏</div>
            <Text variant='large' className='text-gray-800 dark:text-white leading-relaxed'>
              {question.text}
            </Text>
          </>
        ) : (
          <div className='flex flex-col items-center'>
            <div className='text-6xl mb-4'>🍺</div>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500'></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

