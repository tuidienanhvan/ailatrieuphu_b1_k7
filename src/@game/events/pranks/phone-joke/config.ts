
import { GameEvent } from '../../core/types';

export const PHONE_JOKE_EVENT: GameEvent = {
    id: 'phone_joke',
    type: 'funny',
    trigger: { condition: 'on_lifeline', probability: 0.5 },
    message: 'Xin lỗi, số bạn gọi hiện không liên lạc được...',
    duration: 2000,
    afterEffect: 'continue'
};
