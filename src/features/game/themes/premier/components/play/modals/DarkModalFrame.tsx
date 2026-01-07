
import React from 'react';
import { X } from 'lucide-react';

interface DarkModalFrameProps {
  children: React.ReactNode;
  title: string;
  icon: React.ElementType;
  onClose?: () => void;
  variant?: 'default' | 'danger';
  fullContent?: boolean; // New prop to remove default padding
}

export const DarkModalFrame: React.FC<DarkModalFrameProps> = ({ children, title, icon: Icon, onClose, variant = "default", fullContent = false }) => {
    const isDanger = variant === 'danger';
    const accentColor = isDanger ? '#ef4444' : '#fbbf24';
    const glowColor = isDanger ? 'rgba(239, 68, 68, 0.5)' : 'rgba(251, 191, 36, 0.3)';

    return (
        <div className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in">
            <div 
                className={`w-[1000px] h-[700px] bg-[#020617] border border-[#fbbf24]/20 relative flex flex-col overflow-hidden rounded-lg shadow-2xl`}
                style={{ boxShadow: `0 0 60px -15px ${glowColor}` }}
            >
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: `radial-gradient(circle at 50% 0%, #1e293b 0%, transparent 70%)` }}>
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                     style={{
                        backgroundImage: `linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                     }}>
                </div>

                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 pointer-events-none z-50" style={{ borderColor: accentColor }}></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 pointer-events-none z-50" style={{ borderColor: accentColor }}></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 pointer-events-none z-50" style={{ borderColor: accentColor }}></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 pointer-events-none z-50" style={{ borderColor: accentColor }}></div>

                <div className="relative w-full h-[100px] shrink-0 border-b border-[#fbbf24]/20 flex items-center justify-between px-10 bg-gradient-to-r from-slate-950 via-[#0f172a] to-slate-950 z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#fbbf24] to-[#b45309] rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.4)] flex items-center justify-center text-black">
                            {Icon && <Icon size={32} strokeWidth={2.5} />}
                        </div>
                        <div className="flex flex-col justify-center h-full">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#fbbf24] mb-1">Trợ Giúp</span>
                            <h3 className="text-3xl font-black uppercase tracking-tight text-white drop-shadow-md font-sans">{title}</h3>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-slate-500 hover:text-white group border border-transparent hover:border-white/20">
                            <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    )}
                </div>

                {/* Modified container: conditionally remove padding */}
                <div className={`flex-1 w-full relative overflow-hidden flex flex-col z-10 ${fullContent ? 'p-0' : 'p-8'}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
