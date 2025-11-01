import { useCallback, useState } from 'react';

import { coupleCategories } from '@/data/couples/categories';

import { CoupleCategory } from '@/types';

interface UseCouplesCategoriesReturn {
  selectedCategory: string;
  categories: CoupleCategory[];
  selectCategory: (categoryId: string) => void;
  resetCategory: () => void;
}

export function useCouplesCategories(): UseCouplesCategoriesReturn {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Reset category when needed
  const resetCategory = useCallback(() => {
    setSelectedCategory('all');
  }, []);

  // Select category
  const selectCategory = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  return {
    selectedCategory,
    categories: coupleCategories,
    selectCategory,
    resetCategory,
  };
}
