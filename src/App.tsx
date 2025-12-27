
import React, { useEffect, useCallback, Suspense, lazy, useRef } from 'react';
import { GameState } from './features/game/types/common';
import { useGameStore } from './features/game/store/useGameStore';
import { useFullscreen } from './common/hooks/useFullscreen';
import { useScaler } from './common/hooks/useScaler';
import { GameHeader } from './features/game/components/GameHeader';
import { SidebarPrizes } from './features/game/components/SidebarPrizes';
import { PRIZES } from './features/game/data/game-constants';
import { playSound, audioManager } from './features/game/utils/audio-manager';
import { ErrorBoundary } from './common/components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

const WelcomeScreen = lazy(() => import('./pages/WelcomeScreen').then(module => ({ default: module.WelcomeScreen })));
const PlayScreen = lazy(() => import('./pages/PlayScreen').then(module => ({ default: module.PlayScreen })));
const ResultScreen = lazy(() => import('./pages/ResultScreen').then(module => ({ default: module.ResultScreen })));
const ShopScreen = lazy(() => import('./pages/ShopScreen').then(module => ({ default: module.ShopScreen }))); // Add Import

// Loading Component cho Suspense
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full h-full text-blue-400">
    <Loader2 size={48} className="animate-spin mb-4" />
    <span className="text-xl font-mono tracking-widest animate-pulse">LOADING...</span>
  </div>
);

// Loading Component khi fetch API (Overlay)
const FetchingOverlay = () => (
  <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
    <div className="relative">
      <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
      <Loader2 size={64} className="text-[#fbbf24] animate-spin relative z-10" />
    </div>
    <div className="mt-6 flex flex-col items-center gap-2">
      <span className="text-2xl font-black text-white uppercase tracking-[0.2em]">Đang Tải Dữ Liệu</span>
      <span className="text-sm font-mono text-slate-400">Kết nối máy chủ Pistudy...</span>
    </div>
  </div>
);

export const App: React.FC = () => {
  // Refs for the Scale Engine
  const containerRef = useRef<HTMLDivElement>(null); // Outer viewport layer
  const stageRef = useRef<HTMLDivElement>(null);     // Inner fixed 1920x1080 stage

  // Hooks
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  // 3, 4, 73. Integrate Scaler Engine (New 3.0 Logic)
  const { updateScale } = useScaler(containerRef, stageRef, isFullscreen);

  const userInfo = useGameStore(s => s.userInfo);
  const gameState = useGameStore(s => s.gameState);
  const currentQIndex = useGameStore(s => s.currentLevel);
  const finalPrize = useGameStore(s => s.finalPrize);
  const isLoading = useGameStore(s => s.isLoading);

  // Use new flat actions
  const fetchAndStartGame = useGameStore(s => s.fetchAndStartGame);
  const setGameState = useGameStore(s => s.setGameState);
  const setUserInfo = useGameStore(s => s.setUserInfo);

  const handleStartGame = useCallback(() => {
    playSound('start');
    fetchAndStartGame();
  }, [fetchAndStartGame]);

  // 49. Comprehensive Visibility Handler (Group E)
  // Handles Audio Pause/Resume & Timer/Scale Sync
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioManager.pause();
      } else {
        audioManager.resume();
        updateScale(); // Force rescale in case of orientation change while hidden
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [updateScale]);

  // 53. Lifecycle Cleanup (beforeunload, pagehide)
  useEffect(() => {
    const handlePageHide = (e: PageTransitionEvent) => {
      if (!e.persisted) {
        audioManager.destroy();
      }
    };

    // Fallback for some browsers
    const handleBeforeUnload = () => {
      // save state
    };

    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // 51. iOS Audio Unlock on First Interaction
  useEffect(() => {
    const unlockAudio = () => {
      audioManager.unlock();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // 19. Iframe Focus Management
  useEffect(() => {
    const handleFocus = () => {
      if (document.activeElement !== document.body) {
        window.focus();
      }
    };
    window.addEventListener('click', handleFocus);
    window.addEventListener('mouseover', handleFocus);
    window.focus();
    return () => {
      window.removeEventListener('click', handleFocus);
      window.removeEventListener('mouseover', handleFocus);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'MINIGAME_DATA') {
        setUserInfo({ name: e.data.userName, stats: e.data.stats });
      }
    };
    window.addEventListener('message', handleMessage);

    // Gửi tín hiệu READY ra ngoài để Engine biết và gửi lại User Data
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'MINIGAME_READY' }, '*');
    }
    return () => window.removeEventListener('message', handleMessage);
  }, [setUserInfo]);

  return (
    <ErrorBoundary>
      {/* 2. Viewport Layer (Groups 0) */}
      <div
        ref={containerRef}
        className={`viewport-layer ${isFullscreen ? 'fs-mode-css' : ''}`}
      >
        {/* 1. Stage Layer (Fixed 1920x1080) */}
        <div
          ref={stageRef}
          className="scaling-root"
          style={{
            display: 'none', // JS controls visibility via display
            flexDirection: 'column',
            width: '1920px',
            height: '1080px',
            transformOrigin: '0 0',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            contain: 'layout paint' // Removed 'size' - was blocking SVG rendering
          }}
        >
          {isLoading && <FetchingOverlay />}

          {/* GameHeader luôn hiển thị */}
          <GameHeader
            gameState={gameState}
            isFullscreen={isFullscreen}
            stats={userInfo.stats}
            userName={userInfo.name}
            balance={userInfo.balance}
            onFullscreen={toggleFullscreen}
            onOpenShop={() => setGameState(GameState.SHOP)}
          />

          <div className="flex-1 relative flex flex-row overflow-hidden z-10 w-full h-[calc(1080px-96px)]">
            <div className="flex-1 relative flex flex-col overflow-hidden h-full">
              <Suspense fallback={<LoadingFallback />}>
                {gameState === GameState.WELCOME && (
                  <WelcomeScreen onStart={handleStartGame} />
                )}

                {gameState === GameState.PLAYING && (
                  <PlayScreen />
                )}

                {gameState === GameState.SHOP && (
                  <ShopScreen />
                )}

                {(gameState === GameState.GAME_OVER || gameState === GameState.VICTORY) && (
                  <ResultScreen
                    isVictory={gameState === GameState.VICTORY}
                    prize={finalPrize}
                    onReset={() => setGameState(GameState.WELCOME)}
                  />
                )}
              </Suspense>
            </div>

            {(gameState === GameState.PLAYING || gameState === GameState.VICTORY || gameState === GameState.GAME_OVER) && (
              <SidebarPrizes prizes={PRIZES} currentLevel={currentQIndex} />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
