"use client";

import { motion } from "framer-motion";

interface RoundProgressProps {
  currentRound: number;
  totalRounds: number;
  roundsPerWord: number;
}

export function RoundProgress({
  currentRound,
  totalRounds,
  roundsPerWord,
}: RoundProgressProps) {
  // Calculate which word we're on (0-indexed)
  const currentWordIndex = Math.floor((currentRound - 1) / roundsPerWord);
  // Calculate which round within the current word (0-indexed)
  const currentWordRound = (currentRound - 1) % roundsPerWord;
  // Total number of words
  const totalWords = Math.ceil(totalRounds / roundsPerWord);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Word progress - big circles */}
      <div className="flex gap-2">
        {Array.from({ length: totalWords }).map((_, wordIndex) => {
          const isCompleted = wordIndex < currentWordIndex;
          const isCurrent = wordIndex === currentWordIndex;

          return (
            <div key={wordIndex} className="flex flex-col items-center">
              {/* Word circle */}
              <motion.div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isCompleted
                    ? "bg-green-500 border-green-600"
                    : isCurrent
                    ? "bg-blue-500 border-blue-600"
                    : "bg-gray-200 border-gray-300"
                }`}
                initial={isCompleted ? { scale: 1 } : { scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                {isCompleted && (
                  <span className="text-white text-xs">✓</span>
                )}
              </motion.div>

              {/* Round dots under current word */}
              {isCurrent && (
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: roundsPerWord }).map((_, roundIndex) => {
                    const roundCompleted = roundIndex < currentWordRound;
                    const roundCurrent = roundIndex === currentWordRound;

                    return (
                      <motion.div
                        key={roundIndex}
                        className={`w-2 h-2 rounded-full ${
                          roundCompleted
                            ? "bg-green-400"
                            : roundCurrent
                            ? "bg-blue-400"
                            : "bg-gray-300"
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: roundIndex * 0.1 }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Text indicator */}
      <div className="text-sm text-gray-600 font-simple-print">
        Word {currentWordIndex + 1} of {totalWords}
      </div>
    </div>
  );
}
