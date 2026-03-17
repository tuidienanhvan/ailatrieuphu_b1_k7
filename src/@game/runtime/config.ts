import { HubConfigPayload } from '@game/bridge/types';
import { mergeConfig } from '@game/config/manager';
import { MergedConfig } from '@game/config/types';
import { GameEvent } from '@game/types';

import { GAME_CONFIG, applyGameConfigOverrides } from '@game/defaults/game.defaults';
import { QUESTIONS, BACKUP_QUESTIONS, applyQuestionPoolOverrides } from '@game/defaults/questions.defaults';
import { SHOP_ITEMS, applyShopConfigOverrides } from '@game/defaults/shop.defaults';
import { setThemeTokenOverrides } from '@game/theme/token-runtime';
import { THEMES } from '@game/theme/registry';
import { GAME_EVENTS, setRuntimeEvents } from '@game/events';
import { UserInfo } from '@game/types';

export const DEFAULT_USER: UserInfo = {
  name: 'Khach',
  balance: 100000,
  inventory: ['skin_standard'],
  equippedSkin: 'skin_standard',
  stats: { playCount: 0, bestScore: 0 },
  history: [],
  serverHistory: [],
};

export function buildDefaultMergedConfig(): MergedConfig {
  return {
    game: {
      totalLevels: GAME_CONFIG.totalLevels,
      defaultTimerDuration: GAME_CONFIG.defaultTimerDuration,
      tiers: [...GAME_CONFIG.tiers],
      milestones: [...GAME_CONFIG.milestones],
      prizes: [...GAME_CONFIG.prizes],
      phoneHelpers: [...GAME_CONFIG.phoneHelpers],
    },
    shop: {
      enabled: true,
      items: [...SHOP_ITEMS],
    },
    theme: {
      tokens: { ...THEMES.premier.tokens },
    },
    events: {
      enabled: true,
      events: Object.values(GAME_EVENTS) as GameEvent[],
    },
    user: { ...DEFAULT_USER },
    questionPool: {
      questions: [...QUESTIONS],
      backups: [...BACKUP_QUESTIONS],
    },
  };
}

function mapUser(user?: HubConfigPayload['user']): Partial<UserInfo> | undefined {
  if (!user) {
    return undefined;
  }

  return {
    name: user.name || user.username || 'Khach',
    username: user.username,
    email: user.email,
    userId: user.userId,
    balance: typeof user.balance === 'number' ? user.balance : undefined,
    inventory: user.inventory,
    stats: user.stats,
    history: user.history as any,
    serverHistory: user.serverHistory || (Array.isArray(user.history) ? (user.history as any) : []),
  };
}

export function mergeHubPayloadWithDefaults(payload: HubConfigPayload): MergedConfig {
  const defaults = buildDefaultMergedConfig();

  return mergeConfig(defaults, {
    gameConfig: payload.gameConfig,
    shopConfig: payload.shopConfig,
    themeConfig: payload.themeConfig ? {
      themeOverride: payload.themeConfig.theme,
      tokens: payload.themeConfig.tokens || {}
    } : undefined,
    eventConfig: payload.eventConfig,
    user: mapUser(payload.user),
    questionPool: payload.questionPool,
  });
}

export function applyMergedConfigToRuntime(config: MergedConfig): void {
  applyGameConfigOverrides(config.game);
  applyQuestionPoolOverrides(config.questionPool);
  applyShopConfigOverrides({ items: config.shop.items });
  setThemeTokenOverrides(config.theme.tokens);

  if (config.events.enabled) {
    setRuntimeEvents(config.events.events as any);
  }
}
