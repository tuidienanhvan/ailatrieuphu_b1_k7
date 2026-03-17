import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    large?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, large }) => (
    <div
        className={`
      relative p-4 bg-black/40 border overflow-hidden group
      hover:border-opacity-60 transition-all duration-300
      ${large ? '' : ''}
    `}
        style={{ borderColor: `${color}30` }}
    >
        {/* Accent corner */}
        <div
            className="absolute top-0 left-0 w-8 h-8 -translate-x-4 -translate-y-4 rotate-45"
            style={{ backgroundColor: color, opacity: 0.3 }}
        />

        <div className="relative">
            <div className="flex items-center gap-2 mb-2">
                <span style={{ color }}>{icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    {label}
                </span>
            </div>
            <span
                className={`font-mono font-black block truncate ${large ? 'text-2xl' : 'text-xl'}`}
                style={{ color }}
                title={String(value)}
            >
                {value}
            </span>
        </div>
    </div>
);
