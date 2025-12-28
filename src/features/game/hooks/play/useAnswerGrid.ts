
import { useGameStore } from '../../store/useGameStore';

export const useAnswerGrid = () => {
  const gameQuestions = useGameStore(s => s.gameQuestions);
  const currentLevel = useGameStore(s => s.currentLevel);
  
  const question = gameQuestions[currentLevel];

  return {
    answers: question?.answers || [],
    correctIndex: question?.correct ?? -1
  };
};
