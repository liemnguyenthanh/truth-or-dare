# 🚀 Quick Deploy Guide

## TL;DR - Copy Paste These Steps

---

## Step 1: Verify Database (1 min)

1. Go to https://app.supabase.com → Your project
2. Click **SQL Editor**
3. Copy & paste content from `supabase/deploy-check.sql`
4. Click **Run**
5. Verify amount shows `10000` ✅

---

## Step 2: Deploy Edge Function (2 mins)

### Option A: Via Dashboard (Easiest)

1. Go to **Edge Functions** → **Functions**
2. Click **create-order**
3. Go to **Code** tab
4. Copy entire content from: `supabase/functions/create-order/index.ts`
5. Paste and click **Deploy**

### Option B: Check if already updated

If function was recently deployed, it might already have the new code. Verify:
- Open function → Code tab
- Search for: `const amount = parseInt`
- Should show: `'10000'`

---

## Step 3: Set Environment Variable (1 min)

1. Go to **Edge Functions** → **Settings** → **Secrets**
2. Click **Add new secret**
3. Key: `PAYMENT_AMOUNT`
4. Value: `10000`
5. Save

---

## Step 4: Test (1 min)

Open your app:
1. Go to Quick Mode
2. Play 5 questions
3. Click "Thanh toán"
4. Verify shows **10.000 ₫** ✅

---

## 🎉 Done!

Total time: ~5 minutes

---

## Need Help?

Check `DEPLOY_CHECKLIST.md` for detailed instructions.




