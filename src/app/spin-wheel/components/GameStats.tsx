'use client';

import { Text } from '@/components/shared/Typography';

interface GameStatsProps {
  usedCount: number;
  totalCount: number;
  truthUsed?: number;
  dareUsed?: number;
  truthTotal?: number;
  dareTotal?: number;
}

export function GameStats({
  usedCount,
  totalCount,
  truthUsed,
  dareUsed,
  truthTotal,
  dareTotal,
}: GameStatsProps) {
  const isReset = usedCount === totalCount && usedCount > 0;

  return (
    <div className='text-center'>
      <Text variant='small' className='text-gray-500 dark:text-gray-400'>
        Đã rút: {usedCount}/{totalCount} câu hỏi
      </Text>
      
      {/* Show per-type breakdown if available */}
      {truthUsed !== undefined &&
        dareUsed !== undefined &&
        truthTotal !== undefined &&
        dareTotal !== undefined && (
          <div className='mt-2'>
            <Text variant='caption' className='text-gray-400 dark:text-gray-500 inline-block mr-3'>
              💭 Thật: {truthUsed}/{truthTotal}
            </Text>
            <Text variant='caption' className='text-gray-400 dark:text-gray-500 inline-block'>
              💖 Thách: {dareUsed}/{dareTotal}
            </Text>
          </div>
        )}
      
      {isReset && (
        <Text variant='caption' className='text-purple-600 dark:text-purple-400 mt-1'>
          🔄 Đã reset bộ câu hỏi
        </Text>
      )}
    </div>
  );
}
