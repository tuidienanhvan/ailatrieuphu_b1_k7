
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

// History record from server (via Engine)
export interface ServerHistoryRecord {
  id?: number;
  msgtype: 'RESULT' | 'PURCHASE' | string;
  tsms: number;
  payload: {
    // Common fields
    email?: string;
    userId?: number;
    username?: string;
    gameKey?: string;

    // RESULT fields
    result?: 'victory' | 'gameover' | 'stop';
    level?: number;
    score?: number;
    xp?: number;
    coin?: number;
    mateId?: string;
    playDuration?: number;
    lifelinesUsed?: string[];
    wrongAnswerLevel?: number | null;

    // PURCHASE fields
    itemId?: string;
    itemName?: string;
    itemType?: 'lifeline' | 'skin';
    price?: number;
    balanceAfter?: number;
  };
}

export interface UserInfo {
  userId?: number; // ID định danh từ hệ thống cha
  email?: string;  // Email người chơi
  username?: string; // preferred_username từ JWT
  name: string;    // Họ tên đầy đủ
  balance: number; // Tiền trong game
  inventory: string[]; // Danh sách ID vật phẩm đã sở hữu
  equippedSkin: string; // Skin đang dùng
  stats: {
    playCount: number;
    bestScore: number;
  };
  history: MatchRecord[]; // Lịch sử local (mất khi reload)
  serverHistory: ServerHistoryRecord[]; // Lịch sử từ server (persistent)
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

// API Response Types
export interface QuestionData {
  q_id: number;
  q_code: string;
  q_type: "multiple-choice" | "true-false" | "short-answer";
  q_bloom?: string;
  q_difficulty?: "easy" | "medium" | "hard";
  q_content: {
    text: string;
    html?: string;
    plain?: string;
  };
  q_answers: {
    label: string;
    text: string;
    correct?: boolean;
  }[];
  q_solution?: {
    type: "text" | "step_by_step";
    text: string;
    image?: string;
  };
  q_tags?: string[];
  taxo_subject?: string;
  taxo_section?: string;
  taxo_subsection?: string;
  taxo_lot?: string;
}
