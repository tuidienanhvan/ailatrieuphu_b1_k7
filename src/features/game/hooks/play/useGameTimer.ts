
import { useEffect, useRef, useCallback, useState } from 'react';
import { GameState } from '../../types/common';

// 69, 70, 71, 72. Timer Architecture with EndTime - Enhanced with Pause/Resume for Modals
export const useGameTimer = (
  initialDuration: number,
  gameState: GameState,
  activeModal: string
) => {
  const endTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  
  const [timer, setTimer] = useState(initialDuration);
  const isRunningRef = useRef(false);
  const isPausedRef = useRef(false);

  const getSecondsRemaining = useCallback(() => {
    const msRemaining = endTimeRef.current - Date.now();
    return Math.max(0, Math.ceil(msRemaining / 1000));
  }, []);

  const clearTimerLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startTimer = useCallback((duration: number = initialDuration) => {
    isRunningRef.current = true;
    isPausedRef.current = false;
    endTimeRef.current = Date.now() + duration * 1000;
    setTimer(duration);
    
    const loop = () => {
       if (!isRunningRef.current || isPausedRef.current) return;

       const seconds = getSecondsRemaining();
       setTimer(prev => {
         if (prev !== seconds) return seconds;
         return prev;
       });

       if (seconds > 0) {
         rafRef.current = requestAnimationFrame(loop);
       } else {
         setTimer(0);
         isRunningRef.current = false;
       }
    };
    
    clearTimerLoop();
    rafRef.current = requestAnimationFrame(loop);

  }, [initialDuration, getSecondsRemaining, clearTimerLoop]);

  const stopTimer = useCallback(() => {
    isRunningRef.current = false;
    isPausedRef.current = false;
    clearTimerLoop();
  }, [clearTimerLoop]);

  // Handle Pause/Resume based on Modal
  useEffect(() => {
    if (gameState === GameState.PLAYING) {
        if (activeModal !== 'none') {
            // PAUSE
            if (isRunningRef.current && !isPausedRef.current) {
                isPausedRef.current = true;
                remainingTimeRef.current = Math.max(0, endTimeRef.current - Date.now());
                clearTimerLoop();
            }
        } else {
            // RESUME
            if (isRunningRef.current && isPausedRef.current) {
                isPausedRef.current = false;
                endTimeRef.current = Date.now() + remainingTimeRef.current;
                
                const loop = () => {
                   if (!isRunningRef.current || isPausedRef.current) return;
            
                   const seconds = getSecondsRemaining();
                   setTimer(prev => prev !== seconds ? seconds : prev);
            
                   if (seconds > 0) {
                     rafRef.current = requestAnimationFrame(loop);
                   } else {
                     setTimer(0);
                     isRunningRef.current = false;
                   }
                };
                clearTimerLoop();
                rafRef.current = requestAnimationFrame(loop);
            }
        }
    } else {
        stopTimer();
    }
  }, [gameState, activeModal, getSecondsRemaining, clearTimerLoop, stopTimer]);

  // Handle visibility change (tab switch)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
         clearTimerLoop();
      } else {
         if (gameState === GameState.PLAYING && isRunningRef.current && !isPausedRef.current) {
             const seconds = getSecondsRemaining();
             if (seconds >= 0) {
                setTimer(seconds);
                if (seconds > 0) {
                   const loop = () => {
                       if (!isRunningRef.current || isPausedRef.current) return;
                       const s = getSecondsRemaining();
                       setTimer(prev => prev !== s ? s : prev);
                       if (s > 0) rafRef.current = requestAnimationFrame(loop);
                       else {
                           setTimer(0);
                           isRunningRef.current = false;
                       }
                   };
                   clearTimerLoop();
                   rafRef.current = requestAnimationFrame(loop);
                }
             }
         }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [gameState, getSecondsRemaining, clearTimerLoop]);

  useEffect(() => {
      return clearTimerLoop;
  }, [clearTimerLoop]);

  return {
    timer,
    setTimer,
    startTimer,
    stopTimer,
    isTimerRunning: gameState === GameState.PLAYING && isRunningRef.current && !isPausedRef.current && timer > 0
  };
};
