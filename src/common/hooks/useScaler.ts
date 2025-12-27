import { useEffect, useRef, useCallback } from 'react';

// CONSTANTS
const GAME_W = 1920;
const GAME_H = 1080;

// Rotation handling delays (ms) - progressive updates to catch correct viewport
const ROTATION_DELAYS = [100, 250, 500, 800, 1200];

// 24. Debug Mode via localStorage
const DEBUG = typeof window !== 'undefined' && localStorage.getItem('debugScale') === '1';

function debugLog(msg: string, data?: any) {
  if (DEBUG) console.log(`[Scaler] ${msg}`, data);
}

// 30. isTextEditing Detection based on activeElement
const isTextEditing = () => {
  const el = document.activeElement;
  if (!el) return false;

  if (el instanceof HTMLInputElement) {
    const textTypes = ['text', 'password', 'email', 'search', 'tel', 'url', 'number'];
    return textTypes.includes(el.type);
  }
  if (el instanceof HTMLTextAreaElement) return true;
  if (el instanceof HTMLElement && el.isContentEditable) return true;

  return false;
};

// 74. Read Viewport with Offset (Group I)
const readViewport = () => {
  const vv = window.visualViewport;
  if (vv) {
    return {
      w: vv.width,
      h: vv.height,
      offX: vv.offsetLeft,
      offY: vv.offsetTop
    };
  }
  return {
    w: document.documentElement.clientWidth || window.innerWidth,
    h: document.documentElement.clientHeight || window.innerHeight,
    offX: 0,
    offY: 0
  };
};

// Inject rotation CSS styles once
const injectRotationStyles = () => {
  // CSS is now in index.html - no need to inject
};

// Get the rotation overlay element (created in index.html)
const getRotationOverlay = (): HTMLDivElement | null => {
  return document.getElementById('orientation-mask') as HTMLDivElement | null;
};

