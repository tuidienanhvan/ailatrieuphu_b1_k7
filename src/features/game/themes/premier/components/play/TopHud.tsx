/**
 * Premier Theme - Top HUD
 * Theme: TV Show / Premier style với màu xanh navy và vàng gold
 */

import React from 'react';
import { RefreshCw, DivideCircle, Phone, Users, Bot, Ban, Power } from 'lucide-react';
import { useTopHud } from '../../../../hooks/play/useTopHud';

interface TopHudProps {
    lifelineHandlers: {
        onChangeQuestion: () => void;
        on5050: () => void;
        onPhone: () => void;
        onAudience: () => void;
        onAskAI: () => void;
    };
    onStopGame: () => void;
}

const LifelineItem = ({ icon: Icon, label, count, onClick }: { icon: any, label: string, count: number, onClick: () => void }) => {
    const isUsed = count <= 0;

    return (
        <button
            onClick={onClick}
            disabled={isUsed}
            className={`
                group relative w-24 h-24 flex flex-col items-center justify-center gap-2
                border-2 transition-all duration-200 rounded-md
                ${isUsed
                    ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                    : 'bg-black border-blue-500/30 hover:border-yellow-400 hover:bg-blue-900/20 active:scale-95 shadow-lg'
                }
            `}
        >
            <div className="relative">
                <Icon size={36} className={isUsed ? "text-slate-600" : "text-blue-400 group-hover:text-yellow-400"} strokeWidth={2} />
                {isUsed && <Ban className="absolute inset-0 text-red-500/60 w-full h-full" strokeWidth={1.5} />}
            </div>

            {count > 1 && (
                <div className="absolute top-1 right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-[#020617] shadow-md z-10">
                    <span className="text-[10px] font-black text-white leading-none">{count}</span>
                </div>
            )}

            <span className={`text-[11px] font-bold uppercase tracking-wider ${isUsed ? 'text-slate-600' : 'text-slate-400 group-hover:text-yellow-400'}`}>
                {label}
            </span>
        </button>
    );
};

export const TopHud: React.FC<TopHudProps> = ({ lifelineHandlers, onStopGame }) => {
    const { currentPrize, lifelines } = useTopHud();

    return (
        <div className="relative z-20 flex items-start justify-between px-16 pt-10 w-full pointer-events-none select-none">

            <div className="pointer-events-auto flex items-center gap-6">
                <div className="flex flex-col items-start justify-center h-24 px-10 bg-black border-2 border-yellow-600 rounded-md shadow-[0_0_20px_rgba(202,138,4,0.15)] min-w-[340px]">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600/80 mb-1">
                        TIỀN THƯỞNG
                    </span>
                    <span className="text-5xl font-black text-yellow-500 font-mono tracking-tighter drop-shadow-md">
                        {currentPrize}
                    </span>
                </div>

                <button
                    onClick={onStopGame}
                    className="h-24 w-24 flex flex-col items-center justify-center bg-black border-2 border-red-900/50 hover:border-red-500 hover:bg-red-950/30 transition-all group active:scale-95 rounded-md"
                    title="Dừng cuộc chơi"
                >
                    <Power size={32} className="text-red-700 group-hover:text-red-500 transition-colors mb-1" />
                    <span className="text-[11px] font-black text-red-800 group-hover:text-red-500 uppercase tracking-widest">
                        DỪNG
                    </span>
                </button>
            </div>

            <div className="pointer-events-auto">
                <div className="flex items-center gap-4 p-2 bg-black/40 border border-white/10 rounded-lg backdrop-blur-sm">
                    <LifelineItem icon={RefreshCw} label="Đổi Câu" count={lifelines.changeQuestion} onClick={lifelineHandlers.onChangeQuestion} />
                    <LifelineItem icon={DivideCircle} label="50:50" count={lifelines.fiftyFifty} onClick={lifelineHandlers.on5050} />
                    <div className="w-[2px] h-16 bg-white/10 mx-2"></div>
                    <LifelineItem icon={Phone} label="Gọi Điện" count={lifelines.phone} onClick={lifelineHandlers.onPhone} />
                    <LifelineItem icon={Users} label="Khán Giả" count={lifelines.audience} onClick={lifelineHandlers.onAudience} />
                    <LifelineItem icon={Bot} label="Hỏi AI" count={lifelines.askAI} onClick={lifelineHandlers.onAskAI} />
                </div>
            </div>

        </div>
    );
};
