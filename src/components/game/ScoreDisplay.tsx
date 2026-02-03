"use client";

import { motion } from "framer-motion";

interface ScoreDisplayProps {
  score: number;
  totalRounds: number;
}

export function ScoreDisplay({ score, totalRounds }: ScoreDisplayProps) {
  // Show up to 5 stars based on current progress
  const maxStars = 5;
  const starsToShow = Math.min(maxStars, Math.ceil((score / totalRounds) * maxStars));

  return (
    <div className="flex items-center gap-4">
      {/* Star display */}
      <div className="flex gap-1">
        {Array.from({ length: maxStars }).map((_, index) => (
          <motion.span
            key={index}
            className={`text-3xl md:text-4xl ${
              index < starsToShow ? "text-yellow-400" : "text-gray-300"
            }`}
            initial={index < starsToShow ? { scale: 0 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              delay: index < starsToShow ? index * 0.1 : 0,
            }}
          >
            {index < starsToShow ? "★" : "☆"}
          </motion.span>
        ))}
      </div>

      {/* Numerical score */}
      <div className="bg-white rounded-xl px-4 py-2 shadow-md border-2 border-purple-300">
        <span className="text-2xl md:text-3xl font-simple-print text-purple-600">
          {score}/{totalRounds}
        </span>
      </div>
    </div>
  );
}
