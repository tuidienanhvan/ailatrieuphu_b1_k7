/**
 * @platform/types/game.ts
 * Core game domain types - generic across all games
 */

/**
 * Game application states
 */
export enum GameState {
  WELCOME = 'WELCOME',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY',
  TIER_COMPLETE = 'TIER_COMPLETE',
  SHOP = 'SHOP',
  HISTORY = 'HISTORY'
}

/**
 * A single question with multiple choice answers
 */
export interface Question {
  question: string;
  answers: string[];
  correct: number;
}

/**
 * Prize information for a game level
 */
export interface Prize {
  level: number;
  amount: string;
  milestone: boolean;
  assetId?: string;
}

/**
 * Available lifelines and their remaining uses
 */
export interface Lifelines {
  fiftyFifty: number;
  phone: number;
  audience: number;
  askAI: number;
  changeQuestion: number;
}

/**
 * Modal UI types for game interactions
 */
export type ModalType = 'none' | 'phone' | 'message' | 'audience' | 'ai' | 'stop';

/**
 * Data to display in modal windows
 */
export interface ModalData {
  phoneTitle?: string;
  phoneMessage?: string;
  aiMessage?: string;
  isExpert?: boolean;
  audienceStats?: number[];
  stopAmount?: string;
}

/**
 * Visual state for AI helper and audience feedback
 */
export interface VisualState {
  isAiThinking: boolean;
  aiDisplayText: string;
  audienceBars: number[];
}

/**
 * Historical record of a single game match
 */
export interface MatchRecord {
  id: string;
  timestamp: number;
  level: number;
  prize: string;
  result: 'victory' | 'gameover' | 'stop';
  score: number;
}

/**
 * Action types for game logging and telemetry
 */
export type LogActionType =
  | 'GAME_START'
  | 'ANSWER'
  | 'USE_LIFELINE'
  | 'SHOP_PURCHASE'
  | 'GAME_END'
  | 'TIER_START';

/**
 * Log entry for a single game event
 */
export interface GameLogEvent {
  timestamp: number;
  level: number;
  action: LogActionType;
  details: any;
}
