import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";

export function QuestionDisplay() {
  const { gameState, nextParticipant } = useGame();

  if (!gameState.currentQuestion) return null;

  const typeColor = gameState.selectedType === "truth" ? "blue" : "red";

  return (
    <motion.div
      className="w-full max-w-md mx-auto text-center p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className={`p-8 rounded-xl shadow-lg mb-6 bg-gradient-to-br from-${typeColor}-50 to-${typeColor}-100 border border-${typeColor}-200`}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <p className={`text-xl font-medium text-${typeColor}-800`}>
          {gameState.currentQuestion.text}
        </p>
      </motion.div>

      <div className="flex gap-4 justify-center">
        <motion.button
          onClick={nextParticipant}
          className="px-4 py-2 rounded-lg text-white shadow-md bg-purple-500 hover:bg-purple-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Người Chơi Tiếp
        </motion.button>
      </div>
    </motion.div>
  );
}
