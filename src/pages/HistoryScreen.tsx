
import React from 'react';
import { ArrowLeft, History, Gamepad2, ShoppingCart, Crown } from 'lucide-react';
import { useHistory } from '../features/game/hooks/history/useHistory';
import { ServerHistoryItem } from '../features/game/components/history/ServerHistoryItem';
import { HistoryTabButton } from '../features/game/components/history/HistoryTabButton';
import { HistoryStatsSidebar } from '../features/game/components/history/HistoryStatsSidebar';

export const HistoryScreen: React.FC = () => {
    const { history, stats, userInfo, activeTab, tabCounts, handleBack, handleTabChange } = useHistory();

    return (
        <div className="flex-1 flex flex-col w-full h-full relative overflow-hidden bg-[#020617] select-none">

            {/* --- BACKGROUND LAYER (TV SHOW AESTHETIC) --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Dark gradient base */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#020617] to-black" />

                {/* Gold ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#fbbf24] blur-[150px] opacity-[0.08]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600 blur-[150px] opacity-[0.05]" />

                {/* Studio grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
            </div>

            {/* --- HEADER --- */}
            <div className="relative z-20 h-24 flex items-center justify-between px-10 border-b border-[#fbbf24]/20 shrink-0 bg-black/40 backdrop-blur-md">
                {/* Decorative top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-40" />

                <button
                    onClick={handleBack}
                    className="group flex items-center gap-3 px-6 py-3 bg-black/40 border border-white/10 hover:border-[#fbbf24]/50 transition-all transform -skew-x-6 hover:skew-x-0"
                >
                    <div className="flex items-center gap-2 transform skew-x-6">
                        <ArrowLeft size={18} className="text-slate-400 group-hover:text-[#fbbf24] transition-colors" />
                        <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate-400 group-hover:text-white">Quay lại</span>
                    </div>
                </button>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Crown size={32} className="text-[#fbbf24]" fill="#fbbf24" />
                        <div className="absolute inset-0 bg-[#fbbf24] blur-lg opacity-30" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-[0.2em]">
                        <span className="text-white">Lịch Sử</span>
                        <span className="text-[#fbbf24] ml-3">Vinh Quang</span>
                    </h1>
                </div>

                <div className="w-[180px]" /> {/* Spacer */}
            </div>

            {/* --- CONTENT --- */}
            <div className="flex-1 flex relative z-10 overflow-hidden">

                {/* STATS SIDEBAR */}
                <HistoryStatsSidebar userInfo={userInfo} stats={stats} />

                {/* LIST AREA */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* TABS */}
                    <div className="flex items-center gap-4 p-6 pb-4 border-b border-white/5">
                        <HistoryTabButton
                            tab="all"
                            label="Tất Cả"
                            count={tabCounts.all}
                            active={activeTab === 'all'}
                            icon={<History size={16} />}
                            onClick={() => handleTabChange('all')}
                        />
                        <HistoryTabButton
                            tab="result"
                            label="Kết Quả"
                            count={tabCounts.result}
                            active={activeTab === 'result'}
                            icon={<Gamepad2 size={16} />}
                            onClick={() => handleTabChange('result')}
                        />
                        <HistoryTabButton
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
                        <div className="max-w-4xl mx-auto flex flex-col gap-4 pb-20">
                            {history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24">
                                    <div className="relative mb-6">
                                        <History size={80} className="text-slate-700" strokeWidth={1} />
                                        <div className="absolute inset-0 bg-[#fbbf24] blur-[60px] opacity-10" />
                                    </div>
                                    <p className="text-2xl text-slate-600 font-black uppercase tracking-[0.2em]">
                                        {activeTab === 'purchase' ? 'Chưa có giao dịch' : 'Chưa có lịch sử'}
                                    </p>
                                    <p className="text-sm text-slate-700 mt-2">
                                        Hãy bắt đầu thử thách để tạo lịch sử vinh quang!
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

            {/* Shimmer animation for tabs */}
            <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%) skewX(-6deg); }
                100% { transform: translateX(200%) skewX(-6deg); }
            }
        `}</style>
        </div>
    );
};
