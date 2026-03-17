import { ThemeTokens } from './types';

/**
 * Global token runtime — manages active tokens + Hub overrides.
 * Shared across all themes. Not specific to any theme folder.
 */

let activeTokens: ThemeTokens = {};
let runtimeTokenOverrides: ThemeTokens = {};

/**
 * Set the base tokens (called when switching theme)
 */
export function setActiveTokens(tokens: ThemeTokens): void {
  activeTokens = { ...tokens };
}

/**
 * Hub can override any token at runtime
 */
export function setThemeTokenOverrides(tokens?: ThemeTokens): void {
  runtimeTokenOverrides = tokens ? { ...tokens } : {};
}

/**
 * Get final resolved tokens = base + overrides
 */
export function getResolvedTokens(): ThemeTokens {
  return {
    ...activeTokens,
    ...runtimeTokenOverrides,
  };
}

/**
 * Apply tokens to DOM as CSS custom properties (--game-xxx)
 */
export function applyThemeTokens(): void {
  const tokens = getResolvedTokens();
  const root = document.documentElement;
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(`--game-${key}`, value);
  });
}
