
import React from 'react';
import { DarkModalFrame } from '../play/modals/DarkModalFrame';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { ShopItem } from '../../types/entities';

interface PurchaseModalProps {
  isOpen: boolean;
  item: ShopItem | null;
  onConfirm: () => void;
  onCancel: () => void;
  balance: number;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, item, onConfirm, onCancel, balance }) => {
  if (!isOpen || !item) return null;

  const remaining = balance - item.price;

  return (
    <DarkModalFrame title="XÁC NHẬN GIAO DỊCH" icon={ShoppingCart} onClose={onCancel}>
         <div className="flex flex-col items-center justify-center h-full w-full gap-6 px-10">
             
             <div className="w-full flex items-center gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
                 <div className={`w-24 h-24 rounded-lg bg-gradient-to-br ${item.color} shadow-lg shrink-0`}></div>
                 <div className="flex flex-col">
                     <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Vật Phẩm</span>
                     <h3 className="text-2xl font-black text-white uppercase">{item.name}</h3>
                     <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                 </div>
             </div>

             <div className="w-full space-y-4">
                 <div className="flex justify-between items-center text-slate-300">
                     <span>Số dư hiện tại:</span>
                     <span className="font-mono text-xl">{balance.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center text-red-400">
                     <span>Giá vật phẩm:</span>
                     <span className="font-mono text-xl">- {item.price.toLocaleString()}</span>
                 </div>
                 <div className="h-[1px] w-full bg-white/10"></div>
                 <div className="flex justify-between items-center text-[#fbbf24]">
                     <span className="font-bold uppercase tracking-wider">Số dư sau mua:</span>
                     <span className="font-mono font-black text-2xl">{remaining.toLocaleString()}</span>
                 </div>
             </div>

             <div className="grid grid-cols-2 gap-4 w-full mt-auto">
                <button 
                    onClick={onCancel}
                    className="py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase rounded-lg transition-colors"
                >
                    Hủy Bỏ
                </button>
                <button 
                    onClick={onConfirm}
                    className="py-4 bg-[#fbbf24] hover:bg-yellow-400 text-black font-black uppercase rounded-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all active:scale-95"
                >
                    Xác Nhận Mua
                </button>
             </div>
         </div>
    </DarkModalFrame>
  );
};
