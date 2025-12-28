
import React from 'react';
import { Loader2, Cpu, Server } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
  isOverlay?: boolean; // Nếu true: nền bán trong suốt đè lên UI. Nếu false: nền đặc full màn hình.
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "HỆ THỐNG ĐANG KHỞI TẠO", 
  subMessage = "Đang kết nối đến máy chủ dữ liệu...", 
  isOverlay = false 
}) => {
  return (
    <div className={`
        absolute inset-0 flex flex-col items-center justify-center overflow-hidden
        ${isOverlay ? 'bg-black/90 backdrop-blur-md z-[9999]' : 'bg-[#020617] z-[50]'}
    `}>
        {/* --- BACKGROUND EFFECTS (Only for Full Screen mode to save performance on Overlay) --- */}
        {!isOverlay && (
            <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e3a8a_0%,#000000_100%)] opacity-40"></div>
                <div className="absolute inset-0 opacity-[0.05]" 
                    style={{
                        backgroundImage: `linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}>
                </div>
            </>
        )}

        {/* --- CENTRAL LOADER --- */}
        <div className="relative flex flex-col items-center">
            
            {/* Spinning Rings */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-4 border-t-[#fbbf24] border-r-[#fbbf24]/50 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-2 border-b-blue-500 border-l-blue-500/50 border-t-transparent border-r-transparent rounded-full animate-spin-reverse-slow"></div>
                
                {/* Center Icon */}
                <div className="relative z-10 p-4 bg-black/50 rounded-full border border-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                    <Loader2 size={40} className="text-[#fbbf24] animate-spin-slow" />
                </div>

                {/* Glow */}
                <div className="absolute inset-0 bg-[#fbbf24] blur-[60px] opacity-20 animate-pulse"></div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center text-center gap-2 relative z-10">
                <div className="flex items-center gap-3 mb-1">
                    <Cpu size={16} className="text-blue-500 animate-pulse" />
                    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em] drop-shadow-lg">
                        {message}
                    </h2>
                    <Server size={16} className="text-blue-500 animate-pulse" />
                </div>
                
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent mb-2"></div>

                <p className="text-sm font-mono font-bold text-slate-400 tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    {subMessage}
                </p>
            </div>
        </div>

        <style>{`
            @keyframes spin-reverse-slow {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
            }
            .animate-spin-reverse-slow { animation: spin-reverse-slow 3s linear infinite; }
            .animate-spin-slow { animation: spin 3s linear infinite; }
        `}</style>
    </div>
  );
};
