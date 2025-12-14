'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

import { useTranslation } from '@/hooks/useTranslation';

interface Participant {
  id: string;
  name: string;
}

interface ParticipantQueueProps {
  participants: Participant[];
  currentIndex: number;
}

export function ParticipantQueue({
  participants,
  currentIndex,
}: ParticipantQueueProps) {
  const { t } = useTranslation({ namespaces: ['common'] });

  // Memoize the calculations for efficiency and clarity
  const { firstItem, restItems } = useMemo(() => {
    if (participants.length === 0) {
      return { firstItem: null, restItems: [] };
    }

    // Current participant
    const currentParticipant = {
      ...participants[currentIndex],
      isCurrent: true,
      index: currentIndex,
    };

    // Get up to 6 next participants (excluding current)
    // Add queuePosition to ensure unique keys even if same participant appears multiple times
    const restItems = Array.from({ length: 6 }, (_, i) => {
      const idx = (currentIndex + i + 1) % participants.length;
      return {
        ...participants[idx],
        isCurrent: false,
        index: idx,
        queuePosition: i, // Unique position in queue
      };
    });

    return {
      firstItem: currentParticipant,
      restItems,
    };
  }, [participants, currentIndex]);

  if (!firstItem || !restItems?.length) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-800 p-4 z-40 border-t border-purple-800/30'>
      <div className='max-w-7xl mx-auto'>
        <p className='text-white/60 text-xs mb-3 text-center font-medium'>
          {t('game.nextPlayer')}
        </p>
        <div className='flex justify-center items-center'>
          <div className='flex items-center max-w-[375px] gap-2 w-full overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={firstItem.id}
                layout='position'
                initial={{ opacity: 0, scale: 0.7, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: -30 }}
                transition={{
                  layout: { type: 'spring', bounce: 0.2, duration: 0.6 },
                  opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  x: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                className='flex-shrink-0 rounded-full px-4 py-2 bg-purple-500 shadow-lg'
              >
                <p className='text-sm font-semibold whitespace-nowrap text-white'>
                  {firstItem.name}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className='flex items-center gap-2 flex-1'>
              {restItems.map((participant) => {
                // Key combines position and participant to ensure uniqueness and updates
                const uniqueKey = `queue-${participant.queuePosition}-${participant.id}-${participant.index}`;
                return (
                  <div
                    key={uniqueKey}
                    className='flex-shrink-0 rounded-full px-4 py-2 bg-purple-800/50 hover:bg-purple-700/60'
                  >
                    <p className='text-sm font-semibold whitespace-nowrap text-white/80'>
                      {participant.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
