import { useGame } from '@game/hooks';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Participant } from '@/types';

interface ParticipantQueueProps {
  queueLength?: number;
}

export function ParticipantQueue({ queueLength = 7 }: ParticipantQueueProps) {
  const { gameState, shouldRemoveQueue } = useGame();
  const { participants } = gameState;
  const [queue, setQueue] = useState<Participant[]>(() => {
    const removedFirstItem = participants.slice(1);
    const _queue: Participant[] = [...removedFirstItem];

    for (let i = 0; i < queueLength; i++) {
      _queue.push(...participants);
    }

    return _queue;
  });

  useEffect(() => {
    if (shouldRemoveQueue) {
      setQueue((preQueue) => {
        const newQueue = [...preQueue];
        newQueue.shift();
        return newQueue;
      });
    }
  }, [shouldRemoveQueue]);

  return (
    <div className='w-full max-w-md mx-auto my-4'>
      <div className='text-sm text-center mb-2 text-gray-600 dark:text-gray-400'>
        Người chơi tiếp theo:
      </div>
      <div className='flex items-center justify-center py-2 px-1 relative'>
        <div className='flex items-center space-x-3 overflow-hidden max-w-full'>
          {queue.map((participant, index) => (
            <motion.div
              key={`${participant.id}-${index}`}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-center ${
                index === 0
                  ? 'bg-purple-600 text-white font-bold shadow-lg z-10'
                  : 'bg-purple-100 dark:bg-purple-900/30 text-gray-800 dark:text-gray-200'
              } `}
              layout='position'
              initial={{ opacity: 0, scale: 0.7, x: 30 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
                x: -30,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{
                layout: { type: 'spring', bounce: 0.2, duration: 0.6 },
                delay: index * 0.03,
              }}
              custom={index}
            >
              <div className='flex items-center'>
                <span
                  className={
                    index === 0
                      ? 'text-white'
                      : 'text-gray-800 dark:text-gray-200'
                  }
                >
                  {participant.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
