/**
 * Theme System Types
 */

import React from 'react';

/**
 * Generic theme token map — each theme defines its own token keys/values.
 * Hub can override any token at runtime.
 */
export type ThemeTokens = Record<string, string>;

/**
 * Generic asset ID — each theme defines its own asset keys.
 */
export type AssetId = string;

// ============================================================================
// PROPS INTERFACES
// ============================================================================

export interface WelcomeScreenProps {
    onStart: () => void;
}

export interface ResultScreenProps {
    isVictory: boolean;
    isTierComplete?: boolean;
    tierNumber?: number;
    prize: string;
    onReset: () => void;
    onContinue?: () => void;
}

export interface SidebarPrizesProps {
    prizes: any[];
    currentLevel: number;
    currentTier: 1 | 2 | 3;
}

export interface AnswerGridProps {
    hiddenAnswers: number[];
    selectedAnswer: number | null;
    answerState: 'default' | 'correct' | 'wrong';
    onSelect: (idx: number) => void;
    hideContent?: boolean;
}

export interface QuestionBoardProps {
    timer: number;
    maxDuration: number;
    hideContent?: boolean;
}

export interface TopHudProps {
    lifelineHandlers: {
        onFiftyFifty: () => void;
        onPhone: () => void;
        onAudience: () => void;
        onAskAI: () => void;
        onChangeQuestion: () => void;
    };
    onStopGame: () => void;
}

export interface ShopHeaderProps {
    balance: number;
    onBack: () => void;
}

export interface ShopItemCardProps {
    item: any;
    onSelect: (item: any) => void;
    onBuy: (item: any) => void;
}

export interface PurchaseModalProps {
    isOpen: boolean;
    item: any | null;
    balance: number;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface HistoryTabsProps {
    activeTab: 'matches' | 'purchases';
    onTabChange: (tab: 'matches' | 'purchases') => void;
}

export interface MatchHistoryItemProps {
    record: any;
}

export interface PurchaseHistoryItemProps {
    record: any;
}

export interface PhoneModalProps {
    isOpen: boolean;
    onSelect: (helperId: string) => void;
    onClose: () => void;
}

export interface AudienceModalProps {
    isOpen: boolean;
    animatedStats: number[];
    onClose: () => void;
}

export interface AIConsultModalProps {
    isOpen: boolean;
    isThinking: boolean;
    displayText: string;
    isExpert?: boolean;
    onClose: () => void;
}

export interface MessageModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

export interface StopGameModalProps {
    isOpen: boolean;
    amount: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface GameHeaderProps {
    gameState: any;
    isFullscreen: boolean;
    stats: { playCount: number; bestScore: number };
    userName: string;
    balance: number;
    onFullscreen: () => void;
    onOpenShop: () => void;
}

// ============================================================================
// THEME INTERFACE
// ============================================================================

export interface Theme {
    id: string;
    name: string;
    description: string;

    WelcomeScreen: React.FC<WelcomeScreenProps>;
    PlayScreen: React.FC;
    ResultScreen: React.FC<ResultScreenProps>;
    ShopScreen: React.FC;
    HistoryScreen: React.FC;
    Background: React.FC;

    SidebarPrizes: React.FC<SidebarPrizesProps>;
    AnswerGrid: React.FC<AnswerGridProps>;
    QuestionBoard: React.FC<QuestionBoardProps>;
    TopHud: React.FC<TopHudProps>;

    ShopHeader: React.FC<ShopHeaderProps>;
    ShopItemCard: React.FC<ShopItemCardProps>;
    PurchaseModal: React.FC<PurchaseModalProps>;

    HistoryTabs: React.FC<HistoryTabsProps>;
    MatchHistoryItem: React.FC<MatchHistoryItemProps>;
    PurchaseHistoryItem: React.FC<PurchaseHistoryItemProps>;

    PhoneModal: React.FC<PhoneModalProps>;
    AudienceModal: React.FC<AudienceModalProps>;
    AIConsultModal: React.FC<AIConsultModalProps>;
    MessageModal: React.FC<MessageModalProps>;
    StopGameModal: React.FC<StopGameModalProps>;

    // Layout
    GameHeader: React.FC<GameHeaderProps>;
}

export interface ThemePackage {
    metadata: {
        id: string;
        name: string;
        description: string;
    };
    components: Theme;
    tokens: ThemeTokens;
    assets: Record<string, AssetId>;
}

export type ThemeRegistry = {
    [key in 1 | 2 | 3]: ThemePackage;
};
