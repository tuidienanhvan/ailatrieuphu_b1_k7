
import React from 'react';
import { Crown } from 'lucide-react';

export const JackpotDisplay = () => {
  return (
    <div className="relative flex flex-col items-center mb-4 group cursor-default">
      {/* Crown Icon floating */}
      <div className="absolute -top-10 animate-bounce">
          <Crown size={32} className="text-[#fbbf24] drop-shadow-[0_0_10px_#fbbf24]" fill="#fef3c7" />
      </div>

      {/* Main Container */}
      <div className="relative bg-black/40 border border-[#fbbf24]/30 px-12 py-3 rounded-full backdrop-blur-md shadow-[0_0_30px_rgba(251,191,36,0.15)] group-hover:border-[#fbbf24] transition-colors duration-500">
          
          {/* Label */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#020617] px-3 text-[9px] font-black text-[#fbbf24] uppercase tracking-[0.3em] border border-[#fbbf24]/30 rounded-sm whitespace-nowrap">
              Giải Thưởng Cao Nhất
          </div>

          {/* Number */}
          <div className="flex items-center gap-1">
              <span className="text-5xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#fff7ed] via-[#fbbf24] to-[#d97706] drop-shadow-sm" style={{ textShadow: '0 0 20px rgba(251,191,36,0.3)' }}>
                  150.000.000
              </span>
              <span className="text-xl font-bold text-[#fbbf24] mt-2">₫</span>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full animate-[shimmer_3s_infinite]"></div>
          </div>
      </div>

      <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(-12deg); }
            20% { transform: translateX(150%) skewX(-12deg); }
            100% { transform: translateX(150%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};
