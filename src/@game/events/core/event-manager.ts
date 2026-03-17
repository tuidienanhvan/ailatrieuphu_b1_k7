import { GAME_EVENTS } from '../index';
import { EventTrigger, GameEvent } from './types';

export function checkForEvents(context: {
    level?: number;
    action: NonNullable<EventTrigger['condition']>;
}): GameEvent | null {
    const events = Object.values(GAME_EVENTS);

    // Shuffle events to avoid always picking the first one if multiple match
    const shuffledEvents = events.sort(() => 0.5 - Math.random());

    for (const event of shuffledEvents) {
        const { trigger } = event;

        // Check level condition (if specified in trigger)
        // Check level condition (if specified in trigger)
        if (trigger.level !== undefined) {
            if (Array.isArray(trigger.level)) {
                if (!trigger.level.includes(context.level || -1)) continue;
            } else {
                if (trigger.level !== context.level) continue;
            }
        }

        // Check action condition
        if (trigger.condition && trigger.condition !== context.action) {
            continue;
        }

        // Check probability
        if (trigger.probability && Math.random() > trigger.probability) {
            continue;
        }

        // Match found!
        return event;
    }

    return null;
}
