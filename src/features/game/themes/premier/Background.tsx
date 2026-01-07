/**
 * Premier Theme - Background
 * Theme: TV Show / Premier style với màu xanh navy và vàng gold
 * Background component riêng để tái sử dụng
 */

import React from 'react';

export const Background: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Main Radial Gradient - Navy Blue */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e3a8a_0%,#020617_60%,#000000_100%)] opacity-80"></div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 w-full h-[50%] bg-[linear-gradient(to_bottom,transparent_0%,#000000_100%)] z-10"></div>

            {/* Perspective Grid Floor */}
            <div
                className="absolute -bottom-[50%] -left-[50%] w-[200%] h-[100%] z-0 opacity-20"
                style={{
                    background: `
                        linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent),
                        linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent)
                    `,
                    backgroundSize: '100px 100px',
                    transform: 'perspective(1000px) rotateX(60deg)'
                }}
            ></div>

            {/* Spotlight Cone */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[80%] bg-[conic-gradient(from_180deg_at_50%_0%,transparent_45%,rgba(255,255,255,0.03)_50%,transparent_55%)] blur-2xl z-0"></div>

            {/* Gold Accent Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#fbbf24] blur-[150px] opacity-[0.05]"></div>
        </div>
    );
};
