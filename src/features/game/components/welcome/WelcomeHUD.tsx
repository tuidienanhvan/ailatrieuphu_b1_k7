
import React from 'react';
import { Wifi, Radio, Battery, Globe } from 'lucide-react';

export const WelcomeHUD = () => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between p-8 overflow-hidden">
      
      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-start">
          {/* Top Left: System Info */}
          {/* Added pl-6 pt-4 to clear the corner bracket */}
          <div className="flex flex-col gap-1 pl-6 pt-4">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                  <Radio size={16} className="animate-pulse" />
                  <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">System Online</span>
              </div>
              <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-8 h-1 bg-white/20 rounded-sm overflow-hidden">
                          <div className="h-full bg-white/60 animate-pulse" style={{ width: '100%', animationDelay: `${i * 0.1}s` }}></div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Top Right: Connection */}
          {/* Added pr-6 pt-4 to clear the corner bracket */}
          <div className="flex flex-col items-end gap-1 text-slate-500 pr-6 pt-4">
              <div className="flex items-center gap-4 text-xs font-mono font-bold tracking-widest border border-white/10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                      <Globe size={12} />
                      <span>REGION: VN</span>
                  </div>
                  <div className="w-[1px] h-3 bg-white/20"></div>
                  <div className="flex items-center gap-2 text-green-500">
                      <Wifi size={12} />
                      <span>60ms</span>
                  </div>
                  <div className="w-[1px] h-3 bg-white/20"></div>
                  <div className="flex items-center gap-2 text-blue-400">
                      <Battery size={12} />
                      <span>100%</span>
                  </div>
              </div>
          </div>
      </div>

      {/* --- CORNER BRACKETS (DECORATION) --- */}
      {/* Top Left */}
      <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-[#fbbf24]/30 rounded-tl-lg"></div>
      {/* Top Right */}
      <div className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-[#fbbf24]/30 rounded-tr-lg"></div>
      {/* Bottom Left */}
      <div className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-[#fbbf24]/30 rounded-bl-lg"></div>
      {/* Bottom Right */}
      <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-[#fbbf24]/30 rounded-br-lg"></div>

    </div>
  );
};
