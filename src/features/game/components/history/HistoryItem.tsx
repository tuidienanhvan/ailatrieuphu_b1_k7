
import React from 'react';
import { MatchRecord } from '../../types/entities';
import { Trophy, XCircle, ShieldCheck, Calendar } from 'lucide-react';

interface HistoryItemProps {
  record: MatchRecord;
  index: number;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ record, index }) => {
  const date = new Date(record.timestamp);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1} - ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

  const getTheme = () => {
    switch (record.result) {
      case 'victory':
        return {
          bg: 'bg-yellow-900/20',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          icon: Trophy,
          label: 'CHIẾN THẮNG'
        };
      case 'stop':
        return {
          bg: 'bg-blue-900/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          icon: ShieldCheck,
          label: 'BẢO TOÀN'
        };
      default:
        return {
          bg: 'bg-red-900/10',
          border: 'border-red-500/20',
          text: 'text-red-400',
          icon: XCircle,
          label: 'DỪNG BƯỚC'
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <div 
        className={`
            w-full flex items-center justify-between p-4 rounded-lg border backdrop-blur-sm transition-all hover:bg-white/5
            ${theme.bg} ${theme.border} animate-fade-in
        `}
        style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${theme.border} bg-black/30`}>
              <Icon size={20} className={theme.text} />
          </div>
          <div className="flex flex-col">
              <span className={`text-sm font-black uppercase tracking-wider ${theme.text}`}>{theme.label}</span>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mt-1">
                  <Calendar size={12} />
                  <span>{formattedDate}</span>
              </div>
          </div>
      </div>

      <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Câu hỏi</span>
              <span className="text-white font-mono font-bold text-lg">{record.level}/15</span>
          </div>
          
          <div className="flex flex-col items-end w-32">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Tiền thưởng</span>
              <span className={`font-mono font-black text-xl ${record.result === 'victory' ? 'text-yellow-400' : 'text-white'}`}>
                  {record.prize}
              </span>
          </div>
      </div>
    </div>
  );
};
