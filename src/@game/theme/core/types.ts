/**
 * @game/theme/types.ts
 * Theme system type definitions
 */

/**
 * Theme tokens - CSS variable name to value mapping
 */
export type ThemeTokens = Record<string, string>;

/**
 * Theme components - optional component overrides
 */
export interface ThemeComponents {
  [componentName: string]: any;
}

/**
 * Complete theme package with tokens and optional components
 */
export interface ThemePackage {
  name: string;
  tokens: ThemeTokens;
  components?: ThemeComponents;
}
