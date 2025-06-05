import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

import { defaultQuestions } from '../../../data/gameData';

import { Question } from '@/types';

interface QuestionListPageProps {
  onBack: () => void;
}

export function QuestionListPage({ onBack }: QuestionListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'truth' | 'dare' | null>(
    null
  );

  useEffect(() => {
    // Update document title when component mounts
    document.title = 'Danh Sách Câu Hỏi | Thật Hay Thách';

    // Optional: Restore original title when component unmounts
    return () => {
      document.title = 'Thật Hay Thách';
    };
  }, []);

  // Filter questions based on selected category and type
  // Sử dụng useMemo để tránh tính toán lại khi không cần thiết
  const filteredQuestions = useMemo(() => {
    return defaultQuestions.filter((question) => {
      if (selectedCategory && question.category !== selectedCategory)
        return false;
      if (selectedType && question.type !== selectedType) return false;
      return true;
    });
  }, [selectedCategory, selectedType]);

  // Sử dụng useMemo cho categories và types
  const categories = useMemo(() => {
    return Array.from(new Set(defaultQuestions.map((q) => q.category)));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className='container mx-auto px-4 pb-5'
    >
      <div className='mb-6 flex flex-wrap gap-3 justify-center pt-4'>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full ${
            !selectedCategory
              ? 'bg-purple-600 text-white'
              : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300'
          }`}
        >
          Tất Cả
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category === selectedCategory ? null : category
              )
            }
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='mb-6 flex justify-center gap-3'>
        <button
          onClick={() => setSelectedType(null)}
          className={`px-4 py-2 rounded-full ${
            !selectedType
              ? 'bg-purple-600 text-white'
              : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300'
          }`}
        >
          Tất Cả
        </button>
        <button
          onClick={() =>
            setSelectedType(selectedType === 'truth' ? null : 'truth')
          }
          className={`px-4 py-2 rounded-full ${
            selectedType === 'truth'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
          }`}
        >
          Sự Thật
        </button>
        <button
          onClick={() =>
            setSelectedType(selectedType === 'dare' ? null : 'dare')
          }
          className={`px-4 py-2 rounded-full ${
            selectedType === 'dare'
              ? 'bg-red-600 text-white'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
          }`}
        >
          Thử Thách
        </button>
      </div>

      <div className='mt-8'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
          <div className='px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>
              {filteredQuestions.length} câu hỏi
            </h3>
          </div>
          <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
            {filteredQuestions.map((question: Question) => (
              <li key={question.id} className='px-4 py-4 sm:px-6'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        question.type === 'truth'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {question.type === 'truth' ? 'Sự Thật' : 'Thử Thách'}
                    </span>
                    <span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'>
                      {question.category}
                    </span>
                  </div>
                  <div className='ml-3 flex-1'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                      {question.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
