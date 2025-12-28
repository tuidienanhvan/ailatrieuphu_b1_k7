import React, { useEffect, useRef } from 'react';

const COLORS = ['#ef4444', '#3b82f6', '#eab308', '#22c55e', '#a855f7', '#ffffff', '#f472b6'];

export const Confetti: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // 69. Canvas HiDPI with DPR capping
    // Cap at 2 to prevent massive buffers on 3x screens (iPhone Pro)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const logicalWidth = 1920;
    const logicalHeight = 1080;

    canvas.width = Math.round(logicalWidth * dpr);
    canvas.height = Math.round(logicalHeight * dpr);
    
    // Scale Context once
    ctx.scale(dpr, dpr);

    let particles: any[] = [];
    const particleCount = 150; 

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: logicalWidth / 2,
        y: logicalHeight / 3,
        w: Math.random() * 10 + 5,
        h: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() * 5) + 2,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 0.2,
        opacity: 1
      });
    }

    let animationFrameId: number;

    const render = () => {
      // Clear scaled rect
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.angle += p.spin;
        p.vy += 0.05;
        p.vx *= 0.99;

        if (p.y > 800) p.opacity -= 0.005;

        if (p.opacity > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (particles.some(p => p.opacity > 0 && p.y < 1200)) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[100]"
      style={{ width: '100%', height: '100%' }}
    />
  );
});