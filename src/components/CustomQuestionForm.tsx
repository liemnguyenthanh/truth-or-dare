import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { QuestionType } from '../types';

export function CustomQuestionForm() {
  const { categories, addCustomQuestion } = useGame();
  const [showForm, setShowForm] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('truth');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText.trim() && categoryId) {
      addCustomQuestion({
        text: questionText.trim(),
        type: questionType,
        category: categoryId,
      });
      
      // Reset form
      setQuestionText('');
      setShowForm(false);
    }
  };
  
  if (!showForm) {
    return (
      <div className="w-full max-w-md mx-auto mt-8">
        <motion.button
          onClick={() => setShowForm(true)}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white font-medium flex items-center justify-center gap-2 transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Thêm Câu Hỏi Tùy Chỉnh
        </motion.button>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
      <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">
        Thêm Câu Hỏi Tùy Chỉnh
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Loại
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="questionType"
                value="truth"
                checked={questionType === 'truth'}
                onChange={() => setQuestionType('truth')}
                className="mr-2"
              />
              <span className="text-blue-600 dark:text-blue-400">Thật</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="questionType"
                value="dare"
                checked={questionType === 'dare'}
                onChange={() => setQuestionType('dare')}
                className="mr-2"
              />
              <span className="text-red-600 dark:text-red-400">Thách</span>
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Chủ Đề
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Câu Hỏi
          </label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 min-h-[100px]"
            placeholder="Nhập câu hỏi của bạn ở đây..."
            required
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-purple-600 dark:bg-purple-700 text-white"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
} 