# 🚀 Auto Post Drafts Tool

Tool đơn giản để tự động post **TẤT CẢ** file `.md` trong folder `content-drafts` lên Hashnode blog.

## 📋 Cách Sử dụng

### Chạy Auto Post
```bash
pnpm run blog:auto-post
```

Tool sẽ tự động:
- 🔍 **Scan folder `content-drafts/`** tìm tất cả file `.md`
- 📖 **Đọc nội dung** và tự động extract title, subtitle, tags
- 📤 **Post lên Hashnode** với metadata được tạo tự động
- ⏳ **Delay 5 giây** giữa các bài để tránh rate limit
- 📊 **Báo cáo kết quả** thành công/thất bại

## 🔄 Workflow

1. **Tạo bài mới**: Thêm file `.md` vào `content-drafts/`
2. **Chạy tool**: `pnpm run blog:auto-post`
3. **Xóa file đã post**: Xóa các file đã post thành công
4. **Lặp lại**: Thêm bài mới và repeat

## 📁 Cấu Trúc

```
content-drafts/
├── bai-moi-1.md          ← Tool sẽ tự động post
├── bai-moi-2.md          ← Tool sẽ tự động post  
└── bai-moi-3.md          ← Tool sẽ tự động post
```

## 🤖 Auto-Detection

Tool tự động phát hiện:

### Title
- Lấy từ dòng đầu tiên bắt đầu bằng `# `

### Subtitle  
- Lấy từ đoạn văn đầu tiên sau title (150 ký tự)

### Tags
- **Ưu tiên**: Tìm trong content `**Từ khóa:** tag1, tag2, tag3`
- **Fallback**: Tạo từ tên file + default tags

## ⚙️ Configuration

- **Hashnode host**: `truth-or-dare-game.hashnode.dev`
- **API token**: Đã config sẵn
- **Folder**: `content-drafts/` (hard-coded)

## 🎯 Đơn Giản & Linh Hoạt

- ✅ Không cần config metadata cho từng bài
- ✅ Chỉ cần drop file `.md` vào folder
- ✅ Tool tự động xử lý tất cả
- ✅ Post xong → xóa file → thêm bài mới 