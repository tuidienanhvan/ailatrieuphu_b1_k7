
import React from 'react';

// Các biểu tượng: Toán học, Tiền tệ, Logic
const SYMBOLS = ['?', '∑', 'π', '$', 'Ω', 'µ', '%', '≠', '∞', '₫', '√', '∫', '∆', 'α', 'β'];

export const FloatingSymbols = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      {/* 
        NEW CONCEPT: ORBITAL DATA VORTEX 
        Thay vì bay lên, các ký tự sẽ xoay quanh tâm (nơi đặt chiếc cúp) tạo chiều sâu 3D.
      */}
      
      {/* RING 1: Outer Slow Orbit (Xa nhất, mờ nhất) */}
      <div className="absolute w-[80vw] h-[80vw] animate-spin-slow opacity-20">
         {[...Array(8)].map((_, i) => (
            <div key={`outer-${i}`} className="absolute" style={{ 
                transform: `rotate(${i * 45}deg) translateX(40vw) rotate(-${i * 45}deg)` 
            }}>
                <span className="text-2xl text-blue-300 font-mono">{SYMBOLS[i % SYMBOLS.length]}</span>
            </div>
         ))}
      </div>

      {/* RING 2: Middle Medium Orbit (Trung bình, nghịch chiều kim đồng hồ) */}
      <div className="absolute w-[60vw] h-[60vw] animate-spin-reverse-medium opacity-40">
         {[...Array(6)].map((_, i) => (
            <div key={`mid-${i}`} className="absolute" style={{ 
                transform: `rotate(${i * 60}deg) translateX(30vw) rotate(-${i * 60}deg)` 
            }}>
                <span className="text-3xl text-[#fbbf24] font-bold font-mono">{SYMBOLS[(i + 5) % SYMBOLS.length]}</span>
            </div>
         ))}
      </div>

      {/* RING 3: Inner Fast Orbit (Gần nhất, rõ nhất) */}
      <div className="absolute w-[40vw] h-[40vw] animate-spin-slow opacity-60">
         {[...Array(5)].map((_, i) => (
            <div key={`inner-${i}`} className="absolute" style={{ 
                transform: `rotate(${i * 72}deg) translateX(20vw) rotate(-${i * 72}deg)` 
            }}>
                <span className="text-4xl text-white font-black font-serif drop-shadow-[0_0_10px_white]">
                    {SYMBOLS[(i + 2) % SYMBOLS.length]}
                </span>
            </div>
         ))}
      </div>
      
      {/* Random Floating Particles (Bụi không gian) */}
      {[...Array(15)].map((_, i) => (
          <div 
            key={`dust-${i}`}
            className="absolute bg-white rounded-full animate-pulse-random"
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                opacity: Math.random() * 0.5,
                animationDuration: Math.random() * 3 + 2 + 's'
            }}
          />
      ))}

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverseMedium {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulseRandom {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.5); opacity: 0.8; }
        }

        .animate-spin-slow { animation: spinSlow 60s linear infinite; }
        .animate-spin-reverse-medium { animation: spinReverseMedium 45s linear infinite; }
        .animate-pulse-random { animation: pulseRandom 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
