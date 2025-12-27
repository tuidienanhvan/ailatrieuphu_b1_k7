
import React from 'react';
import { ArrowLeft, Wallet, Zap, Star } from 'lucide-react';
import { useGameStore } from '../features/game/store/useGameStore';
import { useShop } from '../features/game/hooks/shop/useShop';
import { GameState } from '../features/game/types/common';
import { ShopItemCard } from '../features/game/components/shop/ShopItemCard';
import { PurchaseModal } from '../features/game/components/shop/PurchaseModal';

export const ShopScreen: React.FC = () => {
  const setGameState = useGameStore(s => s.setGameState);
  const { 
      items, userInfo, activeTab, selectedItem, purchaseModalOpen,
      setActiveTab, handleSelectItem, handleBuy, confirmPurchase, setPurchaseModalOpen 
  } = useShop();

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

        {/* --- SUB-HEADER (Navigation & Balance) --- */}
        <div className="relative z-20 h-20 flex items-center justify-between px-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-b border-[#fbbf24]/30 shadow-lg">
            
            <button 
                onClick={() => setGameState(GameState.WELCOME)}
                className="group flex items-center gap-3 px-6 py-3 rounded bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
                <div className="p-1 rounded-full bg-slate-800 group-hover:bg-[#fbbf24] transition-colors">
                    <ArrowLeft size={20} className="text-slate-400 group-hover:text-black" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 group-hover:text-white">Quay lại</span>
            </button>

            <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white uppercase tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    Cửa Hàng <span className="text-[#fbbf24]">Vật Phẩm</span>
                </span>
            </div>

            <div className="flex items-center gap-4 bg-black/40 px-6 py-2 rounded-lg border border-[#fbbf24]/30 shadow-inner">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#fbbf24] font-bold uppercase tracking-wider">Số dư khả dụng</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white font-mono">{userInfo.balance.toLocaleString()}</span>
                        <span className="text-sm text-[#fbbf24] font-bold">$</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#b45309] flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.4)] border border-[#fef3c7]">
                    <Wallet size={20} className="text-black" />
                </div>
            </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 flex relative z-10 overflow-hidden">
            
            {/* SIDEBAR (Danh mục) */}
            <div className="w-80 bg-[#0f172a]/80 backdrop-blur-md border-r border-[#fbbf24]/10 flex flex-col pt-8">
                <div className="px-8 mb-6">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Danh mục</span>
                </div>
                
                <div className="flex flex-col gap-2 px-4">
                    {/* Chỉ hiển thị tab Trợ Giúp như yêu cầu */}
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
                        
                        {/* Active Indicator */}
                        {activeTab === 'lifeline' && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full animate-pulse"></div>
                        )}
                    </button>
                    
                    {/* Các tab khác có thể thêm lại ở đây nếu cần */}
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
                            isOwned={userInfo.inventory.includes(item.id)}
                            isEquipped={userInfo.equippedSkin === item.id}
                            isSelected={selectedItem?.id === item.id}
                            onSelect={() => handleSelectItem(item)}
                            onAction={handleBuy}
                            canAfford={userInfo.balance >= item.price}
                        />
                    ))}
                </div>
            </div>

        </div>

        <PurchaseModal 
            isOpen={purchaseModalOpen}
            item={selectedItem}
            balance={userInfo.balance}
            onConfirm={confirmPurchase}
            onCancel={() => setPurchaseModalOpen(false)}
        />
    </div>
  );
};
