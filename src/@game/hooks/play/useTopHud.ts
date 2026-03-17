
import { GameState } from '@game/types';
import { useGameStore } from '../../store/useGameStore';
import { getPrizeAmount } from '@game/defaults/game.defaults';

export const useTopHud = () => {
  const currentLevel = useGameStore(s => s.currentLevel);
  const lifelines = useGameStore(s => s.lifelines);
  
  // Tính toán dữ liệu hiển thị (Sử dụng selector từ core config)
  const currentPrize = getPrizeAmount(currentLevel);
  const isHighStakes = currentLevel >= 10;
  
  return {
    currentLevel: currentLevel + 1, // Hiển thị 1-based cho UI
    currentPrize,
    lifelines,
    isHighStakes
  };
};
