
import React from 'react';
import { ArrowLeft, History, Trophy, Wallet } from 'lucide-react';
import { useHistory } from '../features/game/hooks/history/useHistory';
import { HistoryItem } from '../features/game/components/history/HistoryItem';

export const HistoryScreen: React.FC = () => {
  const { history, stats, userInfo, handleBack } = useHistory();

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
                    Lịch Sử <span className="text-blue-500">Đấu</span>
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
                            {userInfo.name.charAt(0)}
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
                            <Trophy size={12} className="text-yellow-500"/> Số Trận Thắng
                        </span>
                        <span className="text-2xl font-mono font-black text-yellow-500">{stats.totalWin}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-green-900/10 border border-green-500/20 flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-2">
                            <Wallet size={12} className="text-green-500"/> Tổng Tiền Thưởng
                        </span>
                        <span className="text-2xl font-mono font-black text-green-500 truncate" title={stats.totalPrize.toLocaleString()}>
                            {stats.totalPrize.toLocaleString()}
                        </span>
                    </div>
                </div>

            </div>

            {/* LIST AREA */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-12 bg-black/20">
                <div className="max-w-4xl mx-auto flex flex-col gap-3 pb-20">
                    {history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50">
                            <History size={64} className="text-slate-600 mb-4" />
                            <p className="text-xl text-slate-500 font-bold uppercase tracking-wider">Chưa có lịch sử đấu</p>
                        </div>
                    ) : (
                        history.map((record, index) => (
                            <HistoryItem key={record.id} record={record} index={index} />
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
