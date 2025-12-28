
import React from 'react';
import { BackgroundEffects } from '../features/game/components/welcome/BackgroundEffects';
import { TrophyStage } from '../features/game/components/welcome/TrophyStage';
import { GameTitle } from '../features/game/components/welcome/GameTitle';
import { StartButton } from '../features/game/components/welcome/StartButton';
import { WelcomeHUD } from '../features/game/components/welcome/WelcomeHUD';
import { JackpotDisplay } from '../features/game/components/welcome/JackpotDisplay';
import { FloatingSymbols } from '../features/game/components/welcome/FloatingSymbols';
import { StudioSpotlights } from '../features/game/components/welcome/StudioSpotlights';

interface WelcomeScreenProps {
    onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    return (
        <div className="flex-1 flex items-center justify-center animate-fade-in relative overflow-hidden bg-[#020617] select-none w-full h-full">

            {/* 1. Global Atmosphere Layer */}
            <BackgroundEffects />
            <StudioSpotlights />
            <FloatingSymbols />

            {/* 2. HUD Overlay (Broadcast Graphics) */}
            <WelcomeHUD />

            {/* 3. Main Layout Container (Split Screen Row) */}
            <div className="absolute inset-0 z-20 flex flex-row">

                {/* --- LEFT COLUMN: THE TROPHY STAGE --- */}
                <div className="w-[50%] h-full relative flex items-center justify-center perspective-[2000px]">
                    {/* Spotlight from top center specific to Trophy */}
                    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[2px] h-[120%] bg-gradient-to-b from-white/40 via-[#fbbf24]/20 to-transparent blur-[8px] z-30"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[600px] bg-gradient-to-b from-white/5 to-transparent blur-[50px] pointer-events-none z-0"></div>

                    {/* Glow behind the Throne */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fbbf24] blur-[150px] opacity-10 rounded-full animate-pulse pointer-events-none"></div>

                    {/* Trophy Container */}
                    <div className="transform scale-[1.25] translate-y-10 transition-transform duration-700 hover:scale-[1.3] relative z-20 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                        <TrophyStage />
                    </div>

                    {/* Floor Reflection */}
                    <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 transform scale-[1.25] scale-y-[-0.3] opacity-30 blur-[3px] pointer-events-none z-10">
                        <div className="mask-image: linear-gradient(to bottom, black, transparent)">
                            <TrophyStage />
                        </div>
                    </div>
                </div>

                {/* --- CENTER DIVIDER (TECH PILLAR) --- */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] flex flex-col items-center justify-center gap-2 z-10 opacity-60">
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                    <div className="absolute top-[20%] w-1.5 h-1.5 bg-[#fbbf24] rounded-full shadow-[0_0_10px_#fbbf24]"></div>
                    <div className="absolute top-[50%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                    <div className="absolute top-[80%] w-1.5 h-1.5 bg-[#fbbf24] rounded-full shadow-[0_0_10px_#fbbf24]"></div>
                </div>

                {/* --- RIGHT COLUMN: THE ACTION --- */}
                <div className="w-[50%] h-full relative flex flex-col items-center justify-center pr-20 pl-16">

                    {/* Hexagon Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                            backgroundSize: '80px 80px',
                            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                        }}>
                    </div>

                    {/* Container for alignment */}
                    <div className="flex flex-col items-center gap-12 transform -translate-y-4 w-full relative z-10">

                        <JackpotDisplay />

                        <div className="relative group p-10">
                            <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <GameTitle />
                        </div>

                        <div className="relative z-50 mt-2 flex flex-col items-center gap-6">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-24 bg-[#fbbf24] blur-[70px] opacity-25 pointer-events-none animate-pulse"></div>

                            <StartButton onClick={onStart} />

                        </div>
                    </div>
                </div>

            </div>

            <style>{`
        @keyframes spin-very-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-very-slow {
            animation: spin-very-slow 60s linear infinite;
            transform-origin: center;
        }
        @keyframes float-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-float-gentle {
            animation: float-gentle 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};
