
import { useState, useMemo, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { SHOP_ITEMS } from '../../data/shop-data';
import { playSound } from '../../utils/audio-manager';
import { ShopItem } from '../../types/entities';

export const useShop = () => {
  // Mặc định hiển thị tab 'lifeline' (Trợ Giúp)
  const [activeTab, setActiveTab] = useState<'all' | 'skin' | 'lifeline'>('lifeline');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const userInfo = useGameStore(s => s.userInfo);
  const buyItem = useGameStore(s => s.buyItem);
  const equipItem = useGameStore(s => s.equipItem);

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return SHOP_ITEMS;
    return SHOP_ITEMS.filter(item => item.type === activeTab);
  }, [activeTab]);

  const handleSelectItem = useCallback((item: ShopItem) => {
    setSelectedItem(item);
    playSound('select');
  }, []);

  const handleBuy = useCallback(() => {
    if (!selectedItem) return;
    
    // Nếu đã sở hữu -> Trang bị
    if (userInfo.inventory.includes(selectedItem.id)) {
        if (selectedItem.type === 'skin') {
            equipItem(selectedItem.id);
            playSound('correct');
        }
        return;
    }

    // Nếu chưa sở hữu -> Mở modal confirm
    setPurchaseModalOpen(true);
    playSound('select');
  }, [selectedItem, userInfo.inventory, equipItem]);

  const confirmPurchase = useCallback(() => {
    if (!selectedItem) return;
    
    const result = buyItem(selectedItem.id);
    if (result.success) {
        playSound('win'); // Âm thanh mua thành công
        setPurchaseModalOpen(false);
    } else {
        playSound('wrong'); // Âm thanh lỗi/không đủ tiền
        // Có thể thêm toast error ở đây
    }
  }, [selectedItem, buyItem]);

  return {
    items: filteredItems,
    userInfo,
    activeTab,
    selectedItem,
    purchaseModalOpen,
    setActiveTab,
    handleSelectItem,
    handleBuy,
    confirmPurchase,
    setPurchaseModalOpen
  };
};
