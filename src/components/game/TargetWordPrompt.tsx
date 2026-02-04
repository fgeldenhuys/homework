"use client";

import { motion } from "framer-motion";

interface TargetWordPromptProps {
  targetWord: string;
}

export function TargetWordPrompt({ targetWord }: TargetWordPromptProps) {
  return (
    <motion.div
      className="text-center mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="inline-block bg-white rounded-2xl px-8 py-4 shadow-lg border-4 border-blue-300">
        <p className="text-3xl md:text-4xl font-semibold text-gray-600 mb-2">
          Find the word:
        </p>
        <motion.p
          key={targetWord}
          className="text-6xl md:text-7xl text-blue-600 font-simple-print font-bold"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {targetWord}
        </motion.p>
      </div>
    </motion.div>
  );
}
