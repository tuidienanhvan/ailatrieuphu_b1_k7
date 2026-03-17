import { StateCreator } from 'zustand';
import { GameState, Lifelines, Question } from '@game/types';
import { QUESTIONS, BACKUP_QUESTIONS } from '@game/defaults/questions.defaults';
import { GAME_CONFIG, TOTAL_LEVELS } from '@game/defaults/game.defaults';
import { fetchQuizData } from '../../data/game-api';
import { shuffleArray } from '@game/utils/shuffle';
import { GameStoreState } from '../useGameStore';

export interface GameSessionSlice {
  // Session State
  gameState: GameState;
  currentLevel: number;
  gameQuestions: Question[];
  backupQuestions: Question[];
  finalPrize: string;
  lifelines: Lifelines;
  usedInRound: string[];

  // Actions
  setGameState: (state: GameState) => void;
  setFinalPrize: (prize: string) => void;

  questionPoolFromEngine: { questions: Question[], backups: Question[] } | null;
  setQuestionPoolFromEngine: (pool: { questions: Question[], backups: Question[] }) => void;

  // Environment
  clientid: string;
  setClientId: (id: string) => void;

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

  questionPoolFromEngine: null,
  clientid: '',

  setGameState: (state) => set({ gameState: state }),
  setFinalPrize: (prize) => set({ finalPrize: prize }),
  setQuestionPoolFromEngine: (pool) => set({ questionPoolFromEngine: pool }),
  setClientId: (id) => set({ clientid: id }),

  fetchAndStartGame: async () => {
    set({ isLoading: true });

    const MIN_LOADING_MS = 1500;
    const startTime = Date.now();

    const enginePool = get().questionPoolFromEngine;
    let apiData: { questions: Question[], backups: Question[] } | null = null;

    if (enginePool) {
      console.log("[GameSession] Using questions provided by Engine");
      apiData = enginePool;
    } else {
      console.log("[GameSession] Fetching questions directly (fallback)");
      apiData = await fetchQuizData();
    }

    let questions: Question[];
    let backups: Question[];

    if (apiData && apiData.questions.length >= 5) {
      questions = apiData.questions;
      backups = apiData.backups;

      if (questions.length < TOTAL_LEVELS) {
        const needed = TOTAL_LEVELS - questions.length;
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
      const localPool = [...QUESTIONS, ...BACKUP_QUESTIONS];
      const allQuestions: Question[] = [];
      while (allQuestions.length < TOTAL_LEVELS) {
        const shuffled = shuffleArray([...localPool]).map(q => {
          const idxs = shuffleArray([0, 1, 2, 3]);
          return { ...q, answers: idxs.map(i => q.answers[i]), correct: idxs.indexOf(q.correct) };
        });
        allQuestions.push(...shuffled.slice(0, Math.min(TOTAL_LEVELS - allQuestions.length, shuffled.length)));
      }
      questions = allQuestions;
      backups = shuffleArray([...BACKUP_QUESTIONS]).map(q => {
        const idxs = shuffleArray([0, 1, 2, 3]);
        return { ...q, answers: idxs.map(i => q.answers[i]), correct: idxs.indexOf(q.correct) };
      });
    }

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
    const countItem = (id: string) => inventory.filter(x => x === id).length;

    state.resetLogs();

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
      usedInRound: [],
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
    return {
      currentLevel: state.currentLevel + 1,
      usedInRound: []
    };
  }),

  useLifeline: (name) => set((state) => ({
    lifelines: {
      ...state.lifelines,
      [name]: Math.max(0, state.lifelines[name] - 1)
    },
    usedInRound: [...state.usedInRound, name]
  })),

  replaceCurrentQuestion: (newQuestion) => set((state) => {
    const newQuestions = [...state.gameQuestions];
    newQuestions[state.currentLevel] = newQuestion;
    return { gameQuestions: newQuestions };
  }),
});
