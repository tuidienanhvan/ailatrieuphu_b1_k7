import { useMemo } from 'react';
import { ServerHistoryRecord } from '../../types/entities';

interface UseResultHistoryItemProps {
    record: ServerHistoryRecord;
}

interface UseResultHistoryItemReturn {
    result: string;
    isVictory: boolean;
    isStop: boolean;
    level: number;
    score: number;
    xp: number;
    coin: number;
    playDuration: number | null;
    timeStr: string;
    formattedDuration: string | null;
    // Theme
    borderColor: string;
    accentColor: string;
    bgGradient: string;
    statusText: string;
}

export const useResultHistoryItem = ({ record }: UseResultHistoryItemProps): UseResultHistoryItemReturn => {
    const { result, level, score, xp, coin, playDuration } = record.payload || {};

    const isVictory = result === 'victory';
    const isStop = result === 'stop';

    const timeStr = useMemo(() => {
        const date = new Date(record.tsms);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, [record.tsms]);

    const formattedDuration = useMemo(() => {
        if (!playDuration) return null;
        return `${Math.floor(playDuration / 60)}:${String(playDuration % 60).padStart(2, '0')}`;
    }, [playDuration]);

    // Theme based on result
    const theme = useMemo(() => {
        if (isVictory) {
            return {
                borderColor: 'border-[#fbbf24]/40',
                accentColor: '#fbbf24',
                bgGradient: 'from-[#fbbf24]/10 via-transparent to-transparent',
                statusText: 'Chiến Thắng'
            };
        } else if (isStop) {
            return {
                borderColor: 'border-blue-500/40',
                accentColor: '#3b82f6',
                bgGradient: 'from-blue-500/10 via-transparent to-transparent',
                statusText: 'Dừng Cuộc'
            };
        } else {
            return {
                borderColor: 'border-red-500/40',
                accentColor: '#ef4444',
                bgGradient: 'from-red-500/10 via-transparent to-transparent',
                statusText: 'Thất Bại'
            };
        }
    }, [isVictory, isStop]);

    return {
        result: result || 'gameover',
        isVictory,
        isStop,
        level: level || 1,
        score: score || 0,
        xp: xp || 0,
        coin: coin || 0,
        playDuration: playDuration || null,
        timeStr,
        formattedDuration,
        ...theme
    };
};
