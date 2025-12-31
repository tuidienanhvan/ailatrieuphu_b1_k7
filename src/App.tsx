
import React, { useEffect, useCallback, Suspense, lazy, useRef } from 'react';
import { GameState } from './features/game/types/common';
import { useGameStore } from './features/game/store/useGameStore';
import { useFullscreen } from './common/hooks/useFullscreen';
import { useScaler } from './common/hooks/useScaler';
import { GameHeader } from './features/game/components/layout/GameHeader';
import { SidebarPrizes } from './features/game/components/play/SidebarPrizes';
import { PRIZES } from './features/game/data/game-constants';
import { playSound, audioManager } from './features/game/utils/audio-manager';
import { ErrorBoundary } from './common/components/ErrorBoundary';
import { LoadingScreen } from './common/components/LoadingScreen';

// Lazy load components with preload for critical screens
const WelcomeScreen = lazy(() => import('./pages/WelcomeScreen').then(module => ({ default: module.WelcomeScreen })));
const PlayScreenPromise = import('./pages/PlayScreen'); // Preload
const PlayScreen = lazy(() => PlayScreenPromise.then(module => ({ default: module.PlayScreen })));
const ResultScreenPromise = import('./pages/ResultScreen'); // Preload
const ResultScreen = lazy(() => ResultScreenPromise.then(module => ({ default: module.ResultScreen })));
const ShopScreenPromise = import('./pages/ShopScreen'); // Preload
const ShopScreen = lazy(() => ShopScreenPromise.then(module => ({ default: module.ShopScreen })));
const HistoryScreenPromise = import('./pages/HistoryScreen'); // Preload
const HistoryScreen = lazy(() => HistoryScreenPromise.then(module => ({ default: module.HistoryScreen })));

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

  // Handle Toggle Shop Logic
  const handleToggleShop = useCallback(() => {
    if (gameState === GameState.SHOP) {
      setGameState(GameState.WELCOME);
      playSound('select');
    } else {
      if (gameState === GameState.WELCOME || gameState === GameState.GAME_OVER || gameState === GameState.VICTORY || gameState === GameState.HISTORY) {
        setGameState(GameState.SHOP);
        playSound('select');
      }
    }
  }, [gameState, setGameState]);

  // 49. Comprehensive Visibility Handler (Group E)
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

  // 19. Iframe Focus Management - mouseover only (click removed to not interfere with fullscreen)
  useEffect(() => {
    const handleFocus = () => {
      if (document.activeElement !== document.body) {
        window.focus();
      }
    };
    window.addEventListener('mouseover', handleFocus);
    window.focus();
    return () => {
      window.removeEventListener('mouseover', handleFocus);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'MINIGAME_DATA') {
        // Cập nhật đầy đủ thông tin user từ Parent Window (Engine v3.15.0)
        setUserInfo({
          name: e.data.userName || e.data.username, // Hỗ trợ cả 2 naming convention
          email: e.data.userEmail || e.data.email || '', // Engine gửi userEmail
          userId: e.data.userId || null,
          balance: e.data.total_coins || e.data.balance || 0, // Đồng bộ từ user-stats API
          stats: e.data.stats || { playCount: 0, bestScore: 0 },
          serverHistory: e.data.history || []  // History từ server (RESULT + PURCHASE)
        });
        console.log('[App] Received MINIGAME_DATA:', {
          userName: e.data.userName,
          userEmail: e.data.userEmail,
          userId: e.data.userId,
          balance: e.data.total_coins || e.data.balance,
          stats: e.data.stats,
          historyCount: e.data.history?.length || 0
        });
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
            opacity: 0,
            width: '1920px',
            height: '1080px',
            transformOrigin: '0 0'
          }}
        >
          {isLoading && (
            <LoadingScreen
              isOverlay={true}
              message="ĐANG TẢI DỮ LIỆU"
              subMessage="Kết nối máy chủ Pistudy..."
            />
          )}

          {/* GameHeader luôn hiển thị */}
          <GameHeader
            gameState={gameState}
            isFullscreen={isFullscreen}
            stats={userInfo.stats}
            userName={userInfo.name}
            balance={userInfo.balance}
            onFullscreen={toggleFullscreen}
            onOpenShop={handleToggleShop}
          />

          <div className="flex-1 relative flex flex-row overflow-hidden z-10 w-full h-[calc(1080px-96px)]">
            <Suspense fallback={null}>
              <div className="flex-1 relative flex flex-col overflow-hidden h-full">
                {gameState === GameState.WELCOME && (
                  <WelcomeScreen onStart={handleStartGame} />
                )}

                {gameState === GameState.PLAYING && (
                  <PlayScreen />
                )}

                {gameState === GameState.SHOP && (
                  <ShopScreen />
                )}

                {gameState === GameState.HISTORY && (
                  <HistoryScreen />
                )}

                {(gameState === GameState.GAME_OVER || gameState === GameState.VICTORY) && (
                  <ResultScreen
                    isVictory={gameState === GameState.VICTORY}
                    prize={finalPrize}
                    onReset={() => setGameState(GameState.WELCOME)}
                  />
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
