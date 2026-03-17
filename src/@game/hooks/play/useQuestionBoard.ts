
import { useGameStore } from '../../store/useGameStore';

export const useQuestionBoard = (timer: number, maxDuration: number) => {
  const gameQuestions = useGameStore(s => s.gameQuestions);
  const currentLevel = useGameStore(s => s.currentLevel);
  
  const question = gameQuestions[currentLevel];
  
  // Tính toán trạng thái Visual
  const progress = (timer / maxDuration) * 100;
  const isDanger = timer <= 10;

  return {
    questionText: question?.question || '',
    level: currentLevel,
    progress,
    isDanger
  };
};
