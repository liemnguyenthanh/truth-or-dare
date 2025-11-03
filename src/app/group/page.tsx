'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import RatingModal from '@/components/shared/RatingModal';
import { CodeInputModal } from '@/components/payment/CodeInputModal';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { SavedCodesModal } from '@/components/payment/SavedCodesModal';
import { ErrorToast, Heading, PageHeader, PaymentButton, PrimaryButton, SecondaryButton, Text } from '@/components/shared';

import {
  QuestionCard,
  TruthDareButtons,
} from '../quick/components';
import { ParticipantsManager, ParticipantQueue } from './components';
import { useGroupGame, useGroupPayment } from './hooks';

const PAYMENT_CARDS_LIMIT = 5;

interface Participant {
  id: string;
  name: string;
}

export default function GroupPage() {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showParticipantsManager, setShowParticipantsManager] = useState(true);
  const [localSelectedCategory, setLocalSelectedCategory] = useState<string | null>(null);
  const [isGameUnlocked, setIsGameUnlocked] = useState(false);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Game hook
  const game = useGroupGame(participants);

  // Track total questions played
  const questionsPlayed = game.truthCount + game.dareCount;

  // Payment hook
  const payment = useGroupPayment({
    questionsPlayed,
    onPaymentSuccess: () => {
      setIsGameUnlocked(true);
    },
  });

  // Hide participants manager when starting game
  useEffect(() => {
    if (game.gameStarted) {
      setShowParticipantsManager(false);
    }
  }, [game.gameStarted]);

  // Show rating modal when game complete
  useEffect(() => {
    if (game.isGameComplete && game.gameStarted && !showRatingModal) {
      setShowRatingModal(true);
    }
  }, [game.isGameComplete, game.gameStarted, showRatingModal]);

  const handleParticipantsChange = useCallback((newParticipants: Participant[]) => {
    setParticipants(newParticipants);
  }, []);

  const handleRatingClose = useCallback(() => {
    setShowRatingModal(false);
    game.endGame();
    setParticipants([]);
    router.push('/');
  }, [game, router]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setLocalSelectedCategory(categoryId);
  }, []);

  const startGame = useCallback(() => {
    if (participants.length >= 2 && localSelectedCategory) {
      game.selectCategory(localSelectedCategory);
    }
  }, [participants.length, localSelectedCategory, game]);

  // Show participants manager
  if (showParticipantsManager && !game.gameStarted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8'>
            <div className='text-center mb-8'>
              <div className='text-6xl mb-4'>👥</div>
              <Heading level={1} className='mb-2'>
                Chế Độ Nhóm
              </Heading>
              <Text>
                Thêm người chơi và chọn category để bắt đầu
              </Text>
            </div>

            {/* Participants Manager */}
            <ParticipantsManager
              onParticipantsChange={handleParticipantsChange}
              minParticipants={2}
            />

            {/* Category Selection */}
            {participants.length >= 2 && (
              <div className='mt-8'>
                <Heading level={3} className='mb-4'>
                  Chọn Category
                </Heading>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                  {game.categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border-2 transition-all duration-200 ${
                        localSelectedCategory === category.id
                          ? 'border-purple-500'
                          : 'border-transparent hover:border-purple-500'
                      }`}
                    >
                      <div className='text-center'>
                        <div className='text-4xl mb-3'>{category.icon}</div>
                        <Heading level={3} className='text-purple-800 dark:text-purple-300 mb-2 text-xl sm:text-2xl'>
                          {category.name}
                        </Heading>
                        <Text variant='large' className='leading-relaxed'>
                          {category.description}
                        </Text>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className='flex gap-4 mt-8'>
              <SecondaryButton
                onClick={() => router.push('/')}
                fullWidth
              >
                Quay lại trang chủ
              </SecondaryButton>
              <PrimaryButton
                onClick={startGame}
                disabled={participants.length < 2 || !localSelectedCategory}
                fullWidth
                size='md'
              >
                Bắt đầu game ({participants.length} người)
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show game
  if (game.gameStarted && game.selectedCategory) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
        <PageHeader onViewCodes={() => payment.setIsSavedCodesOpen(true)} />

        <div className='flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] gap-3 sm:gap-4 md:gap-6 pb-20 sm:pb-24 md:pb-32'>
          {!game.selectedType ? (
            <div className='text-center mb-4 sm:mb-6 md:mb-8'>
              <Heading level={1} className='mb-2'>
                {game.currentParticipant?.name || 'Loading...'}
              </Heading>
              <Text variant='large' className='mb-6'>
                Chọn loại câu hỏi
              </Text>
              <TruthDareButtons
                selectedType={game.selectedType}
                currentQuestion={game.currentQuestion}
                isDrawingCard={game.isDrawingCard}
                onDrawCard={game.drawNewCard}
                showInitialSelection={true}
                disabledTruth={
                  !game.hasAvailableTruth ||
                  (payment.isPaymentRequired &&
                    !isGameUnlocked &&
                    questionsPlayed >= PAYMENT_CARDS_LIMIT)
                }
                disabledDare={
                  !game.hasAvailableDare ||
                  (payment.isPaymentRequired &&
                    !isGameUnlocked &&
                    questionsPlayed >= PAYMENT_CARDS_LIMIT)
                }
              />

              {payment.isPaymentRequired &&
                !isGameUnlocked &&
                questionsPlayed >= PAYMENT_CARDS_LIMIT && (
                  <PaymentButton
                    isProcessing={payment.isProcessing}
                    onCreateOrder={payment.createOrder}
                    onCodeInputClick={() => payment.setIsCodeInputOpen(true)}
                    className='mt-2 sm:mt-3 md:mt-4'
                  />
                )}
            </div>
          ) : (
            <QuestionCard
              selectedType={game.selectedType}
              currentQuestion={game.currentQuestion}
              isDrawingCard={game.isDrawingCard}
            />
          )}

          {game.selectedType && game.currentQuestion && (
            <>
              <TruthDareButtons
                selectedType={game.selectedType}
                currentQuestion={game.currentQuestion}
                isDrawingCard={game.isDrawingCard}
                onDrawCard={game.drawNewCard}
                showInitialSelection={false}
                disabledTruth={
                  !game.hasAvailableTruth ||
                  (payment.isPaymentRequired &&
                    !isGameUnlocked &&
                    questionsPlayed >= PAYMENT_CARDS_LIMIT)
                }
                disabledDare={
                  !game.hasAvailableDare ||
                  (payment.isPaymentRequired &&
                    !isGameUnlocked &&
                    questionsPlayed >= PAYMENT_CARDS_LIMIT)
                }
              />

              {payment.isPaymentRequired &&
                !isGameUnlocked &&
                questionsPlayed >= PAYMENT_CARDS_LIMIT && (
                  <PaymentButton
                    isProcessing={payment.isProcessing}
                    onCreateOrder={payment.createOrder}
                    onCodeInputClick={() => payment.setIsCodeInputOpen(true)}
                    className='mt-2 sm:mt-3 md:mt-4'
                  />
                )}
            </>
          )}
        </div>

        <ParticipantQueue
          participants={participants}
          currentIndex={game.currentParticipantIndex}
        />

        <PaymentModal
          isOpen={payment.isPaymentModalOpen}
          onClose={payment.closePaymentModal}
          orderData={payment.orderData}
          onPaymentSuccess={() => setIsGameUnlocked(true)}
          onPaymentCancel={() => router.push('/')}
        />

        <CodeInputModal
          isOpen={payment.isCodeInputOpen}
          onClose={() => payment.setIsCodeInputOpen(false)}
          onCodeValid={(_code) => {
            setIsGameUnlocked(true);
            payment.setIsCodeInputOpen(false);
          }}
          onCodeInvalid={() => {
            // Error handled by modal
          }}
        />

        {payment.error && (
          <ErrorToast message={payment.error} variant='error' />
        )}

        <SavedCodesModal
          isOpen={payment.isSavedCodesOpen}
          onClose={() => payment.setIsSavedCodesOpen(false)}
        />

        <RatingModal
          isOpen={showRatingModal}
          onClose={handleRatingClose}
          title='🎉 Hoàn thành game!'
          description='Cả nhóm đã chơi hết tất cả câu hỏi. Hãy đánh giá trải nghiệm của bạn!'
          category='group-mode'
          autoSubmit={true}
          metadata={{
            truthCount: game.truthCount,
            dareCount: game.dareCount,
            totalQuestions: game.totalQuestions,
            selectedCategory: game.selectedCategory,
            participantsCount: participants.length,
          }}
        />
      </div>
    );
  }

  return null;
}
