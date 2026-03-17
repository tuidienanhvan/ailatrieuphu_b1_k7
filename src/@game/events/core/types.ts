export interface EventTrigger {
    level?: number | number[];
    probability?: number; // 0-1
    condition?: 'on_correct' | 'on_wrong' | 'on_timeout' | 'on_lifeline' | 'on_start';
}

export interface GameEvent {
    id: string;
    type: 'funny' | 'special' | 'reward' | 'penalty';
    trigger: EventTrigger;
    message: string;
    duration: number; // ms
    showOverlay?: boolean;
    afterEffect?: 'continue' | 'show_real_question' | 'add_bonus';
}
