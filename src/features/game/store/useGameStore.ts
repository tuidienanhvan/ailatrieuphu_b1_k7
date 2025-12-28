
import { create } from 'zustand';
import { createPlayerSlice, PlayerSlice } from './slices/createPlayerSlice';
import { createSystemSlice, SystemSlice } from './slices/createSystemSlice';
import { createGameSessionSlice, GameSessionSlice } from './slices/createGameSessionSlice';
import { createLogSlice, LogSlice } from './slices/createLogSlice';
import { GameState, ModalType, ModalData, Lifelines } from '../types/common';
import { Question, UserInfo } from '../types/entities';

// Combine all slice types
export type GameStoreState = PlayerSlice & SystemSlice & GameSessionSlice & LogSlice;

export const useGameStore = create<GameStoreState>((...a) => ({
  ...createPlayerSlice(...a),
  ...createSystemSlice(...a),
  ...createGameSessionSlice(...a),
  ...createLogSlice(...a),
}));

/**
 * HELPER: gameActions
 * Mapping actions để dùng ngoài React Component (giữ tính tương thích)
 */
export const gameActions = {
    // SYSTEM ACTIONS
    setIsLoading: (loading: boolean) => useGameStore.getState().setIsLoading(loading),
    setShowConfetti: (show: boolean) => useGameStore.getState().setShowConfetti(show),
    openModal: (type: ModalType, data?: ModalData) => useGameStore.getState().openModal(type, data),
    closeModal: () => useGameStore.getState().closeModal(),

    // PLAYER ACTIONS
    setUserInfo: (info: Partial<UserInfo>) => useGameStore.getState().setUserInfo(info),
    addMoney: (amount: number) => useGameStore.getState().addMoney(amount),
    buyItem: (id: string) => useGameStore.getState().buyItem(id),
    equipItem: (id: string) => useGameStore.getState().equipItem(id),

    // GAME SESSION ACTIONS
    setGameState: (state: GameState) => useGameStore.getState().setGameState(state),
    setFinalPrize: (prize: string) => useGameStore.getState().setFinalPrize(prize),
    
    fetchAndStartGame: () => useGameStore.getState().fetchAndStartGame(),
    startGame: (questions: Question[], backups: Question[]) => useGameStore.getState().startGame(questions, backups),
    nextLevel: () => useGameStore.getState().nextLevel(),
    useLifeline: (name: keyof Lifelines) => useGameStore.getState().useLifeline(name),
    replaceCurrentQuestion: (newQuestion: Question) => useGameStore.getState().replaceCurrentQuestion(newQuestion),
    
    // LOG ACTIONS
    logEvent: (action: any, details: any) => useGameStore.getState().logEvent(action, details),
};
