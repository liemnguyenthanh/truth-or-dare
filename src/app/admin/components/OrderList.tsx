'use client';

import { OrderCard } from './OrderCard';
import { OrderFilters } from './OrderFilters';
import { OrderSort } from './OrderSort';
import { useAdminOrders } from '../hooks';

export function OrderList() {
  const {
    filteredOrders,
    isLoading,
    error,
    updateOrderStatus,
    refresh,
    filter,
    setFilter,
    sort,
    setSort,
  } = useAdminOrders();

  return (
    <div className='space-y-4'>
      {/* Filters */}
      <OrderFilters filter={filter} onFilterChange={setFilter} />

      {/* Sort and Results Count */}
      <div className='flex items-center justify-between'>
        <OrderSort sort={sort} onSortChange={setSort} />
        <div className='text-sm text-gray-600 dark:text-gray-400'>
          Hiển thị <span className='font-medium'>{filteredOrders.length}</span>{' '}
          orders
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4'></div>
            <p className='text-gray-600 dark:text-gray-400'>
              Đang tải orders...
            </p>
          </div>
        </div>
      ) : error ? (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-sm font-medium text-red-800 dark:text-red-400'>
                Lỗi khi tải orders
              </h3>
              <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                {error}
              </p>
            </div>
            <button
              onClick={refresh}
              className='px-4 py-2 text-sm font-medium text-red-800 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors'
            >
              Thử lại
            </button>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className='text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
          <p className='text-gray-600 dark:text-gray-400'>
            {filter.status !== 'all' ||
            filter.gameMode !== 'all' ||
            filter.search
              ? 'Không tìm thấy orders nào với bộ lọc hiện tại'
              : 'Chưa có orders nào'}
          </p>
        </div>
      ) : (
        <div className='space-y-2'>
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={updateOrderStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
