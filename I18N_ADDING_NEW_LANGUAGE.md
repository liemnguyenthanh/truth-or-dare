# Hướng Dẫn Thêm Ngôn Ngữ Mới (i18n)

## 📋 Tổng Quan

Project này sử dụng Next.js App Router với Static Site Generation (SSG) và hỗ trợ đa ngôn ngữ thông qua cấu trúc `[locale]` routing.

**Cấu trúc hiện tại:**
- Vietnamese (vi) - Default locale
- English (en)
- **Mục tiêu:** Thêm ngôn ngữ mới (ví dụ: Spanish - es)

---

## 🎯 Các Bước Thêm Ngôn Ngữ Mới

### **Bước 1: Cập Nhật Config**

**File:** `src/i18n/config.ts`

Thêm locale code mới vào mảng `locales`:

```typescript
// Trước
export const locales = ['vi', 'en'] as const;

// Sau (ví dụ thêm Spanish)
export const locales = ['vi', 'en', 'es'] as const;
```

**Lưu ý:**
- Sử dụng [ISO 639-1 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- Ví dụ: `es` (Spanish), `fr` (French), `de` (German), `ja` (Japanese), `ko` (Korean), `zh` (Chinese)

---

### **Bước 2: Tạo Folder Structure**

Tạo folder mới cho locale trong `src/i18n/locales/`:

```bash
mkdir -p src/i18n/locales/es
mkdir -p src/i18n/locales/es/questions
```

**Cấu trúc cần tạo:**
```
src/i18n/locales/es/
├── categories.json
├── common.json
├── gameModes.json
├── pages.json
├── seo.json
└── questions/
    ├── drink.json
    └── quick.json
```

---

### **Bước 3: Copy và Dịch Translation Files**

#### **3.1. Copy từ locale mẫu (English hoặc Vietnamese)**

**Option A: Copy từ English (khuyến nghị)**
```bash
cp -r src/i18n/locales/en/* src/i18n/locales/es/
```

**Option B: Copy từ Vietnamese**
```bash
cp -r src/i18n/locales/vi/* src/i18n/locales/es/
```

#### **3.2. Dịch tất cả các file JSON**

Bạn cần dịch **TẤT CẢ** các file sau:

1. **`common.json`** - UI text chung (buttons, navigation, footer, modals)
2. **`pages.json`** - Text theo từng page
3. **`gameModes.json`** - Mô tả các game modes
4. **`categories.json`** - Tên và mô tả categories
5. **`seo.json`** - SEO metadata
6. **`questions/drink.json`** - 348 câu hỏi drink mode
7. **`questions/quick.json`** - 183 câu hỏi quick mode

**Lưu ý quan trọng:**
- Giữ nguyên cấu trúc JSON (keys, nesting)
- Chỉ dịch **values**, không thay đổi **keys**
- Đảm bảo JSON syntax hợp lệ (dấu ngoặc, dấu phẩy)

---

### **Bước 4: Cập Nhật Language Switcher**

**File:** `src/components/shared/LanguageSwitcher.tsx`

Thêm locale mới vào `localeOptions`:

```typescript
// Trước
const localeOptions: Record<Locale, { flag: string; label: string }> = {
  vi: { flag: '🇻🇳', label: 'Tiếng Việt' },
  en: { flag: '🇬🇧', label: 'English' },
};

// Sau (ví dụ thêm Spanish)
const localeOptions: Record<Locale, { flag: string; label: string }> = {
  vi: { flag: '🇻🇳', label: 'Tiếng Việt' },
  en: { flag: '🇬🇧', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
};
```

**Lưu ý:**
- Sử dụng flag emoji phù hợp với quốc gia/ngôn ngữ
- Label nên là tên ngôn ngữ bằng chính ngôn ngữ đó (ví dụ: "Español" thay vì "Spanish")

---

### **Bước 5: Cập Nhật Translation Loader Cache**

**File:** `src/lib/i18n/loader.ts`

Thêm locale mới vào `translationCache`:

```typescript
// Trước
const translationCache: Record<
  Locale,
  Partial<Record<TranslationNamespace, any>>
> = {
  vi: {},
  en: {},
};

// Sau (ví dụ thêm Spanish)
const translationCache: Record<
  Locale,
  Partial<Record<TranslationNamespace, any>>
> = {
  vi: {},
  en: {},
  es: {},
};
```

---

### **Bước 6: Cập Nhật Metadata (Nếu Cần)**

**File:** `src/app/[locale]/page.tsx` (và các pages khác có `generateMetadata`)

Nếu có hardcoded metadata translations, thêm locale mới:

```typescript
// Ví dụ trong page.tsx
const seoTranslations = {
  vi: {
    title: 'Thật Hay Thách Online...',
    description: '...',
  },
  en: {
    title: 'Truth or Dare Online...',
    description: '...',
  },
  es: {  // Thêm mới
    title: 'Verdad o Reto Online...',
    description: '...',
  },
};
```

**Lưu ý:** Nếu đã dùng `seo.json`, bước này không cần thiết.

---

### **Bước 7: Test và Verify**

#### **7.1. Test Build**
```bash
npm run build
```

Đảm bảo build thành công và generate static pages cho locale mới.

#### **7.2. Test Locale Routing**
- Truy cập `http://localhost:3000/es` - phải hiển thị trang home bằng ngôn ngữ mới
- Test language switcher - chuyển đổi giữa các ngôn ngữ
- Test navigation - đảm bảo locale được giữ khi navigate

#### **7.3. Test Translation Loading**
- Kiểm tra tất cả pages load đúng translations
- Kiểm tra questions load đúng ngôn ngữ
- Kiểm tra fallback (nếu thiếu translation, phải fallback về Vietnamese)

---

## 📝 Checklist Chi Tiết

### ✅ Config & Setup
- [ ] Thêm locale code vào `src/i18n/config.ts`
- [ ] Tạo folder structure `src/i18n/locales/[locale]/`
- [ ] Cập nhật `translationCache` trong `src/lib/i18n/loader.ts`

### ✅ Translation Files
- [ ] `common.json` - Dịch đầy đủ
- [ ] `pages.json` - Dịch đầy đủ
- [ ] `gameModes.json` - Dịch đầy đủ
- [ ] `categories.json` - Dịch đầy đủ
- [ ] `seo.json` - Dịch đầy đủ
- [ ] `questions/drink.json` - Dịch 348 câu hỏi
- [ ] `questions/quick.json` - Dịch 183 câu hỏi

### ✅ UI Components
- [ ] Cập nhật `LanguageSwitcher.tsx` với flag và label mới
- [ ] Test language switcher hoạt động đúng

### ✅ Testing
- [ ] Build thành công (`npm run build`)
- [ ] Test routing: `/[locale]/`, `/[locale]/drink`, etc.
- [ ] Test language switching
- [ ] Test tất cả pages hiển thị đúng translations
- [ ] Test questions load đúng ngôn ngữ
- [ ] Test fallback mechanism

---

## 🔍 Ví Dụ Cụ Thể: Thêm Spanish (es)

### **1. Cập nhật config.ts**
```typescript
export const locales = ['vi', 'en', 'es'] as const;
```

### **2. Tạo folder structure**
```bash
mkdir -p src/i18n/locales/es/questions
```

### **3. Copy và dịch files**
```bash
# Copy từ English
cp -r src/i18n/locales/en/* src/i18n/locales/es/

# Sau đó dịch tất cả nội dung trong các file JSON
```

### **4. Cập nhật LanguageSwitcher**
```typescript
const localeOptions: Record<Locale, { flag: string; label: string }> = {
  vi: { flag: '🇻🇳', label: 'Tiếng Việt' },
  en: { flag: '🇬🇧', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
};
```

### **5. Cập nhật loader.ts**
```typescript
const translationCache: Record<
  Locale,
  Partial<Record<TranslationNamespace, any>>
> = {
  vi: {},
  en: {},
  es: {},
};
```

### **6. Ví dụ dịch common.json**
```json
{
  "app": {
    "name": "Verdad o Reto",
    "subtitle": "Juego Online",
    "description": "Juego divertido con amigos"
  },
  "navigation": {
    "home": "Inicio",
    "feedback": "Comentarios"
  },
  "buttons": {
    "back": "Volver",
    "donate": "Donar",
    "continue": "Continuar",
    // ... tiếp tục dịch tất cả keys
  }
}
```

---

## ⚠️ Lưu Ý Quan Trọng

### **1. JSON Structure**
- **KHÔNG** thay đổi keys (ví dụ: `"app"`, `"name"`, `"buttons"`)
- **CHỈ** dịch values (ví dụ: `"Thật Hay Thách"` → `"Truth or Dare"`)
- Giữ nguyên nesting structure

### **2. Question Files**
- `drink.json`: Cấu trúc là object với keys là category IDs
- `quick.json`: Cấu trúc là array với objects có `type`, `text`, `category`, `id`
- Giữ nguyên structure, chỉ dịch `text` field

### **3. Fallback Mechanism**
- Nếu translation thiếu, hệ thống tự động fallback về Vietnamese (default locale)
- Đảm bảo tất cả keys quan trọng đều được dịch để tránh fallback

### **4. Build Time**
- Mỗi locale mới sẽ tăng số lượng static pages được generate
- Build time có thể tăng 30-50% cho mỗi locale mới

### **5. Testing**
- **QUAN TRỌNG:** Test kỹ tất cả pages và features
- Đặc biệt chú ý: questions loading, category names, UI text
- Test trên cả development và production build

---

## 🚀 Quick Start Template

Để thêm ngôn ngữ mới nhanh, bạn có thể chạy script sau (thay `es` bằng locale code của bạn):

```bash
# 1. Tạo folder
mkdir -p src/i18n/locales/es/questions

# 2. Copy từ English
cp -r src/i18n/locales/en/* src/i18n/locales/es/

# 3. Sau đó:
# - Cập nhật config.ts
# - Cập nhật LanguageSwitcher.tsx
# - Cập nhật loader.ts
# - Dịch tất cả files trong es/
```

---

## 📚 Tài Liệu Tham Khảo

- [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

## ❓ FAQ

### **Q: Có thể thêm bao nhiêu ngôn ngữ?**
A: Không giới hạn, nhưng mỗi ngôn ngữ sẽ tăng build time và bundle size.

### **Q: Có thể bỏ qua một số translation files không?**
A: Có, nhưng hệ thống sẽ fallback về Vietnamese. Khuyến nghị dịch đầy đủ để có trải nghiệm tốt nhất.

### **Q: Làm sao biết translation nào còn thiếu?**
A: Check console warnings khi chạy dev server, hoặc test trên browser và xem có text nào vẫn hiển thị tiếng Việt không.

### **Q: Có thể dùng translation service/API không?**
A: Có thể, nhưng hiện tại project dùng static JSON files. Nếu muốn dùng API, cần refactor `loader.ts`.

---

## 📝 Notes

- File này nên được cập nhật mỗi khi có thay đổi về cấu trúc i18n
- Giữ file này trong repository để team members có thể tham khảo
- Khi thêm ngôn ngữ mới, update checklist và test thoroughly

