/**
 * CORE GAME TYPES - ULTIMATE
 * Centralized Domain Models & App States for AI Là Triệu Phú
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

export enum GameState {
  WELCOME,
  PLAYING,
  GAME_OVER,
  VICTORY,
  TIER_COMPLETE,
  SHOP,
  HISTORY
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

// --- Logging & Telemetry ---

export type LogActionType =
  | 'GAME_START'
  | 'ANSWER'
  | 'USE_LIFELINE'
  | 'SHOP_PURCHASE'
  | 'GAME_END'
  | 'TIER_START';

export interface GameLogEvent {
  timestamp: number;
  level: number;
  action: LogActionType;
  details: any;
}

// --- Domain Models ---

export interface Question {
  question: string;
  answers: string[];
  correct: number;
}

export interface Prize {
  level: number;
  amount: string;
  milestone: boolean;
}

export interface MatchRecord {
  id: string;
  timestamp: number;
  level: number;
  prize: string;
  result: 'victory' | 'gameover' | 'stop';
  score: number;
}

export interface ServerHistoryRecord {
  id?: number;
  msgtype: 'RESULT' | 'PURCHASE' | string;
  tsms: number;
  payload: {
    email?: string;
    userId?: number;
    username?: string;
    gameKey?: string;
    result?: 'victory' | 'gameover' | 'stop';
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
    itemType?: 'lifeline' | 'skin';
    price?: number;
    balanceAfter?: number;
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

// --- Economy ---

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
