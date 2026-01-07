import { PRIZES } from '../../features/game/data/game-constants';

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * Tính toán milestone an toàn khi trả lời sai
 * Milestones (0-indexed): 4, 9, 14 (tier1), 19, 24, 29 (tier2), 34, 39, 44 (tier3)
 * 
 * @param currentLevel - Level hiện tại (0-indexed)
 * @returns Index của milestone gần nhất bên dưới, -1 nếu chưa qua milestone nào
 */
export function calculateFallingPrizeIndex(currentLevel: number): number {
  // Tier 3 milestones
  if (currentLevel >= 40) return 39;  // 920 triệu
  if (currentLevel >= 35) return 34;  // 750 triệu
  if (currentLevel >= 30) return 29;  // 600 triệu (end tier 2)

  // Tier 2 milestones
  if (currentLevel >= 25) return 24;  // 450 triệu
  if (currentLevel >= 20) return 19;  // 250 triệu
  if (currentLevel >= 15) return 14;  // 150 triệu (end tier 1)

  // Tier 1 milestones
  if (currentLevel >= 10) return 9;   // 22 triệu
  if (currentLevel >= 5) return 4;    // 2 triệu

  return -1; // Chưa qua milestone nào → về 0đ
}

export function getPrizeAmount(levelIndex: number): string {
  if (levelIndex < 0) return '0đ';
  return PRIZES[levelIndex]?.amount || '0đ';
}