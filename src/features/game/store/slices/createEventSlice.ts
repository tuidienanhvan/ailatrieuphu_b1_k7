import { StateCreator } from 'zustand';
import { GameEvent } from '../../events/core/types';
import { checkForEvents } from '../../events/core/event-manager';

export interface EventSlice {
    // State
    activeEvent: GameEvent | null;
    activeBuffs: string[]; // Placeholder for future features (e.g., 'x2_xp', 'shield')

    // Actions
    triggerEvent: (level: number, action: 'on_correct' | 'on_wrong' | 'on_timeout' | 'on_lifeline' | 'on_start') => GameEvent | null;
    clearEvent: () => void;
    addBuff: (buffId: string) => void;
}

export const createEventSlice: StateCreator<EventSlice> = (set, get) => ({
    activeEvent: null,
    activeBuffs: [],

    triggerEvent: (level, action) => {
        const event = checkForEvents({ level, action });

        if (event) {
            console.log('🎉 Global Event Triggered:', event.id);
            set({ activeEvent: event });

            // Auto clear if duration > 0 (handled here centrally)
            if (event.duration > 0) {
                setTimeout(() => {
                    // Only clear if it's still the same event (avoid race conditions)
                    if (get().activeEvent?.id === event.id) {
                        set({ activeEvent: null });
                    }
                }, event.duration);
            }
        }

        return event;
    },

    clearEvent: () => set({ activeEvent: null }),

    addBuff: (buffId) => set((state) => ({
        activeBuffs: [...state.activeBuffs, buffId]
    })),
});
