'use client';

import { DRINK_CATEGORIES, DrinkCategoryId } from '@/data/questions/drink';

import { CategorySelector as SharedCategorySelector } from '@/components/shared';

interface CategorySelectorProps {
  onSelectCategory: (categoryId: DrinkCategoryId) => void;
  onViewQuestions?: (categoryId: DrinkCategoryId) => void;
}

export function CategorySelector({
  onSelectCategory,
  onViewQuestions,
}: CategorySelectorProps) {
  // Transform DRINK_CATEGORIES để match với Category type từ shared component
  const categories = DRINK_CATEGORIES.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    icon: cat.id === '18+' ? '🍺' : '🔥',
    color: cat.id === '18+' ? '#9b59b6' : '#e74c3c',
    isNew: cat.id === '18+_tao_bao', // Đánh dấu category mới
  }));

  return (
    <SharedCategorySelector
      title='🎯 Chọn Bộ Câu Hỏi'
      description='Chọn một bộ câu hỏi để bắt đầu chơi'
      categories={categories}
      onCategorySelect={(categoryId) =>
        onSelectCategory(categoryId as DrinkCategoryId)
      }
      onViewQuestions={
        onViewQuestions
          ? (categoryId) => onViewQuestions(categoryId as DrinkCategoryId)
          : undefined
      }
    />
  );
}
