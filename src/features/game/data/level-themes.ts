/**
 * Level Theme Configuration
 * Định nghĩa theme màu sắc và gameplay config cho mỗi tier (1-3)
 */

import React from 'react';

export interface TierTheme {
    id: 1 | 2 | 3;
    name: string;
    description: string;

    // Level range (0-indexed)
    startLevel: number;
    endLevel: number;

    // Styling
    primaryGradient: string;
    accentColor: string;
    glowColor: string;

    // Gameplay
    timerDuration: number;

    // Optional custom background effect component
    BackgroundEffect?: React.FC;
}

export const TIER_THEMES: TierTheme[] = [
    {
        id: 1,
        name: 'Khởi Động',
        description: 'Làm quen với trò chơi',
        startLevel: 0,
        endLevel: 14,
        primaryGradient: 'linear-gradient(180deg, #0d1b2a 0%, #1b263b 50%, #000000 100%)',
        accentColor: '#3b82f6',
        glowColor: 'rgba(59, 130, 246, 0.3)',
        timerDuration: 30,
    },
    {
        id: 2,
        name: 'Thử Thách',
        description: 'Độ khó tăng lên',
        startLevel: 15,
        endLevel: 29,
        primaryGradient: 'linear-gradient(180deg, #2d1b69 0%, #4a148c 50%, #1a0033 100%)',
        accentColor: '#a855f7',
        glowColor: 'rgba(168, 85, 247, 0.3)',
        timerDuration: 25,
    },
    {
        id: 3,
        name: 'Đỉnh Cao',
        description: 'Thử thách cuối cùng',
        startLevel: 30,
        endLevel: 44,
        primaryGradient: 'linear-gradient(180deg, #1a0000 0%, #7f1d1d 50%, #450a0a 100%)',
        accentColor: '#ef4444',
        glowColor: 'rgba(239, 68, 68, 0.3)',
        timerDuration: 20,
    },
];

/**
 * Lấy theme theo level hiện tại (0-indexed)
 */
export function getTierByLevel(level: number): TierTheme {
    const tier = TIER_THEMES.find(t => level >= t.startLevel && level <= t.endLevel);
    return tier || TIER_THEMES[0];
}

/**
 * Lấy tier ID theo level (0-indexed)
 */
export function getTierIdByLevel(level: number): 1 | 2 | 3 {
    if (level < 15) return 1;
    if (level < 30) return 2;
    return 3;
}

/**
 * Kiểm tra xem level có phải là tier milestone không (cuối tier)
 */
export function isTierMilestone(level: number): boolean {
    return level === 14 || level === 29 || level === 44;
}

/**
 * Lấy tier tiếp theo sau milestone
 */
export function getNextTier(currentTier: 1 | 2 | 3): TierTheme | null {
    if (currentTier >= 3) return null;
    return TIER_THEMES.find(t => t.id === currentTier + 1) || null;
}
