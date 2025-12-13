'use client';

import { useTranslation } from '@/hooks/useTranslation';

import { Text } from '@/components/shared/Typography';

interface GameStatsProps {
  usedCount: number;
  totalCount: number;
  isGameComplete: boolean;
}

export function GameStats({
  usedCount,
  totalCount,
  isGameComplete,
}: GameStatsProps) {
  const { t } = useTranslation({ namespaces: ['pages'] });

  return (
    <div className='mt-6 text-center'>
      <Text variant='small' className='text-gray-500 dark:text-gray-400'>
        {t('drink.stats.drawn', { used: usedCount, total: totalCount })}
      </Text>
      {isGameComplete && (
        <Text
          variant='caption'
          className='text-green-600 dark:text-green-400 mt-1'
        >
          {t('drink.gameCompleteAll')}
        </Text>
      )}
    </div>
  );
}
