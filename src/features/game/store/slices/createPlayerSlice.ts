
import { StateCreator } from 'zustand';
import { UserInfo, MatchRecord } from '../../types/entities';
import { GameStoreState } from '../useGameStore';
import { SHOP_ITEMS } from '../../data/shop-data';
import { savePurchaseLog } from '../../data/game-api';

export interface PlayerSlice {
    userInfo: UserInfo;
    setUserInfo: (info: Partial<UserInfo>) => void;
    buyItem: (itemId: string) => { success: boolean; message: string };
    equipItem: (itemId: string) => void;
    addMoney: (amount: number) => void;
    addMatchToHistory: (record: MatchRecord) => void;
}

export const createPlayerSlice: StateCreator<GameStoreState, [], [], PlayerSlice> = (set, get) => ({
    userInfo: {
        name: '',
        balance: 100000,
        inventory: ['skin_default'],
        equippedSkin: 'skin_default',
        stats: { playCount: 0, bestScore: 0 },
        history: [],
        serverHistory: []
    },

    setUserInfo: (info) => set((state) => ({ userInfo: { ...state.userInfo, ...info } })),

    addMoney: (amount) => set((state) => ({
        userInfo: {
            ...state.userInfo,
            balance: state.userInfo.balance + amount
        }
    })),

    addMatchToHistory: (record) => set((state) => {
        // Giữ lại tối đa 50 trận gần nhất
        const newHistory = [record, ...state.userInfo.history].slice(0, 50);

        // Update stats logic luôn
        const newPlayCount = state.userInfo.stats.playCount + 1;
        const newBestScore = Math.max(state.userInfo.stats.bestScore, record.score);

        return {
            userInfo: {
                ...state.userInfo,
                history: newHistory,
                stats: {
                    playCount: newPlayCount,
                    bestScore: newBestScore
                }
            }
        };
    }),

    buyItem: (itemId) => {
        const state = get();
        const item = SHOP_ITEMS.find(i => i.id === itemId);

        if (!item) return { success: false, message: 'Vật phẩm không tồn tại' };

        const isConsumable = item.type === 'lifeline';

        if (!isConsumable && state.userInfo.inventory.includes(itemId)) {
            return { success: false, message: 'Bạn đã sở hữu vật phẩm này' };
        }

        if (state.userInfo.balance < item.price) return { success: false, message: 'Không đủ tiền' };

        // Log to local store
        state.logEvent('SHOP_PURCHASE', {
            itemId,
            itemName: item.name,
            cost: item.price,
            balanceAfter: state.userInfo.balance - item.price
        });

        // Send PURCHASE to API
        savePurchaseLog(itemId, item.name, item.price, item.type as 'lifeline' | 'skin');

        set((state) => ({
            userInfo: {
                ...state.userInfo,
                balance: state.userInfo.balance - item.price,
                inventory: [...state.userInfo.inventory, itemId]
            }
        }));

        return { success: true, message: `Đã mua ${item.name} thành công!` };
    },

    equipItem: (itemId) => {
        const state = get();
        if (state.userInfo.inventory.includes(itemId)) {
            set((state) => ({
                userInfo: { ...state.userInfo, equippedSkin: itemId }
            }));
        }
    }
});
