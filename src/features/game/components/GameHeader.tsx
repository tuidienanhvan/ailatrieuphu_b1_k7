
import React from 'react';
import { Trophy, Maximize, Minimize, User, ShoppingBag, Wallet, X, History } from 'lucide-react';
import { GameState } from '../types/common';
import { useGameHeader } from '../hooks/useGameHeader';
import { useGameStore } from '../store/useGameStore';

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
  const isHistoryActive = gameState === GameState.HISTORY;

  const setGameState = useGameStore(s => s.setGameState);

  const handleToggleHistory = () => {
    if (gameState === GameState.HISTORY) {
      setGameState(GameState.WELCOME);
    } else if ([GameState.WELCOME, GameState.GAME_OVER, GameState.VICTORY].includes(gameState)) {
      setGameState(GameState.HISTORY);
    }
  };

  return (
    <div className="h-24 pl-8 flex items-center bg-[#020617] border-b-[3px] border-yellow-500/60 shrink-0 select-none relative z-50 shadow-2xl overflow-hidden">

      {/* 1. LOGO SECTION */}
      <div className="flex items-center gap-5 shrink-0 cursor-pointer mr-12" onClick={() => window.location.reload()}>
        {/* 
           LOGO CONTAINER
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
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 tracking-wider uppercase leading-tight pb-1 drop-shadow-lg">
            AI LÀ TRIỆU PHÚ
          </span>
        </div>
      </div>

      {/* 2. USER STATS SECTION */}
      <div className="flex items-center gap-4 text-base font-bold uppercase tracking-wider">
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
      <div className="ml-auto flex items-center h-full">

        {/* HISTORY BUTTON */}
        <div className="flex items-center h-full border-r border-white/10 px-4">
          <button
            onClick={handleToggleHistory}
            className={`
                    relative px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-sm
                    flex items-center gap-2 transition-all overflow-hidden border
                    ${isHistoryActive
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30'
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-blue-900/30 hover:text-blue-400 hover:border-blue-500/50'
              }
                `}
            title="Lịch sử hoạt động"
          >
            <History size={18} />
            <span>{isHistoryActive ? 'Đóng' : 'Lịch sử'}</span>
          </button>
        </div>

        {/* MONEY & SHOP BUTTON GROUP */}
        <div className="flex items-center gap-4 py-4 px-6">
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
        </div>

        {/* Divider */}
        <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

        {/* 3. FULLSCREEN BUTTON (Rightmost) */}
        <div className="h-full flex items-center relative z-10">
          <button
            onClick={onFullscreen}
            className="w-24 h-24 flex items-center justify-center text-blue-400 hover:text-white hover:bg-white/5 transition-all group relative"
            title={isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
          >
            <div className="absolute inset-y-6 left-0 w-[1px] bg-white/5"></div>
            {isFullscreen ? (
              <Minimize size={40} strokeWidth={1.5} className="group-hover:scale-90 transition-transform drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
            ) : (
              <Maximize size={40} strokeWidth={1.5} className="group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
});
