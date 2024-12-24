import { motion } from 'framer-motion';
import { Participant } from '../types';

interface GameControlsProps {
  onSelectPlayer: () => void;
  onSelectTruth: () => void;
  onSelectDare: () => void;
  currentPlayer: Participant | null;
  disabled: boolean;
}

export default function GameControls({
  onSelectPlayer,
  onSelectTruth,
  onSelectDare,
  currentPlayer,
  disabled
}: GameControlsProps) {
  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSelectPlayer}
        disabled={disabled}
        className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
      >
        Pick a Player
      </motion.button>
      
      {currentPlayer && (
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectTruth}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Truth
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectDare}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Dare
          </motion.button>
        </div>
      )}
    </div>
  );
}