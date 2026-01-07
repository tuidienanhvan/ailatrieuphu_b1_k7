/**
 * Theme Registry
 * Map tier number → theme components
 */

import { Theme, ThemeRegistry } from './types';

// Import themes (will be created)
import * as PremierTheme from './premier/index';
// import * as SnowTheme from './snow';
// import * as FireTheme from './fire';

// ============================================================================
// THEME REGISTRY
// ============================================================================

export const THEME_REGISTRY: ThemeRegistry = {
    1: PremierTheme.default,
    // 2: SnowTheme.default,   // Uncomment when Snow theme is ready
    // 3: FireTheme.default,   // Uncomment when Fire theme is ready
    2: PremierTheme.default,   // Temporary: use Premier for all tiers
    3: PremierTheme.default,   // Temporary: use Premier for all tiers
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get theme by tier number
 */
export function getTheme(tier: 1 | 2 | 3): Theme {
    return THEME_REGISTRY[tier];
}

/**
 * Get current theme based on game state
 */
export function getCurrentTheme(currentTier: 1 | 2 | 3): Theme {
    return getTheme(currentTier);
}
