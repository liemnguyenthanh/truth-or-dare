'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useTranslation } from '@/hooks/useTranslation';

import { Heading, Text } from '@/components/shared/Typography';

import { Question, QuestionType } from '@/types';

interface QuestionCardProps {
  selectedType: QuestionType | null;
  currentQuestion: Question | null;
  isDrawingCard: boolean;
}

export function QuestionCard({
  selectedType,
  currentQuestion,
  isDrawingCard,
}: QuestionCardProps) {
  const { t } = useTranslation({ namespaces: ['common'] });

  if (!selectedType) return null;

  const cardColor =
    selectedType === 'truth'
      ? 'from-purple-400 to-purple-600'
      : 'from-pink-400 to-pink-600';

  const icon = selectedType === 'truth' ? '💭' : '💖';
  const typeLabel =
    selectedType === 'truth' ? t('stats.truth') : t('stats.dare');

  if (!currentQuestion) return null;

  return (
    <div className='relative w-full max-w-lg'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentQuestion.text}
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: -100 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className='w-full'
        >
          <div
            className={`bg-gradient-to-br ${cardColor} rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[320px] md:min-h-[400px]`}
          >
            {/* Type Label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className='mb-3 sm:mb-4 md:mb-6 flex items-center justify-center gap-2'
            >
              <div className='text-3xl sm:text-4xl md:text-5xl'>{icon}</div>
              <Heading
                level={3}
                className='text-xl sm:text-2xl md:text-3xl tracking-wider text-white drop-shadow-lg'
              >
                {typeLabel}
              </Heading>
            </motion.div>

            {/* Question Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className='text-white text-center px-2 sm:px-4'
            >
              <Text
                variant='large'
                className='text-base sm:text-lg md:text-2xl font-bold leading-relaxed text-white'
              >
                {currentQuestion.text}
              </Text>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
