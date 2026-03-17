/**
 * @platform/hooks/useFullscreen.ts
 * Hook for managing fullscreen state with multiple fallback strategies
 */

import React, { useState, useEffect, useCallback } from 'react';

interface UseFullscreenReturn {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

/**
 * Detect device type for platform-specific fullscreen handling
 */
function detectDevice() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  return {
    isIOS: /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream,
  };
}

/**
 * Hook for managing fullscreen state
 * Supports native fullscreen, CSS fallback, and iframe messaging
 *
 * @param containerRef - Reference to element to make fullscreen
 * @returns Object with isFullscreen state and toggleFullscreen function
 */
export const useFullscreen = (
  containerRef: React.RefObject<HTMLDivElement | null>
): UseFullscreenReturn => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [embedId, setEmbedId] = useState<string>('');
  const { isIOS } = detectDevice();

  // Monitor fullscreen state changes
  useEffect(() => {
    const onFullscreenChange = () => {
      // Check native fullscreen API
      const fsElement =
        document.fullscreenElement || (document as any).webkitFullscreenElement;

      if (fsElement && fsElement === containerRef.current) {
        setIsFullscreen(true);
      } else if (!fsElement && !isIOS) {
        // Only set false if NOT iOS (iOS uses CSS mode)
        setIsFullscreen(false);
      }
    };

    // Prefixed events for browser compatibility
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);

    // Listen for iframe messages
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'fullscreenState') {
        setIsFullscreen(!!e.data.isFullscreen);
        if (e.data.id) setEmbedId(e.data.id);
      }
      if (e.data?.type === 'piaiInit' && e.data.id) {
        setEmbedId(e.data.id);
      }
    };

    window.addEventListener('message', onMessage);

    // Listen for Escape key to exit CSS fullscreen mode
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen && isIOS) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      window.removeEventListener('message', onMessage);
      document.removeEventListener('keydown', onKeydown);
    };
  }, [containerRef, isFullscreen, isIOS]);

  // Toggle fullscreen with fallback chain
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Strategy 1: iOS - open in new tab
    if (isIOS) {
      window.open(window.location.href, '_blank');
      return;
    }

    // Strategy 2: Embedded in iframe - request from parent
    if (embedId && window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'toggleFullscreen', id: embedId }, '*');
      return;
    }

    // Strategy 3: Native fullscreen API
    const fsElement =
      document.fullscreenElement || (document as any).webkitFullscreenElement;

    if (!fsElement) {
      // Enter fullscreen
      const fsPromise = container.requestFullscreen
        ? container.requestFullscreen()
        : (container as any).webkitRequestFullscreen?.();

      if (fsPromise) {
        fsPromise.catch((err: Error) => {
          console.warn('Fullscreen API failed, falling back to CSS mode', err);
          setIsFullscreen(true);
        });
      } else {
        // No API available - use CSS fallback
        setIsFullscreen(true);
      }
    } else {
      // Exit fullscreen
      const exitPromise = document.exitFullscreen
        ? document.exitFullscreen()
        : (document as any).webkitExitFullscreen?.();

      if (exitPromise) {
        exitPromise.catch(() => setIsFullscreen(false));
      } else {
        setIsFullscreen(false);
      }
    }
  }, [embedId, isIOS]);

  return { isFullscreen, toggleFullscreen };
};
