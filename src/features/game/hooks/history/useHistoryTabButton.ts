import { useMemo } from 'react';

interface UseHistoryTabButtonProps {
    active: boolean;
}

interface UseHistoryTabButtonReturn {
    buttonClasses: string;
    badgeClasses: string;
}

export const useHistoryTabButton = ({ active }: UseHistoryTabButtonProps): UseHistoryTabButtonReturn => {
    const buttonClasses = useMemo(() => `
      relative flex items-center gap-3 px-6 py-3 
      font-black uppercase tracking-[0.15em] text-sm
      transform -skew-x-6 
      transition-all duration-300 
      overflow-hidden
      ${active
            ? 'bg-[#fbbf24] text-black shadow-[0_0_30px_rgba(251,191,36,0.4)]'
            : 'bg-black/50 text-slate-400 border border-white/10 hover:border-[#fbbf24]/50 hover:text-[#fbbf24]'
        }
  `, [active]);

    const badgeClasses = useMemo(() => `
      px-2 py-0.5 text-xs font-mono rounded
      ${active ? 'bg-black/20 text-black' : 'bg-white/5 text-slate-500'}
  `, [active]);

    return { buttonClasses, badgeClasses };
};
