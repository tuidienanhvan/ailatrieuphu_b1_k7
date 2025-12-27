
import React from 'react';
import { Trophy, RotateCcw, XCircle, Star, Crown } from 'lucide-react';

interface ResultScreenProps {
  isVictory: boolean;
  prize: string;
  onReset: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ isVictory, prize, onReset }) => {
  // Theme configuration
  const theme = isVictory 
    ? {
        mainColor: '#fbbf24', // Gold
        secondaryColor: '#b45309',
        gradient: 'from-[#fbbf24] to-[#d97706]',
        glow: 'shadow-[0_0_50px_rgba(251,191,36,0.5)]',
        bgGlow: 'bg-yellow-500/20',
        title: 'CHIẾN THẮNG',
        icon: Trophy,
        subtext: 'BẠN LÀ TRIỆU PHÚ MỚI'
      }
    : {
        mainColor: '#ef4444', // Red
        secondaryColor: '#7f1d1d',
        gradient: 'from-[#ef4444] to-[#991b1b]',
        glow: 'shadow-[0_0_50px_rgba(239,68,68,0.5)]',
        bgGlow: 'bg-red-500/10',
        title: 'KẾT THÚC',
        icon: XCircle,
        subtext: 'CHÚC BẠN MAY MẮN LẦN SAU'
      };

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/95 animate-fade-in overflow-hidden">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Rotating Rays (Only for Victory or High Prize) */}
          {isVictory && (
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
               <div className="w-[200vw] h-[200vw] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(251,191,36,0.2)_15deg,transparent_30deg,rgba(251,191,36,0.2)_45deg,transparent_60deg,rgba(251,191,36,0.2)_75deg,transparent_90deg,rgba(251,191,36,0.2)_105deg,transparent_120deg,rgba(251,191,36,0.2)_135deg,transparent_150deg,rgba(251,191,36,0.2)_165deg,transparent_180deg,rgba(251,191,36,0.2)_195deg,transparent_210deg,rgba(251,191,36,0.2)_225deg,transparent_240deg,rgba(251,191,36,0.2)_255deg,transparent_270deg,rgba(251,191,36,0.2)_285deg,transparent_300deg,rgba(251,191,36,0.2)_315deg,transparent_330deg,rgba(251,191,36,0.2)_345deg,transparent_360deg)] animate-[spin_60s_linear_infinite]"></div>
            </div>
          )}
          
          {/* Ambient Glow */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] opacity-20 ${isVictory ? 'bg-yellow-500' : 'bg-red-600'}`}></div>
          
          {/* Particles */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="relative w-full max-w-4xl transform transition-all duration-500 hover:scale-[1.01]">
          {/* Decorative Borders */}
          <div className="absolute -inset-1 bg-gradient-to-b from-white/20 to-transparent rounded-[3rem] blur-sm"></div>
          
          <div className={`relative bg-[#020617] border-2 border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center p-12 lg:p-16 ${theme.glow}`}>
               
               {/* Card Texture */}
               <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
               <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }}></div>

               {/* HEADER ICON */}
               <div className="relative mb-8 group">
                   <div className={`absolute inset-0 rounded-full blur-[40px] opacity-60 animate-pulse ${theme.bgGlow}`}></div>
                   <div className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center bg-black shadow-2xl z-10 transition-transform duration-500 group-hover:rotate-12`} style={{ borderColor: theme.mainColor }}>
                       <theme.icon size={64} style={{ color: theme.mainColor }} strokeWidth={1.5} className="drop-shadow-lg" />
                   </div>
                   {isVictory && (
                     <>
                        <Star className="absolute -top-4 -right-4 text-yellow-200 animate-bounce delay-100 drop-shadow-lg" size={32} fill="#fef08a" />
                        <Star className="absolute top-10 -left-10 text-yellow-400 animate-bounce delay-300 drop-shadow-lg" size={24} fill="#facc15" />
                        <Crown className="absolute -bottom-2 -right-2 text-yellow-500 animate-pulse" size={40} fill="#eab308" />
                     </>
                   )}
               </div>

               {/* TITLE */}
               <div className="text-center z-10 mb-10">
                   <h2 className="text-[80px] leading-none font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-sm mb-2 font-sans">
                      {theme.title}
                   </h2>
                   <div className="flex items-center justify-center gap-4 opacity-80">
                      <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-white"></div>
                      <span className="text-lg font-bold tracking-[0.4em] text-white uppercase">{theme.subtext}</span>
                      <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-white"></div>
                   </div>
               </div>

               {/* PRIZE DISPLAY (REACTOR CORE) */}
               <div className="relative w-full max-w-2xl h-40 mb-12 flex items-center justify-center z-10">
                   {/* Background Bar */}
                   <div className="absolute inset-0 bg-black/60 border border-white/10 transform -skew-x-12 rounded-lg"></div>
                   
                   {/* Animated Borders */}
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                   <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                   
                   {/* Glow Behind Text */}
                   <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-[80%] h-[50%] blur-[40px] opacity-40 rounded-full" style={{ backgroundColor: theme.mainColor }}></div>
                   </div>

                   {/* Main Text */}
                   <div className="relative flex flex-col items-center">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.5em] mb-1">Tổng Giải Thưởng</span>
                       <span 
                          className="text-6xl md:text-7xl font-mono font-black tracking-tighter drop-shadow-2xl"
                          style={{ 
                              color: isVictory ? '#fffbeb' : '#fff',
                              textShadow: `0 0 20px ${theme.secondaryColor}`
                          }}
                       >
                          {prize}
                       </span>
                   </div>
               </div>

               {/* ACTION BUTTON */}
               <button 
                  onClick={onReset}
                  className="group relative px-16 py-6 bg-transparent overflow-hidden rounded-full transition-all duration-300 active:scale-95 z-20"
               >
                  <div className={`absolute inset-0 opacity-80 transition-all duration-300 group-hover:opacity-100 bg-gradient-to-r ${theme.gradient}`}></div>
                  
                  {/* Button Glow */}
                  <div className={`absolute -inset-3 blur-xl opacity-40 group-hover:opacity-70 transition-opacity bg-gradient-to-r ${theme.gradient}`}></div>
                  
                  <div className="relative flex items-center gap-3 text-black font-black uppercase tracking-[0.2em] text-xl">
                      <RotateCcw size={24} strokeWidth={3} className="group-hover:-rotate-180 transition-transform duration-500" />
                      <span>Chơi Lại Ngay</span>
                  </div>
               </button>

          </div>
      </div>
    </div>
  );
};
