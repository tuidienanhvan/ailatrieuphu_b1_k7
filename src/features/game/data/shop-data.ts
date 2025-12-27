
import { ShopItem } from '../types/entities';

export const SHOP_ITEMS: ShopItem[] = [
  // SKINS
  {
    id: 'skin_default',
    type: 'skin',
    name: 'Giao Diện Chuẩn',
    description: 'Phong cách truyền thống, đơn giản và tinh tế.',
    price: 0,
    icon: 'Layout',
    color: 'from-blue-600 to-blue-900',
    rarity: 'common'
  },
  {
    id: 'skin_gold',
    type: 'skin',
    name: 'Vàng Hoàng Gia',
    description: 'Mạ vàng toàn bộ giao diện. Thể hiện đẳng cấp triệu phú.',
    price: 5000,
    icon: 'Crown',
    color: 'from-yellow-400 to-yellow-700',
    rarity: 'legendary'
  },
  {
    id: 'skin_neon',
    type: 'skin',
    name: 'Cyberpunk Neon',
    description: 'Phong cách tương lai với ánh sáng Neon rực rỡ.',
    price: 2500,
    icon: 'Zap',
    color: 'from-purple-500 to-pink-600',
    rarity: 'epic'
  },
  {
    id: 'skin_dark',
    type: 'skin',
    name: 'Bóng Đêm',
    description: 'Giao diện tối giản, tập trung tối đa vào câu hỏi.',
    price: 1000,
    icon: 'Moon',
    color: 'from-slate-800 to-black',
    rarity: 'rare'
  },
  
  // LIFELINES (Concept only - logic handling handles count separately, but here we just simulate unlock)
  {
    id: 'extra_5050',
    type: 'lifeline',
    name: 'Thêm 50:50',
    description: 'Mở khóa quyền trợ giúp 50:50 thứ hai trong mỗi lượt chơi.',
    price: 8000,
    icon: 'DivideCircle',
    color: 'from-green-500 to-emerald-700',
    rarity: 'epic'
  },
  {
    id: 'expert_unlock',
    type: 'lifeline',
    name: 'Chuyên Gia AI',
    description: 'Nâng cấp AI để có độ chính xác lên tới 99.9%.',
    price: 15000,
    icon: 'Bot',
    color: 'from-cyan-400 to-blue-600',
    rarity: 'legendary'
  }
];
