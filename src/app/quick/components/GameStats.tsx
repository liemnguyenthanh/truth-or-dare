'use client';

import { useTranslation } from '@/hooks/useTranslation';

import { Text } from '@/components/shared/Typography';

import { QuestionType } from '@/types';

interface GameStatsProps {
  selectedType: QuestionType | null;
  truthCount: number;
  dareCount: number;
  usedQuestions: Set<string>;
  totalQuestions: number;
}

export function GameStats({
  selectedType,
  truthCount,
  dareCount,
  usedQuestions,
  totalQuestions,
}: GameStatsProps) {
  const { t } = useTranslation({ namespaces: ['common'] });

  if (!selectedType) return null;

  return (
    <div className='mt-6 text-center'>
      <div className='flex justify-center gap-6 text-sm'>
        <div className='flex items-center gap-2'>
          <span className='text-purple-600 dark:text-purple-400'>💭</span>
          <span className='text-gray-500 dark:text-gray-400'>
            {t('stats.truth')}:{' '}
            <span className='font-semibold text-purple-600 dark:text-purple-400'>
              {truthCount}
            </span>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-pink-600 dark:text-pink-400'>💖</span>
          <span className='text-gray-500 dark:text-gray-400'>
            {t('stats.dare')}:{' '}
            <span className='font-semibold text-pink-600 dark:text-pink-400'>
              {dareCount}
            </span>
          </span>
        </div>
      </div>
      <Text variant='caption' className='text-gray-400 dark:text-gray-500 mt-2'>
        {t('stats.totalCards', {
          used: usedQuestions.size,
          total: totalQuestions,
        })}
      </Text>
      {usedQuestions.size === totalQuestions && (
        <div className='mt-2 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg'>
          <Text
            variant='small'
            className='text-purple-700 dark:text-purple-300 font-medium'
          >
            {t('stats.completed')}
          </Text>
          <Text
            variant='caption'
            className='text-purple-600 dark:text-purple-400 mt-1'
          >
            {t('stats.resetToContinue')}
          </Text>
        </div>
      )}
    </div>
  );
}
