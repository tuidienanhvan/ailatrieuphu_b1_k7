import React from 'react';
import { Users, Activity, X } from 'lucide-react';
import { DarkModalFrame } from './DarkModalFrame';

interface AudienceModalProps {
  isOpen: boolean;
  animatedStats: number[];
  onClose: () => void;
}

export const AudienceModal: React.FC<AudienceModalProps> = ({ isOpen, animatedStats, onClose }) => {
  if (!isOpen) return null;
  const labels = ['A', 'B', 'C', 'D'];
  const maxVal = Math.max(...animatedStats);

  return (
    <DarkModalFrame title="KHẢO SÁT KHÁN GIẢ" icon={Users}>
        <div className="flex flex-col h-full w-full bg-[#020617] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[100%] h-[60%] bg-[#fbbf24] blur-[150px] opacity-10 rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-drift"></div>
            </div>

            <div className="relative z-10 flex justify-between items-center px-8 py-5 border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#fbbf24] blur-md opacity-50 animate-pulse"></div>
                        <div className="p-2 bg-[#fbbf24]/10 rounded-full border border-[#fbbf24]/50 relative z-10">
                            <Activity size={18} className="text-[#fbbf24]" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Voting</span>
                        <span className="text-sm font-black text-white uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Kết Quả</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#fbbf24]/20 to-transparent border-l-2 border-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                    <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider">Tổng phiếu: 100%</span>
                </div>
            </div>

            <div className="flex-1 w-full relative flex items-end justify-center px-16 pb-28 pt-24 perspective-[1000px]">
                 <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#fbbf24]/5 to-transparent blur-sm z-0"></div>
                 <div className="absolute bottom-28 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_10px_white] z-0"></div>

                 <div className="absolute inset-0 top-24 bottom-28 left-16 right-16 flex flex-col justify-between pointer-events-none z-0 opacity-30">
                     {[100, 75, 50, 25].map(val => (
                         <div key={val} className="w-full border-t border-dashed border-slate-500/50 relative h-0">
                             <span className="absolute -left-10 -top-2.5 text-[10px] font-bold text-slate-500 font-mono">{val}%</span>
                         </div>
                     ))}
                 </div>

                 <div className="relative z-10 w-full flex justify-around items-end gap-8 h-full max-h-[450px]">
                    {animatedStats.map((percent, idx) => {
                        const isHighest = percent === maxVal && percent > 0;
                        return (
                            <div key={idx} className="relative flex flex-col justify-end h-full w-24 group transform-style-3d">
                                 <div className={`absolute left-1/2 -translate-x-1/2 w-full text-center transition-all duration-1000 z-30 mb-4 ${isHighest ? 'scale-125' : 'scale-100'}`} style={{ bottom: `${percent}%` }}>
                                     <span className={`block text-3xl font-black tracking-tighter drop-shadow-2xl ${isHighest ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#fff7ed] via-[#fbbf24] to-[#d97706] animate-float' : 'text-slate-400'}`}>{percent > 0 ? `${percent}%` : ''}</span>
                                     {isHighest && <div className="absolute inset-0 bg-[#fbbf24] blur-xl opacity-40 animate-pulse"></div>}
                                 </div>

                                 <div className={`w-full relative rounded-t-sm transition-all duration-1000 shadow-2xl z-20 overflow-hidden ${isHighest ? 'bg-gradient-to-b from-[#fcd34d] via-[#b45309] to-[#451a03] shadow-[0_0_50px_rgba(251,191,36,0.4)] border-t border-[#fef3c7]/50' : 'bg-gradient-to-b from-[#475569] via-[#1e293b] to-[#020617] border-t border-slate-500/30'}`} style={{ height: `${percent}%` }}>
                                     <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite_linear] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                                     {isHighest && (
                                         <>
                                            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
                                            <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#fef3c7] rounded-full animate-twinkle delay-300"></div>
                                            <div className="absolute top-1/2 left-2/3 w-1 h-1 bg-white rounded-full animate-twinkle delay-700"></div>
                                            <div className="absolute bottom-10 left-2 w-2 h-2 bg-[#fbbf24] blur-[1px] animate-float-particle"></div>
                                         </>
                                     )}
                                     <div className="absolute inset-y-0 left-0 w-[1px] bg-white/30"></div>
                                     <div className="absolute inset-y-0 right-0 w-[2px] bg-black/60"></div>
                                 </div>
                                 
                                 {percent > 0 && (
                                    <div className={`absolute top-full left-0 w-full scale-y-[-0.6] opacity-40 blur-[3px] ${isHighest ? 'bg-gradient-to-b from-[#fbbf24] to-transparent' : 'bg-gradient-to-b from-slate-500 to-transparent'}`} style={{ height: `${percent * 0.6}%`, transformOrigin: 'top', maskImage: 'linear-gradient(to bottom, black, transparent)' }}></div>
                                 )}

                                 <div className={`absolute -bottom-[70px] left-1/2 -translate-x-1/2 w-16 h-12 flex items-center justify-center rounded-sm transition-all duration-500 z-30 ${isHighest ? 'bg-gradient-to-br from-[#451a03] to-black border-b-4 border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.3)] -translate-y-2' : 'bg-[#0f172a] border-b-4 border-slate-700 opacity-80'}`}>
                                     <span className={`font-black text-2xl font-sans ${isHighest ? 'text-[#fbbf24]' : 'text-slate-500'}`}>{labels[idx]}</span>
                                 </div>
                            </div>
                        );
                    })}
                 </div>
            </div>
             
             <div className="h-20 shrink-0 flex items-center justify-center border-t border-white/5 bg-[#020617]/80 backdrop-blur-sm">
                 <button onClick={onClose} className="group relative px-12 py-3 overflow-hidden rounded bg-transparent border border-[#fbbf24] text-[#fbbf24] font-black uppercase tracking-[0.25em] text-xs hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_#fbbf24]">
                    <div className="absolute inset-0 w-0 bg-[#fbbf24] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative flex items-center gap-2 z-10"><X size={14} /> Đóng Biểu Đồ</span>
                 </button>
             </div>
        </div>
        <style>{`
            @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-12deg); } 50%, 100% { transform: translateX(150%) skewX(-12deg); } }
            @keyframes twinkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }
            @keyframes float-particle { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-40px); opacity: 0; } }
            @keyframes drift { from { background-position: 0 0; } to { background-position: 100px 100px; } }
            @keyframes pulse-slow { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.2; } }
        `}</style>
    </DarkModalFrame>
  );
};