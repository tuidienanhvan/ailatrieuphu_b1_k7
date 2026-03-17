import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ConfigProvider } from '@platform/config/context';
import { MergedConfig } from '@platform/config/types';
import { onHubMessage } from '@platform/bridge/receiver';
import { sendReady } from '@platform/bridge/sender';
import { ErrorBoundary } from '@platform/components/ErrorBoundary';
import { LoadingScreen } from '@platform/components/LoadingScreen';
import { useFullscreen } from '@platform/hooks/useFullscreen';
import { useScaler } from '@platform/hooks/useScaler';
import { ThemeProvider } from '@platform/theme/Provider';

import { GameState } from '@game/types';
import { useGameStore } from '@game/store/useGameStore';
import { playSound, audioManager } from '@game/utils/audio-manager';
import { getTierIdByLevel } from '@game/defaults/game.defaults';
import { getTheme } from '@game/theme/registry';
import { setActiveTokens, applyThemeTokens } from '@game/theme/token-runtime';
import {
  applyMergedConfigToRuntime,
  buildDefaultMergedConfig,
  mergeHubPayloadWithDefaults,
} from '@game/runtime/config';

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [mergedConfig, setMergedConfig] = useState<MergedConfig>(() => buildDefaultMergedConfig());

  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const { updateScale } = useScaler(containerRef, stageRef, isFullscreen);

  const userInfo = useGameStore((state) => state.userInfo);
  const gameState = useGameStore((state) => state.gameState);
  const currentQIndex = useGameStore((state) => state.currentLevel);
  const finalPrize = useGameStore((state) => state.finalPrize);
  const isLoading = useGameStore((state) => state.isLoading);

  const fetchAndStartGame = useGameStore((state) => state.fetchAndStartGame);
  const setGameState = useGameStore((state) => state.setGameState);
  const setUserInfo = useGameStore((state) => state.setUserInfo);
  const setQuestionPoolFromEngine = useGameStore((state) => state.setQuestionPoolFromEngine);
  const setClientId = useGameStore((state) => state.setClientId);
  const nextLevel = useGameStore((state) => state.nextLevel);

  const currentTier = useMemo(() => getTierIdByLevel(currentQIndex), [currentQIndex]);
  const theme = useMemo(() => getTheme(currentTier as any), [currentTier]);
  const themeForProvider = useMemo(
    () => ({
      name: theme.metadata.id,
      tokens: {
        ...theme.tokens,
        ...mergedConfig.theme.tokens,
      },
    }),
    [theme, mergedConfig.theme.tokens]
  );

  const handleStartGame = useCallback(() => {
    playSound('start');
    fetchAndStartGame();
  }, [fetchAndStartGame]);

  const handleContinueTier = useCallback(() => {
    setGameState(GameState.WELCOME);
    setTimeout(() => {
      nextLevel();
      playSound('start');
    }, 50);
  }, [nextLevel, setGameState]);

  const handleToggleShop = useCallback(() => {
    if (gameState === GameState.SHOP) {
      setGameState(GameState.WELCOME);
      playSound('select');
      return;
    }

    if ([GameState.WELCOME, GameState.GAME_OVER, GameState.VICTORY, GameState.HISTORY].includes(gameState)) {
      setGameState(GameState.SHOP);
      playSound('select');
    }
  }, [gameState, setGameState]);

  useEffect(() => {
    applyMergedConfigToRuntime(mergedConfig);
    setUserInfo(mergedConfig.user);
    setQuestionPoolFromEngine(mergedConfig.questionPool);
  }, [mergedConfig, setQuestionPoolFromEngine, setUserInfo]);

  useEffect(() => {
    const cleanup = onHubMessage((payload) => {
      const nextConfig = mergeHubPayloadWithDefaults(payload);
      applyMergedConfigToRuntime(nextConfig);

      setMergedConfig(nextConfig);
      setUserInfo(nextConfig.user);
      setQuestionPoolFromEngine(nextConfig.questionPool);

      if (payload.env?.courseId) {
        setClientId(payload.env.courseId);
      }
    });

    sendReady();
    return cleanup;
  }, [setClientId, setQuestionPoolFromEngine, setUserInfo]);

  useEffect(() => {
    setActiveTokens(theme.tokens);
    applyThemeTokens();
  }, [theme, mergedConfig.theme.tokens]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioManager.pause();
      } else {
        audioManager.resume();
        updateScale();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [updateScale]);

  useEffect(() => {
    const handlePageHide = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        audioManager.destroy();
      }
    };

    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

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

  useEffect(() => {
    const handleFocus = () => {
      if (document.activeElement !== document.body) {
        window.focus();
      }
    };

    window.addEventListener('mouseover', handleFocus);
    window.focus();

    return () => window.removeEventListener('mouseover', handleFocus);
  }, []);

  const { WelcomeScreen, PlayScreen, ShopScreen, HistoryScreen, ResultScreen, Background, GameHeader } = theme.components;

  return (
    <ErrorBoundary>
      <ConfigProvider value={mergedConfig}>
        <ThemeProvider theme={themeForProvider}>
          <div ref={containerRef} className={`viewport-layer ${isFullscreen ? 'fs-mode-css' : ''}`}>
            <Background />

            <div
              ref={stageRef}
              className="scaling-root"
              style={{
                opacity: 0,
                width: '1920px',
                height: '1080px',
                transformOrigin: '0 0',
              }}
            >
              {isLoading && (
                <LoadingScreen
                  isOverlay
                  message="DANG TAI DU LIEU"
                  subMessage="Dang dong bo voi Game Hub..."
                />
              )}

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
                    {gameState === GameState.WELCOME && <WelcomeScreen onStart={handleStartGame} />}
                    {gameState === GameState.PLAYING && <PlayScreen />}
                    {gameState === GameState.SHOP && <ShopScreen />}
                    {gameState === GameState.HISTORY && <HistoryScreen />}
                    {(gameState === GameState.GAME_OVER ||
                      gameState === GameState.VICTORY ||
                      gameState === GameState.TIER_COMPLETE) && (
                      <ResultScreen
                        isVictory={gameState === GameState.VICTORY}
                        isTierComplete={gameState === GameState.TIER_COMPLETE}
                        tierNumber={currentTier}
                        prize={finalPrize}
                        onReset={() => setGameState(GameState.WELCOME)}
                        onContinue={handleContinueTier}
                      />
                    )}
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};
