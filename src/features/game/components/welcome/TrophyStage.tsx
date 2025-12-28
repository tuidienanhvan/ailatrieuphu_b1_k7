
import React from 'react';
import { WelcomeGradients } from './WelcomeGradients';

export const TrophyStage = () => {
  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center">
      <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible animate-float-gentle will-change-transform">
        <WelcomeGradients />
        
        {/* Definition for Moving Sheen */}
        <defs>
             <linearGradient id="movingSheen" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="reflect">
                  <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                  <stop offset="40%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
             </linearGradient>
             
             <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="50%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#451a03" />
             </linearGradient>

             <mask id="trophyMask">
                 {/* Mask trùng khớp với hình dáng Cúp để hiệu ứng lóa chỉ chạy trên cúp */}
                 <g transform="translate(169.6, 60) scale(0.9)">
                    <path d="M180 420 Q 160 300, 120 100 L 170 80 Q 200 280, 210 420 Z" fill="white" /> {/* Left */}
                    <path d="M332 420 Q 352 300, 392 100 L 342 80 Q 312 280, 302 420 Z" fill="white" /> {/* Right */}
                    <path d="M210 420 L 210 150 L 256 120 L 302 150 L 302 420 Z" fill="white" /> {/* Center */}
                 </g>
             </mask>
        </defs>

        {/* ================================================================================== */}
        {/* GROUP 1: THE EAGLE WINGS (CÁNH ĐẠI BÀNG - THAY THẾ CHO PHẦN CŨ) */}
        {/* ================================================================================== */}
        <g transform="translate(400, 280)">
             {/* Left Wing */}
             <g className="animate-pulse-slow" style={{ animationDuration: '4s' }}>
                <path 
                    d="M-50 100 
                       Q -80 0, -280 -80 
                       L -240 -30 
                       L -260 20 
                       L -200 10 
                       L -220 70 
                       L -160 50 
                       L -170 110 
                       L -120 90 
                       L -120 160 
                       Z" 
                    fill="url(#goldLux)" 
                    stroke="#78350f" 
                    strokeWidth="2"
                />
                {/* Inner Feathers Detail */}
                <path d="M-80 80 Q -120 20, -220 -30" stroke="#b45309" strokeWidth="1" fill="none" />
                <path d="M-90 100 Q -130 40, -200 10" stroke="#b45309" strokeWidth="1" fill="none" />
                <path d="M-100 120 Q -140 60, -160 50" stroke="#b45309" strokeWidth="1" fill="none" />
             </g>

             {/* Right Wing (Mirrored) */}
             <g transform="scale(-1, 1)" className="animate-pulse-slow" style={{ animationDuration: '4s' }}>
                <path 
                    d="M-50 100 
                       Q -80 0, -280 -80 
                       L -240 -30 
                       L -260 20 
                       L -200 10 
                       L -220 70 
                       L -160 50 
                       L -170 110 
                       L -120 90 
                       L -120 160 
                       Z" 
                    fill="url(#goldLux)" 
                    stroke="#78350f" 
                    strokeWidth="2"
                />
                {/* Inner Feathers Detail */}
                <path d="M-80 80 Q -120 20, -220 -30" stroke="#b45309" strokeWidth="1" fill="none" />
                <path d="M-90 100 Q -130 40, -200 10" stroke="#b45309" strokeWidth="1" fill="none" />
                <path d="M-100 120 Q -140 60, -160 50" stroke="#b45309" strokeWidth="1" fill="none" />
             </g>

             {/* Wing Glow Behind */}
             <circle cx="0" cy="50" r="150" fill="#fbbf24" filter="blur(60px)" opacity="0.15" />
        </g>

        {/* ================================================================================== */}
        {/* GROUP 2: THE TROPHY (CÚP VÀNG) */}
        {/* ================================================================================== */}
        <g transform="translate(169.6, 60) scale(0.9)">
            
            {/* --- BASE OF THE CUP ITSELF --- */}
            <g transform="translate(0, 20)">
                <path d="M136 470 L116 500 H396 L376 470 H136Z" fill="url(#darkBronze)" stroke="#451a03" strokeWidth="1" />
                <path d="M156 430 L136 470 H376 L356 430 H156Z" fill="url(#baseGrad)" />
                <path d="M136 470 L376 470" stroke="#fff" strokeWidth="1" opacity="0.4" />
                <path d="M156 430 L356 430" stroke="#fff" strokeWidth="1" opacity="0.6" />
                <path d="M180 400 L156 430 H356 L332 400 H180Z" fill="url(#goldLux)" />
            </g>

            {/* --- LEFT PILLAR --- */}
            <g>
                <path d="M180 420 Q 160 300, 120 100 L 170 80 Q 200 280, 210 420 Z" fill="url(#goldLux)" />
                <path d="M120 100 Q 160 300, 180 420" stroke="#fff" strokeWidth="1" opacity="0.4" fill="none" />
                <path d="M170 80 Q 200 280, 210 420" stroke="#b45309" strokeWidth="1" opacity="0.6" fill="none" />
            </g>
            
            {/* --- RIGHT PILLAR --- */}
            <g>
                <path d="M332 420 Q 352 300, 392 100 L 342 80 Q 312 280, 302 420 Z" fill="url(#goldLux)" />
                <path d="M392 100 Q 352 300, 332 420" stroke="#fff" strokeWidth="1" opacity="0.4" fill="none" />
                <path d="M342 80 Q 312 280, 302 420" stroke="#b45309" strokeWidth="1" opacity="0.6" fill="none" />
            </g>

            {/* --- CENTER PILLAR --- */}
            <g>
                <path d="M210 420 L 210 150 L 256 120 L 302 150 L 302 420 Z" fill="url(#goldLux)" filter="brightness(1.05)"/>
                <path d="M256 420 L256 160" stroke="#b45309" strokeWidth="2" />
                <path d="M210 150 L256 120 L302 150" stroke="#fff" strokeWidth="1.5" opacity="0.8" fill="none" />
            </g>

            {/* --- TOP ARC (Crown) --- */}
            <g id="TheCrownArc" filter="url(#sharpMetal)">
                <path d="M120 104 Q 256 54, 392 104" fill="none" stroke="#78350f" strokeWidth="6" strokeLinecap="round"/>
                <path d="M120 100 Q 256 50, 392 100" fill="none" stroke="url(#goldLux)" strokeWidth="5" strokeLinecap="round"/>
                <path d="M122 99 Q 256 49, 390 99" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7" strokeLinecap="round"/>
                <circle cx="120" cy="100" r="5" fill="#fcd34d" stroke="#b45309" strokeWidth="2" />
                <circle cx="392" cy="100" r="5" fill="#fcd34d" stroke="#b45309" strokeWidth="2" />
                <circle cx="256" cy="50" r="2" fill="white" className="animate-pulse" />
            </g>

            {/* --- RUBY CORE --- */}
            <g transform="translate(256, 110)">
                <circle cx="0" cy="0" r="35" fill="#f59e0b" opacity="0.3" filter="blur(15px)" className="animate-pulse-slow" />
                <path d="M0 -32 L22 0 L0 42 L-22 0 Z" fill="url(#rubyGem)" stroke="#7f1d1d" strokeWidth="1" />
                <path d="M0 -32 L0 42 M-22 0 L22 0" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
                <path d="M0 -32 L22 0 L0 42 L-22 0 Z" stroke="#fcd34d" strokeWidth="2" fill="none" filter="url(#goldGlow)" opacity="0.8" />
            </g>

            {/* --- STAR FX --- */}
            <g transform="translate(120, 100)">
               <path d="M0 -8 L1 0 L8 0 L1 1 L0 8 L-1 1 L-8 0 L-1 0 Z" fill="#fff" opacity="0.8">
                   <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                   <animate attributeName="scale" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
               </path>
            </g>
            <g transform="translate(392, 100)">
               <path d="M0 -8 L1 0 L8 0 L1 1 L0 8 L-1 1 L-8 0 L-1 0 Z" fill="#fff" opacity="0.8">
                   <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="1.2s" />
                   <animate attributeName="scale" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" begin="1.2s" />
               </path>
            </g>

        </g>

        {/* --- OVERLAY SHEEN LAYER (Lớp phủ ánh kim chạy qua) --- */}
        {/* Chỉ hiện thị trên mask hình chiếc cúp */}
        <rect x="0" y="0" width="800" height="800" fill="url(#movingSheen)" mask="url(#trophyMask)" style={{ mixBlendMode: 'overlay' }}>
             <animate attributeName="x" from="-800" to="800" dur="4s" repeatCount="indefinite" />
        </rect>

      </svg>
    </div>
  );
};
