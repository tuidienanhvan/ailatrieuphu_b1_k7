
import { useEffect, useRef, useCallback, useState } from 'react';
import { GameState } from '../../types/common';

// 69, 70, 71, 72. Timer Architecture with EndTime
export const useGameTimer = (
  initialDuration: number,
  gameState: GameState
) => {
  const endTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  
  const [timer, setTimer] = useState(initialDuration);
  const isStoppedRef = useRef(false);
  
  // REMOVED: timerRef and its useEffect syncing (No longer needed since we calculate from endTime)

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
    isStoppedRef.current = false;
    endTimeRef.current = Date.now() + duration * 1000;
    setTimer(duration);
    
    const loop = () => {
       if (isStoppedRef.current) {
           return;
       }

       const seconds = getSecondsRemaining();
       setTimer(prev => {
         if (prev !== seconds) return seconds;
         return prev;
       });

       if (seconds > 0) {
         rafRef.current = requestAnimationFrame(loop);
       } else {
         setTimer(0);
       }
    };
    
    clearTimerLoop();
    rafRef.current = requestAnimationFrame(loop);

  }, [initialDuration, getSecondsRemaining, clearTimerLoop]);

  const stopTimer = useCallback(() => {
    isStoppedRef.current = true;
    clearTimerLoop();
  }, [clearTimerLoop]);

  // Xử lý khi tab trình duyệt bị ẩn/hiện
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
         clearTimerLoop();
      } else {
         // Logic Resume khi tab hiện lại
         if (gameState === GameState.PLAYING && !isStoppedRef.current) {
             const seconds = getSecondsRemaining();
             if (seconds >= 0) {
                setTimer(seconds);
                if (seconds > 0) {
                   const loop = () => {
                       if (isStoppedRef.current) return;
                       const s = getSecondsRemaining();
                       setTimer(prev => prev !== s ? s : prev);
                       if (s > 0) rafRef.current = requestAnimationFrame(loop);
                       else setTimer(0);
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

  // Logic Pause/Resume dựa trên GameState
  useEffect(() => {
    if (gameState !== GameState.PLAYING) {
        stopTimer();
    }
  }, [gameState, stopTimer]);

  // Cleanup khi unmount
  useEffect(() => {
      return clearTimerLoop;
  }, [clearTimerLoop]);

  return {
    timer,
    setTimer,
    startTimer,
    stopTimer,
    isTimerRunning: gameState === GameState.PLAYING && !isStoppedRef.current && timer > 0
  };
};
