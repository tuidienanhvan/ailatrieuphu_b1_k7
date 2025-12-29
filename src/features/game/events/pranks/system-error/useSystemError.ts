import { useState, useEffect } from 'react';
import { useGameStore } from '../../../store/useGameStore';

export const useSystemError = () => {
    const activeEvent = useGameStore(s => s.activeEvent);
    const [glitchStage, setGlitchStage] = useState<'init' | 'black_screen' | 'glitch_ui'>('init');

    useEffect(() => {
        if (activeEvent?.id === 'system_error') {
            const t1 = setTimeout(() => setGlitchStage('black_screen'), 2000); // 2s đầu hiện bình thường
            const t2 = setTimeout(() => setGlitchStage('glitch_ui'), 7000);    // Sau đó 5s màn hình đen (tổng 7s)

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                setGlitchStage('init');
            };
        } else {
            setGlitchStage('init');
        }
    }, [activeEvent?.id]);

    const showSystemError = glitchStage === 'black_screen';
    const isGlitched = activeEvent?.id === 'system_error' && glitchStage === 'glitch_ui';

    return { showSystemError, isGlitched };
};
