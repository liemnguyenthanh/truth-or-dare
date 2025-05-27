# Game Mode Implementation Checklist

## Mục tiêu
Thêm 2 chế độ chơi cho app Truth or Dare:
1. **Chế độ Nhanh**: Không cần nhập tên → chọn category → chơi ngay
2. **Chế độ Nhóm**: Nhập tên người chơi → chọi category → chơi theo lượt

## Checklist Implementation

### 1. Cập nhật Types và Interfaces
- [x] Thêm `GameMode` enum vào `src/core/types/game.ts`
- [x] Cập nhật `GameState` interface để bao gồm `gameMode`
- [x] Thêm interface cho Game Mode Selection

### 2. Tạo Game Mode Selection Page
- [x] Tạo component `GameModeSelectionPage.tsx`
- [x] Design UI cho việc chọn chế độ chơi
- [x] Thêm animations và styling phù hợp
- [x] Implement logic chọn mode

### 3. Cập nhật Game Context
- [x] Thêm `gameMode` vào initial state
- [x] Thêm function `setGameMode` vào context
- [x] Cập nhật `GameContextType` interface
- [x] Cập nhật logic `startGame` để xử lý 2 chế độ
- [x] Cập nhật logic `resetGame` và `quitGame`

### 4. Cập nhật Main Game Component
- [x] Thêm `GAME_MODE_SELECTION` stage vào `GameStage` enum
- [x] Cập nhật flow: Mode Selection → Setup → Category → Game Play
- [x] Cập nhật `determineStage` function
- [x] Thêm routing cho Game Mode Selection Page

### 5. Cập nhật GameSetupPage
- [ ] Thêm logic để skip setup page cho chế độ nhanh
- [ ] Cập nhật UI để phù hợp với từng chế độ
- [ ] Cập nhật validation logic

### 6. Cập nhật CategorySelectionPage
- [ ] Cập nhật logic `startGame` để xử lý cả 2 chế độ
- [ ] Đảm bảo category selection hoạt động cho cả 2 mode

### 7. Cập nhật GamePlayPage
- [x] Thêm logic hiển thị khác nhau cho 2 chế độ:
  - Chế độ nhanh: Ẩn thông tin người chơi
  - Chế độ nhóm: Hiển thị tên người chơi hiện tại
- [x] Cập nhật `nextParticipant` logic cho chế độ nhanh
- [x] Cập nhật UI components

### 8. Testing và Polish
- [ ] Test flow chế độ nhanh
- [ ] Test flow chế độ nhóm
- [ ] Test chuyển đổi giữa các chế độ
- [ ] Kiểm tra responsive design
- [ ] Kiểm tra animations
- [ ] Code cleanup và optimization

### 9. Documentation
- [ ] Cập nhật README.md nếu cần
- [ ] Thêm comments cho code mới
- [ ] Cập nhật type definitions

## Notes
- Chế độ nhanh sẽ sử dụng 1 participant ảo hoặc không cần participant
- Cần đảm bảo backward compatibility
- UI/UX phải consistent giữa 2 chế độ
- Performance không bị ảnh hưởng

## Current Status
- [x] Started implementation
- [x] In progress
- [ ] Testing phase
- [ ] Completed 