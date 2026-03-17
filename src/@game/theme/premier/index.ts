/**
 * Premier Theme - Index
 * Standardized Theme Package for High Configurability
 */

import { Theme, ThemePackage } from '../types';
import { PREMIER_TOKENS } from './tokens';

// Screens
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PlayScreen } from './screens/PlayScreen';
import { ResultScreen } from './screens/ResultScreen';
import { ShopScreen } from './screens/ShopScreen';
import { HistoryScreen } from './screens/HistoryScreen';

// Background
import { Background } from './Background';

// Play Components
import { SidebarPrizes } from './components/play/SidebarPrizes';
import { AnswerGrid } from './components/play/AnswerGrid';
import { QuestionBoard } from './components/play/QuestionBoard';
import { TopHud } from './components/play/TopHud';

// Shop Components
import { ShopHeader } from './components/shop/ShopHeader';
import { ShopItemCard } from './components/shop/ShopItemCard';
import { PurchaseModal } from './components/shop/PurchaseModal';

// History Components
import { HistoryTabButton } from './components/history/HistoryTabButton';
import { ServerHistoryItem } from './components/history/ServerHistoryItem';

// Layout
import { GameHeader } from './components/layout/GameHeader';

// Modals
import { PhoneModal } from './components/play/modals/PhoneModal';
import { AudienceModal } from './components/play/modals/AudienceModal';
import { AIConsultModal } from './components/play/modals/AIConsultModal';
import { MessageModal } from './components/play/modals/MessageModal';
import { StopGameModal } from './components/play/modals/StopGameModal';

// ============================================================================
// THEME COMPONENTS DEFINITION
// ============================================================================

const PremierThemeComponents: Theme = {
    id: 'premier',
    name: 'Premier TV Show',
    description: 'Theme TV Show cổ điển với màu xanh navy và vàng gold',

    WelcomeScreen,
    PlayScreen,
    ResultScreen,
    ShopScreen,
    HistoryScreen,
    Background,
    SidebarPrizes,
    AnswerGrid,
    QuestionBoard,
    TopHud: TopHud as any,
    ShopHeader,
    ShopItemCard: ShopItemCard as any,
    PurchaseModal,
    HistoryTabs: HistoryTabButton as any,
    MatchHistoryItem: ServerHistoryItem as any,
    PurchaseHistoryItem: ServerHistoryItem as any,
    PhoneModal,
    AudienceModal,
    AIConsultModal,
    MessageModal,
    StopGameModal,
    GameHeader: GameHeader as any,
};

// ============================================================================
// THEME PACKAGE EXPORT
// ============================================================================

const PremierTheme: ThemePackage = {
    metadata: {
        id: 'premier',
        name: 'Premier TV Show',
        description: 'Mặc định - Phong cách truyền hình chuyên nghiệp',
    },
    components: PremierThemeComponents,
    tokens: PREMIER_TOKENS,
    assets: {
        'prize': 'prize-crown',
        'milestone': 'milestone-shield',
        'jackpot': 'jackpot-royal-crown'
    }
};

export default PremierTheme;

// Named exports for backward compatibility
export {
    WelcomeScreen,
    PlayScreen,
    ResultScreen,
    ShopScreen,
    HistoryScreen,
    Background,
};
