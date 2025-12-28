import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'glass';
  children: React.ReactNode;
}

export const BaseButton: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const base = "font-bold rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center uppercase tracking-wider relative overflow-hidden text-2xl px-10 py-4";
  
  const variants = {
    primary: "bg-gradient-to-b from-blue-600 to-blue-800 border-2 border-blue-400 text-white shadow-xl shadow-blue-900/50 hover:brightness-110",
    secondary: "bg-slate-800 border-2 border-slate-600 text-slate-300 hover:bg-slate-700",
    accent: "bg-gradient-to-b from-yellow-500 to-yellow-700 border-2 border-yellow-400 text-black hover:brightness-110 shadow-glow-gold",
    glass: "bg-white/10 border-2 border-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
  };
  
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};