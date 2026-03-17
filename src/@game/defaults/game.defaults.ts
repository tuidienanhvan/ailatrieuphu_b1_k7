import { Prize } from '@game/types';
import { GameConfig } from '@game/config/types';

export const GAME_CONFIG: GameConfig = {
  totalLevels: 15,
  defaultTimerDuration: 30,
  tiers: [
    { id: 1, range: [1, 5], name: 'Khoi dong', timerDuration: 30 },
    { id: 2, range: [6, 10], name: 'Tang toc', timerDuration: 30 },
    { id: 3, range: [11, 15], name: 'Ve dich', timerDuration: 30 },
  ],
  milestones: [5, 10, 15],
  prizes: [
    { level: 1, amount: '200,000', milestone: false },
    { level: 2, amount: '400,000', milestone: false },
    { level: 3, amount: '600,000', milestone: false },
    { level: 4, amount: '1,000,000', milestone: false },
    { level: 5, amount: '2,000,000', milestone: true },
    { level: 6, amount: '3,000,000', milestone: false },
    { level: 7, amount: '6,000,000', milestone: false },
    { level: 8, amount: '10,000,000', milestone: false },
    { level: 9, amount: '14,000,000', milestone: false },
    { level: 10, amount: '22,000,000', milestone: true },
    { level: 11, amount: '30,000,000', milestone: false },
    { level: 12, amount: '40,000,000', milestone: false },
    { level: 13, amount: '60,000,000', milestone: false },
    { level: 14, amount: '85,000,000', milestone: false },
    { level: 15, amount: '150,000,000', milestone: true },
  ],
  phoneHelpers: [
    { id: 'expert_1', name: 'GS. Biet Tuot', role: 'Toan hoc', rate: '95%', color: '#3b82f6' },
    { id: 'expert_2', name: 'TS. Thong Thai', role: 'Lich su', rate: '85%', color: '#8b5cf6' },
    { id: 'expert_3', name: 'Thay Giao Ba', role: 'Tu nhien', rate: '50%', color: '#ef4444' },
  ],
};

export let TOTAL_LEVELS = GAME_CONFIG.totalLevels;

export function applyGameConfigOverrides(overrides?: Partial<GameConfig>): void {
  if (!overrides) {
    return;
  }

  if (typeof overrides.totalLevels === 'number') {
    GAME_CONFIG.totalLevels = overrides.totalLevels;
  }

  if (typeof overrides.defaultTimerDuration === 'number') {
    GAME_CONFIG.defaultTimerDuration = overrides.defaultTimerDuration;
  }

  if (Array.isArray(overrides.tiers) && overrides.tiers.length > 0) {
    GAME_CONFIG.tiers = overrides.tiers;
  }

  if (Array.isArray(overrides.milestones) && overrides.milestones.length > 0) {
    GAME_CONFIG.milestones = overrides.milestones;
  }

  if (Array.isArray(overrides.prizes) && overrides.prizes.length > 0) {
    GAME_CONFIG.prizes = overrides.prizes as Prize[];
  }

  if (Array.isArray(overrides.phoneHelpers) && overrides.phoneHelpers.length > 0) {
    GAME_CONFIG.phoneHelpers = overrides.phoneHelpers;
  }

  TOTAL_LEVELS = GAME_CONFIG.totalLevels;
}

export const getPrizeByLevel = (level: number): Prize => {
  return GAME_CONFIG.prizes.find((prize) => prize.level === level) || GAME_CONFIG.prizes[0];
};

export const getPrizeAmount = (level: number): string => {
  if (level <= 0) {
    return '0';
  }
  const prize = getPrizeByLevel(level);
  return prize ? prize.amount : '0';
};

export const getTierByLevel = (level: number): 1 | 2 | 3 => {
  const currentLevel = level + 1;
  const matchedTier = GAME_CONFIG.tiers.find(
    (tier) => currentLevel >= tier.range[0] && currentLevel <= tier.range[1]
  );

  if (!matchedTier) {
    return 1;
  }

  return (matchedTier.id as 1 | 2 | 3) || 1;
};

export const getTierConfigByLevel = (level: number) => {
  const tierId = getTierByLevel(level);
  return GAME_CONFIG.tiers.find((tier) => tier.id === tierId) || GAME_CONFIG.tiers[0];
};

export const getTierIdByLevel = getTierByLevel;
