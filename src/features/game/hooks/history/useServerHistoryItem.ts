import { useMemo } from 'react';
import { ServerHistoryRecord } from '../../types/entities';

interface UseServerHistoryItemProps {
    record: ServerHistoryRecord;
}

type ItemType = 'result' | 'purchase' | 'unknown';

interface UseServerHistoryItemReturn {
    itemType: ItemType;
    isResult: boolean;
    isPurchase: boolean;
}

export const useServerHistoryItem = ({ record }: UseServerHistoryItemProps): UseServerHistoryItemReturn => {
    const itemType = useMemo((): ItemType => {
        if (record.msgtype === 'RESULT') return 'result';
        if (record.msgtype === 'PURCHASE') return 'purchase';
        return 'unknown';
    }, [record.msgtype]);

    return {
        itemType,
        isResult: itemType === 'result',
        isPurchase: itemType === 'purchase'
    };
};
