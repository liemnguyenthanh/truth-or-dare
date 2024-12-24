import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';

interface QuestionFormProps {
  onSubmit: (question: string, type: 'truth' | 'dare') => void;
}

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [question, setQuestion] = useState('');
  const [type, setType] = useState<'truth' | 'dare'>('truth');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    onSubmit(question.trim(), type);
    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-0">
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'truth' | 'dare')}
          className="px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
        >
          <option value="truth">Truth</option>
          <option value="dare">Dare</option>
        </select>
        
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter new question"
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2 whitespace-nowrap"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </motion.button>
        </div>
      </div>
    </form>
  );
}