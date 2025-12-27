
import React, { useMemo } from 'react';
import { ShopItem } from '../../types/entities';
import { Check, Lock, ShoppingCart, Layout, Crown, Zap, Moon, DivideCircle, Bot } from 'lucide-react';

interface ShopItemCardProps {
  item: ShopItem;
  isOwned: boolean;
  isEquipped: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onAction: () => void;
  canAfford: boolean;
}

// Icon Map
const ICON_MAP: Record<string, any> = {
  Layout, Crown, Zap, Moon, DivideCircle, Bot
};

export const ShopItemCard: React.FC<ShopItemCardProps> = ({ 
  item, isOwned, isEquipped, isSelected, onSelect, onAction, canAfford 
}) => {
  const Icon = ICON_MAP[item.icon] || Layout;

  const rarityColor = useMemo(() => {
    switch(item.rarity) {
        case 'legendary': return 'text-[#fbbf24] border-[#fbbf24] bg-[#fbbf24]/10';
        case 'epic': return 'text-purple-400 border-purple-400 bg-purple-400/10';
        case 'rare': return 'text-blue-400 border-blue-400 bg-blue-400/10';
        default: return 'text-slate-400 border-slate-400 bg-slate-400/10';
    }
  }, [item.rarity]);

  return (
    <div 
        onClick={onSelect}
        className={`
            group relative flex flex-col cursor-pointer transition-transform duration-300
            ${isSelected ? 'scale-[1.03] z-10' : 'hover:scale-[1.02]'}
        `}
    >
        {/* Glow Effect for Selected */}
        {isSelected && (
            <div className="absolute -inset-1 bg-[#fbbf24] blur-md opacity-40 rounded-xl"></div>
        )}

        {/* MAIN CARD CONTAINER */}
        <div className={`
            relative flex flex-col h-full bg-[#0f172a] rounded-xl overflow-hidden border-2 shadow-2xl
            ${isSelected ? 'border-[#fbbf24]' : 'border-white/10 group-hover:border-white/30'}
        `}>
            
            {/* HEADER / IMAGE AREA */}
            <div className={`h-48 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-800 to-[#0f172a]`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                </div>
                
                {/* Center Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-[50px] rounded-full opacity-40 bg-white`}></div>

                {/* ICON CONTAINER */}
                <div className="relative z-10 p-6 rounded-full border-4 border-[#0f172a] shadow-xl bg-gradient-to-br from-slate-700 to-slate-900">
                    <Icon size={48} className="text-white drop-shadow-lg" />
                </div>

                {/* RARITY BADGE */}
                <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${rarityColor}`}>
                    {item.rarity}
                </div>

                {/* PRICE TAG (Overlay on Image) */}
                {!isOwned && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#fbbf24]/30 backdrop-blur-md">
                        <span className="text-[#fbbf24] font-bold text-xs">$</span>
                        <span className="text-white font-mono font-bold text-sm">{item.price.toLocaleString()}</span>
                    </div>
                )}
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col p-5 bg-[#0f172a]">
                <h3 className="text-xl font-black text-white uppercase leading-tight mb-2 font-sans truncate">{item.name}</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2 mb-6 h-8">{item.description}</p>

                {/* ACTION BUTTON */}
                <div className="mt-auto">
                    {isOwned ? (
                         <div className="w-full py-3 bg-slate-800 border border-slate-600 rounded flex items-center justify-center gap-2 opacity-80 cursor-default">
                             <Check size={16} className="text-green-500" />
                             <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Đã Sở Hữu</span>
                         </div>
                    ) : (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onAction(); }}
                            disabled={!canAfford}
                            className={`
                                w-full py-3 rounded font-black uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2 transition-all shadow-lg
                                ${canAfford 
                                    ? 'bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-black hover:brightness-110 shadow-[0_0_20px_rgba(251,191,36,0.3)]' 
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                }
                            `}
                        >
                            {canAfford ? <ShoppingCart size={14} /> : <Lock size={14} />}
                            {canAfford ? 'Mua Ngay' : 'Thiếu Tiền'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
