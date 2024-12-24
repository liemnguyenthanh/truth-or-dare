import { getAvatarUrl } from "@/utils";
import { TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Participant } from "../types";

interface ParticipantsListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
}

export default function ParticipantsList({
  participants,
  onRemove,
}: ParticipantsListProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        Players
      </h2>
      <div className="space-y-2">
        {participants.map((participant, index) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between bg-gray-800/50 p-2 sm:p-3 rounded-lg shadow-lg border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40"
          >
            <div className="flex items-center gap-2">
              <img
                src={getAvatarUrl(participant.name)}
                alt={participant.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-purple-500/20"
              />
              <div>
                <p className="font-semibold text-sm sm:text-base text-white">
                  {participant.name}
                </p>
                <p className="text-xs text-purple-300">
                  Truths: {participant.score.truths} | Dares:{" "}
                  {participant.score.dares}
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
      </div>
    </div>
  );
}
