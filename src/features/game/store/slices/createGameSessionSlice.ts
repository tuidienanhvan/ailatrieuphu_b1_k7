
import { StateCreator } from 'zustand';
import { GameState, Lifelines } from '../../types/common';
import { Question } from '../../types/entities';
import { fetchQuizData } from '../../data/game-api';
import { QUESTIONS, BACKUP_QUESTIONS, TIER_MILESTONES } from '../../data/game-constants';
import { shuffleArray } from '../../../../common/utils/math-helpers';
import { GameStoreState } from '../useGameStore';
import { getTierIdByLevel, isTierMilestone } from '../../data/level-themes';

export interface GameSessionSlice {
  // Session State
  gameState: GameState;
  currentLevel: number;
  currentTier: 1 | 2 | 3;  // Tier hiện tại (1-3)
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
  startTier: (tier: 1 | 2 | 3) => void;  // Bắt đầu tier mới (reset lifelines)
  nextLevel: () => void;
  useLifeline: (name: keyof Lifelines) => void;
  replaceCurrentQuestion: (newQuestion: Question) => void;
}

export const createGameSessionSlice: StateCreator<GameStoreState, [], [], GameSessionSlice> = (set, get) => ({
  gameState: GameState.WELCOME,
  currentLevel: 0,
  currentTier: 1,
  gameQuestions: [],
  backupQuestions: [],
  finalPrize: '0đ',
  lifelines: { fiftyFifty: 1, phone: 1, audience: 1, askAI: 1, changeQuestion: 1 },
  usedInRound: [],

  setGameState: (state) => set({ gameState: state }),
  setFinalPrize: (prize) => set({ finalPrize: prize }),

  fetchAndStartGame: async () => {
    set({ isLoading: true });

    const MIN_LOADING_MS = 1500;
    const startTime = Date.now();

    const apiData = await fetchQuizData('toan_6_hk1');

    let questions: Question[];
    let backups: Question[];

    if (apiData && apiData.questions.length >= 5) {
      questions = apiData.questions;
      backups = apiData.backups;

      // Đảm bảo đủ 45 câu hỏi cho 3 tiers
      if (questions.length < 45) {
        const needed = 45 - questions.length;
        // Lặp lại câu hỏi local nếu cần
        const localPool = shuffleArray([...QUESTIONS, ...BACKUP_QUESTIONS]);
        const supplemental: Question[] = [];
        while (supplemental.length < needed) {
          supplemental.push(...shuffleArray([...localPool]).slice(0, Math.min(needed - supplemental.length, localPool.length)));
        }
        questions = [...questions, ...supplemental.slice(0, needed)];
      }
      if (backups.length < 10) {
        backups = [...backups, ...BACKUP_QUESTIONS];
      }
    } else {
      // Fallback: Tạo 45 câu từ local, lặp lại nếu cần
      const localPool = [...QUESTIONS, ...BACKUP_QUESTIONS];
      const allQuestions: Question[] = [];
      while (allQuestions.length < 45) {
        const shuffled = shuffleArray([...localPool]).map(q => {
          const idxs = shuffleArray([0, 1, 2, 3]);
          return { ...q, answers: idxs.map(i => q.answers[i]), correct: idxs.indexOf(q.correct) };
        });
        allQuestions.push(...shuffled.slice(0, Math.min(45 - allQuestions.length, shuffled.length)));
      }
      questions = allQuestions;
      backups = shuffleArray([...BACKUP_QUESTIONS]).map(q => {
        const idxs = shuffleArray([0, 1, 2, 3]);
        return { ...q, answers: idxs.map(i => q.answers[i]), correct: idxs.indexOf(q.correct) };
      });
    }

    // Ensure minimum loading time for better UX
    const elapsed = Date.now() - startTime;
    if (elapsed < MIN_LOADING_MS) {
      await new Promise(resolve => setTimeout(resolve, MIN_LOADING_MS - elapsed));
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
      currentTier: 1,
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

  // Bắt đầu tier mới - reset lifelines
  startTier: (tier: 1 | 2 | 3) => {
    const state = get();
    const inventory = state.userInfo.inventory;
    const countItem = (id: string) => inventory.filter(x => x === id).length;

    // Log tier start
    state.logEvent('TIER_START', {
      tier: tier,
      level: state.currentLevel + 1
    });

    set({
      gameState: GameState.PLAYING,
      currentTier: tier,
      usedInRound: [],
      // Reset lifelines cho tier mới
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

  nextLevel: () => set((state) => {
    const newLevel = state.currentLevel + 1;
    const newTier = getTierIdByLevel(newLevel);
    return {
      currentLevel: newLevel,
      currentTier: newTier,
      usedInRound: [] // Reset used items when moving to next level
    };
  }),

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
