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
    }
];

/**
 * Lấy theme theo level hiện tại (0-indexed)
 */
export function getTierByLevel(level: number): TierTheme {
    return TIER_THEMES[0];
}

/**
 * Lấy tier ID theo level (0-indexed)
 */
export function getTierIdByLevel(level: number): 1 | 2 | 3 {
    return 1;
}
