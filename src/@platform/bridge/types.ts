/**
 * @platform/bridge/types.ts
 * Hub ↔ Game communication protocol
 * This defines the contract between the Hub (parent iframe) and the Game (child iframe)
 */

import { Question, Prize } from '../types/game';
import { ShopItem, ServerHistoryRecord, UserInfo } from '../types/economy';
import { GameEvent } from '../types/event';

/**
 * Phone helper configuration
 */
export interface PhoneHelper {
  id: string;
  name: string;
  role: string;
  rate: string;
  color: string;
}

/**
 * Game rules and structure configuration
 */
export interface GameConfigPayload {
  totalLevels?: number;
  tiers?: Array<{
    id: number;
    range: [number, number];
    name: string;
    timerDuration: number;
  }>;
  prizes?: Prize[];
  milestones?: number[];
  phoneHelpers?: PhoneHelper[];
}

/**
 * Shop configuration and customization
 */
export interface ShopConfigPayload {
  enabled?: boolean;
  items?: ShopItem[];
}

/**
 * Theme token overrides
 */
export interface ThemeConfigPayload {
  tokens?: Record<string, string>;
}

/**
 * Event system configuration
 */
export interface EventConfigPayload {
  enabled?: boolean;
  events?: GameEvent[];
}

/**
 * Environment and context information
 */
export interface EnvironmentPayload {
  courseId?: string;
  apiBase?: string;
}

/**
 * Question pool for the game
 */
export interface QuestionPoolPayload {
  questions: Question[];
  backups: Question[];
}

/**
 * Hub → Game: Complete game configuration
 * Sent once when game iframe is ready to receive initialization
 */
export interface HubConfigPayload {
  type: 'MINIGAME_DATA';

  // User information
  user?: {
    name?: string;
    username?: string;
    email?: string;
    userId?: number;
    balance?: number;
    inventory?: string[];
    stats?: {
      playCount: number;
      bestScore: number;
    };
    history?: any[];
    serverHistory?: ServerHistoryRecord[];
  };

  // Questions
  questionPool?: QuestionPoolPayload;

  // Game rules override
  gameConfig?: GameConfigPayload;

  // Shop override
  shopConfig?: ShopConfigPayload;

  // Theme override
  themeConfig?: ThemeConfigPayload;

  // Events override
  eventConfig?: EventConfigPayload;

  // Environment
  env?: EnvironmentPayload;
}

/**
 * Game → Hub: Game ended with result
 * Sent when player finishes the game (win/lose/stop)
 */
export interface GameResultPayload {
  type: 'MINIGAME_RESULT';
  payload: {
    result: 'victory' | 'gameover' | 'stop';
    wrongAnswerLevel: number | null;
    playDuration: number;
    score?: number;
    level?: number;
    lifelinesUsed?: string[];
  };
}

/**
 * Game → Hub: Player purchased an item
 * Sent when player buys from shop
 */
export interface GamePurchasePayload {
  type: 'MINIGAME_PURCHASE';
  payload: {
    itemId: string;
    itemName: string;
    price: number;
    itemType: 'lifeline' | 'skin';
  };
}

/**
 * Game → Hub: Game is ready for user interaction
 * Sent when game iframe has loaded and initialized
 */
export interface GameReadyPayload {
  type: 'MINIGAME_READY';
}

/**
 * Union of all outbound message types from game
 */
export type GameOutboundMessage = GameResultPayload | GamePurchasePayload | GameReadyPayload;

/**
 * Union of all inbound message types to game
 */
export type GameInboundMessage = HubConfigPayload;
