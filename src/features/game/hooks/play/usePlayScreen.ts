
import { useCallback, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { useGameAudio } from '../useGameAudio';
import { useGameTimer } from './useGameTimer';
import { useAnswers } from './useAnswers';
import { useLifelines } from './useLifelines';
import { useGameModals } from './useGameModals';
import { TIMER_DURATION } from '../../data/game-constants';
import { saveMinigameResult } from '../../data/game-api';
import { calculateFallingPrizeIndex, getPrizeAmount } from '../../../../common/utils/math-helpers';
import { GameState } from '../../types/common';

export const usePlayScreen = () => {
  const currentLevel = useGameStore(s => s.currentLevel);
  const gameState = useGameStore(s => s.gameState);
  
  // Flat actions
  const setGameState = useGameStore(s => s.setGameState);
  const setFinalPrize = useGameStore(s => s.setFinalPrize);
  const openModal = useGameStore(s => s.openModal);
  const closeModal = useGameStore(s => s.closeModal);

  // Timer logic clean
  const { timer, startTimer, stopTimer, isTimerRunning } = useGameTimer(TIMER_DURATION, gameState);

  const handleGameOver = useCallback((reason: 'wrong' | 'timeout' | 'stop') => {
    const currentQIndex = useGameStore.getState().currentLevel;
    let prize = '0đ';
    let levelToSave = currentQIndex + 1;

    if (reason === 'stop') {
        prize = getPrizeAmount(currentQIndex - 1);
        levelToSave = currentQIndex;
        setGameState(GameState.GAME_OVER);
    } else {
        const safeIndex = calculateFallingPrizeIndex(currentQIndex);
        prize = getPrizeAmount(safeIndex);
        levelToSave = safeIndex + 1;
        setTimeout(() => {
            setGameState(GameState.GAME_OVER);
            playSound('lose');
        }, 2000);
    }

    setFinalPrize(prize);
    saveMinigameResult(levelToSave, reason === 'stop' ? 'stop' : 'gameover');
  }, [setFinalPrize, setGameState]);

  const { selectedAnswer, answerState, handleAnswer } = useAnswers(stopTimer, startTimer, handleGameOver);
  const { hiddenAnswers, setHiddenAnswers, lifelineHandlers } = useLifelines(selectedAnswer, startTimer);
  const { visualEffects } = useGameModals();

  const handleStopGame = useCallback(() => {
    openModal('stop', { stopAmount: getPrizeAmount(currentLevel - 1) });
  }, [currentLevel, openModal]);

  const confirmStopGame = useCallback(() => {
    closeModal();
    handleGameOver('stop');
  }, [closeModal, handleGameOver]);

  useGameAudio(timer, TIMER_DURATION, isTimerRunning);

  useEffect(() => {
    if (timer === 0 && gameState === GameState.PLAYING) {
      stopTimer();
      playSound('wrong');
      handleGameOver('timeout');
    }
  }, [timer, gameState, stopTimer, handleGameOver]);

  useEffect(() => {
    setHiddenAnswers(prev => prev.length > 0 ? [] : prev);
    if (gameState === GameState.PLAYING) {
       startTimer(TIMER_DURATION);
    }
  }, [currentLevel, gameState, setHiddenAnswers, startTimer]);

  return {
    timer,
    selectedAnswer,
    answerState,
    hiddenAnswers,
    visualEffects,
    handleAnswer,
    lifelineHandlers,
    systemHandlers: {
      onStopGame: handleStopGame,
      confirmStopGame,
      closeModal
    }
  };
};
