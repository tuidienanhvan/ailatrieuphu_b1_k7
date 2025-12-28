
import { StateCreator } from 'zustand';
import { ModalType, ModalData } from '../../types/common';
import { GameStoreState } from '../useGameStore';

export interface SystemSlice {
  // System State
  isLoading: boolean;
  showConfetti: boolean;
  
  // UI/Modal State
  activeModal: ModalType;
  modalData: ModalData;
  
  // Actions
  setIsLoading: (loading: boolean) => void;
  setShowConfetti: (show: boolean) => void;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

export const createSystemSlice: StateCreator<GameStoreState, [], [], SystemSlice> = (set) => ({
  isLoading: false,
  showConfetti: false,
  activeModal: 'none',
  modalData: {},

  setIsLoading: (loading) => set({ isLoading: loading }),
  setShowConfetti: (show) => set({ showConfetti: show }),
  openModal: (type, data) => set((state) => ({
    activeModal: type,
    modalData: { ...state.modalData, ...data }
  })),
  closeModal: () => set({ activeModal: 'none' }),
});
