'use client';

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
  return (
    <div className='mt-6 text-center'>
      <Text variant='small' className='text-gray-500 dark:text-gray-400'>
        Đã rút: {usedCount}/{totalCount} bài
      </Text>
      {isGameComplete && (
        <Text variant='caption' className='text-green-600 dark:text-green-400 mt-1'>
          🎉 Đã hoàn thành tất cả câu hỏi!
        </Text>
      )}
    </div>
  );
}

