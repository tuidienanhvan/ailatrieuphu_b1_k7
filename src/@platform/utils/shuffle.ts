/**
 * @platform/utils/shuffle.ts
 * Array shuffling utility using Fisher-Yates algorithm
 */

/**
 * Shuffle an array using Fisher-Yates algorithm
 * Returns a new shuffled array without modifying the original
 *
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