export const useScaler = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>,
  isFullscreen: boolean
) => {
  const scaleKeepRef = useRef(1);
  const baselineRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef<number | null>(null);
  const rotationTimeoutsRef = useRef<number[]>([]);
  const isRotatingRef = useRef(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // No need to inject styles - they're in index.html
  useEffect(() => {
    // injectRotationStyles(); // Not needed anymore
  }, []);

  // 4. Compute Scale: min(vw/W, vh/H)
  const computeScale = useCallback((vw: number, vh: number) => {
    let scale = Math.min(vw / GAME_W, vh / GAME_H);

    // Safety check
    if (!Number.isFinite(scale) || scale <= 0) {
      scale = scaleKeepRef.current || 1;
    }

    // Clamp min
    return Math.max(0.1, scale);
  }, []);

  // 75. Apply Transform with Container Sync (Group I)
  const applyTransform = useCallback((vw: number, vh: number, scale: number, offX: number, offY: number) => {
    if (!stageRef.current) return;

    // 21. Pixel Perfect Scale (No Rounding on scale)
    const contentWidth = GAME_W * scale;
    const contentHeight = GAME_H * scale;

    // Rounding translation for pixel alignment
    const tx = Math.round(offX + (vw - contentWidth) / 2);
    const ty = Math.round(offY + (vh - contentHeight) / 2);

    // 50. Single transform string, origin 0 0
    stageRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

    // 20. Container Sync
    if (containerRef.current) {
      containerRef.current.style.width = `${vw}px`;
      containerRef.current.style.height = `${vh}px`;
      containerRef.current.style.transform = `translate(${offX}px, ${offY}px)`;
    }

    debugLog('Applied', { vw, vh, scale, tx, ty });
  }, [stageRef, containerRef]);

  // 32. Dual Threshold Keyboard Detection (Group C)
  const shouldFreezeForKeyboard = useCallback((currentH: number) => {
    if (!isTextEditing()) return false;

    const baseH = baselineRef.current.h || currentH;
    const diff = baseH - currentH;

    // Thresholds: > 150px AND > 15% height
    return diff > 150 && diff > (baseH * 0.15);
  }, []);

  // 76. Update Scale Main Function
  const updateScale = useCallback(() => {
    const { w: vw, h: vh, offX, offY } = readViewport();

    // 33. Freeze Logic: Keep scale, update position
    if (shouldFreezeForKeyboard(vh)) {
      debugLog('Freeze active');
      applyTransform(vw, vh, scaleKeepRef.current, offX, offY);
      return;
    }

    const scale = computeScale(vw, vh);
    scaleKeepRef.current = scale;
    applyTransform(vw, vh, scale, offX, offY);

    // 31. Baseline Management
    if (!isTextEditing()) {
      baselineRef.current = { w: vw, h: vh };
    }
  }, [applyTransform, computeScale, shouldFreezeForKeyboard]);

  // Start rotation lock - hide everything immediately
  const startRotationLock = useCallback(() => {
    debugLog('Rotation lock START');
    isRotatingRef.current = true;

    // Add class to pause all CSS animations globally
    document.body.classList.add('is-rotating');

    // Show overlay immediately
    const overlay = getRotationOverlay();
    if (overlay) overlay.classList.add('active');

    // Hide stage completely
    if (stageRef.current) {
      stageRef.current.style.visibility = 'hidden';
      stageRef.current.style.opacity = '0';
    }

    // Disconnect ResizeObserver during rotation to prevent thrashing
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }
  }, [stageRef]);

  // End rotation lock - show everything with proper layout
  const endRotationLock = useCallback(() => {
    debugLog('Rotation lock END');
    isRotatingRef.current = false;

    // Re-enable animations
    document.body.classList.remove('is-rotating');

    // Final scale update
    updateScale();

    // Force a full repaint before showing
    if (stageRef.current) {
      void stageRef.current.offsetHeight;
      stageRef.current.style.visibility = 'visible';
      stageRef.current.style.opacity = '1';
    }

    // Hide overlay
    const overlay = getRotationOverlay();
    if (overlay) overlay.classList.remove('active');

    // Reconnect ResizeObserver
    if (resizeObserverRef.current && containerRef.current) {
      resizeObserverRef.current.observe(document.documentElement);
      resizeObserverRef.current.observe(containerRef.current);
    }
  }, [stageRef, containerRef, updateScale]);

  // Handle orientation change with overlay protection
  const handleOrientationChange = useCallback(() => {
    debugLog('Orientation change detected');

    // Clear any pending rotation timeouts
    rotationTimeoutsRef.current.forEach(id => clearTimeout(id));
    rotationTimeoutsRef.current = [];

    // Lock immediately
    startRotationLock();

    // Schedule multiple resize updates at progressive intervals
    const newTimeouts = ROTATION_DELAYS.map((delay, index) => {
      return window.setTimeout(() => {
        // Update scale at each interval (while still hidden)
        updateScale();
        debugLog(`Rotation update ${index + 1}/${ROTATION_DELAYS.length} at ${delay}ms`);

        // On last update, unlock and show
        if (index === ROTATION_DELAYS.length - 1) {
          endRotationLock();
        }
      }, delay);
    });

    rotationTimeoutsRef.current = newTimeouts;
  }, [startRotationLock, endRotationLock, updateScale]);

  // 31. RAF Debounce Wrapper with aspect ratio detection
  const lastAspectRef = useRef<'portrait' | 'landscape' | null>(null);

  const onResize = useCallback(() => {
    // Skip resize during active rotation - let the timeout chain handle it
    if (isRotatingRef.current) {
      debugLog('Skipping resize during rotation');
      return;
    }

    // Detect aspect ratio change (rotation via resize event)
    const { w, h } = readViewport();
    const currentAspect = w > h ? 'landscape' : 'portrait';

    if (lastAspectRef.current !== null && lastAspectRef.current !== currentAspect) {
      debugLog('Aspect ratio change detected via resize');
      lastAspectRef.current = currentAspect;
      handleOrientationChange();
      return;
    }

    lastAspectRef.current = currentAspect;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScale);
  }, [updateScale, handleOrientationChange]);

  useEffect(() => {
    // 77. Event Listener Setup (Group I)
    const vv = window.visualViewport;

    window.addEventListener('resize', onResize, { passive: true });

    // Special handler for orientation change
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    window.addEventListener('focusin', onResize, { passive: true });
    // focusout need delay to allow keyboard animation to start
    const handleFocusOut = () => setTimeout(onResize, 100);
    window.addEventListener('focusout', handleFocusOut, { passive: true });

    if (vv) {
      vv.addEventListener('resize', onResize, { passive: true });
      vv.addEventListener('scroll', onResize, { passive: true });
    }

    // Store ResizeObserver reference so we can disconnect during rotation
    const ro = new ResizeObserver(onResize);
    resizeObserverRef.current = ro;
    ro.observe(document.documentElement);
    if (containerRef.current) ro.observe(containerRef.current);

    // 29. Visibility Change
    const onVisChange = () => { if (!document.hidden) onResize(); };
    document.addEventListener('visibilitychange', onVisChange);

    // Init
    onResize();

    // 28. Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('focusin', onResize);
      window.removeEventListener('focusout', handleFocusOut);
      if (vv) {
        vv.removeEventListener('resize', onResize);
        vv.removeEventListener('scroll', onResize);
      }
      document.removeEventListener('visibilitychange', onVisChange);
      ro.disconnect();
      resizeObserverRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rotationTimeoutsRef.current.forEach(id => clearTimeout(id));

      // Clean up - just remove class and reset overlay, don't remove elements
      document.body.classList.remove('is-rotating');
      const overlay = getRotationOverlay();
      if (overlay) overlay.classList.remove('active');
    };
  }, [onResize, handleOrientationChange, containerRef]);

  // 78. FOUC Shield Trigger
  useEffect(() => {
    if (stageRef.current && !isRotatingRef.current) {
      requestAnimationFrame(() => {
        if (stageRef.current) {
          stageRef.current.style.visibility = 'visible';
          stageRef.current.style.opacity = '1';
        }
      });
    }
  }, [stageRef]);

  return { updateScale };
};