
import React from 'react';
import { Zap, Star, Layout } from 'lucide-react';
import { ShopItemCard } from '../features/game/components/shop/ShopItemCard';
import { PurchaseModal } from '../features/game/components/shop/PurchaseModal';
import { ShopHeader } from '../features/game/components/shop/ShopHeader';

// New Hooks
import { useShopScreen } from '../features/game/hooks/shop/useShopScreen';
import { usePurchaseModal } from '../features/game/hooks/shop/usePurchaseModal';

export const ShopScreen: React.FC = () => {
    // 1. Logic danh sách, tab & điều hướng
    const { items, activeTab, selectedItemId, setActiveTab, handleSelectItem, handleBack } = useShopScreen();

    // 2. Logic mua hàng & modal & số dư
    const { isOpen, itemToBuy, balance, openBuyModal, closeBuyModal, confirmPurchase } = usePurchaseModal();

    return (
        <div className="flex-1 flex flex-col w-full h-full relative overflow-hidden animate-fade-in bg-[#020617] select-none">

            {/* --- BACKGROUND LAYER (Studio Theme) --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Main Radial Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e3a8a_0%,#020617_60%,#000000_100%)] opacity-60"></div>

                {/* Floor Reflection/Glow */}
                <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-[#fbbf24]/5 to-transparent"></div>

                {/* Hex Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                        backgroundSize: '100px 100px'
                    }}>
                </div>
            </div>

            {/* --- HEADER --- */}
            <ShopHeader balance={balance} onBack={handleBack} />

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex relative z-10 overflow-hidden">

                {/* SIDEBAR (Danh mục) */}
                <div className="w-80 bg-[#0f172a]/80 backdrop-blur-md border-r border-[#fbbf24]/10 flex flex-col pt-8">
                    <div className="px-8 mb-6">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Danh mục</span>
                    </div>

                    <div className="flex flex-col gap-2 px-4">
                        {/* LIFELINES TAB */}
                        <button
                            onClick={() => setActiveTab('lifeline')}
                            className={`
                            relative flex items-center gap-4 px-6 py-5 rounded transition-all group overflow-hidden
                            ${activeTab === 'lifeline'
                                    ? 'bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-black shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }
                        `}
                        >
                            <Zap size={20} className={activeTab === 'lifeline' ? 'text-black' : 'text-slate-500 group-hover:text-white'} />
                            <span className="font-black uppercase tracking-wider text-sm">Trợ Giúp</span>

                            {activeTab === 'lifeline' && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full animate-pulse"></div>
                            )}
                        </button>

                        {/* SKINS TAB */}
                        <button
                            onClick={() => setActiveTab('skin')}
                            className={`
                            relative flex items-center gap-4 px-6 py-5 rounded transition-all group overflow-hidden
                            ${activeTab === 'skin'
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }
                        `}
                        >
                            <Layout size={20} className={activeTab === 'skin' ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
                            <span className="font-black uppercase tracking-wider text-sm">Giao Diện</span>

                            {activeTab === 'skin' && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            )}
                        </button>
                    </div>

                    <div className="mt-auto p-8 opacity-50">
                        <div className="flex flex-col items-center text-center gap-2 border-t border-white/10 pt-6">
                            <Star size={24} className="text-[#fbbf24]" />
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Premium Items Only</span>
                        </div>
                    </div>
                </div>

                {/* ITEM GRID */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-12 bg-black/20">
                    <div className="grid grid-cols-3 gap-10 pb-20 max-w-6xl mx-auto">
                        {items.map((item) => (
                            <ShopItemCard
                                key={item.id}
                                item={item}
                                isSelected={selectedItemId === item.id}
                                onSelect={() => handleSelectItem(item)}
                                onBuyRequest={openBuyModal}
                            />
                        ))}
                    </div>
                </div>

            </div>

            <PurchaseModal
                isOpen={isOpen}
                item={itemToBuy}
                balance={balance}
                onConfirm={confirmPurchase}
                onCancel={closeBuyModal}
            />
        </div>
    );
};
