import React, { useMemo, useState } from 'react';
import { usePOS } from '../state/POSContext';
import Modal from '../ui/Modal';
import { quickPad } from '../stub/mockData';
import { submitOrder } from '../services/api';
import { useToast } from '../ui/Toast';

// PUBLIC_INTERFACE
export default function Orders() {
  /** Staff order entry workspace with menu grid, cart, quick pad, and queue. */
  const { state, actions } = usePOS();
  const { push } = useToast();
  const [customizing, setCustomizing] = useState(null);
  const [showReceipt, setShowReceipt] = useState(null);

  const seasonal = useMemo(() => state.menu.filter(m => m.category === 'Seasonal'), [state.menu]);
  const otherMenu = useMemo(() => state.menu.filter(m => m.category !== 'Seasonal'), [state.menu]);

  function openCustomize(item) {
    setCustomizing({ ...item, size: 'M', milk: 'Regular', extras: [] });
  }

  function addCustomized() {
    const item = customizing;
    const key = `${item.id}-${item.size}-${item.milk}-${item.extras.sort().join('.')}`;
    actions.addToCart({
      key,
      id: item.id,
      name: `${item.name} (${item.size})`,
      price: calcPrice(item),
      qty: 1,
      notes: item.extras.join(', ')
    });
    setCustomizing(null);
    push('Item added to cart');
  }

  function calcPrice(item) {
    const base = item.price;
    let addon = 0;
    if (item.size === 'L') addon += 0.75;
    if (item.size === 'S') addon += 0;
    if (item.milk === 'Oat') addon += 0.5;
    addon += (item.extras?.length || 0) * 0.5;
    return +(base + addon).toFixed(2);
  }

  async function checkout() {
    if (state.cart.length === 0) return;
    const order = {
      id: `ord_${Date.now()}`,
      items: state.cart,
      total: state.cart.reduce((s, c) => s + c.price * c.qty, 0),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    actions.placeOrder(order);
    actions.clearCart();
    actions.awardEcoPoints(2);
    const res = await submitOrder(order); // stub only
    if (res.error) push('Failed to submit order', 'error');
    else push('Order submitted');
    setShowReceipt(order);
  }

  function toggleFavorite(item) {
    actions.toggleFavorite(item);
  }

  const lowStockSet = new Set(state.inventory.filter(i => i.stock <= 10).map(i => i.name));

  return (
    <div>
      <div className="section-title">Orders</div>
      <div className="order-grid">
        <section aria-label="Menu items">
          <h3 style={{ marginTop: 0 }}>Seasonal Specials</h3>
          <div className="menu-grid">
            {seasonal.map(item => (
              <article key={item.id} className="card menu-card" aria-label={`${item.name} card`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <h4>{item.name}</h4>
                  <button
                    className="button"
                    aria-label="Favorite toggle"
                    onClick={() => toggleFavorite(item)}
                    title="Toggle favorite"
                  >
                    ⭐
                  </button>
                </div>
                <div className="subtle">{item.category}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {item.tags?.map(t => <div key={t} className="k-badge">{t}</div>)}
                  {lowStockSet.has('Pumpkin Puree') && item.name.includes('Pumpkin') && (
                    <div className="k-badge k-tag-low" aria-label="Low stock">Low stock</div>
                  )}
                </div>
                <div className="price">${item.price.toFixed(2)}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="button button-primary" onClick={() => openCustomize(item)}>Customize</button>
                  <button className="button" onClick={() => actions.addToCart({ key: `${item.id}-base`, id: item.id, name: item.name, price: item.price, qty: 1, notes: '' })}>
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>

          <h3 style={{ marginTop: 24 }}>All Items</h3>
          <div className="menu-grid">
            {otherMenu.map(item => (
              <article key={item.id} className="card menu-card">
                <h4>{item.name}</h4>
                <div className="subtle">{item.category}</div>
                <div className="price">${item.price.toFixed(2)}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="button" onClick={() => actions.addToCart({ key: `${item.id}-base`, id: item.id, name: item.name, price: item.price, qty: 1, notes: '' })}>
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="card cart" aria-label="Cart and payment">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Cart</h3>
            <div className="k-badge">
              <span role="img" aria-hidden>🌿</span> +2 Eco Points
            </div>
          </div>
          <div className="k-divider" />
          <div>
            {state.cart.length === 0 && <div className="subtle">No items in cart.</div>}
            {state.cart.map(ci => (
              <div className="cart-item" key={ci.key}>
                <div>
                  <div style={{ fontWeight: 700 }}>{ci.name}</div>
                  <div className="subtle">{ci.notes}</div>
                  <div className="subtle">${ci.price.toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button className="button" aria-label="Decrease quantity" onClick={() => actions.updateCartItem({ key: ci.key, updates: { qty: Math.max(1, ci.qty - 1) } })}>-</button>
                  <div aria-live="polite" aria-label="Quantity">{ci.qty}</div>
                  <button className="button" aria-label="Increase quantity" onClick={() => actions.updateCartItem({ key: ci.key, updates: { qty: ci.qty + 1 } })}>+</button>
                  <button className="button" aria-label="Remove item" onClick={() => actions.removeFromCart({ key: ci.key })}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="k-divider" />
          <div className="cart-total">
            <span>Total</span>
            <span>${state.cart.reduce((s, c) => s + c.price * c.qty, 0).toFixed(2)}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button className="button" onClick={() => actions.clearCart()} disabled={state.cart.length === 0}>Clear</button>
            <button className="button button-primary" onClick={checkout} disabled={state.cart.length === 0}>Checkout</button>
          </div>

          <div className="k-divider" />

          <div aria-label="Quick item pad">
            <div className="subtle" style={{ marginBottom: 6 }}>Quick Pad</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {quickPad.map(q => {
                const menuItem = state.menu.find(m => m.id === q.id);
                if (!menuItem) return null;
                return (
                  <button key={q.id} className="button" onClick={() => actions.addToCart({ key: `${menuItem.id}-base`, id: menuItem.id, name: menuItem.name, price: menuItem.price, qty: 1, notes: '' })}>
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <section style={{ marginTop: 24 }}>
        <h3>Order Queue</h3>
        <table className="table" aria-label="Order queue table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.ordersQueue.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.items.map(i => i.qty + 'x ' + i.name).join(', ')}</td>
                <td>${o.total.toFixed(2)}</td>
                <td>
                  <span className="k-badge">{o.status}</span>
                </td>
                <td style={{ display: 'flex', gap: 6 }}>
                  {o.status !== 'preparing' && (
                    <button className="button" onClick={() => actions.updateOrderStatus(o.id, 'preparing')}>Preparing</button>
                  )}
                  {o.status !== 'ready' && (
                    <button className="button button-secondary" onClick={() => actions.updateOrderStatus(o.id, 'ready')}>Ready</button>
                  )}
                  {o.status !== 'paid' && (
                    <button className="button button-primary" onClick={() => actions.updateOrderStatus(o.id, 'paid')}>Paid</button>
                  )}
                </td>
              </tr>
            ))}
            {state.ordersQueue.length === 0 && (
              <tr><td colSpan="5" className="subtle">No active orders.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {customizing && (
        <Modal title={`Customize ${customizing.name}`} onClose={() => setCustomizing(null)}>
          <div style={{ display: 'grid', gap: 10 }}>
            <label>
              <div>Size</div>
              <select
                className="select"
                aria-label="Select size"
                value={customizing.size}
                onChange={e => setCustomizing({ ...customizing, size: e.target.value })}
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </label>
            <label>
              <div>Milk</div>
              <select
                className="select"
                aria-label="Select milk"
                value={customizing.milk}
                onChange={e => setCustomizing({ ...customizing, milk: e.target.value })}
              >
                <option value="Regular">Regular</option>
                <option value="Oat">Oat (+$0.50)</option>
                <option value="Almond">Almond (+$0.50)</option>
              </select>
            </label>
            <fieldset>
              <legend>Extras ($0.50 each)</legend>
              {['Cinnamon', 'Nutmeg', 'Whip', 'Maple Drizzle'].map(extra => {
                const checked = customizing.extras.includes(extra);
                return (
                  <label key={extra} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const next = checked
                          ? customizing.extras.filter(e => e !== extra)
                          : [...customizing.extras, extra];
                        setCustomizing({ ...customizing, extras: next });
                      }}
                    />
                    {extra}
                  </label>
                );
              })}
            </fieldset>

            <div className="k-divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Price</strong>
              <strong>${calcPrice(customizing).toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="button" onClick={() => setCustomizing(null)}>Cancel</button>
              <button className="button button-primary" onClick={addCustomized}>Add to Cart</button>
            </div>
          </div>
        </Modal>
      )}

      {showReceipt && (
        <Modal title="Digital Receipt" onClose={() => setShowReceipt(null)}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div><strong>Order:</strong> {showReceipt.id}</div>
            <div className="k-divider" />
            {showReceipt.items.map(it => (
              <div key={it.key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{it.qty}× {it.name}</div>
                <div>${(it.qty * it.price).toFixed(2)}</div>
              </div>
            ))}
            <div className="k-divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
              <div>Total</div>
              <div>${showReceipt.total.toFixed(2)}</div>
            </div>
            <div className="k-badge k-tag-good" style={{ marginTop: 6 }}>
              <span role="img" aria-hidden>🌿</span> +2 Eco-Points credited
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
