import React from 'react';
import { Phone, Signal } from 'lucide-react';
import { DarkModalFrame } from './DarkModalFrame';
import { PHONE_HELPERS } from '../../../data/game-constants';

interface PhoneModalProps {
  isOpen: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;
  return (
    <DarkModalFrame title="DANH BẠ CHUYÊN GIA" icon={Phone} onClose={onClose}>
        <div className="flex items-center justify-center h-full w-full">
            <div className="grid grid-cols-3 gap-8 w-full max-w-5xl px-2">
                {PHONE_HELPERS.map((p) => (
                    <button 
                        key={p.id} 
                        onClick={() => onSelect(p.id)} 
                        className="group relative h-[420px] w-full flex flex-col items-center bg-[#0f172a] border border-[#fbbf24]/20 hover:border-[#fbbf24] transition-all duration-500 rounded-lg overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] transform hover:-translate-y-2"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-50"></div>
                        <div className="absolute top-4 right-4 flex gap-1">
                             <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                             <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                             <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                        </div>

                        <div className="relative w-full h-[190px] flex items-center justify-center mt-4">
                            <div className="absolute w-40 h-40 rounded-full border border-dashed border-slate-700/50 group-hover:border-[#fbbf24]/30 animate-[spin_20s_linear_infinite]"></div>
                            <div className="w-28 h-28 rounded-full border-[3px] border-[#fbbf24] p-1 bg-[#020617] shadow-xl z-10 relative group-hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-all duration-500">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                    <span className="text-5xl font-black text-white group-hover:text-[#fbbf24] transition-colors">{p.name.charAt(0)}</span>
                                </div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#020617] rounded-full flex items-center justify-center border border-[#fbbf24]">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full px-6 flex flex-col items-center relative z-10 bg-gradient-to-t from-[#0b1120] to-transparent w-full">
                            <h4 className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-[#fbbf24] transition-colors mb-2 truncate w-full text-center font-sans">{p.name}</h4>
                            <div className="px-4 py-1 border border-white/10 rounded-full bg-white/5 mb-8 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full"></span>
                                <span className="text-xs text-slate-300 uppercase tracking-[0.1em] font-bold">{p.role}</span>
                            </div>
                            <div className="w-full bg-[#020617]/50 p-4 rounded-lg border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center gap-1">
                                        <Signal size={10} /> Tín hiệu
                                    </span>
                                    <span className="text-lg font-mono font-bold text-[#fbbf24]">{p.rate}</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                     <div className="h-full bg-gradient-to-r from-yellow-700 to-yellow-400 group-hover:animate-pulse" style={{ width: p.rate }}></div>
                                </div>
                            </div>
                            <div className="mt-auto mb-6 w-full opacity-50 group-hover:opacity-100 transition-all duration-300">
                                <div className="w-full py-2 border border-[#fbbf24]/30 text-[#fbbf24] text-xs font-bold uppercase tracking-[0.2em] text-center rounded-sm group-hover:bg-[#fbbf24] group-hover:text-black transition-all">
                                    Kết nối ngay
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </DarkModalFrame>
  );
};