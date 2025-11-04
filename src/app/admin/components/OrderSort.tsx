'use client';

import { OrderSort } from '../hooks/useAdminOrders';

interface OrderSortProps {
  sort: OrderSort;
  onSortChange: (sort: OrderSort) => void;
}

export function OrderSort({ sort, onSortChange }: OrderSortProps) {
  const handleFieldChange = (field: OrderSort['field']) => {
    onSortChange({ ...sort, field });
  };

  const handleDirectionChange = (direction: OrderSort['direction']) => {
    onSortChange({ ...sort, direction });
  };

  const toggleDirection = () => {
    onSortChange({
      ...sort,
      direction: sort.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className='flex items-center space-x-2'>
      <span className='text-sm text-gray-600 dark:text-gray-400'>Sắp xếp:</span>
      <select
        value={sort.field}
        onChange={(e) =>
          handleFieldChange(e.target.value as OrderSort['field'])
        }
        className='px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
      >
        <option value='created_at'>Ngày tạo</option>
        <option value='amount'>Số tiền</option>
        <option value='status'>Trạng thái</option>
      </select>
      <button
        onClick={toggleDirection}
        className='px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        title={sort.direction === 'asc' ? 'Tăng dần' : 'Giảm dần'}
      >
        {sort.direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
