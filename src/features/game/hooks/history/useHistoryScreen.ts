import { useState, useCallback, useMemo } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { GameState } from '../../types/common';
import { playSound } from '../../utils/audio-manager';

export type HistoryTab = 'all' | 'result' | 'purchase';

export const useHistoryScreen = () => {
    const serverHistory = useGameStore(s => s.userInfo.serverHistory);
    const localHistory = useGameStore(s => s.userInfo.history);
    const setGameState = useGameStore(s => s.setGameState);
    const userInfo = useGameStore(s => s.userInfo);

    // Tab state
    const [activeTab, setActiveTab] = useState<HistoryTab>('all');

    const handleBack = useCallback(() => {
        playSound('select');
        setGameState(GameState.WELCOME);
    }, [setGameState]);

    const handleTabChange = useCallback((tab: HistoryTab) => {
        playSound('select');
        setActiveTab(tab);
    }, []);

    // Filtered history based on active tab
    const filteredHistory = useMemo(() => {
        if (!serverHistory || serverHistory.length === 0) return [];

        switch (activeTab) {
            case 'result':
                return serverHistory.filter(h => h.msgtype === 'RESULT');
            case 'purchase':
                return serverHistory.filter(h => h.msgtype === 'PURCHASE');
            default:
                return serverHistory;
        }
    }, [serverHistory, activeTab]);

    // Count cho mỗi tab
    const tabCounts = useMemo(() => ({
        all: serverHistory?.length || 0,
        result: serverHistory?.filter(h => h.msgtype === 'RESULT').length || 0,
        purchase: serverHistory?.filter(h => h.msgtype === 'PURCHASE').length || 0
    }), [serverHistory]);

    return {
        history: filteredHistory,
        localHistory,
        serverHistory,
        userInfo,
        activeTab,
        tabCounts,
        handleBack,
        handleTabChange
    };
};
