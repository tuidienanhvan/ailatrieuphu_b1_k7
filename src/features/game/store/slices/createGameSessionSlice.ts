
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
  
  // Track lifelines used in the current question round
  usedInRound: string[];

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
  lifelines: { fiftyFifty: 1, phone: 1, audience: 1, askAI: 1, changeQuestion: 1 },
  usedInRound: [],

  setGameState: (state) => set({ gameState: state }),
  setFinalPrize: (prize) => set({ finalPrize: prize }),

  fetchAndStartGame: async () => {
    set({ isLoading: true });
    
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
    
    // Calculate Lifelines based on Inventory
    // Count occurrences in inventory for consumables
    const countItem = (id: string) => inventory.filter(x => x === id).length;

    // Reset log
    state.resetLogs();
    
    // Log start game
    state.logEvent('GAME_START', { 
        totalQuestions: questions.length,
        initialBalance: state.userInfo.balance
    });

    set({
        gameState: GameState.PLAYING,
        gameQuestions: questions,
        backupQuestions: backups,
        currentLevel: 0,
        finalPrize: '0đ',
        showConfetti: false,
        usedInRound: [], // Reset used items tracking
        lifelines: { 
            fiftyFifty: 1 + countItem('extra_5050'),
            phone: 1 + countItem('extra_phone'), 
            audience: 1 + countItem('extra_audience'), 
            askAI: 1, 
            changeQuestion: 1 + countItem('extra_change_question')
        },
        activeModal: 'none',
        modalData: {}
    });
  },

  nextLevel: () => set((state) => ({ 
      currentLevel: state.currentLevel + 1,
      usedInRound: [] // Reset used items when moving to next level
  })),
  
  useLifeline: (name) => set((state) => ({
    lifelines: { 
        ...state.lifelines, 
        [name]: Math.max(0, state.lifelines[name] - 1) 
    },
    usedInRound: [...state.usedInRound, name] // Mark as used in this round
  })),

  replaceCurrentQuestion: (newQuestion) => set((state) => {
    const newQuestions = [...state.gameQuestions];
    newQuestions[state.currentLevel] = newQuestion;
    return { gameQuestions: newQuestions };
  }),
});
