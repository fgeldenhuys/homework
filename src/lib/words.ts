// Sight words aligned with SA CAPS Grade 1 curriculum
export const SIGHT_WORDS = [
  "the",
  "a",
  "is",
  "it",
  "to",
  "and",
  "I",
  "can",
  "see",
  "we",
  "my",
  "you",
  "he",
  "she",
  "in",
  "on",
  "up",
  "look",
  "go",
  "like",
  "this",
  "that",
  "at",
  "am",
  "are",
  "be",
  "big",
  "come",
  "do",
  "for",
] as const;

export type SightWord = (typeof SIGHT_WORDS)[number];

// Words grouped by visual complexity for progressive difficulty
export const WORD_GROUPS = {
  easy: ["I", "a", "is", "it", "in", "on", "up", "go", "my", "me"],
  medium: ["the", "to", "and", "can", "see", "we", "you", "he", "she", "at"],
  challenging: [
    "this",
    "that",
    "look",
    "like",
    "come",
    "here",
    "have",
    "said",
  ],
};

// Common confusing pairs to avoid showing together
export const CONFUSING_PAIRS: [string, string][] = [
  ["the", "he"],
  ["the", "she"],
  ["he", "she"],
  ["in", "on"],
  ["is", "it"],
  ["this", "that"],
  ["can", "an"],
  ["go", "no"],
];

// Check if two words are too similar to show together
export function areVisuallySimilar(word1: string, word2: string): boolean {
  return CONFUSING_PAIRS.some(
    (pair) => pair.includes(word1) && pair.includes(word2)
  );
}

// Encouraging messages for correct answers
export const ENCOURAGEMENT_MESSAGES = [
  "Great job!",
  "Amazing!",
  "You got it!",
  "Fantastic!",
  "Well done!",
  "Super star!",
  "Brilliant!",
  "Awesome!",
  "Perfect!",
  "Way to go!",
];

// Messages for wrong answers (gentle)
export const TRY_AGAIN_MESSAGES = [
  "Try again!",
  "Almost!",
  "Keep trying!",
  "You can do it!",
];

// Messages for game completion
export const GAME_COMPLETE_MESSAGES = [
  "Wonderful work!",
  "You are a reading star!",
  "Fantastic learning!",
  "Great reading!",
];
