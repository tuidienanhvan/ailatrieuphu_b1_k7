
import React from 'react';
import { HistoryTab } from '../../hooks/history/useHistoryScreen';

interface Props {
    tab: HistoryTab;
    label: string;
    count: number;
    active: boolean;
    icon: React.ReactNode;
    onClick: () => void;
}

export const HistoryTabButton: React.FC<Props> = ({ label, count, active, icon, onClick }) => (
    <button
        onClick={onClick}
        className={`
      relative flex items-center gap-3 px-6 py-3 
      font-black uppercase tracking-[0.15em] text-sm
      transform -skew-x-6 
      transition-all duration-300 
      overflow-hidden
      ${active
                ? 'bg-[#fbbf24] text-black shadow-[0_0_30px_rgba(251,191,36,0.4)]'
                : 'bg-black/50 text-slate-400 border border-white/10 hover:border-[#fbbf24]/50 hover:text-[#fbbf24]'
            }
    `}
    >
        {/* Inner content needs to be unskewed */}
        <div className="flex items-center gap-2 transform skew-x-6">
            {icon}
            <span>{label}</span>
            <span className={`
        px-2 py-0.5 text-xs font-mono rounded
        ${active ? 'bg-black/20 text-black' : 'bg-white/5 text-slate-500'}
      `}>
                {count}
            </span>
        </div>

        {/* Shine effect on active */}
        {active && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        )}
    </button>
);
