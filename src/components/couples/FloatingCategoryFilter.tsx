'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

import { useTranslations } from '@/hooks/useTranslations';

import { coupleCategories } from '@/data/couples/categories';

import { CoupleCategory } from '@/types';

interface FloatingCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function FloatingCategoryFilter({
  selectedCategory,
  onCategoryChange,
}: FloatingCategoryFilterProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategoryData = coupleCategories.find(
    (cat) => cat.id === selectedCategory
  );
  const selectedCategoryName =
    selectedCategory === 'all'
      ? t.gamePages.couples.categoryFilter.all
      : selectedCategoryData?.name;

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsOpen(false);

    // Haptic feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Filter Button */}
      <motion.div
        className='fixed bottom-24 right-4'
        style={{ zIndex: 10001 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg flex items-center space-x-2 min-w-[120px] justify-center transition-colors'
          style={{
            background:
              selectedCategory !== 'all' && selectedCategoryData
                ? `linear-gradient(135deg, ${selectedCategoryData.color}, ${selectedCategoryData.color}dd)`
                : undefined,
          }}
        >
          <Filter size={20} />
          <span className='text-sm font-medium truncate max-w-[80px]'>
            {selectedCategoryName}
          </span>
        </button>
      </motion.div>

      {/* Category Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed bottom-0 left-0 right-0'
            style={{ zIndex: 10002 }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          >
            <div className='bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl border-t border-gray-200 dark:border-gray-700'>
              {/* Header */}
              <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {t.gamePages.couples.categoryFilter.title}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
                >
                  <X size={20} className='text-gray-500 dark:text-gray-400' />
                </button>
              </div>

              {/* Categories */}
              <div className='p-6 max-h-[60vh] overflow-y-auto'>
                <div className='space-y-3'>
                  {/* All categories option */}
                  <motion.button
                    onClick={() => handleCategorySelect('all')}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                        : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='flex items-center space-x-3'>
                      <div className='w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500' />
                      <div>
                        <h4 className='font-medium text-gray-900 dark:text-white'>
                          {t.gamePages.couples.categoryFilter.all}
                        </h4>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          {t.gamePages.couples.categoryFilter.allDescription}
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  {/* Individual categories */}
                  {coupleCategories.map((category: CoupleCategory) => (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedCategory === category.id
                          ? 'border-2 border-current'
                          : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      style={{
                        backgroundColor:
                          selectedCategory === category.id
                            ? `${category.color}20`
                            : undefined,
                        color:
                          selectedCategory === category.id
                            ? category.color
                            : undefined,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className='flex items-center space-x-3'>
                        <div
                          className='w-4 h-4 rounded-full'
                          style={{ backgroundColor: category.color }}
                        />
                        <div>
                          <h4 className='font-medium text-gray-900 dark:text-white'>
                            {category.name}
                          </h4>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Safe area for mobile */}
              <div className='h-safe-area-inset-bottom' />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
