import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { ServerHistoryRecord } from '../../types/entities';

interface Props {
    record: ServerHistoryRecord;
}

export const PurchaseHistoryItem: React.FC<Props> = ({ record }) => {
    const { itemName, itemType, price } = record.payload || {};

    const date = new Date(record.tsms);
    const timeStr = date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="
        relative group flex items-center gap-5 p-5 
        bg-black/40 backdrop-blur-sm 
        border border-indigo-500/40
        transform -skew-x-3 hover:skew-x-0
        transition-all duration-300 hover:scale-[1.02]
        overflow-hidden
      ">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Icon */}
            <div className="relative w-14 h-14 rounded-lg border border-indigo-500/50 bg-indigo-500/10 flex items-center justify-center transform skew-x-3">
                <ShoppingCart size={28} className="text-indigo-400" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 transform skew-x-3">
                <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-base font-black uppercase tracking-[0.15em] text-indigo-400">
                        Mua Vật Phẩm
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{timeStr}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Package size={14} className="text-slate-500" />
                    <span className="text-white font-medium">{itemName || 'Unknown'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase font-bold tracking-wider">
                        {itemType || 'item'}
                    </span>
                </div>
            </div>

            {/* Price */}
            <div className="flex flex-col items-center px-4 py-2 bg-red-500/10 border border-red-500/30 rounded transform skew-x-3 min-w-[100px]">
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Chi Tiêu</span>
                <span className="text-xl font-mono font-black text-red-400">
                    -{price?.toLocaleString() || '0'}
                </span>
            </div>
        </div>
    );
};
