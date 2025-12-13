'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useTranslation } from '@/hooks/useTranslation';

const STORAGE_KEY = 'truth-or-dare-participants';

interface Participant {
  id: string;
  name: string;
}

interface ParticipantsManagerProps {
  onParticipantsChange: (participants: Participant[]) => void;
  minParticipants?: number;
}

export function ParticipantsManager({
  onParticipantsChange,
  minParticipants = 2,
}: ParticipantsManagerProps) {
  const { t } = useTranslation({ namespaces: ['pages'] });
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setParticipants(data);
        onParticipantsChange(data);
      } catch (error) {
        console.error('Error loading participants:', error);
      }
    }
  }, []);

  // Save to localStorage whenever participants change
  useEffect(() => {
    if (participants.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
      onParticipantsChange(participants);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      onParticipantsChange([]);
    }
  }, [participants]);

  const addParticipant = () => {
    if (newParticipant.trim()) {
      const newParticipantObj: Participant = {
        id: Date.now().toString(),
        name: newParticipant.trim(),
      };
      setParticipants([...participants, newParticipantObj]);
      setNewParticipant('');
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const startEditing = (participant: Participant) => {
    setEditingId(participant.id);
    setEditName(participant.name);
  };

  const saveEdit = () => {
    if (editName.trim()) {
      setParticipants(
        participants.map((p) =>
          p.id === editingId ? { ...p, name: editName.trim() } : p
        )
      );
      setEditingId(null);
      setEditName('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className='w-full'>
      {/* Add Participant */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-3'>
          {t('group.addParticipants')}
        </label>
        <div className='flex gap-3'>
          <input
            type='text'
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
            placeholder={t('group.participants.placeholder')}
            className='flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 transition-all duration-200 shadow-sm'
          />
          <motion.button
            onClick={addParticipant}
            disabled={!newParticipant.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium'
          >
            {t('group.participants.add')}
          </motion.button>
        </div>
      </div>

      {/* Participants List */}
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          {t('group.participants.title')} ({participants.length}/
          {minParticipants}+)
        </h3>
        {participants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700'
          >
            <div className='text-5xl mb-3'>👤</div>
            <p className='font-medium'>{t('group.participants.empty')}</p>
            <p className='text-sm mt-2'>
              {t('group.participants.minRequired', { min: minParticipants })}
            </p>
          </motion.div>
        ) : (
          <div className='space-y-3'>
            <AnimatePresence>
              {participants.map((participant, index) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className='flex items-center justify-between bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 group'
                >
                  {editingId === participant.id ? (
                    <input
                      type='text'
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      onBlur={saveEdit}
                      autoFocus
                      className='flex-1 px-4 py-2 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-800 dark:text-white'
                    />
                  ) : (
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md'>
                        {participant.name.charAt(0).toUpperCase()}
                      </div>
                      <span className='text-gray-900 dark:text-white font-medium text-lg'>
                        {participant.name}
                      </span>
                    </div>
                  )}
                  <div className='flex items-center gap-2'>
                    <motion.button
                      onClick={() =>
                        editingId === participant.id
                          ? saveEdit()
                          : startEditing(participant)
                      }
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20'
                      title={t('group.participants.edit')}
                    >
                      {editingId === participant.id ? '✓' : '✎'}
                    </motion.button>
                    <motion.button
                      onClick={() => removeParticipant(participant.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20'
                      title={t('group.participants.delete')}
                    >
                      ✕
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Validation Message */}
      {participants.length > 0 && participants.length < minParticipants && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl shadow-sm'
        >
          <p className='text-sm font-medium text-yellow-800 dark:text-yellow-200 flex items-center gap-2'>
            <span className='text-lg'>⚠️</span>
            {t('group.participants.minRequiredWarning', {
              min: minParticipants,
            })}
          </p>
        </motion.div>
      )}
    </div>
  );
}
