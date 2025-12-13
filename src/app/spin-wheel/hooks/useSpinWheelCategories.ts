import { useCallback, useState } from 'react';

import { useTranslation } from '@/hooks/useTranslation';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface UseSpinWheelCategoriesReturn {
  selectedCategory: string | null;
  categories: Category[];
  selectCategory: (categoryId: string) => void;
  resetCategory: () => void;
}

export function useSpinWheelCategories(): UseSpinWheelCategoriesReturn {
  const { t } = useTranslation({ namespaces: ['pages'] });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const CATEGORIES: Category[] = [
    {
      id: '18',
      name: '18+',
      description: t('spinWheel.categories.18.description'),
      icon: '💜',
    },
    {
      id: 'party',
      name: 'Party',
      description: t('spinWheel.categories.party.description'),
      icon: '🎉',
    },
  ];

  const selectCategory = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const resetCategory = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  return {
    selectedCategory,
    categories: CATEGORIES,
    selectCategory,
    resetCategory,
  };
}
