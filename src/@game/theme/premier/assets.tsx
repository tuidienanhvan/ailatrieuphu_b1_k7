import React from 'react';

export const ASSETS = {
  'prize-crown': (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3L15 8L21 6L18 14H6L3 6L9 8L12 3Z" fill="#fbbf24" stroke="#fde047" strokeWidth="0.6" />
      <path d="M6 14H18V17C18 18 17 19 16 19H8C7 19 6 18 6 17V14Z" fill="#d97706" />
    </svg>
  ),
  'milestone-shield': (props: any) => {
    const color = props.color || 'blue';
    const gradientTop = color === 'gold' ? '#fcd34d' : '#60a5fa';
    const gradientBottom = color === 'gold' ? '#92400e' : '#1e3a8a';

    return (
      <svg viewBox="0 0 24 28" fill="none" {...props}>
        <defs>
          <linearGradient id={`shield-${color}`} x1="12" y1="0" x2="12" y2="28">
            <stop offset="0%" stopColor={gradientTop} />
            <stop offset="100%" stopColor={gradientBottom} />
          </linearGradient>
        </defs>
        <path
          d="M12 1L22 6V14C22 20 17 26 12 27C7 26 2 20 2 14V6L12 1Z"
          fill={`url(#shield-${color})`}
          stroke={color === 'gold' ? '#fde047' : '#93c5fd'}
          strokeWidth="1"
        />
      </svg>
    );
  },
  'jackpot-royal-crown': (props: any) => (
    <svg viewBox="0 0 32 28" fill="none" {...props}>
      <path d="M16 2L20 9L28 6L24 16H8L4 6L12 9L16 2Z" fill="#fbbf24" stroke="#fde047" strokeWidth="1" />
      <rect x="8" y="16" width="16" height="5" rx="1" fill="#7c3aed" />
      <circle cx="16" cy="5" r="2.5" fill="#22d3ee" />
    </svg>
  ),
} as const;

export type AssetId = keyof typeof ASSETS;
