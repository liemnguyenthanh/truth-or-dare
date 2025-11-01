import { useCallback, useState } from 'react';

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

const CATEGORIES: Category[] = [
  {
    id: '18',
    name: '18+',
    description: 'Câu hỏi dành cho người lớn',
    icon: '💜',
  },
  {
    id: 'party',
    name: 'Party',
    description: 'Câu hỏi vui nhộn cho bữa tiệc',
    icon: '🎉',
  },
];

export function useSpinWheelCategories(): UseSpinWheelCategoriesReturn {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
