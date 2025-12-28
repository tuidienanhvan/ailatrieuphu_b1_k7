
import React from 'react';
import { ArrowLeft, History, Trophy, Wallet, ShoppingCart, Gamepad2, Package } from 'lucide-react';
import { useHistory, HistoryTab } from '../features/game/hooks/history/useHistory';
import { ServerHistoryRecord } from '../features/game/types/entities';

// Component for rendering a server history item
const ServerHistoryItem: React.FC<{ record: ServerHistoryRecord; index: number }> = ({ record, index }) => {
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

        return (
            <div className={`
        flex items-center gap-4 p-4 rounded-xl border transition-all
        ${isVictory
                    ? 'bg-gradient-to-r from-yellow-900/20 to-yellow-900/5 border-yellow-500/30'
                    : isStop
                        ? 'bg-gradient-to-r from-blue-900/20 to-blue-900/5 border-blue-500/30'
                        : 'bg-gradient-to-r from-red-900/20 to-red-900/5 border-red-500/30'
                }
      `}>
                {/* Icon */}
                <div className={`
          w-12 h-12 rounded-full flex items-center justify-center shrink-0
          ${isVictory ? 'bg-yellow-500/20' : isStop ? 'bg-blue-500/20' : 'bg-red-500/20'}
        `}>
                    {isVictory ? (
                        <Trophy size={24} className="text-yellow-500" />
                    ) : (
                        <Gamepad2 size={24} className={isStop ? 'text-blue-400' : 'text-red-400'} />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`
              text-sm font-black uppercase tracking-wider
              ${isVictory ? 'text-yellow-500' : isStop ? 'text-blue-400' : 'text-red-400'}
            `}>
                            {isVictory ? 'Chiến Thắng' : isStop ? 'Dừng Cuộc' : 'Thất Bại'}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{timeStr}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">Level: <span className="text-white font-bold">{level || 1}</span></span>
                        {playDuration && (
                            <span className="text-slate-400">{Math.floor(playDuration / 60)}:{String(playDuration % 60).padStart(2, '0')}</span>
                        )}
                    </div>
                </div>

                {/* Rewards */}
                <div className="flex items-center gap-4 shrink-0">
                    {xp && (
                        <div className="flex flex-col items-center px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <span className="text-xs text-purple-400 font-bold">XP</span>
                            <span className="text-lg font-mono font-black text-purple-400">+{xp}</span>
                        </div>
                    )}
                    {coin && (
                        <div className="flex flex-col items-center px-3 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <span className="text-xs text-yellow-500 font-bold">Coin</span>
                            <span className="text-lg font-mono font-black text-yellow-500">+{coin}</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center px-4 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-xs text-green-500 font-bold">Thưởng</span>
                        <span className="text-lg font-mono font-black text-green-500">
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
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-gradient-to-r from-indigo-900/20 to-indigo-900/5 border-indigo-500/30 transition-all">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-indigo-500/20">
                    <ShoppingCart size={24} className="text-indigo-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black uppercase tracking-wider text-indigo-400">
                            Mua Vật Phẩm
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{timeStr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Package size={14} className="text-slate-500" />
                        <span className="text-white font-medium">{itemName || 'Unknown'}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 uppercase">
                            {itemType || 'item'}
                        </span>
                    </div>
                </div>

                {/* Price */}
                <div className="flex flex-col items-center px-4 py-1 rounded-lg bg-red-500/10 border border-red-500/20 shrink-0">
                    <span className="text-xs text-red-400 font-bold">Chi</span>
                    <span className="text-lg font-mono font-black text-red-400">
                        -{price?.toLocaleString() || '0'}
                    </span>
                </div>
            </div>
        );
    }

    return null;
};

// Tab Button Component
const TabButton: React.FC<{
    tab: HistoryTab;
    label: string;
    count: number;
    active: boolean;
    icon: React.ReactNode;
    onClick: () => void;
}> = ({ label, count, active, icon, onClick }) => (
    <button
        onClick={onClick}
        className={`
      flex items-center gap-2 px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all
      ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
            }
    `}
    >
        {icon}
        <span>{label}</span>
        <span className={`
      ml-1 px-2 py-0.5 rounded-full text-xs font-mono
      ${active ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'}
    `}>
            {count}
        </span>
    </button>
);

export const HistoryScreen: React.FC = () => {
    const { history, stats, userInfo, activeTab, tabCounts, handleBack, handleTabChange } = useHistory();

    return (
        <div className="flex-1 flex flex-col w-full h-full relative overflow-hidden animate-fade-in bg-[#020617] select-none">

            {/* --- BACKGROUND LAYER --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#1e1b4b_0%,#020617_60%,#000000_100%)] opacity-80"></div>
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}>
                </div>
            </div>

            {/* --- HEADER --- */}
            <div className="relative z-20 h-24 flex items-center justify-between px-10 border-b border-white/10 shrink-0 bg-black/20 backdrop-blur-sm">
                <button
                    onClick={handleBack}
                    className="group flex items-center gap-3 px-6 py-3 rounded bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                >
                    <div className="p-1 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-colors">
                        <ArrowLeft size={20} className="text-slate-400 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 group-hover:text-white">Quay lại</span>
                </button>

                <div className="flex items-center gap-3">
                    <History size={28} className="text-blue-500" />
                    <span className="text-3xl font-black text-white uppercase tracking-wider">
                        Lịch Sử <span className="text-blue-500">Hoạt Động</span>
                    </span>
                </div>

                <div className="w-[180px]"></div> {/* Spacer */}
            </div>

            {/* --- CONTENT --- */}
            <div className="flex-1 flex relative z-10 overflow-hidden">

                {/* STATS SIDEBAR */}
                <div className="w-80 bg-[#0f172a]/50 backdrop-blur-md border-r border-white/5 flex flex-col p-8 gap-6">

                    {/* Profile Card */}
                    <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 mb-4 shadow-lg shadow-blue-500/20">
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-2xl font-black text-white">
                                {userInfo.name?.charAt(0) || '?'}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{userInfo.name || 'Khách'}</h3>
                        <span className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full">ID: {userInfo.userId || 'Guest'}</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4">
                        <div className="p-4 rounded-xl bg-blue-900/10 border border-blue-500/20 flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Tổng Số Trận</span>
                            <span className="text-2xl font-mono font-black text-blue-400">{stats.totalPlayed}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-yellow-900/10 border border-yellow-500/20 flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-2">
                                <Trophy size={12} className="text-yellow-500" /> Số Trận Thắng
                            </span>
                            <span className="text-2xl font-mono font-black text-yellow-500">{stats.totalWin}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-green-900/10 border border-green-500/20 flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-2">
                                <Wallet size={12} className="text-green-500" /> Tổng Tiền Thưởng
                            </span>
                            <span className="text-2xl font-mono font-black text-green-500 truncate" title={stats.totalPrize.toLocaleString()}>
                                {stats.totalPrize.toLocaleString()}đ
                            </span>
                        </div>

                        <div className="p-4 rounded-xl bg-indigo-900/10 border border-indigo-500/20 flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-2">
                                <ShoppingCart size={12} className="text-indigo-400" /> Đã Chi Tiêu
                            </span>
                            <span className="text-2xl font-mono font-black text-indigo-400 truncate">
                                {stats.totalSpent.toLocaleString()}
                            </span>
                        </div>
                    </div>

                </div>

                {/* LIST AREA */}
                <div className="flex-1 flex flex-col overflow-hidden bg-black/20">

                    {/* TABS */}
                    <div className="flex items-center gap-3 p-6 pb-0">
                        <TabButton
                            tab="all"
                            label="Tất Cả"
                            count={tabCounts.all}
                            active={activeTab === 'all'}
                            icon={<History size={16} />}
                            onClick={() => handleTabChange('all')}
                        />
                        <TabButton
                            tab="result"
                            label="Kết Quả"
                            count={tabCounts.result}
                            active={activeTab === 'result'}
                            icon={<Gamepad2 size={16} />}
                            onClick={() => handleTabChange('result')}
                        />
                        <TabButton
                            tab="purchase"
                            label="Mua Sắm"
                            count={tabCounts.purchase}
                            active={activeTab === 'purchase'}
                            icon={<ShoppingCart size={16} />}
                            onClick={() => handleTabChange('purchase')}
                        />
                    </div>

                    {/* LIST */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        <div className="max-w-4xl mx-auto flex flex-col gap-3 pb-20">
                            {history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                    <History size={64} className="text-slate-600 mb-4" />
                                    <p className="text-xl text-slate-500 font-bold uppercase tracking-wider">
                                        {activeTab === 'purchase' ? 'Chưa có lịch sử mua sắm' : 'Chưa có lịch sử'}
                                    </p>
                                </div>
                            ) : (
                                history.map((record, index) => (
                                    <ServerHistoryItem key={record.id || index} record={record} index={index} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
