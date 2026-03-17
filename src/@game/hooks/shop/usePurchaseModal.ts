import { useState, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { playSound } from '../../utils/audio-manager';
import { ServerHistoryRecord, UserInfo, ShopItem } from '@game/types';

export const usePurchaseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToBuy, setItemToBuy] = useState<ShopItem | null>(null);

  const buyItem = useGameStore(s => s.buyItem);
  const balance = useGameStore(s => s.userInfo.balance);

  const openBuyModal = useCallback((item: ShopItem) => {
    setItemToBuy(item);
    setIsOpen(true);
    playSound('select');
  }, []);

  const closeBuyModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const confirmPurchase = useCallback(() => {
    if (!itemToBuy) return;

    const result = buyItem(itemToBuy.id);

    if (result.success) {
      playSound('win'); 
      setIsOpen(false);
    } else {
      playSound('wrong'); 
    }
  }, [itemToBuy, buyItem]);

  return {
    isOpen,
    itemToBuy,
    balance,
    openBuyModal,
    closeBuyModal,
    confirmPurchase
  };
};
