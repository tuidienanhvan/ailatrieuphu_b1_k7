
import React from 'react';
import { Trophy, Maximize, Minimize, User, ShoppingBag, Wallet, X } from 'lucide-react';
import { GameState } from '../types/common';
import { useGameHeader } from '../hooks/useGameHeader';

interface HeaderProps {
  gameState: GameState;
  isFullscreen: boolean;
  stats: { playCount: number, bestScore: number };
  userName: string;
  balance: number;
  onFullscreen: () => void;
  onOpenShop: () => void;
}

// 4. React.memo Optimization
export const GameHeader: React.FC<HeaderProps> = React.memo(({ isFullscreen, stats, userName, balance, gameState, onFullscreen, onOpenShop }) => {
  const { displayUserName } = useGameHeader(userName);
  const isShopActive = gameState === GameState.SHOP;

  return (
    <div className="h-24 pl-8 pr-6 flex items-center bg-[#020617] border-b-[3px] border-yellow-500/60 shrink-0 select-none relative z-50 shadow-2xl">
      
      {/* 1. LOGO SECTION */}
      <div className="flex items-center gap-5 shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
        {/* 
           LOGO CONTAINER: Gold Gradient Background 
           TEXT COLOR: Dark Bronze (#451a03) -> Logo sẽ ăn theo màu này nhờ currentColor
        */}
        <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.4)] border border-yellow-300 flex items-center justify-center text-[#451a03]">
          <div 
            className="w-10 h-10 bg-current transition-colors duration-300"
            style={{
                maskImage: `url(https://piai-embed-engine.vercel.app/public/logo-optimized.svg)`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: `url(https://piai-embed-engine.vercel.app/public/logo-optimized.svg)`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
            }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold tracking-[0.3em] text-blue-400 uppercase leading-none mb-1 shadow-black drop-shadow-md">PiStudy</span>
          {/* FIXED: Changed leading-none to leading-tight and added pb-1 to prevent accent clipping */}
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 tracking-wider uppercase leading-tight pb-1 drop-shadow-lg">
            AI LÀ TRIỆU PHÚ
          </span>
        </div>
      </div>

      {/* 2. USER STATS SECTION */}
      <div className="ml-12 flex items-center gap-4 text-base font-bold uppercase tracking-wider">
        {/* User Name */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-full border ${userName ? 'bg-blue-900/20 border-blue-500/30 text-blue-200' : 'bg-white/5 border-white/10 text-slate-400'}`}>
          <div className="p-1.5 bg-blue-600/20 rounded-full">
            <User size={18} />
          </div>
          <span className="max-w-[150px] truncate normal-case font-medium text-lg">{displayUserName}</span>
        </div>

        {/* Play Count - Always Visible */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-300">
          <span className="text-slate-500 text-xs font-bold">Lượt:</span>
          <span className="text-blue-400 font-mono text-lg leading-none">{stats.playCount}</span>
        </div>

        {/* High Score - Always Visible */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-300">
          <Trophy size={14} className="text-yellow-500" />
          <span className="text-slate-500 text-xs font-bold">Kỷ lục:</span>
          <span className="text-yellow-500 font-mono text-lg leading-none">{stats.bestScore}</span>
        </div>
      </div>

      {/* 3. RIGHT SECTION: SHOP & UTILS */}
      <div className="ml-auto flex items-center gap-4 h-full py-4">
        
        {/* MONEY & SHOP BUTTON GROUP */}
        <div className={`
            flex items-center p-1 rounded-xl border transition-all duration-300 group
            ${isShopActive 
                ? 'bg-[#fbbf24]/10 border-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,0.2)]' 
                : 'bg-white/5 border-white/10 hover:border-[#fbbf24]/50'
            }
        `}>
            {/* Balance Display */}
            <div className="flex flex-col items-end px-4 border-r border-white/10 mr-1">
                <span className="text-[10px] text-[#fbbf24] font-bold uppercase tracking-wider leading-none mb-1">Tài khoản</span>
                <div className="flex items-center gap-2">
                    <Wallet size={16} className="text-[#fbbf24]" />
                    <span className="text-xl font-black text-white font-mono leading-none tracking-tight">
                        {balance.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Shop Button */}
            <button 
                onClick={onOpenShop}
                className={`
                    relative px-5 py-2 rounded-lg font-black uppercase tracking-wider flex items-center gap-2 transition-all overflow-hidden
                    ${isShopActive 
                        ? 'bg-[#fbbf24] text-black hover:bg-white' 
                        : 'hover:bg-[#fbbf24] hover:text-black text-slate-300'
                    }
                `}
            >
                {isShopActive ? <X size={18} strokeWidth={3} /> : <ShoppingBag size={18} strokeWidth={2.5} />}
                <span>{isShopActive ? 'Đóng' : 'Cửa Hàng'}</span>
                
                {/* Plus Icon Badge */}
                {!isShopActive && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
            </button>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-10 bg-white/10 mx-2"></div>

        {/* Fullscreen Button */}
        <button 
          onClick={onFullscreen} 
          className="w-12 h-12 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
          title="Toàn màn hình"
        >
          {isFullscreen ? <Minimize size={24} strokeWidth={2} /> : <Maximize size={24} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
});
