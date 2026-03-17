/**
 * @game/config/manager.ts
 * Deep merge function to combine default config with Hub overrides
 */

import { GameConfig, ShopConfig, ThemeOverrides, EventOverrides, QuestionPool, MergedConfig } from './types';
import { UserInfo } from '../types';

/**
 * Deep merge two objects, with overrides taking precedence
 * Arrays are replaced, not merged
 * null/undefined values in overrides are skipped
 *
 * @param defaults - Default configuration
 * @param overrides - Override values from Hub
 * @returns Merged configuration
 */
function deepMerge<T extends Record<string, any>>(defaults: T, overrides?: Partial<T>): T {
  if (!overrides) {
    return { ...defaults };
  }

  const result = { ...defaults };

  for (const key in overrides) {
    const override = overrides[key];

    // Skip null/undefined overrides
    if (override === null || override === undefined) {
      continue;
    }

    // For arrays and primitives, replace entirely
    if (Array.isArray(override)) {
      (result as any)[key] = override;
    } else if (typeof override === 'object' && !Array.isArray(override)) {
      // Recursively merge objects
      (result as any)[key] = deepMerge(
        (result as any)[key] || {},
        override as Record<string, any>
      );
    } else {
      // Primitive values
      (result as any)[key] = override;
    }
  }

  return result;
}

/**
 * Merge default config with Hub overrides
 * Hub values always take precedence over defaults
 *
 * @param defaults - Default configuration
 * @param hubOverrides - Partial overrides from Hub
 * @returns Merged MergedConfig
 */
export function mergeConfig(
  defaults: MergedConfig,
  hubOverrides?: {
    gameConfig?: Partial<GameConfig>;
    shopConfig?: Partial<ShopConfig>;
    themeConfig?: Partial<ThemeOverrides>;
    eventConfig?: Partial<EventOverrides>;
    user?: Partial<UserInfo>;
    questionPool?: Partial<QuestionPool>;
  }
): MergedConfig {
  if (!hubOverrides) {
    return defaults;
  }

  return {
    game: deepMerge(defaults.game, hubOverrides.gameConfig),
    shop: deepMerge(defaults.shop, hubOverrides.shopConfig),
    theme: deepMerge(defaults.theme, hubOverrides.themeConfig),
    events: deepMerge(defaults.events, hubOverrides.eventConfig),
    user: deepMerge(defaults.user, hubOverrides.user),
    questionPool: deepMerge(defaults.questionPool, hubOverrides.questionPool),
  };
}
