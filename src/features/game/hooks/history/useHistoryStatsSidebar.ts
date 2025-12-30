import { useMemo } from 'react';
import { UserInfo, ServerHistoryRecord } from '../../types/entities';

export interface HistoryStats {
    totalPlayed: number;
    totalWin: number;
    totalPrize: number;
    totalPurchases: number;
    totalSpent: number;
}

export const useHistoryStatsSidebar = (serverHistory: ServerHistoryRecord[]) => {
    const stats = useMemo<HistoryStats>(() => {
        if (!serverHistory || serverHistory.length === 0) {
            return {
                totalPlayed: 0,
                totalWin: 0,
                totalPrize: 0,
                totalPurchases: 0,
                totalSpent: 0
            };
        }

        const results = serverHistory.filter(h => h.msgtype === 'RESULT');
        const purchases = serverHistory.filter(h => h.msgtype === 'PURCHASE');

        return {
            totalPlayed: results.length,
            totalWin: results.filter(h => h.payload?.result === 'victory').length,
            totalPrize: results.reduce((acc, curr) => acc + (curr.payload?.score || 0), 0),
            totalPurchases: purchases.length,
            totalSpent: purchases.reduce((acc, curr) => acc + (curr.payload?.price || 0), 0)
        };
    }, [serverHistory]);

    const winRate = stats.totalPlayed > 0 ? Math.round((stats.totalWin / stats.totalPlayed) * 100) : 0;

    return { stats, winRate };
};
