// The 100 Sight Words
export const SIGHT_WORDS = [
  // Column 1 (Purple)
  "the",
  "of",
  "and",
  "a",
  "to",
  "in",
  "is",
  "you",
  "that",
  "it",
  // Column 2 (Blue)
  "he",
  "was",
  "for",
  "on",
  "are",
  "as",
  "with",
  "his",
  "they",
  "I",
  // Column 3 (Yellow)
  "at",
  "be",
  "this",
  "have",
  "from",
  "or",
  "one",
  "had",
  "by",
  "words",
  // Column 4 (Teal/Cyan)
  "but",
  "not",
  "what",
  "all",
  "were",
  "we",
  "when",
  "your",
  "can",
  "said",
  // Column 5 (Pink/Magenta)
  "there",
  "use",
  "an",
  "each",
  "which",
  "she",
  "do",
  "how",
  "their",
  "if",
  // Column 6 (Blue - bottom)
  "will",
  "up",
  "other",
  "about",
  "out",
  "many",
  "then",
  "them",
  "these",
  "so",
  // Column 7 (Purple - bottom)
  "some",
  "her",
  "would",
  "make",
  "like",
  "him",
  "into",
  "time",
  "has",
  "look",
  // Column 8 (Orange - bottom)
  "two",
  "more",
  "write",
  "go",
  "see",
  "number",
  "no",
  "way",
  "could",
  "people",
  // Column 9 (Green - bottom)
  "my",
  "than",
  "first",
  "water",
  "been",
  "call",
  "who",
  "am",
  "its",
  "now",
  // Column 10 (Peach/Salmon - bottom)
  "find",
  "long",
  "down",
  "day",
  "did",
  "get",
  "come",
  "made",
  "may",
  "part",
] as const;

export type SightWord = (typeof SIGHT_WORDS)[number];

// Word columns with their colors (matching the 100 Sight Words chart)
export const WORD_COLUMNS = [
  {
    name: "Column 1",
    color: "bg-purple-300",
    colorSelected: "bg-purple-500",
    borderColor: "border-purple-600",
    words: ["the", "of", "and", "a", "to", "in", "is", "you", "that", "it"],
  },
  {
    name: "Column 2",
    color: "bg-blue-300",
    colorSelected: "bg-blue-500",
    borderColor: "border-blue-600",
    words: ["he", "was", "for", "on", "are", "as", "with", "his", "they", "I"],
  },
  {
    name: "Column 3",
    color: "bg-yellow-300",
    colorSelected: "bg-yellow-400",
    borderColor: "border-yellow-600",
    words: ["at", "be", "this", "have", "from", "or", "one", "had", "by", "words"],
  },
  {
    name: "Column 4",
    color: "bg-cyan-300",
    colorSelected: "bg-cyan-500",
    borderColor: "border-cyan-600",
    words: ["but", "not", "what", "all", "were", "we", "when", "your", "can", "said"],
  },
  {
    name: "Column 5",
    color: "bg-pink-300",
    colorSelected: "bg-pink-500",
    borderColor: "border-pink-600",
    words: ["there", "use", "an", "each", "which", "she", "do", "how", "their", "if"],
  },
  {
    name: "Column 6",
    color: "bg-sky-200",
    colorSelected: "bg-sky-400",
    borderColor: "border-sky-500",
    words: ["will", "up", "other", "about", "out", "many", "then", "them", "these", "so"],
  },
  {
    name: "Column 7",
    color: "bg-violet-200",
    colorSelected: "bg-violet-400",
    borderColor: "border-violet-500",
    words: ["some", "her", "would", "make", "like", "him", "into", "time", "has", "look"],
  },
  {
    name: "Column 8",
    color: "bg-orange-200",
    colorSelected: "bg-orange-400",
    borderColor: "border-orange-500",
    words: ["two", "more", "write", "go", "see", "number", "no", "way", "could", "people"],
  },
  {
    name: "Column 9",
    color: "bg-green-200",
    colorSelected: "bg-green-400",
    borderColor: "border-green-500",
    words: ["my", "than", "first", "water", "been", "call", "who", "am", "its", "now"],
  },
  {
    name: "Column 10",
    color: "bg-red-200",
    colorSelected: "bg-red-400",
    borderColor: "border-red-500",
    words: ["find", "long", "down", "day", "did", "get", "come", "made", "may", "part"],
  },
];

// Helper to get the color for a word
export function getWordColor(word: string): { bg: string; bgSelected: string; border: string } {
  for (const column of WORD_COLUMNS) {
    if (column.words.includes(word)) {
      return { bg: column.color, bgSelected: column.colorSelected, border: column.borderColor };
    }
  }
  return { bg: "bg-gray-200", bgSelected: "bg-gray-400", border: "border-gray-500" };
}

// Words grouped by visual complexity for progressive difficulty
export const WORD_GROUPS = {
  easy: ["I", "a", "is", "it", "in", "on", "up", "go", "my", "we", "he", "be", "no", "so", "do", "if", "an", "am", "at", "or"],
  medium: ["the", "to", "and", "can", "see", "you", "she", "was", "for", "are", "his", "had", "has", "her", "him", "but", "not", "all", "out", "now", "day", "get", "may", "way", "two"],
  challenging: [
    "this",
    "that",
    "look",
    "like",
    "come",
    "have",
    "said",
    "from",
    "were",
    "been",
    "when",
    "your",
    "what",
    "with",
    "they",
    "there",
    "their",
    "which",
    "would",
    "could",
    "about",
    "other",
    "people",
    "water",
    "first",
  ],
};

// Common confusing pairs to avoid showing together
export const CONFUSING_PAIRS: [string, string][] = [
  ["the", "he"],
  ["the", "she"],
  ["the", "they"],
  ["he", "she"],
  ["he", "her"],
  ["in", "on"],
  ["in", "into"],
  ["is", "it"],
  ["is", "its"],
  ["is", "his"],
  ["this", "that"],
  ["this", "these"],
  ["can", "an"],
  ["go", "no"],
  ["go", "so"],
  ["no", "now"],
  ["no", "not"],
  ["now", "how"],
  ["was", "has"],
  ["were", "we"],
  ["were", "where"],
  ["your", "you"],
  ["then", "them"],
  ["then", "when"],
  ["there", "their"],
  ["there", "they"],
  ["than", "then"],
  ["than", "that"],
  ["of", "or"],
  ["of", "if"],
  ["or", "for"],
  ["our", "out"],
  ["may", "my"],
  ["may", "way"],
  ["way", "was"],
  ["day", "may"],
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
