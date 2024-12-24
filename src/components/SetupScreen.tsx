import { motion } from 'framer-motion';
import AddParticipant from './AddParticipant';
import ParticipantsList from './ParticipantsList';
import { Participant } from '../types';

interface SetupScreenProps {
  participants: Participant[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onStart: () => void;
}

export default function SetupScreen({ 
  participants, 
  onAdd, 
  onRemove, 
  onStart 
}: SetupScreenProps) {
  return (
    <div className="space-y-8">
      <AddParticipant onAdd={onAdd} />
      {participants.length > 0 && (
        <ParticipantsList
          participants={participants}
          onRemove={onRemove}
        />
      )}
      {participants.length >= 2 ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xl font-bold"
        >
          Start Game
        </motion.button>
      ) : (
        <p className="text-center text-purple-400">
          Add at least {2 - participants.length} more player{participants.length === 1 ? '' : 's'} to start
        </p>
      )}
    </div>
  );
}