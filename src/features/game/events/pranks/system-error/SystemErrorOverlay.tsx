import React from 'react';
import { WifiOff, ShieldAlert, Cpu } from 'lucide-react';

export const SystemErrorOverlay: React.FC = () => {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#020205] overflow-hidden">

            {/* --- BACKGROUND EFFECTS --- */}
            {/* Radiant Gold Glow hidden behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/10 blur-[100px] rounded-full"></div>

            {/* Tech Grid Pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(234, 179, 8, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            ></div>

            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 z-0"></div>

            {/* --- MAIN CARD CONTENT --- */}
            <div className="relative z-10 w-full max-w-4xl p-12 flex flex-col items-center justify-center gap-8">

                {/* Top Warning Label */}
                <div className="flex items-center gap-4 px-6 py-2 border border-yellow-500/30 bg-yellow-900/10 rounded-full backdrop-blur-md animate-pulse">
                    <WifiOff size={18} className="text-red-500" />
                    <span className="text-yellow-500 font-mono text-sm tracking-[0.3em] uppercase font-bold">
                        Signal Interrupted
                    </span>
                    <WifiOff size={18} className="text-red-500" />
                </div>

                {/* GLITCH TITLE (Gold Theme) */}
                <div className="relative py-8 border-y border-yellow-500/20 w-full flex justify-center bg-black/40 backdrop-blur-sm">
                    {/* Decorative Brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500"></div>

                    <h1 className="text-5xl md:text-7xl font-black text-center uppercase tracking-widest leading-normal py-4 glitch-text"
                        data-text="HỆ THỐNG SỰ CỐ"
                        style={{
                            color: 'transparent',
                            backgroundImage: 'linear-gradient(to bottom, #fef08a, #ca8a04, #854d0e)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 2px 10px rgba(234, 179, 8, 0.5))'
                        }}
                    >
                        HỆ THỐNG SỰ CỐ
                    </h1>
                </div>

                {/* Subtext info */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <p className="text-white/80 font-medium tracking-[0.2em] uppercase text-lg">
                        Đang cố gắng kết nối lại máy chủ...
                    </p>

                    <div className="flex items-center gap-2 text-yellow-600/80 text-xs font-mono mt-2">
                        <Cpu size={14} className="animate-spin" />
                        <span>ERROR_CODE: 0x55A_TIMEOUT</span>
                    </div>
                </div>

            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,black_100%)]"></div>
        </div>
    );
};
