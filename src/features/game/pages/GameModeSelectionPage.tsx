'use client';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useLocale, useTranslations } from '@/hooks';

import RatingModal from '@/components/shared/RatingModal';

import { GameMode, GameModeOption } from '@/types';

interface GameModeSelectionPageProps {
  onModeSelected?: (mode: GameMode) => void;
}

export function GameModeSelectionPage({
  onModeSelected,
}: GameModeSelectionPageProps) {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const t = useTranslations();
  const currentLocale = useLocale(); // Use common locale hook

  // Create game mode options using translations
  const gameModeOptions: GameModeOption[] = [
    {
      id: 'couples',
      name: t.gameModes.couples.name,
      description: t.gameModes.couples.description,
      icon: t.gameModes.couples.icon,
      isNew: true,
    },
    {
      id: 'quick',
      name: t.gameModes.quick.name,
      description: t.gameModes.quick.description,
      icon: t.gameModes.quick.icon,
    },
    {
      id: 'group',
      name: t.gameModes.group.name,
      description: t.gameModes.group.description,
      icon: t.gameModes.group.icon,
    },
    {
      id: 'spin_wheel',
      name: t.gameModes.spinWheel.name,
      description: t.gameModes.spinWheel.description,
      icon: t.gameModes.spinWheel.icon,
    },
  ];

  const handleModeSelect = (mode: GameMode) => {
    if (onModeSelected) {
      onModeSelected(mode);
    } else {
      // Navigate to the appropriate page with locale
      const basePath = `/${currentLocale}`;

      switch (mode) {
        case 'quick':
          router.push(`${basePath}/quick`);
          break;
        case 'group':
          router.push(`${basePath}/group`);
          break;
        case 'spin_wheel':
          router.push(`${basePath}/spin-wheel`);
          break;
        case 'couples':
          router.push(`${basePath}/couples`);
          break;
      }
    }
  };

  const handleRatingSubmit = async (data: {
    rating: number;
    comment: string;
    emoji?: string;
  }) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'rating',
          title: t.gameModes.ratingSubmitted.replace(
            '{rating}',
            data.rating.toString()
          ),
          description: data.comment,
          rating: data.rating,
          category: 'homepage',
        }),
      });

      if (response.ok) {
        // Could show a success toast here
        console.log('Rating submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className='max-w-4xl mx-auto'
    >
      <div className='mb-10 text-center'>
        <h1 className='text-4xl font-bold text-purple-800 dark:text-purple-300 mb-4'>
          {t.metadata.ogTitle.split(' - ')[0]}
        </h1>
        <p className='text-purple-600 dark:text-purple-300 text-lg'>
          {t.gameModes.subtitle}
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
        {gameModeOptions.map((option) => (
          <motion.div
            key={option.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all duration-200 relative ${
              option.isNew ? 'ring-2 ring-pink-400 ring-opacity-50' : ''
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleModeSelect(option.id)}
            animate={
              option.isNew
                ? {
                    boxShadow: [
                      '0 0 0 0 rgba(236, 72, 153, 0.4)',
                      '0 0 0 10px rgba(236, 72, 153, 0)',
                      '0 0 0 0 rgba(236, 72, 153, 0)',
                    ],
                  }
                : {}
            }
            transition={
              option.isNew
                ? {
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
                : {}
            }
          >
            {/* NEW Badge */}
            {option.isNew && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: -12 }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                }}
                className='absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm sm:text-xs font-bold px-4 py-2 sm:px-3 sm:py-1 rounded-full shadow-lg z-10'
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {t.gameModes.newBadge} ✨
                </motion.span>
              </motion.div>
            )}

            <div className='text-center'>
              <div className='text-5xl sm:text-6xl mb-3 sm:mb-4'>
                {option.icon}
              </div>
              <h3 className='text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-300 mb-2 sm:mb-3'>
                {option.name}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed'>
                {option.description}
              </p>
            </div>

            <div className='mt-4 sm:mt-6 flex justify-center'>
              <motion.button
                className='px-5 py-2.5 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg shadow-md transition-colors duration-200 font-medium text-sm sm:text-base'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.gameModes.startGame}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='mt-8 text-center space-y-4'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {t.gameModes.changeModeAnytime}
        </p>

        {/* Rating Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='pt-4'
        >
          <motion.button
            onClick={() => setShowRatingModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-200 font-medium'
          >
            <Heart className='w-5 h-5' />
            <span>{t.gameModes.rateGame}</span>
            <Star className='w-5 h-5' />
          </motion.button>
          <p className='text-xs text-gray-400 mt-2'>
            {t.gameModes.rateGameDescription}
          </p>
        </motion.div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRatingSubmit}
        title={t.gameModes.rateGameTitle}
        description={t.gameModes.rateGameSubtitle}
      />
    </motion.div>
  );
}
