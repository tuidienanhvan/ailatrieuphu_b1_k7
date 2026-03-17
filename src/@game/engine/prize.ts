/**
 * @game/engine/prize.ts
 * Prize calculation logic - generic across all games
 */

/**
 * Calculate the "safe zone" milestone the player reaches if they fail at currentLevel
 * This is the highest milestone up to and including currentLevel
 *
 * @param currentLevel - Current level (1-indexed)
 * @param milestones - Array of milestone levels, sorted ascending
 * @returns The reached milestone level, or 0 if no milestone reached
 */
export function calculateFallingPrizeIndex(
  currentLevel: number,
  milestones: number[]
): number {
  // Find highest milestone at or below currentLevel
  let reached = 0;

  for (const milestone of milestones) {
    if (currentLevel >= milestone) {
      reached = milestone;
    } else {
      break; // milestones are sorted, so we can stop
    }
  }

  return reached;
}
