'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { Heading, Text } from '@/components/shared/Typography';
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
}

export function CategorySelection({
  categories,
  onCategorySelect,
}: CategorySelectionProps) {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8'
        >
          <div className='text-center mb-8'>
            <Heading level={1} className='mb-2'>
              Chế Độ Nhanh
            </Heading>
            <Text>
              Chọn category và bắt đầu chơi ngay!
            </Text>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className='bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 cursor-pointer hover:border-purple-500 transition-all duration-200'
                onClick={() => onCategorySelect(category.id)}
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
              </motion.div>
            ))}
          </div>

          <div className='mt-8 text-center'>
            <div className='flex gap-4 justify-center'>
              <SecondaryButton onClick={() => router.push('/')}>
                Quay lại trang chủ
              </SecondaryButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
