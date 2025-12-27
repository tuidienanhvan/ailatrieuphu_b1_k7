
import React from 'react';
import { Play } from 'lucide-react';

interface StartButtonProps {
  onClick: () => void;
}

export const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <div className="relative flex items-center justify-center">
        {/* SHOCKWAVE RINGS (Sóng lan tỏa) */}
        <div className="absolute inset-0 rounded-[30px] border-2 border-[#fbbf24] animate-ping-slow opacity-0"></div>
        <div className="absolute inset-0 rounded-[30px] border border-[#fbbf24] animate-ping-slow-delay opacity-0"></div>

        <button 
            onClick={onClick} 
            className="group relative w-[400px] h-[110px] outline-none transition-transform active:scale-[0.96] z-30 cursor-pointer will-change-transform"
        >
          <svg width="100%" height="100%" viewBox="0 0 400 110" fill="none" className="overflow-visible">
            <defs>
              <linearGradient id="btnFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="btnStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fcd34d" />
              </linearGradient>
              
              {/* Metallic Sheen Gradient */}
              <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                  <stop offset="40%" stopColor="white" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.6" />
                  <stop offset="60%" stopColor="white" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>

              <filter id="btnGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer Glow */}
            <path d="M30 15 H370 L390 55 L370 95 H30 L10 55 L30 15 Z" fill="#F59E0B" opacity="0.3" className="group-hover:opacity-60 transition-opacity duration-300" filter="url(#btnGlow)" />

            {/* Main Shape */}
            <path d="M30 15 H370 L390 55 L370 95 H30 L10 55 L30 15 Z" fill="url(#btnFill)" stroke="#451a03" strokeWidth="4" />

            {/* SHEEN ANIMATION (Vệt sáng chạy qua) */}
            <path d="M30 15 H370 L390 55 L370 95 H30 L10 55 L30 15 Z" fill="url(#sheen)" style={{ mixBlendMode: 'overlay' }}>
                <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="translate" from="-200 0" to="200 0" dur="3s" repeatCount="indefinite" />
            </path>

            {/* Inner Border Highlight */}
            <path d="M32 18 H368 L385 55 L368 92 H32 L15 55 L32 18 Z" stroke="url(#btnStroke)" strokeWidth="2" opacity="0.8" />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center gap-4">
            <span className="text-4xl font-black uppercase tracking-[0.15em] text-[#2a1205] drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] group-hover:tracking-[0.2em] transition-all duration-300">
              BẮT ĐẦU
            </span>
            <div className="bg-[#2a1205]/10 p-2 rounded-full border border-[#2a1205]/20 group-hover:bg-[#2a1205]/20 transition-colors group-hover:scale-110 duration-300">
              <Play size={28} fill="#2a1205" className="text-[#2a1205]" />
            </div>
          </div>
        </button>
        
        <style>{`
            @keyframes pingSlow {
                0% { transform: scale(0.9); opacity: 0.5; }
                100% { transform: scale(1.5); opacity: 0; }
            }
            .animate-ping-slow { animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
            .animate-ping-slow-delay { animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s; }
        `}</style>
    </div>
  );
};
