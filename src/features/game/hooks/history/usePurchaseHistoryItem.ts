import { useMemo } from 'react';
import { ServerHistoryRecord } from '../../types/entities';

interface UsePurchaseHistoryItemProps {
    record: ServerHistoryRecord;
}

interface UsePurchaseHistoryItemReturn {
    itemName: string;
    itemType: string;
    price: number;
    timeStr: string;
}

export const usePurchaseHistoryItem = ({ record }: UsePurchaseHistoryItemProps): UsePurchaseHistoryItemReturn => {
    const { itemName, itemType, price } = record.payload || {};

    const timeStr = useMemo(() => {
        const date = new Date(record.tsms);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, [record.tsms]);

    return {
        itemName: itemName || 'Unknown',
        itemType: itemType || 'item',
        price: price || 0,
        timeStr
    };
};
