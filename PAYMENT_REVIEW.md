# Payment Flow Review - Truth or Dare

**Date:** 2025-01-XX  
**Reviewer:** AI Code Review  
**Scope:** Complete payment system from Supabase to Frontend

---

## 📋 Executive Summary

The payment flow has been reviewed comprehensively across:
- ✅ Database Schema & Migrations
- ✅ Supabase Edge Functions (create-order, validate-code, order-status, payment-webhook)
- ✅ Frontend Integration (usePayment hook, PaymentModal, CodeInputModal)
- ✅ Game Mode Integration (Quick Mode, Group Mode)

**Overall Assessment:** The system is functional but has several critical issues and edge cases that need to be addressed.

---

## 🚨 CRITICAL ISSUES

### 1. Amount Type Mismatch ⚠️
**Location:** `supabase/functions/create-order/index.ts:185`  
**Issue:** Hardcoded amount as string `'10000'` but database expects INTEGER
```typescript
const amount = '10000'; // ❌ Should be number
```

**Impact:**
- Database insert may fail
- Type inconsistency across system
- May cause runtime errors

**Fix:**
```typescript
const amount = 10000; // ✅ Use number
// Or better: use config
const amount = parseInt(Deno.env.get('PAYMENT_AMOUNT') || '20000');
```

**Severity:** HIGH

---

### 2. Missing Error Handling in Payment Modal
**Location:** `src/components/payment/PaymentModal.tsx`  
**Issue:** QR code generation can fail silently

```typescript
<Image
  src={orderData.qrUrl}
  onError={() => {
    // Fallback to placeholder if QR generation fails
    // ❌ No actual fallback implementation
  }}
/>
```

**Impact:** Users cannot see payment instructions if QR fails

**Fix:** Implement actual fallback with instructions to manually transfer

**Severity:** MEDIUM

---

### 3. Potential Memory Leak in usePayment Hook
**Location:** `src/hooks/usePayment.ts:273-277`  
**Issue:** Polling interval may not be cleaned up properly

```typescript
useEffect(() => {
  if (orderData && isPaymentModalOpen) {
    startPolling(orderData.orderId);
  }
}, [orderData, isPaymentModalOpen, startPolling]); 
// ⚠️ startPolling depends on orderData which creates loop
```

**Impact:** Memory leaks, excessive API calls

**Fix:** Use useCallback properly with stable dependencies

**Severity:** MEDIUM

---

### 4. No Persistence of isGameUnlocked State
**Location:** `src/app/quick/QuickModePage.tsx:24`  
**Issue:** `isGameUnlocked` state is not persisted across page reloads

```typescript
const [isGameUnlocked, setIsGameUnlocked] = useState(false);
// ❌ Lost on page reload
```

**Impact:** Users have to re-enter code after refresh

**Fix:** Persist to localStorage and check on mount

**Severity:** HIGH

---

### 5. Inconsistent Payment Amounts
**Location:** Multiple files  
**Issue:** Different amounts configured across system:
- Database migration: `20000`
- create-order function: `10000` (hardcoded)
- PaymentModal display: `20000`

**Impact:** Confusion, incorrect payment processing

**Fix:** Use single source of truth from config

**Severity:** CRITICAL

---

## ⚠️ MEDIUM ISSUES

### 6. No Retry Logic for Unique Constraint Violations
**Location:** `supabase/functions/create-order/index.ts:183`  
**Issue:** If access_code collision occurs, function fails

**Impact:** User cannot create order (extremely rare but possible)

**Fix:** Add retry loop with max attempts

```typescript
let accessCode = generateAccessCode();
let attempts = 0;
while (attempts < 5) {
  try {
    // Try to insert
    break;
  } catch (error) {
    if (error.code === '23505') { // Unique constraint
      accessCode = generateAccessCode();
      attempts++;
    } else {
      throw error;
    }
  }
}
```

**Severity:** LOW (probability ~1 in 2.8 trillion)

---

### 7. No Network Error Handling
**Location:** `src/hooks/usePayment.ts:88-95`  
**Issue:** No retry for network failures

```typescript
const response = await fetch(...);
// ❌ No retry on network error
```

**Impact:** User sees error on temporary network issues

**Fix:** Implement exponential backoff retry

**Severity:** MEDIUM

---

### 8. Rate Limiting Not Persistent
**Location:** `supabase/functions/validate-code/index.ts:17-36`  
**Issue:** Rate limit in-memory only, lost on function restart

```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
// ❌ Cleared on function restart
```

**Impact:** Rate limiting ineffective after restart

**Fix:** Use Redis or database for rate limiting

**Severity:** LOW (if using Supabase Edge Functions standard)

---

### 9. Payment Warning Trigger Logic
**Location:** `src/app/quick/QuickModePage.tsx:121-122`  
**Issue:** Payment required after 5 questions, but disabled check uses `>= 5`

```typescript
disabledTruth={!hasAvailableTruth || (isPaymentRequired && !isGameUnlocked && questionsPlayed >= 5)}
// Should be: questionsPlayhoned >= 5
// Correct for >= but creates confusion
```

**Impact:** Works correctly but counter-intuitive

**Fix:** Use strict `>` for 6th question, or clarify comments

**Severity:** LOW

---

