/**
 * @game/theme/Provider.tsx
 * React component to apply theme and provide it to children
 */

import React, { useEffect } from 'react';
import { ThemePackage } from './types';
import { applyThemeTokens } from './applier';

interface ThemeProviderProps {
  theme: ThemePackage;
  children: React.ReactNode;
}

/**
 * Provider component that applies theme tokens and makes theme available to children
 * Should wrap the entire game application
 *
 * @param theme - Theme package with tokens
 * @param children - Child components
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  useEffect(() => {
    // Apply theme tokens to document on mount and when theme changes
    applyThemeTokens(theme.tokens);
  }, [theme]);

  return <>{children}</>;
};
