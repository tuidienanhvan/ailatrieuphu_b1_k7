import { ThemePackage } from './types';

// Import themes — mỗi theme = 1 folder
import PremierTheme from './premier/index';

// ============================================================================
// THEME REGISTRY
// ============================================================================

/**
 * All available themes by ID.
 * Khi thêm theme mới (natural, night, ...), import và thêm vào đây.
 */
export const THEMES: Record<string, ThemePackage> = {
  premier: PremierTheme,
};

/**
 * Default theme mapping per tier.
 * Tier 1 (levels 1-5), Tier 2 (levels 6-10), Tier 3 (levels 11-15).
 * Hub can override this mapping via config.
 */
export const TIER_THEME_MAP: Record<number, string> = {
  1: 'premier',
  2: 'premier',
  3: 'premier',
};

/**
 * Get theme by tier number (used by App.tsx)
 */
export function getTheme(tier: 1 | 2 | 3): ThemePackage {
  return THEMES.premier;
}

/**
 * Get theme by ID directly
 */
export function getThemeById(id: string): ThemePackage {
  return THEMES.premier;
}

/**
 * Update tier → theme mapping at runtime (Hub override)
 */
export function setTierThemeMap(map: Record<number, string>): void {
  Object.assign(TIER_THEME_MAP, map);
}
