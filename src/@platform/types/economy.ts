/**
 * @platform/types/economy.ts
 * User, inventory, and economy types
 */

/**
 * Item types available in the shop
 */
export type ItemType = 'skin' | 'lifeline' | 'avatar';

/**
 * Item rarity levels
 */
export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

/**
 * A single shop item for purchase
 */
export interface ShopItem {
  id: string;
  type: ItemType;
  name: string;
  description: string;
  price: number;
  icon: string;
  color: string;
  rarity: ItemRarity;
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

/**
 * User profile and economy information
 */
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
  history: any[];
  serverHistory: ServerHistoryRecord[];
}
