import React from "react";
import { motion } from "framer-motion";
import { TruthOrDare } from "./TruthOrDare";
import { QuestionDisplay } from "./QuestionDisplay";
import { GameControls } from "./GameControls";
import { ParticipantQueue } from "./ParticipantQueue";
import { useGame } from "../context/GameContext";

export function GamePlayPage() {
  const { gameState } = useGame();
  const currentParticipant =
    gameState.participants[gameState.currentParticipantIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-[80vh] justify-between"
    >
      <div>
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-300 mb-2">
            Thật Hay Thách
          </h1>
          <h2 className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">
            Lượt của {currentParticipant?.name}
          </h2>
        </div>

        {/* Show truth or dare selection */}
        {!gameState.selectedType && (
          <div className="mt-8">
            <TruthOrDare />
          </div>
        )}

        {/* Show question display */}
        {gameState.selectedType && (
          <div className="mb-10">
            <QuestionDisplay />
          </div>
        )}

        <GameControls />
      </div>

      {/* Move participant queue to bottom */}
      <div className="mt-auto pt-6">
        <ParticipantQueue queueLength={50} />
      </div>
    </motion.div>
  );
}
