/**
 * @game/config/types.ts
 * Configuration type definitions for the merged game config
 */

import { Question, Prize, ShopItem, UserInfo, GameEvent } from '../types';

/**
 * Phone helper with name, role, success rate, and color
 */
export interface PhoneHelper {
  id: string;
  name: string;
  role: string;
  rate: string;
  color: string;
}

/**
 * Tier definition grouping consecutive levels
 */
export interface Tier {
  id: number;
  range: [number, number];
  name: string;
  timerDuration: number;
}

/**
 * Core game configuration after merge
 */
export interface GameConfig {
  totalLevels: number;
  defaultTimerDuration: number;
  tiers: Tier[];
  milestones: number[];
  prizes: Prize[];
  phoneHelpers: PhoneHelper[];
}

/**
 * Shop configuration after merge
 */
export interface ShopConfig {
  enabled: boolean;
  items: ShopItem[];
}

/**
 * Theme token overrides
 */
export interface ThemeOverrides {
  themeOverride?: string;
  tokens: Record<string, string>;
}

/**
 * Event system configuration after merge
 */
export interface EventOverrides {
  enabled: boolean;
  events: GameEvent[];
}

/**
 * Question pool configuration
 */
export interface QuestionPool {
  questions: Question[];
  backups: Question[];
}

/**
 * Complete merged configuration from Hub + defaults
 */
export interface MergedConfig {
  game: GameConfig;
  shop: ShopConfig;
  theme: ThemeOverrides;
  events: EventOverrides;
  user: UserInfo;
  questionPool: QuestionPool;
}
