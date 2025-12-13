'use client';

import type { DrinkCategory } from '@/lib/questions';
import { useTranslation } from '@/hooks/useTranslation';

import { DrinkCategoryId } from '@/data/questions/drink';

import { CategorySelector as SharedCategorySelector } from '@/components/shared';

interface CategorySelectorProps {
  categories?: DrinkCategory[];
  onSelectCategory: (categoryId: DrinkCategoryId) => void;
  onViewQuestions?: (categoryId: DrinkCategoryId) => void;
}

export function CategorySelector({
  categories: providedCategories,
  onSelectCategory,
  onViewQuestions,
}: CategorySelectorProps) {
  const { t } = useTranslation({ namespaces: ['pages'] });

  // Use provided categories or fallback to default
  const categories = (providedCategories || []).map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    icon:
      cat.id === '18+'
        ? '🍺'
        : cat.id === 'tinh_ban'
        ? '👥'
        : cat.id === 'cong_so'
        ? '💼'
        : '🔥',
    color:
      cat.id === '18+'
        ? '#9b59b6'
        : cat.id === 'tinh_ban'
        ? '#3498db'
        : cat.id === 'cong_so'
        ? '#2ecc71'
        : '#e74c3c',
    isNew: cat.id === '18+_tao_bao', // Đánh dấu category mới
  }));

  return (
    <SharedCategorySelector
      title={t('drink.selectCategoryTitle')}
      description={t('drink.selectCategoryDescription')}
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
