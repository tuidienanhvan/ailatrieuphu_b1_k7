import { GAME_CONFIG } from '@game/defaults/game.defaults';
import { SHOP_ITEMS } from '@game/defaults/shop.defaults';
import { QUESTIONS, BACKUP_QUESTIONS } from '@game/defaults/questions.defaults';
import { GAME_EVENTS } from '@game/events';
import themePackage from '@game/theme/premier';
import { audioManager } from '@game/utils/audio-manager';

export const defaults = {
  game: GAME_CONFIG,
  shop: SHOP_ITEMS,
  questionPool: {
    questions: QUESTIONS,
    backups: BACKUP_QUESTIONS,
  },
};

export const eventCatalog = GAME_EVENTS;
export const theme = themePackage;
export const AudioManager = audioManager;
