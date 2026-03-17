/**
 * @platform/engine/timer.ts
 * Pure timer engine with high-precision countdown logic
 * No React dependency - use with useTimer hook in React apps
 */

/**
 * Callback invoked on each tick
 */
export type TimerTickCallback = (secondsRemaining: number) => void;

/**
 * Callback invoked when time runs out
 */
export type TimerTimeUpCallback = () => void;

/**
 * Timer engine interface
 */
export interface TimerEngine {
  getRemaining(): number;
  pause(): void;
  resume(): void;
  stop(): void;
  onTick(callback: TimerTickCallback): void;
  onTimeUp(callback: TimerTimeUpCallback): void;
}

/**
 * Create a timer engine for countdown with high precision
 *
 * @param durationSec - Duration in seconds
 * @returns TimerEngine with control methods
 */
export function createTimerEngine(durationSec: number): TimerEngine {
  let endTime = 0;
  let remainingWhenPaused = 0;
  let isRunning = false;
  let isPaused = false;
  let rafId: number | null = null;
  let tickCallback: TimerTickCallback | null = null;
  let timeUpCallback: TimerTimeUpCallback | null = null;

  function getRemaining(): number {
    if (!isRunning) return isPaused ? remainingWhenPaused : durationSec;

    const msRemaining = endTime - Date.now();
    return Math.max(0, Math.ceil(msRemaining / 1000));
  }

  function loop(): void {
    if (!isRunning || isPaused) return;

    const remaining = getRemaining();

    if (tickCallback) {
      tickCallback(remaining);
    }

    if (remaining > 0) {
      rafId = requestAnimationFrame(loop);
    } else {
      isRunning = false;
      if (timeUpCallback) {
        timeUpCallback();
      }
    }
  }

  function start(): void {
    if (isRunning) return;

    isRunning = true;
    isPaused = false;
    endTime = Date.now() + durationSec * 1000;
    rafId = requestAnimationFrame(loop);
  }

  function pause(): void {
    if (!isRunning || isPaused) return;

    isPaused = true;
    remainingWhenPaused = Math.max(0, endTime - Date.now());

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function resume(): void {
    if (!isRunning || !isPaused) return;

    isPaused = false;
    endTime = Date.now() + remainingWhenPaused;
    rafId = requestAnimationFrame(loop);
  }

  function stop(): void {
    isRunning = false;
    isPaused = false;

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  return {
    getRemaining,
    pause,
    resume,
    stop,
    onTick: (callback) => { tickCallback = callback; },
    onTimeUp: (callback) => { timeUpCallback = callback; },
  };
}
