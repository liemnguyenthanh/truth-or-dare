'use client';

// Layout riêng cho login page - không cần authentication check
// Override admin layout để không bị authentication check
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout trống - chỉ render children
  // Không wrap bởi admin layout để tránh authentication check
  // Ẩn Navigation và Footer bằng CSS
  return (
    <div className='admin-login-layout'>
      <style jsx global>{`
        .admin-login-layout ~ nav,
        .admin-login-layout ~ footer,
        nav + main .admin-login-layout ~ footer {
          display: none !important;
        }
        main {
          padding-top: 0 !important;
        }
      `}</style>
      {children}
    </div>
  );
}
