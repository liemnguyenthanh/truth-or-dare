# Payment Amount Configuration

## 🎯 Overview

Payment amount is now **flexible and configurable** across the entire system.

**Default:** 10,000 VNĐ (10k)

---

## ⚙️ How to Change Payment Amount

### Option 1: Environment Variable (Recommended)

Set the `PAYMENT_AMOUNT` environment variable in your deployment:

```bash
# Supabase Edge Functions
PAYMENT_AMOUNT=15000  # Change to 15k

# Next.js Frontend
NEXT_PUBLIC_PAYMENT_AMOUNT=15000
```

### Option 2: Update Config File

Edit `src/lib/config/payment.ts`:

```typescript
export const PAYMENT_CONFIG = {
  AMOUNT: parseInt(process.env.PAYMENT_AMOUNT || '15000'), // Change default here
  // ...
}
```

### Option 3: Update Database Default

Edit `supabase/migrations/001_create_orders_table.sql`:

```sql
amount INTEGER NOT NULL DEFAULT 15000, -- Change default here
```

---

## 📍 Where Amount is Used

The payment amount is automatically synced across:

1. **Config** (`src/lib/config/payment.ts`)
   - Default: 10000 VNĐ
   - Helper: `formatPaymentAmount()` for display

2. **Edge Function** (`supabase/functions/create-order/index.ts`)
   - Reads from `PAYMENT_AMOUNT` env var
   - Default: 10000

3. **Database** (`supabase/migrations/001_create_orders_table.sql`)
   - Default: 10000 VNĐ

4. **Frontend** (`src/components/payment/PaymentModal.tsx`)
   - Uses `formatPaymentAmount()` helper
   - Automatically formats with Vietnamese locale

5. **Hooks** (`src/hooks/usePayment.ts`)
   - Persists amount in localStorage
   - Default fallback: 10000

---

## ✅ How It Works

### Configuration Flow:

```
Environment Variable (PAYMENT_AMOUNT)
         ↓
    Config File (payment.ts)
         ↓
    ┌─────────┬─────────┬──────────┐
    ↓         ↓         ↓          ↓
Edge Func  Frontend  Database  Display
```

### Example: Setting to 15k

```bash
# 1. Set environment variable
export PAYMENT_AMOUNT=15000

# 2. Or update config file
# payment.ts: '15000'

# 3. Database will use the value from the app, not the default
```

---

## 🎨 Display Formatting

The amount is automatically formatted for Vietnamese locale:

```typescript
import { formatPaymentAmount } from '@/lib/config/payment';

formatPaymentAmount(10000);  // "10.000 ₫"
formatPaymentAmount(15000);  // "15.000 ₫"
formatPaymentAmount(100000); // "100.000 ₫"
```

---

## 🚀 Deployment

### Supabase Edge Functions

1. Go to Supabase Dashboard
2. Navigate to Edge Functions → Settings
3. Add environment variable:
   - Key: `PAYMENT_AMOUNT`
   - Value: `15000` (your amount)

### Vercel / Next.js

1. Go to Vercel Dashboard
2. Navigate to Project → Settings → Environment Variables
3. Add:
   - Key: `NEXT_PUBLIC_PAYMENT_AMOUNT`
   - Value: `15000`

---

## 🔄 Updating Existing Deployment

If you change the amount after deployment:

1. **Update environment variables** in your hosting platform
2. **Redeploy Edge Functions** if applicable
3. **No database migration needed** (amount column accepts any integer)

---

## 💡 Tips

- **Test locally first** by updating config file
- **Keep amounts consistent** across all components
- **Use environment variables** for easy changes without code deployment
- **Monitor webhook** to ensure amount validation works correctly

---

## 🐛 Troubleshooting

### Amount mismatch between pages
- Check environment variables are set correctly
- Clear browser cache / localStorage
- Verify config file values

### Edge function using wrong amount
- Check `PAYMENT_AMOUNT` env var in Supabase
- Restart Edge Function after setting env var

### Display shows wrong amount
- Check `formatPaymentAmount()` is being used
- Verify `orderData.amount` is passed correctly

---

**Last Updated:** 2025-01-XX




