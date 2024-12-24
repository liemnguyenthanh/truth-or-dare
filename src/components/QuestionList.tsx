import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Question } from '@/hooks/useQuestions';

interface QuestionListProps {
  title: string;
  questions: Question[];
  type: 'truth' | 'dare';
  onRemove: (id: string) => void;
  borderColor: string;
  titleColor: string;
}

export default function QuestionList({
  title,
  questions,
  type,
  onRemove,
  borderColor,
  titleColor,
}: QuestionListProps) {
  const filteredQuestions = questions.filter(q => q.type === type);

  return (
    <div>
      <h3 className={`text-lg font-semibold ${titleColor} mb-2`}>{title}</h3>
      <div className="space-y-2">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            className={`flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border ${borderColor}`}
          >
            <p className="text-white">{question.question}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => question.id && onRemove(question.id)}
              className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded-lg"
            >
              <TrashIcon className="w-4 h-4" />
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
}