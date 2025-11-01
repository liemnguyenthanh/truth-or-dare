import { useCallback, useEffect, useMemo, useState } from 'react';

type OrderId = string;

export interface StoredOrder {
  code: string;
  expiresAt: string; // ISO string
  createdAt: string; // ISO string
}

type OrdersMap = Record<OrderId, StoredOrder>;

const STORAGE_KEY = 'local_orders';

function safeParse(value: string | null): OrdersMap {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value) as unknown;
    if (parsed && typeof parsed === 'object') {
      return parsed as OrdersMap;
    }
    return {};
  } catch {
    return {};
  }
}

function readFromStorage(): OrdersMap {
  if (typeof window === 'undefined') return {};
  return safeParse(localStorage.getItem(STORAGE_KEY));
}

function writeToStorage(data: OrdersMap) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useOrderStorage() {
  const [orders, setOrders] = useState<OrdersMap>(() => readFromStorage());

  // Keep state in sync when other tabs/windows modify localStorage
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setOrders(readFromStorage());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Persist whenever orders change (in this tab)
  useEffect(() => {
    writeToStorage(orders);
  }, [orders]);

  const list = useMemo(() => {
    return Object.entries(orders).map(([orderId, record]) => ({
      orderId,
      ...record,
    }));
  }, [orders]);

  const get = useCallback((orderId: OrderId): StoredOrder | undefined => {
    return orders[orderId];
  }, [orders]);

  const upsert = useCallback((orderId: OrderId, record: StoredOrder) => {
    setOrders((prev) => {
      const existing = prev[orderId];
      const createdAt = record.createdAt || existing?.createdAt || new Date().toISOString();
      return {
        ...prev,
        [orderId]: {
          code: record.code,
          expiresAt: record.expiresAt,
          createdAt,
        },
      };
    });
  }, []);

  const remove = useCallback((orderId: OrderId) => {
    setOrders((prev) => {
      const next = { ...prev };
      delete next[orderId];
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setOrders({});
  }, []);

  return {
    // State
    orders,
    list,

    // Actions
    get,
    upsert,
    remove,
    clear,
  };
}


