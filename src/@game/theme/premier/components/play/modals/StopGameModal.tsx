import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { DarkModalFrame } from './DarkModalFrame';

interface StopGameModalProps {
  isOpen: boolean;
  amount: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const StopGameModal: React.FC<StopGameModalProps> = ({ isOpen, amount, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <DarkModalFrame title="QUYẾT ĐỊNH DỪNG CHƠI" icon={ShieldCheck}>
        <div className="flex flex-col items-center justify-center h-full w-full gap-10 relative">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-2">
                    <AlertCircle size={32} />
                </div>
                <h4 className="text-3xl font-black text-white uppercase tracking-wider">Xác nhận bảo toàn?</h4>
                <p className="text-slate-400 text-lg tracking-wide max-w-xl leading-relaxed">
                    Bạn có muốn dừng cuộc chơi tại đây để bảo toàn số tiền thưởng hiện có không?
                </p>
            </div>

            <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1e3a8a] to-[#020617] border-[3px] border-[#fbbf24] p-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.1)_0%,transparent_70%)]"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#fbbf24]/10 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fbbf24]/10 blur-3xl rounded-full"></div>

                <span className="relative z-10 text-xs font-black text-[#fbbf24] uppercase tracking-[0.5em] mb-4 opacity-70">Số Tiền Bảo Toàn</span>
                <div className="relative z-10 text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fffbeb] via-[#fbbf24] to-[#b45309] font-mono tracking-tighter drop-shadow-2xl">
                    {amount}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-2xl mt-4">
                <button 
                    onClick={onCancel} 
                    className="py-5 bg-slate-900 border-2 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 font-black uppercase tracking-[0.2em] text-lg transition-all rounded-lg active:scale-95"
                >
                    Tiếp Tục Chơi
                </button>
                <button 
                    onClick={onConfirm} 
                    className="py-5 bg-gradient-to-r from-[#b45309] to-[#fbbf24] text-black font-black uppercase tracking-[0.2em] text-lg transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_50px_rgba(251,191,36,0.5)] rounded-lg active:scale-95 flex items-center justify-center gap-3"
                >
                    <ShieldCheck size={28} />
                    Dừng Cuộc Chơi
                </button>
            </div>
        </div>
    </DarkModalFrame>
  );
};