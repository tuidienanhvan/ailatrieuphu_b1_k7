
import { useState, useRef, useCallback, useEffect } from 'react';

export interface UseTimerProps {
    initialDuration: number;
    onTimeUp?: () => void;
    onTick?: (secondsRemaining: number) => void;
}

/**
 * A generic, high-precision countdown timer hook using requestAnimationFrame.
 * This hook handles only the core countdown logic.
 */
export const useTimer = ({ initialDuration, onTimeUp, onTick }: UseTimerProps) => {
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

    const start = useCallback((durationInSeconds: number = initialDuration) => {
        isRunningRef.current = true;
        isPausedRef.current = false;
        endTimeRef.current = Date.now() + durationInSeconds * 1000;
        setTimer(durationInSeconds);

        const loop = () => {
            if (!isRunningRef.current || isPausedRef.current) return;

            const seconds = getSecondsRemaining();
            setTimer(prev => {
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
    }, [initialDuration, getSecondsRemaining, clearLoop, onTick, onTimeUp]);

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
                setTimer(prev => prev !== seconds ? (onTick && onTick(seconds), seconds) : prev);

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

    // Clean up on unmount
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
        isRunning: isRunningRef.current && !isPausedRef.current
    };
};
