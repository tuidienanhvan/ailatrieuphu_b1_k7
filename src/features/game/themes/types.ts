/**
 * Theme System Types
 * Định nghĩa interface cho tất cả components trong một theme
 */

import React from 'react';

// ============================================================================
// PROPS INTERFACES
// ============================================================================

// Welcome Screen Props
export interface WelcomeScreenProps {
    onStart: () => void;
}

// Result Screen Props
export interface ResultScreenProps {
    isVictory: boolean;
    isTierComplete?: boolean;
    tierNumber?: number;
    prize: string;
    onReset: () => void;
    onContinue?: () => void;
}

// Play Components Props
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

// Shop Components Props
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

// History Components Props
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

// Modal Props
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

// ============================================================================
// THEME INTERFACE
// ============================================================================

export interface Theme {
    // Theme metadata
    id: string;
    name: string;
    description: string;

    // Screens (5 screens)
    WelcomeScreen: React.FC<WelcomeScreenProps>;
    PlayScreen: React.FC;
    ResultScreen: React.FC<ResultScreenProps>;
    ShopScreen: React.FC;
    HistoryScreen: React.FC;

    // Background
    Background: React.FC;

    // Play Components
    SidebarPrizes: React.FC<SidebarPrizesProps>;
    AnswerGrid: React.FC<AnswerGridProps>;
    QuestionBoard: React.FC<QuestionBoardProps>;
    TopHud: React.FC<TopHudProps>;

    // Shop Components
    ShopHeader: React.FC<ShopHeaderProps>;
    ShopItemCard: React.FC<ShopItemCardProps>;
    PurchaseModal: React.FC<PurchaseModalProps>;

    // History Components
    HistoryTabs: React.FC<HistoryTabsProps>;
    MatchHistoryItem: React.FC<MatchHistoryItemProps>;
    PurchaseHistoryItem: React.FC<PurchaseHistoryItemProps>;

    // Modals
    PhoneModal: React.FC<PhoneModalProps>;
    AudienceModal: React.FC<AudienceModalProps>;
    AIConsultModal: React.FC<AIConsultModalProps>;
    MessageModal: React.FC<MessageModalProps>;
    StopGameModal: React.FC<StopGameModalProps>;
}

// ============================================================================
// THEME REGISTRY TYPE
// ============================================================================

export type ThemeRegistry = {
    [key in 1 | 2 | 3]: Theme;
};
