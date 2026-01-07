
// Application States & UI Logic Types

export enum GameState {
  WELCOME,
  PLAYING,
  GAME_OVER,
  VICTORY,
  TIER_COMPLETE,  // Hoàn thành tier, hiển thị ResultScreen với "Chơi tiếp"
  SHOP,
  HISTORY // New State
}

export interface Lifelines {
  fiftyFifty: number;
  phone: number;
  audience: number;
  askAI: number;
  changeQuestion: number;
}

// --- VISUAL STATE ---
// Quản lý các hiệu ứng động ngay trong Store để Component không cần dùng State nội bộ
export interface VisualState {
  // Hiệu ứng AI
  isAiThinking: boolean;
  aiDisplayText: string; // Text chạy chữ từng ký tự

  // Hiệu ứng Khán giả
  audienceBars: number[]; // Chiều cao cột (0 -> 100)
}

export type ModalType = 'none' | 'phone' | 'message' | 'audience' | 'ai' | 'stop';

export interface ModalData {
  phoneTitle?: string;
  phoneMessage?: string;
  aiMessage?: string; // Message gốc trọn vẹn của AI
  isExpert?: boolean; // Cờ đánh dấu chế độ chuyên gia cho AI
  audienceStats?: number[]; // Số liệu gốc trọn vẹn của khán giả
  stopAmount?: string;
}

// --- LOGGING SYSTEM ---
export type LogActionType =
  | 'GAME_START'
  | 'ANSWER'
  | 'USE_LIFELINE'
  | 'SHOP_PURCHASE'
  | 'GAME_END'
  | 'TIER_START';  // Bắt đầu tier mới

export interface GameLogEvent {
  timestamp: number;
  level: number; // Câu hỏi hiện tại (0-14)
  action: LogActionType;
  details: any; // Payload linh động tùy action
}
