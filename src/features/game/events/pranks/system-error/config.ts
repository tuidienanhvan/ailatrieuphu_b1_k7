
import { GameEvent } from '../../core/types';

export const SYSTEM_ERROR_EVENT: GameEvent = {
    id: 'system_error',
    type: 'funny',
    trigger: { level: [5, 10], probability: 0.001, condition: 'on_start' },
    message: 'Oops! Mất câu hỏi rồi...',
    duration: 3000,
    showOverlay: false,
    afterEffect: 'show_real_question'
};
