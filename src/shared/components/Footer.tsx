import Link from 'next/link';
import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white mt-16'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-3 gap-8'>
          {/* Brand */}
          <div className='flex flex-col items-center'>
            <div className='flex items-center space-x-2 mb-4'>
              <span className='text-2xl'>🎯</span>
              <span className='text-xl font-bold'>Thật Hay Thách</span>
            </div>
            <p className='text-gray-400 text-sm text-center'>
              Trò chơi Thật Hay Thách online miễn phí hàng đầu Việt Nam. Tạo kỷ
              niệm đẹp cùng bạn bè với hơn 500+ câu hỏi thú vị.
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col items-center'>
            <h3 className='font-semibold mb-4'>Liên Kết Nhanh</h3>
            <ul className='space-y-3 text-sm text-center'>
              <li>
                <Link
                  href='/'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Chơi Game
                </Link>
              </li>
              <li>
                <Link
                  href='/questions'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Danh Sách Câu Hỏi
                </Link>
              </li>
              <li>
                <Link
                  href='/huong-dan'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Hướng Dẫn Chơi
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Blog & Mẹo Hay
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className='flex flex-col items-center'>
            <h3 className='font-semibold mb-4'>Kết Nối</h3>
            <div className='space-y-3 text-sm text-center'>
              <p className='text-gray-400'>Email: liemdonduong@gmail.com</p>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © {currentYear} Thật Hay Thách Online. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
