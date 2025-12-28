
// Domain Models (Dữ liệu nghiệp vụ cốt lõi)

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

export interface PhoneHelper {
  id: string;
  name: string;
  role: string;
  rate: string;
  color: string;
}

export interface MatchRecord {
  id: string;
  timestamp: number;
  level: number;
  prize: string;
  result: 'victory' | 'gameover' | 'stop';
  score: number;
}

export interface UserInfo {
  userId?: number; // ID định danh từ hệ thống cha
  email?: string;  // Email người chơi
  name: string;
  balance: number; // Tiền trong game
  inventory: string[]; // Danh sách ID vật phẩm đã sở hữu
  equippedSkin: string; // Skin đang dùng
  stats: {
    playCount: number;
    bestScore: number;
  };
  history: MatchRecord[]; // Lịch sử các trận đấu
}

export type ItemType = 'skin' | 'lifeline' | 'avatar';

export interface ShopItem {
  id: string;
  type: ItemType;
  name: string;
  description: string;
  price: number;
  icon: string; // Có thể là icon name hoặc url
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
