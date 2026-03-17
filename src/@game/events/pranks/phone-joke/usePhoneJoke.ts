import { useCallback } from 'react';
import { useGameStore } from '../../../store/useGameStore';
import { GameEvent } from '../../core/types';

export const usePhoneJoke = () => {
    const openModal = useGameStore(s => s.openModal);

    const executePhonePrank = useCallback((personName: string, event: GameEvent) => {
        openModal('message', {
            phoneTitle: `Gọi cho ${personName}`,
            phoneMessage: event.message
        });
    }, [openModal]);

    return { executePhonePrank };
};
