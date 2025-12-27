
import { StateCreator } from 'zustand';
import { GameState, Lifelines } from '../../types/common';
import { Question } from '../../types/entities';
import { fetchQuizData } from '../../data/game-api';
import { QUESTIONS, BACKUP_QUESTIONS } from '../../data/game-constants';
import { shuffleArray } from '../../../../common/utils/math-helpers';
import { GameStoreState } from '../useGameStore';

export interface GameSessionSlice {
  // Session State
  gameState: GameState;
  currentLevel: number;
  gameQuestions: Question[];
  backupQuestions: Question[];
  finalPrize: string;
  lifelines: Lifelines;

  // Actions
  setGameState: (state: GameState) => void;
  setFinalPrize: (prize: string) => void;
  
  fetchAndStartGame: () => Promise<void>;
  startGame: (questions: Question[], backups: Question[]) => void;
  nextLevel: () => void;
  useLifeline: (name: keyof Lifelines) => void;
  replaceCurrentQuestion: (newQuestion: Question) => void;
}

export const createGameSessionSlice: StateCreator<GameStoreState, [], [], GameSessionSlice> = (set, get) => ({
  gameState: GameState.WELCOME,
  currentLevel: 0,
  gameQuestions: [],
  backupQuestions: [],
  finalPrize: '0đ',
  // Default values, will be overwritten in startGame
  lifelines: { fiftyFifty: 1, phone: 1, audience: 1, askAI: 1, changeQuestion: 1 },

  setGameState: (state) => set({ gameState: state }),
  setFinalPrize: (prize) => set({ finalPrize: prize }),

  fetchAndStartGame: async () => {
    // Access System Slice action via merged state
    set({ isLoading: true });
    
    // 1. API Call
    const apiData = await fetchQuizData('math_lesson_001');
    
    let questions: Question[];
    let backups: Question[];

    if (apiData && apiData.questions.length >= 5) {
      questions = apiData.questions;
      backups = apiData.backups;
      
      if (questions.length < 15) {
           const needed = 15 - questions.length;
           const supplemental = shuffleArray([...QUESTIONS]).slice(0, needed);
           questions = [...questions, ...supplemental];
      }
      if (backups.length < 5) {
           backups = [...backups, ...BACKUP_QUESTIONS];
      }
    } else {
      questions = shuffleArray([...QUESTIONS]).map(q => {
        const idxs = shuffleArray([0, 1, 2, 3]);
        return { ...q, answers: idxs.map(i => q.answers[i]), correct: idxs.indexOf(q.correct) };
      });
      backups = shuffleArray([...BACKUP_QUESTIONS]).map(q => {
        const idxs = shuffleArray([0, 1, 2, 3]);
        return { ...q, answers: idxs.map(i => q.answers[i]), correct: idxs.indexOf(q.correct) };
      });
    }

    get().startGame(questions, backups);
    set({ isLoading: false });
  },

  startGame: (questions, backups) => {
    const state = get();
    const inventory = state.userInfo.inventory;
    
    // Check Shop Items to Boost Lifelines
    const hasExtra5050 = inventory.includes('extra_5050');
    
    set({
        gameState: GameState.PLAYING,
        gameQuestions: questions,
        backupQuestions: backups,
        currentLevel: 0,
        finalPrize: '0đ',
        showConfetti: false,
        lifelines: { 
            fiftyFifty: hasExtra5050 ? 2 : 1, // Bonus charge
            phone: 1, 
            audience: 1, 
            askAI: 1, 
            changeQuestion: 1 
        },
        activeModal: 'none',
        modalData: {}
    });
  },

  nextLevel: () => set((state) => ({ currentLevel: state.currentLevel + 1 })),
  
  useLifeline: (name) => set((state) => ({
    lifelines: { 
        ...state.lifelines, 
        [name]: Math.max(0, state.lifelines[name] - 1) 
    }
  })),

  replaceCurrentQuestion: (newQuestion) => set((state) => {
    const newQuestions = [...state.gameQuestions];
    newQuestions[state.currentLevel] = newQuestion;
    return { gameQuestions: newQuestions };
  }),
});
