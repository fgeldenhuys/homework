"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { calculateStars } from "@/lib/gameLogic";
import { getRandomItem } from "@/lib/utils";
import { GAME_COMPLETE_MESSAGES } from "@/lib/words";
import { useConfetti } from "@/hooks/useConfetti";

interface GameOverScreenProps {
  finalScore: number;
  totalRounds: number;
  wordsLearned: string[];
  onPlayAgain: () => void;
  onReturnHome: () => void;
}

export function GameOverScreen({
  finalScore,
  totalRounds,
  wordsLearned,
  onPlayAgain,
  onReturnHome,
}: GameOverScreenProps) {
  const { fireBigCelebration } = useConfetti();
  const stars = calculateStars(finalScore, totalRounds);
  const message = getRandomItem(GAME_COMPLETE_MESSAGES);

  useEffect(() => {
    const cleanup = fireBigCelebration();
    return cleanup;
  }, [fireBigCelebration]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Celebration message */}
      <motion.h1
        className="text-5xl md:text-7xl font-simple-print font-bold text-purple-600 text-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {message}
      </motion.h1>

      {/* Stars earned */}
      <motion.div
        className="flex gap-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.span
            key={index}
            className={`text-6xl md:text-7xl ${
              index < stars ? "text-yellow-400" : "text-gray-300"
            }`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
          >
            {index < stars ? "★" : "☆"}
          </motion.span>
        ))}
      </motion.div>

      {/* Score card */}
      <motion.div
        className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-300 max-w-md w-full mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Final score */}
        <div className="text-center mb-6">
          <p className="text-3xl font-semibold text-gray-600 mb-2">Your Score</p>
          <p className="text-7xl font-simple-print font-bold text-green-600">
            {finalScore}/{totalRounds}
          </p>
        </div>

        {/* Words practiced */}
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-600 mb-3">Words you practiced:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {wordsLearned.map((word, index) => (
              <motion.span
                key={word}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-2xl font-simple-print font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="flex gap-4 flex-wrap justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={onPlayAgain}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-3xl font-simple-print font-bold rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again!
        </motion.button>
        <motion.button
          onClick={onReturnHome}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-simple-print font-bold rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
