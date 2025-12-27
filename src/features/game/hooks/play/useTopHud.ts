
import { useGameStore } from '../../store/useGameStore';
import { PRIZES } from '../../data/game-constants';

export const useTopHud = () => {
  const currentLevel = useGameStore(s => s.currentLevel);
  const lifelines = useGameStore(s => s.lifelines);
  
  // Tính toán dữ liệu hiển thị
  const currentPrize = PRIZES[currentLevel]?.amount || '0đ';
  const isHighStakes = currentLevel >= 10;
  
  return {
    currentLevel,
    currentPrize,
    lifelines,
    isHighStakes
  };
};
