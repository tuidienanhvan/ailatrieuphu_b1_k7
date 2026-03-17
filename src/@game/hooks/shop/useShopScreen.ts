
import { useState, useMemo, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { GameState, ShopItem } from '@game/types';
import { SHOP_ITEMS } from '../../defaults/shop.defaults';
import { playSound } from '../../utils/audio-manager';

export const useShopScreen = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'skin' | 'lifeline'>('lifeline');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const setGameState = useGameStore(s => s.setGameState);

  // Filter items based on active tab
  const items = useMemo(() => {
    if (activeTab === 'all') return SHOP_ITEMS;
    return SHOP_ITEMS.filter(item => item.type === activeTab);
  }, [activeTab]);

  const handleSelectTab = useCallback((tab: 'all' | 'skin' | 'lifeline') => {
    setActiveTab(tab);
    playSound('select');
  }, []);

  const handleSelectItem = useCallback((item: ShopItem) => {
    setSelectedItemId(item.id);
    playSound('select');
  }, []);

  const handleBack = useCallback(() => {
    setGameState(GameState.WELCOME);
    playSound('select'); 
  }, [setGameState]);

  return {
    items,
    activeTab,
    selectedItemId,
    setActiveTab: handleSelectTab,
    handleSelectItem,
    handleBack
  };
};
