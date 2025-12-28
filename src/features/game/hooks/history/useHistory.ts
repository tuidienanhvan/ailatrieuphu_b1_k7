
import { useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { GameState } from '../../types/common';
import { playSound } from '../../utils/audio-manager';

export const useHistory = () => {
  const history = useGameStore(s => s.userInfo.history);
  const setGameState = useGameStore(s => s.setGameState);
  const userInfo = useGameStore(s => s.userInfo);

  const handleBack = useCallback(() => {
    playSound('select');
    setGameState(GameState.WELCOME);
  }, [setGameState]);

  // Tính toán thống kê nhanh
  const stats = {
      totalPlayed: history.length,
      totalWin: history.filter(h => h.result === 'victory').length,
      totalPrize: history.reduce((acc, curr) => {
           // Parse "100,000đ" -> 100000
           const amount = parseInt(curr.prize.replace(/[^0-9]/g, '')) || 0;
           return acc + amount;
      }, 0)
  };

  return {
    history,
    stats,
    userInfo,
    handleBack
  };
};
