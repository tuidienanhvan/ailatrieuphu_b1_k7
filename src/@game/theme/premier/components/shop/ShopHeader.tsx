
import React, { memo } from 'react';
import { ArrowLeft, Wallet } from 'lucide-react';

interface ShopHeaderProps {
  balance: number;
  onBack: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = memo(({ balance, onBack }) => {
  return (
    <div className="relative z-20 h-20 flex items-center justify-between px-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-b border-[#fbbf24]/30 shadow-lg shrink-0">
        
        {/* BACK BUTTON */}
        <button 
            onClick={onBack}
            className="group flex items-center gap-3 px-6 py-3 rounded bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
        >
            <div className="p-1 rounded-full bg-slate-800 group-hover:bg-[#fbbf24] transition-colors">
                <ArrowLeft size={20} className="text-slate-400 group-hover:text-black" />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 group-hover:text-white">Quay lại</span>
        </button>

        {/* TITLE */}
        <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white uppercase tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Cửa Hàng <span className="text-[#fbbf24]">Vật Phẩm</span>
            </span>
        </div>

        {/* BALANCE DISPLAY */}
        <div className="flex items-center gap-4 bg-black/40 px-6 py-2 rounded-lg border border-[#fbbf24]/30 shadow-inner">
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-[#fbbf24] font-bold uppercase tracking-wider">Số dư khả dụng</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white font-mono">{balance.toLocaleString()}</span>
                    <span className="text-sm text-[#fbbf24] font-bold">$</span>
                </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#b45309] flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.4)] border border-[#fef3c7]">
                <Wallet size={20} className="text-black" />
            </div>
        </div>
    </div>
  );
});
