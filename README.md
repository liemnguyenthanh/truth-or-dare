# Truth or Dare Game

Ứng dụng game Truth or Dare (Thật hay Thách) được xây dựng với Next.js, TypeScript và Tailwind CSS.

## Giới thiệu

Truth or Dare là game vui nhộn để chơi cùng bạn bè. Ứng dụng này cung cấp nhiều chế độ chơi khác nhau với các bộ câu hỏi đa dạng, phù hợp cho các buổi tiệc, tụ tập bạn bè.

## Tính năng

- 🎮 **Nhiều chế độ chơi**: Quick Mode, Drink Mode, Group Mode, Couples Mode, Spin Wheel
- 📚 **Nhiều bộ câu hỏi**: 18+, Party, Táo Bạo và nhiều category khác
- 👥 **Quản lý người chơi**: Thêm, xóa, chỉnh sửa người chơi trong Group Mode
- 💳 **Hệ thống thanh toán**: Tích hợp thanh toán để mở khóa thêm câu hỏi
- ⭐ **Đánh giá**: Cho phép người dùng đánh giá trải nghiệm game
- 🌓 **Dark Mode**: Hỗ trợ chế độ tối
- 📱 **Responsive**: Tối ưu cho mọi thiết bị

## Công nghệ sử dụng

- ⚡️ Next.js 14+ (App Router)
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS
- 🎨 Framer Motion (animations)
- 📦 pnpm (package manager)

## Cài đặt và chạy

### Yêu cầu

- Node.js 18+ 
- pnpm (hoặc npm/yarn)

### Các bước

1. **Clone repository**

```bash
git clone <repository-url>
cd truth-or-dare
```

2. **Cài đặt dependencies**

```bash
pnpm install
```

3. **Chạy development server**

```bash
pnpm dev
```

Mở trình duyệt tại http://localhost:3000 để xem ứng dụng.

4. **Build cho production**

```bash
pnpm build
```

## Cấu trúc project

```
src/
├── app/              # Next.js App Router pages
│   ├── quick/        # Quick Mode
│   ├── drink/        # Drink Mode
│   ├── group/        # Group Mode
│   ├── couples/      # Couples Mode
│   └── spin-wheel/   # Spin Wheel Mode
├── components/       # React components
│   ├── shared/       # Shared UI components
│   ├── game/         # Game-specific components
│   └── payment/      # Payment components
├── hooks/            # Custom React hooks
├── data/             # Game data và questions
├── types/            # TypeScript type definitions
└── lib/              # Utility functions
```

## License

MIT
