
import { useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { useGameAudio } from '../shared/useGameAudio';
import { useGameTimer } from '../shared/useGameTimer';
import { useAnswers } from './useAnswers';
import { useLifelines } from './useLifelines';
import { useGameModals } from './useGameModals';
import { TOTAL_LEVELS } from '../../data/game-constants';
import { getTierByLevel } from '../../data/level-themes';
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

  // Get current tier theme for timer duration
  const currentTier = getTierByLevel(currentLevel);
  const timerDuration = currentTier.timerDuration;

  // Timer logic - uses tier-based duration
  const { timer, startTimer, stopTimer, isTimerRunning } = useGameTimer(timerDuration, gameState, useGameStore(s => s.activeModal));

  const handleGameOver = useCallback((reason: 'wrong' | 'timeout' | 'stop' | 'victory') => {
    const currentQIndex = useGameStore.getState().currentLevel;
    let prize = '0đ';
    let levelToSave = currentQIndex + 1;
    let gameResult: 'victory' | 'gameover' | 'stop' = 'gameover';
    let wrongAnswerLevel: number | null = null;

    // Calculate play duration in seconds
    const playDuration = Math.round((Date.now() - gameStartTime.current) / 1000);

    if (reason === 'victory') {
      // VICTORY - passed all 45 questions
      prize = getPrizeAmount(TOTAL_LEVELS - 1); // PRIZES[44] = level 45 prize = 1 tỷ
      levelToSave = TOTAL_LEVELS;
      gameResult = 'victory';
      wrongAnswerLevel = null;

      logEvent('GAME_END', { result: 'VICTORY', finalLevel: TOTAL_LEVELS, prize: prize });
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

  useGameAudio(timer, timerDuration, isTimerRunning);

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
      startTimer(timerDuration);
    }
  }, [currentLevel, gameState, setHiddenAnswers, startTimer, timerDuration]);

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
