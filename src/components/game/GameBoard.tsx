"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WordCard } from "./WordCard";
import { cn } from "@/lib/utils";
import type { CardPosition } from "@/types/game";

interface GameBoardProps {
  words: string[];
  targetWord: string;
  positions: CardPosition[];
  onWordSelect: (word: string) => void;
  selectedWord: string | null;
  isRoundComplete: boolean;
  wasCorrect: boolean | null;
}

export function GameBoard({
  words,
  targetWord,
  positions,
  onWordSelect,
  selectedWord,
  isRoundComplete,
  wasCorrect,
}: GameBoardProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-4xl aspect-[4/3] mx-auto",
        "bg-amber-700 rounded-2xl p-6 md:p-8",
        "shadow-2xl border-8 border-amber-900"
      )}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 1px, transparent 1px),
          radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 1px),
          radial-gradient(circle at 40% 60%, rgba(0,0,0,0.1) 1px, transparent 1px),
          radial-gradient(circle at 60% 40%, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "15px 15px, 20px 20px, 25px 25px, 18px 18px",
        backgroundColor: "#b8860b",
      }}
    >
      {/* Wooden frame effect */}
      <div className="absolute inset-0 rounded-2xl border-4 border-amber-800/50 pointer-events-none" />

      {/* Cards container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="popLayout">
          {words.map((word, index) => (
            <motion.div
              key={`${word}-${index}-${targetWord}`}
              className="absolute"
              style={{
                left: `${positions[index]?.x ?? 50}%`,
                top: `${positions[index]?.y ?? 50}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <WordCard
                word={word}
                isTarget={word === targetWord}
                isSelected={selectedWord === word}
                isDisabled={isRoundComplete}
                rotation={positions[index]?.rotation ?? 0}
                onSelect={onWordSelect}
                wasCorrect={selectedWord === word ? wasCorrect : null}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 bg-amber-600 rounded-full shadow-inner" />
      <div className="absolute top-2 right-2 w-4 h-4 bg-amber-600 rounded-full shadow-inner" />
      <div className="absolute bottom-2 left-2 w-4 h-4 bg-amber-600 rounded-full shadow-inner" />
      <div className="absolute bottom-2 right-2 w-4 h-4 bg-amber-600 rounded-full shadow-inner" />
    </div>
  );
}
