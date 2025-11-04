'use client';

import { OrderList } from './components';
import { useAdminOrders } from './hooks';

export default function AdminPage() {
  const { stats, refresh } = useAdminOrders();

  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard label='Tổng số' value={stats.total} color='blue' />
        <StatCard label='Chờ thanh toán' value={stats.pending} color='yellow' />
        <StatCard label='Đã thanh toán' value={stats.paid} color='green' />
        <StatCard label='Hết hạn' value={stats.expired} color='red' />
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
          Danh sách Orders
        </h2>
        <button
          onClick={refresh}
          className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
        >
          Làm mới
        </button>
      </div>

      {/* Order List */}
      <OrderList />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: 'blue' | 'yellow' | 'green' | 'red';
}

function StatCard({ label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-400',
    yellow:
      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-400',
    green:
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-400',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-400',
  };

  return (
    <div className={`rounded-lg border p-4 ${colorClasses[color]}`}>
      <div className='text-sm font-medium mb-1'>{label}</div>
      <div className='text-2xl font-bold'>{value}</div>
    </div>
  );
}
