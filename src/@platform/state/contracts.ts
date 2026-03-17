/**
 * @platform/state/contracts.ts
 * Interfaces defining the contract for state management slices
 * Implementation-agnostic - can be used with Zustand, Redux, or other solutions
 */

import {
  GameState,
  ModalType,
  ModalData,
  Lifelines,
  GameLogEvent,
  Question,
} from '../types/game';
import { Prize } from '../types/game';

/**
 * Game session state slice
 */
export interface GameSessionSlice {
  currentLevel: number;
  currentQuestion: Question | null;
  state: GameState;
  timerDuration: number;
  startTime: number;
  endTime: number | null;

  setLevel(level: number): void;
  setQuestion(question: Question | null): void;
  setState(state: GameState): void;
  setTimerDuration(duration: number): void;
  startSession(): void;
  endSession(): void;
}

/**
 * Player gameplay state slice
 */
export interface PlayerSlice {
  selectedAnswer: number | null;
  isAnswering: boolean;
  lifelines: Lifelines;
  usedLifelines: string[];

  selectAnswer(index: number): void;
  setIsAnswering(answering: boolean): void;
  useLifeline(lifelineType: keyof Lifelines): void;
  resetLifelines(): void;
  resetPlayState(): void;
}

/**
 * System UI state slice
 */
export interface SystemSlice {
  modalType: ModalType;
  modalData: ModalData;
  isFullscreen: boolean;
  isMuted: boolean;
  isLoading: boolean;

  setModalType(type: ModalType): void;
  setModalData(data: ModalData): void;
  setIsFullscreen(fullscreen: boolean): void;
  setIsMuted(muted: boolean): void;
  setIsLoading(loading: boolean): void;
}

/**
 * Game events and logging state slice
 */
export interface EventSlice {
  logs: GameLogEvent[];
  currentEventId: string | null;
  eventShowTime: number;

  addLog(event: GameLogEvent): void;
  clearLogs(): void;
  setCurrentEvent(eventId: string | null, showTime: number): void;
  triggerEvent(eventId: string): void;
}

/**
 * Complete game store contract
 */
export interface GameStore extends GameSessionSlice, PlayerSlice, SystemSlice, EventSlice {
  // Reset entire store
  reset(): void;
}
