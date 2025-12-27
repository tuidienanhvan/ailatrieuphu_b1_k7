import { useEffect, useRef, useCallback } from 'react';

// CONSTANTS
const GAME_W = 1920;
const GAME_H = 1080;

// Debug mode
const DEBUG = typeof window !== 'undefined' && localStorage.getItem('debugScale') === '1';
const log = (msg: string, data?: any) => DEBUG && console.log(`[Scaler] ${msg}`, data);

// Read viewport dimensions
const getViewport = () => {
  const vv = window.visualViewport;
  return {
    w: vv?.width ?? window.innerWidth,
    h: vv?.height ?? window.innerHeight
  };
};

// Get orientation mask element
const getMask = () => document.getElementById('orientation-mask');

export const useScaler = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>,
  isFullscreen: boolean
) => {
  const isRotatingRef = useRef(false);
  const rotationTimerRef = useRef<number | null>(null);
  const lastOrientationRef = useRef<'portrait' | 'landscape' | null>(null);

  // Calculate scale factor
  const getScale = useCallback(() => {
    const { w, h } = getViewport();
    const scale = Math.min(w / GAME_W, h / GAME_H);
    return Math.max(0.1, Number.isFinite(scale) ? scale : 1);
  }, []);

  // Apply transform to stage only (not container)
  const applyScale = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const { w, h } = getViewport();
    const scale = getScale();

    // Calculate centered position
    const scaledW = GAME_W * scale;
    const scaledH = GAME_H * scale;
    const x = Math.round((w - scaledW) / 2);
    const y = Math.round((h - scaledH) / 2);

    // Single transform on stage only
    stage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

    log('Scale applied', { w, h, scale, x, y });
  }, [stageRef, getScale]);

  // Show stage (after rotation settles)
  const showStage = useCallback(() => {
    const stage = stageRef.current;
    const mask = getMask();

    if (stage) {
      stage.style.display = 'flex';
    }

    if (mask) {
      mask.classList.remove('active');
    }

    // Resume animations after a frame
    requestAnimationFrame(() => {
      document.body.classList.remove('is-rotating');
    });

    log('Stage shown');
  }, [stageRef]);

  // Hide stage (during rotation)
  const hideStage = useCallback(() => {
    const stage = stageRef.current;
    const mask = getMask();

    // Pause animations immediately
    document.body.classList.add('is-rotating');

    if (mask) {
      mask.classList.add('active');
    }

    if (stage) {
      stage.style.display = 'none';
    }

    log('Stage hidden');
  }, [stageRef]);

  // Handle rotation with simple timeout
  const handleRotation = useCallback(() => {
    if (isRotatingRef.current) return;

    log('Rotation started');
    isRotatingRef.current = true;

    // Clear any pending timer
    if (rotationTimerRef.current) {
      clearTimeout(rotationTimerRef.current);
    }

    // Hide immediately
    hideStage();

    // Wait for viewport to settle, then show
    rotationTimerRef.current = window.setTimeout(() => {
      applyScale();
      showStage();
      isRotatingRef.current = false;
      log('Rotation complete');
    }, 400); // Single 400ms wait is usually enough

  }, [hideStage, showStage, applyScale]);

  // Resize handler with rotation detection
  const handleResize = useCallback(() => {
    // Skip if currently rotating
    if (isRotatingRef.current) return;

    const { w, h } = getViewport();
    const currentOrientation = w > h ? 'landscape' : 'portrait';

    // Detect orientation change
    if (lastOrientationRef.current && lastOrientationRef.current !== currentOrientation) {
      lastOrientationRef.current = currentOrientation;
      handleRotation();
      return;
    }

    lastOrientationRef.current = currentOrientation;

    // Normal resize - just update scale
    requestAnimationFrame(applyScale);
  }, [applyScale, handleRotation]);

  // Setup event listeners
  useEffect(() => {
    const vv = window.visualViewport;

    // Listen for resize events
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleRotation, { passive: true });

    if (vv) {
      vv.addEventListener('resize', handleResize, { passive: true });
    }

    // Initial scale and show
    const { w, h } = getViewport();
    lastOrientationRef.current = w > h ? 'landscape' : 'portrait';

    applyScale();

    // Show stage on mount
    requestAnimationFrame(() => {
      const stage = stageRef.current;
      if (stage) {
        stage.style.display = 'flex';
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleRotation);
      if (vv) {
        vv.removeEventListener('resize', handleResize);
      }
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current);
      }
      document.body.classList.remove('is-rotating');
    };
  }, [handleResize, handleRotation, applyScale, stageRef]);

  return { updateScale: applyScale };
};