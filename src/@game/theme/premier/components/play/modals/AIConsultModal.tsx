
import React, { useState, useEffect } from 'react';
import { Bot, BrainCircuit, Fingerprint, Crosshair, Zap, Activity, Aperture, CheckCircle2, AlertTriangle, ScanLine, Terminal, Cpu, Database, Share2 } from 'lucide-react';
import { DarkModalFrame } from './DarkModalFrame';

interface AIConsultModalProps {
    isOpen: boolean;
    isThinking: boolean;
    displayText: string;
    isExpert?: boolean;
    onClose: () => void;
}

export const AIConsultModal: React.FC<AIConsultModalProps> = ({ isOpen, isThinking, displayText, isExpert = false, onClose }) => {
    const [processingStep, setProcessingStep] = useState(0);

    const steps = isExpert
        ? ["KHỞI TẠO MẠNG NEURAL...", "TRUY XUẤT BIG DATA...", "MÔ PHỎNG 14 TRIỆU KHẢ NĂNG...", "TỐI ƯU HÓA LƯỢNG TỬ...", "HOÀN TẤT."]
        : ["KẾT NỐI SERVER...", "TÌM KIẾM BING...", "ĐỌC DỮ LIỆU...", "SO SÁNH KẾT QUẢ...", "XONG."];

    useEffect(() => {
        if (isThinking) {
            setProcessingStep(0);
            const interval = setInterval(() => setProcessingStep(prev => (prev + 1) % steps.length), isExpert ? 600 : 800);
            return () => clearInterval(interval);
        }
    }, [isThinking, isExpert]);

    if (!isOpen) return null;

    // Theme Config
    const COLOR = isExpert ? '#fbbf24' : '#38bdf8'; // Gold vs Blue
    const BG_GRADIENT = isExpert
        ? 'radial-gradient(circle at center, rgba(69, 26, 3, 0.4) 0%, rgba(0,0,0,0.9) 100%)'
        : 'radial-gradient(circle at center, rgba(2, 6, 23, 0.4) 0%, rgba(0,0,0,0.9) 100%)';

    return (
        <DarkModalFrame
            title={isExpert ? "SIÊU TRÍ TUỆ QUANTUM" : "TRỢ LÝ ẢO CƠ BẢN"}
            icon={isExpert ? BrainCircuit : Bot}
            fullContent={true}
        >
            <div className="relative w-full h-full flex flex-col bg-black overflow-hidden">

                {/* ================================================================================== */}
                {/* LAYER 0: GLOBAL BACKGROUND (Shared)                                                */}
                {/* ================================================================================== */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0" style={{ background: BG_GRADIENT }}></div>

                    {/* Tech Grid Floor */}
                    <div className="absolute inset-0 opacity-20 perspective-[1000px]">
                        <div className="absolute inset-0 bottom-[-50%]"
                            style={{
                                backgroundImage: `linear-gradient(${COLOR}22 1px, transparent 1px), linear-gradient(90deg, ${COLOR}22 1px, transparent 1px)`,
                                backgroundSize: '60px 60px',
                                transform: 'rotateX(60deg) scale(2)',
                                maskImage: 'linear-gradient(to top, black, transparent 80%)'
                            }}>
                        </div>
                    </div>

                    {/* Random Data Streams */}
                    <div className="absolute right-0 top-0 w-64 h-full opacity-10 flex flex-col gap-1 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="text-[10px] font-mono text-right pr-4" style={{ color: COLOR }}>
                                {Math.random().toString(36).substring(7)} {Math.random() > 0.5 ? '1' : '0'}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================================================================================== */}
                {/* LAYER 1: LOADING VISUALIZER (Hidden when Result shows)                             */}
                {/* ================================================================================== */}
                <div className={`
                absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-700
                ${isThinking ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-xl pointer-events-none'}
            `}>
                    <div className="relative w-[320px] h-[320px] flex items-center justify-center">

                        {/* Ring 1 */}
                        <div className="absolute inset-0 border border-dashed rounded-full animate-spin-slow opacity-30"
                            style={{ borderColor: COLOR, borderWidth: '1px' }}></div>

                        {/* Ring 2 */}
                        <div className="absolute inset-8 border-2 rounded-full animate-spin-reverse opacity-60"
                            style={{ borderColor: COLOR, borderTopColor: 'transparent', borderBottomColor: 'transparent', boxShadow: `0 0 20px ${COLOR}33` }}></div>

                        {/* Ring 3 */}
                        <div className="absolute inset-16 border border-dotted rounded-full animate-spin opacity-80"
                            style={{ borderColor: COLOR }}></div>

                        {/* CORE CENTER */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-28 h-28 bg-black/80 backdrop-blur-sm rounded-full border-2 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20" style={{ borderColor: COLOR }}>
                                {isExpert ? (
                                    <Fingerprint size={56} color={COLOR} className="animate-pulse" />
                                ) : (
                                    <Aperture size={56} color={COLOR} className="animate-spin-slow" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-scan overflow-hidden rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in">
                        <div className="text-2xl font-black uppercase tracking-[0.25em]" style={{ color: COLOR, textShadow: `0 0 10px ${COLOR}66` }}>
                            {steps[processingStep]}
                        </div>
                        <div className="h-1.5 w-48 bg-gray-900 rounded-full overflow-hidden border border-white/10">
                            <div className="h-full animate-progress" style={{ backgroundColor: COLOR, boxShadow: `0 0 10px ${COLOR}` }}></div>
                        </div>
                    </div>
                </div>

                {/* ================================================================================== */}
                {/* LAYER 2: RESULT DASHBOARD (FULL SCREEN)                                            */}
                {/* ================================================================================== */}
                <div className={`
                absolute inset-0 z-20 flex flex-col transition-all duration-500 bg-black/40 backdrop-blur-md
                ${!isThinking ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}
            `}>

                    {/* --- HEADER: STATUS BAR --- */}
                    <div className="h-20 shrink-0 border-b border-white/10 bg-black/60 flex items-center justify-between px-10 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(90deg, transparent 0%, ${COLOR} 50%, transparent 100%)` }}></div>

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-2 bg-white/5 rounded border border-white/10">
                                {isExpert ? <Database size={20} color={COLOR} /> : <Terminal size={20} color={COLOR} />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                                <span className="text-sm font-black text-white uppercase tracking-wider">{isExpert ? 'QUANTUM_SOLVER_V9' : 'STANDARD_SEARCH_V2'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 relative z-10">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Độ Tin Cậy</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: isExpert ? '99.9%' : '50%', backgroundColor: COLOR }}></div>
                                    </div>
                                    <span className="text-xl font-mono font-bold" style={{ color: COLOR }}>{isExpert ? '99.9%' : '50.0%'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- BODY: MAIN CONTENT (Full Space) --- */}
                    <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">

                        {/* Decorative Brackets - Fixed position */}
                        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 opacity-40" style={{ borderColor: COLOR }}></div>
                        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 opacity-40" style={{ borderColor: COLOR }}></div>
                        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 opacity-40" style={{ borderColor: COLOR }}></div>
                        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 opacity-40" style={{ borderColor: COLOR }}></div>

                        {/* Side Light Bars - Fixed to viewport edges */}
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-[3px] h-[60%] opacity-60" style={{ background: `linear-gradient(to bottom, transparent, ${COLOR}, transparent)` }}></div>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[3px] h-[60%] opacity-60" style={{ background: `linear-gradient(to bottom, transparent, ${COLOR}, transparent)` }}></div>

                        {/* Central Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] opacity-15 blur-[80px] rounded-full pointer-events-none" style={{ backgroundColor: COLOR }}></div>

                        {/* Content Card */}
                        <div className="relative z-10 w-full max-w-3xl mx-16 flex flex-col items-center">
                            {/* Status Badge */}
                            <div className="mb-6 px-5 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl flex items-center gap-2.5 shadow-lg">
                                {isExpert ? (
                                    <CheckCircle2 size={16} className="text-green-500" />
                                ) : (
                                    <AlertTriangle size={16} className="text-yellow-500 animate-pulse" />
                                )}
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
                                    {isExpert ? 'PHÂN TÍCH HOÀN TẤT • ĐỘ CHÍNH XÁC CAO' : 'DỰ ĐOÁN THAM KHẢO • CẦN CÂN NHẮC'}
                                </span>
                            </div>

                            {/* Message Card */}
                            <div className="relative w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
                                {/* Accent line top */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full" style={{ backgroundColor: COLOR }}></div>

                                {/* Message Text */}
                                <p className={`text-lg md:text-xl leading-relaxed text-center text-white/90 ${isExpert ? 'font-medium' : 'font-mono text-base'}`}>
                                    {displayText}
                                </p>

                                {/* Accent line bottom */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] rounded-full opacity-50" style={{ backgroundColor: COLOR }}></div>
                            </div>

                            {/* Decorative dots */}
                            <div className="flex items-center gap-2 mt-6 opacity-40">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLOR }}></div>
                                <div className="w-1 h-1 rounded-full bg-white/30"></div>
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLOR }}></div>
                            </div>
                        </div>
                    </div>

                    {/* --- FOOTER: ACTIONS --- */}
                    <div className="h-24 shrink-0 border-t border-white/10 bg-[#050505]/90 flex items-center justify-center gap-6 relative z-30">
                        <button
                            onClick={onClose}
                            className="group relative w-64 h-14 bg-transparent outline-none"
                        >
                            {/* Skewed Background/Border */}
                            <div className="absolute inset-0 border-2 skew-x-[-10deg] transition-all duration-300 group-hover:bg-white/10 group-active:scale-95" style={{ borderColor: COLOR }}></div>

                            {/* Hover Fill */}
                            <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity skew-x-[-10deg]" style={{ color: COLOR }}></div>

                            {/* Content (Unskewed visually if needed, but here we just center it) */}
                            <div className="absolute inset-0 flex items-center justify-center gap-3">
                                <Crosshair size={20} style={{ color: COLOR }} className="group-hover:rotate-90 transition-transform duration-500" />
                                <span className="font-black uppercase tracking-[0.2em] text-sm text-white">Xác Nhận</span>
                            </div>
                        </button>

                        {isExpert && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-end opacity-50">
                                <span className="text-[9px] uppercase tracking-widest text-slate-500">Processing Time</span>
                                <span className="text-sm font-mono text-[#fbbf24]">0.042s</span>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <style>{`
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes spin-reverse {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
            }
            @keyframes scan {
                0%, 100% { transform: translateY(-100%); }
                50% { transform: translateY(100%); }
            }
            @keyframes progress {
                0% { width: 0%; }
                100% { width: 100%; }
            }
            .animate-spin-slow { animation: spin-slow 10s linear infinite; }
            .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
            .animate-scan { animation: scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
            .animate-progress { animation: progress 2s ease-in-out infinite; }
        `}</style>
        </DarkModalFrame>
    );
}