### 10. No Webhook Signature Verification
**Location:** `supabase/functions/payment-webhook/index.ts`  
**Issue:** Only checks API key, no signature verification

**Impact:** Potential replay attacks (low risk due to API key)

**Fix:** Implement HMAC signature verification if SePay supports it

**Severity:** MEDIUM

---

## 💡 SUGGESTIONS & IMPROVEMENTS

### 11. Add Analytics Tracking
Track payment events:
- Payment modal opened
- Code entered successfully
- Payment completed
- Payment failed/expired

**Impact:** Better understanding of conversion funnel

**Priority:** NICE TO HAVE

---

### 12. Add Payment History View
**Location:** Create new component `PaymentHistory.tsx`  
**Issue:** Users cannot view their payment codes

**Impact:** Poor UX if user loses code

**Fix:** Create UI to view saved codes from localStorage

**Priority:** MEDIUM

---

### 13. Improve Error Messages
**Location:** All modals  
**Issue:** Generic error messages

**Impact:** Users don't know what went wrong

**Fix:** Add specific error messages:
```typescript
switch (error.reason) {
  case 'expired': return 'Mã code đã hết hạn (24 giờ)';
  case 'not_paid': return 'Mã code chưa được thanh toán';
  case 'not_found': return 'Mã code không tồn tại';
}
```

**Priority:** HIGH

---

### 14. Add Loading States
**Location:** PaymentModal  
**Issue:** No visual feedback during polling

**Impact:** Users don't know if system is checking payment

**Fix:** Add spinner/pulse indicator

**Priority:** MEDIUM

---

### 15. Validate Input Sanitization
**Location:** All edge functions  
**Issue:** SQL injection risks (though Supabase client should handle)

**Fix:** Add explicit validation and sanitization

**Priority:** HIGH for security

---

## 🔍 EDGE CASES

### Edge Case 1: Multiple Tabs
**Scenario:** User opens payment modal in multiple tabs simultaneously

**Current Behavior:** Each tab creates separate order

**Impact:** Duplicate charges, confusion

**Fix:** Add tab coordination via BroadcastChannel API

**Priority:** LOW

---

### Edge Case 2: Browser Close During Payment
**Scenario:** User closes browser after getting QR code

**Current Behavior:** Order remains pending, can use code later ✅

**Impact:** Good UX

**Fix:** None needed

**Priority:** N/A

---

### Edge Case 3: QR Code Generation Failure
**Scenario:** SePay API is down

**Current Behavior:** Image shows broken icon, no instructions

**Impact:** User cannot pay

**Fix:** Show manual payment instructions with account number

**Priority:** HIGH

---

### Edge Case 4: Code Expires During Checkout
**Scenario:** User gets code, waits 25 hours, tries to use

**Current Behavior:** Returns "expired" error ✅

**Impact:** Good error handling

**Fix:** Clearer error message with remaining time

**Priority:** LOW

---

### Edge Case 5: Webhook Arrives Before Order Created
**Scenario:** Race condition (unlikely but possible)

**Current Behavior:** Webhook returns 404

**Impact:** Payment not recorded

**Fix:** Add retry mechanism in SePay

**Priority:** LOW (handled by SePay)

---

## 🧪 TESTING RECOMMENDATIONS

### Unit Tests
1. `generateAccessCode()` - verify uniqueness
2. `parseAccessCode()` - test regex patterns
3. `validatePaymentConfig()` - test all env vars
4. `calculateExpiryTime()` - verify timezone handling

### Integration Tests
1. Create order → check status → webhook → status updated
2. Validate code flow
3. Expiry handling
4. Duplicate order prevention

### E2E Tests
1. Full payment flow in Quick Mode
2. Full payment flow in Group Mode  
3. Code entry after payment
4. Browser reload during payment

---

## 🔧 IMMEDIATE ACTION ITEMS

### Must Fix Before Production:
1. ✅ Fix amount type mismatch (Issue #1, #5)
2. ✅ Persist isGameUnlocked state (Issue #4)
3. ✅ Implement QR fallback (Issue #2)
4. ✅ Add network error handling (Issue #7)

### Should Fix Soon:
5. ⚠️ Add better error messages (Suggestion #13)
6. ⚠️ Fix memory leak in polling (Issue #3)
7. ⚠️ Add retry logic for collisions (Issue #6)

### Nice to Have:
8. 💡 Add analytics (Suggestion #11)
9. 💡 Add payment history (Suggestion #12)
10. 💡 Improve loading states (Suggestion #14)

---

## 📊 CODE QUALITY METRICS

- **Type Safety:** 9/10 (minor any types in webhook)
- **Error Handling:** 6/10 (missing in several places)
- **User Experience:** 7/10 (good flow but missing details)
- **Security:** 8/10 (API key auth, missing signature)
- **Maintainability:** 8/10 (well-structured, some duplication)

**Overall Score:** 7.6/10

---

## 📝 CONCLUSION

The payment system is well-architected but has several critical issues that must be fixed before production:
1. Amount inconsistencies across the system
2. State not persisting across reloads
3. Missing error handling

With these fixes, the system will be production-ready. The architecture is solid, with good separation of concerns and appropriate use of Supabase features.

**Estimated Fix Time:** 4-6 hours

**Risk Level:** MEDIUM (current system works but fragile)

---

**Reviewed By:** AI Code Assistant  
**Date:** 2025-01-XX

