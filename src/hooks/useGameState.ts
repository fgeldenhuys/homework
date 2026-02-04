"use client";

import { useReducer, useCallback } from "react";
import { selectRoundWords, generateCardPositions } from "@/lib/gameLogic";
import { SIGHT_WORDS } from "@/lib/words";
import { shuffleArray } from "@/lib/utils";
import type { GameState, GameAction, GameConfig } from "@/types/game";

const initialState: GameState = {
  status: "idle",
  currentTargetWord: "",
  displayedWords: [],
  cardPositions: [],
  score: 0,
  currentRound: 0,
  totalRounds: 0,
  currentWordIndex: 0,
  currentWordRound: 0,
  roundsPerWord: 3,
  selectedWords: [],
  wordHistory: [],
  config: {
    cardCount: 4,
    roundsPerWord: 3,
    totalUniqueWords: 5,
    enabledWords: [...SIGHT_WORDS],
  },
  lastSelectedWord: null,
  lastWasCorrect: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME": {
      const { config } = action;
      // Use only the enabled words, shuffled, and take the number requested
      const selectedWords = shuffleArray([...config.enabledWords]).slice(
        0,
        Math.min(config.totalUniqueWords, config.enabledWords.length)
      );
      const firstWord = selectedWords[0];
      // Use enabled words as the pool for distractors
      const displayedWords = selectRoundWords(
        firstWord,
        config.cardCount,
        config.enabledWords
      );
      const totalRounds = selectedWords.length * config.roundsPerWord;

      return {
        ...state,
        status: "showingWord", // Show the word first
        config,
        selectedWords,
        currentTargetWord: firstWord,
        displayedWords,
        cardPositions: generateCardPositions(config.cardCount),
        score: 0,
        currentRound: 1,
        totalRounds,
        currentWordIndex: 0,
        currentWordRound: 1,
        roundsPerWord: config.roundsPerWord,
        wordHistory: [],
        lastSelectedWord: null,
        lastWasCorrect: null,
      };
    }

    case "START_ROUND": {
      // Transition from showingWord to playing
      return {
        ...state,
        status: "playing",
      };
    }

    case "SELECT_WORD": {
      const isCorrect = action.word === state.currentTargetWord;
      const newHistory = [
        ...state.wordHistory,
        {
          targetWord: state.currentTargetWord,
          selectedWord: action.word,
          isCorrect,
          timestamp: Date.now(),
        },
      ];

      if (isCorrect) {
        return {
          ...state,
          status: "roundComplete",
          score: state.score + 1,
          wordHistory: newHistory,
          lastSelectedWord: action.word,
          lastWasCorrect: true,
        };
      }

      // Incorrect - record attempt, stay in playing
      return {
        ...state,
        wordHistory: newHistory,
        lastSelectedWord: action.word,
        lastWasCorrect: false,
      };
    }

    case "NEXT_ROUND": {
      const {
        config,
        currentWordRound,
        roundsPerWord,
        currentWordIndex,
        selectedWords,
      } = state;

      // Check if we need to move to next word
      if (currentWordRound >= roundsPerWord) {
        const nextWordIndex = currentWordIndex + 1;

        // Check if game is complete
        if (nextWordIndex >= selectedWords.length) {
          return {
            ...state,
            status: "gameComplete",
            lastSelectedWord: null,
            lastWasCorrect: null,
          };
        }

        // Move to next word - show the new word first
        const nextWord = selectedWords[nextWordIndex];
        const displayedWords = selectRoundWords(
          nextWord,
          config.cardCount,
          config.enabledWords
        );

        return {
          ...state,
          status: "showingWord", // Show new word before playing
          currentTargetWord: nextWord,
          displayedWords,
          cardPositions: generateCardPositions(config.cardCount),
          currentRound: state.currentRound + 1,
          currentWordIndex: nextWordIndex,
          currentWordRound: 1,
          lastSelectedWord: null,
          lastWasCorrect: null,
        };
      }

      // Same word, new round with reshuffled cards - go directly to playing
      const displayedWords = selectRoundWords(
        state.currentTargetWord,
        config.cardCount,
        config.enabledWords
      );

      return {
        ...state,
        status: "playing",
        displayedWords,
        cardPositions: generateCardPositions(config.cardCount),
        currentRound: state.currentRound + 1,
        currentWordRound: currentWordRound + 1,
        lastSelectedWord: null,
        lastWasCorrect: null,
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const actions = {
    startGame: useCallback((config: GameConfig) => {
      dispatch({ type: "START_GAME", config });
    }, []),

    startRound: useCallback(() => {
      dispatch({ type: "START_ROUND" });
    }, []),

    selectWord: useCallback((word: string) => {
      dispatch({ type: "SELECT_WORD", word });
    }, []),

    nextRound: useCallback(() => {
      dispatch({ type: "NEXT_ROUND" });
    }, []),

    resetGame: useCallback(() => {
      dispatch({ type: "RESET" });
    }, []),
  };

  return { state, actions };
}
