// Admin configuration
// Set NEXT_PUBLIC_ADMIN_PASSWORD environment variable or change default below
// For production, use environment variable for security
// Note: With static export, only NEXT_PUBLIC_* env vars are available in client-side
export const ADMIN_CONFIG = {
  // Admin password - Change this or set NEXT_PUBLIC_ADMIN_PASSWORD env var
  // In production, use environment variable: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  // Default password: 'admin123' - CHANGE THIS IN PRODUCTION!
  PASSWORD:
    (typeof process !== 'undefined' &&
      process.env?.NEXT_PUBLIC_ADMIN_PASSWORD) ||
    'admin123', // Default password - CHANGE THIS!

  // Session token expiry (24 hours)
  SESSION_EXPIRY_MS: 24 * 60 * 60 * 1000,

  // Storage key for admin session
  SESSION_STORAGE_KEY: 'admin_session_token',
} as const;

// Hash password using simple hash (for basic protection)
// In production, consider using bcrypt or similar
export function hashPassword(password: string): string {
  // Simple hash function - in production, use proper hashing
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

// Verify password
export function verifyPassword(password: string): boolean {
  const expectedHash = hashPassword(ADMIN_CONFIG.PASSWORD);
  const providedHash = hashPassword(password);
  return expectedHash === providedHash;
}
