
import { useMemo, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { ShopItem } from '../../types/entities';
import { playSound } from '../../utils/audio-manager';

export const useShopItem = (item: ShopItem) => {
  const userInfo = useGameStore(s => s.userInfo);
  const equipItem = useGameStore(s => s.equipItem);

  // Derived State
  // Đếm số lượng vật phẩm này trong kho
  const quantity = useMemo(() => {
    return userInfo.inventory.filter(id => id === item.id).length;
  }, [userInfo.inventory, item.id]);

  const isOwned = quantity > 0;
  const isEquipped = useMemo(() => userInfo.equippedSkin === item.id, [userInfo.equippedSkin, item.id]);
  const canAfford = useMemo(() => userInfo.balance >= item.price, [userInfo.balance, item.price]);

  // Actions
  const handleEquip = useCallback(() => {
    if (item.type === 'skin' && isOwned) {
      equipItem(item.id);
      playSound('correct');
    }
  }, [item, isOwned, equipItem]);

  return {
    isOwned,
    quantity, // Export quantity
    isEquipped,
    canAfford,
    handleEquip
  };
};
