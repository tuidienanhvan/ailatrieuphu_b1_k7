import { useEffect, useRef } from 'react';
import { playAmbient, stopAmbient, playSound } from '../../utils/audio-manager';

export const useGameAudio = (
  timer: number, 
  maxDuration: number, 
  isTimerRunning: boolean
) => {
  useEffect(() => {
    playAmbient();
    return () => {
      stopAmbient();
    };
  }, []);

  const prevTimerRef = useRef(timer);

  useEffect(() => {
    if (!isTimerRunning) {
      prevTimerRef.current = timer;
      return;
    }

    if (timer < prevTimerRef.current) {
        if (timer > 0 && timer < maxDuration) {
            if (timer <= 10) {
                playSound('heartbeat');
            } 
            else {
                playSound('tick');
            }
        }
    }
    prevTimerRef.current = timer;
  }, [timer, maxDuration, isTimerRunning]);
};