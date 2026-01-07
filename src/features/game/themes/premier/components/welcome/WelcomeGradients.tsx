
import React from 'react';

export const WelcomeGradients = () => (
  <defs>
    {/* --- 1. PREMIUM METALS (KIM LOẠI CAO CẤP) --- */}
    
    {/* True Gold (Vàng ánh kim 3D - Tương phản cao) */}
    {/* Logic: Tối -> Sáng -> Trắng (Điểm lóa) -> Sáng -> Tối */}
    <linearGradient id="goldLux" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#451a03" />   {/* Bronze Dark */}
      <stop offset="25%" stopColor="#b45309" />  {/* Bronze */}
      <stop offset="45%" stopColor="#fbbf24" />  {/* Gold */}
      <stop offset="50%" stopColor="#ffffff" />  {/* HIGHLIGHT (Điểm lóa) */}
      <stop offset="55%" stopColor="#fbbf24" />  {/* Gold */}
      <stop offset="75%" stopColor="#d97706" />  {/* Deep Gold */}
      <stop offset="100%" stopColor="#451a03" /> {/* Bronze Dark */}
    </linearGradient>

    {/* Royal Silver (Bạc Hoàng Gia) */}
    <linearGradient id="silverLux" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#94a3b8" />
      <stop offset="50%" stopColor="#e2e8f0" />
      <stop offset="51%" stopColor="#ffffff" />
      <stop offset="100%" stopColor="#64748b" />
    </linearGradient>

    {/* Dark Obsidian (Đá đen bóng) */}
    <linearGradient id="midnightDepth" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#000000" />
      <stop offset="50%" stopColor="#1e1b4b" />
      <stop offset="100%" stopColor="#000000" />
    </linearGradient>

    {/* --- 2. GEMS & LIGHTS (NGỌC & ÁNH SÁNG) --- */}

    {/* Ruby Core (Lõi năng lượng đỏ) */}
    <radialGradient id="rubyGem" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stopColor="#fca5a5" />   {/* Light Red */}
      <stop offset="40%" stopColor="#dc2626" />  {/* Red */}
      <stop offset="100%" stopColor="#450a0a" /> {/* Dark Red */}
    </radialGradient>

    {/* Tech Blue (Ánh sáng xanh công nghệ) */}
    <linearGradient id="techLine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="transparent" />
      <stop offset="50%" stopColor="#3b82f6" />
      <stop offset="100%" stopColor="transparent" />
    </linearGradient>

    {/* Base Gradient (Đế cúp) */}
    <linearGradient id="baseGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#271a0c" />
      <stop offset="50%" stopColor="#5c3a18" />
      <stop offset="100%" stopColor="#271a0c" />
    </linearGradient>

    {/* Dark Bronze (Đồng tối) */}
    <linearGradient id="darkBronze" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#2a1205" />
      <stop offset="100%" stopColor="#451a03" />
    </linearGradient>

    {/* --- 3. ADVANCED FILTERS (HIỆU ỨNG VẬT LÝ) --- */}
    
    {/* Cinematic Bloom (Hào quang điện ảnh) */}
    <filter id="goldGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feComponentTransfer in="coloredBlur" result="glowStrength">
          <feFuncA type="linear" slope="1.5"/>
      </feComponentTransfer>
      <feMerge>
          <feMergeNode in="glowStrength"/>
          <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    {/* Sharp Edge (Làm sắc cạnh kim loại) */}
    <filter id="sharpMetal">
       <feComponentTransfer>
          <feFuncA type="linear" slope="0.9"/>
       </feComponentTransfer>
       <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"/>
    </filter>
  </defs>
);
