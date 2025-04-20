import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export function CategorySelector() {
  const { categories, startGame } = useGame();
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
        Chọn Chủ Đề
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => startGame(category.id)}
            className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
            style={{ 
              '--accent-color': category.color
            } as React.CSSProperties}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="w-12 h-12 rounded-full mb-3 mx-auto flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <span className="text-white text-lg font-bold">
                {category.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: category.color }}>
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {category.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
} 