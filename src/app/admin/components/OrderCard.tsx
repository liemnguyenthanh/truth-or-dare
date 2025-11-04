'use client';

import { useState } from 'react';

import { Order, OrderStatus } from '@/types/payment';

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: OrderStatus) => Promise<void>;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
          {title}
        </h3>
        <p className='text-sm text-gray-600 dark:text-gray-400 mb-6'>
          {message}
        </p>
        <div className='flex justify-end space-x-3'>
          <button
            onClick={onCancel}
            className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);

  const handleStatusUpdate = async (status: OrderStatus) => {
    setIsUpdating(true);
    setError(null);
    try {
      await onStatusUpdate(order.id, status);
      setShowConfirm(false);
      setPendingStatus(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusClick = (status: OrderStatus) => {
    // Show confirm dialog for "paid" status
    if (status === 'paid') {
      setPendingStatus(status);
      setShowConfirm(true);
    } else {
      handleStatusUpdate(status);
    }
  };

  const handleConfirm = () => {
    if (pendingStatus) {
      handleStatusUpdate(pendingStatus);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ thanh toán';
      case 'expired':
        return 'Hết hạn';
      default:
        return status;
    }
  };

  const getGameModeLabel = (gameMode: Order['game_mode']) => {
    const labels: Record<Order['game_mode'], string> = {
      couples: 'Couples',
      drink: 'Drink',
      quick: 'Quick',
      group: 'Group',
      spin_wheel: 'Spin Wheel',
    };
    return labels[gameMode] || gameMode;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const createdAt = new Date(order.created_at);
  const expiresAt = new Date(order.code_expires_at);
  const isExpired = expiresAt < new Date();
  const timeAgo = formatDate(order.created_at);

  // Debug: Log order status to verify consistency
  // console.log('OrderCard render:', order.access_code, 'status:', order.status);

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all'>
      <div className='flex items-start justify-between gap-4'>
        {/* Left: Main Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-2'>
            <h3 className='text-base font-semibold text-gray-900 dark:text-white truncate'>
              {order.access_code}
            </h3>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>

          <div className='grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400'>
            <div>
              <span className='text-gray-500 dark:text-gray-500'>Game:</span>{' '}
              <span className='font-medium'>
                {getGameModeLabel(order.game_mode)}
              </span>
            </div>
            <div>
              <span className='text-gray-500 dark:text-gray-500'>Số tiền:</span>{' '}
              <span className='font-medium'>
                {order.amount.toLocaleString('vi-VN')} ₫
              </span>
            </div>
            <div>
              <span className='text-gray-500 dark:text-gray-500'>Tạo:</span>{' '}
              <span className='font-medium'>{timeAgo}</span>
            </div>
            {order.paid_at && (
              <div>
                <span className='text-gray-500 dark:text-gray-500'>
                  Thanh toán:
                </span>{' '}
                <span className='font-medium'>{formatDate(order.paid_at)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className='flex flex-col gap-2 flex-shrink-0'>
          {order.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusClick('paid')}
                disabled={isUpdating}
                className='px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded transition-colors whitespace-nowrap'
                title='Đánh dấu đã thanh toán'
              >
                {isUpdating ? '...' : '✓ Đã thanh toán'}
              </button>
              <button
                onClick={() => handleStatusUpdate('expired')}
                disabled={isUpdating}
                className='px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:text-gray-400 disabled:cursor-not-allowed rounded transition-colors whitespace-nowrap'
                title='Đánh dấu hết hạn'
              >
                {isUpdating ? '...' : '✕ Hết hạn'}
              </button>
            </>
          )}
          {order.status === 'paid' && (
            <button
              onClick={() => handleStatusUpdate('pending')}
              disabled={isUpdating}
              className='px-3 py-1.5 text-xs font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 disabled:text-gray-400 disabled:cursor-not-allowed rounded transition-colors whitespace-nowrap'
              title='Đánh dấu chờ thanh toán'
            >
              {isUpdating ? '...' : '↩ Chờ thanh toán'}
            </button>
          )}
          {order.status === 'expired' && (
            <button
              onClick={() => handleStatusUpdate('pending')}
              disabled={isUpdating}
              className='px-3 py-1.5 text-xs font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 disabled:text-gray-400 disabled:cursor-not-allowed rounded transition-colors whitespace-nowrap'
              title='Khôi phục'
            >
              {isUpdating ? '...' : '↩ Khôi phục'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className='mt-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2'>
          <p className='text-xs text-red-600 dark:text-red-400'>{error}</p>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        title='Xác nhận đánh dấu đã thanh toán'
        message={`Bạn có chắc chắn muốn đánh dấu order "${order.access_code}" là đã thanh toán không?`}
        confirmText='Xác nhận'
        cancelText='Hủy'
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowConfirm(false);
          setPendingStatus(null);
        }}
      />
    </div>
  );
}
