'use client';

import { motion } from 'framer-motion';

import { Heading, Text } from './Typography';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  isNew?: boolean;
}

interface CategoryCardProps {
  category: Category;
  index?: number;
  onClick: () => void;
  isSelected?: boolean;
  onViewQuestions?: () => void;
}

export function CategoryCard({
  category,
  index = 0,
  onClick,
  isSelected = false,
  onViewQuestions,
}: CategoryCardProps) {
  // Default colors cho từng category nếu không có color
  const defaultColor = category.color || '#9b59b6';
  const icon = category.icon || '🎯';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className='relative'
    >
      {/* NEW Badge - Position absolute góc phải trên, ngoài button */}
      {category.isNew && (
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{
            delay: index * 0.1 + 0.2,
            type: 'spring',
            stiffness: 500,
            damping: 15,
          }}
          className='absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg z-10'
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            MỚI ✨
          </motion.span>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className={`group relative w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
          isSelected
            ? 'border-purple-500 dark:border-purple-400 shadow-purple-200 dark:shadow-purple-900/50'
            : 'border-transparent hover:border-purple-300 dark:hover:border-purple-600'
        }`}
      >
        {/* Gradient background effect on hover or when selected */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isSelected ? 'opacity-15' : 'opacity-0 group-hover:opacity-10'
          }`}
          style={{
            background: `linear-gradient(135deg, ${defaultColor}20, ${defaultColor}40)`,
          }}
        />

        {/* Content */}
        <div className='relative p-6 sm:p-8'>
          <div className='flex items-center gap-4 sm:gap-6'>
            {/* Icon bên trái */}
            <div
              className='w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'
              style={{
                backgroundColor: `${defaultColor}15`,
              }}
            >
              {icon}
            </div>

            {/* Title và Description bên phải icon */}
            <div className='flex-1 min-w-0'>
              {/* Title */}
              <Heading
                level={3}
                className='text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300'
              >
                {category.name}
              </Heading>

              {/* Description */}
              <Text
                variant='body'
                className='text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed'
              >
                {category.description}
              </Text>
            </div>

            {/* View Questions Button */}
            {onViewQuestions && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewQuestions();
                }}
                className='flex-shrink-0 px-3 py-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors'
              >
                👁️ Xem trước
              </button>
            )}

            {/* Arrow indicator bên phải cùng */}
            {!onViewQuestions && (
              <div className='flex-shrink-0 text-purple-400 dark:text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className={`h-1 transition-all duration-500 ${
            isSelected ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
          style={{ backgroundColor: defaultColor }}
        />

        {/* Selected checkmark indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className='absolute top-3 right-3 bg-purple-500 dark:bg-purple-600 text-white rounded-full p-1.5 shadow-lg z-10'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={3}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}
