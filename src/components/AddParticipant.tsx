import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface AddParticipantProps {
  onAdd: (name: string) => void;
}

export default function AddParticipant({ onAdd }: AddParticipantProps) {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-800/50 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg sm:rounded-xl hover:bg-purple-700 transition-colors font-semibold flex items-center gap-1 sm:gap-2 shadow-lg shadow-purple-500/20 text-sm sm:text-base"
        >
          <UserPlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          Add
        </motion.button>
      </form>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/questions')}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2 text-sm"
      >
        <PlusIcon className="w-4 h-4" />
        Add More Questions
      </motion.button>
    </div>
  );
}