import { useCallback, useEffect, useMemo, useState } from 'react';

import { adminUpdateOrderRequest } from '@/lib/paymentApi';
import { supabase } from '@/lib/supabase';

import { Order, OrderStatus } from '@/types/payment';

export type OrderFilter = {
  status?: OrderStatus | 'all';
  gameMode?: Order['game_mode'] | 'all';
  search?: string;
};

export type OrderSort = {
  field: 'created_at' | 'amount' | 'status';
  direction: 'asc' | 'desc';
};

interface UseAdminOrdersReturn {
  orders: Order[];
  filteredOrders: Order[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  filter: OrderFilter;
  setFilter: (filter: OrderFilter) => void;
  sort: OrderSort;
  setSort: (sort: OrderSort) => void;
  stats: {
    total: number;
    pending: number;
    paid: number;
    expired: number;
  };
}

export function useAdminOrders(): UseAdminOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderFilter>({
    status: 'all',
    gameMode: 'all',
    search: '',
  });
  const [sort, setSort] = useState<OrderSort>({
    field: 'created_at',
    direction: 'desc',
  });

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setOrders((data as Order[]) || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch orders';
      setError(errorMessage);
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      try {
        const result = await adminUpdateOrderRequest({ orderId, status });

        // Update local state
        if (result.order) {
          setOrders((prev) =>
            prev.map((order) =>
              order.id === orderId ? (result.order as Order) : order
            )
          );
        } else {
          // Fallback: refresh orders
          await fetchOrders();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update order';
        setError(errorMessage);
        console.error('Error updating order:', err);
        throw err;
      }
    },
    [fetchOrders]
  );

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Apply filters
    if (filter.status && filter.status !== 'all') {
      filtered = filtered.filter((order) => order.status === filter.status);
    }

    if (filter.gameMode && filter.gameMode !== 'all') {
      filtered = filtered.filter(
        (order) => order.game_mode === filter.gameMode
      );
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.access_code.toLowerCase().includes(searchLower) ||
          order.id.toLowerCase().includes(searchLower)
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sort.field) {
        case 'created_at':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }

      if (sort.direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [orders, filter, sort]);

  // Setup Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('orders_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'orders',
        },
        async (payload) => {
          console.log('Order change detected:', payload);

          if (payload.eventType === 'INSERT') {
            // Add new order to state - fetch full order data to ensure consistency
            const { data: newOrder } = await supabase
              .from('orders')
              .select('*')
              .eq('id', payload.new.id)
              .single();
            if (newOrder) {
              setOrders((prev) => [newOrder as Order, ...prev]);
            }
          } else if (payload.eventType === 'UPDATE') {
            // For UPDATE, fetch the full updated order to ensure all fields are correct
            const { data: updatedOrder } = await supabase
              .from('orders')
              .select('*')
              .eq('id', payload.new.id)
              .single();
            if (updatedOrder) {
              setOrders((prev) =>
                prev.map((order) =>
                  order.id === updatedOrder.id ? (updatedOrder as Order) : order
                )
              );
            } else {
              // Fallback: use payload.new if fetch fails
              setOrders((prev) =>
                prev.map((order) =>
                  order.id === payload.new.id ? (payload.new as Order) : order
                )
              );
            }
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted order from state
            setOrders((prev) =>
              prev.filter((order) => order.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    paid: orders.filter((o) => o.status === 'paid').length,
    expired: orders.filter((o) => o.status === 'expired').length,
  };

  return {
    orders,
    filteredOrders,
    isLoading,
    error,
    refresh: fetchOrders,
    updateOrderStatus,
    filter,
    setFilter,
    sort,
    setSort,
    stats,
  };
}
