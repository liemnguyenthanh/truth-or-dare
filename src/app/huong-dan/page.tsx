import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Hướng Dẫn Chơi Thật Hay Thách - Luật Chơi Chi Tiết',
  description:
    'Hướng dẫn chi tiết cách chơi trò chơi Thật Hay Thách. Luật chơi, mẹo hay và cách tạo không khí vui vẻ cho nhóm bạn.',
  keywords: [
    'hướng dẫn thật hay thách',
    'luật chơi thật hay thách',
    'cách chơi truth or dare',
    'hướng dẫn truth or dare',
    'luật chơi truth or dare',
  ],
  openGraph: {
    title: 'Hướng Dẫn Chơi Thật Hay Thách - Luật Chơi Chi Tiết',
    description:
      'Hướng dẫn chi tiết cách chơi trò chơi Thật Hay Thách. Luật chơi, mẹo hay và cách tạo không khí vui vẻ cho nhóm bạn.',
  },
};

export default function HuongDanPage() {
  return (
    <main className='container mx-auto px-4 py-8 max-w-4xl'>
      <article className='prose prose-lg mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
          Hướng Dẫn Chơi Thật Hay Thách
        </h1>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
            Thật Hay Thách là gì?
          </h2>
          <p className='text-gray-700 dark:text-gray-300 mb-4'>
            <strong>Thật Hay Thách</strong> (Truth or Dare) là một trò chơi nhóm
            phổ biến trên toàn thế giới, đặc biệt được yêu thích trong các buổi
            tiệc tùng, sinh nhật hay gặp mặt bạn bè. Trò chơi giúp mọi người
            hiểu nhau hơn và tạo ra những khoảnh khắc vui vẻ, đáng nhớ.
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
            Luật Chơi Cơ Bản
          </h2>
          <ol className='list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300'>
            <li>
              <strong>Số người chơi:</strong> Từ 2 người trở lên (lý tưởng là
              4-8 người)
            </li>
            <li>
              <strong>Cách chơi:</strong> Người chơi ngồi thành vòng tròn
            </li>
            <li>
              <strong>Lượt chơi:</strong> Mỗi người sẽ được hỏi "Thật hay
              Thách?"
            </li>
            <li>
              <strong>Chọn "Thật":</strong> Trả lời thành thật một câu hỏi
            </li>
            <li>
              <strong>Chọn "Thách":</strong> Thực hiện một thử thách được đưa ra
            </li>
            <li>
              <strong>Từ chối:</strong> Nếu từ chối, có thể bị phạt nhẹ (như hát
              một bài hát)
            </li>
          </ol>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
            Mẹo Chơi Hay
          </h2>
          <ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
            <li>Tạo không khí thoải mái, không áp lực</li>
            <li>Đặt ra những câu hỏi và thử thách phù hợp với nhóm</li>
            <li>Tôn trọng giới hạn của mỗi người</li>
            <li>Giữ bí mật những thông tin cá nhân được chia sẻ</li>
            <li>Tập trung vào việc vui vẻ, không làm ai khó chịu</li>
          </ul>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
            Lợi Ích Của Trò Chơi
          </h2>
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                Xã Hội
              </h3>
              <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300'>
                <li>Tăng cường gắn kết nhóm</li>
                <li>Phá vỡ rào cản giao tiếp</li>
                <li>Tạo kỷ niệm đẹp</li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                Cá Nhân
              </h3>
              <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300'>
                <li>Tăng sự tự tin</li>
                <li>Học cách chia sẻ</li>
                <li>Phát triển khả năng giao tiếp</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center'>
          <h2 className='text-2xl font-semibold mb-4 text-blue-900 dark:text-blue-100'>
            Sẵn Sàng Chơi?
          </h2>
          <p className='text-blue-800 dark:text-blue-200 mb-4'>
            Bắt đầu trò chơi Thật Hay Thách ngay bây giờ với hơn 500+ câu hỏi và
            thử thách thú vị!
          </p>
          <a
            href='/'
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors'
          >
            Chơi Ngay
          </a>
        </div>
      </article>
    </main>
  );
}
