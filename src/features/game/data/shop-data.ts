
import { ShopItem } from '../types/entities';

export const SHOP_ITEMS: ShopItem[] = [
  // --- SKINS ---
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
    price: 50000,
    icon: 'Crown',
    color: 'from-yellow-400 to-yellow-700',
    rarity: 'legendary'
  },
  {
    id: 'skin_neon',
    type: 'skin',
    name: 'Cyberpunk Neon',
    description: 'Phong cách tương lai với ánh sáng Neon rực rỡ.',
    price: 25000,
    icon: 'Zap',
    color: 'from-purple-500 to-pink-600',
    rarity: 'epic'
  },
  {
    id: 'skin_dark',
    type: 'skin',
    name: 'Bóng Đêm',
    description: 'Giao diện tối giản, tập trung tối đa vào câu hỏi.',
    price: 10000,
    icon: 'Moon',
    color: 'from-slate-800 to-black',
    rarity: 'rare'
  },

  // --- LIFELINES (Consumables) ---
  {
    id: 'extra_5050',
    type: 'lifeline',
    name: 'Thêm 50:50',
    description: 'Thêm 1 quyền trợ giúp 50:50 vào lượt chơi kế tiếp.',
    price: 5000,
    icon: 'DivideCircle',
    color: 'from-green-500 to-emerald-700',
    rarity: 'rare'
  },
  {
    id: 'extra_change_question',
    type: 'lifeline',
    name: 'Đổi Câu Hỏi',
    description: 'Thêm 1 quyền đổi câu hỏi mới nếu gặp câu khó.',
    price: 8000,
    icon: 'RefreshCw',
    color: 'from-blue-400 to-indigo-600',
    rarity: 'epic'
  },
  {
    id: 'expert_unlock',
    type: 'lifeline',
    name: 'Chuyên Gia AI',
    description: 'Nâng cấp AI để có độ chính xác lên tới 99.9% cho game sau.',
    price: 20000,
    icon: 'Bot',
    color: 'from-cyan-400 to-blue-600',
    rarity: 'legendary'
  },
  {
    id: 'extra_audience',
    type: 'lifeline',
    name: 'Hỏi Khán Giả',
    description: 'Thêm 1 lần hỏi ý kiến khán giả trong trường quay.',
    price: 3000,
    icon: 'Users',
    color: 'from-orange-400 to-red-500',
    rarity: 'common'
  },
  {
    id: 'extra_phone',
    type: 'lifeline',
    name: 'Gọi Người Thân',
    description: 'Thêm 1 quyền gọi điện thoại cho chuyên gia.',
    price: 4000,
    icon: 'Phone',
    color: 'from-emerald-500 to-teal-700',
    rarity: 'common'
  }
];
