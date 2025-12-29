import { useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { audioManager } from '../../utils/audio-manager';

export const useGameEvents = () => {
    // Select state/actions from store
    const activeEvent = useGameStore(s => s.activeEvent);
    const triggerEvent = useGameStore(s => s.triggerEvent);
    const clearEvent = useGameStore(s => s.clearEvent);

    const triggerEventCheck = useCallback((level: number, action: 'on_correct' | 'on_wrong' | 'on_timeout' | 'on_lifeline' | 'on_start') => {
        const event = triggerEvent(level, action);

        if (event) {
            // Play sound logic (kept here or moved to store middleware/subscriber later)
            if (event.type === 'funny' || event.type === 'reward') {
                // audioManager.play('event_sound'); 
            }
        }
        return event;
    }, [triggerEvent]);

    return { activeEvent, triggerEventCheck, clearEvent };
};
