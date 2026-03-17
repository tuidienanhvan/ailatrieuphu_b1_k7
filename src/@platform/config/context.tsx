/**
 * @platform/config/context.tsx
 * React context for providing merged configuration to game components
 */

import React, { createContext, useContext } from 'react';
import { MergedConfig } from './types';

/**
 * Context for merged configuration
 * Contains game config, shop config, theme, events, user info, and questions
 */
const ConfigContext = createContext<MergedConfig | null>(null);

export const ConfigProvider = ConfigContext.Provider;

/**
 * Hook to access merged configuration
 * Must be used within ConfigProvider
 *
 * @returns MergedConfig
 * @throws Error if used outside ConfigProvider
 */
export function useConfig(): MergedConfig {
  const config = useContext(ConfigContext);

  if (config === null) {
    throw new Error('[useConfig] Must be used within <ConfigProvider>');
  }

  return config;
}

/**
 * Hook to access game config specifically
 */
export function useGameConfig() {
  const config = useConfig();
  return config.game;
}

/**
 * Hook to access shop config specifically
 */
export function useShopConfig() {
  const config = useConfig();
  return config.shop;
}

/**
 * Hook to access theme config specifically
 */
export function useThemeConfig() {
  const config = useConfig();
  return config.theme;
}

/**
 * Hook to access event config specifically
 */
export function useEventConfig() {
  const config = useConfig();
  return config.events;
}

/**
 * Hook to access user info specifically
 */
export function useUserInfo() {
  const config = useConfig();
  return config.user;
}

/**
 * Hook to access question pool specifically
 */
export function useQuestionPool() {
  const config = useConfig();
  return config.questionPool;
}
