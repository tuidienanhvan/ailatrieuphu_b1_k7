/**
 * @game/engine/event-runtime.ts
 * Event system runtime - check for and select events based on triggers
 */

import { GameEvent, EventCondition } from '../types';

/**
 * Context for event checking
 */
export interface EventCheckContext {
  level?: number;
  action: EventCondition;
}

/**
 * Check if an event should trigger based on its trigger conditions
 *
 * @param event - Event to check
 * @param context - Current game context
 * @returns true if this event passes all trigger conditions
 */
function passesEventTrigger(event: GameEvent, context: EventCheckContext): boolean {
  const { trigger } = event;

  // Check level condition
  if (trigger.level !== undefined) {
    if (Array.isArray(trigger.level)) {
      if (!trigger.level.includes(context.level ?? -1)) {
        return false;
      }
    } else {
      if (trigger.level !== context.level) {
        return false;
      }
    }
  }

  // Check action/condition match
  if (trigger.condition && trigger.condition !== context.action) {
    return false;
  }

  // Check probability
  if (trigger.probability !== undefined) {
    if (Math.random() > trigger.probability) {
      return false;
    }
  }

  return true;
}

/**
 * Check for and select a random event from catalog that matches context
 * Returns first event that passes all trigger conditions
 *
 * @param catalog - Map of event ID to GameEvent
 * @param context - Current game context
 * @returns Matching event or null
 */
export function checkForEvents(
  catalog: Record<string, GameEvent>,
  context: EventCheckContext
): GameEvent | null {
  const events = Object.values(catalog);

  // Shuffle to avoid always picking first matching event
  const shuffledEvents = [...events].sort(() => Math.random() - 0.5);

  for (const event of shuffledEvents) {
    if (passesEventTrigger(event, context)) {
      return event;
    }
  }

  return null;
}
