import React, { createContext, useContext, useMemo, useState } from 'react';

// Mock initial menu items (fall-themed)
const INITIAL_MENU = [
  { id: 'm1', name: 'Pumpkin Spice Latte', price: 5.25, category: 'Beverage', sku: 'PSL-12', stock: 48 },
  { id: 'm2', name: 'Caramel Apple Cider', price: 4.50, category: 'Beverage', sku: 'CAC-08', stock: 36 },
  { id: 'm3', name: 'Maple Pecan Scone', price: 3.95, category: 'Bakery', sku: 'MPS-04', stock: 22 },
  { id: 'm4', name: 'Butternut Squash Soup', price: 6.75, category: 'Kitchen', sku: 'BSS-02', stock: 10 },
  { id: 'm5', name: 'Cranberry Turkey Sandwich', price: 8.50, category: 'Kitchen', sku: 'CTS-02', stock: 12 },
];

const AppDataContext = createContext(null);

// PUBLIC_INTERFACE
export function AppDataProvider({ children }) {
  /** Holds application-level data; replace with backend calls later. */
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [orders, setOrders] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');

  const addMenuItem = (item) => setMenu((prev) => [...prev, { ...item, id: `m${prev.length + 1}` }]);
  const updateMenuItem = (id, updates) => setMenu((prev) => prev.map(m => (m.id === id ? { ...m, ...updates } : m)));
  const deleteMenuItem = (id) => setMenu((prev) => prev.filter(m => m.id !== id));

  const startOrder = () => {
    const id = `o${orders.length + 1}`;
    const order = { id, items: [], status: 'open', createdAt: new Date().toISOString() };
    setOrders((prev) => [order, ...prev]);
    return id;
  };
  const addItemToOrder = (orderId, menuItem) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id !== orderId
          ? o
          : { ...o, items: [...o.items, { id: `${orderId}-${o.items.length + 1}`, menuId: menuItem.id, name: menuItem.name, qty: 1, price: menuItem.price }] }
      )
    );
  };
  const updateOrderItemQty = (orderId, itemId, qty) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id !== orderId
          ? o
          : { ...o, items: o.items.map(it => (it.id === itemId ? { ...it, qty: Math.max(1, qty) } : it)) }
      )
    );
  };
  const removeOrderItem = (orderId, itemId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id !== orderId ? o : { ...o, items: o.items.filter(it => it.id !== itemId) }
      )
    );
  };
  const closeOrder = (orderId) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: 'closed', closedAt: new Date().toISOString() } : o)));
  };

  const totals = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const closed = orders.filter(o => o.status === 'closed');
    const todayClosed = closed.filter(o => (o.closedAt || '').slice(0, 10) === today);
    const sales = closed.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty * i.price, 0), 0);
    const todaySales = todayClosed.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty * i.price, 0), 0);
    return { sales, todaySales, orders: orders.length, openOrders: orders.filter(o => o.status === 'open').length };
  }, [orders]);

  const value = {
    menu, addMenuItem, updateMenuItem, deleteMenuItem,
    orders, startOrder, addItemToOrder, updateOrderItemQty, removeOrderItem, closeOrder,
    totals,
    globalSearch, setGlobalSearch
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAppData() {
  /** Hook to access and mutate app data. */
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
