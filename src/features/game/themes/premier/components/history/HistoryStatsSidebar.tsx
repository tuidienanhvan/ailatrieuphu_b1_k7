
import React from 'react';
import { Trophy, Wallet, ShoppingCart, Gamepad2, Star } from 'lucide-react';
import { UserInfo } from '../../../../types/entities';
import { StatCard } from './StatCard';

interface Props {
    userInfo: UserInfo;
    stats: {
        totalPlayed: number;
        totalWin: number;
        totalPrize: number;
        totalPurchases: number;
        totalSpent: number;
    };
}

export const HistoryStatsSidebar: React.FC<Props> = ({ userInfo, stats }) => {
    const winRate = stats.totalPlayed > 0 ? Math.round((stats.totalWin / stats.totalPlayed) * 100) : 0;

    return (
        <div className="w-[340px] bg-black/50 backdrop-blur-xl border-r border-[#fbbf24]/20 flex flex-col relative overflow-hidden">

            {/* Decorative accent line */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#fbbf24] via-[#fbbf24]/20 to-transparent" />

            {/* Profile Card */}
            <div className="relative p-8 border-b border-white/10">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#fbbf24] blur-[80px] opacity-10" />

                <div className="relative flex flex-col items-center">
                    {/* Avatar */}
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full border-4 border-[#fbbf24] p-1 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <span className="text-4xl font-black text-[#fbbf24]">
                                    {userInfo.name?.charAt(0)?.toUpperCase() || '?'}
                                </span>
                            </div>
                        </div>
                        {/* Crown for winners */}
                        {stats.totalWin > 0 && (
                            <Trophy
                                className="absolute -top-3 -right-2 text-[#fbbf24] drop-shadow-lg"
                                size={28}
                                fill="#fbbf24"
                            />
                        )}
                    </div>

                    <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
                        {userInfo.name || 'Khách'}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 bg-white/5 px-4 py-1 rounded-full border border-white/10">
                        ID: {userInfo.userId || 'Guest'}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">

                {/* Main Stats Row */}
                <div className="grid grid-cols-2 gap-3">
                    <StatCard
                        label="Tổng Trận"
                        value={stats.totalPlayed}
                        icon={<Gamepad2 size={18} />}
                        color="#3b82f6"
                    />
                    <StatCard
                        label="Chiến Thắng"
                        value={stats.totalWin}
                        icon={<Trophy size={18} />}
                        color="#fbbf24"
                    />
                </div>

                {/* Win Rate */}
                <div className="relative p-4 bg-black/40 border border-white/10 overflow-hidden">
                    {/* Progress bar background */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-[#fbbf24]/20 to-transparent transition-all duration-500"
                        style={{ width: `${winRate}%` }}
                    />
                    <div className="relative flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tỷ lệ thắng</span>
                        <span className="text-2xl font-mono font-black text-[#fbbf24]">{winRate}%</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
                    <Star size={12} className="text-[#fbbf24]" fill="#fbbf24" />
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
                </div>

                {/* Financial Stats */}
                <StatCard
                    label="Tổng Tiền Thưởng"
                    value={`${stats.totalPrize.toLocaleString()}đ`}
                    icon={<Wallet size={18} />}
                    color="#22c55e"
                    large
                />

                <StatCard
                    label="Đã Chi Tiêu"
                    value={`${stats.totalSpent.toLocaleString()}`}
                    icon={<ShoppingCart size={18} />}
                    color="#8b5cf6"
                />

            </div>
        </div>
    );
};

