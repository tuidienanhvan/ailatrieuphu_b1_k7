/**
 * @platform/bridge/receiver.ts
 * Listen for and process messages from Hub (parent iframe)
 */

import { HubConfigPayload } from './types';

/**
 * Callback function invoked when Hub sends MINIGAME_DATA message
 */
export type HubMessageCallback = (payload: HubConfigPayload) => void;

/**
 * Register a listener for Hub messages
 * Returns cleanup function to remove listener
 *
 * @param callback - Called when Hub sends configuration
 * @returns Function to cleanup listener
 */
export function onHubMessage(callback: HubMessageCallback): () => void {
  const handler = (e: MessageEvent) => {
    // Only process messages with MINIGAME_DATA type
    if (e.data && e.data.type === 'MINIGAME_DATA') {
      try {
        callback(e.data as HubConfigPayload);
      } catch (error) {
        console.error('[onHubMessage] Error processing Hub message:', error);
      }
    }
  };

  window.addEventListener('message', handler);

  // Return cleanup function
  return () => {
    window.removeEventListener('message', handler);
  };
}
