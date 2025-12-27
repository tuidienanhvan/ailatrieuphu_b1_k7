import { useEffect, useCallback } from 'react';

const GAME_W = 1920;
const GAME_H = 1080;

/**
 * Minimal scaler - just scale and center, no complex rotation handling
 */
export const useScaler = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>,
  isFullscreen: boolean
) => {

  const updateScale = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Get current viewport size
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Calculate scale to fit game in viewport
    const scale = Math.min(vw / GAME_W, vh / GAME_H);

    // Calculate position to center
    const scaledW = GAME_W * scale;
    const scaledH = GAME_H * scale;
    const x = (vw - scaledW) / 2;
    const y = (vh - scaledH) / 2;

    // Apply transform
    stage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

  }, [stageRef]);

  useEffect(() => {
    // Initial scale
    updateScale();

    // Show stage after initial scale
    if (stageRef.current) {
      stageRef.current.style.opacity = '1';
    }

    // Listen for resize
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [updateScale, stageRef]);

  return { updateScale };
};