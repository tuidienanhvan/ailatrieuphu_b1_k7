
// Application States & UI Logic Types

export enum GameState {
  WELCOME,
  PLAYING,
  GAME_OVER,
  VICTORY,
  SHOP
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
  audienceStats?: number[]; // Số liệu gốc trọn vẹn của khán giả
  stopAmount?: string;
}
