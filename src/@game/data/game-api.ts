import { sendPurchase, sendResult } from '@game/bridge/sender';
import { Question } from '@game/types';

/**
 * No direct network call in game runtime.
 * Hub is the source of truth and sends question pool via postMessage.
 */
export const fetchQuizData = async (): Promise<{ questions: Question[]; backups: Question[] } | null> => {
  return null;
};

export const saveMinigameResult = (
  result: 'victory' | 'gameover' | 'stop',
  wrongLevel: number | null,
  duration: number
) => {
  sendResult({
    result,
    wrongAnswerLevel: wrongLevel,
    playDuration: duration,
    level: wrongLevel ?? undefined,
  });
};

export const savePurchaseLog = (
  itemId: string,
  itemName: string,
  price: number,
  itemType: 'lifeline' | 'skin'
) => {
  sendPurchase({
    itemId,
    itemName,
    price,
    itemType,
  });
};
