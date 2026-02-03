"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getRandomItem } from "@/lib/utils";
import { ENCOURAGEMENT_MESSAGES, TRY_AGAIN_MESSAGES } from "@/lib/words";

interface FeedbackOverlayProps {
  isVisible: boolean;
  isCorrect: boolean;
}

export function FeedbackOverlay({ isVisible, isCorrect }: FeedbackOverlayProps) {
  const message = isCorrect
    ? getRandomItem(ENCOURAGEMENT_MESSAGES)
    : getRandomItem(TRY_AGAIN_MESSAGES);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`text-5xl md:text-7xl font-simple-print text-center px-8 py-4 rounded-2xl ${
              isCorrect
                ? "text-green-600 bg-green-100/90"
                : "text-orange-600 bg-orange-100/90"
            } shadow-2xl border-4 ${
              isCorrect ? "border-green-400" : "border-orange-400"
            }`}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
