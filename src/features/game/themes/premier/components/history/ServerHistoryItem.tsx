import React from 'react';
import { ServerHistoryRecord } from '../../../../types/entities';
import { ResultHistoryItem } from './ResultHistoryItem';
import { PurchaseHistoryItem } from './PurchaseHistoryItem';

interface Props {
    record: ServerHistoryRecord;
    index: number;
}

export const ServerHistoryItem: React.FC<Props> = ({ record, index }) => {
    if (record.msgtype === 'RESULT') {
        return <ResultHistoryItem record={record} />;
    }

    if (record.msgtype === 'PURCHASE') {
        return <PurchaseHistoryItem record={record} />;
    }

    return null;
};
