
import React from 'react';

export const BackgroundEffects = () => {
  return (
    <>
      {/* 
        LAYER 1: DEEP VOID BASE
        Nền tối tuyệt đối pha chút xanh navy để tạo độ sâu vô tận.
      */}
      <div className="absolute inset-0 bg-[#020617] z-0"></div>
      
      {/* 
        LAYER 2: AMBIENT NEBULA
        Các đám mây màu trôi nhẹ phía xa để nền không bị chết.
      */}
      <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
         <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-blue-900/30 rounded-full blur-[120px] animate-spin-very-slow mix-blend-screen"></div>
         <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-indigo-900/20 rounded-full blur-[120px] animate-spin-very-slow mix-blend-screen" style={{ animationDirection: 'reverse' }}></div>
      </div>

      {/* 
        LAYER 3: 3D GRID FLOOR (Sàn sân khấu)
        Tạo cảm giác không gian 3 chiều hút về tâm.
      */}
      <div className="absolute inset-0 z-0 perspective-[1000px] overflow-hidden flex items-center justify-center pointer-events-none">
          {/* Sàn dưới */}
          <div 
            className="absolute bottom-[-20%] w-[200%] h-[100%] origin-bottom"
            style={{ 
                transform: 'rotateX(75deg)',
                backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                maskImage: 'linear-gradient(to top, black, transparent 80%)'
            }}
          ></div>
      </div>

      {/* 
        LAYER 4: DRAMATIC GOD RAYS (Tia sáng thần thánh)
        Sử dụng conic-gradient để tạo các luồng sáng quét qua.
      */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] w-[150vw] h-[150vw] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(59,130,246,0.05)_20deg,transparent_40deg,rgba(251,191,36,0.05)_60deg,transparent_80deg)] animate-spin-very-slow opacity-60 mix-blend-plus-lighter"></div>
      </div>

      {/* 
        LAYER 5: FLOATING BOKEH (Hạt bụi ánh sáng)
        Thay thế ảnh tĩnh bằng các đốm sáng CSS thuần.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
             <div 
                key={i}
                className="absolute rounded-full bg-white blur-sm opacity-20 animate-float"
                style={{
                    width: Math.random() * 6 + 2 + 'px',
                    height: Math.random() * 6 + 2 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDuration: Math.random() * 10 + 10 + 's',
                    animationDelay: Math.random() * 5 + 's',
                    opacity: Math.random() * 0.3 + 0.1
                }}
             ></div>
          ))}
      </div>

      {/* 
        LAYER 6: VIGNETTE & SCANLINES
        Tạo cảm giác màn hình TV cũ/Camera ống kính.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] z-0 opacity-80 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, black 50%)', backgroundSize: '100% 4px' }}></div>
    </>
  );
};
