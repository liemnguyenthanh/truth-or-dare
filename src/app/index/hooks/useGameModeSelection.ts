import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { GameMode, GameModeOption } from '@/types';

export const GAME_MODE_OPTIONS: GameModeOption[] = [
  {
    id: 'couples',
    name: 'Thẻ Bài Cặp Đôi',
    description: 'Lật bài chọn tư thế dành cho cặp đôi (18+) - Cập nhật mới!',
    icon: '❤️',
    isNew: true,
  },
  {
    id: 'drink',
    name: 'Drink',
    description: 'Rút bài và thực hiện thử thách. Ai không làm được thì uống!',
    icon: '🍺',
    isNew: true,
    hasNewQuestions: true,
  },
  {
    id: 'quick',
    name: 'Chế Độ Nhanh',
    description: 'Chơi ngay không cần nhập tên. Chọn category và bắt đầu!',
    icon: '⚡',
  },
  {
    id: 'group',
    name: 'Chế Độ Nhóm',
    description: 'Thêm tên người chơi và chơi theo lượt',
    icon: '👥',
  },
  {
    id: 'spin_wheel',
    name: 'Vòng Quay May Mắn',
    description: 'Quay vòng may mắn để nhận câu hỏi ngẫu nhiên',
    icon: '🎡',
  },
];

interface UseGameModeSelectionProps {
  onModeSelected?: (mode: GameMode) => void;
}

export function useGameModeSelection({ onModeSelected }: UseGameModeSelectionProps = {}) {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);

  const handleModeSelect = useCallback(
    (mode: GameMode) => {
      if (onModeSelected) {
        onModeSelected(mode);
      } else {
        // Navigate to the appropriate page
        switch (mode) {
          case 'quick':
            router.push('/quick');
            break;
          case 'group':
            router.push('/group');
            break;
          case 'spin_wheel':
            router.push('/spin-wheel');
            break;
          case 'couples':
            router.push('/couples');
            break;
          case 'drink':
            router.push('/drink');
            break;
        }
      }
    },
    [onModeSelected, router]
  );

  const handleRatingSubmit = useCallback(async (data: {
    rating: number;
    comment: string;
    emoji?: string;
  }) => {
    try {
      const { createFeedback } = await import('@/lib/feedback');

      const result = await createFeedback({
        type: 'rating',
        title: `Đánh giá ${data.rating} sao`,
        description: data.comment,
        rating: data.rating,
        category: 'homepage',
        priority: 'medium',
      });

      if (result.success) {
        // Rating submitted successfully
      }
    } catch (error) {
      // Error submitting rating - could add toast notification here
    }
  }, []);

  return {
    gameModeOptions: GAME_MODE_OPTIONS,
    showRatingModal,
    setShowRatingModal,
    handleModeSelect,
    handleRatingSubmit,
  };
}

