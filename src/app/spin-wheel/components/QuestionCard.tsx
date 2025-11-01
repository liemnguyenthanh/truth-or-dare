'use client';

import { motion } from 'framer-motion';

import { Question, QuestionType } from '@/types';
import { Heading, Text } from '@/components/shared/Typography';

interface QuestionCardProps {
  question: Question;
  spinResult: QuestionType;
}

export function QuestionCard({ question, spinResult }: QuestionCardProps) {
  const icon = spinResult === 'truth' ? '💭' : '💖';
  const typeLabel = spinResult === 'truth' ? 'Thật' : 'Thách';

  return (
    <motion.div
      key={question.id || question.text}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
      className='relative w-full max-w-md mx-auto'
    >
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border-2 border-purple-200 dark:border-purple-800 min-h-[300px] flex flex-col justify-center items-center text-center'>
        <div className='text-4xl mb-4'>{icon}</div>
        <Heading level={3} className='text-purple-800 dark:text-purple-300 mb-4'>
          {typeLabel}
        </Heading>
        <Text variant='large' className='text-gray-800 dark:text-white leading-relaxed'>
          {question.text}
        </Text>
      </div>
    </motion.div>
  );
}
