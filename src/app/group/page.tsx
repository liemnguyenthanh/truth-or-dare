'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDonate } from '@/hooks';

import { EighteenQuestions } from '@/data/questions/18';
import { PartyQuestions } from '@/data/questions/party';

import {
  DonateModal,
  DonateTicker,
  Heading,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Text,
  ViewQuestionsModal,
} from '@/components/shared';
import { CategoryCard } from '@/components/shared/CategoryCard';
import RatingModal from '@/components/shared/RatingModal';

import { ParticipantQueue, ParticipantsManager } from './components';
import { useGroupGame } from './hooks';
import { QuestionCard, TruthDareButtons } from '../quick/components';

// Helper để lấy questions theo category
function getQuestionsForCategory(category: string) {
  switch (category) {
    case '18':
      return EighteenQuestions;
    case 'party':
      return PartyQuestions;
    default:
      return [];
  }
}

interface Participant {
  id: string;
  name: string;
}

export default function GroupPage() {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showParticipantsManager, setShowParticipantsManager] = useState(true);
  const [localSelectedCategory, setLocalSelectedCategory] = useState<
    string | null
  >(null);
  const [viewQuestionsCategory, setViewQuestionsCategory] = useState<
    string | null
  >(null);

  // Auto scroll to top when page loads (fix mobile scroll position issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Game hook
  const game = useGroupGame(participants);

  // Track total questions played
  const questionsPlayed = game.truthCount + game.dareCount;

  // Donate modal hook
  const donate = useDonate({
    cardsPlayed: questionsPlayed,
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

  // Handle donate button click
  const handleDonateClick = useCallback(() => {
    donate.openDonateModal();
  }, [donate]);

  // Handle view questions
  const handleViewQuestions = useCallback((categoryId: string) => {
    setViewQuestionsCategory(categoryId);
  }, []);

  // Get questions for selected category
  const viewQuestions = viewQuestionsCategory
    ? getQuestionsForCategory(viewQuestionsCategory)
    : [];

  // Get category name
  const categoryName =
    (viewQuestionsCategory &&
      game.categories.find((cat) => cat.id === viewQuestionsCategory)?.name) ||
    '';

  const handleParticipantsChange = useCallback(
    (newParticipants: Participant[]) => {
      setParticipants(newParticipants);
    },
    []
  );

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
              <Text>Thêm người chơi và chọn category để bắt đầu</Text>
            </div>

            {/* Participants Manager */}
            <ParticipantsManager
              onParticipantsChange={handleParticipantsChange}
              minParticipants={2}
            />

            {/* Category Selection */}
            {participants.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='mt-10'
              >
                <Heading
                  level={3}
                  className='mb-6 text-gray-800 dark:text-gray-200'
                >
                  Chọn Category
                </Heading>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                  {game.categories.map((category, index) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      index={index}
                      onClick={() => handleCategorySelect(category.id)}
                      isSelected={localSelectedCategory === category.id}
                      onViewQuestions={() => handleViewQuestions(category.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className='flex gap-4 mt-8'>
              <SecondaryButton onClick={() => router.push('/')} fullWidth>
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

        <ViewQuestionsModal
          isOpen={viewQuestionsCategory !== null}
          onClose={() => setViewQuestionsCategory(null)}
          categoryName={categoryName}
          questions={viewQuestions}
          onSelectCategory={() => {
            if (viewQuestionsCategory) {
              handleCategorySelect(viewQuestionsCategory);
              setViewQuestionsCategory(null);
            }
          }}
        />
      </div>
    );
  }

  // Show game
  if (game.gameStarted && game.selectedCategory) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200'>
        <DonateTicker />
        <div className='p-2'>
          <PageHeader onDonate={handleDonateClick} />

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
                  disabledTruth={!game.hasAvailableTruth}
                  disabledDare={!game.hasAvailableDare}
                />
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
                  disabledTruth={!game.hasAvailableTruth}
                  disabledDare={!game.hasAvailableDare}
                />
              </>
            )}
          </div>

          <ParticipantQueue
            participants={participants}
            currentIndex={game.currentParticipantIndex}
          />
        </div>

        <DonateModal
          isOpen={donate.isDonateModalOpen}
          onClose={donate.closeDonateModal}
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
