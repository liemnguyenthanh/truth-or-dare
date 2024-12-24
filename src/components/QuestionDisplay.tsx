import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Participant } from '../types';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface QuestionDisplayProps {
  participant: Participant;
  question: string;
  questionType: 'truth' | 'dare';
  completed: boolean;
  onComplete: () => void;
}

export default function QuestionDisplay({
  participant,
  question,
  questionType,
  completed,
  onComplete
}: QuestionDisplayProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (questionType === 'dare' && !completed) {
      setTimeLeft(30);
    } else {
      setTimeLeft(null);
    }
  }, [questionType, completed]);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev! - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const bgColor = questionType === 'truth' ? 'from-blue-500/20 to-blue-600/20' : 'from-red-500/20 to-red-600/20';
  const borderColor = questionType === 'truth' ? 'border-blue-500/30' : 'border-red-500/30';
  const textColor = questionType === 'truth' ? 'text-blue-400' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-md mx-auto bg-gradient-to-br ${bgColor} p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-xl border ${borderColor} backdrop-blur-sm`}
    >
      <div className="text-center">
        <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${textColor}`}>
          {participant.name}'s {questionType.toUpperCase()}
        </h3>
        <p className="text-base sm:text-xl mb-4 text-white font-medium">{question}</p>
        {timeLeft !== null && !completed && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-xl sm:text-2xl font-bold text-purple-400">
            <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            {timeLeft}s
          </div>
        )}
        {!completed && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center gap-1 sm:gap-2 mx-auto text-sm sm:text-base"
          >
            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Complete Challenge
          </motion.button>
        )}
        {completed && (
          <div className="mt-4 text-green-400 font-semibold flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base">
            <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            Challenge Completed!
          </div>
        )}
      </div>
    </motion.div>
  );
}