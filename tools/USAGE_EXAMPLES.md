# 🎯 Quick Usage Examples

## 🚀 Quick Start

### 1. Test Connection First

```bash
pnpm run blog:test
```

**Expected Output:**

```
🧪 Testing Hashnode connection...
📊 Publication: Truth or dare
✅ Connection successful! Publication ID: 683672281669e31bc74da101
```

### 2. See Available Posts

```bash
pnpm run blog:list
```

### 3. Post Your First Article

```bash
# Post the first article about "10 Fun Truth or Dare Questions"
pnpm run blog:post 0
```

### 4. Post All Articles (BE CAREFUL!)

```bash
# This will post all 3 articles with 5-second delays
pnpm run blog:post-all
```

## 📝 Individual Post Commands

```bash
# Post "10 Câu Hỏi Thật Hay Thách Hài Hước Nhất"
pnpm run blog:post 0

# Post "Cách Tổ Chức Tiệc Sinh Nhật với Thật Hay Thách"
pnpm run blog:post 1

# Post "5 Trò Chơi Nhóm Vui Nhộn Tương Tự Thật Hay Thách"
pnpm run blog:post 2
```

## ✅ Success Indicators

After posting, you should see:

```
📝 Publishing post 0: "10 Câu Hỏi Thật Hay Thách Hài Hước Nhất"
📊 Publication: Truth or dare
🚀 Publishing post...
✅ Post published successfully!
📝 Title: 10 Câu Hỏi Thật Hay Thách Hài Hước Nhất
🔗 URL: https://truth-or-dare-game.hashnode.dev/10-cau-hoi-that-hay-thach-hai-huoc-nhat
📅 Published: 15/1/2024, 10:30:00
🏷️ Tags: truth-or-dare, party-games, fun-questions
```

## 🔍 Verify Results

1. **Check Hashnode Dashboard**: https://hashnode.com/
2. **Visit Your Blog**: https://truth-or-dare-game.hashnode.dev
3. **Test Your Website**: http://localhost:3000/blog (after `pnpm run dev`)

## ⚠️ Important Notes

- **Post each article only ONCE** - Hashnode doesn't like duplicates
- **Check results** on Hashnode dashboard after posting
- **Wait a few minutes** for content to sync to your website
- **Test locally** with `pnpm run dev` to see new content

## 🛠️ Troubleshooting

### If posting fails:

1. Check internet connection
2. Verify API key is still valid
3. Check Hashnode service status

### If posts don't appear on your website:

1. Wait 2-3 minutes for API sync
2. Refresh your local dev server
3. Check browser console for errors

## 🎉 Next Steps After Posting

1. **Share on social media** - posts have proper OG tags
2. **Monitor performance** on Hashnode analytics
3. **Add more content** by editing `BLOG_POSTS` array
4. **Customize** further based on your needs
