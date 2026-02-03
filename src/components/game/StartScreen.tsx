"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { GameConfig } from "@/types/game";

interface StartScreenProps {
  onStartGame: (config: GameConfig) => void;
}

export function StartScreen({ onStartGame }: StartScreenProps) {
  const [cardCount, setCardCount] = useState<3 | 4 | 5>(4);
  const [roundsPerWord, setRoundsPerWord] = useState(3);

  const handleStart = () => {
    onStartGame({
      cardCount,
      roundsPerWord,
      totalUniqueWords: 5,
    });
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Title */}
      <motion.h1
        className="text-5xl md:text-7xl font-simple-print text-blue-600 text-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Sight Words!
      </motion.h1>

      {/* Subtitle */}
      <p className="text-2xl md:text-3xl text-gray-600 text-center mb-12">
        Find the matching word
      </p>

      {/* Settings card */}
      <motion.div
        className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-300 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Card count selector */}
        <div className="mb-8">
          <p className="text-xl text-gray-600 mb-4 text-center">
            How many cards?
          </p>
          <div className="flex justify-center gap-4">
            {([3, 4, 5] as const).map((num) => (
              <button
                key={num}
                onClick={() => setCardCount(num)}
                className={`w-16 h-16 rounded-xl text-2xl font-simple-print transition-all ${
                  cardCount === num
                    ? "bg-purple-500 text-white scale-110 shadow-lg"
                    : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Rounds per word selector */}
        <div className="mb-8">
          <p className="text-xl text-gray-600 mb-4 text-center">
            Rounds per word?
          </p>
          <div className="flex justify-center gap-4">
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setRoundsPerWord(num)}
                className={`w-16 h-16 rounded-xl text-2xl font-simple-print transition-all ${
                  roundsPerWord === num
                    ? "bg-green-500 text-white scale-110 shadow-lg"
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <motion.button
          onClick={handleStart}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl font-simple-print rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Let&apos;s Play!
        </motion.button>
      </motion.div>

      {/* Decorative elements */}
      <div className="flex gap-4 mt-8">
        <motion.span
          className="text-4xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ⭐
        </motion.span>
        <motion.span
          className="text-4xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
        >
          📚
        </motion.span>
        <motion.span
          className="text-4xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
        >
          🎯
        </motion.span>
      </div>
    </motion.div>
  );
}
