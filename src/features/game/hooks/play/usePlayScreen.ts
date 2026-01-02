
import { useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { useGameAudio } from '../shared/useGameAudio';
import { useGameTimer } from '../shared/useGameTimer';
import { useAnswers } from './useAnswers';
import { useLifelines } from './useLifelines';
import { useGameModals } from './useGameModals';
import { TIMER_DURATION } from '../../data/game-constants';
import { saveMinigameResult } from '../../data/game-api';
import { calculateFallingPrizeIndex, getPrizeAmount } from '../../../../common/utils/math-helpers';
import { GameState } from '../../types/common';
import { useGameEvents } from './useGameEvents';

export const usePlayScreen = () => {
  const currentLevel = useGameStore(s => s.currentLevel);
  const gameState = useGameStore(s => s.gameState);

  // Track game start time for play duration
  const gameStartTime = useRef<number>(Date.now());

  // Flat actions
  const setGameState = useGameStore(s => s.setGameState);
  const setFinalPrize = useGameStore(s => s.setFinalPrize);
  const openModal = useGameStore(s => s.openModal);
  const closeModal = useGameStore(s => s.closeModal);
  const logEvent = useGameStore(s => s.logEvent);
  const addMatchToHistory = useGameStore(s => s.addMatchToHistory);
  const clearEvent = useGameStore(s => s.clearEvent);

  // --- GAME EVENTS ---
  const { activeEvent, triggerEventCheck } = useGameEvents();

  // Trigger Start Level Event
  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      triggerEventCheck(currentLevel + 1, 'on_start');
    }
  }, [currentLevel, gameState, triggerEventCheck]);

  // Timer logic clean
  const { timer, startTimer, stopTimer, isTimerRunning } = useGameTimer(TIMER_DURATION, gameState, useGameStore(s => s.activeModal));

  const handleGameOver = useCallback((reason: 'wrong' | 'timeout' | 'stop' | 'victory') => {
    const currentQIndex = useGameStore.getState().currentLevel;
    let prize = '0đ';
    let levelToSave = currentQIndex + 1;
    let gameResult: 'victory' | 'gameover' | 'stop' = 'gameover';
    let wrongAnswerLevel: number | null = null;

    // Calculate play duration in seconds
    const playDuration = Math.round((Date.now() - gameStartTime.current) / 1000);

    if (reason === 'victory') {
      // VICTORY - passed all 15 questions
      prize = getPrizeAmount(14); // PRIZES[14] = level 15 prize
      levelToSave = 15;
      gameResult = 'victory';
      wrongAnswerLevel = null;

      logEvent('GAME_END', { result: 'VICTORY', finalLevel: 15, prize: prize });
      setGameState(GameState.VICTORY);
      playSound('win');
    } else if (reason === 'stop') {
      prize = getPrizeAmount(currentQIndex - 1);
      levelToSave = currentQIndex;
      gameResult = 'stop';
      wrongAnswerLevel = null;

      logEvent('GAME_END', { result: 'STOPPED', finalLevel: levelToSave, prize: prize });
      setGameState(GameState.GAME_OVER);
    } else {
      // wrong or timeout
      const safeIndex = calculateFallingPrizeIndex(currentQIndex);
      prize = getPrizeAmount(safeIndex);
      levelToSave = safeIndex + 1;
      gameResult = 'gameover';
      wrongAnswerLevel = currentQIndex + 1;

      logEvent('GAME_END', { result: reason === 'timeout' ? 'TIMEOUT' : 'WRONG_ANSWER', finalLevel: levelToSave, prize: prize });

      setTimeout(() => {
        setGameState(GameState.GAME_OVER);
        playSound('lose');
      }, 2000);
    }

    setFinalPrize(prize);

    // Save to Local Store History
    addMatchToHistory({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      level: levelToSave,
      prize: prize,
      result: gameResult,
      score: levelToSave * 10
    });

    // Send to Server/Bridge with new params
    saveMinigameResult(gameResult, wrongAnswerLevel, playDuration);
  }, [setFinalPrize, setGameState, logEvent, addMatchToHistory]);

  const { selectedAnswer, answerState, handleAnswer } = useAnswers(
    stopTimer,
    startTimer,
    handleGameOver,
    () => {
      triggerEventCheck(currentLevel + 1, 'on_correct');
      clearEvent(); // Clear any negative event (like glitch) when passing level
    }
  );
  const { hiddenAnswers, setHiddenAnswers, lifelineHandlers } = useLifelines(selectedAnswer, startTimer, triggerEventCheck);
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

  // Reset start time when game starts
  useEffect(() => {
    if (gameState === GameState.PLAYING && currentLevel === 0) {
      gameStartTime.current = Date.now();
    }
  }, [gameState, currentLevel]);

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
    },
    activeEvent
  };
};
