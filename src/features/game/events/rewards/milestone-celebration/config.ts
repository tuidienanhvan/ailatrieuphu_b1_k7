
import { GameEvent } from '../../core/types';

export const MILESTONE_CELEBRATION_EVENT: GameEvent = {
    id: 'milestone_celebration',
    type: 'reward',
    trigger: { level: 10, condition: 'on_correct' },
    message: '🎉 Chúc mừng! Bạn đã vượt qua mốc an toàn!',
    duration: 3000,
    afterEffect: 'continue'
};
