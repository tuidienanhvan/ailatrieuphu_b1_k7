
import React, { useMemo } from 'react';
import { Prize } from '../../types/entities';

interface SidebarPrizesProps {
    prizes: Prize[];
    currentLevel: number;
}

// Creative SVG Icons - More elaborate designs
const CrownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="crownGlow">
                <feGaussianBlur stdDeviation="1" result="glow" />
                <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>
        <path
            d="M12 3L15 8L21 6L18 14H6L3 6L9 8L12 3Z"
            fill="url(#crownGold)"
            stroke="#fde047"
            strokeWidth="0.5"
            filter="url(#crownGlow)"
        />
        <path d="M6 14H18V17C18 18 17 19 16 19H8C7 19 6 18 6 17V14Z" fill="#d97706" stroke="#fbbf24" strokeWidth="0.3" />
        <circle cx="8" cy="8" r="1" fill="#fff" opacity="0.6" />
        <circle cx="12" cy="5" r="1" fill="#fff" opacity="0.6" />
        <circle cx="16" cy="8" r="1" fill="#fff" opacity="0.6" />
    </svg>
);

const DiamondShield: React.FC<{ className?: string; color?: 'blue' | 'gold' }> = ({ className, color = 'blue' }) => (
    <svg viewBox="0 0 24 28" fill="none" className={className}>
        <defs>
            <linearGradient id={`shield${color}`} x1="12" y1="0" x2="12" y2="28">
                <stop offset="0%" stopColor={color === 'gold' ? '#fcd34d' : '#60a5fa'} />
                <stop offset="100%" stopColor={color === 'gold' ? '#92400e' : '#1e3a8a'} />
            </linearGradient>
            <filter id={`shieldGlow${color}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>
        <path
            d="M12 1L22 6V14C22 20 17 26 12 27C7 26 2 20 2 14V6L12 1Z"
            fill={`url(#shield${color})`}
            stroke={color === 'gold' ? '#fde047' : '#93c5fd'}
            strokeWidth="1"
            filter={`url(#shieldGlow${color})`}
        />
        <path d="M12 5L18 8V13C18 17 15 21 12 22C9 21 6 17 6 13V8L12 5Z" fill="none" stroke={color === 'gold' ? '#fef3c7' : '#bfdbfe'} strokeWidth="0.5" opacity="0.6" />
        <path d="M12 9L14 12L12 19L10 12L12 9Z" fill={color === 'gold' ? '#fef3c7' : '#dbeafe'} opacity="0.8" />
    </svg>
);

const HexagonStar: React.FC<{ className?: string; pulse?: boolean }> = ({ className, pulse }) => (
    <svg viewBox="0 0 28 32" fill="none" className={`${className} ${pulse ? 'animate-pulse' : ''}`}>
        <defs>
            <linearGradient id="hexStarGrad" x1="14" y1="0" x2="14" y2="32">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="hexStarGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>
        {/* Outer hexagon */}
        <path d="M14 0L26 8V24L14 32L2 24V8L14 0Z" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.3" />
        {/* Inner hexagon */}
        <path d="M14 4L22 10V22L14 28L6 22V10L14 4Z" fill="rgba(251, 191, 36, 0.15)" stroke="#fbbf24" strokeWidth="1" />
        {/* Star */}
        <path
            d="M14 8L16 13H21L17 17L18.5 22L14 19L9.5 22L11 17L7 13H12L14 8Z"
            fill="url(#hexStarGrad)"
            stroke="#fef3c7"
            strokeWidth="0.5"
            filter="url(#hexStarGlow)"
        />
    </svg>
);

const CircuitLines: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 40 20" fill="none" className={className}>
        <path d="M0 10H10L15 5H25L30 10H40" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
        <circle cx="10" cy="10" r="2" fill="#60a5fa" opacity="0.6" />
        <circle cx="30" cy="10" r="2" fill="#60a5fa" opacity="0.6" />
        <circle cx="20" cy="5" r="1.5" fill="#3b82f6" />
    </svg>
);

const TechCorner: React.FC<{ className?: string; flip?: boolean; style?: React.CSSProperties }> = ({ className, flip, style }) => (
    <svg viewBox="0 0 60 60" fill="none" className={className} style={style || (flip ? { transform: 'scaleX(-1)' } : {})}>
        <path d="M0 60V40L10 30V10L30 10L40 0H60" stroke="#60a5fa" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M5 55V45L15 35V15L35 15L45 5" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3" />
        <circle cx="15" cy="35" r="3" fill="#60a5fa" opacity="0.4" />
        <circle cx="35" cy="15" r="3" fill="#60a5fa" opacity="0.4" />
        <rect x="0" y="40" width="8" height="3" fill="#3b82f6" opacity="0.6" />
    </svg>
);

export const SidebarPrizes: React.FC<SidebarPrizesProps> = React.memo(({ prizes, currentLevel }) => {
    const displayPrizes = useMemo(() => [...prizes].reverse(), [prizes]);

    return (
        <div className="h-full flex flex-col justify-center items-end py-4 pr-4 z-20 pointer-events-none select-none">
            {/* Main Container - LARGER SIZE */}
            <div className="relative w-[380px]">

                {/* Tech Corner Decorations */}
                <TechCorner className="absolute -top-6 -left-6 w-16 h-16" />
                <TechCorner className="absolute -top-6 -right-6 w-16 h-16" flip />
                <TechCorner className="absolute -bottom-6 -left-6 w-16 h-16" style={{ transform: 'scaleY(-1)' }} />
                <TechCorner className="absolute -bottom-6 -right-6 w-16 h-16" style={{ transform: 'scale(-1, -1)' }} />

                {/* Main Background SVG Frame */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 380 720"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="sidebarGrad2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.97" />
                            <stop offset="50%" stopColor="#020617" stopOpacity="0.99" />
                            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.97" />
                        </linearGradient>

                        {/* Advanced hexagonal grid */}
                        <pattern id="hexGrid2" width="40" height="46" patternUnits="userSpaceOnUse">
                            <path d="M20 0L40 11.5V34.5L20 46L0 34.5V11.5L20 0Z" fill="none" stroke="rgba(59, 130, 246, 0.06)" strokeWidth="0.5" />
                            <circle cx="20" cy="23" r="1" fill="rgba(96, 165, 250, 0.1)" />
                        </pattern>

                        {/* Animated scan line */}
                        <linearGradient id="scanLine" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="rgba(96, 165, 250, 0.3)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>

                        <filter id="frameGlow" x="-10%" y="-10%" width="120%" height="120%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    {/* Outer glow border */}
                    <path
                        d="M30,0 L350,0 L380,30 L380,690 L350,720 L30,720 L0,690 L0,30 Z"
                        fill="none"
                        stroke="rgba(59, 130, 246, 0.2)"
                        strokeWidth="6"
                        filter="url(#frameGlow)"
                    />

                    {/* Main panel */}
                    <path
                        d="M25,5 L355,5 L375,25 L375,695 L355,715 L25,715 L5,695 L5,25 Z"
                        fill="url(#sidebarGrad2)"
                        stroke="rgba(59, 130, 246, 0.4)"
                        strokeWidth="2"
                    />

                    {/* Inner hex pattern */}
                    <path
                        d="M30,10 L350,10 L370,30 L370,690 L350,710 L30,710 L10,690 L10,30 Z"
                        fill="url(#hexGrid2)"
                    />

                    {/* Corner accents */}
                    <path d="M5,25 L25,5 L45,5 L25,25 L5,45 L5,25" fill="rgba(59, 130, 246, 0.15)" />
                    <path d="M375,25 L355,5 L335,5 L355,25 L375,45 L375,25" fill="rgba(59, 130, 246, 0.15)" />
                    <path d="M5,695 L25,715 L45,715 L25,695 L5,675 L5,695" fill="rgba(59, 130, 246, 0.15)" />
                    <path d="M375,695 L355,715 L335,715 L355,695 L375,675 L375,695" fill="rgba(59, 130, 246, 0.15)" />

                    {/* Side accent lines */}
                    <path d="M0,80 L15,80 L20,75" stroke="#60a5fa" strokeWidth="2" />
                    <path d="M0,640 L15,640 L20,645" stroke="#60a5fa" strokeWidth="2" />
                    <path d="M380,80 L365,80 L360,75" stroke="#60a5fa" strokeWidth="2" />
                    <path d="M380,640 L365,640 L360,645" stroke="#60a5fa" strokeWidth="2" />

                    {/* Circuit decorations */}
                    <path d="M50,720 L80,720 M100,720 L150,720 M170,720 L230,720 M250,720 L280,720 M300,720 L330,720" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />

                    {/* Center bottom jewel */}
                    <path d="M180,705 L190,720 L200,705 L190,710 Z" fill="#60a5fa" opacity="0.6" />
                </svg>

                {/* Header with Crown */}
                <div className="relative flex items-center justify-center gap-3 pt-6 pb-4 z-10">
                    <CircuitLines className="w-10 h-5 opacity-60" />
                    <CrownIcon className="w-10 h-10" />
                    <CircuitLines className="w-10 h-5 opacity-60 scale-x-[-1]" />
                </div>

                {/* Prize List - LARGER ITEMS */}
                <div className="relative flex flex-col gap-1 z-10 px-5 pb-6">
                    {displayPrizes.map((prize) => {
                        const isCurrent = prize.level === currentLevel + 1;
                        const isPassed = prize.level <= currentLevel;
                        const isMilestone = prize.milestone;
                        const isJackpot = prize.level === 15; // Level 15 = Final Jackpot

                        return (
                            <div
                                key={prize.level}
                                className={`
                  relative flex items-center justify-between px-5 transition-all duration-300 overflow-hidden
                  ${isJackpot && !isCurrent ? 'py-3' : 'py-2'}
                  ${isCurrent
                                        ? 'bg-gradient-to-r from-amber-500/25 via-yellow-400/35 to-amber-500/25 scale-[1.02] z-20'
                                        : isJackpot
                                            ? 'bg-gradient-to-r from-purple-900/50 via-amber-900/40 to-purple-900/50 hover:from-purple-800/50 hover:via-amber-800/40 hover:to-purple-800/50'
                                            : 'bg-slate-900/40 hover:bg-slate-800/50'
                                    }
                  ${!isCurrent && isPassed ? 'opacity-30' : ''}
                `}
                                style={{
                                    clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                                    border: isCurrent
                                        ? '1.5px solid rgba(251, 191, 36, 0.7)'
                                        : isJackpot
                                            ? '2px solid rgba(168, 85, 247, 0.6)'
                                            : isMilestone
                                                ? '1.5px solid rgba(96, 165, 250, 0.5)'
                                                : '1px solid rgba(96, 165, 250, 0.2)'
                                }}
                            >
                                {/* Current level effects */}
                                {isCurrent && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/15 to-transparent animate-pulse" />
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-300" />
                                        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-300/50 via-amber-400/50 to-yellow-300/50" />
                                    </>
                                )}

                                {/* Jackpot (Level 15) royal effects */}
                                {isJackpot && !isCurrent && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent" style={{ animation: 'shimmer 3s infinite' }} />
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-amber-400 to-purple-400" />
                                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-amber-400 to-purple-400" />
                                    </>
                                )}

                                {/* Level Icon + Number */}
                                <div className="flex items-center gap-3 z-10">
                                    {isCurrent && (
                                        <HexagonStar className="w-8 h-9 shrink-0" pulse />
                                    )}
                                    {isJackpot && !isCurrent && (
                                        <RoyalCrown className="w-9 h-8 shrink-0" />
                                    )}
                                    {isMilestone && !isCurrent && !isJackpot && (
                                        <DiamondShield className="w-6 h-7 shrink-0" color="blue" />
                                    )}
                                    {!isMilestone && !isCurrent && !isJackpot && (
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-blue-500/40 rotate-45" />
                                        </div>
                                    )}

                                    <span className={`
                    font-bold text-base w-6 text-center font-mono
                    ${isCurrent
                                            ? 'text-yellow-200 text-lg'
                                            : isJackpot
                                                ? 'text-purple-300 text-lg'
                                                : isMilestone
                                                    ? 'text-blue-300'
                                                    : 'text-slate-400'
                                        }
                  `}>
                                        {prize.level}
                                    </span>
                                </div>

                                {/* Milestone decoration line */}
                                {isMilestone && !isCurrent && (
                                    <div className="absolute left-20 right-28 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-blue-500/40 via-blue-400/20 to-transparent" />
                                )}

                                {/* Prize Amount */}
                                <span className={`
                  font-mono font-bold tracking-tight z-10
                  ${isCurrent
                                        ? 'text-yellow-100 text-xl'
                                        : isJackpot
                                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 text-xl'
                                            : isMilestone
                                                ? 'text-white text-lg'
                                                : 'text-slate-200 text-base'
                                    }
                `}>
                                    {prize.amount}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom decoration */}
                <div className="absolute bottom-3 left-6 flex gap-1.5">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-2 h-2 bg-blue-500/50 rounded-sm" />)}
                </div>
                <div className="absolute bottom-3 right-6 flex gap-1.5">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-2 h-2 bg-blue-500/50 rounded-sm" />)}
                </div>
            </div>
        </div>
    );
});

// Royal Crown for Level 15 (Jackpot)
const RoyalCrown: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 32 28" fill="none" className={className}>
        <defs>
            <linearGradient id="royalGrad" x1="16" y1="0" x2="16" y2="28">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="30%" stopColor="#fbbf24" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="royalPurple" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="royalGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>
        {/* Crown base */}
        <path d="M16 2L20 9L28 6L24 16H8L4 6L12 9L16 2Z" fill="url(#royalGrad)" stroke="#fde047" strokeWidth="1" filter="url(#royalGlow)" />
        {/* Crown band */}
        <rect x="8" y="16" width="16" height="5" rx="1" fill="url(#royalPurple)" stroke="#c084fc" strokeWidth="0.5" />
        {/* Gems on crown */}
        <circle cx="10" cy="8" r="2" fill="#ec4899" stroke="#f9a8d4" strokeWidth="0.5" />
        <circle cx="16" cy="5" r="2.5" fill="#22d3ee" stroke="#67e8f9" strokeWidth="0.5" />
        <circle cx="22" cy="8" r="2" fill="#22c55e" stroke="#86efac" strokeWidth="0.5" />
        {/* Gem on band */}
        <path d="M16 16L18 18.5L16 21L14 18.5L16 16Z" fill="#fef3c7" stroke="#fbbf24" strokeWidth="0.3" />
        {/* Sparkles */}
        <path d="M6 4L7 5L6 6L5 5L6 4Z" fill="#fef3c7" opacity="0.8" />
        <path d="M26 4L27 5L26 6L25 5L26 4Z" fill="#fef3c7" opacity="0.8" />
        <path d="M16 0L16.5 1L16 2L15.5 1L16 0Z" fill="#fff" />
    </svg>
);
