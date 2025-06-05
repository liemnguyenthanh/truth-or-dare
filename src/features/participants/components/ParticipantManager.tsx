'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { useGame } from '../../game/hooks';

export function ParticipantManager() {
  const { gameState, addParticipant, removeParticipant } = useGame();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim()) {
      addParticipant(name);
      setName('');
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-center text-purple-600 dark:text-purple-300'>
        Người Chơi
      </h2>

      <form className='mb-6 flex gap-2' onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nhập tên người chơi'
          className='w-full p-2 rounded-lg bg-purple-100 dark:bg-purple-900 dark:text-white border border-purple-300 dark:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors'
        />
        <button
          type='submit'
          className='bg-purple-600 dark:bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors'
        >
          Thêm
        </button>
      </form>

      {gameState.participants.length > 0 ? (
        <ul className='space-y-2'>
          {gameState.participants.map((participant) => (
            <motion.li
              key={participant.id}
              className='flex items-center justify-between p-3 bg-purple-50 dark:bg-gray-800 rounded-lg shadow-sm transition-colors'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <span className='font-medium text-purple-800 dark:text-purple-300'>
                {participant.name}
              </span>
              <button
                onClick={() => removeParticipant(participant.id)}
                className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                aria-label='Xóa người chơi'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400'>
          Thêm người chơi để bắt đầu trò chơi
        </p>
      )}

      {gameState.participants.length >= 2 && (
        <div className='mt-6 text-center'>
          <p className='text-green-600 dark:text-green-400 font-medium mb-2'>
            {gameState.participants.length} người chơi sẵn sàng!
          </p>
        </div>
      )}
    </div>
  );
}
