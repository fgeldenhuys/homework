"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordCardProps {
  word: string;
  isTarget: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  rotation: number;
  onSelect: (word: string) => void;
  wasCorrect: boolean | null;
}

const cardVariants: Variants = {
  initial: { scale: 0, opacity: 0, rotate: 0 },
  enter: (rotation: number) => ({
    scale: 1,
    opacity: 1,
    rotate: rotation,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  }),
  hover: {
    scale: 1.08,
    y: -8,
    transition: { type: "spring" as const, stiffness: 400 },
  },
  correct: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.4 },
  },
  incorrect: {
    x: [0, -15, 15, -15, 15, 0],
    transition: { duration: 0.4 },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export function WordCard({
  word,
  isSelected,
  isDisabled,
  rotation,
  onSelect,
  wasCorrect,
}: WordCardProps) {
  const getAnimationState = () => {
    if (isSelected && wasCorrect === true) return "correct";
    if (isSelected && wasCorrect === false) return "incorrect";
    return "enter";
  };

  return (
    <motion.button
      className={cn(
        "relative px-8 py-6 bg-amber-50 rounded-xl",
        "shadow-lg border-4 border-amber-200",
        "text-6xl md:text-7xl text-gray-800 font-bold",
        "cursor-pointer select-none",
        "focus:outline-none focus:ring-4 focus:ring-blue-400",
        "transition-colors duration-200",
        isDisabled && "pointer-events-none",
        isSelected && wasCorrect === true && "bg-green-100 border-green-400",
        isSelected && wasCorrect === false && "bg-red-100 border-red-400"
      )}
      custom={rotation}
      variants={cardVariants}
      initial="initial"
      animate={getAnimationState()}
      whileHover={!isDisabled ? "hover" : undefined}
      onClick={() => !isDisabled && onSelect(word)}
      disabled={isDisabled}
    >
      {/* Pushpin decoration */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="w-8 h-8 bg-red-500 rounded-full shadow-md border-2 border-red-600 flex items-center justify-center">
          <div className="w-3 h-3 bg-red-300 rounded-full" />
        </div>
        {/* Pin shadow on card */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full opacity-30" />
      </div>

      {/* Word text */}
      <span className="relative z-10 font-simple-print">{word}</span>

      {/* Correct indicator glow */}
      {isSelected && wasCorrect === true && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-green-400/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Paper texture lines (subtle) */}
      <div className="absolute inset-4 pointer-events-none opacity-10">
        <div className="border-b border-blue-300 h-1/4" />
        <div className="border-b border-blue-300 h-1/4" />
        <div className="border-b border-blue-300 h-1/4" />
      </div>
    </motion.button>
  );
}
