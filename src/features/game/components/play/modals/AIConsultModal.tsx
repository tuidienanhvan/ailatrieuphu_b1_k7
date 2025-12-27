import React, { useState, useEffect } from 'react';
import { Cpu, Bot, Sparkles, Terminal, Activity, Database, Zap } from 'lucide-react';
import { DarkModalFrame } from './DarkModalFrame';

interface AIConsultModalProps {
  isOpen: boolean;
  isThinking: boolean;
  displayText: string;
  onClose: () => void;
}

export const AIConsultModal: React.FC<AIConsultModalProps> = ({ isOpen, isThinking, displayText, onClose }) => {
  const [processingStep, setProcessingStep] = useState(0);
  const steps = ["Kết nối siêu máy tính...", "Truy xuất dữ liệu Big Data...", "Phân tích cú pháp câu hỏi...", "Tổng hợp tri thức...", "Đang xuất kết quả..."];

  useEffect(() => {
      if (isThinking) {
          const interval = setInterval(() => setProcessingStep(prev => (prev + 1) % steps.length), 600);
          return () => clearInterval(interval);
      }
  }, [isThinking]);

  if (!isOpen) return null;

  return (
    <DarkModalFrame title="TRỢ LÝ AI" icon={Cpu}>
        <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden">
            
            <div 
                className={`relative flex items-center justify-center shrink-0 transition-all duration-700 ease-in-out overflow-hidden
                ${isThinking ? 'w-52 h-52 mb-6 opacity-100 scale-100' : 'w-0 h-0 mb-0 opacity-0 scale-0'}`}
            >
                <div className={`absolute inset-0 rounded-full border border-[#fbbf24]/20 border-t-[#fbbf24] transition-all duration-1000 ${isThinking ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }}></div>
                <div className={`absolute inset-3 rounded-full border border-yellow-700/30 border-b-yellow-500 transition-all duration-1000 ${isThinking ? 'animate-spin-slow' : ''}`} style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
                <div className={`relative z-10 flex items-center justify-center transition-all duration-700`}>
                     <div className={`rounded-full bg-gradient-to-b from-slate-800 to-black border-2 border-[#fbbf24] flex items-center justify-center w-28 h-28 shadow-[0_0_50px_rgba(251,191,36,0.6)] animate-pulse`}>
                         <Bot size={56} className="text-[#fbbf24] drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                     </div>
                </div>
            </div>

            <div className="w-full flex-1 flex flex-col items-center justify-center relative overflow-hidden rounded-xl">
                
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isThinking ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-90 pointer-events-none'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <Sparkles size={24} className="text-[#fbbf24] animate-spin" />
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] uppercase tracking-[0.2em]">Đang Phân Tích</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 w-full max-w-md">
                        <div className="flex justify-between w-full px-2">
                            <span className="text-slate-400 font-bold font-mono text-xs uppercase tracking-widest">{steps[processingStep]}</span>
                            <span className="text-[#fbbf24] font-mono text-xs font-bold">{Math.min((processingStep + 1) * 20, 99)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative border border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#fbbf24] to-[#d97706] animate-shimmer w-full origin-left shadow-[0_0_10px_#fbbf24]"></div>
                        </div>
                    </div>
                </div>

                <div className={`absolute inset-0 flex flex-col w-full h-full transition-all duration-700 ease-out ${!isThinking ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
                    <div className="flex-1 w-full relative flex flex-col rounded-xl overflow-hidden group border-[2px] border-[#fbbf24]/30 bg-[#020617] shadow-inner">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none"></div>
                        
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#fbbf24]/20 bg-[#fbbf24]/5 relative z-20 shrink-0">
                            <div className="flex items-center gap-3">
                                <Terminal size={18} className="text-[#fbbf24]" />
                                <span className="text-white font-bold uppercase tracking-[0.2em] text-sm">Trình Phân Tích Dữ Liệu</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity size={12} className="text-green-500 animate-pulse" />
                                <span className="text-[10px] text-green-500 font-mono uppercase tracking-widest">Analysis Finished</span>
                            </div>
                        </div>

                        <div className="flex-1 flex relative z-20 overflow-hidden px-10">
                            <div className="flex-1 flex items-center justify-center relative h-full overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none"></div>
                                <div className="w-full max-h-full overflow-y-auto custom-scrollbar flex items-center justify-center">
                                    <p className="text-2xl md:text-4xl text-white font-sans font-bold leading-[1.4] tracking-wide text-center drop-shadow-lg">
                                        <span className="text-[#fbbf24] opacity-50 mr-4 text-4xl align-top font-serif">“</span>
                                        {displayText}
                                        <span className="text-[#fbbf24] opacity-50 ml-4 text-4xl align-bottom font-serif">”</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-[#fbbf24]/20 bg-[#fbbf24]/5 flex justify-between items-center relative z-20 shrink-0 font-mono text-[10px] text-slate-500">
                            <div className="flex gap-8 items-center">
                                <div className="flex items-center gap-2">
                                    <Database size={12} />
                                    <span>N-CORE DATABASE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={12} className="text-[#fbbf24]" />
                                    <span>ĐỘ TIN CẬY: <span className="text-[#fbbf24] font-bold">99%</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center shrink-0 relative z-30">
                        <button onClick={onClose} className="group relative px-20 py-4 rounded-sm bg-[#020617] border-[3px] border-[#fbbf24] text-[#fbbf24] font-black uppercase tracking-[0.4em] text-sm hover:bg-[#fbbf24] hover:text-black transition-all duration-300 shadow-xl hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                            Xác Nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <style>{`
            @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        `}</style>
    </DarkModalFrame>
  );
}