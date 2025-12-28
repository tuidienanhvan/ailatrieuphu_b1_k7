
import { useState, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { PRIZES } from '../../data/game-constants';
import { saveMinigameResult } from '../../data/game-api';
import { GameState } from '../../types/common';

export const useAnswers = (
  stopTimer: () => void,
  startTimer: (duration?: number) => void,
  handleGameOver: (reason: 'wrong') => void
) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'default' | 'correct' | 'wrong'>('default');

  // Flat actions
  const nextLevel = useGameStore(s => s.nextLevel);
  const setGameState = useGameStore(s => s.setGameState);
  const setFinalPrize = useGameStore(s => s.setFinalPrize);
  const logEvent = useGameStore(s => s.logEvent);
  const addMatchToHistory = useGameStore(s => s.addMatchToHistory);
  
  const currentLevel = useGameStore(s => s.currentLevel);
  const gameQuestions = useGameStore(s => s.gameQuestions);

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
        
        // Wait for correct animation
        setTimeout(() => {
            if (currentLevel < 14) {
                // NEXT LEVEL
                setAnswerState('default');
                setSelectedAnswer(null);
                nextLevel();
                startTimer();
            } else {
                // VICTORY (Passed Level 15)
                const prize = PRIZES[14].amount;
                setFinalPrize(prize);
                setGameState(GameState.VICTORY);
                playSound('win');

                // 1. Save to Local Store History
                addMatchToHistory({
                    id: crypto.randomUUID(),
                    timestamp: Date.now(),
                    level: 15,
                    prize: prize,
                    result: 'victory',
                    score: 150
                });

                // 2. Send to Server/Bridge
                saveMinigameResult(15, 'victory');
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
  }, [selectedAnswer, stopTimer, gameQuestions, currentLevel, logEvent, nextLevel, startTimer, setFinalPrize, setGameState, addMatchToHistory, handleGameOver]);

  return {
    selectedAnswer,
    answerState,
    handleAnswer
  };
};
