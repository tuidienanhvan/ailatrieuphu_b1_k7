
import { StateCreator } from 'zustand';
import { UserInfo } from '../../types/entities';
import { GameStoreState } from '../useGameStore';
import { SHOP_ITEMS } from '../../data/shop-data';

export interface PlayerSlice {
  userInfo: UserInfo;
  setUserInfo: (info: Partial<UserInfo>) => void;
  buyItem: (itemId: string) => { success: boolean; message: string };
  equipItem: (itemId: string) => void;
  addMoney: (amount: number) => void;
}

export const createPlayerSlice: StateCreator<GameStoreState, [], [], PlayerSlice> = (set, get) => ({
  userInfo: { 
    name: '', 
    balance: 10000, // Tiền khởi đầu (Demo)
    inventory: ['skin_default'], 
    equippedSkin: 'skin_default',
    stats: { playCount: 0, bestScore: 0 } 
  },
  
  setUserInfo: (info) => set((state) => ({ userInfo: { ...state.userInfo, ...info } })),

  addMoney: (amount) => set((state) => ({
    userInfo: { 
        ...state.userInfo, 
        balance: state.userInfo.balance + amount 
    }
  })),

  buyItem: (itemId) => {
    const state = get();
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    
    if (!item) return { success: false, message: 'Vật phẩm không tồn tại' };
    if (state.userInfo.inventory.includes(itemId)) return { success: false, message: 'Bạn đã sở hữu vật phẩm này' };
    if (state.userInfo.balance < item.price) return { success: false, message: 'Không đủ tiền' };

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
