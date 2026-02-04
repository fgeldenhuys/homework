"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { GameConfig } from "@/types/game";
import { SIGHT_WORDS, WORD_COLUMNS } from "@/lib/words";

const STORAGE_KEY = "sightwords-enabled-words";

interface StartScreenProps {
  onStartGame: (config: GameConfig) => void;
}

export function StartScreen({ onStartGame }: StartScreenProps) {
  const [cardCount, setCardCount] = useState<3 | 4 | 5>(4);
  const [roundsPerWord, setRoundsPerWord] = useState(3);
  const [wordsPerGame, setWordsPerGame] = useState(5);
  const [enabledWords, setEnabledWords] = useState<Set<string>>(
    new Set(SIGHT_WORDS)
  );

  // Load saved word selection from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const words = JSON.parse(saved) as string[];
        // Only use valid words from the saved list
        const validWords = words.filter((w) => SIGHT_WORDS.includes(w as typeof SIGHT_WORDS[number]));
        if (validWords.length > 0) {
          setEnabledWords(new Set(validWords));
        }
      }
    } catch {
      // Ignore localStorage errors (SSR, privacy mode, etc.)
    }
  }, []);

  // Save word selection to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(enabledWords)));
    } catch {
      // Ignore localStorage errors
    }
  }, [enabledWords]);

  const toggleWord = (word: string) => {
    setEnabledWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(word)) {
        newSet.delete(word);
      } else {
        newSet.add(word);
      }
      return newSet;
    });
  };

  const toggleColumn = (columnWords: string[]) => {
    setEnabledWords((prev) => {
      const newSet = new Set(prev);
      const allEnabled = columnWords.every((w) => newSet.has(w));
      if (allEnabled) {
        // Disable all in column
        columnWords.forEach((w) => newSet.delete(w));
      } else {
        // Enable all in column
        columnWords.forEach((w) => newSet.add(w));
      }
      return newSet;
    });
  };

  const selectAll = () => {
    setEnabledWords(new Set(SIGHT_WORDS));
  };

  const selectNone = () => {
    setEnabledWords(new Set());
  };

  const handleStart = () => {
    const enabledArray = Array.from(enabledWords);
    if (enabledArray.length < cardCount) {
      alert(`Please select at least ${cardCount} words to play!`);
      return;
    }
    onStartGame({
      cardCount,
      roundsPerWord,
      totalUniqueWords: Math.min(wordsPerGame, enabledArray.length),
      enabledWords: enabledArray,
    });
  };

  const enabledCount = enabledWords.size;

  return (
    <motion.div
      className="flex flex-col items-center px-4 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-simple-print text-blue-600 text-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Sight Words!
      </motion.h1>

      {/* Word Grid */}
      <motion.div
        className="bg-white rounded-2xl p-4 shadow-xl border-4 border-green-300 w-full max-w-4xl mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg text-gray-600">
            Select words to practice ({enabledCount} selected)
          </p>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              All
            </button>
            <button
              onClick={selectNone}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              None
            </button>
          </div>
        </div>

        {/* Grid of words by column */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5">
          {WORD_COLUMNS.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-1">
              {/* Column header - click to toggle whole column */}
              <button
                onClick={() => toggleColumn(column.words)}
                className={`text-sm font-bold py-1.5 rounded-lg ${column.colorSelected} text-white hover:opacity-80 transition-opacity shadow-sm`}
              >
                {colIndex + 1}
              </button>
              {/* Words in column */}
              {column.words.map((word) => {
                const isEnabled = enabledWords.has(word);
                return (
                  <button
                    key={word}
                    onClick={() => toggleWord(word)}
                    className={`py-2 px-1 text-base md:text-lg font-simple-print rounded-md transition-all text-white border-4 ${
                      isEnabled
                        ? `${column.colorSelected} ${column.borderColor} shadow-md`
                        : `${column.color} border-transparent opacity-60`
                    } hover:opacity-90`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-xl border-4 border-purple-300 w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card count selector */}
          <div>
            <p className="text-lg text-gray-600 mb-3 text-center">
              Cards shown?
            </p>
            <div className="flex justify-center gap-2">
              {([3, 4, 5] as const).map((num) => (
                <button
                  key={num}
                  onClick={() => setCardCount(num)}
                  className={`w-12 h-12 rounded-xl text-xl font-simple-print transition-all ${
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

          {/* Words per game selector */}
          <div>
            <p className="text-lg text-gray-600 mb-3 text-center">
              Words per game?
            </p>
            <div className="flex justify-center gap-2">
              {[3, 5, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setWordsPerGame(num)}
                  className={`w-12 h-12 rounded-xl text-xl font-simple-print transition-all ${
                    wordsPerGame === num
                      ? "bg-blue-500 text-white scale-110 shadow-lg"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Rounds per word selector */}
          <div>
            <p className="text-lg text-gray-600 mb-3 text-center">
              Rounds per word?
            </p>
            <div className="flex justify-center gap-2">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setRoundsPerWord(num)}
                  className={`w-12 h-12 rounded-xl text-xl font-simple-print transition-all ${
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
        </div>

        {/* Start button */}
        <motion.button
          onClick={handleStart}
          disabled={enabledCount < cardCount}
          className={`w-full mt-6 py-4 text-white text-3xl font-simple-print rounded-xl shadow-lg transition-all ${
            enabledCount >= cardCount
              ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          whileHover={enabledCount >= cardCount ? { scale: 1.02 } : {}}
          whileTap={enabledCount >= cardCount ? { scale: 0.98 } : {}}
        >
          {enabledCount >= cardCount
            ? "Let's Play!"
            : `Select ${cardCount - enabledCount} more words`}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
