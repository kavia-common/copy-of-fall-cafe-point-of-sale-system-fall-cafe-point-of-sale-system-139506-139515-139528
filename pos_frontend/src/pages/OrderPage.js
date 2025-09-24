import React, { useEffect, useMemo, useState } from 'react';
import { fetchMenu, submitOrder } from '../services/api';
import CategoryFilter from '../components/Order/CategoryFilter';
import MenuGrid from '../components/Order/MenuGrid';
import CartPanel from '../components/Order/CartPanel';

// PUBLIC_INTERFACE
export default function OrderPage() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [lines, setLines] = useState([]);

  useEffect(() => {
    fetchMenu().then(setItems);
  }, []);

  const categories = useMemo(() => Array.from(new Set(items.map(i => i.category))), [items]);

  const visible = useMemo(
    () => items.filter(i => category === 'All' || i.category === category),
    [items, category]
  );

  const addItem = (item) => {
    setLines((prev) => {
      const existing = prev.find(l => l.id === item.id);
      if (existing) {
        return prev.map(l => l.id === item.id ? { ...l, qty: l.qty + 1 } : l);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const inc = (id) => setLines((prev) => prev.map(l => l.id === id ? { ...l, qty: l.qty + 1 } : l));
  const dec = (id) => setLines((prev) => prev.map(l => l.id === id ? { ...l, qty: Math.max(1, l.qty - 1) } : l));
  const removeLine = (id) => setLines((prev) => prev.filter(l => l.id !== id));

  const checkout = async (payment) => {
    const res = await submitOrder(lines, payment);
    alert(`Order ${res.id} paid by ${payment}. Total $${res.total.toFixed(2)}`);
    setLines([]);
  };

  return (
    <div className="row" style={{ alignItems: 'flex-start' }}>
      <div className="col" style={{ flex: '1 1 65%' }}>
        <div className="card">
          <div className="card-title">Menu</div>
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />
          <MenuGrid items={visible} onAdd={addItem} />
        </div>
      </div>
      <div className="col" style={{ flex: '1 1 35%' }}>
        <CartPanel lines={lines} onInc={inc} onDec={dec} onRemove={removeLine} onCheckout={checkout} />
      </div>
    </div>
  );
}
