'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useTranslations } from '@/hooks/useTranslations';

import { couplePositions } from '@/data/couples/positions';

import AgeVerificationModal from '@/components/shared/AgeVerificationModal';

import FavoritesButton from '@/features/couples/components/FavoritesButton';
import FloatingCategoryFilter from '@/features/couples/components/FloatingCategoryFilter';
import ShuffleButton from '@/features/couples/components/ShuffleButton';
import SwipeCardStack from '@/features/couples/components/SwipeCardStack';

import { CouplePosition } from '@/types';

interface CouplesPageProps {
  params: { locale: string };
}

export default function CouplesPage({ params }: CouplesPageProps) {
  const router = useRouter();
  const t = useTranslations();
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [positions, setPositions] = useState<CouplePosition[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [displayedPositions, setDisplayedPositions] = useState<
    CouplePosition[]
  >([]);
  const [currentPosition, setCurrentPosition] = useState<CouplePosition | null>(
    null
  );
  const [favorites, setFavorites] = useState<CouplePosition[]>([]);

  // Xáo trộn vị trí của các thẻ bài khi tải trang
  useEffect(() => {
    if (ageVerified) {
      const shuffledPositions = [...couplePositions].sort(
        () => Math.random() - 0.5
      );
      setPositions(shuffledPositions);
    }
  }, [ageVerified]);

  // Lọc các thẻ bài theo danh mục được chọn
  useEffect(() => {
    if (selectedCategory === 'all') {
      setDisplayedPositions(positions);
    } else {
      setDisplayedPositions(
        positions.filter((pos) => pos.category === selectedCategory)
      );
    }
  }, [selectedCategory, positions]);

  const handleAgeConfirm = useCallback(() => {
    localStorage.setItem('age_verified', 'true');
    setShowAgeVerification(false);
    setAgeVerified(true);
  }, []);

  const handleAgeCancel = useCallback(() => {
    router.push(`/${params.locale === 'vi' ? '' : params.locale}`);
  }, [router, params.locale]);

  const handleShufflePositions = useCallback(() => {
    const shuffled = [...positions].sort(() => Math.random() - 0.5);
    setPositions(shuffled);
  }, [positions]);

  const handlePositionChange = useCallback(
    (position: CouplePosition, index: number) => {
      setCurrentPosition(position);
    },
    []
  );

  const handleFavorite = useCallback((position: CouplePosition) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === position.id);
      if (isAlreadyFavorite) {
        return prev.filter((fav) => fav.id !== position.id);
      } else {
        return [...prev, position];
      }
    });

    // Show toast or feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800'>
      <AgeVerificationModal
        isOpen={showAgeVerification}
        onConfirm={handleAgeConfirm}
        onCancel={handleAgeCancel}
      />

      {ageVerified && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='relative h-screen'
        >
          {/* Header */}
          <div
            className='absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent p-6 pt-12'
            style={{ zIndex: 9997 }}
          >
            <div className='text-center'>
              <p className='text-white/80 text-sm'>
                {params.locale === 'vi'
                  ? 'Vuốt để khám phá'
                  : 'Swipe to explore'}
              </p>
            </div>
          </div>

          {/* Main Swipe Area */}
          <div className='absolute inset-0 pt-24 pb-32 px-4'>
            <div className='relative w-full h-full max-w-sm mx-auto'>
              {displayedPositions.length > 0 ? (
                <SwipeCardStack
                  positions={displayedPositions}
                  onPositionChange={handlePositionChange}
                  onFavorite={handleFavorite}
                  onShuffle={handleShufflePositions}
                />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <div className='text-center'>
                    <div className='w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto'>
                      <span className='text-4xl'>😔</span>
                    </div>
                    <p className='text-gray-500 dark:text-gray-400 text-lg'>
                      {params.locale === 'vi'
                        ? 'Không tìm thấy tư thế phù hợp'
                        : 'No suitable positions found'}
                    </p>
                    <p className='text-gray-400 dark:text-gray-500 text-sm mt-2'>
                      {params.locale === 'vi'
                        ? 'Thử chọn danh mục khác'
                        : 'Try selecting a different category'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Shuffle Button */}
          <ShuffleButton onShuffle={handleShufflePositions} />

          {/* Floating Category Filter */}
          <FloatingCategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Favorites Button */}
          <FavoritesButton
            favorites={favorites}
            onViewFavorites={() => {
              // TODO: Implement favorites modal or page
              console.log('View favorites:', favorites);
            }}
          />

          {/* Current Position Info (Optional) */}
          {currentPosition && (
            <div
              className='absolute bottom-4 left-4 right-4 pointer-events-none'
              style={{ zIndex: 9996 }}
            >
              <div className='bg-black/40 backdrop-blur-sm rounded-2xl px-4 py-2 text-center'>
                <p className='text-white text-sm font-medium'>
                  {currentPosition.name}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
