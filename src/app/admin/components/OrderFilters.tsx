'use client';

import { OrderFilter } from '../hooks/useAdminOrders';

import { Order, OrderStatus } from '@/types/payment';

interface OrderFiltersProps {
  filter: OrderFilter;
  onFilterChange: (filter: OrderFilter) => void;
}

export function OrderFilters({ filter, onFilterChange }: OrderFiltersProps) {
  const handleStatusChange = (status: OrderStatus | 'all') => {
    onFilterChange({ ...filter, status });
  };

  const handleGameModeChange = (gameMode: Order['game_mode'] | 'all') => {
    onFilterChange({ ...filter, gameMode });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange({ ...filter, search });
  };

  const clearFilters = () => {
    onFilterChange({
      status: 'all',
      gameMode: 'all',
      search: '',
    });
  };

  const hasActiveFilters =
    filter.status !== 'all' ||
    filter.gameMode !== 'all' ||
    filter.search !== '';

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
          Bộ lọc
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className='text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors'
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {/* Search */}
        <div>
          <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Tìm kiếm
          </label>
          <input
            type='text'
            value={filter.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder='Mã code hoặc ID...'
            className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Trạng thái
          </label>
          <select
            value={filter.status || 'all'}
            onChange={(e) =>
              handleStatusChange(e.target.value as OrderStatus | 'all')
            }
            className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
          >
            <option value='all'>Tất cả</option>
            <option value='pending'>Chờ thanh toán</option>
            <option value='paid'>Đã thanh toán</option>
            <option value='expired'>Hết hạn</option>
          </select>
        </div>

        {/* Game Mode Filter */}
        <div>
          <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Game Mode
          </label>
          <select
            value={filter.gameMode || 'all'}
            onChange={(e) =>
              handleGameModeChange(e.target.value as Order['game_mode'] | 'all')
            }
            className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
          >
            <option value='all'>Tất cả</option>
            <option value='couples'>Couples</option>
            <option value='drink'>Drink</option>
            <option value='quick'>Quick</option>
            <option value='group'>Group</option>
            <option value='spin_wheel'>Spin Wheel</option>
          </select>
        </div>
      </div>
    </div>
  );
}
