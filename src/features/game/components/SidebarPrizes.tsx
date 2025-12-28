
import React, { useMemo } from 'react';
import { Prize } from '../types/entities';

interface SidebarPrizesProps {
  prizes: Prize[];
  currentLevel: number;
}

export const SidebarPrizes: React.FC<SidebarPrizesProps> = React.memo(({ prizes, currentLevel }) => {
  // Đảo ngược mảng để hiển thị câu 15 ở trên cùng, câu 1 ở dưới cùng
  const displayPrizes = useMemo(() => [...prizes].reverse(), [prizes]);

  return (
    <div className="h-full flex flex-col justify-center items-end py-10 pr-12 pl-6 z-20 pointer-events-none select-none">
        <div className="flex flex-col gap-1 w-[320px]">
            {displayPrizes.map((prize) => {
                // currentLevel là index (0-14), prize.level là (1-15)
                const isCurrent = prize.level === currentLevel + 1;
                const isPassed = prize.level <= currentLevel;
                const isMilestone = prize.milestone;

                return (
                    <div 
                        key={prize.level}
                        className={`
                            relative flex items-center justify-between px-6 py-1.5 rounded-lg border-2 transition-all duration-300
                            ${isCurrent 
                                ? 'bg-[#fbbf24] border-white scale-110 z-10 shadow-[0_0_30px_rgba(251,191,36,0.6)]' 
                                : 'bg-black/60 border-transparent'
                            }
                            ${!isCurrent && isMilestone ? 'text-white' : ''}
                            ${!isCurrent && !isMilestone && !isPassed ? 'text-[#fbbf24]' : ''}
                            ${!isCurrent && isPassed ? 'opacity-30' : ''}
                        `}
                    >
                        <span className={`
                            font-bold text-sm w-6
                            ${isCurrent ? 'text-black' : (isMilestone ? 'text-white' : 'text-[#fbbf24]')}
                        `}>
                            {prize.level}
                        </span>
                        
                        {/* Vạch kẻ trang trí cho mốc quan trọng */}
                        {isMilestone && !isCurrent && (
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 -z-10 mx-4"></div>
                        )}

                        <span className={`
                            font-mono font-bold text-xl tracking-tighter
                            ${isCurrent ? 'text-black font-black' : ''}
                        `}>
                            {prize.amount}
                        </span>
                    </div>
                );
            })}
        </div>
    </div>
  );
});
