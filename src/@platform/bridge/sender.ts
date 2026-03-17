/**
 * @platform/bridge/sender.ts
 * Send messages from Game to Hub (parent iframe)
 */

import {
  GameReadyPayload,
  GameResultPayload,
  GamePurchasePayload,
} from './types';

/**
 * Send MINIGAME_READY message to indicate game is loaded and ready
 */
export function sendReady(): void {
  const payload: GameReadyPayload = {
    type: 'MINIGAME_READY',
  };

  if (window.parent && window.parent !== window) {
    window.parent.postMessage(payload, '*');
  }
}

/**
 * Send MINIGAME_RESULT message when game ends
 *
 * @param payload - Game result information
 */
export function sendResult(payload: GameResultPayload['payload']): void {
  const message: GameResultPayload = {
    type: 'MINIGAME_RESULT',
    payload,
  };

  if (window.parent && window.parent !== window) {
    window.parent.postMessage(message, '*');
  }
}

/**
 * Send MINIGAME_PURCHASE message when player buys an item
 *
 * @param payload - Purchase information
 */
export function sendPurchase(payload: GamePurchasePayload['payload']): void {
  const message: GamePurchasePayload = {
    type: 'MINIGAME_PURCHASE',
    payload,
  };

  if (window.parent && window.parent !== window) {
    window.parent.postMessage(message, '*');
  }
}
