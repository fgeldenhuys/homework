"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Title */}
      <motion.h1
        className="text-title text-blue-600 text-center mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Grade 1 Learning
      </motion.h1>

      <motion.p
        className="text-subtitle text-gray-600 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Fun games to help you learn!
      </motion.p>

      {/* Game cards */}
      <motion.div
        className="grid gap-6 max-w-2xl w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Sight Words Game */}
        <Link href="/game">
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-300 cursor-pointer"
            whileHover={{ scale: 1.02, borderColor: "#9333ea" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-6">
              <span className="text-6xl">📚</span>
              <div>
                <h2 className="text-heading text-purple-600 mb-2">
                  Sight Words
                </h2>
                <p className="text-xl text-gray-500">
                  Find and match words on the board
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Placeholder for future games */}
        <motion.div
          className="bg-gray-100 rounded-3xl p-8 shadow-lg border-4 border-gray-200 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
        >
          <div className="flex items-center gap-6">
            <span className="text-6xl">🔢</span>
            <div>
              <h2 className="text-heading text-gray-400 mb-2">
                Numbers
              </h2>
              <p className="text-xl text-gray-400">Coming soon!</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-100 rounded-3xl p-8 shadow-lg border-4 border-gray-200 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
        >
          <div className="flex items-center gap-6">
            <span className="text-6xl">🎨</span>
            <div>
              <h2 className="text-heading text-gray-400 mb-2">
                Colours
              </h2>
              <p className="text-xl text-gray-400">Coming soon!</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer decoration */}
      <motion.div
        className="flex gap-4 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {["⭐", "🌈", "🎯", "✨", "🌟"].map((emoji, index) => (
          <motion.span
            key={index}
            className="text-3xl"
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: index * 0.2,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </main>
  );
}
