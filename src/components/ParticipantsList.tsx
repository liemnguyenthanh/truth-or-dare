import { motion, AnimatePresence } from 'framer-motion';
import { Participant } from '../types';
import { TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface ParticipantsListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
}

export default function ParticipantsList({ participants, onRemove }: ParticipantsListProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Players</h2>
      <div className="space-y-2">
        <AnimatePresence>
          {participants.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="flex items-center justify-between bg-gray-800/50 p-2 sm:p-3 rounded-lg shadow-lg border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-white">{participant.name}</p>
                  <p className="text-xs text-purple-300">
                    Truths: {participant.score.truths} | Dares: {participant.score.dares}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(participant.id)}
                className="text-red-400 hover:text-red-300 transition-colors p-1 sm:p-1.5 hover:bg-red-500/10 rounded-lg"
              >
                <TrashIcon className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}