'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDonate } from '@/hooks';
import { useHideNavigation } from '@/hooks/useHideNavigation';

import { SwipeCardStack } from '@/components/game';
import { DonateModal, PageHeader, Text } from '@/components/shared';
import AgeVerificationModal from '@/components/shared/AgeVerificationModal';

import { useCouplesGame } from './hooks';

import { CouplePosition } from '@/types';

export default function CouplePositionsPage() {
  const router = useRouter();
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [_ageVerified, setAgeVerified] = useState(false);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Ẩn navigation khi vào game
  useHideNavigation();

  // Check age verification from localStorage
  useEffect(() => {
    const ageVerifiedLocal = localStorage.getItem('age_verified') === 'true';
    if (ageVerifiedLocal) {
      setAgeVerified(true);
      setShowAgeVerification(false);
    }
  }, []);

  // Game hook - no payment restrictions
  const game = useCouplesGame(
    false, // isPaymentRequired = false
    true // isGameUnlocked = true (always unlocked)
  );

  // Donate modal hook
  const donate = useDonate({
    cardsPlayed: game.cardsFlipped,
  });

  // Handle age verification
  const handleAgeConfirm = useCallback(() => {
    localStorage.setItem('age_verified', 'true');
    setShowAgeVerification(false);
    setAgeVerified(true);
  }, []);

  const handleAgeCancel = useCallback(() => {
    router.push('/');
  }, [router]);

  // Handle position change
  const handlePositionChange = useCallback(
    (position: CouplePosition, index: number) => {
      game.onPositionChange(position, index);
      // Note: Payment is NOT auto-triggered - user must click button
    },
    [game]
  );

  // If age not verified, show modal
  if (showAgeVerification) {
    return (
      <AgeVerificationModal
        isOpen={showAgeVerification}
        onConfirm={handleAgeConfirm}
        onCancel={handleAgeCancel}
      />
    );
  }

  // Main game view
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 relative h-screen overflow-hidden'>
      {/* Header */}
      <div className='absolute top-0 left-0 right-0 z-50'>
        <div className='bg-gradient-to-b from-black/20 to-transparent p-3'>
          <PageHeader
            backHref='/'
            backLabel='Quay lại'
            className='relative z-50'
          />
        </div>
      </div>

      {/* Main Swipe Area */}
      <div className='absolute inset-0 pt-[100px] pb-40 px-4'>
        <div className='relative w-full h-full max-w-sm mx-auto'>
          {game.displayedPositions.length > 0 ? (
            <SwipeCardStack
              positions={game.displayedPositions}
              onPositionChange={handlePositionChange}
              disabled={false}
            />
          ) : (
            <div className='flex items-center justify-center h-full'>
              <div className='text-center'>
                <div className='w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto'>
                  <span className='text-4xl'>😔</span>
                </div>
                <Text
                  variant='large'
                  className='text-gray-500 dark:text-gray-400'
                >
                  Không tìm thấy tư thế phù hợp
                </Text>
                <Text
                  variant='small'
                  className='text-gray-400 dark:text-gray-500 mt-2'
                >
                  Thử chọn danh mục khác
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Donate Modal */}
      <DonateModal
        isOpen={donate.isDonateModalOpen}
        onClose={donate.closeDonateModal}
      />
    </div>
  );
}
