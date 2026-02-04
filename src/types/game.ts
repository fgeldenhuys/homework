export interface CardPosition {
  x: number;
  y: number;
  rotation: number;
}

export interface WordAttempt {
  targetWord: string;
  selectedWord: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface GameConfig {
  cardCount: 3 | 4 | 5;
  roundsPerWord: number;
  totalUniqueWords: number;
  enabledWords: string[];
  useAllWordsForDistracters: boolean;
}

export interface GameState {
  status: "idle" | "showingWord" | "playing" | "roundComplete" | "gameComplete";
  currentTargetWord: string;
  displayedWords: string[];
  cardPositions: CardPosition[];
  score: number;
  currentRound: number;
  totalRounds: number;
  currentWordIndex: number;
  currentWordRound: number;
  roundsPerWord: number;
  selectedWords: string[];
  wordHistory: WordAttempt[];
  config: GameConfig;
  lastSelectedWord: string | null;
  lastWasCorrect: boolean | null;
}

export type GameAction =
  | { type: "START_GAME"; config: GameConfig }
  | { type: "START_ROUND" }
  | { type: "SELECT_WORD"; word: string }
  | { type: "NEXT_ROUND" }
  | { type: "RESET" };
