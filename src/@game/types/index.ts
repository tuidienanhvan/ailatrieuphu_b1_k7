/**
 * CORE GAME TYPES - ULTIMATE
 * Centralized Domain Models & App States for AI Là Triệu Phú
 * All game logic and platform contracts unified here.
 */

// --- Design System Tokens ---

export type AssetId = 
  | 'logo_premier'
  | 'logo_educational'
  | 'bg_classic'
  | 'bg_night'
  | 'trophy_gold'
  | 'trophy_silver'
  | 'trophy_bronze'
  | 'timer_clock'
  | 'lifeline_5050'
  | 'lifeline_phone'
  | 'lifeline_audience'
  | 'lifeline_ask_ai'
  | 'lifeline_change';

export interface ThemeTokens {
  brand: string;
  surface: string;
  surfaceLight: string;
  surfaceDark: string;
  border: string;
  accent: string;
  success: string;
  error: string;
  warning: string;
  text: string;
  textMuted: string;
}

// --- Application States & UI Logic ---

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

export type ModalType = 'none' | 'phone' | 'message' | 'audience' | 'ai' | 'stop';

export interface ModalData {
  phoneTitle?: string;
  phoneMessage?: string;
  aiMessage?: string;
  isExpert?: boolean;
  audienceStats?: number[];
  stopAmount?: string;
}

// --- Gameplay Mechanics ---

export interface Lifelines {
  fiftyFifty: number;
  phone: number;
  audience: number;
  askAI: number;
  changeQuestion: number;
}

export interface VisualState {
  isAiThinking: boolean;
  aiDisplayText: string;
  audienceBars: number[];
}

// --- Event System ---

/**
 * Conditions that trigger event checks
 */
export type EventCondition = 'on_correct' | 'on_wrong' | 'on_timeout' | 'on_lifeline' | 'on_start';

/**
 * Event type categories
 */
export type EventType = 'funny' | 'special' | 'reward' | 'penalty';

/**
 * Effect to apply after event display
 */
export type EventAfterEffect = 'continue' | 'show_real_question' | 'add_bonus';

/**
 * Trigger condition for when an event should check for activation
 */
export interface EventTrigger {
  level?: number | number[];
  probability?: number; // 0-1
  condition?: EventCondition;
}

/**
 * A game event that can trigger during gameplay
 */
export interface GameEvent {
  id: string;
  type: EventType;
  trigger: EventTrigger;
  message: string;
  duration: number; // milliseconds
  showOverlay?: boolean;
  afterEffect?: EventAfterEffect;
}

// --- Utility Domain Types ---

/**
 * Basic Question interface
 */
export interface Question {
  question: string;
  answers: string[];
  correct: number;
}

/**
 * Basic Prize interface
 */
export interface Prize {
  level: number;
  amount: string;
  milestone: boolean;
}

// --- Logging & Telemetry ---

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
 * Log entry for a single game event
 */
export interface GameLogEvent {
  timestamp: number;
  level: number;
  action: LogActionType;
  details: Record<string, any>;
}

// --- User & Economy Models ---

export interface MatchRecord {
  id: string;
  timestamp: number;
  level: number;
  prize: string;
  result: 'victory' | 'gameover' | 'stop';
  score: number;
}

/**
 * Server-side history record for results and purchases
 */
export interface ServerHistoryRecord {
  id?: number;
  msgtype: 'RESULT' | 'PURCHASE' | string;
  tsms: number;
  payload: {
    email?: string;
    userId?: number;
    username?: string;
    gameKey?: string;
    result?: 'victory' | 'gameover' | 'stop' | string;
    level?: number;
    score?: number;
    xp?: number;
    coin?: number;
    mateId?: string;
    playDuration?: number;
    lifelinesUsed?: string[];
    wrongAnswerLevel?: number | null;
    itemId?: string;
    itemName?: string;
    itemType?: string;
    price?: number;
    balanceAfter?: number;
    [key: string]: any;
  };
}

export interface UserInfo {
  userId?: number;
  email?: string;
  username?: string;
  name: string;
  balance: number;
  inventory: string[];
  equippedSkin: string;
  stats: {
    playCount: number;
    bestScore: number;
  };
  history: MatchRecord[];
  serverHistory: ServerHistoryRecord[];
}

export type ItemType = 'skin' | 'lifeline' | 'avatar';

export interface ShopItem {
  id: string;
  type: ItemType;
  name: string;
  description: string;
  price: number;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
