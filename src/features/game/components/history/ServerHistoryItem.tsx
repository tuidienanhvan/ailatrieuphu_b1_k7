
import React from 'react';
import { Trophy, Gamepad2, ShoppingCart, Package } from 'lucide-react';
import { ServerHistoryRecord } from '../../types/entities';

interface Props {
    record: ServerHistoryRecord;
    index: number;
}

export const ServerHistoryItem: React.FC<Props> = ({ record }) => {
    const isResult = record.msgtype === 'RESULT';
    const isPurchase = record.msgtype === 'PURCHASE';

    const date = new Date(record.tsms);
    const timeStr = date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    if (isResult) {
        const { result, level, finalPrize, xp, coin, playDuration } = record.payload || {};
        const isVictory = result === 'victory';
        const isStop = result === 'stop';

        // Theme based on result
        const borderColor = isVictory ? 'border-[#fbbf24]/40' : isStop ? 'border-blue-500/40' : 'border-red-500/40';
        const accentColor = isVictory ? '#fbbf24' : isStop ? '#3b82f6' : '#ef4444';
        const bgGradient = isVictory
            ? 'from-[#fbbf24]/10 via-transparent to-transparent'
            : isStop
                ? 'from-blue-500/10 via-transparent to-transparent'
                : 'from-red-500/10 via-transparent to-transparent';

        return (
            <div className={`
        relative group flex items-center gap-5 p-5 
        bg-black/40 backdrop-blur-sm 
        border ${borderColor}
        transform -skew-x-3 hover:skew-x-0
        transition-all duration-300 hover:scale-[1.02]
        overflow-hidden
      `}>
                {/* Left accent bar */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: accentColor }}
                />

                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${bgGradient} pointer-events-none`} />

                {/* Icon */}
                <div
                    className="relative w-14 h-14 rounded-lg border flex items-center justify-center transform skew-x-3"
                    style={{ borderColor: accentColor, backgroundColor: `${accentColor}15` }}
                >
                    {isVictory ? (
                        <Trophy size={28} style={{ color: accentColor }} />
                    ) : (
                        <Gamepad2 size={28} style={{ color: accentColor }} />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 transform skew-x-3">
                    <div className="flex items-center gap-3 mb-1.5">
                        <span
                            className="text-base font-black uppercase tracking-[0.15em]"
                            style={{ color: accentColor }}
                        >
                            {isVictory ? 'Chiến Thắng' : isStop ? 'Dừng Cuộc' : 'Thất Bại'}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{timeStr}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">
                            Level: <span className="text-white font-bold font-mono">{level || 1}</span>
                        </span>
                        {playDuration && (
                            <span className="text-slate-500 font-mono">
                                {Math.floor(playDuration / 60)}:{String(playDuration % 60).padStart(2, '0')}
                            </span>
                        )}
                    </div>
                </div>

                {/* Rewards */}
                <div className="flex items-center gap-3 transform skew-x-3">
                    {xp && xp > 0 && (
                        <div className="flex flex-col items-center px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded">
                            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">XP</span>
                            <span className="text-lg font-mono font-black text-purple-400">+{xp}</span>
                        </div>
                    )}
                    {coin && coin > 0 && (
                        <div className="flex flex-col items-center px-3 py-2 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded">
                            <span className="text-[10px] text-[#fbbf24] font-bold uppercase tracking-wider">Coin</span>
                            <span className="text-lg font-mono font-black text-[#fbbf24]">+{coin}</span>
                        </div>
                    )}
                    <div
                        className="flex flex-col items-center px-4 py-2 border rounded min-w-[100px]"
                        style={{
                            borderColor: `${accentColor}50`,
                            backgroundColor: `${accentColor}10`
                        }}
                    >
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>Thưởng</span>
                        <span className="text-xl font-mono font-black text-white">
                            {finalPrize ? finalPrize.toLocaleString() : '0'}đ
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (isPurchase) {
        const { itemName, itemType, price } = record.payload || {};

        return (
            <div className="
        relative group flex items-center gap-5 p-5 
        bg-black/40 backdrop-blur-sm 
        border border-indigo-500/40
        transform -skew-x-3 hover:skew-x-0
        transition-all duration-300 hover:scale-[1.02]
        overflow-hidden
      ">
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />

                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-lg border border-indigo-500/50 bg-indigo-500/10 flex items-center justify-center transform skew-x-3">
                    <ShoppingCart size={28} className="text-indigo-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 transform skew-x-3">
                    <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-base font-black uppercase tracking-[0.15em] text-indigo-400">
                            Mua Vật Phẩm
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{timeStr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Package size={14} className="text-slate-500" />
                        <span className="text-white font-medium">{itemName || 'Unknown'}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase font-bold tracking-wider">
                            {itemType || 'item'}
                        </span>
                    </div>
                </div>

                {/* Price */}
                <div className="flex flex-col items-center px-4 py-2 bg-red-500/10 border border-red-500/30 rounded transform skew-x-3 min-w-[100px]">
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Chi Tiêu</span>
                    <span className="text-xl font-mono font-black text-red-400">
                        -{price?.toLocaleString() || '0'}
                    </span>
                </div>
            </div>
        );
    }

    return null;
};
