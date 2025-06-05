'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import { useGame } from '../hooks';

export function CategorySelector() {
  const { categories, startGame } = useGame();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6 text-center text-purple-600'>
        Chọn Chủ Đề
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => startGame(category.id)}
            className='p-6 rounded-xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'
            style={
              {
                '--accent-color': category.color,
              } as React.CSSProperties
            }
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className='w-12 h-12 rounded-full mb-3 mx-auto flex items-center justify-center'
              style={{ backgroundColor: category.color }}
            >
              <span className='text-white text-lg font-bold'>
                {category.name.charAt(0)}
              </span>
            </div>
            <h3
              className='text-xl font-semibold mb-2'
              style={{ color: category.color }}
            >
              {category.name}
            </h3>
            <p className='text-gray-600 text-sm'>{category.description}</p>
          </motion.button>
        ))}
      </div>
      {isModalOpen && (
        <OverWriteCategoriesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
//using tailwind css and framer motion
const OverWriteCategoriesModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className='bg-white p-8 rounded-lg shadow-lg'
          >
            <h2 className='text-2xl font-bold mb-4'>Chọn Chủ Đề</h2>

            {/* show text: only choose 18+ category */}
            <p className='text-gray-600 text-sm'>Chỉ chọn chủ đề 18+</p>
            <div className='mt-4'>
              <button
                className='bg-purple-600 text-white px-4 py-2 rounded-md'
                onClick={() => {
                  onClose();
                }}
              >
                Chọn Chủ Đề
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
