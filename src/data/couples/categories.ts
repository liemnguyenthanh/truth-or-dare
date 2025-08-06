import { CoupleCategory } from '@/types';

export const coupleCategories: CoupleCategory[] = [
  {
    id: 'basic',
    name: 'Cơ Bản',
    description: 'Những tư thế đơn giản, dễ thực hiện, phù hợp với mọi cặp đôi',
    color: '#3498db',
    requiresAdult: true,
  },
  {
    id: 'romantic',
    name: 'Lãng Mạn',
    description: 'Tư thế tạo sự gần gũi và kết nối tình cảm sâu sắc',
    color: '#e74c3c',
    requiresAdult: true,
  },
  {
    id: 'intimate',
    name: 'Thân Mật',
    description: 'Tư thế nhẹ nhàng tạo cảm giác gắn kết và âu yếm',
    color: '#9b59b6',
    requiresAdult: true,
  },
  {
    id: 'adventurous',
    name: 'Phiêu Lưu',
    description: 'Tư thế mạo hiểm hơn cho những cặp đôi muốn thử thách',
    color: '#f39c12',
    requiresAdult: true,
  },
  {
    id: 'spicy',
    name: 'Nóng Bỏng',
    description: 'Tư thế mạnh mẽ, đam mê cho những cặp đôi táo bạo',
    color: '#e91e63',
    requiresAdult: true,
  },
];
