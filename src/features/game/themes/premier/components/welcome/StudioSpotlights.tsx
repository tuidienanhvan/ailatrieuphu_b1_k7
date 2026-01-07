
import React from 'react';

export const StudioSpotlights = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* 
            GAME SHOW LIGHTING RIG 
            Sử dụng hiệu ứng đèn Beam quét (Oscillating) thay vì xoay tròn.
        */}

        {/* BEAM GROUP LEFT */}
        <div className="absolute -top-[20%] left-[10%] w-[100px] h-[150vh] origin-top opacity-40 mix-blend-screen animate-beam-sweep-left">
            <div className="w-full h-full bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 transform -skew-x-12 blur-xl"></div>
        </div>
        <div className="absolute -top-[20%] left-[5%] w-[60px] h-[150vh] origin-top opacity-30 mix-blend-screen animate-beam-sweep-left-slow">
            <div className="w-full h-full bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 transform -skew-x-6 blur-lg"></div>
        </div>

        {/* BEAM GROUP RIGHT */}
        <div className="absolute -top-[20%] right-[10%] w-[100px] h-[150vh] origin-top opacity-40 mix-blend-screen animate-beam-sweep-right">
             <div className="w-full h-full bg-gradient-to-b from-[#fbbf24]/0 via-[#fbbf24]/20 to-[#fbbf24]/0 transform skew-x-12 blur-xl"></div>
        </div>
        <div className="absolute -top-[20%] right-[5%] w-[60px] h-[150vh] origin-top opacity-30 mix-blend-screen animate-beam-sweep-right-slow">
             <div className="w-full h-full bg-gradient-to-b from-yellow-600/0 via-yellow-600/20 to-yellow-600/0 transform skew-x-6 blur-lg"></div>
        </div>

        {/* STROBE LIGHTS (Đèn chớp nháy nhẹ tạo không khí hồi hộp) */}
        <div className="absolute inset-0 bg-white/5 animate-pulse-fast pointer-events-none mix-blend-overlay"></div>

        {/* ATMOSPHERIC FOG (Lớp sương mờ để bắt ánh sáng) */}
        <div className="absolute bottom-0 w-full h-[60vh] bg-gradient-to-t from-blue-950/20 via-transparent to-transparent"></div>

        <style>{`
            @keyframes beamSweepLeft {
                0%, 100% { transform: rotate(15deg) scaleY(1); opacity: 0.3; }
                50% { transform: rotate(45deg) scaleY(1.2); opacity: 0.6; }
            }
            @keyframes beamSweepRight {
                0%, 100% { transform: rotate(-15deg) scaleY(1); opacity: 0.3; }
                50% { transform: rotate(-45deg) scaleY(1.2); opacity: 0.6; }
            }
            @keyframes pulseFast {
                0%, 100% { opacity: 0; }
                50% { opacity: 0.05; }
            }
            
            .animate-beam-sweep-left { animation: beamSweepLeft 8s ease-in-out infinite; }
            .animate-beam-sweep-left-slow { animation: beamSweepLeft 12s ease-in-out infinite reverse; }
            
            .animate-beam-sweep-right { animation: beamSweepRight 8s ease-in-out infinite; }
            .animate-beam-sweep-right-slow { animation: beamSweepRight 11s ease-in-out infinite reverse; }
            
            .animate-pulse-fast { animation: pulseFast 4s ease-in-out infinite; }
        `}</style>
    </div>
  );
};
