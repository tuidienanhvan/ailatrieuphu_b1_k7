import { SYSTEM_ERROR_EVENT } from './pranks/system-error/config';
import { PHONE_JOKE_EVENT } from './pranks/phone-joke/config';
import { MILESTONE_CELEBRATION_EVENT } from './rewards/milestone-celebration/config';
import { GameEvent } from './core/types';

export const GAME_EVENTS: Record<string, GameEvent> = {
    [SYSTEM_ERROR_EVENT.id]: SYSTEM_ERROR_EVENT,
    [PHONE_JOKE_EVENT.id]: PHONE_JOKE_EVENT,
    [MILESTONE_CELEBRATION_EVENT.id]: MILESTONE_CELEBRATION_EVENT,
};
