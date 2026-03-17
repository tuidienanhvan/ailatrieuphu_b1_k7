/**
 * @platform/types/log.ts
 * Logging and telemetry types
 */

/**
 * Action types that can be logged during gameplay
 */
export type LogActionType =
  | 'GAME_START'
  | 'ANSWER'
  | 'USE_LIFELINE'
  | 'SHOP_PURCHASE'
  | 'GAME_END'
  | 'TIER_START'
  | 'GAME_PAUSE'
  | 'GAME_RESUME'
  | 'LIFELINE_EXHAUSTED'
  | 'EVENT_TRIGGERED';

/**
 * A single game log entry for telemetry
 */
export interface GameLogEvent {
  timestamp: number;
  level: number;
  action: LogActionType;
  details: Record<string, any>;
}
