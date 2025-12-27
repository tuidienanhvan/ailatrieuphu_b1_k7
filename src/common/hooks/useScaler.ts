import { useEffect, useRef, useCallback } from 'react';

// ============================================================================
// CONSTANTS
// ============================================================================
const GAME_W = 1920;
const GAME_H = 1080;

// Debug mode: localStorage.setItem('debugScale', '1')
const DEBUG = typeof window !== 'undefined' && localStorage.getItem('debugScale') === '1';
const log = (msg: string, data?: any) => DEBUG && console.log(`[Scaler] ${msg}`, data);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * #17: Read visualViewport with offset compensation
 * visualViewport gives accurate dimensions when keyboard is open or pinch-zoomed
 */
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

/**
 * #22: isTextEditing Detection
 * Check if user is actively typing in an input field
 */
const isTextEditing = (): boolean => {
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

// ============================================================================
// HOOK
// ============================================================================

/**
 * useScaler - Optimized scaling hook based on improvement list
 * 
 * Features:
 * - #4: Letterbox/Pillarbox with scale = min(vw/W, vh/H)
 * - #6: Single updateScale() function
 * - #17: visualViewport with offset
 * - #18: Container sync (simplified - only stage transform)
 * - #19: Pixel perfect scale
 * - #20: RAF debounce
 * - #22-23: Keyboard detection with freeze
 * - #14: FOUC Shield
 * - #26: Full cleanup
 */
export const useScaler = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>,
  isFullscreen: boolean
) => {
  // Refs for state that shouldn't trigger re-renders
  const scaleKeepRef = useRef(1);
  const baselineRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef<number | null>(null);

  /**
   * #4: Compute scale with safety checks
   */
  const computeScale = useCallback((vw: number, vh: number): number => {
    let scale = Math.min(vw / GAME_W, vh / GAME_H);

    // Safety check for edge cases (viewport = 0 during transitions)
    if (!Number.isFinite(scale) || scale <= 0) {
      scale = scaleKeepRef.current || 1;
    }

    return Math.max(0.1, scale);
  }, []);

  /**
   * #18-19: Apply transform with pixel-perfect positioning
   */
  const applyTransform = useCallback((vw: number, vh: number, scale: number, offX: number, offY: number) => {
    const stage = stageRef.current;
    if (!stage) return;

    // Calculate content size
    const contentWidth = GAME_W * scale;
    const contentHeight = GAME_H * scale;

    // #19: Round translation for pixel alignment, keep scale exact
    const tx = Math.round(offX + (vw - contentWidth) / 2);
    const ty = Math.round(offY + (vh - contentHeight) / 2);

    // Apply single transform
    stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

    log('Transform applied', { vw, vh, scale, tx, ty });
  }, [stageRef]);

  /**
   * #22: Dual threshold keyboard detection
   * - Absolute threshold: > 150px reduction
   * - Relative threshold: > 15% height reduction
   * - Must be actively editing text
   */
  const shouldFreezeForKeyboard = useCallback((currentH: number): boolean => {
    if (!isTextEditing()) return false;

    const baseH = baselineRef.current.h || currentH;
    const diff = baseH - currentH;

    // Both thresholds must be met
    return diff > 150 && diff > (baseH * 0.15);
  }, []);

  /**
   * #6: Single source of truth - main update function
   */
  const updateScale = useCallback(() => {
    const { w: vw, h: vh, offX, offY } = readViewport();

    // #23: Freeze scale when keyboard is open, but still update position
    if (shouldFreezeForKeyboard(vh)) {
      log('Keyboard freeze active');
      applyTransform(vw, vh, scaleKeepRef.current, offX, offY);
      return;
    }

    // Normal update
    const scale = computeScale(vw, vh);
    scaleKeepRef.current = scale;
    applyTransform(vw, vh, scale, offX, offY);

    // Update baseline when not editing
    if (!isTextEditing()) {
      baselineRef.current = { w: vw, h: vh };
    }
  }, [applyTransform, computeScale, shouldFreezeForKeyboard]);

  /**
   * #20: RAF debounce wrapper
   * Coalesces multiple events into single update per frame
   */
  const onResize = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScale);
  }, [updateScale]);

  /**
   * Setup event listeners and initial scale
   */
  useEffect(() => {
    const vv = window.visualViewport;

    // #20: Event listeners with passive option
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });
    window.addEventListener('focusin', onResize, { passive: true });

    // focusout needs delay to let keyboard animation complete
    const handleFocusOut = () => setTimeout(onResize, 100);
    window.addEventListener('focusout', handleFocusOut, { passive: true });

    // visualViewport events for more accurate tracking
    if (vv) {
      vv.addEventListener('resize', onResize, { passive: true });
      vv.addEventListener('scroll', onResize, { passive: true });
    }

    // Initial scale
    updateScale();

    // #14: FOUC Shield - reveal stage after first scale
    if (stageRef.current) {
      requestAnimationFrame(() => {
        if (stageRef.current) {
          stageRef.current.style.opacity = '1';
        }
      });
    }

    // Set initial baseline
    const { w, h } = readViewport();
    baselineRef.current = { w, h };

    // #26: Full cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('focusin', onResize);
      window.removeEventListener('focusout', handleFocusOut);
      if (vv) {
        vv.removeEventListener('resize', onResize);
        vv.removeEventListener('scroll', onResize);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onResize, updateScale, stageRef]);

  // #25: Reset baseline after fullscreen change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTextEditing()) {
        baselineRef.current = readViewport();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  return { updateScale };
};