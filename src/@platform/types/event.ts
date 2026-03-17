/**
 * @platform/types/event.ts
 * Event system types for game events and triggers
 */

/**
 * Conditions that trigger event checks
 */
export type EventCondition = 'on_correct' | 'on_wrong' | 'on_timeout' | 'on_lifeline' | 'on_start';

/**
 * Event type categories
 */
export type EventType = 'funny' | 'special' | 'reward' | 'penalty';

/**
 * Effect to apply after event display
 */
export type EventAfterEffect = 'continue' | 'show_real_question' | 'add_bonus';

/**
 * Trigger condition for when an event should check for activation
 */
export interface EventTrigger {
  level?: number | number[];
  probability?: number; // 0-1, probability this event fires if other conditions match
  condition?: EventCondition;
}

/**
 * A game event that can trigger during gameplay
 */
export interface GameEvent {
  id: string;
  type: EventType;
  trigger: EventTrigger;
  message: string;
  duration: number; // milliseconds
  showOverlay?: boolean;
  afterEffect?: EventAfterEffect;
}
