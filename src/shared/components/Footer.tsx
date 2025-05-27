import Link from 'next/link';
import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white mt-16'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='md:col-span-1'>
            <div className='flex items-center space-x-2 mb-4'>
              <span className='text-2xl'>🎯</span>
              <span className='text-xl font-bold'>Thật Hay Thách</span>
            </div>
            <p className='text-gray-400 text-sm'>
              Trò chơi Thật Hay Thách online miễn phí hàng đầu Việt Nam. Tạo kỷ
              niệm đẹp cùng bạn bè với hơn 500+ câu hỏi thú vị.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold mb-4'>Liên Kết Nhanh</h3>
            <ul className='space-y-2 text-sm'>
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

          {/* Categories */}
          <div>
            <h3 className='font-semibold mb-4'>Danh Mục</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/blog/that-hay-thach-cho-tre-em'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Thật Hay Thách Trẻ Em
                </Link>
              </li>
              <li>
                <Link
                  href='/blog/cach-to-chuc-tiec-sinh-nhat-voi-that-hay-thach'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Tổ Chức Tiệc Sinh Nhật
                </Link>
              </li>
              <li>
                <Link
                  href='/blog/5-tro-choi-nhom-vui-nhon-khac'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Trò Chơi Nhóm Khác
                </Link>
              </li>
              <li>
                <Link
                  href='/blog/10-cau-hoi-that-hay-thach-hai-huoc-nhat'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Câu Hỏi Hài Hước
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className='font-semibold mb-4'>Kết Nối</h3>
            <div className='space-y-2 text-sm'>
              <p className='text-gray-400'>
                Email: contact@truthordaregame.xyz
              </p>
              <div className='flex space-x-4 mt-4'>
                <a
                  href='https://www.facebook.com/truthordarevn'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-blue-400 transition-colors'
                  aria-label='Facebook'
                >
                  📘 Facebook
                </a>
                <a
                  href='https://www.instagram.com/truthordarevn'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-pink-400 transition-colors'
                  aria-label='Instagram'
                >
                  📷 Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © {currentYear} Thật Hay Thách Online. Tất cả quyền được bảo lưu.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='/privacy'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Chính Sách Bảo Mật
              </Link>
              <Link
                href='/terms'
                className='text-gray-400 hover:text-white text-sm transition-colors'
              >
                Điều Khoản Sử Dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
