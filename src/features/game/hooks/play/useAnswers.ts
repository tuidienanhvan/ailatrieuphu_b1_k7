
import { useState, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { TOTAL_LEVELS, PRIZES } from '../../data/game-constants';

import { GameState } from '../../types/common';

export const useAnswers = (
  stopTimer: () => void,
  startTimer: (duration?: number) => void,
  handleGameOver: (reason: 'wrong' | 'victory') => void,
  onCorrect?: () => void
) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'default' | 'correct' | 'wrong'>('default');

  // Flat actions
  const nextLevel = useGameStore(s => s.nextLevel);
  const logEvent = useGameStore(s => s.logEvent);
  const setGameState = useGameStore(s => s.setGameState);
  const setFinalPrize = useGameStore(s => s.setFinalPrize);

  const currentLevel = useGameStore(s => s.currentLevel);
  const gameQuestions = useGameStore(s => s.gameQuestions);

  // Helper để lấy prize amount
  const getPrizeAmountLocal = (level: number) => {
    return PRIZES[level]?.amount || '0đ';
  };

  const handleAnswer = useCallback((idx: number) => {
    if (selectedAnswer !== null) return;

    stopTimer();
    setSelectedAnswer(idx);
    playSound('select');

    const currentQ = gameQuestions[currentLevel];
    const isCorrect = idx === currentQ.correct;

    // LOG ANSWER
    logEvent('ANSWER', {
      questionId: currentLevel,
      selectedAnswerIndex: idx,
      isCorrect: isCorrect,
      answerContent: currentQ.answers[idx],
      correctAnswerContent: currentQ.answers[currentQ.correct]
    });

    setTimeout(() => {
      if (isCorrect) {
        setAnswerState('correct');
        playSound('correct');
        onCorrect?.();

        // Wait for correct animation
        setTimeout(() => {
          // Check for Victory or Next Level
          if (currentLevel < TOTAL_LEVELS - 1) {
            // NEXT LEVEL
            setAnswerState('default');
            setSelectedAnswer(null);
            nextLevel();
            startTimer();
          } else {
            // VICTORY - completed all questions
            handleGameOver('victory');
          }
        }, 2000);

      } else {
        setAnswerState('wrong');
        playSound('wrong');

        // Wait for wrong animation
        setTimeout(() => {
          handleGameOver('wrong');
        }, 1000);
      }
    }, 1500); // Thinking time
  }, [selectedAnswer, stopTimer, gameQuestions, currentLevel, logEvent, nextLevel, startTimer, handleGameOver, setGameState, setFinalPrize]);

  return {
    selectedAnswer,
    answerState,
    handleAnswer
  };
};
