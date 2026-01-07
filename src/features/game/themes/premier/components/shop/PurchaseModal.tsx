
import React, { useEffect, useState } from 'react';
import { ShoppingCart, ArrowRight, Wallet, ShieldCheck, Layout, Crown, Zap, Moon, DivideCircle, Bot, Phone, Users, RefreshCw, Scan, CreditCard, X, ChevronRight, AlertTriangle } from 'lucide-react';
import { ShopItem } from '../../../../types/entities';

interface PurchaseModalProps {
    isOpen: boolean;
    item: ShopItem | null;
    onConfirm: () => void;
    onCancel: () => void;
    balance: number;
}

const ICON_MAP: Record<string, any> = {
    Layout, Crown, Zap, Moon,
    DivideCircle, Bot, Phone, Users, RefreshCw
};

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, item, onConfirm, onCancel, balance }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    if (!isOpen || !item) return null;

    const remaining = balance - item.price;
    const canAfford = remaining >= 0;
    const Icon = ICON_MAP[item.icon] || Layout;

    // Rarity Config
    const getRarityConfig = (r: string) => {
        switch (r) {
            case 'legendary': return { color: '#fbbf24', text: 'text-[#fbbf24]', bg: 'from-yellow-600/20 to-yellow-900/40', border: 'border-[#fbbf24]', shadow: 'shadow-[#fbbf24]/20' };
            case 'epic': return { color: '#c084fc', text: 'text-purple-400', bg: 'from-purple-600/20 to-purple-900/40', border: 'border-purple-500', shadow: 'shadow-purple-500/20' };
            case 'rare': return { color: '#60a5fa', text: 'text-blue-400', bg: 'from-blue-600/20 to-blue-900/40', border: 'border-blue-500', shadow: 'shadow-blue-500/20' };
            default: return { color: '#94a3b8', text: 'text-slate-400', bg: 'from-slate-600/20 to-slate-900/40', border: 'border-slate-500', shadow: 'shadow-slate-500/20' };
        }
    };
    const theme = getRarityConfig(item.rarity);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4">

            {/* CLICK OUTSIDE TO CLOSE */}
            <div className="absolute inset-0" onClick={onCancel}></div>

            {/* MAIN CARD CONTAINER - Added Border & Shadow based on Rarity */}
            <div className={`
            relative w-full max-w-5xl h-[600px] bg-[#020617] rounded-3xl overflow-hidden 
            flex flex-col md:flex-row animate-scale-up shadow-2xl
            border-[2px] ${theme.border} ${theme.shadow}
         `}>

                {/* BACKGROUND FX */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#1e3a8a]/10 to-transparent blur-[80px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-[#fbbf24]/5 to-transparent blur-[80px] rounded-full"></div>
                </div>

                {/* CLOSE BUTTON - Fixed Position & Z-Index */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-black/40 border border-white/10 hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 text-white/50 transition-all group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* === LEFT SIDE: THE REACTOR CORE (PRODUCT SHOWCASE) === */}
                <div className="relative w-full md:w-[45%] h-[300px] md:h-full bg-[#0f172a]/50 flex items-center justify-center overflow-hidden border-r border-white/5">

                    {/* Energy Beams */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)] z-10"></div>

                    {/* Rotating Rings Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-spin-very-slow"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full animate-spin-slow-reverse"></div>

                    {/* THE ITEM ITSELF */}
                    <div className="relative z-20 flex flex-col items-center">
                        {/* Floating Container */}
                        <div className="relative animate-float-gentle">
                            {/* Glow Behind */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[60px] opacity-60 transition-colors duration-500`} style={{ backgroundColor: theme.color }}></div>

                            {/* Main Hexagon/Circle Shape */}
                            <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br ${theme.bg} border-2 ${theme.border} flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-sm overflow-hidden`}>
                                {/* Scan Line Effect inside Icon */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-[20%] w-full animate-scan-fast pointer-events-none"></div>

                                <Icon size={80} style={{ color: theme.color }} className="drop-shadow-[0_0_15px_rgba(0,0,0,1)] relative z-10" />
                            </div>

                            {/* Orbiting Particles */}
                            <div className="absolute top-0 left-0 w-full h-full animate-spin-slow pointer-events-none">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full blur-[1px] shadow-[0_0_10px_white]"></div>
                            </div>
                        </div>

                        {/* Item Name Tag */}
                        <div className="mt-10 text-center">
                            <div className={`inline-block px-3 py-1 rounded border ${theme.border} bg-black/60 mb-3 backdrop-blur-md`}>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: theme.color }}>{item.rarity} CLASS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === RIGHT SIDE: THE TRANSACTION TERMINAL === */}
                <div className="flex-1 relative flex flex-col p-8 md:p-10 bg-gradient-to-l from-[#0f172a] to-[#020617] z-20">

                    {/* Tech Header */}
                    <div className="flex flex-col gap-1 mb-6 pr-10">
                        <div className="flex items-center gap-2 opacity-60">
                            <Scan size={16} className={theme.text} />
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${theme.text}`}>Transaction_Protocol_V9</span>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none font-sans drop-shadow-md">
                            {item.name}
                        </h2>
                    </div>

                    {/* Description Box */}
                    <div className="relative p-5 bg-white/5 rounded-xl border border-white/10 mb-6 group hover:border-white/20 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-slate-700 group-hover:bg-[#fbbf24] transition-colors rounded-l-xl"></div>
                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                            {item.description}
                        </p>
                    </div>

                    {/* DIGITAL INVOICE / PAYMENT GATEWAY */}
                    <div className="mt-auto relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 backdrop-blur-md">
                        {/* Decorative Header of Invoice */}
                        <div className="h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-50"></div>

                        <div className="p-6 grid gap-4">

                            {/* Row 1: Wallet */}
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors">
                                    <div className="p-1.5 rounded bg-slate-800 border border-slate-700">
                                        <Wallet size={14} />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Ví hiện tại</span>
                                </div>
                                <span className="font-mono text-lg text-slate-200">{balance.toLocaleString()}</span>
                            </div>

                            {/* Row 2: Cost */}
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center gap-3 text-slate-400 group-hover:text-red-400 transition-colors">
                                    <div className="p-1.5 rounded bg-red-900/20 border border-red-900/50">
                                        <ArrowRight size={14} className="text-red-500" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Thanh toán</span>
                                </div>
                                <span className="font-mono text-xl font-bold text-red-500">- {item.price.toLocaleString()}</span>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                            {/* Row 3: Result */}
                            <div className="flex justify-between items-end pt-1">
                                <div className="flex flex-col gap-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${canAfford ? 'text-green-500' : 'text-red-500'}`}>
                                        {canAfford ? 'Số dư sau giao dịch' : 'Cảnh báo: Không đủ tiền'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {canAfford ? <ShieldCheck size={16} className="text-green-500" /> : <AlertTriangle size={16} className="text-red-500 animate-pulse" />}
                                        <span className={`text-2xl font-black font-mono tracking-tight ${canAfford ? 'text-white' : 'text-red-500'}`}>
                                            {remaining.toLocaleString()} <span className="text-xs text-slate-500 font-bold ml-1">VND</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={canAfford ? onConfirm : undefined}
                            disabled={!canAfford}
                            className={`
                            flex-1 relative h-14 rounded-lg overflow-hidden group transition-all duration-300 flex items-center justify-center gap-3
                            ${canAfford
                                    ? 'bg-[#fbbf24] hover:bg-[#f59e0b] shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] cursor-pointer'
                                    : 'bg-slate-800 border border-slate-700 cursor-not-allowed opacity-50'
                                }
                        `}
                        >
                            {/* Diagonal Shine */}
                            {canAfford && <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12 group-hover:animate-shine"></div>}

                            {canAfford ? (
                                <>
                                    <CreditCard size={18} className="text-black" />
                                    <span className="text-black font-black uppercase tracking-[0.2em] text-sm">Xác Nhận Mua</span>
                                    <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
                                </>
                            ) : (
                                <span className="text-slate-400 font-bold uppercase tracking-[0.1em] text-sm flex items-center gap-2">
                                    <X size={16} /> Số dư không đủ
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            <style>{`
            @keyframes scan-fast {
                0% { top: -20%; opacity: 0; }
                20% { opacity: 1; }
                100% { top: 120%; opacity: 0; }
            }
            .animate-scan-fast { animation: scan-fast 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
            
            @keyframes shine {
                0% { left: -100%; }
                100% { left: 200%; }
            }
            .animate-shine { animation: shine 1s; }

            @keyframes scale-up {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .animate-scale-up { animation: scale-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
         `}</style>
        </div>
    );
};
