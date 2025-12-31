import React, { useState, useEffect, useCallback } from 'react';

// 59. Device Detection
const detectDevice = () => {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  return {
    isIOS: /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream,
  };
};

export const useFullscreen = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [embedId, setEmbedId] = useState<string>('');
  const { isIOS } = detectDevice();

  // 60, 64. Fullscreen state synchronization
  useEffect(() => {
    const onFullscreenChange = () => {
      // Native fullscreen change detection
      const fsElement = document.fullscreenElement || (document as any).webkitFullscreenElement;

      // Sync state: If we have a native FS element and it matches our container
      if (fsElement && fsElement === containerRef.current) {
        setIsFullscreen(true);
      } else if (!fsElement && !isIOS) {
        // Only set false if NOT iOS (iOS uses CSS mode)
        setIsFullscreen(false);
      }
    };

    // 63. Prefixed events
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);

    // Iframe Bridge Messaging
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

    // 65. Escape Key Handling for CSS Mode
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
      document.removeEventListener('keydown', onKeydown);
      window.removeEventListener('message', onMessage);
    };
  }, [containerRef, isFullscreen, isIOS]);

  // 62. Toggle Logic with Fallback Chain - SYNCHRONOUS to preserve user gesture
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. iOS: Open new tab for true fullscreen experience
    if (isIOS) {
      window.open(window.location.href, '_blank');
      return;
    }

    // 2. Iframe Parent Request (for embedded games)
    if (embedId && window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'toggleFullscreen', id: embedId }, '*');
      return;
    }

    // 3. Native API for non-iOS standalone - MUST be synchronous!
    const fsElement = document.fullscreenElement || (document as any).webkitFullscreenElement;

    if (!fsElement) {
      // Request fullscreen - call immediately, handle result in .then()
      const fsPromise = container.requestFullscreen
        ? container.requestFullscreen()
        : (container as any).webkitRequestFullscreen?.();

      if (fsPromise) {
        fsPromise.catch((err: Error) => {
          console.warn("Fullscreen API failed, falling back to CSS mode", err);
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