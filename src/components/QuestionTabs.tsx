import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Question } from '@/hooks/useQuestions';
import { cn } from '@/utils/cn';

interface QuestionTabsProps {
  questions: Question[];
  onRemove: (id: string) => void;
}

export default function QuestionTabs({ questions, onRemove }: QuestionTabsProps) {
  const categories = [
    { key: 'truth', label: 'Truth Questions', color: 'blue' },
    { key: 'dare', label: 'Dare Questions', color: 'red' },
  ] as const;

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-2 rounded-xl bg-gray-800/50 p-1">
        {categories.map(({ key, label, color }) => (
          <Tab
            key={key}
            className={({ selected }) =>
              cn(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-gray-800 focus:outline-none focus:ring-2',
                selected
                  ? `bg-${color}-500 text-white shadow`
                  : `text-${color}-400 hover:bg-${color}-500/[0.12] hover:text-white`
              )
            }
          >
            {label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {categories.map(({ key, color }) => (
          <Tab.Panel
            key={key}
            className="space-y-2 rounded-xl bg-gray-800/50 p-3"
          >
            {questions
              .filter((q) => q.type === key)
              .map((question) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-${color}-500/30`}
                >
                  <p className="text-white">{question.question}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => question.id && onRemove(question.id)}
                    className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded-lg"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              ))}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}