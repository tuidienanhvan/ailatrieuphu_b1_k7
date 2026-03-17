/**
 * @platform/theme/applier.ts
 * Apply theme tokens to document root as CSS custom properties
 */

/**
 * Apply theme tokens to document root
 * Creates CSS custom properties with --game- prefix
 *
 * @param tokens - Map of token names to values
 */
export function applyThemeTokens(tokens: Record<string, string>): void {
  const root = document.documentElement;

  Object.entries(tokens).forEach(([key, value]) => {
    // Create CSS variable with --game- prefix
    const varName = `--game-${key}`;
    root.style.setProperty(varName, value);
  });
}

/**
 * Clear all game theme tokens from document root
 */
export function clearThemeTokens(): void {
  const root = document.documentElement;
  const styles = root.getAttribute('style') || '';

  // Remove all --game- variables
  const cleaned = styles
    .split(';')
    .filter((rule) => !rule.includes('--game-'))
    .join(';');

  if (cleaned.trim()) {
    root.setAttribute('style', cleaned);
  } else {
    root.removeAttribute('style');
  }
}

/**
 * Get a specific theme token value
 *
 * @param tokenName - Name of the token (without --game- prefix)
 * @returns Token value or null if not set
 */
export function getThemeToken(tokenName: string): string | null {
  const varName = `--game-${tokenName}`;
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return value.trim() || null;
}
