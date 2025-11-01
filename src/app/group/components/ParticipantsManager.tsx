'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          Thêm người chơi
        </label>
        <div className='flex gap-2'>
          <input
            type='text'
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
            placeholder='Nhập tên người chơi...'
            className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          />
          <button
            onClick={addParticipant}
            disabled={!newParticipant.trim()}
            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors'
          >
            Thêm
          </button>
        </div>
      </div>

      {/* Participants List */}
      <div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Người chơi ({participants.length}/{minParticipants}+)
        </h3>
        {participants.length === 0 ? (
          <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
            <div className='text-4xl mb-2'>👤</div>
            <p>Chưa có người chơi nào</p>
            <p className='text-sm mt-1'>
              Cần ít nhất {minParticipants} người chơi để bắt đầu
            </p>
          </div>
        ) : (
          <div className='space-y-2'>
            <AnimatePresence>
              {participants.map((participant) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className='flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3 group'
                >
                  {editingId === participant.id ? (
                    <input
                      type='text'
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      onBlur={saveEdit}
                      autoFocus
                      className='flex-1 px-3 py-1 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white'
                    />
                  ) : (
                    <span className='text-gray-900 dark:text-white font-medium'>
                      {participant.name}
                    </span>
                  )}
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() =>
                        editingId === participant.id
                          ? saveEdit()
                          : startEditing(participant)
                      }
                      className='text-blue-500 hover:text-blue-700 transition-colors'
                      title='Sửa'
                    >
                      {editingId === participant.id ? '✓' : '✎'}
                    </button>
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className='text-red-500 hover:text-red-700 transition-colors'
                      title='Xóa'
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Validation Message */}
      {participants.length > 0 && participants.length < minParticipants && (
        <div className='mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg'>
          <p className='text-sm text-yellow-800 dark:text-yellow-200'>
            ⚠️ Cần ít nhất {minParticipants} người chơi để bắt đầu
          </p>
        </div>
      )}
    </div>
  );
}

