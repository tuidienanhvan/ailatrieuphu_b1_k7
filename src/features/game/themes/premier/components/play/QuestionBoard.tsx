/**
 * Premier Theme - Question Board
 * Theme: TV Show / Premier style với màu xanh navy và vàng gold
 */

import React from 'react';
import LatexDisplay from '../../../../../../common/components/LatexDisplay';
import { useQuestionBoard } from '../../../../hooks/play/useQuestionBoard';
import { Zap } from 'lucide-react';

interface QuestionBoardProps {
    timer: number;
    maxDuration: number;
    hideContent?: boolean;
}

export const QuestionBoard: React.FC<QuestionBoardProps> = ({ timer, maxDuration, hideContent }) => {
    const { questionText, progress, isDanger } = useQuestionBoard(timer, maxDuration);

    const size = 160;
    const center = size / 2;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2 - 12;
    const circ = radius * 2 * Math.PI;
    const offset = circ - (progress / 100) * circ;

    const activeColor = isDanger ? '#ef4444' : '#fbbf24';
    const glowColor = isDanger ? 'rgba(239, 68, 68, 0.6)' : 'rgba(251, 191, 36, 0.6)';

    return (
        <div className="w-full flex flex-col items-center relative z-10 px-16 mt-6 mb-4">

            <div className="relative z-50 mb-[-80px] group select-none transition-transform duration-300 scale-110">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[40px] opacity-40 transition-all duration-500"
                    style={{ backgroundColor: activeColor }}
                ></div>

                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible relative z-10">
                    <defs>
                        <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={activeColor} stopOpacity="1" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                        </linearGradient>

                        <mask id="tickMask">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            {[...Array(60)].map((_, i) => (
                                <line
                                    key={i}
                                    x1={center + (radius) * Math.cos(i * 6 * Math.PI / 180)}
                                    y1={center + (radius) * Math.sin(i * 6 * Math.PI / 180)}
                                    x2={center + (radius + 10) * Math.cos(i * 6 * Math.PI / 180)}
                                    y2={center + (radius + 10) * Math.sin(i * 6 * Math.PI / 180)}
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            ))}
                        </mask>
                    </defs>

                    <circle cx={center} cy={center} r={radius + 14} fill="#020617" stroke={activeColor} strokeWidth="1" opacity="0.2" />
                    <circle cx={center} cy={center} r={radius - 5} fill="#0f172a" stroke="none" opacity="0.8" />

                    <path d={`M${center},${center - radius - 18} L${center},${center - radius - 12}`} stroke={activeColor} strokeWidth="2" />
                    <path d={`M${center},${center + radius + 18} L${center},${center + radius + 12}`} stroke={activeColor} strokeWidth="2" />
                    <path d={`M${center - radius - 18},${center} L${center - radius - 12},${center}`} stroke={activeColor} strokeWidth="2" />
                    <path d={`M${center + radius + 18},${center} L${center + radius + 12},${center}`} stroke={activeColor} strokeWidth="2" />

                    <circle cx={center} cy={center} r={radius} fill="none" stroke="white" strokeWidth={strokeWidth} opacity="0.1" />

                    <circle
                        cx={center} cy={center} r={radius}
                        fill="none"
                        stroke="url(#progressGrad)"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        transform={`rotate(-90 ${center} ${center})`}
                        className="transition-all duration-1000 ease-linear"
                        filter="url(#coreGlow)"
                    />

                    {[...Array(12)].map((_, i) => (
                        <circle
                            key={i}
                            cx={center + (radius - 12) * Math.cos(i * 30 * Math.PI / 180)}
                            cy={center + (radius - 12) * Math.sin(i * 30 * Math.PI / 180)}
                            r="1.5"
                            fill={i % 3 === 0 ? "white" : "rgba(255,255,255,0.3)"}
                        />
                    ))}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pb-1">
                    <div className="relative">
                        <span
                            className="text-[56px] font-black font-mono tracking-tighter leading-none transition-all duration-300"
                            style={{
                                color: '#ffffff',
                                textShadow: `0 0 20px ${glowColor}, 0 4px 4px rgba(0,0,0,0.5)`
                            }}
                        >
                            {timer}
                        </span>
                    </div>
                    <div className="absolute bottom-8 opacity-80 animate-pulse">
                        <Zap size={12} fill={activeColor} className={isDanger ? "text-red-500" : "text-yellow-400"} />
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-[1400px] z-10">
                <div className="absolute inset-0 z-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    <svg className="w-full h-full" viewBox="0 0 1400 380" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#020617" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
                            </linearGradient>
                            <pattern id="hexGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z" fill="none" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" />
                            </pattern>
                        </defs>

                        <path
                            d="M40,0 L560,0 L600,40 L800,40 L840,0 L1360,0 L1400,40 L1400,340 L1360,380 L40,380 L0,340 L0,40 Z"
                            fill="url(#panelGrad)"
                            stroke="rgba(59, 130, 246, 0.3)"
                            strokeWidth="2"
                        />

                        <path
                            d="M45,5 L565,5 L605,45 L795,45 L835,5 L1355,5 L1395,45 L1395,335 L1355,375 L45,375 L5,335 L5,45 Z"
                            fill="url(#hexGrid)"
                        />

                        <path d="M0,80 L20,80" stroke="#60a5fa" strokeWidth="3" />
                        <path d="M0,300 L20,300" stroke="#60a5fa" strokeWidth="3" />
                        <path d="M1380,80 L1400,80" stroke="#60a5fa" strokeWidth="3" />
                        <path d="M1380,300 L1400,300" stroke="#60a5fa" strokeWidth="3" />

                        <path d="M600,380 L800,380" stroke="#60a5fa" strokeWidth="4" opacity="0.5" />
                        <rect x="680" y="370" width="40" height="6" fill="#60a5fa" opacity="0.8" />
                    </svg>
                </div>

                <div className="relative z-10 w-full min-h-[380px] flex flex-col items-center justify-center pt-24 pb-12 px-24 text-center">

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-900/10 blur-3xl rounded-full pointer-events-none"></div>

                    <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black text-white leading-[1.4] tracking-tight font-sans drop-shadow-[0_4px_10px_rgba(0,0,0,1)] text-balance animate-fade-in relative z-20">
                        {!hideContent && <LatexDisplay text={questionText} />}
                    </h2>

                    <div className="absolute bottom-6 left-12 flex gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-blue-500/40 rounded-sm"></div>)}
                    </div>
                    <div className="absolute bottom-6 right-12 flex gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-blue-500/40 rounded-sm"></div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
