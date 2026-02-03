import { CardPosition } from "@/types/game";
import { SIGHT_WORDS, areVisuallySimilar } from "./words";
import { shuffleArray } from "./utils";

/**
 * Select words for a single round
 * - One target word
 * - N-1 distractor words (avoiding visually similar words)
 */
export function selectRoundWords(
  targetWord: string,
  cardCount: number,
  availableWords: readonly string[] = SIGHT_WORDS
): string[] {
  const distractors = availableWords
    .filter((w) => w !== targetWord)
    .filter((w) => !areVisuallySimilar(w, targetWord))
    .sort(() => Math.random() - 0.5)
    .slice(0, cardCount - 1);

  return shuffleArray([targetWord, ...distractors]);
}

/**
 * Generate positions for cards on the board
 * Returns positions with slight randomization for natural look
 */
export function generateCardPositions(cardCount: 3 | 4 | 5): CardPosition[] {
  const basePositions: Record<3 | 4 | 5, { x: number; y: number }[]> = {
    3: [
      { x: 20, y: 50 },
      { x: 50, y: 50 },
      { x: 80, y: 50 },
    ],
    4: [
      { x: 25, y: 35 },
      { x: 75, y: 35 },
      { x: 25, y: 65 },
      { x: 75, y: 65 },
    ],
    5: [
      { x: 20, y: 35 },
      { x: 50, y: 30 },
      { x: 80, y: 35 },
      { x: 35, y: 65 },
      { x: 65, y: 65 },
    ],
  };

  return basePositions[cardCount].map((pos) => ({
    x: pos.x + (Math.random() * 6 - 3), // +/- 3% variation
    y: pos.y + (Math.random() * 6 - 3),
    rotation: Math.random() * 10 - 5, // -5 to +5 degrees
  }));
}

/**
 * Calculate star rating based on score
 */
export function calculateStars(score: number, total: number): number {
  if (total === 0) return 0;
  const percentage = score / total;
  if (percentage >= 0.9) return 5;
  if (percentage >= 0.7) return 4;
  if (percentage >= 0.5) return 3;
  if (percentage >= 0.3) return 2;
  return 1;
}
