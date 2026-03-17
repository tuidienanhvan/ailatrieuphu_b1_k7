
import React from 'react';

export const GameTitle = () => {
  return (
    <div className="relative w-full flex items-center justify-center overflow-visible z-50 py-2">
      <h1 className="relative flex flex-col items-center">
        {/* Shadow Layer */}
        <span
          className="absolute inset-0 flex items-center justify-center text-[90px] leading-[1.3] font-black italic tracking-tighter uppercase text-transparent select-none drop-shadow-2xl opacity-50"
          style={{
            WebkitTextStroke: '20px rgba(0,0,0,1)',
            padding: '20px 60px'
          }}
        >
          AI LÀ TRIỆU PHÚ
        </span>

        {/* Main Gold Text */}
        <span
          className="
              relative
              text-[90px] leading-[1.4] font-black italic tracking-tighter uppercase
              text-transparent bg-clip-text 
              animate-text-shine-infinite
              whitespace-nowrap drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]
          "
          style={{
            backgroundImage: 'linear-gradient(90deg, #ca8a04, #fde047, #ffffff, #fde047, #ca8a04)',
            backgroundSize: '200% auto',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
            padding: '20px 60px',
            animationDuration: '5s'
          }}
        >
          AI LÀ TRIỆU PHÚ
        </span>
      </h1>
    </div>
  );
};
