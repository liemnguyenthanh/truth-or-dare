'use client';

import { motion } from 'framer-motion';

import { Category, CategoryCard } from './CategoryCard';
import { Heading, Text } from './Typography';

interface CategorySelectorProps {
  title: string;
  description?: string;
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
  onViewQuestions?: (categoryId: string) => void;
}

export function CategorySelector({
  title,
  description,
  categories,
  onCategorySelect,
  onViewQuestions,
}: CategorySelectorProps) {
  return (
    <div className='w-full max-w-4xl mx-auto px-4'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-8 sm:mb-12'
      >
        <Heading
          level={1}
          className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'
        >
          {title}
        </Heading>
        {description && (
          <Text
            variant='large'
            className='text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'
          >
            {description}
          </Text>
        )}
      </motion.div>

      {/* Category Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            onClick={() => onCategorySelect(category.id)}
            onViewQuestions={
              onViewQuestions ? () => onViewQuestions(category.id) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
