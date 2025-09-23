import React, { useEffect, useMemo, useState } from 'react';
import { useAppData } from '../state/AppDataContext';

function currency(x) { return `$${x.toFixed(2)}`; }

// PUBLIC_INTERFACE
export default function OrdersPage() {
  /** Main order processing panel with menu grid and current order list. */
  const { menu, orders, startOrder, addItemToOrder, updateOrderItemQty, removeOrderItem, closeOrder, globalSearch } = useAppData();
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    if (!activeOrderId) {
      const id = startOrder();
      setActiveOrderId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeOrder = useMemo(() => orders.find(o => o.id === activeOrderId) || null, [orders, activeOrderId]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(menu.map(m => m.category)))], [menu]);

  const filteredMenu = useMemo(() => {
    const search = (globalSearch || '').toLowerCase();
    return menu.filter(m => {
      const catPass = category === 'All' || m.category === category;
      const sPass = !search || m.name.toLowerCase().includes(search) || m.sku.toLowerCase().includes(search);
      return catPass && sPass;
    });
  }, [menu, category, globalSearch]);

  const add = (m) => activeOrderId && addItemToOrder(activeOrderId, m);
  const subtotal = (activeOrder?.items || []).reduce((s, it) => s + it.qty * it.price, 0);

  return (
    <>
      <section className="panel card">
        <div className="toolbar">
          <div className="filters">
            <span className="section-title">Menu</span>
            <select className="select" style={{ maxWidth: 180 }} value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="badge">Autumn Specials 🍂</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={() => setCategory('All')}>Reset</button>
          </div>
        </div>
        <div className="menu-grid">
          {filteredMenu.map((m) => (
            <div key={m.id} className="menu-card">
              <div className="image" />
              <div className="body">
                <div className="title">{m.name}</div>
                <div className="meta">
                  <span>{currency(m.price)}</span>
                  <span>{m.category}</span>
                </div>
                <button className="btn primary" onClick={() => add(m)}>Add to Order</button>
              </div>
            </div>
          ))}
          {filteredMenu.length === 0 && <div className="empty">No items found</div>}
        </div>
      </section>

      <section className="panel card">
        <div className="toolbar">
          <div className="section-title">Current Order</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={() => { const id = startOrder(); setActiveOrderId(id); }}>New</button>
            <button className="btn success" disabled={!activeOrder || activeOrder.items.length === 0}
              onClick={() => activeOrder && closeOrder(activeOrder.id)}>Close Order</button>
          </div>
        </div>

        {!activeOrder && <div className="empty">Starting order...</div>}
        {activeOrder && (
          <div className="order-panel">
            <div className="order-list">
              {activeOrder.items.map((it) => (
                <div className="order-item" key={it.id}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{it.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{currency(it.price)} each</div>
                  </div>
                  <div className="controls">
                    <button className="btn" onClick={() => updateOrderItemQty(activeOrder.id, it.id, it.qty - 1)}>-</button>
                    <div style={{ minWidth: 28, textAlign: 'center' }}>{it.qty}</div>
                    <button className="btn" onClick={() => updateOrderItemQty(activeOrder.id, it.id, it.qty + 1)}>+</button>
                  </div>
                  <div className="controls">
                    <div style={{ fontWeight: 700 }}>{currency(it.qty * it.price)}</div>
                    <button className="btn error" onClick={() => removeOrderItem(activeOrder.id, it.id)}>Remove</button>
                  </div>
                </div>
              ))}
              {activeOrder.items.length === 0 && <div className="empty">No items in order yet</div>}
            </div>
            <div className="order-summary">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <strong>{currency(subtotal)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tax (8.25%)</span>
                <strong>{currency(subtotal * 0.0825)}</strong>
              </div>
              <div className="divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18 }}>
                <span>Total</span>
                <strong>{currency(subtotal * 1.0825)}</strong>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="btn">Hold</button>
                <button className="btn primary">Charge</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
