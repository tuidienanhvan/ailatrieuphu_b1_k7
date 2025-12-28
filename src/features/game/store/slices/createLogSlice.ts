
import { StateCreator } from 'zustand';
import { GameStoreState } from '../useGameStore';
import { GameLogEvent, LogActionType } from '../../types/common';

export interface LogSlice {
  sessionLogs: GameLogEvent[];
  logEvent: (action: LogActionType, details: any) => void;
  resetLogs: () => void;
  getGamePayload: () => any;
}

export const createLogSlice: StateCreator<GameStoreState, [], [], LogSlice> = (set, get) => ({
  sessionLogs: [],

  logEvent: (action, details) => {
    const currentState = get();
    const newEvent: GameLogEvent = {
      timestamp: Date.now(),
      level: currentState.currentLevel + 1, // Log level 1-15 cho dễ đọc
      action,
      details
    };
    
    // Console log for debug (optional)
    console.log(`[GameLog] ${action}:`, details);

    set((state) => ({
      sessionLogs: [...state.sessionLogs, newEvent]
    }));
  },

  resetLogs: () => set({ sessionLogs: [] }),

  getGamePayload: () => {
    const state = get();
    return {
      userInfo: state.userInfo,
      finalLevel: state.currentLevel,
      finalPrize: state.finalPrize,
      questions: state.gameQuestions, // Bộ câu hỏi của lượt chơi này
      logs: state.sessionLogs // Toàn bộ lịch sử thao tác
    };
  }
});
