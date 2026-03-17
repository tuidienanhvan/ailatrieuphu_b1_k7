/**
 * @platform/hooks/useTimer.ts
 * React hook for countdown timer with high precision
 * Wraps createTimerEngine from the engine layer
 */

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerProps {
  initialDuration: number;
  onTimeUp?: () => void;
  onTick?: (secondsRemaining: number) => void;
}

interface UseTimerReturn {
  timer: number;
  setTimer: (value: number) => void;
  start: (durationInSeconds?: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isRunning: boolean;
}

/**
 * React hook for countdown timer using requestAnimationFrame
 * Provides high-precision timing with pause/resume/stop capabilities
 *
 * @param initialDuration - Initial duration in seconds
 * @param onTimeUp - Callback when timer reaches zero
 * @param onTick - Callback on each second update
 * @returns Timer state and control functions
 */
export const useTimer = ({
  initialDuration,
  onTimeUp,
  onTick,
}: UseTimerProps): UseTimerReturn => {
  const [timer, setTimer] = useState(initialDuration);
  const endTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const isPausedRef = useRef(false);
  const remainingTimeRef = useRef<number>(initialDuration * 1000);

  const clearLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const getSecondsRemaining = useCallback(() => {
    const msRemaining = endTimeRef.current - Date.now();
    return Math.max(0, Math.ceil(msRemaining / 1000));
  }, []);

  const start = useCallback(
    (durationInSeconds: number = initialDuration) => {
      isRunningRef.current = true;
      isPausedRef.current = false;
      endTimeRef.current = Date.now() + durationInSeconds * 1000;
      setTimer(durationInSeconds);

      const loop = () => {
        if (!isRunningRef.current || isPausedRef.current) return;

        const seconds = getSecondsRemaining();
        setTimer((prev) => {
          if (prev !== seconds) {
            if (onTick) onTick(seconds);
            return seconds;
          }
          return prev;
        });

        if (seconds > 0) {
          rafRef.current = requestAnimationFrame(loop);
        } else {
          isRunningRef.current = false;
          if (onTimeUp) onTimeUp();
        }
      };

      clearLoop();
      rafRef.current = requestAnimationFrame(loop);
    },
    [initialDuration, getSecondsRemaining, clearLoop, onTick, onTimeUp]
  );

  const stop = useCallback(() => {
    isRunningRef.current = false;
    isPausedRef.current = false;
    clearLoop();
  }, [clearLoop]);

  const pause = useCallback(() => {
    if (isRunningRef.current && !isPausedRef.current) {
      isPausedRef.current = true;
      remainingTimeRef.current = Math.max(0, endTimeRef.current - Date.now());
      clearLoop();
    }
  }, [clearLoop]);

  const resume = useCallback(() => {
    if (isRunningRef.current && isPausedRef.current) {
      isPausedRef.current = false;
      endTimeRef.current = Date.now() + remainingTimeRef.current;

      const loop = () => {
        if (!isRunningRef.current || isPausedRef.current) return;

        const seconds = getSecondsRemaining();
        setTimer((prev) => {
          if (prev !== seconds) {
            if (onTick) onTick(seconds);
            return seconds;
          }
          return prev;
        });

        if (seconds > 0) {
          rafRef.current = requestAnimationFrame(loop);
        } else {
          isRunningRef.current = false;
          if (onTimeUp) onTimeUp();
        }
      };

      clearLoop();
      rafRef.current = requestAnimationFrame(loop);
    }
  }, [clearLoop, getSecondsRemaining, onTick, onTimeUp]);

  // Cleanup on unmount
  useEffect(() => {
    return clearLoop;
  }, [clearLoop]);

  return {
    timer,
    setTimer,
    start,
    stop,
    pause,
    resume,
    isRunning: isRunningRef.current && !isPausedRef.current,
  };
};
