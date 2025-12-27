
import { useState, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { PRIZES } from '../../data/game-constants';
import { saveMinigameResult } from '../../data/game-api';
import { GameState } from '../../types/common';

export const useAnswers = (
  stopTimer: () => void,
  resetTimer: () => void,
  handleGameOver: (reason: 'wrong') => void
) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'default' | 'correct' | 'wrong'>('default');

  // Flat actions
  const nextLevel = useGameStore(s => s.nextLevel);
  const setGameState = useGameStore(s => s.setGameState);
  const setFinalPrize = useGameStore(s => s.setFinalPrize);
  
  const currentLevel = useGameStore(s => s.currentLevel);
  const gameQuestions = useGameStore(s => s.gameQuestions);

  const handleAnswer = useCallback((idx: number) => {
    if (selectedAnswer !== null) return;
    
    stopTimer();
    setSelectedAnswer(idx);
    playSound('select');

    setTimeout(() => {
      const currentQ = gameQuestions[currentLevel];
      const isCorrect = idx === currentQ.correct;

      if (isCorrect) {
        setAnswerState('correct');
        playSound('correct');
        
        const nextIdx = currentLevel + 1;
        
        setTimeout(() => {
          if (nextIdx >= 15) {
            setFinalPrize(PRIZES[14].amount);
            setGameState(GameState.VICTORY);
            playSound('win');
            saveMinigameResult(15, 'victory');
          } else {
            nextLevel();
            setSelectedAnswer(null);
            setAnswerState('default');
            resetTimer();
          }
        }, 2000);
      } else {
        setAnswerState('wrong');
        playSound('wrong');
        handleGameOver('wrong');
      }
    }, 2000);
  }, [selectedAnswer, stopTimer, gameQuestions, currentLevel, nextLevel, setFinalPrize, setGameState, resetTimer, handleGameOver]);

  return { selectedAnswer, answerState, handleAnswer };
};
