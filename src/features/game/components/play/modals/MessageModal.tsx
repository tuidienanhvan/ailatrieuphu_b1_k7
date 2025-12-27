import React from 'react';
import { Mic2, Wifi, Lock as LockIcon, Radio, Phone } from 'lucide-react';
import { DarkModalFrame } from './DarkModalFrame';
import { PHONE_HELPERS } from '../../../data/game-constants';

interface MessageModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;
  const personName = title.replace('Gọi cho ', '');
  const helper = PHONE_HELPERS.find(p => p.name === personName) || { role: 'Chuyên gia' };

  return (
    <DarkModalFrame title="KẾT NỐI TRỰC TIẾP" icon={Mic2}>
        <div className="flex flex-col h-full w-full gap-5">
            <div className="flex-1 min-h-0 bg-[#0f172a] border border-white/10 rounded-lg relative overflow-hidden flex shadow-2xl group">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="w-[300px] border-r border-white/10 bg-black/20 p-6 flex flex-col items-center justify-center relative z-10 shrink-0">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full border-2 border-[#fbbf24] p-1 bg-black shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                             <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-700 to-slate-900 flex items-center justify-center">
                                <span className="text-4xl font-black text-white">{personName.charAt(0)}</span>
                             </div>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase text-center leading-tight mb-2">{personName}</h3>
                    <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                        <span className="text-slate-200 text-xs font-bold uppercase tracking-[0.1em]">{helper.role}</span>
                    </div>
                    <div className="mt-6 w-full flex justify-center gap-4 opacity-50">
                        <div className="flex flex-col items-center gap-1">
                            <Wifi size={14} className="text-green-500" />
                            <span className="text-[8px] uppercase text-slate-400">Signal</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <LockIcon size={14} className="text-blue-500" />
                            <span className="text-[8px] uppercase text-slate-400">Secure</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative p-6 flex flex-col bg-gradient-to-r from-transparent to-[#0b1120]">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col">
                             <span className="text-[10px] font-mono text-[#fbbf24] uppercase tracking-widest mb-1">Frequency Modulation</span>
                             <div className="flex gap-1">
                                <div className="w-10 h-1 bg-green-500 rounded-sm"></div>
                                <div className="w-10 h-1 bg-green-500 rounded-sm"></div>
                                <div className="w-10 h-1 bg-yellow-500 rounded-sm"></div>
                             </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-950/40 border border-red-500/50 rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                            <div className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                            </div>
                            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] leading-none pt-[1px]">LIVE FEED</span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-1.5 px-4 opacity-90">
                        {[...Array(30)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-1.5 bg-gradient-to-t from-[#fbbf24] to-yellow-100 rounded-sm"
                                style={{ 
                                    height: `${15 + Math.random() * 70}%`,
                                    animation: `equalizer 0.8s infinite ease-in-out`,
                                    animationDelay: `${i * 0.05}s`,
                                    boxShadow: '0 0 8px rgba(251,191,36,0.3)'
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-[220px] shrink-0 bg-[#0b1120] border-t-2 border-[#fbbf24] rounded-b-lg relative flex flex-col p-8 shadow-2xl">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 text-[#fbbf24]">
                        <Radio size={16} className="animate-pulse" />
                        <span className="font-bold uppercase text-xs tracking-[0.2em]">Incoming Audio Message</span>
                    </div>
                 </div>
                 <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                     <p className="text-3xl text-white font-sans font-medium leading-relaxed tracking-wide">
                        <span className="text-[#fbbf24] mr-3 text-4xl leading-none align-middle">“</span>
                        {message}
                        <span className="text-[#fbbf24] ml-3 text-4xl leading-none align-middle">”</span>
                     </p>
                 </div>
                 <div className="absolute bottom-6 right-8">
                    <button onClick={onClose} className="px-8 py-3 bg-[#fbbf24] hover:bg-yellow-400 text-black font-black uppercase tracking-[0.2em] text-xs transition-all shadow-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] rounded-sm flex items-center gap-2">
                        <Phone size={14} className="rotate-[135deg]" /> Ngắt kết nối
                    </button>
                 </div>
            </div>
        </div>
        <style>{`
            @keyframes equalizer {
                0%, 100% { height: 20%; opacity: 0.6; }
                50% { height: 90%; opacity: 1; }
            }
        `}</style>
    </DarkModalFrame>
  );
}