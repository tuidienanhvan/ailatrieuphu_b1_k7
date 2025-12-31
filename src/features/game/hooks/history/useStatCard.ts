import { useMemo } from 'react';

interface UseStatCardProps {
    value: number | string;
    format?: 'number' | 'currency' | 'plain';
}

interface UseStatCardReturn {
    formattedValue: string;
}

export const useStatCard = ({ value, format = 'number' }: UseStatCardProps): UseStatCardReturn => {
    const formattedValue = useMemo(() => {
        if (typeof value === 'string') return value;

        switch (format) {
            case 'currency':
                return value.toLocaleString('vi-VN') + 'đ';
            case 'number':
                return value.toLocaleString('vi-VN');
            default:
                return String(value);
        }
    }, [value, format]);

    return { formattedValue };
};
