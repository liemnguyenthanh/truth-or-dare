'use client';

import { useRouter } from 'next/navigation';

import { CategorySelector } from '@/components/shared';
import { SecondaryButton } from '@/components/shared';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface CategorySelectionProps {
  categories: Category[];
  onCategorySelect: (category: string) => void;
  onViewQuestions?: (categoryId: string) => void;
}

export function CategorySelection({
  categories,
  onCategorySelect,
  onViewQuestions,
}: CategorySelectionProps) {
  const router = useRouter();

  // Transform categories để match với Category type từ shared component
  const transformedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    icon: cat.icon,
  }));

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4'>
      <div className='flex flex-col items-center justify-center min-h-[80vh]'>
        <CategorySelector
          title='Chế Độ Nhanh'
          description='Chọn category và bắt đầu chơi ngay!'
          categories={transformedCategories}
          onCategorySelect={onCategorySelect}
          onViewQuestions={onViewQuestions}
        />

        <div className='mt-8 text-center'>
          <SecondaryButton onClick={() => router.push('/')}>
            Quay lại trang chủ
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
