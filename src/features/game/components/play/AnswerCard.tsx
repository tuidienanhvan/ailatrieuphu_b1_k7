
import React, { useMemo } from 'react';
import LatexDisplay from '../../../../common/components/LatexDisplay';
import { Zap, ShieldCheck, AlertCircle, Radio } from 'lucide-react';

interface AnswerCardProps {
  label: string;
  text: string;
  state: 'default' | 'selected' | 'correct' | 'wrong' | 'hidden';
  onClick: () => void;
  disabled?: boolean;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({ label, text, state, onClick, disabled }) => {
  if (state === 'hidden') return <div className="invisible h-full w-full pointer-events-none" />;

  const theme = useMemo(() => {
    switch (state) {
      case 'selected':
        return {
          color: '#fbbf24',
          bg: 'from-[#451a03] to-[#1c1917]',
          border: 'border-[#fbbf24]',
          shadow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]',
          indicator: <Zap size={16} className="text-[#fbbf24] animate-pulse" />,
          status: 'SYSTEM LOCKED'
        };
      case 'correct':
        return {
          color: '#22c55e',
          bg: 'from-[#064e3b] to-[#022c22]',
          border: 'border-[#22c55e]',
          shadow: 'shadow-[0_0_40px_rgba(34,197,94,0.4)]',
          indicator: <ShieldCheck size={16} className="text-[#22c55e] animate-bounce" />,
          status: 'ACCESS GRANTED'
        };
      case 'wrong':
        return {
          color: '#ef4444',
          bg: 'from-[#450a0a] to-[#1c1917]',
          border: 'border-[#ef4444]',
          shadow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]',
          indicator: <AlertCircle size={16} className="text-[#ef4444] animate-shake" />,
          status: 'ERROR: INVALID'
        };
      default:
        return {
          color: '#3b82f6',
          bg: 'from-[#0f172a] to-[#020617]',
          border: 'border-blue-500/20 group-hover:border-blue-500/60',
          shadow: 'shadow-lg',
          indicator: <Radio size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors" />,
          status: 'READY_TO_SYNC'
        };
    }
  }, [state]);

  return (
    <button
      onClick={onClick}
      disabled={disabled || state !== 'default'}
      className={`
        group relative w-full h-[100px] flex items-stretch transition-all duration-500
        active:scale-[0.97] outline-none select-none overflow-visible
        ${state !== 'default' ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      {/* Label Box (A, B, C, D) */}
      <div className="relative w-20 shrink-0 flex items-center justify-center z-30">
        <div
          className={`
                w-12 h-12 flex items-center justify-center transition-all duration-500
                bg-[#020617] border-2 shadow-2xl relative rotate-45 group-hover:rotate-0
                ${state === 'default' ? 'border-white/10 group-hover:border-blue-400' : theme.border}
            `}
        >
          <span className={`
                text-2xl font-black font-mono tracking-tighter transition-all duration-500
                ${state === 'default' ? 'text-slate-600 group-hover:text-blue-400' : 'text-white scale-110 -rotate-45 group-hover:-rotate-45'}
                ${state === 'default' ? '-rotate-45' : ''}
              `}>
            {label}
          </span>

          <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 border border-white/10 ${state === 'default' ? 'bg-slate-800' : ''}`} style={{ backgroundColor: state !== 'default' ? theme.color : undefined }}></div>
        </div>
      </div>

      {/* Main Content Box */}
      <div className="relative flex-1 flex items-stretch -ml-6 py-1 pr-4 z-20">
        <div
          className={`
                relative flex-1 flex items-center px-10 transition-all duration-500
                bg-gradient-to-br backdrop-blur-xl border-y-2 border-r-2
                ${theme.border} ${theme.bg} ${theme.shadow}
            `}
          style={{
            clipPath: 'polygon(0% 20%, 30px 0%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        >
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:15px_15px]"></div>

          {state === 'default' && (
            <div className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-blue-400/5 to-transparent group-hover:animate-[shimmer_2s_infinite_linear] pointer-events-none"></div>
          )}

          {/* Text Container with improved layout and scrollbar */}
          <div className="flex-1 min-w-0 relative z-10 h-full flex items-center">
            <div className={`
                        w-full max-h-full overflow-y-auto custom-scrollbar 
                        text-xl md:text-2xl lg:text-[26px] font-bold tracking-tight 
                        leading-relaxed py-2 pr-2
                        transition-all duration-300 
                        ${state === 'default' ? 'text-slate-400 group-hover:text-white' : 'text-white'}
                  `}>
              {text && <LatexDisplay text={text} />}
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 ml-4">
            {theme.indicator}
          </div>
        </div>

        <div className={`absolute -bottom-1 right-8 px-2 bg-black/80 border border-white/5 text-[7px] font-mono tracking-[0.2em] font-bold ${state === 'default' ? 'text-slate-600' : ''}`} style={{ color: state !== 'default' ? theme.color : undefined }}>
          {theme.status}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out infinite; }
      `}</style>
    </button>
  );
};
