import { ShopItem } from '@game/types';

export let SHOP_ITEMS: ShopItem[] = [
  {
    id: 'extra_5050',
    type: 'lifeline',
    name: 'Them 50:50',
    description: 'Them 1 luot 50:50 cho moi van.',
    price: 2000,
    icon: 'Zap',
    color: '#fbbf24',
    rarity: 'common',
  },
  {
    id: 'extra_phone',
    type: 'lifeline',
    name: 'Them Goi nguoi than',
    description: 'Them 1 lan goi chuyen gia.',
    price: 3000,
    icon: 'Phone',
    color: '#3b82f6',
    rarity: 'common',
  },
  {
    id: 'extra_change_question',
    type: 'lifeline',
    name: 'Them Doi cau hoi',
    description: 'Them quyen doi cau hoi trong van.',
    price: 4000,
    icon: 'RefreshCw',
    color: '#ec4899',
    rarity: 'rare',
  },
];

export function applyShopConfigOverrides(overrides?: {
  items?: ShopItem[];
}): void {
  if (overrides?.items && overrides.items.length > 0) {
    SHOP_ITEMS = [...overrides.items];
  }
}
