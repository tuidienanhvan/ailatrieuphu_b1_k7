/**
 * Premier Theme - Index
 * Export tất cả components của Premier theme
 */

import { Theme } from '../types';

// Screens
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PlayScreen } from './screens/PlayScreen';
import { ResultScreen } from './screens/ResultScreen';
import { ShopScreen } from './screens/ShopScreen';
import { HistoryScreen } from './screens/HistoryScreen';

// Background
import { Background } from './Background';

// Play Components - từ themed components
import { SidebarPrizes } from './components/play/SidebarPrizes';
import { AnswerGrid } from './components/play/AnswerGrid';
import { QuestionBoard } from './components/play/QuestionBoard';
import { TopHud } from './components/play/TopHud';

// Shop Components - từ themed components
import { ShopHeader } from './components/shop/ShopHeader';
import { ShopItemCard } from './components/shop/ShopItemCard';
import { PurchaseModal } from './components/shop/PurchaseModal';

// History Components - từ themed components
import { HistoryTabButton } from './components/history/HistoryTabButton';
import { ServerHistoryItem } from './components/history/ServerHistoryItem';
import { HistoryStatsSidebar } from './components/history/HistoryStatsSidebar';

// Modals - từ themed components
import { PhoneModal } from './components/play/modals/PhoneModal';
import { AudienceModal } from './components/play/modals/AudienceModal';
import { AIConsultModal } from './components/play/modals/AIConsultModal';
import { MessageModal } from './components/play/modals/MessageModal';
import { StopGameModal } from './components/play/modals/StopGameModal';

// ============================================================================
// PREMIER THEME DEFINITION
// ============================================================================

const PremierTheme: Theme = {
    // Metadata
    id: 'premier',
    name: 'Premier TV Show',
    description: 'Theme TV Show cổ điển với màu xanh navy và vàng gold',

    // Screens
    WelcomeScreen,
    PlayScreen,
    ResultScreen,
    ShopScreen,
    HistoryScreen,

    // Background
    Background,

    // Play Components
    SidebarPrizes,
    AnswerGrid,
    QuestionBoard,
    TopHud,

    // Shop Components
    ShopHeader,
    ShopItemCard,
    PurchaseModal,

    // History Components
    HistoryTabs: HistoryTabButton as any,
    MatchHistoryItem: ServerHistoryItem as any,
    PurchaseHistoryItem: ServerHistoryItem as any,

    // Modals
    PhoneModal,
    AudienceModal,
    AIConsultModal,
    MessageModal,
    StopGameModal,
};

export default PremierTheme;

// Named exports
export {
    WelcomeScreen,
    PlayScreen,
    ResultScreen,
    ShopScreen,
    HistoryScreen,
    Background,
};
