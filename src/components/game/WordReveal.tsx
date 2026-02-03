"use client";

import { motion } from "framer-motion";

interface WordRevealProps {
  targetWord: string;
  onStart: () => void;
}

export function WordReveal({ targetWord, onStart }: WordRevealProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Word card */}
      <motion.div
        className="bg-white rounded-3xl px-12 py-10 shadow-2xl border-4 border-blue-300 text-center"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <p className="text-2xl md:text-3xl text-gray-500 mb-4">
          Find the word:
        </p>
        <motion.p
          className="text-6xl md:text-8xl text-blue-600 font-simple-print mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {targetWord}
        </motion.p>

        {/* Start button */}
        <motion.button
          onClick={onStart}
          className="px-10 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-3xl font-simple-print rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start!
        </motion.button>
      </motion.div>

      {/* Decorative stars */}
      <motion.div
        className="flex gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {["⭐", "✨", "🌟"].map((emoji, index) => (
          <motion.span
            key={index}
            className="text-4xl"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: index * 0.2,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
