import { PRIZES } from '../../features/game/data/game-constants';

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function calculateFallingPrizeIndex(currentLevel: number): number {
  if (currentLevel < 5) return -1;
  if (currentLevel < 10) return 4;
  return 9;
}

export function getPrizeAmount(levelIndex: number): string {
  if (levelIndex < 0) return '0đ';
  return PRIZES[levelIndex]?.amount || '0đ';
}