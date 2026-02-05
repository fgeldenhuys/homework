"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useGameState } from "@/hooks/useGameState";
import { useConfetti } from "@/hooks/useConfetti";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  GameBoard,
  ScoreDisplay,
  FeedbackOverlay,
  StartScreen,
  GameOverScreen,
  WordReveal,
  RoundProgress,
} from "@/components/game";

export default function GamePage() {
  const { state, actions } = useGameState();
  const { fireConfetti } = useConfetti();
  const { playCorrect, playWrong } = useSoundEffects();
  const [showFeedback, setShowFeedback] = useState(false);

  // Store actions in a ref to avoid dependency issues
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  // Track the last processed selection to avoid double-processing
  const processedRef = useRef<string | null>(null);

  // Handle feedback and auto-advance
  useEffect(() => {
    // Only process when we have a new selection result
    if (state.lastWasCorrect === null) {
      return;
    }

    // Create unique key for this selection
    const key = `${state.lastSelectedWord}-${state.wordHistory.length}`;

    // Skip if already processed
    if (processedRef.current === key) {
      return;
    }
    processedRef.current = key;

    if (state.lastWasCorrect === true) {
      // Correct answer
      setShowFeedback(true);
      fireConfetti();
      try {
        playCorrect();
      } catch {
        // Sound may not be loaded
      }

      const feedbackTimer = setTimeout(() => {
        setShowFeedback(false);
      }, 1000);

      const advanceTimer = setTimeout(() => {
        actionsRef.current.nextRound();
      }, 1500);

      return () => {
        clearTimeout(feedbackTimer);
        clearTimeout(advanceTimer);
      };
    } else {
      // Wrong answer - brief feedback
      setShowFeedback(true);
      try {
        playWrong();
      } catch {
        // Sound may not be loaded
      }

      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [state.lastWasCorrect, state.lastSelectedWord, state.wordHistory.length, fireConfetti, playCorrect, playWrong]);

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Idle: Show start screen */}
          {state.status === "idle" && (
            <StartScreen key="start" onStartGame={actions.startGame} />
          )}

          {/* Showing Word: Show the target word with start button */}
          {state.status === "showingWord" && (
            <div key="showingWord" className="pt-4">
              {/* Header with score and progress */}
              <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <ScoreDisplay
                  score={state.score}
                  totalRounds={state.totalRounds}
                />
                <RoundProgress
                  currentRound={state.currentRound}
                  totalRounds={state.totalRounds}
                  roundsPerWord={state.roundsPerWord}
                />
                <button
                  onClick={actions.resetGame}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
                >
                  Stop
                </button>
              </header>

              <WordReveal
                targetWord={state.currentTargetWord}
                onStart={actions.startRound}
              />
            </div>
          )}

          {/* Playing or Round Complete: Show game */}
          {(state.status === "playing" ||
            state.status === "roundComplete") && (
            <div key="game" className="space-y-6 pt-4">
              {/* Header with score and progress */}
              <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <ScoreDisplay
                  score={state.score}
                  totalRounds={state.totalRounds}
                />
                <RoundProgress
                  currentRound={state.currentRound}
                  totalRounds={state.totalRounds}
                  roundsPerWord={state.roundsPerWord}
                />
                <button
                  onClick={actions.resetGame}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
                >
                  Stop
                </button>
              </header>

              {/* Game board */}
              <GameBoard
                words={state.displayedWords}
                targetWord={state.currentTargetWord}
                positions={state.cardPositions}
                onWordSelect={actions.selectWord}
                selectedWord={state.lastSelectedWord}
                isRoundComplete={state.status === "roundComplete"}
                wasCorrect={state.lastWasCorrect}
              />

              {/* Feedback overlay */}
              <FeedbackOverlay
                isVisible={showFeedback}
                isCorrect={state.lastWasCorrect === true}
              />
            </div>
          )}

          {/* Game Complete: Show results */}
          {state.status === "gameComplete" && (
            <GameOverScreen
              key="gameover"
              finalScore={state.score}
              totalRounds={state.totalRounds}
              wordsLearned={state.selectedWords}
              onPlayAgain={() => actions.startGame(state.config)}
              onReturnHome={actions.resetGame}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
